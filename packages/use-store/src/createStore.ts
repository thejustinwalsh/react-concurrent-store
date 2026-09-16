/**
 * `createStore`, and nothing that needs a Hook.
 *
 * Separate from useStore.ts so it can be imported where React's client build
 * is not: a module that imports `useState` or `useInsertionEffect` cannot be
 * pulled into a React Server Component graph at all, whatever directives it
 * carries. Published as `react-concurrent-store/store`.
 */
import { deferToTransition, transitionScope } from "./runtime";
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
      deferToTransition(() => {
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
