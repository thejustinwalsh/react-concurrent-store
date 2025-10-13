import * as React from 'react';
import {
  createContext,
  memo,
  startTransition,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

const sharedReactInternals: {T: unknown} =
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE as any;

function reactTransitionIsActive() {
  return !!sharedReactInternals.T;
}

type Reducer<S, A> = (state: S, action: A) => S;

type StateHooks<S, A> = {
  StoreProvider: React.FC<{children: React.ReactNode}>,
  useStoreSelector: <T>(selector: (state: S) => T) => T,
  useStoreDispatch: () => (action: A) => void,
  dispatch: (action: A) => void,
};

/**
 * Produces a concurrent safe store in the form of pre-bound hooks for reading
 * and writing the store.
 *
 * The hooks ensure that when new store readers mount, they will observe the
 * same state as all other components currently mounted, even if the store's
 * state is currently updating within a slow transition.
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
export function makeExperimentalStoreHooks<S, A>(
  reducer: Reducer<S, A>,
  initialValue: S,
): StateHooks<S, A> {
  const storeWrapper = new StoreWrapper<S, A>(reducer, initialValue);

  const storeContext = createContext<StoreWrapper<S, A> | null>(null);

    /**
   * An awkward kludge which attempts to signal back to the store when a
   * transition containing store updates has been committed to the React tree.
   */
  const CommitTracker = memo(() => {
    const [state, setState] = useState(storeWrapper.getCommittedState());
    useEffect(() => {
      return storeWrapper.subscribe(() => {
        setState(storeWrapper.getState());
      });
    }, []);

    useLayoutEffect(() => storeWrapper.commit(state), [state]);
    return null;
  });


  function StoreProvider({children}: {children: React.ReactNode}) {
    return (
      <storeContext.Provider value={storeWrapper}>
        <CommitTracker />
        {children}
      </storeContext.Provider>
    );
  }

  // We don't technically need to use context to access the store, we could just
  // close over the `storeWrapper` in each hook. However, we use context, with
  // an invariant, to ensure the `<StoreProvider />` is mounted in the tree
  // since the store provider includes the critical `<CommitTracker />`.
  function useStore(): StoreWrapper<S, A> {
    const store = useContext(storeContext);
    if (store == null) {
      throw new Error(
        'Expected store access to be nested within a <StoreProvider />',
      );
    }
    return store;
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
  function useStoreSelector<T>(selector: (state: S) => T): T {
    const previousSelectorRef = useRef(selector);
    if (selector !== previousSelectorRef.current) {
      throw new Error(
        'useStoreSelector does not currently support dynamic selectors',
      );
    }
    const store = useStore();

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
      return store.subscribe(() => {
        setState(selector(store.getState()));
      });
      // We intentionally ignore `state` since we only care about its value on mount
    }, []);

    return state;
  }

  function useStoreDispatch(): (action: A) => void {
    const store = useStore();
    // Note: Here we depend upon `StoreWrapper.dispatch` being a bound method.
    return store.dispatch;
  }

  return {
    dispatch: storeWrapper.dispatch,
    useStoreSelector,
    useStoreDispatch,
    StoreProvider,
  };
}

class StoreWrapper<S, A> {
  reducer: Reducer<S, A>;
  state: S;
  committedState: S;
  subscriptions: Array<() => void> = [];
  constructor(reducer: Reducer<S, A>, initialValue: S) {
    this.reducer = reducer;
    this.state = initialValue;
    this.committedState = initialValue;
  }

  commit(state: S) {
    this.committedState = state;
  }
  getCommittedState(): S {
    return this.committedState;
  }
  getState(): S {
    return this.state;
  }
  dispatch = (action: A) => {
    const noPendingTransitions = this.committedState === this.state;
    this.state = this.reducer(this.state, action);

    if (reactTransitionIsActive()) {
      // For transition updates, everything is simple. Just notify all readers
      // of the new state.
      this.notify();
    } else {
      // For sync updates, we must consider if we need to juggle multiple state
      // updates.

      // If there are no pending transition updates, things are very similar to
      // a transition update except that we can proactively mark the new state
      // as committed.
      if (noPendingTransitions) {
        this.committedState = this.state;
        this.notify();
      } else {
        // If there are pending transition updates, we must ensure we compute
        // an additional new states: This update applied on top of the current
        // committed state.

        const newState = this.state;

        // React's rebasing semantics mean readers will expect to see this
        // update applied on top of the currently committed state sync.
        this.committedState = this.reducer(this.committedState, action);
        // Temporarily set the state so that readers during this notify read the
        // new committed state.
        this.state = this.committedState;
        this.notify();

        // Now that we've triggered the sync updates, we need to ensure the
        // pending transition update now goes to the correct new state. We reset
        // the state to point to the new transition state and trigger a set of
        // updates inside a transition.

        // With existing transition semantics this should result in these
        // updates entangling with the previous transition and that transition
        // will now include this state instead of the previously pending state.
        this.state = newState;
        startTransition(() => {
          this.notify();
        });
      }
    }
  };

  notify() {
    this.subscriptions.forEach(cb => {
      cb();
    });
  }

  subscribe(cb: () => void): () => void {
    const wrapped = () => cb();
    this.subscriptions.push(wrapped);
    return () => {
      this.subscriptions = this.subscriptions.filter(s => s !== wrapped);
    };
  }
}
