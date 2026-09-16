import {
  use,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  createStore,
  type ConcurrentStoreInternals,
  type ReactConcurrentStore,
  type StoreHandle,
} from "./createStore";

// Re-exported so `react-concurrent-store` stays one import for anyone who does
// not need the store on its own.
export { createStore };
export type { ConcurrentStoreInternals, ReactConcurrentStore, StoreHandle };

/**
 * What an earlier reader rendered in this pass, per store. A mounting reader
 * cannot ask React whether its render is urgent; an earlier reader has already
 * answered by what it rendered. Written during render, so impure — a discarded
 * pass is overwritten before any mounting reader reads it.
 */
const renderedThisPass = new WeakMap<object, StoreHandle<unknown>>();
const expiring = new WeakMap<object, number>();
let epoch = 0;

/**
 * Record what this reader is rendering, for one that mounts later in the same
 * pass. The slot must end when the pass does, and userland cannot see a pass
 * boundary: a commit closes it, and a microtask closes a pass that is
 * abandoned instead. The token means only the newest write can expire it,
 * because React may yield mid-pass and resume from another task.
 *
 * Expiring early is the safe failure — the mounting reader falls back to the
 * commit pointer. Expiring late would hand out a value no tree ever showed.
 */
function recordRendered(store: object, handle: StoreHandle<unknown>): void {
  renderedThisPass.set(store, handle);
  const token = ++epoch;
  expiring.set(store, token);
  queueMicrotask(() => {
    if (expiring.get(store) !== token) return;
    expiring.delete(store);
    renderedThisPass.delete(store);
  });
}

/** Called from a commit: the pass this slot belonged to is over. */
function forgetPass(store: object): void {
  expiring.delete(store);
  renderedThisPass.delete(store);
}

// Stable identities for the hydration check below.
const noSubscribe = () => () => {};
const notHydrating = () => false;
const isHydrating = () => true;

/** Concurrent-safe subscription to a store's current version. */
function useHandle<S, A>(store: ConcurrentStoreInternals<S, A>): StoreHandle<S> {

  // Mount at what this pass is committing, or at committed if we are first.
  // Keyed by the source, not this reader's view: the handles are the source's,
  // and two readers of one store each hold a view of their own.
  const source = store._source;

  // Whether this is the hydration render. useSyncExternalStore is the only
  // hook React tells that, through getServerSnapshot, and with a subscribe
  // that does nothing it can never schedule an update — so none of the
  // de-optimisation that made this hook unusable for the store's value
  // applies. It is asked only when the store moved before anything read it,
  // which is the only case where the answer changes anything; otherwise both
  // snapshots read false, nothing ever differs, and no render is spent.
  const hydrating = useSyncExternalStore(
    noSubscribe,
    notHydrating,
    store._drifted ? isHydrating : notHydrating,
  );

  let [handle, setHandle] = useState(() =>
    hydrating
      ? // The value the server rendered from. The client store is built from
        // the same serialized state, so this is it — no second snapshot has to
        // be handed in.
        store._initial
      : ((renderedThisPass.get(source) as StoreHandle<S> | undefined) ??
        store._committed),
  );

  // A reader pointed at a different store starts again from that store. The
  // seed above runs once per fiber, so without this a component handed a new
  // store keeps showing the old one's value until the new one happens to
  // dispatch — which, for a store that was just constructed, is never.
  // Adjusted during render rather than from an effect, so the first render
  // under the new store is already its own.
  const [seenSource, setSeenSource] = useState(source);
  if (seenSource !== source) {
    handle =
      (renderedThisPass.get(source) as StoreHandle<S> | undefined) ??
      store._committed;
    setSeenSource(source);
    setHandle(handle);
  }

  recordRendered(source, handle as StoreHandle<unknown>);

  // One effect, in three parts and in this order: take publishes, settle where
  // this reader belongs and say so, then listen for the tree moving past it.
  // Both halves were already keyed on the same pair, and splitting them only
  // added a hook boundary to step over.
  useLayoutEffect(() => {
    /** Take a published handle, unless it says what this reader already shows. */
    const takePublish = (next: StoreHandle<S>) => {
      if (Object.is(handle.value, next.value)) return false;
      setHandle(next);
      return true;
    };

    /**
     * Where this reader belongs now. It rendered from what it knew during
     * render; by the time this runs, siblings have rendered too and the store
     * may have moved again.
     */
    const placeThisReader = () => {
      const head = store._head;
      const committed = store._committed;
      if (handle === head) return;

      if (committed === head) {
        // Siblings already committed head in this pass. A setState from a
        // layout effect flushes before the commit returns, so this costs a
        // render pass and not a paint, and nothing torn is shown.
        if (!Object.is(handle.value, head.value)) setHandle(head);
        return;
      }

      const behindTheTree =
        handle.version < committed.version &&
        !Object.is(handle.value, committed.value);
      if (behindTheTree) {
        // Come up to what the tree shows, and no further.
        setHandle(committed);
        return;
      }

      // Level with the tree while a transition is in flight and a sibling has
      // still to commit it. Joining head here would start a *second*
      // transition, which commits as soon as nothing in it suspends while the
      // first is still blocked — arriving ahead of every sibling. Wait for
      // followTheTree instead.
    };

    /** The tree committed past this reader, so it is safe to follow. */
    const followTheTree = (next: StoreHandle<S>) => {
      if (handle.version >= next.version) return;
      if (Object.is(handle.value, next.value)) return;
      setHandle(next);
    };

    const release = store._subscribe(takePublish, handle);
    placeThisReader();
    store._markCommitted(handle);
    // This pass has committed, so nothing mounting later belongs to it.
    forgetPass(source);
    const releaseCommit = store._onCommit(followTheTree);

    return () => {
      release();
      releaseCommit();
    };
    // `source` is read off `store`, so it cannot move while `store` holds, but
    // listing it keeps the whole rule set clean rather than nearly clean.
  }, [store, source, handle]);

  return handle;
}

/**
 * The derived view backing `useStore(store, selector)`.
 *
 * Forwards the source's handles, but only when the selected slice changes. It
 * forwards `S` rather than `T` so the selector still runs during render, where
 * props and state agree; a throw from the speculative call means "cannot
 * decide", so we forward and let render decide. Subscribes lazily so the view
 * can be built during render without leaking.
 */
export interface SelectorView<S, A, T> extends ConcurrentStoreInternals<S, A> {
  /**
   * An inline selector has a new identity every render, so the view outlives
   * the one that built it and the selector is replaced rather than the view.
   */
  _setSelector(next: (state: S, previous: T | undefined) => T): void;
}

export function createSelectorStore<S, A, T>(
  source: ConcurrentStoreInternals<S, A>,
  initialSelector?: (state: S, previous: T | undefined) => T,
): SelectorView<S, A, T> {
  let selector = initialSelector;

  // `sourceHead` is the newest the store has; `readersAt` is what this view's
  // readers were last given. A bail-out moves the first and not the second.
  let sourceHead = source._head;
  let readersAt = source._head;

  /** The slice the readers are showing, or null when there is no memory yet. */
  let lastSlice: { value: T } | null = null;
  let release: (() => void) | null = null;
  const listeners = new Set<(handle: StoreHandle<S>) => boolean>();
  const commitListeners = new Set<(handle: StoreHandle<S>) => void>();

  const pass = (published: StoreHandle<S>) => {
    readersAt = published;
    let taken = 0;
    for (const listener of listeners) if (listener(published)) taken += 1;
    return taken > 0;
  };

  const publish = (published: StoreHandle<S>): boolean => {
    sourceHead = published;
    if (selector === undefined) return pass(published);
    let next: T;
    try {
      next = selector(published.value, lastSlice?.value);
    } catch {
      // Cannot decide: forward and let render settle it.
      return pass(published);
    }
    // The slice did not move, so this view's readers render nothing. Saying so
    // is what lets the store tell "nobody is behind" from "somebody has not
    // caught up yet".
    if (lastSlice !== null && Object.is(next, lastSlice.value)) return false;
    lastSlice = { value: next };
    return pass(published);
  };

  const attach = (from: StoreHandle<S>) => {
    sourceHead = source._head;
    // Seeded from the handle this reader is showing, not from what the store
    // lastSlice published. A reader that mounted on committed state while a
    // transition was pending has never seen the published slice; recording it
    // as already delivered leaves that reader stranded when the transition
    // finally commits.
    readersAt = from;
    try {
      lastSlice =
        selector === undefined ? null : { value: selector(from.value, undefined) };
    } catch {
      lastSlice = null;
    }

    const release = source._subscribe(publish, from);

    // Built during render but subscribed from a layout effect, so the source
    // can move in between. Catch up only as far as the tree has committed —
    // going as far as sourceHead would be joining a transition this reader was never
    // part of, which is what _onCommit is for.
    const committed = source._committed;
    if (committed.version > from.version) publish(committed);

    return release;
  };

  return {
    dispatch() {
      throw new Error("A selector view is read-only; dispatch to its source.");
    },
    getState: () => sourceHead.value,
    // Read-only: dispatch throws, but subscribers still see the source's
    // actions.
    subscribe: source.subscribe,

    _subscribe(listener, from) {
      listeners.add(listener);
      if (release === null) release = attach(from);
      return () => {
        listeners.delete(listener);
        if (listeners.size !== 0 || release === null) return;
        // Not immediately. A reader resubscribes whenever its handle changes,
        // so the count passes through zero on every single update — detaching
        // there threw away this view's slice memory and made it re-attach, and
        // re-attaching runs the selector again. Wait a microtask and let a
        // returning reader cancel it.
        queueMicrotask(() => {
          if (listeners.size !== 0 || release === null) return;
          release();
          release = null;
        });
      };
    },
    get _head() {
      return readersAt;
    },
    get _committed() {
      return source._committed;
    },
    get _initial() {
      return source._initial;
    },
    get _drifted() {
      return source._drifted;
    },
    get _source() {
      return source._source;
    },
    _markCommitted: (handle) => source._markCommitted(handle),
    _onCommit(listener) {
      commitListeners.add(listener);
      // Filtered the same way a publish is: a reader whose slice did not move
      // has nothing new to show and stays where it is, which is not a tear.
      const releaseCommit = source._onCommit((committed) => {
        if (selector !== undefined) {
          let next: T;
          try {
            next = selector(committed.value, lastSlice?.value);
          } catch {
            for (const l of commitListeners) l(committed);
            return;
          }
          if (lastSlice !== null && Object.is(next, lastSlice.value)) return;
          lastSlice = { value: next };
        }
        readersAt = committed;
        for (const l of commitListeners) l(committed);
      });
      return () => {
        commitListeners.delete(listener);
        releaseCommit();
      };
    },
    _setSelector(next) {
      selector = next;
    },
  };
}

/**
 * Subscribe to a store, optionally narrowing to a slice.
 *
 * The selector receives the current state and its own previous result;
 * returning that previous value unchanged skips the render. There is no
 * equality argument — see `react-concurrent-store/with-equality-fn`.
 */
export function useStore<S, A>(store: ReactConcurrentStore<S, A>): S;
export function useStore<S, A, T>(
  store: ReactConcurrentStore<S, A>,
  selector: (state: S, previous: T | undefined) => T,
): T;

export function useStore<S, A, T>(
  store: ReactConcurrentStore<S, A>,
  selector?: (state: S, previous: T | undefined) => T,
): S | T {
  const internals = store as ConcurrentStoreInternals<S, A>;
  // Keyed on the store, not the selector: an inline selector is a new function
  // every render, and rebuilding the view each time throws away which slice
  // its readers already show.
  const selected = selector !== undefined;
  const view = useMemo(
    () => (selected ? createSelectorStore<S, A, T>(internals) : null),
    [internals, selected],
  );

  // An insertion effect, not a layout effect: every insertion effect in a
  // commit runs before any layout effect, so a dispatch from a sibling's layout
  // effect cannot be judged against the selector this render replaced.
  useInsertionEffect(() => {
    if (view !== null && selector !== undefined) view._setSelector(selector);
  });

  // The previous result lives in closure variables written during render, the
  // structure useSyncExternalStoreWithSelector uses for the same job. An
  // abandoned render can write it; the next one overwrites from its own state.
  const select = useMemo(() => {
    let hasPrevious = false;
    let previous: T;
    return (state: S, pick: (state: S, previous: T | undefined) => T): T => {
      const next = pick(state, hasPrevious ? previous : undefined);
      hasPrevious = true;
      previous = next;
      return next;
    };
  }, []);

  const state = use(useHandle(view ?? internals));
  return selector === undefined ? state : select(state, selector);
}
