import {
  startTransition,
  use,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { transitionScope } from "./transitionScope";
import { Reducer } from "./types";

/**
 * A versioned, already-fulfilled handle on store state.
 *
 * A `Promise` subclass carrying `status`/`value`, the shape React reads to
 * unwrap `use()` synchronously — no microtask, and `flushSync` works. The
 * version and the handle's identity are what the store orders commits by:
 * two versions holding equal values stay distinguishable.
 */
export type StoreHandle<S> = Promise<S> & {
  status: "fulfilled";
  value: S;
  version: number;
};

/**
 * A fulfilled handle. Not a Promise subclass: subclassing bought nothing here
 * — it carried no behaviour of its own, and it needed Symbol.species so that
 * `.then()` would stop constructing more of them. A native promise takes the
 * three own properties just as well and returns a plain promise from `.then`
 * because that is all it ever was.
 */
function makeHandle<S>(value: S, version: number): StoreHandle<S> {
  const handle = new Promise<S>((resolve) => resolve(value)) as StoreHandle<S>;
  handle.status = "fulfilled";
  handle.value = value;
  handle.version = version;
  // Resolving with a thenable `S` adopts it, so a stored promise that rejects
  // would reject the handle too. The handle carries a value; it makes no claim
  // about that value's own settlement, and the consumer's `use()` still
  // delivers the rejection.
  handle.catch(() => {});
  return handle;
}

function isThenable(value: unknown): value is PromiseLike<unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    "then" in value &&
    typeof value.then === "function"
  );
}

/**
 * A concurrent-safe store.
 *
 * Shaped like `ReactStore` in React RFC #35449, named for this package so it
 * cannot collide if React ships the feature.
 */
export interface ReactConcurrentStore<S, A> {
  /** The current state. Use `useStore` inside components. */
  getState(): S;
  /** Apply an action. */
  dispatch(action: A): void;
  /**
   * Called after each update with the action that caused it, once the store
   * has applied it — `getState` inside the callback reports the state that
   * action produced. That is what lets this pair drive a
   * useSyncExternalStore bridge. Returns an unsubscribe function.
   */
  subscribe(callback: (action: A) => void): () => void;
}

/**
 * Commit bookkeeping React would keep privately on its own `StoreWrapper`.
 * Not public: `createStore` returns {@link ReactConcurrentStore}.
 */
export interface ConcurrentStoreInternals<S, A>
  extends ReactConcurrentStore<S, A> {
  /**
   * Subscribe to published handles; readers need to know *which* was sent.
   * A listener returns whether it took the handle. A publish nobody takes
   * renders nothing, so there is nothing for the tree to catch up to and the
   * commit pointer can move with it.
   */
  _subscribe(
    listener: (handle: StoreHandle<S>) => boolean,
    /**
     * The handle the subscribing reader is currently showing. A selector view
     * has to know this: it is what its slice memory must be seeded from, and
     * it is not always what the store last published.
     */
    from: StoreHandle<S>,
  ): () => void;
  /**
   * Subscribe to the commit pointer moving forward. Separate from
   * `_subscribe` on purpose: this fires during commit, and routing it through
   * the publish channel would re-enter rebasing and the selector bail-out.
   */
  _onCommit(listener: (handle: StoreHandle<S>) => void): () => void;
  readonly _head: StoreHandle<S>;
  readonly _committed: StoreHandle<S>;
  /** The handle this store was created with. */
  readonly _initial: StoreHandle<S>;
  /**
   * Whether the store moved before anything read it. On the client that is the
   * only situation in which the value a reader would mount on differs from the
   * one the server rendered from, since both are built from the same
   * serialized state.
   */
  readonly _drifted: boolean;
  /**
   * The store the handles come from. Every reader builds its own selector view,
   * so the view is the wrong thing to key per-pass bookkeeping by: two readers
   * of one store would never see each other. Handles are the source's either
   * way, so the source is the identity that matters.
   */
  readonly _source: object;
  _markCommitted(handle: StoreHandle<S>): void;
}

/**
 * Create a store. With no reducer the action is a replacement value or an
 * updater, following `useState`'s setter.
 */
export function createStore<S>(
  initialValue: S,
): ReactConcurrentStore<S, S | ((previous: S) => S)>;
export function createStore<S, A>(
  initialValue: S,
  reducer: Reducer<S, A>,
): ReactConcurrentStore<S, A>;

export function createStore<S, A>(
  initialValue: S,
  reducer?: Reducer<S, A>,
): ReactConcurrentStore<S, A> {
  const fold: Reducer<S, A> =
    reducer ??
    ((state: S, action: A) =>
      typeof action === "function"
        ? (action as unknown as (previous: S) => S)(state)
        : (action as unknown as S));

  let version = 0;

  /**
   * Two folds over the same actions, told apart by one thing recorded where it
   * is known — whether the caller was inside a transition:
   *
   *   head  every action, in dispatch order
   *   sync  only the urgent ones — what the tree may show right now
   *
   * Every action enters `head`. An urgent one also enters `sync`; a
   * transition's does not, and stays out until the tree catches up, however
   * many ticks that takes. There is no "are we rebasing" question to answer
   * from the outside and no per-tick batching to make that answer stick, which
   * is what the two used to be for.
   */
  let head = makeHandle(initialValue, version);
  const initial = head;
  let settled = false;
  let sync = head;
  let committed = head;

  const listeners = new Set<(handle: StoreHandle<S>) => boolean>();
  const commitListeners = new Set<(handle: StoreHandle<S>) => void>();
  const actionListeners = new Set<(action: A) => void>();
  /** Returns how many readers took the handle. */
  const notify = (handle: StoreHandle<S>) => {
    let taken = 0;
    for (const listener of listeners) if (listener(handle)) taken += 1;
    return taken;
  };
  const notifyAction = (action: A) => {
    for (const callback of actionListeners) callback(action);
  };

  /** The tree has caught up: the two folds are the same again. */
  const settle = (handle: StoreHandle<S>) => {
    sync = handle;
    head = handle;
    if (handle.version > committed.version) committed = handle;
  };

  // Said once per store rather than once per dispatch.
  let warned = false;

  const store: ConcurrentStoreInternals<S, A> = {
    dispatch(action) {
      // Recorded where it is known, rather than re-derived later from whether
      // the pointers happen to differ — which is also true of a sync batch
      // React has not rendered yet.
      const urgent = transitionScope() === null;

      const headValue = fold(head.value, action);
      if (Object.is(headValue, head.value)) return;

      // Whether the folds had already parted, by handle identity. Not by
      // comparing the two values: an object state is a fresh object every
      // fold, so equal states compare unequal and every dispatch would look
      // like a rebase.
      const parted = sync !== head;

      // The fold the tree may show. It differs from head in exactly one case:
      // an urgent action while a transition is outstanding, which is rebasing.
      const rebasing = urgent && parted;
      const syncValue = rebasing ? fold(sync.value, action) : headValue;

      // An urgent thenable replaces rather than folds: the caller asked for a
      // value that does not exist yet, at a priority that cannot wait, so the
      // folds rejoin and the boundary takes it.
      //
      // Only urgent, and only on the fold the tree would show. A thenable
      // dispatched inside a transition parts the folds like anything else, so
      // the tree keeps the value it already has instead of the store handing
      // it a promise to suspend on — which is what lets an urgent update made
      // while a fetch is outstanding land on the list that is on screen.
      const collapsed = urgent && isThenable(syncValue);

      if (collapsed && rebasing && isThenable(sync.value) && !warned) {
        warned = true;
        // Only reachable when the caller dispatched urgently, a transition was
        // outstanding, and the state the tree is showing is itself a promise.
        // Replacing a promise-valued store is ordinary and silent; this is the
        // narrower case of expecting the urgent update to appear now.
        console.warn(
          "[react-concurrent-store] An urgent dispatch landed while the state " +
            "on screen is still a promise, so there is nothing to rebase onto " +
            "and it will appear when the pending transition does. Hold the " +
            "resolved data in the store and dispatch the promise only while a " +
            "refetch is in flight.",
        );
      }

      if (collapsed) {
        head = makeHandle(headValue, ++version);
        sync = head;
        notifyAction(action);
        const taken = notify(head);
        if (taken === 0) settle(head);
        return;
      }

      if (!urgent) {
        // Not one the tree may show yet, so only the chronological fold takes
        // it, and the notification inherits the caller's transition. This is
        // where the two part.
        head = makeHandle(headValue, ++version);
        notifyAction(action);
        const taken = notify(head);
        if (taken === 0) settle(head);
        return;
      }

      if (!parted) {
        // Nothing outstanding: one fold serves both.
        head = makeHandle(headValue, ++version);
        sync = head;
        notifyAction(action);
        const taken = notify(head);
        // Nobody took it: nothing is mounted, or every reader's slice is
        // unchanged. No render is coming, so the tree already shows everything
        // this state says and nothing is outstanding.
        if (taken === 0) settle(head);
        return;
      }

      // Outstanding work, and an urgent action. It enters both folds, but from
      // different places: the tree gets what it can show now at the caller's
      // priority, and the chronological order follows in a transition.
      sync = makeHandle(syncValue, ++version);
      head = makeHandle(headValue, ++version);
      notifyAction(action);
      notify(sync);
      const chronological = head;
      startTransition(() => {
        notify(chronological);
      });
    },

    getState: () => head.value,
    subscribe(callback) {
      actionListeners.add(callback);
      return () => {
        actionListeners.delete(callback);
      };
    },

    _subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    _onCommit(listener) {
      commitListeners.add(listener);
      return () => {
        commitListeners.delete(listener);
      };
    },
    get _head() {
      return head;
    },
    get _committed() {
      return committed;
    },
    get _initial() {
      return initial;
    },
    get _drifted() {
      return head !== initial && !settled;
    },
    get _source() {
      return store;
    },
    _markCommitted(handle) {
      settled = true;
      // Monotonic: a reader still catching up must not drag the pointer back.
      if (handle.version > committed.version) {
        committed = handle;
        // A reader that was level with the tree while this was in flight
        // waited here rather than starting a transition of its own. The tree
        // has now shown this, so bring it forward. Readers already at or past
        // it ignore the call.
        for (const listener of commitListeners) listener(committed);
      }
      // The tree has reached the chronological end, so the two folds are the
      // same again. A reader committing only the *sync* view settles nothing:
      // the transition's action is still outstanding.
      if (committed === head) settle(head);
    },
  };

  return store;
}

/**
 * What an earlier reader rendered in the current pass, per store.
 *
 * A mounting reader cannot ask React whether its render is urgent, but an
 * earlier reader has already answered it by what it rendered. Written during
 * render and therefore impure; a discarded pass is overwritten by the next one
 * before any mounting reader reads it, since earlier readers render first.
 */
// Values are `Handle<S>` for that store's own S; the map spans stores, so
// the read asserts once.
const renderedThisPass = new WeakMap<object, StoreHandle<unknown>>();
const expiring = new WeakMap<object, number>();
let epoch = 0;

/**
 * Record what this reader is rendering, for a reader that mounts later in the
 * same pass.
 *
 * The slot has to end when the pass does, and userland cannot see a pass
 * boundary. Two things close it. A commit clears it, which covers every pass
 * that finishes — see `forgetPass`. A microtask clears it otherwise, which
 * covers a pass that is abandoned and never commits; without that, a render
 * abandoned in one root stayed visible to a mount in another, and the next
 * root opened on a handle no tree had shown.
 *
 * The microtask is guarded by a token so only the newest write can expire the
 * slot. That matters because a concurrent render is not guaranteed to finish
 * in one task: React can yield and resume from another scheduler task, and a
 * microtask queued before the yield runs in between. The guard means a slot
 * stays alive as long as readers keep rendering into it.
 *
 * It can still expire mid-pass if React yields after the last reader writes
 * and before a mounting one reads. That failure is the conservative one: the
 * mounting reader falls back to the commit pointer, which is what the tree is
 * showing, and its catch-up runs in the same commit. The opposite failure —
 * keeping the slot too long — hands out a value no tree ever showed.
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

  const [handle, setHandle] = useState(() =>
    hydrating
      ? // The value the server rendered from. The client store is built from
        // the same serialized state, so this is it — no second snapshot has to
        // be handed in.
        store._initial
      : ((renderedThisPass.get(source) as StoreHandle<S> | undefined) ??
        store._committed),
  );
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
   * Install the current selector. An inline selector has a new identity every
   * render, so the view outlives the selector that built it; it is replaced
   * from a layout effect rather than rebuilding the view and losing which
   * slice the readers already show.
   */
  _setSelector(next: (state: S, previous: T | undefined) => T): void;
}

export function createSelectorStore<S, A, T>(
  source: ConcurrentStoreInternals<S, A>,
  initialSelector?: (state: S, previous: T | undefined) => T,
): SelectorView<S, A, T> {
  let selector = initialSelector;

  // Two handles, and which is which is the whole of this view. `sourceHead` is
  // the newest the store has; `readersAt` is the one this view's readers were
  // lastSlice given. A bail-out moves the first and not the second, and reading
  // them the wrong way round makes a reader chase a version whose slice it is
  // already showing — or strands it on one it never saw.
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

  // Installed from an insertion effect, not a layout effect. Every insertion
  // effect in a commit runs before any layout effect, so a dispatch made from
  // another component's layout effect cannot be evaluated against the selector
  // this render replaced. With a layout effect here, an earlier sibling
  // dispatching left the view judging the new render's slice with the old
  // selector, bailing out, and stranding the reader on a stale value with
  // nothing scheduled to repair it.
  useInsertionEffect(() => {
    if (view !== null && selector !== undefined) view._setSelector(selector);
  });

  // The selector's previous result lives in closure variables written during
  // render, which is the structure React's own useSyncExternalStoreWithSelector
  // uses for the same job. A useMemo closure is per-fiber, so a render that is
  // abandoned can still write it; the next render runs the selector against its
  // own state and overwrites, so the value corrects itself rather than being
  // handed back.
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
