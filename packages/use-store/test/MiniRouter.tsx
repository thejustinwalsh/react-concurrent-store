/**
 * A minimal TanStack-Router-shaped router, built only on this package's public
 * API.
 *
 * Routers are the sharpest case for a concurrent store and nobody has written
 * one down. A navigation is a transition that suspends on its loader, so while
 * it is in flight the tree is showing the old route — and anything urgent the
 * user does in the meantime has to land on what they are looking at, not on
 * the route that has not arrived. That is rebasing, arrived at from the one
 * direction where it is not a contrived example.
 *
 * TanStack Router drives navigation through React transitions and TanStack
 * Query reads through useSyncExternalStore, so the pair inherits the de-opt
 * this package exists to avoid. This models the router half.
 *
 * Imports nothing but `createStore` and `useStore`.
 */
import { startTransition, use, useEffect } from "react";
import { createStore, useStore } from "../src/useStore";

export type RouterState<Path extends string> = {
  /** The route the router is resolving towards. */
  location: Path;
  /** Routes whose loaders have been kicked off ahead of time. */
  preloaded: Path[];
  /** Application state that lives beside the route, as a real router has. */
  scratch: Record<string, unknown>;
};

type Action<Path extends string> =
  | { type: "navigate"; to: Path }
  | { type: "preload"; to: Path }
  | { type: "set"; key: string; value: unknown };

export type Loader<Path extends string> = (to: Path) => Promise<unknown>;

export type MiniRouter<Path extends string> = {
  state(): RouterState<Path>;
  /** A navigation is a transition, which is what a router actually does. */
  navigate(to: Path): void;
  /** Warms a loader without moving the location. */
  preload(to: Path): void;
  /** An ordinary urgent update, the kind a user makes while waiting. */
  set(key: string, value: unknown): void;
  /** The loaded data for a route, as a promise `use()` can unwrap. */
  load(to: Path): Promise<unknown>;
  store: ReturnType<typeof createStore<RouterState<Path>, Action<Path>>>;
};

export function createRouter<Path extends string>(
  initial: Path,
  loader: Loader<Path>,
): MiniRouter<Path> {
  const reduce = (
    state: RouterState<Path>,
    action: Action<Path>,
  ): RouterState<Path> => {
    switch (action.type) {
      case "navigate":
        return state.location === action.to
          ? state
          : { ...state, location: action.to };
      case "preload":
        return state.preloaded.includes(action.to)
          ? state
          : { ...state, preloaded: [...state.preloaded, action.to] };
      case "set":
        return {
          ...state,
          scratch: { ...state.scratch, [action.key]: action.value },
        };
    }
  };

  const store = createStore<RouterState<Path>, Action<Path>>(
    { location: initial, preloaded: [], scratch: {} },
    reduce,
  );

  // Loaders are cached by route, so `use()` is handed a stable promise.
  const loaded = new Map<Path, Promise<unknown>>();
  const load = (to: Path) => {
    let pending = loaded.get(to);
    if (pending === undefined) {
      pending = loader(to);
      loaded.set(to, pending);
    }
    return pending;
  };

  return {
    state: () => store.getState(),
    navigate(to) {
      load(to);
      startTransition(() => store.dispatch({ type: "navigate", to }));
    },
    preload(to) {
      load(to);
      store.dispatch({ type: "preload", to });
    },
    set(key, value) {
      store.dispatch({ type: "set", key, value });
    },
    load,
    store,
  };
}

/** The current location, as a router hook would expose it. */
export function useLocation<Path extends string>(
  router: MiniRouter<Path>,
): Path {
  return useStore(router.store, (state: RouterState<Path>) => state.location);
}

/** A slice of the state living beside the route. */
export function useScratch<Path extends string>(
  router: MiniRouter<Path>,
  key: string,
): unknown {
  return useStore(
    router.store,
    (state: RouterState<Path>) => state.scratch[key],
  );
}

export function usePreloaded<Path extends string>(
  router: MiniRouter<Path>,
): string {
  return useStore(router.store, (state: RouterState<Path>) =>
    state.preloaded.join(","),
  );
}

/**
 * Renders the route the tree is showing, suspending on its loader. The
 * location it reads is the one `useStore` gives it — what the tree may show —
 * so it never renders a route the user has not arrived at.
 */
export function useRoute<Path extends string>(router: MiniRouter<Path>): {
  location: Path;
  data: unknown;
} {
  const location = useLocation(router);
  const data = use(router.load(location));
  return { location, data };
}

/** Subscribes to navigations, the way a router notifies history. */
export function useNavigationLog<Path extends string>(
  router: MiniRouter<Path>,
  onNavigate: (to: Path) => void,
): void {
  useEffect(
    () =>
      router.store.subscribe((action) => {
        if (action.type === "navigate") onNavigate(action.to);
      }),
    [router, onNavigate],
  );
}
