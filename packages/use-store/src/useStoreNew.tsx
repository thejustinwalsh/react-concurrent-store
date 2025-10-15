import * as React from "react";
import {
  createContext,
  memo,
  startTransition,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Store } from "./Store";
import { ISource, Reducer } from "./types";
import { StoreManager } from "./StoreManager";

/**
 * Concurrent-Safe Store
 *
 * The store and a associated hook ensures that when new store readers mount,
 * they will observe the same state as all other components currently mounted,
 * even if the store's state is currently updating within a slow transition.
 *
 * They further ensure that React's rebasing rules apply to state observed via
 * these hooks. Specifically, updates always apply in the order in chronological
 * order. This means that if a sync update to the store is triggered while a
 * transition update to the store is still pending that sync update will apply
 * on top of the pre-transition state (as if the transition update had not yet
 * happened), but when the transition resolves it will reflect the chronological
 * ordering of: initial, transition, sync.
 *
 * Note: Rather than expose generic versions of these hooks/providers and have them
 * read the store via context, we use a factory function which returns pre-bound
 * functions. This has the advantage of producing typed variants of the hooks.
 *
 * A more standard context based solution should also be possible.
 */
export function createStore<S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
): Store<S, A> & { dispatch: (action: A) => void } {
  let state = initialState;
  const store = new Store<S, A>({
    getState: () => state,
    reducer,
  });

  // @ts-expect-error TODO: Fix typing
  store.dispatch = (action: A) => {
    state = reducer(state, action);
    store.handleUpdate(action);
  };
  // @ts-expect-error TODO: Fix typing
  return store;
}

export function createStoreFromSource<S, A>(
  source: ISource<S, A>,
): Store<S, A> {
  return new Store<S, A>(source);
}

const storeManagerContext = createContext<StoreManager | null>(null);

/**
 * An awkward kludge which attempts to signal back to the stores when a
 * transition containing store updates has been committed to the React tree.
 */
const CommitTracker = memo(
  ({ storeManager }: { storeManager: StoreManager }) => {
    const [allStates, setAllStates] = useState(
      storeManager.getAllCommittedStates(),
    );
    useEffect(() => {
      const unsubscribe = storeManager.subscribe(() => {
        const allStates = storeManager.getAllStates();
        setAllStates(allStates);
      });
      return () => {
        unsubscribe();
        storeManager.sweep();
      };
    }, [storeManager]);

    useLayoutEffect(() => {
      storeManager.commitAllStates(allStates);
    }, [storeManager, allStates]);
    return null;
  },
);

/**
 * A single provider which tracks commits for all stores being read in the tree.
 */
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [storeManager] = useState(() => new StoreManager());
  return (
    <storeManagerContext.Provider value={storeManager}>
      <CommitTracker storeManager={storeManager} />
      {children}
    </storeManagerContext.Provider>
  );
}

/**
 * Tearing-resistant hook for consuming application state locally within a
 * component (without prop drilling or putting state in context).
 *
 * Attempts to avoid the failure mode where the application state is updating as
 * part of a transition and a sync state change causes a new component to mount
 * that reads the application state.
 *
 * A naive implementation which simply subscribes to state changes in a useEffect
 * would incorrectly mount using the pending state causing tearing between the
 * newly mounted component (showing the new state) and the previously mounted
 * components which would still be showing the old state.
 *
 * A slightly more sophisticated approach which mounts with the currently
 * committed state would suffer from permanent tearing since the mount state
 * would not update to the pending state along with the rest of the
 * pending transition.
 *
 * This approach mounts with the currently committed state and then, if needed
 * schedules a "fixup" update inside a transition to ensure the newly mounted
 * component updates along with any other components that are part of the
 * current pending transition.
 *
 * This implementation also attempts to solve for a non-concurrent race
 * condition where state updates between initial render and when the
 * `useEffect` mounts. e.g. in the `useEffect` of another component that gets
 * mounted before this one. Here the risk is that we miss the update, since we
 * are not subscribed yet, and end up rendering the stale state with no update
 * scheduled to catch us up with the rest of the app.
 */
export function useStoreSelector<S, T>(
  store: Store<S, any>,
  selector: (state: S) => T,
): T {
  const storeManager = useContext(storeManagerContext);
  if (storeManager == null) {
    throw new Error(
      "Expected useStoreSelector to be rendered within a StoreProvider.",
    );
  }
  const previousStoreRef = useRef(store);
  if (store !== previousStoreRef.current) {
    throw new Error(
      "useStoreSelector does not currently support dynamic stores",
    );
  }
  const previousSelectorRef = useRef(selector);
  if (selector !== previousSelectorRef.current) {
    throw new Error(
      "useStoreSelector does not currently support dynamic selectors",
    );
  }

  // Counterintuitively we initially render with the transition/head state
  // instead of the committed state. This is required in order for us to
  // handle the case where we mount as part of a transition which is actively
  // changing the state we observe. In that case, if we _don't_ mount with the
  // transition state, there's no place where we can schedule a fixup which
  // will get entangled with the transition that is rendering us. React forces
  // all setStates fired during render into their own lane, and by the time
  // our useLayoutEffect fires, the transition will already be completed.
  //
  // Instead we must initially render with the transition state and then
  // trigger a sync fixup setState in the useLayoutEffect if we are mounting
  // sync and thus should be showing the committed state.
  const [state, setState] = useState<T>(() => selector(store.getState()));

  useLayoutEffect(() => {
    // Ensure our store is managed by the tracker.
    storeManager.addStore(store);
    const mountState = selector(store.getState());
    const mountCommittedState = selector(store.getCommittedState());

    // If we are mounting as part of a sync update mid transition, our initial
    // render value was wrong and we must trigger a sync fixup update.
    // Similarly, if a sync state update was triggered between the moment we
    // rendered and now (e.g. in some sibling component's useLayoutEffect) we
    // need to trigger a fixup.
    //
    // Both of these cases manifest as our initial render state not matching
    // the currently committed state.
    if (state !== mountCommittedState) {
      setState(mountCommittedState);
    }

    // If we mounted mid-transition, and that transition is still ongoing, we
    // mounted with the pre-transition state but are not ourselves part of the
    // transition. We must ensure we update to the new state along with the
    // rest of the UI when the transition resolves
    if (mountState !== mountCommittedState) {
      // Here we tell React to update us to the new pending state. Since all
      // state updates are propagated to React components in transitions, we
      // assume there is a transition currently happening, and (unsafely)
      // depend upon current transition entanglement semantics which we expect
      // will ensure this update gets added to the currently pending
      // transition. Our goal is that when the transition that was pending
      // while we were mounting resolves, it will also include rerendering
      // this component to reflect the new state.
      startTransition(() => {
        setState(mountState);
      });
    }
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      setState(selector(state));
    });
    return () => {
      unsubscribe();
      storeManager.removeStore(store);
    };
    // We intentionally ignore `state` since we only care about its value on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

function identity<T>(x: T): T {
  return x;
}

export function useStore<S>(store: Store<S, any>): S {
  return useStoreSelector(store, identity);
}
