import {
  startTransition,
  use,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Reducer } from "./types";

/**
 * A versioned, already-fulfilled handle on store state.
 *
 * Not a Promise: the native resolution procedure adopts thenables, so building
 * one from `value` would swallow a caller's promise when `S` is itself a
 * promise. `use()` unwraps via `status`/`value`, so a tagged box is enough.
 */
export type StoreHandle<S> = PromiseLike<S> & {
  status: "fulfilled";
  value: S;
  version: number;
};

class Handle<S> implements StoreHandle<S> {
  readonly status = "fulfilled";

  constructor(
    readonly value: S,
    readonly version: number,
  ) {}

  // `then` on the prototype, like a real promise, so handles differ only by
  // value. React never calls it: `use` unwraps through status/value.
  then(): PromiseLike<S>;
  then<TResult>(
    onfulfilled: (value: S) => TResult | PromiseLike<TResult>,
  ): PromiseLike<TResult>;
  then<TResult>(
    onfulfilled?: (value: S) => TResult | PromiseLike<TResult>,
  ): PromiseLike<S | TResult> {
    const { value } = this;
    // Started empty: resolving *with* `value` would adopt a thenable `S`.
    return Promise.resolve().then(() =>
      onfulfilled ? onfulfilled(value) : value,
    );
  }
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
  /** Subscribe to published handles; readers need to know *which* was sent. */
  _subscribe(listener: (handle: StoreHandle<S>) => void): () => void;
  readonly _head: StoreHandle<S>;
  readonly _committed: StoreHandle<S>;
  /** Last handle published at the caller's priority; a late subscriber's target. */
  readonly _published: StoreHandle<S>;
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
  let head = new Handle(initialValue, version);
  let sync = head;
  let committed = head;
  let published = head;

  const listeners = new Set<(handle: StoreHandle<S>) => void>();
  const actionListeners = new Set<(action: A) => void>();
  const notify = (handle: StoreHandle<S>) => {
    for (const listener of listeners) listener(handle);
  };
  const notifyAction = (action: A) => {
    for (const callback of actionListeners) callback(action);
  };

  // Dispatches in one microtask share the caller's priority, so they take the
  // same path; otherwise a sync batch looks like a pending transition.
  let batching = false;
  let batchRebasing = false;

  const store: ConcurrentStoreInternals<S, A> = {
    dispatch(action) {
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
        head = new Handle(chronological, ++version);
        sync = head;
        published = head;
        notifyAction(action);
        // Nothing mounted means nothing to tear against.
        if (listeners.size === 0) committed = head;
        notify(head);
        return;
      }

      // Thenable state replaces rather than folds, so the timelines collapse.
      // Folding twice would also allocate two promises for one dispatch.
      if (isThenable(chronological)) {
        head = new Handle(chronological, ++version);
        sync = head;
        published = head;
        notifyAction(action);
        notify(head);
        return;
      }

      // Publish the sync-relative view first: this notification inherits the
      // caller's priority, so no transition detection is needed. The first
      // sync update rebases onto `committed`, later ones chain along `sync`.
      const base = sync === head ? committed : sync;
      sync = new Handle(fold(base.value, action), ++version);
      head = new Handle(chronological, ++version);
      published = sync;
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
    get _head() {
      return head;
    },
    get _committed() {
      return committed;
    },
    get _published() {
      return published;
    },
    _markCommitted(handle) {
      // Monotonic: a reader still catching up must not drag the pointer back.
      if (handle.version > committed.version) committed = handle;
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

/** Concurrent-safe subscription to a store's current version. */
function useHandle<S, A>(store: ConcurrentStoreInternals<S, A>): StoreHandle<S> {

  // Mount at what this pass is committing, or at committed if we are first.
  const [handle, setHandle] = useState(
    () =>
      (renderedThisPass.get(store) as StoreHandle<S> | undefined) ??
      store._committed,
  );
  renderedThisPass.set(store, handle);

  useLayoutEffect(() => {
    // No startTransition: the update inherits the dispatching caller's priority.
    return store._subscribe((next) => {
      setHandle((prev) => (Object.is(prev.value, next.value) ? prev : next));
    });
  }, [store]);

  // Intentionally runs on every commit: the catch-up depends on where the
  // store is *now*, not on a dependency that changed.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const head = store._head;
    if (handle !== head) {
      if (store._committed === head) {
        // Siblings already committed head this pass. A setState from a layout
        // effect flushes before the commit returns, so nothing torn is painted.
        setHandle(head);
      } else {
        // Still pending: join it rather than landing ahead of the tree. Bare
        // startTransition, since useTransition's isPending is unused here.
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
 * The derived view backing `useStore(store, selector)`.
 *
 * Forwards the source's handles, but only when the selected slice changes. It
 * forwards `S` rather than `T` so the selector still runs during render, where
 * props and state agree; a throw from the speculative call means "cannot
 * decide", so we forward and let render decide. Subscribes lazily so the view
 * can be built during render without leaking.
 */
export function createSelectorStore<S, A, T>(
  source: ConcurrentStoreInternals<S, A>,
  selector: (state: S, previous: T | undefined) => T,
): ConcurrentStoreInternals<S, A> {
  let head = source._head;
  let last: { value: T } | null = null;
  let release: (() => void) | null = null;
  const listeners = new Set<(handle: StoreHandle<S>) => void>();

  const publish = (published: StoreHandle<S>) => {
    head = published;
    let next: T;
    try {
      next = selector(published.value, last?.value);
    } catch {
      for (const listener of listeners) listener(published);
      return;
    }
    if (last !== null && Object.is(next, last.value)) {
      // Readers already show equivalent content; say so, or the source's
      // commit pointer lags and every later dispatch sees a phantom transition.
      source._markCommitted(published);
      return;
    }
    last = { value: next };
    for (const listener of listeners) listener(published);
  };

  const attach = () => {
    try {
      last = { value: selector(head.value, undefined) };
    } catch {
      last = null;
    }
    const release = source._subscribe(publish);

    // Built during render but subscribed from a layout effect, so the source
    // can move in between. Catch up to the last priority-inheriting publish,
    // not to head, or a sync mount jumps to the pending transition's state.
    if (source._head !== head) {
      head = source._head;
      const current = source._published;
      try {
        last = { value: selector(current.value, last?.value) };
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
    getState: () => head.value,
    // Read-only: dispatch throws, but subscribers still see the source's
    // actions.
    subscribe: source.subscribe,

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
    get _head() {
      return head;
    },
    get _committed() {
      return source._committed;
    },
    get _published() {
      return source._published;
    },
    _markCommitted: (handle) => source._markCommitted(handle),
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
  const view = useMemo(
    () =>
      selector === undefined
        ? internals
        : createSelectorStore(internals, selector),
    [internals, selector],
  );

  const previous = useRef<T | undefined>(undefined);
  const state = use(useHandle(view));
  if (selector === undefined) return state;

  const value = selector(state, previous.current);
  previous.current = value;
  return value;
}
