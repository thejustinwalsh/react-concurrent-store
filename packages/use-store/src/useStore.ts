import * as ReactRuntime from "react";
import {
  startTransition,
  use,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
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

/**
 * React's current transition scope, or null outside one.
 *
 * Nothing public tells a dispatch whether its caller is inside
 * startTransition, and a batch must not span the two: a transition dispatch
 * and a flushSync dispatch in the same call stack get different lanes, so they
 * cannot share one rebasing decision. This field is the only signal that
 * distinguishes them. It is read, never written, and feature-detected — if it
 * disappears every dispatch reads as scope null, which is the per-tick
 * batching this had before.
 */
const clientInternals = (
  ReactRuntime as unknown as {
    __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?: {
      T?: unknown;
    };
  }
).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

const transitionScope = (): unknown => clientInternals?.T ?? null;

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
   * Called after each update with the action that caused it. Returns an
   * unsubscribe function.
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
  /** How many readers are subscribed; one reader has nothing to tear against. */
  readonly _readers: number;
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
  // committed: what the tree shows. sync: committed plus sync-only actions.
  // head: every action in order. Equal unless a transition is in flight.
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

  // Dispatches in one microtask share the caller's priority, so they take the
  // same path; otherwise a sync batch looks like a pending transition.
  // Not `scheduler`: it schedules on macrotasks, which would hold this flag
  // across ticks that are genuinely separate.
  let batching = false;
  let batchRebasing = false;
  let batchScope: unknown = null;

  const store: ConcurrentStoreInternals<S, A> = {
    dispatch(action) {
      const chronological = fold(head.value, action);

      // A batch covers dispatches made in one tick *at one priority*. Leaving
      // the scope out made a flushSync inside a pending transition's tick
      // inherit that transition's decision, publish the chronological state at
      // sync priority, and put the pending transition on screen.
      const scope = transitionScope();
      const sameBatch = batching && scope === batchScope;
      const rebasing = sameBatch ? batchRebasing : committed !== head;
      if (!sameBatch) {
        batching = true;
        batchScope = scope;
        batchRebasing = rebasing;
        queueMicrotask(() => {
          batching = false;
          batchScope = null;
        });
      }

      if (!rebasing) {
        if (Object.is(chronological, head.value)) return;
        head = makeHandle(chronological, ++version);
        sync = head;
        notifyAction(action);
        const taken = notify(head);
        // Nobody took it: either nothing is mounted, or every reader's slice
        // is unchanged. No render is coming, so the tree is already showing
        // everything this state says, and the pointer must move with it.
        // Leaving it behind makes the next dispatch look like a rebase and
        // rebuild from a state this action was never applied to.
        if (taken === 0) committed = head;
        return;
      }

      // Thenable state replaces rather than folds, so the timelines collapse.
      // Folding twice would also allocate two promises for one dispatch.
      if (isThenable(chronological)) {
        head = makeHandle(chronological, ++version);
        sync = head;
        notifyAction(action);
        notify(head);
        return;
      }

      // Publish the sync-relative view first: this notification inherits the
      // caller's priority, so no transition detection is needed. The first
      // sync update rebases onto `committed`, later ones chain along `sync`.
      const base = sync === head ? committed : sync;
      sync = makeHandle(fold(base.value, action), ++version);
      head = makeHandle(chronological, ++version);
      notifyAction(action);
      notify(sync);

      // Then the chronological order, so both land when the transition ends.
      const chronologicalHandle = head;
      startTransition(() => {
        notify(chronologicalHandle);
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
    get _readers() {
      return listeners.size;
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
      if (committed === head) sync = head;
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
const expiring = new Set<object>();

// A render pass runs to completion within one task, so a microtask queued
// during it fires once the pass is over. Without this the slot outlives the
// pass that wrote it: a render that is abandoned never renders again to
// overwrite it, and the next root to mount adopts a handle no tree showed.
function recordRendered(store: object, handle: StoreHandle<unknown>): void {
  renderedThisPass.set(store, handle);
  if (expiring.has(store)) return;
  expiring.add(store);
  queueMicrotask(() => {
    expiring.delete(store);
    renderedThisPass.delete(store);
  });
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
    // No startTransition: the update inherits the dispatching caller's
    // priority. Keyed on the handle as well, so the decision is made here and
    // reported, rather than inside setHandle where the answer is not visible.
    const release = store._subscribe((next) => {
      // Never backwards: versions rise with every handle a store makes,
      // including the rebased one, so an older handle is one this reader has
      // already moved past.
      if (handle.version >= next.version || Object.is(handle.value, next.value)) {
        return false;
      }
      setHandle(next);
      return true;
    }, handle);

    const head = store._head;
    const committed = store._committed;
    if (handle !== head) {
      if (committed === head) {
        // Siblings already committed head this pass. A setState from a layout
        // effect flushes before the commit returns, so nothing torn is painted.
        if (!Object.is(handle.value, head.value)) setHandle(head);
      } else if (
        handle.version < committed.version &&
        !Object.is(handle.value, committed.value)
      ) {
        // Behind what the tree shows: come up to that much, no further.
        setHandle(committed);
      } else if (store._readers <= 1) {
        // Level with the tree, a transition in flight, and no sibling to tear
        // against. Waiting here would deadlock: the commit this reader is
        // waiting for is the one only it can produce.
        startTransition(() => {
          setHandle(head);
        });
      }
      // Otherwise level with the tree while a transition is in flight and a
      // sibling is still to commit it. Joining head here would start a second
      // transition, which commits on its own as soon as nothing in it suspends
      // while the first is still blocked, leaving this reader ahead of its
      // siblings. Wait for _onCommit instead.
    }
    store._markCommitted(handle);

    // Brought forward when the tree commits past this reader: this is how a
    // reader that waited, rather than starting a transition of its own,
    // catches up. Compared here rather than inside setHandle, because calling
    // setHandle with an unchanged value still costs a render pass.
    const releaseCommit = store._onCommit((next) => {
      if (
        handle.version < next.version &&
        !Object.is(handle.value, next.value)
      ) {
        setHandle(next);
      }
    });

    return () => {
      release();
      releaseCommit();
    };
  }, [store, handle]);

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
  let head = source._head;
  // The last handle this view passed on. A bail-out still advances `head` so
  // getState stays current, but must not advance this: readers hold the handle
  // they were last given, and a gap between the two reads as a reader running
  // behind, sending it chasing a version whose slice it already shows.
  let forwarded = source._head;
  let last: { value: T } | null = null;
  let release: (() => void) | null = null;
  const listeners = new Set<(handle: StoreHandle<S>) => boolean>();
  const commitListeners = new Set<(handle: StoreHandle<S>) => void>();

  const pass = (published: StoreHandle<S>) => {
    forwarded = published;
    let taken = 0;
    for (const listener of listeners) if (listener(published)) taken += 1;
    return taken > 0;
  };

  const publish = (published: StoreHandle<S>): boolean => {
    head = published;
    if (selector === undefined) return pass(published);
    let next: T;
    try {
      next = selector(published.value, last?.value);
    } catch {
      // Cannot decide: forward and let render settle it.
      return pass(published);
    }
    // The slice did not move, so this view's readers render nothing. Saying so
    // is what lets the store tell "nobody is behind" from "somebody has not
    // caught up yet".
    if (last !== null && Object.is(next, last.value)) return false;
    last = { value: next };
    return pass(published);
  };

  const attach = (from: StoreHandle<S>) => {
    head = source._head;
    // Seeded from the handle this reader is showing, not from what the store
    // last published. A reader that mounted on committed state while a
    // transition was pending has never seen the published slice; recording it
    // as already delivered leaves that reader stranded when the transition
    // finally commits.
    forwarded = from;
    try {
      last =
        selector === undefined ? null : { value: selector(from.value, undefined) };
    } catch {
      last = null;
    }

    const release = source._subscribe(publish, from);

    // Built during render but subscribed from a layout effect, so the source
    // can move in between. Catch up only as far as the tree has committed —
    // going as far as head would be joining a transition this reader was never
    // part of, which is what _onCommit is for.
    const committed = source._committed;
    if (committed.version > from.version) publish(committed);

    return release;
  };

  return {
    dispatch() {
      throw new Error("A selector view is read-only; dispatch to its source.");
    },
    getState: () => head.value,
    // Read-only: dispatch throws, but subscribers still see the source's
    // actions.
    subscribe: source.subscribe,

    _subscribe(listener, from) {
      listeners.add(listener);
      if (release === null) release = attach(from);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0 && release !== null) {
          release();
          release = null;
        }
      };
    },
    get _head() {
      return forwarded;
    },
    get _committed() {
      return source._committed;
    },
    // The source's, not this view's: every reader holds its own view, so the
    // source's subscriber count is the reader count.
    get _readers() {
      return source._readers;
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
            next = selector(committed.value, last?.value);
          } catch {
            for (const l of commitListeners) l(committed);
            return;
          }
          if (last !== null && Object.is(next, last.value)) return;
          last = { value: next };
        }
        forwarded = committed;
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
