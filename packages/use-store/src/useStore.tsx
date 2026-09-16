import {
  startTransition,
  use,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Reducer } from "./types";

/**
 * A versioned handle on store state.
 *
 * Deliberately NOT a Promise. The native promise resolution procedure adopts
 * thenables, so `Promise.resolve(value)` would swallow a user's promise
 * whenever `S` is itself a promise — the store's handle would start following
 * their promise instead of carrying it.
 *
 * React only requires `status`/`value` to unwrap synchronously, and never
 * calls `then` on a fulfilled thenable, so a tagged box satisfies `use()`
 * while passing `S` through untouched.
 */
export type StoreHandle<S> = PromiseLike<S> & {
  status: "fulfilled";
  value: S;
  version: number;
};

/**
 * `then` lives on a shared prototype, exactly as it does on a real promise.
 * A per-handle closure would make it an own property that changes identity on
 * every version, which reads as a render-causing difference to anything
 * comparing handles field by field.
 */
const storeHandlePrototype = {
  // React never reaches this: `use` unwraps a fulfilled thenable through
  // `status`/`value` and never calls `then`. It exists to satisfy the
  // `PromiseLike` contract for callers who chain off a handle directly.
  //
  // Note `Promise.resolve()` is started empty. Resolving it *with* the value
  // would adopt a thenable `S`, which is the whole failure mode this handle
  // exists to avoid.
  then<S, TResult1 = S, TResult2 = never>(
    this: StoreHandle<S>,
    onfulfilled?: ((value: S) => TResult1 | PromiseLike<TResult1>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    const value = this.value;
    return Promise.resolve().then(() =>
      onfulfilled ? onfulfilled(value) : (value as unknown as TResult1),
    );
  },
};

function isThenable(value: unknown): boolean {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof (value as { then?: unknown }).then === "function"
  );
}

function createStoreHandle<S>(value: S, version: number): StoreHandle<S> {
  const handle = Object.create(storeHandlePrototype) as StoreHandle<S> & {
    status: "fulfilled";
    value: S;
    version: number;
  };
  handle.status = "fulfilled";
  handle.value = value;
  handle.version = version;
  return handle;
}

/**
 * The public surface, matching the shape of `ReactStore` in RFC #35449.
 *
 * Named for the package rather than `ReactStore` so it cannot collide with a
 * type React may ship if the concurrent store feature lands.
 */
export interface ReactConcurrentStore<S, A> {
  /** The current head state. */
  getState(): S;
  dispatch(action: A): void;
  /**
   * Subscribe to updates. The callback receives the dispatched action, as in
   * the RFC, which is what lets an arbitrary external store be wrapped.
   */
  subscribe(callback: (action: A) => void): () => void;
}

/**
 * Bookkeeping React keeps privately on its own `StoreWrapper` and a ponyfill
 * has to keep on the store. `createStore` returns the public type above, so a
 * consumer never sees these; the hooks and the tests narrow to them by cast.
 */
export interface ConcurrentStoreInternals<S, A> extends ReactConcurrentStore<S, A> {
  /** Live handle subscribers. Exposed so tests can assert there are no leaks. */
  readonly _listeners: ReadonlySet<(handle: StoreHandle<S>) => void>;
  /**
   * Subscribe to published handles rather than actions. The hooks need to know
   * *which* handle was published — `sync` or `head` — a distinction React does
   * not need because the reconciler has lane information instead.
   */
  _subscribe(listener: (handle: StoreHandle<S>) => void): () => void;
  _getHead(): StoreHandle<S>;
  _getCommitted(): StoreHandle<S>;
  /** The committed value, for callers that want state rather than a handle. */
  _getCommittedState(): S;
  /**
   * The most recent handle published at the caller's own priority — `head`
   * normally, `sync` while a transition is pending. A reader that subscribes
   * too late to receive a notification must catch up to this, not to `head`,
   * or it jumps to the transition's state.
   */
  _getPublished(): StoreHandle<S>;
  _markCommitted(handle: StoreHandle<S>): void;
}

/**
 * Note: RFC #35449 declares this action as `(prev: S) => S`, but its own suite
 * dispatches bare values against a store created without a reducer. The tests
 * are the behaviour, so the action is the useState-setter union.
 */
export function createStore<S>(
  initialValue: S,
): ReactConcurrentStore<S, S | ((previous: S) => S)>;
export function createStore<S, A>(
  initialValue: S,
  reducer: Reducer<S, A>,
): ReactConcurrentStore<S, A>;

/**
 * Signature follows RFC #35449: value first, reducer optional. With no
 * reducer the action is an updater function, `(prev: S) => S`.
 */
export function createStore<S, A>(
  initialValue: S,
  reducer?: Reducer<S, A>,
): ReactConcurrentStore<S, A> {
  // Built as the full internal shape, returned as the public one.
  // With no reducer the action follows useState's setter convention: either a
  // replacement value or an updater, `(prev: S) => S`. RFC #35449's own suite
  // dispatches both forms against a store created without one.
  const fold: Reducer<S, A> =
    reducer ??
    ((state: S, action: A) =>
      typeof action === "function"
        ? (action as unknown as (previous: S) => S)(state)
        : (action as unknown as S));
  let version = 0;

  // Three states, as in the original ponyfill. `sync` is the one we were
  // computing and discarding.
  //
  //   committed — what the tree has actually committed
  //   sync      — committed folded with the actions a sync reader should see
  //   head      — every action in dispatch order
  //
  // They are equal whenever nothing is in flight.
  //
  // `sync` records the sync-relative timeline; it cannot originate it. To
  // diverge from `head` it must learn that head was published non-urgently,
  // and that can only be learned from a commit — of which there is none while
  // a transition is pending. So the pending-transition signal stays
  // `committed !== head`, and `sync` is what we hand a reader that needs the
  // sync-relative value without recomputing it.
  let head = createStoreHandle(initialValue, version);
  let sync = head;
  let committed = head;

  const listeners = new Set<(handle: StoreHandle<S>) => void>();
  const actionListeners = new Set<(action: A) => void>();
  const notify = (handle: StoreHandle<S>) => {
    for (const listener of listeners) listener(handle);
  };
  // RFC #35449: "called after the state has updated and includes the action
  // that was dispatched" — so this fires once the new version exists, and not
  // at all when the action produced no change.
  const notifyAction = (action: A) => {
    for (const callback of actionListeners) callback(action);
  };

  // Dispatches in the same microtask necessarily share the caller's priority,
  // so a later one extends head rather than rebasing. Without this, a batch of
  // sync dispatches looks like a pending transition: `committed` cannot have
  // caught up yet, because React has not committed.
  let published = head;
  let batching = false;
  // Whether the batch in progress is rebasing. Every dispatch in one batch
  // shares the caller's priority, so they all take the same path.
  let batchRebasing = false;

  const store: ConcurrentStoreInternals<S, A> = {
    dispatch(action) {
      // Chronological: every action in the order it was dispatched.
      const chronological = fold(head.value, action);

      const rebasing = batching ? batchRebasing : committed !== head;
      if (!batching) {
        batching = true;
        batchRebasing = rebasing;
        queueMicrotask(() => {
          batching = false;
        });
      }

      if (!rebasing) {
        if (Object.is(chronological, head.value)) return;
        head = createStoreHandle(chronological, ++version);
        sync = head;
        published = head;
        notifyAction(action);
        // With nothing mounted there is no committed tree to tear against, so
        // the commit pointer follows head. Otherwise the first reader to mount
        // after an unobserved update would start from stale state.
        if (listeners.size === 0) committed = head;
        notify(head);
        return;
      }

      // A thenable state has replace semantics: the new value does not depend
      // on the base it was folded onto, so there is no meaningful rebase and
      // the two timelines collapse onto one. Folding twice would also invoke
      // the reducer twice, allocating two distinct promises where the caller
      // wrote one.
      if (isThenable(chronological)) {
        head = createStoreHandle(chronological, ++version);
        sync = head;
        published = head;
        notifyAction(action);
        notify(head);
        return;
      }

      // A transition is in flight. Publish the sync-relative view first: this
      // notification inherits the caller's priority, so a sync dispatch
      // commits it immediately and a transition dispatch defers it. That is
      // why no transition detection is needed here.
      //
      // The first sync update during a transition rebases onto `committed`;
      // every one after it chains along the `sync` timeline, or the second
      // update in a batch would land on the transition's state instead.
      const base = sync === head ? committed : sync;
      sync = createStoreHandle(fold(base.value, action), ++version);
      head = createStoreHandle(chronological, ++version);
      published = sync;
      notifyAction(action);
      notify(sync);

      // Then hand readers the chronological order, so both land together when
      // the pending transition resolves.
      const chronologicalHandle = head;
      startTransition(() => {
        notify(chronologicalHandle);
      });
    },
    _subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    subscribe(callback) {
      actionListeners.add(callback);
      return () => {
        actionListeners.delete(callback);
      };
    },
    _listeners: listeners,
    getState: () => head.value,
    _getHead: () => head,
    _getCommitted: () => committed,
    _getCommittedState: () => committed.value,
    _getPublished: () => published,
    _markCommitted(handle) {
      // Monotonic: a reader still catching up must not drag the pointer back.
      if (handle.version > committed.version) committed = handle;
      if (committed === head) sync = head;
    },
  }
  return store;
;
}

/**
 * What an earlier reader rendered in the current pass, per store.
 *
 * The question a mounting reader has to answer is not "is my render urgent?" —
 * React does not expose that — but "what version is this pass committing?".
 * React has already answered it: an earlier reader processes its queued
 * transition update only if the pass is non-urgent, so whatever it rendered is
 * the right answer for everyone else in the same pass.
 *
 * This is the pass-scoped slot that `getCacheForType` used to provide. The
 * write is render-phase and therefore impure: a discarded render leaves a
 * stale entry, which the next pass overwrites before any mounting reader can
 * read it, since earlier readers render first.
 */
const renderedThisPass = new WeakMap<object, unknown>();

/**
 * Concurrent-safe subscription to a store's current version.
 *
 * Shared by both forms of `useStore`; the selector form passes a derived view.
 */
function useHandle<S, A>(publicStore: ReactConcurrentStore<S, A>): StoreHandle<S> {
  const store = publicStore as ConcurrentStoreInternals<S, A>;
  // Mount at whatever an earlier reader is rendering in this pass, falling
  // back to the committed version when we are the first.
  const [handle, setHandle] = useState(
    () =>
      (renderedThisPass.get(store as object) as StoreHandle<S> | undefined) ??
      store._getCommitted(),
  );

  renderedThisPass.set(store as object, handle);

  useLayoutEffect(() => {
    // No startTransition here: the update inherits whatever priority dispatch
    // was called at, so a sync dispatch stays sync and a transition stays one.
    return store._subscribe((next) => {
      // A reconcile can hand us a different handle carrying the value we are
      // already showing. Keeping the current one bails React out of a render
      // that would produce identical output.
      setHandle((prev) => (Object.is(prev.value, next.value) ? prev : next));
    });
  }, [store]);

  useLayoutEffect(() => {
    const head = store._getHead();
    if (handle !== head) {
      if (store._getCommitted() === head) {
        // An earlier sibling's layout effect already advanced the commit
        // pointer to head, so this pass is committing head and we are the only
        // reader behind. Catch up synchronously: React flushes a setState from
        // a layout effect before returning from the commit, and a browser
        // cannot paint mid-task, so the intermediate state is never visible.
        setHandle(head);
      } else {
        // The transition is still pending. Catch up at transition priority so
        // we land with the tree rather than ahead of it.
        //
        // Bare startTransition, not useTransition: isPending is unused, and a
        // per-reader useTransition would fan one dispatch into one scope and
        // one pending slot per reader.
        startTransition(() => {
          setHandle(head);
        });
      }
    }
    store._markCommitted(handle);
  });

  return handle;
}

/**
 * Internal: the derived view backing `useStore(store, selector)`. Not part of
 * the API — it takes and returns internals, and RFC #35449 has no equivalent.
 *
 * A read-only view of `source` that forwards the source's own handles, but
 * only when the selected slice changes. The selector acts as the view's
 * reducer and the equality check is its bail-out, so the layer needs no new
 * primitive surface — exactly the composition sketched in issue #2.
 *
 * It forwards `S`, not `T`, so the selector still runs during render where
 * props and state are coherent. A throw from the speculative call means
 * "cannot decide", not "error": we forward and let it run again in render.
 *
 * Subscription to the source is deferred until this view has its own first
 * subscriber, so the view can be constructed during render without leaking.
 */
export function createSelectorStore<S, A, T>(
  source: ConcurrentStoreInternals<S, A>,
  selector: (state: S) => T,
  isEqual: (a: T, b: T) => boolean = Object.is,
): ConcurrentStoreInternals<S, never> {
  let head = source._getHead();
  let last: { value: T } | null = null;
  let release: (() => void) | null = null;
  const listeners = new Set<(handle: StoreHandle<S>) => void>();

  const publish = (published: StoreHandle<S>) => {
    head = published;
    let next: T;
    try {
      next = selector(published.value);
    } catch {
      for (const listener of listeners) listener(published);
      return;
    }
    if (last !== null && isEqual(next, last.value)) {
      // The slice is unchanged, so readers already display equivalent
      // content. Record it, or the source's commit pointer lags forever
      // and every later dispatch sees a phantom pending transition.
      source._markCommitted(published);
      return;
    }
    last = { value: next };
    for (const listener of listeners) listener(published);
  };

  const attach = () => {
    try {
      last = { value: selector(head.value) };
    } catch {
      last = null;
    }
    const release = source._subscribe(publish);

    // The view is constructed during render but subscribes from a layout
    // effect, so the source can move in between — an earlier sibling's layout
    // effect dispatching, for instance. Reconcile, or that update is lost.
    //
    // Forward unconditionally rather than going through `publish`: nothing has
    // rendered this version yet, so its bail-out branch would mark the source
    // committed and corrupt the rebase base.
    if (source._getHead() !== head) {
      // Track the real head, but hand readers the last priority-inheriting
      // publish: catching up to `head` here would jump a sync mount straight
      // to the pending transition's state. The move from there to `head`
      // happens through the reader's own catch-up, at transition priority.
      head = source._getHead();
      const current = source._getPublished();
      try {
        last = { value: selector(current.value) };
      } catch {
        last = null;
      }
      for (const listener of listeners) listener(current);
    }

    return release;
  };

  return {
    dispatch() {
      throw new Error("A selector view is read-only; dispatch to its source.");
    },
    // A read-only view has no actions of its own; forward the source's.
    subscribe: source.subscribe as ConcurrentStoreInternals<S, never>["subscribe"],
    _subscribe(listener) {
      listeners.add(listener);
      if (release === null) release = attach();
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0 && release !== null) {
          release();
          release = null;
        }
      };
    },
    _listeners: listeners,
    getState: () => head.value,
    _getHead: () => head,
    _getCommitted: () => source._getCommitted(),
    _getCommittedState: () => source._getCommitted().value,
    _getPublished: () => source._getPublished(),
    _markCommitted: (handle) => source._markCommitted(handle),
  };
}

export function useStore<S, A>(store: ReactConcurrentStore<S, A>): S;
export function useStore<S, A, T>(
  store: ReactConcurrentStore<S, A>,
  selector: (state: S) => T,
  isEqual?: (a: T, b: T) => boolean,
): T;

/**
 * Signature follows RFC #35449: `useStore(store, selector?)`. The selector is
 * a bail-out layer over the same primitive, never a separate read path.
 */
export function useStore<S, A, T>(
  store: ReactConcurrentStore<S, A>,
  selector?: (state: S) => T,
  isEqual: (a: T, b: T) => boolean = Object.is,
): S | T {
  const view = useMemo(
    () =>
      selector === undefined
        ? store
        : (createSelectorStore(
            store as ConcurrentStoreInternals<S, A>,
            selector,
            isEqual,
          ) as ReactConcurrentStore<S, A>),
    [store, selector, isEqual],
  );

  const state = use(useHandle(view));
  return selector === undefined ? state : selector(state);
}
