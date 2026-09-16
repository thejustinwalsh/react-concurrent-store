/**
 * Separate from useStore.ts so it imports no Hook, and so can be used in a
 * React Server Component. Published as `react-concurrent-store/store`.
 */
import { deferToTransition, transitionScope } from "./runtime";
import { Reducer } from "./types";

/**
 * A fulfilled promise carrying `status`/`value`, the shape React reads to
 * unwrap `use()` without a microtask. Version and identity order commits, so
 * two versions holding equal values stay distinguishable.
 */
export type StoreHandle<S> = {
  status: "fulfilled";
  value: S;
  version: number;
};


function makeHandle<S>(value: S, version: number): StoreHandle<S> {
  return { status: "fulfilled", value, version };
}


function isThenable(value: unknown): value is PromiseLike<unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    "then" in value &&
    typeof value.then === "function"
  );
}

/** Shaped like `ReactStore` in React RFC #35449, renamed so it cannot collide. */
export interface ReactConcurrentStore<S, A> {
  /** The current state. Use `useStore` inside components. */
  getState(): S;
  /** Apply an action. */
  dispatch(action: A): void;
  /** Called after each update, with the action already applied. */
  subscribe(callback: (action: A) => void): () => void;
}

/** Commit bookkeeping React would keep privately. Not part of the public API. */
export interface ConcurrentStoreInternals<S, A>
  extends ReactConcurrentStore<S, A> {
  /**
   * A listener returns whether it took the handle. A publish nobody takes
   * renders nothing, so the commit pointer can move with it.
   */
  _subscribe(
    listener: (handle: StoreHandle<S>) => boolean,
    /** What this reader is showing. A view seeds its slice memory from it. */
    from: StoreHandle<S>,
    /** Stable for the reader's lifetime, unlike the listener. */
    reader: object,
  ): () => void;
  /**
   * The commit pointer moving forward. A separate channel because this fires
   * during commit, where the publish path would re-enter rebasing.
   */
  _onCommit(
    listener: (handle: StoreHandle<S>) => void,
    reader: object,
  ): () => void;
  readonly _head: StoreHandle<S>;
  readonly _committed: StoreHandle<S>;
  /** The handle this store was created with. */
  readonly _initial: StoreHandle<S>;
  /**
   * Whether the store moved before anything read it — the only case where a
   * reader would mount on something other than the server's value.
   */
  readonly _drifted: boolean;
  /**
   * What per-pass bookkeeping is keyed by.Every reader builds its own view, so
   * keying by the view would hide two readers of one store from each other.
   */
  readonly _source: object;
  _markCommitted(handle: StoreHandle<S>, reader: object): void;
  /** The reader unmounted: it will never commit what it took. */
  _forget(reader: object): void;
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

  const listeners = new Map<(handle: StoreHandle<S>) => boolean, object>();
  const commitListeners = new Map<(handle: StoreHandle<S>) => void, object>();
  const actionListeners = new Set<(action: A) => void>();
  /**
   * While the two versions are apart: readers that took a Transition toward
   * head and have not committed it, and readers that have. The versions rejoin
   * only when nobody is behind, so one root committing cannot settle the store
   * for a root still waiting on the same Transition.
   */
  const behind = new Set<object>();
  const ahead = new Set<object>();
  /** Rebased versions, which committing does not move a reader to head. */
  const rebased = new WeakSet<StoreHandle<S>>();

  /** Returns how many readers took the handle. */
  const notify = (handle: StoreHandle<S>, inTransition: boolean) => {
    let taken = 0;
    for (const [listener, reader] of listeners) {
      if (!listener(handle)) continue;
      taken += 1;
      if (inTransition) behind.add(reader);
    }
    return taken;
  };
  const notifyAction = (action: A) => {
    for (const callback of actionListeners) callback(action);
  };

  /** The tree has caught up: the two folds are the same again. */
  const settle = (handle: StoreHandle<S>) => {
    behind.clear();
    ahead.clear();
    sync = handle;
    head = handle;
    if (handle.version > committed.version) committed = handle;
  };

  // Said once per store rather than once per dispatch.
  let warned = false;

  const store: ConcurrentStoreInternals<S, A> = {
    dispatch(action) {
      const urgent = transitionScope() === null;

      const headValue = fold(head.value, action);
      if (Object.is(headValue, head.value)) return;

      // By identity, not value: an object state is a fresh object every fold,
      // so comparing values would make every dispatch look like a rebase.
      const parted = sync !== head;

      const rebasing = urgent && parted;
      const syncValue = rebasing ? fold(sync.value, action) : headValue;

      // Urgent, and the value does not exist yet: nothing to show, so the
      // folds rejoin and the boundary takes it. Judged on the fold the tree
      // would show — deciding by head would collapse over a value nobody is
      // looking at, losing an urgent update made during a fetch.
      const collapsed = urgent && isThenable(syncValue);

      // Replacing a promise-valued store is ordinary and silent. This is the
      // narrower case: expecting an urgent update to appear now, with nothing
      // but a promise to fold it over.
      if (collapsed && rebasing && isThenable(sync.value) && !warned) {
        warned = true;
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
        if (notify(head, false) === 0) settle(head);
        return;
      }

      if (!urgent) {
        // Only the chronological fold takes it, and the notification inherits
        // the caller's transition. This is where the two part.
        head = makeHandle(headValue, ++version);
        notifyAction(action);
        notify(head, true);
        if (behind.size === 0) settle(head);
        return;
      }

      if (!parted) {
        // Nothing outstanding: one fold serves both.
        head = makeHandle(headValue, ++version);
        sync = head;
        notifyAction(action);
        // Nobody took it, so no render is coming and nothing is outstanding.
        if (notify(head, false) === 0) settle(head);
        return;
      }

      // Both folds take it, from different places: the tree gets what it can
      // show now, and the chronological order follows in a transition.
      sync = makeHandle(syncValue, ++version);
      rebased.add(sync);
      head = makeHandle(headValue, ++version);
      notifyAction(action);
      const onScreen = sync;
      const chronological = head;
      // A reader that committed the Transition shows head, so it rebases there.
      for (const [listener, reader] of listeners) {
        listener(ahead.has(reader) ? chronological : onScreen);
      }
      deferToTransition(() => {
        for (const [listener, reader] of listeners) {
          if (!ahead.has(reader) && listener(chronological)) behind.add(reader);
        }
      });
    },

    getState: () => head.value,
    subscribe(callback) {
      actionListeners.add(callback);
      return () => {
        actionListeners.delete(callback);
      };
    },

    _subscribe(listener, _from, reader) {
      listeners.set(listener, reader);
      return () => {
        listeners.delete(listener);
      };
    },
    _onCommit(listener, reader) {
      commitListeners.set(listener, reader);
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
    _markCommitted(handle, reader) {
      settled = true;
      if (sync !== head && !rebased.has(handle) && handle.version > sync.version) {
        behind.delete(reader);
        ahead.add(reader);
      }
      // Monotonic: a reader still catching up must not drag the pointer back.
      if (handle.version > committed.version) {
        committed = handle;
        // A reader that was level with the tree while this was in flight
        // waited here rather than starting a transition of its own. The tree
        // has now shown this, so bring it forward. Readers already at or past
        // it ignore the call.
        for (const [listener, reader] of commitListeners) {
          // Behind: it arrives with its own Transition, not as a blocking
          // update. Ahead: it already shows head, so a rebased version is older.
          if (behind.has(reader)) continue;
          if (ahead.has(reader) && rebased.has(committed)) continue;
          listener(committed);
        }
      }
      // The tree has reached the chronological end, so the two folds are the
      // same again. A reader committing only the *sync* view settles nothing:
      // the transition's action is still outstanding.
      if (committed === head && behind.size === 0) settle(head);
    },
    _forget(reader) {
      ahead.delete(reader);
      if (behind.delete(reader) && behind.size === 0 && committed === head) {
        settle(head);
      }
    },
  };

  return store;
}
