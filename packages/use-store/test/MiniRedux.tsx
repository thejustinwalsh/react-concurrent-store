/**
 * A minimal react-redux, built only on this package's public API.
 *
 * The point is markerikson's prototype in reduxjs/react-redux#2263, where
 * porting `useSelector` left three failures: the latest selector not being
 * used, transient stale-props errors escaping through dispatch, and
 * render-phase errors no longer reaching the boundary. Those are the semantics
 * this reimplements, so they can be asserted rather than assumed.
 *
 * Imports nothing but `createStore`, `useStore` and the equality wrapper.
 */
import { createContext, useContext, type ReactNode } from "react";
import { createStore, type ReactConcurrentStore } from "../src/useStore";
import { useStoreWithEqualityFn } from "../src/withEqualityFn";

export type Reducer<S, A> = (state: S, action: A) => S;

export type ReduxStore<S, A> = {
  getState(): S;
  dispatch(action: A): void;
  react: ReactConcurrentStore<S, A>;
};

export function createReduxStore<S, A>(
  reducer: Reducer<S, A>,
  preloadedState: S,
): ReduxStore<S, A> {
  // The application owns the reducer, so the React store can fold it directly.
  // No bridging construct is needed.
  const react = createStore<S, A>(preloadedState, reducer);
  return {
    getState: () => react.getState(),
    dispatch: (action) => react.dispatch(action),
    react,
  };
}

const context = createContext<ReduxStore<unknown, unknown> | null>(null);

export function Provider<S, A>({
  store,
  children,
}: {
  store: ReduxStore<S, A>;
  children: ReactNode;
}) {
  return (
    <context.Provider value={store as ReduxStore<unknown, unknown>}>
      {children}
    </context.Provider>
  );
}

export function useStoreFromContext<S, A>(): ReduxStore<S, A> {
  const store = useContext(context);
  if (store === null) {
    throw new Error("useSelector must be used within a <Provider>.");
  }
  return store as ReduxStore<S, A>;
}

export function shallowEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }
  const left = a as Record<string, unknown>;
  const right = b as Record<string, unknown>;
  const keys = Object.keys(left);
  if (keys.length !== Object.keys(right).length) return false;
  return keys.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(right, key) &&
      Object.is(left[key], right[key]),
  );
}

export function useSelector<S, T>(
  selector: (state: S) => T,
  equalityFn: (a: T, b: T) => boolean = Object.is,
): T {
  const store = useStoreFromContext<S, unknown>();
  return useStoreWithEqualityFn(store.react, selector, equalityFn);
}
