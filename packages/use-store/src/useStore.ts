import {
  startTransition,
  use,
  useLayoutEffect,
  useMemo,
  useState,
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

class Handle<S> extends Promise<S> {
  status: "fulfilled" = "fulfilled";
  value!: S;
  version!: number;

  // `.then()` on a subclass would otherwise construct another Handle, whose
  // constructor signature is not an executor.
  static get [Symbol.species](): PromiseConstructor {
    return Promise;
  }

  static of<S>(value: S, version: number): StoreHandle<S> {
    const handle = new Handle<S>((resolve) => resolve(value));
    handle.value = value;
    handle.version = version;
    // Resolving with a thenable `S` adopts it, so a stored promise that
    // rejects would reject the handle too. The handle carries a value; it
    // makes no claim about that value's own settlement, and the consumer's
    // own `use()` still delivers the rejection.
    Promise.prototype.catch.call(handle, () => {});
    return handle as StoreHandle<S>;
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
  let head = Handle.of(initialValue, version);
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
  // Not `scheduler`: it schedules on macrotasks, which would hold this flag
  // across ticks that are genuinely separate.
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
        head = Handle.of(chronological, ++version);
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
        head = Handle.of(chronological, ++version);
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
      sync = Handle.of(fold(base.value, action), ++version);
      head = Handle.of(chronological, ++version);
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

/** Concurrent-safe subscription to a store's current version. */
function useHandle<S, A>(store: ConcurrentStoreInternals<S, A>): StoreHandle<S> {

  // Mount at what this pass is committing, or at committed if we are first.
  const [handle, setHandle] = useState(
    () =>
      (renderedThisPass.get(store) as StoreHandle<S> | undefined) ??
      store._committed,
  );
  recordRendered(store, handle as StoreHandle<unknown>);

  useLayoutEffect(() => {
    // No startTransition: the update inherits the dispatching caller's priority.
    return store._subscribe((next) => {
      setHandle((prev) => (Object.is(prev.value, next.value) ? prev : next));
    });
  }, [store]);

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
  const listeners = new Set<(handle: StoreHandle<S>) => void>();

  const publish = (published: StoreHandle<S>) => {
    head = published;
    if (selector === undefined) {
      forwarded = published;
      for (const listener of listeners) listener(published);
      return;
    }
    let next: T;
    try {
      next = selector(published.value, last?.value);
    } catch {
      // Cannot decide: forward and let render settle it.
      forwarded = published;
      for (const listener of listeners) listener(published);
      return;
    }
    if (last !== null && Object.is(next, last.value)) {
      return;
    }
    last = { value: next };
    forwarded = published;
    for (const listener of listeners) listener(published);
  };

  const attach = () => {
    try {
      last = selector === undefined ? null : { value: selector(head.value, undefined) };
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
        last =
          selector === undefined
            ? null
            : { value: selector(current.value, last?.value) };
      } catch {
        last = null;
      }
      forwarded = current;
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
      return forwarded;
    },
    get _committed() {
      return source._committed;
    },
    get _published() {
      return source._published;
    },
    _markCommitted: (handle) => source._markCommitted(handle),
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

  // Before useHandle's own effects, so the view has a selector by the time it
  // subscribes. No dependency array: the selector changes identity every
  // render and this is what keeps the view current without a render-phase
  // write.
  useLayoutEffect(() => {
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
