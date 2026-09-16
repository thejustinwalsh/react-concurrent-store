import { useCallback, useSyncExternalStore } from "react";
import type { ConcurrentStoreInternals, ReactConcurrentStore } from "./useStore";

/**
 * Read a store urgently, while everything else waits on a transition.
 *
 * `useStore` honours what the caller said: a dispatch made inside
 * `startTransition` reaches its readers as a transition, and they move with the
 * rest of the tree. This is for the reader that cannot wait — a like count, a
 * toggle, a field — and it is a deliberate opt out of that transition, the way
 * `useDeferredValue` is a deliberate opt into lagging behind one.
 *
 * It is built on `useSyncExternalStore`, whose transition de-opt is the point
 * here rather than the defect it is elsewhere: it puts this reader's update on
 * the urgent lane. The value it reads is the urgent fold — what the tree may
 * show right now — not `getState`, which is the chronological state and
 * contains transitions that have not landed. And the handle is already
 * resolved, so the de-opted render has nothing to suspend on: no fallback.
 *
 * Two readers of the same slice, one through each hook, will disagree while a
 * transition is outstanding. That is what asking for different semantics means.
 * Pick one hook per slice.
 */
export function useStoreUrgent<S, A>(store: ReactConcurrentStore<S, A>): S;
export function useStoreUrgent<S, A, T>(
  store: ReactConcurrentStore<S, A>,
  selector: (state: S) => T,
): T;

export function useStoreUrgent<S, A, T>(
  store: ReactConcurrentStore<S, A>,
  selector?: (state: S) => T,
): S | T {
  const internals = store as ConcurrentStoreInternals<S, A>;

  const subscribe = useCallback(
    (onChange: () => void) => {
      // The action channel, not the publish channel: a listener on the publish
      // channel reports whether it took the handle, and this reader answering
      // "no" would tell the store nobody is waiting on that state.
      const release = store.subscribe(() => onChange());
      const releaseRejoin = internals._onCommit(() => onChange());
      return () => {
        release();
        releaseRejoin();
      };
    },
    [store, internals],
  );

  const snapshot = useCallback(
    () =>
      selector === undefined
        ? (internals._visible.value as S | T)
        : selector(internals._visible.value),
    [internals, selector],
  );

  return useSyncExternalStore(subscribe, snapshot, snapshot);
}
