/**
 * Demonstrating how a Redux store could be connected to React using
 * `createStore` and `useStoreSelector`.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, act } from "@testing-library/react";
import { useState, startTransition } from "react";
import {
  combineReducers,
  configureStore,
  createSlice,
  StoreEnhancer,
} from "@reduxjs/toolkit";
import { experimental } from "../../index";
import Logger from "../../../test/TestLogger";

const { createStoreFromSource, StoreProvider, useStoreSelector } = experimental;

let logger: Logger;

beforeEach(() => {
  logger = new Logger();
});

afterEach(() => {
  logger.assertLog([]);
});

/**
 * Sketch of a possible way to produce a React store alongside a Redux store
 * using Redux's enhancer mechanism.
 *
 * The Redux Store's API poses two problems for React:
 *
 * 1. It does not expose the update action to subscribers
 * 2. It does not expose the reducer function to outsiders
 *
 * These are both needed by React since it needs to be able to implement React's
 * update reordering smeantics. To work around this, we emply a store enhancer
 * which allows us to:
 *
 * 1. Monkey patch Store.dispatch so that we can observe update actions
 * 2. Capture the reducer function such that we can produce temporary states to
 *   implement reordering semantics
 *
 * https://jordaneldredge.com/notes/react-rebasing/
 */
const addReactStore: StoreEnhancer<any> = (createReduxStore) => {
  return (reducer, preloadedState) => {
    const store = createReduxStore(reducer, preloadedState);

    // The Redux store

    // Redux's subscribe does not expose the aciton being processed, and React's
    // store needs access to the action so that it can perform temporary update
    // reordering.
    const reactStore = createStoreFromSource({
      getState: store.getState,
      reducer: reducer,
    });

    function dispatch(action: any) {
      store.dispatch(action);
      reactStore.handleUpdate(action);
    }

    return { ...store, dispatch, reactStore };
  };
};

describe("createStore for Redux", () => {
  it("Using Redux Toolkit's configureStore", async () => {
    const counterSlice = createSlice({
      name: "counter",
      initialState: { value: 1 },
      reducers: {
        increment: (state) => {
          // Immer.js makes this immutable
          state.value += 1;
        },
        decrement: (state) => {
          // Immer.js makes this immutable
          state.value -= 1;
        },
      },
    });

    const { increment } = counterSlice.actions;

    const reducer = combineReducers({ counter: counterSlice.reducer });

    const reduxStore = configureStore({
      reducer: { counter: counterSlice.reducer },
      enhancers: (getDefaultEnhancers) => {
        return getDefaultEnhancers().concat(addReactStore);
      },
    });

    // @ts-expect-error TODO: Figure out typing of store enhancers
    const store = reduxStore.reactStore;

    // Selector
    function getCount(state: ReturnType<typeof reducer>) {
      return state.counter.value;
    }

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(store, getCount);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    let setShowOther: (value: boolean) => void;

    function App() {
      const [showOther, _setShowOther] = useState(false);
      // It's okay to leak set state in a test.
      setShowOther = _setShowOther;
      return (
        <StoreProvider>
          <Count testid="count" />
          {showOther && <Count testid="otherCount" />}
        </StoreProvider>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 1 }]);

    // Check that we mount correctly
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    let resolve: () => void;

    // Start, but don't complete, a transition update
    await act(async () => {
      startTransition(async () => {
        reduxStore.dispatch(increment());
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    logger.assertLog([]);

    // Check that the update has not flushed yet
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    // Reveal a new component which must read state on mount
    await act(async () => {
      setShowOther(true);
    });

    logger.assertLog([
      { testid: "count", count: 1 },
      // We initially render with the transition state
      { testid: "otherCount", count: 2 },
      // And then fixup in our useLayoutEffect to go back to the
      // sync state
      { testid: "otherCount", count: 1 },
    ]);
    // Check we mount with the pre-transition state
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    // Complete the transition
    await act(async () => {
      resolve();
    });

    logger.assertLog([
      { testid: "count", count: 2 },
      { testid: "otherCount", count: 2 },
    ]);

    // Check the original count component updated
    // Check the newly mounted count component updated
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
        <div>
          2
        </div>
      </DocumentFragment>
    `);
    unmount();
    expect(store._listeners.length).toBe(0);
  });
});
