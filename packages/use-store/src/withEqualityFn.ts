import { useCallback } from "react";
import { useStore, type ReactConcurrentStore } from "./useStore";

/**
 * Re-render only when a selected slice is unequal by your own comparison.
 *
 * `useStore` takes no equality argument, the same way React ships
 * `useSyncExternalStore` without one. This is the wrapper, in its own entry
 * point so it costs nothing unless imported:
 *
 * ```ts
 * import { useStoreWithEqualityFn } from "react-concurrent-store/with-equality-fn";
 * ```
 */
export function useStoreWithEqualityFn<S, A, T>(
  store: ReactConcurrentStore<S, A>,
  selector: (state: S) => T,
  isEqual: (a: T, b: T) => boolean = Object.is,
): T {
  const withEquality = useCallback(
    // Returning the previous reference is how `useStore` is told to bail out.
    (state: S, previous: T | undefined): T => {
      const next = selector(state);
      return previous !== undefined && isEqual(previous, next) ? previous : next;
    },
    [selector, isEqual],
  );

  return useStore(store, withEquality);
}
