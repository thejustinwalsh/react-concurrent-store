import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, act } from "@testing-library/react";
import React, {
  useState,
  startTransition,
  useEffect,
  useLayoutEffect,
  Suspense,
  use,
  Component,
} from "react";
import { flushSync } from "react-dom";
import { experimental } from "../index";
import Logger from "../../test/TestLogger";

const {
  createStore,
  StoreProvider,
  useStoreSelector,
  useStoreSelectorWithEquality,
} = experimental;

type State = number;

type Action =
  | {
      type: "INCREMENT";
    }
  | {
      type: "DOUBLE";
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DOUBLE":
      return state * 2;
    default:
      return state;
  }
}

function identity<T>(v: T): T {
  return v;
}

let logger: Logger;

beforeEach(() => {
  logger = new Logger();
});

afterEach(() => {
  logger.assertLog([]);
});

describe("Experimental Userland Store", () => {
  it("Does not tear when new component mounts mid transition", async () => {
    const store = createStore(reducer, 1);

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(store, identity);
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
        store.dispatch({ type: "INCREMENT" });
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

  it("Does not tear when new component mounts in its own transition mid transition", async () => {
    const store = createStore(reducer, 1);

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(store, identity);
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
        store.dispatch({ type: "INCREMENT" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

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
      startTransition(() => {
        setShowOther(true);
      });
    });

    logger.assertLog([]);

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

  it("Does not miss updates triggered in useEffect or useLayoutEffect", async () => {
    const store = createStore(reducer, 1);

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(store, identity);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    function IncrementOnMount() {
      useEffect(() => {
        startTransition(() => {
          store.dispatch({ type: "INCREMENT" });
        });
      }, []);
      return null;
    }

    function IncrementTransitionOnLayout() {
      useLayoutEffect(() => {
        startTransition(() => {
          store.dispatch({ type: "INCREMENT" });
        });
      }, []);
      return null;
    }

    const { rerender, asFragment, unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <IncrementOnMount />
          <Count testid="count" />
        </StoreProvider>,
      );
    });

    logger.assertLog([
      { testid: "count", count: 1 },
      { testid: "count", count: 2 }, // Fixup render triggered by increment on mount
    ]);

    // Check that we mount correctly
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
      </DocumentFragment>
    `);

    await act(async () => {
      rerender(
        <StoreProvider>
          <Count testid="count" />
          <IncrementOnMount />
          <Count testid="otherCount" />
        </StoreProvider>,
      );
    });

    logger.assertLog([
      { testid: "count", count: 2 },
      { testid: "otherCount", count: 2 },
      { testid: "count", count: 3 }, // Fixup render triggered by increment on mount
      { testid: "otherCount", count: 3 }, // Fixup render triggered by increment on mount
    ]);

    // Check that we mount correctly
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          3
        </div>
        <div>
          3
        </div>
      </DocumentFragment>
    `);

    await act(async () => {
      rerender(
        <StoreProvider>
          <IncrementTransitionOnLayout />
          <Count testid="count" />
        </StoreProvider>,
      );
    });

    logger.assertLog([
      { testid: "count", count: 3 },
      { testid: "count", count: 4 }, // Fixup render triggered by increment on mount
    ]);

    // Check that we mount correctly
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          4
        </div>
      </DocumentFragment>
    `);

    expect(store.getCommittedState()).toBe(4);

    await act(async () => {
      rerender(
        <StoreProvider>
          <Count testid="count" />
          <IncrementTransitionOnLayout />
          <Count testid="otherCount" />
        </StoreProvider>,
      );
    });

    logger.assertLog([
      { testid: "count", count: 4 },
      { testid: "otherCount", count: 4 },
      { testid: "count", count: 5 }, // Fixup render triggered by increment on mount
      { testid: "otherCount", count: 5 }, // Fixup render triggered by increment on mount
    ]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          5
        </div>
        <div>
          5
        </div>
      </DocumentFragment>
    `);
    unmount();
    expect(store._listeners.length).toBe(0);
  });

  // This should catch the case where fixups accidentally could get entangled with a transition when they should flush sync.
  it("Does not miss sync updates triggered in useEffect or useLayoutEffect during a long-running transition", async () => {
    const store = createStore(reducer, 2);

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(store, identity);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    function IncrementOnMount() {
      useEffect(() => {
        store.dispatch({ type: "INCREMENT" });
      }, []);
      return null;
    }

    function IncrementOnLayout() {
      useLayoutEffect(() => {
        store.dispatch({ type: "INCREMENT" });
      }, []);
      return null;
    }

    // Start a long running transition that will run for the whole test. This
    // should catch cases where fixups get

    let resolve: () => void;
    startTransition(async () => {
      store.dispatch({ type: "DOUBLE" });
      await new Promise<void>((_resolve) => {
        resolve = _resolve;
      });
    });

    const { rerender, asFragment, unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <IncrementOnMount />
          <Count testid="count" />
        </StoreProvider>,
      );
    });

    logger.assertLog([
      // We initially render with the transition state
      { testid: "count", count: 4 },
      // But fixup to the incremented state before yielding
      { testid: "count", count: 3 },
    ]);

    // Check that we mount correctly
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          3
        </div>
      </DocumentFragment>
    `);

    await act(async () => {
      rerender(
        <StoreProvider>
          <Count testid="count" />
          <IncrementOnMount />
          <Count testid="otherCount" />
        </StoreProvider>,
      );
    });

    logger.assertLog([
      // We initially render with the transition state
      { testid: "count", count: 5 },
      // We initially render with the transition state
      { testid: "otherCount", count: 5 },
      { testid: "count", count: 4 }, // Fixup render triggered by increment on mount
      { testid: "otherCount", count: 4 }, // Fixup render triggered by increment on mount
    ]);

    // Check that we mount correctly
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          4
        </div>
        <div>
          4
        </div>
      </DocumentFragment>
    `);

    await act(async () => {
      rerender(
        <StoreProvider>
          <IncrementOnLayout />
          <Count testid="count" />
        </StoreProvider>,
      );
    });

    logger.assertLog([
      // We initially render with the transition state
      { testid: "count", count: 6 },
      { testid: "count", count: 5 }, // Fixup render triggered by increment on mount
    ]);

    // Check that we mount correctly
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          5
        </div>
      </DocumentFragment>
    `);

    await act(async () => {
      rerender(
        <StoreProvider>
          <Count testid="count" />
          <IncrementOnLayout />
          <Count testid="otherCount" />
        </StoreProvider>,
      );
    });
    logger.assertLog([
      // We initially render with the transition state
      { testid: "count", count: 7 },
      // We initially render with the transition state
      { testid: "otherCount", count: 7 },
      { testid: "count", count: 6 }, // Fixup render triggered by increment on mount
      { testid: "otherCount", count: 6 }, // Fixup render triggered by increment on mount
    ]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          6
        </div>
        <div>
          6
        </div>
      </DocumentFragment>
    `);

    // Not technically part of the test, but just for completeness, let's
    // confirm we get the right thing when the transition completes.
    await act(async () => {
      resolve();
    });
    logger.assertLog([
      { testid: "count", count: 8 },
      { testid: "otherCount", count: 8 },
    ]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          8
        </div>
        <div>
          8
        </div>
      </DocumentFragment>
    `);
    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("Sync update interrupting transition correctly tracks committed state", async () => {
    const store = createStore(reducer, 2);

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(store, identity);
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

    logger.assertLog([{ testid: "count", count: 2 }]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
      </DocumentFragment>
    `);

    let resolve: () => void;

    // Start, but don't complete, a transition update
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "DOUBLE" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    logger.assertLog([]);

    // Ensure no update is made yet
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
      </DocumentFragment>
    `);

    // Interrupt with a sync update
    await act(() => {
      store.dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ testid: "count", count: 3 }]);

    // Check that we flushed the sync update on top of the currently committed
    // state.
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          3
        </div>
      </DocumentFragment>
    `);

    // Now mount a new component
    await act(async () => {
      setShowOther(true);
    });

    logger.assertLog([
      { testid: "count", count: 3 },
      // We initially render with the transition state...
      { testid: "otherCount", count: 5 },
      // But fixup to the sync state before yielding
      { testid: "otherCount", count: 3 },
    ]);

    // Check that we mount with the post-sync-update value
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          3
        </div>
        <div>
          3
        </div>
      </DocumentFragment>
    `);

    // Resolving the transition should flush the transition update...
    await act(async () => {
      resolve();
    });

    logger.assertLog([
      { testid: "count", count: 5 },
      { testid: "otherCount", count: 5 },
    ]);

    // The new state should reflect the rebased action order:
    // Initial state: 2
    // DOUBLE (transition): 4
    // INCREMENT (sync): 5

    // (2 * 2) + 1 = 5
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          5
        </div>
        <div>
          5
        </div>
      </DocumentFragment>
    `);
    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("Multiple sync updates interrupting transition correctly tracks committed state", async () => {
    const store = createStore(reducer, 2);

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(store, identity);
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

    logger.assertLog([{ testid: "count", count: 2 }]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
      </DocumentFragment>
    `);

    let resolve: () => void;

    // Start, but don't complete, a transition update
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "DOUBLE" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    logger.assertLog([]);

    // Ensure no update is made yet
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
      </DocumentFragment>
    `);

    // Interrupt with a sync update
    await act(() => {
      store.dispatch({ type: "INCREMENT" });
      store.dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ testid: "count", count: 4 }]);

    // Check that we flushed the sync update on top of the currently comitted
    // state.
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          4
        </div>
      </DocumentFragment>
    `);

    // Now mount a new component
    await act(async () => {
      setShowOther(true);
    });

    logger.assertLog([
      { testid: "count", count: 4 },
      // We inititally render with the transition state...
      { testid: "otherCount", count: 6 },
      // But fixup to the sync state before yeilding.
      { testid: "otherCount", count: 4 },
    ]);

    // Check that we mount with the post-sync-update value
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          4
        </div>
        <div>
          4
        </div>
      </DocumentFragment>
    `);

    // Resolving the transition should flush the transition update...
    await act(async () => {
      resolve();
    });

    logger.assertLog([
      { testid: "count", count: 6 },
      { testid: "otherCount", count: 6 },
    ]);

    // The new state should reflect the rebased action order:
    // Initial state: 2
    // DOUBLE (transition): 4
    // INCREMENT (sync): 5
    // INCREMENT (sync): 6

    // (2 * 2) + 1 + 1 = 6
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          6
        </div>
        <div>
          6
        </div>
      </DocumentFragment>
    `);
    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("flushSync update interrupting transition correctly tracks committed state", async () => {
    const store = createStore(reducer, 2);

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(store, identity);
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

    logger.assertLog([{ testid: "count", count: 2 }]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
      </DocumentFragment>
    `);

    let resolve: () => void;

    // Start, but don't complete, a transition update
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "INCREMENT" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    logger.assertLog([]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
      </DocumentFragment>
    `);

    // Interrupt with a flushSync update
    await act(async () => {
      flushSync(() => {
        store.dispatch({ type: "DOUBLE" });
      });
    });

    logger.assertLog([{ testid: "count", count: 4 }]);

    // Check that we flushed the sync update only
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          4
        </div>
      </DocumentFragment>
    `);

    // Now mount a new component
    await act(async () => {
      setShowOther(true);
    });

    logger.assertLog([
      { testid: "count", count: 4 },
      // We mount with the transition state...
      { testid: "otherCount", count: 6 },
      // But fixup to the sync state before yielding
      { testid: "otherCount", count: 4 },
    ]);

    // Check that we mount with the post-sync-update value
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          4
        </div>
        <div>
          4
        </div>
      </DocumentFragment>
    `);

    // Resolving the transition should flush the transition update...
    await act(async () => {
      resolve();
    });

    logger.assertLog([
      { testid: "count", count: 6 },
      { testid: "otherCount", count: 6 },
    ]);

    // Now we see the state as if the state has updated in the order of
    // transition then sync.
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          6
        </div>
        <div>
          6
        </div>
      </DocumentFragment>
    `);
    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("correctly handles consecutive sync updates", async () => {
    const store = createStore(reducer, 1);

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(store, identity);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    function App() {
      return (
        <StoreProvider>
          <Count testid="count" />
        </StoreProvider>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 1 }]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
      store.dispatch({ type: "INCREMENT" });
    });

    // Autobatching means these flush together
    logger.assertLog([{ testid: "count", count: 3 }]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          3
        </div>
      </DocumentFragment>
    `);
    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("dynamic stores are not yet supported", async () => {
    const store1 = createStore(reducer, 1);
    const store2 = createStore(reducer, 10);

    let setStore: any;
    function Count({ testid }: { testid: string }) {
      const [store, _setStore] = useState(() => store1);
      setStore = _setStore;
      const count = useStoreSelector(store, identity);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    function App() {
      return (
        <StoreProvider>
          <Count testid="count" />
        </StoreProvider>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 1 }]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    let error: any;
    try {
      await act(async () => {
        setStore(store2);
      });
    } catch (e) {
      error = e;
    }

    logger.assertLog([]);

    expect(error.message).toMatch(
      "useStoreSelector does not currently support dynamic stores",
    );
    unmount();
    expect(store1._listeners.length).toBe(0);
    expect(store2._listeners.length).toBe(0);
  });

  it("transition store update causes new store reader to mount", async () => {
    const store = createStore(reducer, 1);

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(store, identity);
      logger.log({ action: "render", testid, count });
      useEffect(() => {
        logger.log({ action: "mount", testid, count });
      }, [count, testid]);
      return <div>{count}</div>;
    }
    function CountIfEven() {
      const count = useStoreSelector(store, identity);
      logger.log({ action: "render", testid: "countIfEven", count });
      return <>{count % 2 === 0 ? <Count testid="count" /> : null}</>;
    }

    function App() {
      return (
        <StoreProvider>
          <CountIfEven />
        </StoreProvider>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ action: "render", testid: "countIfEven", count: 1 }]);

    expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);

    await act(async () => {
      startTransition(() => {
        store.dispatch({ type: "INCREMENT" });
      });
    });
    logger.assertLog([
      { action: "render", testid: "countIfEven", count: 2 },
      { action: "render", testid: "count", count: 2 },
      { action: "mount", testid: "count", count: 2 },
    ]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
      </DocumentFragment>
    `);
    unmount();
    expect(store._listeners.length).toBe(0);
  });

  // Describes a limitation of our fixup logic: If a component mounts sync
  // mid-transition and observes store state such that it will suspend in the
  // _transition_ state but not in the _sync_ state, we will incorrectly get
  // stuck rendering the transition state (and showing a suspense fallback)
  // instead of showing the sync store state.
  it("gets stuck in suspense when transition state suspends on mount", async () => {
    const store = createStore(reducer, 1);

    // Create a thenable that can be used for suspense but won't cause unhandled rejection
    let resolveSuspense: () => void;
    const suspensePromise: Promise<void> & { status?: string; value?: any } =
      new Promise((resolve) => {
        resolveSuspense = resolve;
      });

    function SuspendOnEven({ testid }: { testid: string }) {
      const count = useStoreSelector(store, identity);
      if (count % 2 === 0) {
        // React sets this
        if (suspensePromise.status !== "fulfilled") {
          logger.log({ action: "suspend", testid, count });
        }
        use(suspensePromise);
      }
      logger.log({ action: "render", testid, count });
      return <div>{count}</div>;
    }

    let setShowOther: (value: boolean) => void;

    function App() {
      const [showOther, _setShowOther] = useState(false);
      setShowOther = _setShowOther;
      return (
        <StoreProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <SuspendOnEven testid="count" />
            {showOther && <SuspendOnEven testid="otherCount" />}
          </Suspense>
        </StoreProvider>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    // Initial render is fine
    logger.assertLog([{ action: "render", testid: "count", count: 1 }]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    // We increment the state in a transtion and the currently mounted component should
    // suspend delaying the transition update.
    await act(async () => {
      startTransition(() => {
        store.dispatch({ type: "INCREMENT" });
      });
    });

    // We try to render the new state, and suspend...
    logger.assertLog([{ action: "suspend", testid: "count", count: 2 }]);

    // ...and keep showing the old state due to the transition.
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    // Now a sync update _should_ reveal the new component in the pre-transition
    // state.
    await act(async () => {
      setShowOther(true);
    });

    logger.assertLog([
      // The parent rerenders with the new `showOther` state
      { action: "render", testid: "count", count: 1 },
      // But, due to the tricks we play, the new component initially renders
      // with the transition state. Normally we'll be able to fixup in the
      // useLayoutEffect, but we suspend this time and thus never mount.
      { action: "suspend", testid: "otherCount", count: 2 },

      // Our transition was interupted so React had to throw away the transition
      // work. Now it tries again to render the transition state for "count".
      { action: "suspend", testid: "count", count: 2 },
    ]);

    // The resuls it that, OOPS! we show the fallback instead of the
    // pre-transition state. We should have rendered with the non-suspense
    // value "1". This is a bug related to limitations in our fixup logic.
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          style="display: none;"
        >
          1
        </div>
        <div>
          Loading...
        </div>
      </DocumentFragment>
    `);

    // We now resolve the suspense
    await act(async () => {
      resolveSuspense();
    });

    // We are now able to render cleanly with the new transition state
    logger.assertLog([
      { action: "render", testid: "count", count: 2 },
      { action: "render", testid: "otherCount", count: 2 },
    ]);

    // The transition is now complete and we do end up in the right place.
    expect(asFragment()).toMatchInlineSnapshot(`
         <DocumentFragment>
           <div
             style=""
           >
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

  it("can read from multiple different stores updating independently", async () => {
    const storeA = createStore(reducer, 1);
    const storeB = createStore(reducer, 50);

    function CountA() {
      const count = useStoreSelector(storeA, identity);
      logger.log({ type: "render", testid: "CountA", count });
      return <div>A: {count}</div>;
    }
    function CountB() {
      const count = useStoreSelector(storeB, identity);
      logger.log({ type: "render", testid: "CountB", count });
      return <div>B: {count}</div>;
    }

    function App() {
      return (
        <StoreProvider>
          <CountA />
          <CountB />
        </StoreProvider>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          A: 1
        </div>
        <div>
          B: 50
        </div>
      </DocumentFragment>
    `);
    logger.assertLog([
      {
        type: "render",
        testid: "CountA",
        count: 1,
      },
      {
        type: "render",
        testid: "CountB",
        count: 50,
      },
    ]);
    await act(async () => {
      storeB.dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([
      {
        type: "render",
        testid: "CountB",
        count: 51,
      },
    ]);

    unmount();

    expect(storeA._listeners.length).toBe(0);
    expect(storeB._listeners.length).toBe(0);
  });
});

describe("Selectors can be dynamic", () => {
  it("dynamic selectors are supported", async () => {
    const store = createStore(reducer, 1);

    let setSelector: any;
    function Count({ testid }: { testid: string }) {
      const [selector, _setSelector] = useState(() => identity);
      setSelector = _setSelector;
      const count = useStoreSelector(store, selector);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    function App() {
      return (
        <StoreProvider>
          <Count testid="count" />
        </StoreProvider>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 1 }]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    await act(async () => {
      setSelector(() => (s: number) => s * 2);
    });

    logger.assertLog([{ testid: "count", count: 2 }]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
      </DocumentFragment>
    `);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("selector changes sync during a transition update to the store", async () => {
    const store = createStore(reducer, 1);

    let setSelector: any;
    function Count({ testid }: { testid: string }) {
      const [selector, _setSelector] = useState(() => identity);
      setSelector = _setSelector;
      const count = useStoreSelector(store, selector);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    function App() {
      return (
        <StoreProvider>
          <Count testid="count" />
        </StoreProvider>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 1 }]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    let resolve: () => void;

    const promise = new Promise<void>((_resolve) => {
      resolve = _resolve;
    });

    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "INCREMENT" });
        await promise;
      });
    });

    await act(async () => {
      setSelector(() => (s: number) => s * 2);
    });

    logger.assertLog([
      // Just like a fresh mount, the new selector is run on the transition state...
      { testid: "count", count: 4 },
      // But gets fixed up to the sync state in the layoutEffect before yielding to the user.
      { testid: "count", count: 2 },
    ]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
      </DocumentFragment>
    `);

    await act(async () => {
      resolve();
    });

    logger.assertLog([
      // Now we render the transition state
      { testid: "count", count: 4 },
    ]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          4
        </div>
      </DocumentFragment>
    `);

    unmount();
    expect(store._listeners.length).toBe(0);
  });
});

describe("prevResult selector behavior", () => {
  // Helper for shallow equality comparison
  function shallowEqual<T extends Record<string, unknown>>(
    objA: T,
    objB: T,
  ): boolean {
    if (objA === objB) return true;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (objA[key] !== objB[key]) return false;
    }
    return true;
  }

  // Object-based state for more complex tests
  type ObjectState = { a: number; b: number; c: number };
  type ObjectAction =
    | { type: "SET_A"; value: number }
    | { type: "SET_B"; value: number }
    | { type: "INCREMENT_ALL" };

  function objectReducer(
    state: ObjectState,
    action: ObjectAction,
  ): ObjectState {
    switch (action.type) {
      case "SET_A":
        return { ...state, a: action.value };
      case "SET_B":
        return { ...state, b: action.value };
      case "INCREMENT_ALL":
        return { a: state.a + 1, b: state.b + 1, c: state.c + 1 };
      default:
        return state;
    }
  }

  // Note: The selector is called multiple times during mount due to the concurrent-safe
  // fixup logic in useLayoutEffect. This is expected behavior. Tests should account for this
  // by either:
  // 1. Only checking meaningful prevResult values (not exact call counts)
  // 2. Using the prevResult equality pattern for object-returning selectors

  // Basic Functionality Tests

  it("prevResult is undefined on the very first selector call", async () => {
    const store = createStore(reducer, 1);

    // Track only the first prevResult we receive
    let firstPrevResult: number | undefined = "NOT_SET" as any;
    let callCount = 0;
    function Count() {
      const count = useStoreSelector<State, number>(
        store,
        (state, prevResult) => {
          callCount++;
          if (callCount === 1) {
            firstPrevResult = prevResult;
          }
          return state;
        },
      );
      logger.log({ count });
      return <div>{count}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Count />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 1 }]);
    // The very first call should have undefined prevResult
    expect(firstPrevResult).toBe(undefined);
    // Selector may be called multiple times due to fixup logic
    expect(callCount).toBeGreaterThanOrEqual(1);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("prevResult receives previous value on store update", async () => {
    const store = createStore(reducer, 1);

    // Track prevResult by state value, not call count
    const prevResultByState = new Map<number, number | undefined>();
    function Count() {
      const count = useStoreSelector<State, number>(
        store,
        (state, prevResult) => {
          // Only record first time we see each state
          if (!prevResultByState.has(state)) {
            prevResultByState.set(state, prevResult);
          }
          return state;
        },
      );
      logger.log({ count });
      return <div>{count}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Count />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 1 }]);
    // First state (1) should have undefined prevResult
    expect(prevResultByState.get(1)).toBe(undefined);

    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ count: 2 }]);
    // When we first see state 2, prevResult should be 1
    expect(prevResultByState.get(2)).toBe(1);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("prevResult updates correctly on subsequent renders", async () => {
    const store = createStore(reducer, 1);

    // Track prevResult by state value
    const prevResultByState = new Map<number, number | undefined>();
    function Count() {
      const count = useStoreSelector<State, number>(
        store,
        (state, prevResult) => {
          if (!prevResultByState.has(state)) {
            prevResultByState.set(state, prevResult);
          }
          return state;
        },
      );
      logger.log({ count });
      return <div>{count}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Count />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 1 }]);

    // Chain of updates
    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
    });
    logger.assertLog([{ count: 2 }]);

    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
    });
    logger.assertLog([{ count: 3 }]);

    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
    });
    logger.assertLog([{ count: 4 }]);

    // Each state should have received the previous state as prevResult
    expect(prevResultByState.get(1)).toBe(undefined);
    expect(prevResultByState.get(2)).toBe(1);
    expect(prevResultByState.get(3)).toBe(2);
    expect(prevResultByState.get(4)).toBe(3);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  // Store Update Scenarios

  it("prevResult during synchronous store updates", async () => {
    const store = createStore(reducer, 1);

    const prevResultByState = new Map<number, number | undefined>();
    function Count() {
      const count = useStoreSelector<State, number>(
        store,
        (state, prevResult) => {
          if (!prevResultByState.has(state)) {
            prevResultByState.set(state, prevResult);
          }
          return state;
        },
      );
      logger.log({ count });
      return <div>{count}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Count />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 1 }]);
    expect(prevResultByState.get(1)).toBe(undefined);

    // Multiple sync updates in single act
    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
      store.dispatch({ type: "INCREMENT" });
    });

    // Due to auto-batching, we get only one render with final state
    logger.assertLog([{ count: 3 }]);
    // The selector may be called for intermediate states during fixup,
    // so prevResult for state 3 could be 2 (if intermediate states were seen)
    // or 1 (if only final state was seen). We just verify it's defined and correct.
    const prevResultFor3 = prevResultByState.get(3);
    expect(prevResultFor3).toBeDefined();
    expect([1, 2]).toContain(prevResultFor3);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("prevResult during batched updates", async () => {
    const store = createStore(reducer, 1);

    const prevResultByState = new Map<number, number | undefined>();
    function Count() {
      const count = useStoreSelector<State, number>(
        store,
        (state, prevResult) => {
          if (!prevResultByState.has(state)) {
            prevResultByState.set(state, prevResult);
          }
          return state;
        },
      );
      logger.log({ count });
      return <div>{count}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Count />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 1 }]);

    // Batched updates using flushSync
    await act(async () => {
      flushSync(() => {
        store.dispatch({ type: "INCREMENT" });
        store.dispatch({ type: "INCREMENT" });
      });
    });

    logger.assertLog([{ count: 3 }]);
    // Initial state had undefined
    expect(prevResultByState.get(1)).toBe(undefined);
    // The selector may see intermediate states, so prevResult for state 3
    // could be 2 (if intermediate state was seen) or 1 (if not)
    const prevResultFor3 = prevResultByState.get(3);
    expect(prevResultFor3).toBeDefined();
    expect([1, 2]).toContain(prevResultFor3);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  // Selector Change Scenarios

  it("prevResult when selector changes", async () => {
    const store = createStore(reducer, 10);

    let firstIdentityPrevResult: number | undefined = "NOT_SET" as any;
    let firstDoublePrevResult: number | undefined = "NOT_SET" as any;

    let setSelector: React.Dispatch<
      React.SetStateAction<(state: number, prev?: number) => number>
    >;

    function Count() {
      const [selector, _setSelector] = useState<
        (state: number, prev?: number) => number
      >(() => (state: number, prevResult?: number) => {
        if (firstIdentityPrevResult === ("NOT_SET" as any)) {
          firstIdentityPrevResult = prevResult;
        }
        return state;
      });
      setSelector = _setSelector;
      const count = useStoreSelector(store, selector);
      logger.log({ count });
      return <div>{count}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Count />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 10 }]);
    expect(firstIdentityPrevResult).toBe(undefined);

    // Change selector to double
    await act(async () => {
      setSelector(() => (state: number, prevResult?: number): number => {
        if (firstDoublePrevResult === ("NOT_SET" as any)) {
          firstDoublePrevResult = prevResult;
        }
        return state * 2;
      });
    });

    logger.assertLog([{ count: 20 }]);
    // New selector should receive previous result from old selector (10)
    expect(firstDoublePrevResult).toBe(10);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("prevResult when selector identity changes but logic is same", async () => {
    const store = createStore(reducer, 5);

    let firstPrevResult: number | undefined = "NOT_SET" as any;
    let secondPrevResult: number | undefined = "NOT_SET" as any;
    let selectorCallCount = 0;
    let setTrigger: (v: number) => void;

    function Count() {
      const [trigger, _setTrigger] = useState(0);
      setTrigger = _setTrigger;
      // Create new selector function on each render when trigger changes
      const selector = (state: number, prevResult?: number) => {
        selectorCallCount++;
        if (trigger === 0 && firstPrevResult === ("NOT_SET" as any)) {
          firstPrevResult = prevResult;
        } else if (trigger === 100 && secondPrevResult === ("NOT_SET" as any)) {
          secondPrevResult = prevResult;
        }
        return state + trigger;
      };
      const count = useStoreSelector(store, selector);
      logger.log({ count, trigger });
      return <div>{count}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Count />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 5, trigger: 0 }]);
    expect(firstPrevResult).toBe(undefined);

    // Change trigger, causing selector identity to change
    await act(async () => {
      setTrigger(100);
    });

    logger.assertLog([{ count: 105, trigger: 100 }]);
    // New selector should receive previous result (5)
    expect(secondPrevResult).toBe(5);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  // Two-Layer Architecture (Custom Equality)

  it("selector can use prevResult for custom equality", async () => {
    const store = createStore(objectReducer, { a: 1, b: 2, c: 3 });

    let renderCount = 0;
    function Count() {
      const result = useStoreSelector(
        store,
        (state, prevResult?: { a: number; b: number }) => {
          const newResult = { a: state.a, b: state.b };
          // Return prevResult if equal to prevent re-render
          if (
            prevResult &&
            prevResult.a === newResult.a &&
            prevResult.b === newResult.b
          ) {
            return prevResult;
          }
          return newResult;
        },
      );
      renderCount++;
      logger.log({ a: result.a, b: result.b, renderCount });
      return (
        <div>
          {result.a}-{result.b}
        </div>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Count />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ a: 1, b: 2, renderCount: 1 }]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1-2
        </div>
      </DocumentFragment>
    `);

    // Update c only - selector should return prevResult, no re-render
    const initialRenderCount = renderCount;
    await act(async () => {
      store.dispatch({ type: "SET_A", value: 1 }); // Same value
    });

    // The subscription fires but selector returns same reference
    // React should bail out from re-render
    logger.assertLog([]);
    expect(renderCount).toBe(initialRenderCount);

    // Update a - should trigger re-render
    await act(async () => {
      store.dispatch({ type: "SET_A", value: 100 });
    });

    logger.assertLog([{ a: 100, b: 2, renderCount: 2 }]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("selector with shallowEqual using prevResult", async () => {
    const store = createStore(objectReducer, { a: 1, b: 2, c: 3 });

    let renderCount = 0;
    function Count() {
      const result = useStoreSelector(
        store,
        (state, prevResult?: { a: number; b: number }) => {
          const newResult = { a: state.a, b: state.b };
          if (prevResult && shallowEqual(newResult, prevResult)) {
            return prevResult; // Prevent unnecessary re-render
          }
          return newResult;
        },
      );
      renderCount++;
      logger.log({ a: result.a, b: result.b, renderCount });
      return (
        <div>
          {result.a}-{result.b}
        </div>
      );
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Count />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ a: 1, b: 2, renderCount: 1 }]);

    // Update c only - shallowEqual should prevent re-render
    const initialRenderCount = renderCount;
    await act(async () => {
      store.dispatch({ type: "SET_A", value: 1 }); // Same value for a
    });

    logger.assertLog([]);
    expect(renderCount).toBe(initialRenderCount);

    // Update both a and b
    await act(async () => {
      store.dispatch({ type: "SET_A", value: 10 });
    });

    logger.assertLog([{ a: 10, b: 2, renderCount: 2 }]);

    await act(async () => {
      store.dispatch({ type: "SET_B", value: 20 });
    });

    logger.assertLog([{ a: 10, b: 20, renderCount: 3 }]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  // Concurrent/Transition Scenarios

  it("prevResult during startTransition", async () => {
    const store = createStore(reducer, 1);

    const prevResultByState = new Map<number, number | undefined>();
    function Count() {
      const count = useStoreSelector<State, number>(
        store,
        (state, prevResult) => {
          if (!prevResultByState.has(state)) {
            prevResultByState.set(state, prevResult);
          }
          return state;
        },
      );
      logger.log({ count });
      return <div>{count}</div>;
    }

    const { asFragment, unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Count />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 1 }]);
    expect(prevResultByState.get(1)).toBe(undefined);

    let resolve: () => void;

    // Start a transition
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "INCREMENT" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    // Transition not completed yet
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    // Complete the transition
    await act(async () => {
      resolve();
    });

    logger.assertLog([{ count: 2 }]);
    // prevResult should have been 1 during the transition render
    expect(prevResultByState.get(2)).toBe(1);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("prevResult when store updates mid-transition", async () => {
    const store = createStore(reducer, 1);

    let setShowOther: (v: boolean) => void;

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(store, identity);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    function App() {
      const [showOther, _setShowOther] = useState(false);
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

    let resolve: () => void;

    // Start a transition
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "INCREMENT" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    // Mount new component mid-transition (sync)
    await act(async () => {
      setShowOther(true);
    });

    // The new component mounts with transition state (2) then fixup to sync state (1)
    logger.assertLog([
      { testid: "count", count: 1 },
      { testid: "otherCount", count: 2 }, // First render with transition state
      { testid: "otherCount", count: 1 }, // Fixup to sync state
    ]);

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

    // Complete transition
    await act(async () => {
      resolve();
    });

    logger.assertLog([
      { testid: "count", count: 2 },
      { testid: "otherCount", count: 2 },
    ]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("prevResult with concurrent renders - each component tracks independently", async () => {
    const store = createStore(reducer, 1);

    // Track prevResult by state for each component
    const prevResultByStateA = new Map<number, number | undefined>();
    const prevResultByStateB = new Map<number, number | undefined>();

    function CountA() {
      const count = useStoreSelector<State, number>(
        store,
        (state, prevResult) => {
          if (!prevResultByStateA.has(state)) {
            prevResultByStateA.set(state, prevResult);
          }
          return state;
        },
      );
      logger.log({ testid: "A", count });
      return <div>A: {count}</div>;
    }

    function CountB() {
      const count = useStoreSelector<State, number>(
        store,
        (state, prevResult) => {
          if (!prevResultByStateB.has(state)) {
            prevResultByStateB.set(state, prevResult);
          }
          return state;
        },
      );
      logger.log({ testid: "B", count });
      return <div>B: {count}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <CountA />
          <CountB />
        </StoreProvider>,
      );
    });

    logger.assertLog([
      { testid: "A", count: 1 },
      { testid: "B", count: 1 },
    ]);

    // Both start with undefined for state 1
    expect(prevResultByStateA.get(1)).toBe(undefined);
    expect(prevResultByStateB.get(1)).toBe(undefined);

    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([
      { testid: "A", count: 2 },
      { testid: "B", count: 2 },
    ]);

    // Each component should have prevResult=1 when rendering state=2
    expect(prevResultByStateA.get(2)).toBe(1);
    expect(prevResultByStateB.get(2)).toBe(1);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("prevResult consistency across interrupted renders", async () => {
    const store = createStore(reducer, 1);

    // Use identity selector to avoid infinite loops from object creation
    function Count() {
      const count = useStoreSelector(store, identity);
      logger.log({ count });
      return <div>{count}</div>;
    }

    let setShowOther: (v: boolean) => void;

    function App() {
      const [showOther, _setShowOther] = useState(false);
      setShowOther = _setShowOther;
      return (
        <StoreProvider>
          <Count />
          {showOther && <Count />}
        </StoreProvider>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ count: 1 }]);

    let resolve: () => void;

    // Start a transition
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "INCREMENT" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    // Interrupt with sync update that mounts new component
    await act(async () => {
      setShowOther(true);
    });

    logger.assertLog([
      { count: 1 },
      { count: 2 }, // New component renders with transition state
      { count: 1 }, // Fixup to sync state
    ]);

    // Complete the transition
    await act(async () => {
      resolve();
    });

    logger.assertLog([{ count: 2 }, { count: 2 }]);

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

  // Edge Cases

  it("prevResult with selector that throws", async () => {
    const store = createStore(reducer, 1);

    let shouldThrow = false;
    let prevResultWhenThrowing: number | undefined;
    const prevResultByState = new Map<number, number | undefined>();

    function Count() {
      const count = useStoreSelector<State, number>(
        store,
        (state, prevResult) => {
          if (!prevResultByState.has(state)) {
            prevResultByState.set(state, prevResult);
          }
          if (shouldThrow) {
            prevResultWhenThrowing = prevResult;
            throw new Error("Selector error");
          }
          return state;
        },
      );
      logger.log({ count });
      return <div>{count}</div>;
    }

    // Wrap in error boundary for the test
    class ErrorBoundary extends Component<
      { children: React.ReactNode },
      { hasError: boolean }
    > {
      state = { hasError: false };
      static getDerivedStateFromError() {
        return { hasError: true };
      }
      render() {
        if (this.state.hasError) {
          return <div>Error Boundary</div>;
        }
        return this.props.children;
      }
    }

    const { unmount } = await act(async () => {
      return render(
        <ErrorBoundary>
          <StoreProvider>
            <Count />
          </StoreProvider>
        </ErrorBoundary>,
      );
    });

    logger.assertLog([{ count: 1 }]);
    expect(prevResultByState.get(1)).toBe(undefined);

    // Normal update
    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ count: 2 }]);
    expect(prevResultByState.get(2)).toBe(1);

    // Suppress expected console.error from React error boundary
    const originalError = console.error;
    console.error = () => {};

    // Now make selector throw
    shouldThrow = true;
    try {
      await act(async () => {
        store.dispatch({ type: "INCREMENT" });
      });
    } catch {
      // Expected error
    } finally {
      console.error = originalError;
    }

    // prevResult should have been 2 when the selector threw
    expect(prevResultWhenThrowing).toBe(2);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("prevResult after component remounts", async () => {
    const store = createStore(reducer, 10);

    // Track first prevResult per mount
    let mountCount = 0;
    const firstPrevResultPerMount: (number | undefined)[] = [];

    function Count() {
      const count = useStoreSelector<State, number>(
        store,
        (state, prevResult) => {
          // Track first call of each mount
          if (firstPrevResultPerMount.length === mountCount) {
            firstPrevResultPerMount.push(prevResult);
          }
          return state;
        },
      );
      useEffect(() => {
        mountCount++;
      }, []);
      logger.log({ count });
      return <div>{count}</div>;
    }

    let setShow: (v: boolean) => void;

    function App() {
      const [show, _setShow] = useState(true);
      setShow = _setShow;
      return <StoreProvider>{show && <Count />}</StoreProvider>;
    }

    const { unmount } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ count: 10 }]);
    // First mount starts with undefined
    expect(firstPrevResultPerMount[0]).toBe(undefined);

    // Unmount component
    await act(async () => {
      setShow(false);
    });

    logger.assertLog([]);

    // Remount component
    await act(async () => {
      setShow(true);
    });

    // Fresh mount gets undefined prevResult
    logger.assertLog([{ count: 10 }]);
    expect(firstPrevResultPerMount[1]).toBe(undefined);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("prevResult with derived/computed values using equality check", async () => {
    const store = createStore(reducer, 5);

    type DerivedResult = { doubled: number; tripled: number };
    // Track prevResult by state value
    const prevResultByState = new Map<number, DerivedResult | undefined>();

    function Count() {
      const result = useStoreSelector(
        store,
        (state, prevResult?: DerivedResult) => {
          if (!prevResultByState.has(state)) {
            prevResultByState.set(state, prevResult);
          }
          const newResult = {
            doubled: state * 2,
            tripled: state * 3,
          };
          // Use prevResult equality pattern to prevent infinite loops
          if (
            prevResult &&
            prevResult.doubled === newResult.doubled &&
            prevResult.tripled === newResult.tripled
          ) {
            return prevResult;
          }
          return newResult;
        },
      );
      logger.log({ doubled: result.doubled, tripled: result.tripled });
      return (
        <div>
          {result.doubled}-{result.tripled}
        </div>
      );
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Count />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ doubled: 10, tripled: 15 }]);
    expect(prevResultByState.get(5)).toBe(undefined);

    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ doubled: 12, tripled: 18 }]);
    // prevResult when rendering state 6 should be the result from state 5
    expect(prevResultByState.get(6)).toEqual({ doubled: 10, tripled: 15 });

    await act(async () => {
      store.dispatch({ type: "DOUBLE" });
    });

    logger.assertLog([{ doubled: 24, tripled: 36 }]);
    // prevResult when rendering state 12 should be the result from state 6
    expect(prevResultByState.get(12)).toEqual({ doubled: 12, tripled: 18 });

    unmount();
    expect(store._listeners.length).toBe(0);
  });
});

describe("useStoreSelectorWithEquality", () => {
  // Helper for shallow equality comparison
  function shallowEqual<T extends Record<string, unknown>>(
    objA: T,
    objB: T,
  ): boolean {
    if (objA === objB) return true;
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (objA[key] !== objB[key]) return false;
    }
    return true;
  }

  // Object-based state for more complex tests
  type UserState = {
    user: { name: string; age: number; version?: number };
    other?: string;
    value?: number | null;
  };
  type UserAction =
    | { type: "SET_NAME"; payload: string }
    | { type: "SET_AGE"; payload: number }
    | { type: "SET_OTHER"; payload: string }
    | { type: "SET_VALUE"; payload: number | null }
    | { type: "INCREMENT_VERSION" };

  function userReducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
      case "SET_NAME":
        return { ...state, user: { ...state.user, name: action.payload } };
      case "SET_AGE":
        return { ...state, user: { ...state.user, age: action.payload } };
      case "SET_OTHER":
        return { ...state, other: action.payload };
      case "SET_VALUE":
        return { ...state, value: action.payload };
      case "INCREMENT_VERSION":
        return {
          ...state,
          user: { ...state.user, version: (state.user.version || 0) + 1 },
        };
      default:
        return state;
    }
  }

  // Basic Functionality

  it("returns selected value from store", async () => {
    const store = createStore(reducer, 5);

    function Test() {
      const count = useStoreSelectorWithEquality(store, (s: State) => s);
      logger.log({ count });
      return <div data-testid="count">{count}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Test />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 5 }]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("updates when store changes", async () => {
    const store = createStore(reducer, 0);

    function Test() {
      const count = useStoreSelectorWithEquality(store, (s: State) => s);
      logger.log({ count });
      return <div data-testid="count">{count}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Test />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 0 }]);

    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ count: 1 }]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("uses default Object.is equality when no equalityFn provided", async () => {
    // Create store with NaN value to test Object.is behavior
    // Object.is(NaN, NaN) === true, unlike === comparison
    const store = createStore(userReducer, {
      user: { name: "Alice", age: 30 },
      value: NaN,
    });

    function Test() {
      const value = useStoreSelectorWithEquality(
        store,
        (s: UserState) => s.value,
      );
      logger.log({ value: String(value) });
      return <div>{String(value)}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Test />
        </StoreProvider>,
      );
    });

    // Clear initial render logs (may include fixup renders from concurrent-safe hook)
    logger._logs = [];

    // Dispatch but value stays NaN
    await act(async () => {
      store.dispatch({ type: "SET_VALUE", payload: NaN });
    });

    // Object.is(NaN, NaN) is true, so the selected value shouldn't change
    // and no additional renders should occur from this dispatch
    logger.assertLog([]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  // Equality Function Behavior

  it("skips re-render when equalityFn returns true", async () => {
    const store = createStore(userReducer, {
      user: { name: "Alice", age: 30 },
    });

    let renderCount = 0;

    function Test() {
      renderCount++;
      const user = useStoreSelectorWithEquality(
        store,
        (s: UserState) => ({ name: s.user.name }),
        shallowEqual,
      );
      logger.log({ name: user.name, renderCount });
      return <div>{user.name}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Test />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ name: "Alice", renderCount: 1 }]);
    const initialRenderCount = renderCount;

    // Change age (not selected), name stays the same
    await act(async () => {
      store.dispatch({ type: "SET_AGE", payload: 31 });
    });

    // Should not re-render because shallowEqual({ name: "Alice" }, { name: "Alice" }) is true
    logger.assertLog([]);
    expect(renderCount).toBe(initialRenderCount);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("preserves reference identity when equal", async () => {
    const store = createStore(userReducer, {
      user: { name: "Alice", age: 30 },
      other: "x",
    });

    const results: object[] = [];

    function Test() {
      const obj = useStoreSelectorWithEquality(
        store,
        (s: UserState) => ({ name: s.user.name }),
        shallowEqual,
      );
      results.push(obj);
      logger.log({ name: obj.name });
      return null;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Test />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ name: "Alice" }]);
    expect(results.length).toBe(1);

    // Change 'other' field, not the selected 'name'
    await act(async () => {
      store.dispatch({ type: "SET_OTHER", payload: "y" });
    });

    // No re-render should occur, and if any fixup happened, same reference should be returned
    logger.assertLog([]);
    // If there was any additional render (due to fixup), verify same reference
    if (results.length > 1) {
      expect(results[0]).toBe(results[results.length - 1]);
    }

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("works with shallowEqual", async () => {
    const store = createStore(userReducer, {
      user: { name: "Alice", age: 30 },
    });

    let renderCount = 0;

    function Test() {
      renderCount++;
      const user = useStoreSelectorWithEquality(
        store,
        (s: UserState) => ({ name: s.user.name, age: s.user.age }),
        shallowEqual,
      );
      logger.log({ name: user.name, age: user.age, renderCount });
      return (
        <div>
          {user.name}-{user.age}
        </div>
      );
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Test />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ name: "Alice", age: 30, renderCount: 1 }]);

    // Update name - should trigger re-render
    await act(async () => {
      store.dispatch({ type: "SET_NAME", payload: "Bob" });
    });

    logger.assertLog([{ name: "Bob", age: 30, renderCount: 2 }]);

    // Update age - should trigger re-render
    await act(async () => {
      store.dispatch({ type: "SET_AGE", payload: 31 });
    });

    logger.assertLog([{ name: "Bob", age: 31, renderCount: 3 }]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("re-renders when equalityFn returns false", async () => {
    const store = createStore(userReducer, {
      user: { name: "Alice", age: 30 },
    });

    let renderCount = 0;

    function Test() {
      renderCount++;
      const user = useStoreSelectorWithEquality(
        store,
        (s: UserState) => ({ name: s.user.name }),
        shallowEqual,
      );
      logger.log({ name: user.name, renderCount });
      return <div>{user.name}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Test />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ name: "Alice", renderCount: 1 }]);

    // Change name - should re-render
    await act(async () => {
      store.dispatch({ type: "SET_NAME", payload: "Bob" });
    });

    logger.assertLog([{ name: "Bob", renderCount: 2 }]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  // Selector Changes

  it("handles selector function changes", async () => {
    const store = createStore(userReducer, {
      user: { name: "Alice", age: 30 },
    });

    let setField: (field: "name" | "age") => void;

    function Test() {
      const [field, _setField] = useState<"name" | "age">("name");
      setField = _setField;
      // Inline selector - new function each render when field changes
      const value = useStoreSelectorWithEquality(store, (s: UserState) =>
        field === "name" ? s.user.name : s.user.age,
      );
      logger.log({ field, value });
      return (
        <div data-testid="value">
          {field}: {value}
        </div>
      );
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Test />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ field: "name", value: "Alice" }]);

    // Change selector to read age
    await act(async () => {
      setField("age");
    });

    logger.assertLog([{ field: "age", value: 30 }]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("handles equalityFn changes", async () => {
    const store = createStore(userReducer, {
      user: { name: "Alice", age: 30 },
    });

    let setUseShallowEqual: (use: boolean) => void;

    // Custom equality that always returns false (never equal)
    const neverEqual = () => false;

    const selector = (s: UserState) => ({ name: s.user.name });

    // Track the rendered values and equality function used
    const renders: { name: string; useShallow: boolean }[] = [];

    function Test() {
      const [useShallow, _setUseShallowEqual] = useState(true);
      setUseShallowEqual = _setUseShallowEqual;
      const user = useStoreSelectorWithEquality(
        store,
        selector,
        useShallow ? shallowEqual : neverEqual,
      );
      renders.push({ name: user.name, useShallow });
      logger.log({ name: user.name, useShallow });
      return <div>{user.name}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Test />
        </StoreProvider>,
      );
    });

    // Clear logs and reset render tracking after mount
    logger._logs = [];
    const rendersAfterMount = renders.length;

    // With shallowEqual, changing age should not cause re-render
    // because name stays the same and shallowEqual({ name: "Alice" }, { name: "Alice" }) is true
    await act(async () => {
      store.dispatch({ type: "SET_AGE", payload: 31 });
    });

    // No new renders should have occurred
    expect(renders.length).toBe(rendersAfterMount);
    logger.assertLog([]);

    // Switch to neverEqual - this will cause at least one render
    await act(async () => {
      setUseShallowEqual(false);
    });

    // Clear logs after the equality function switch
    logger._logs = [];
    const rendersAfterSwitch = renders.length;
    // Verify we've rendered with useShallow: false at least once
    expect(renders.some((r) => r.useShallow === false)).toBe(true);

    // Now with neverEqual, any store update should cause re-render
    // because neverEqual always returns false
    await act(async () => {
      store.dispatch({ type: "SET_AGE", payload: 32 });
    });

    // With neverEqual, we should have at least one new render
    expect(renders.length).toBeGreaterThan(rendersAfterSwitch);
    // And the latest render should still show "Alice" with useShallow: false
    expect(renders[renders.length - 1]).toEqual({
      name: "Alice",
      useShallow: false,
    });

    logger.assertLog([
      {
        name: "Alice",
        useShallow: false,
      },
    ]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  // Concurrent Behavior

  it("maintains consistency during concurrent updates", async () => {
    const store = createStore(reducer, 1);
    const values: number[] = [];

    const selector = (s: State) => s;

    function Display({ testid }: { testid: string }) {
      const count = useStoreSelectorWithEquality(store, selector);
      values.push(count);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    let setShowSecond: (show: boolean) => void;

    function Trigger() {
      const [showSecond, _setShowSecond] = useState(false);
      setShowSecond = _setShowSecond;
      return (
        <>
          <Display testid="first" />
          {showSecond && <Display testid="second" />}
        </>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Trigger />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ testid: "first", count: 1 }]);

    let resolve: () => void;

    // Start transition and mount second component
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "INCREMENT" }); // count = 2
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    // Mount second component mid-transition
    await act(async () => {
      setShowSecond(true);
    });

    // First component re-renders with old state
    // Second component mounts with transition state, then fixes up to sync state
    logger.assertLog([
      { testid: "first", count: 1 },
      { testid: "second", count: 2 }, // Initially renders with transition state
      { testid: "second", count: 1 }, // Fixup to sync state
    ]);

    // Both should show same value (no tearing)
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
      { testid: "first", count: 2 },
      { testid: "second", count: 2 },
    ]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("works correctly with startTransition", async () => {
    const store = createStore(userReducer, {
      user: { name: "Alice", age: 30, version: 1 },
    });

    let renderCount = 0;

    function Test() {
      renderCount++;
      const name = useStoreSelectorWithEquality(
        store,
        (s: UserState) => ({ name: s.user.name }),
        shallowEqual,
      );
      logger.log({ name: name.name, renderCount });
      return <div>{name.name}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Test />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ name: "Alice", renderCount: 1 }]);
    const initialRenders = renderCount;

    let resolve: () => void;

    // Transition that only changes version, not name
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "INCREMENT_VERSION" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    // Complete the transition
    await act(async () => {
      resolve();
    });

    // Should not cause additional renders because name didn't change
    // (shallowEqual returns true for { name: "Alice" } === { name: "Alice" })
    logger.assertLog([]);
    expect(renderCount).toBe(initialRenders);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  // Edge Cases

  it("handles selector that throws", async () => {
    const store = createStore(userReducer, {
      user: { name: "Alice", age: 30 },
      value: null,
    });

    // Suppress expected console.error from React error boundary
    const originalError = console.error;
    console.error = () => {};

    function Test() {
      const value = useStoreSelectorWithEquality(
        store,
        (s: UserState) => (s.value as any).property, // Will throw when value is null
      );
      return <div>{value}</div>;
    }

    // Wrap in error boundary for the test
    class ErrorBoundary extends Component<
      { children: React.ReactNode },
      { hasError: boolean }
    > {
      state = { hasError: false };
      static getDerivedStateFromError() {
        return { hasError: true };
      }
      render() {
        if (this.state.hasError) {
          return <div>Error caught</div>;
        }
        return this.props.children;
      }
    }

    let renderResult: Awaited<ReturnType<typeof render>> | null = null;

    try {
      renderResult = await act(async () => {
        return render(
          <ErrorBoundary>
            <StoreProvider>
              <Test />
            </StoreProvider>
          </ErrorBoundary>,
        );
      });
    } catch {
      // Error was thrown during render
    }

    console.error = originalError;

    // Either error boundary caught it or render threw
    if (renderResult) {
      expect(renderResult.asFragment().textContent).toBe("Error caught");
      renderResult.unmount();
    }
  });
});

describe("inline selector (new reference every render)", () => {
  // This tests the common React-Redux pattern:
  // const todos = useSelector(state => state.todos)
  // Where a new function reference is created every render

  it("handles inline selector without causing infinite loops", async () => {
    const store = createStore(reducer, 5);

    let renderCount = 0;
    function Component() {
      renderCount++;
      // Inline selector - new function reference every render!
      const count = useStoreSelector(store, (state) => state);
      logger.log({ count, renderCount });
      return <div>{count}</div>;
    }

    const { asFragment, unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Component />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 5, renderCount: 1 }]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          5
        </div>
      </DocumentFragment>
    `);

    // Should not have infinite loops - renderCount should be reasonable
    expect(renderCount).toBeLessThan(5);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("returns consistent values with inline selector", async () => {
    const store = createStore(reducer, 10);

    const renderedValues: number[] = [];
    function Component() {
      // Inline selector - new function reference every render!
      const count = useStoreSelector(store, (state) => state * 2);
      renderedValues.push(count);
      logger.log({ count });
      return <div>{count}</div>;
    }

    const { asFragment, unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Component />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 20 }]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          20
        </div>
      </DocumentFragment>
    `);

    // Update the store
    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ count: 22 }]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          22
        </div>
      </DocumentFragment>
    `);

    // All rendered values should be consistent (multiples of state * 2)
    expect(renderedValues.every((v) => v % 2 === 0)).toBe(true);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("prevResult works correctly with changing selector identity", async () => {
    const store = createStore(reducer, 1);

    // Track prevResult values when we see each state
    const prevResultByState = new Map<number, number | undefined>();

    function Component() {
      // Inline selector - new function reference every render!
      const count = useStoreSelector<State, number>(
        store,
        (state, prevResult) => {
          if (!prevResultByState.has(state)) {
            prevResultByState.set(state, prevResult);
          }
          return state;
        },
      );
      logger.log({ count });
      return <div>{count}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Component />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 1 }]);
    expect(prevResultByState.get(1)).toBe(undefined);

    // Dispatch updates
    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ count: 2 }]);
    // Even though selector identity changed, prevResult should be 1
    expect(prevResultByState.get(2)).toBe(1);

    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ count: 3 }]);
    // prevResult should be 2
    expect(prevResultByState.get(3)).toBe(2);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("inline selector works during transitions", async () => {
    const store = createStore(reducer, 1);

    function Component() {
      // Inline selector - new function reference every render!
      const count = useStoreSelector(store, (state) => state);
      logger.log({ count });
      return <div>{count}</div>;
    }

    const { asFragment, unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Component />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 1 }]);

    let resolve: () => void;

    // Start a transition
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "INCREMENT" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    // Transition not completed yet
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          1
        </div>
      </DocumentFragment>
    `);

    // Complete the transition
    await act(async () => {
      resolve();
    });

    logger.assertLog([{ count: 2 }]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
      </DocumentFragment>
    `);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("inline selector with object result uses prevResult for stability", async () => {
    // Object-based state
    type ObjState = { a: number; b: number };
    type ObjAction =
      | { type: "SET_A"; value: number }
      | { type: "SET_B"; value: number };

    function objReducer(state: ObjState, action: ObjAction): ObjState {
      switch (action.type) {
        case "SET_A":
          return { ...state, a: action.value };
        case "SET_B":
          return { ...state, b: action.value };
        default:
          return state;
      }
    }

    const store = createStore(objReducer, { a: 1, b: 2 });

    let renderCount = 0;
    function Component() {
      renderCount++;
      // Inline selector with prevResult equality pattern
      const result = useStoreSelector(
        store,
        (state, prevResult?: { a: number }) => {
          const newResult = { a: state.a };
          if (prevResult && prevResult.a === newResult.a) {
            return prevResult; // Return same reference if equal
          }
          return newResult;
        },
      );
      logger.log({ a: result.a, renderCount });
      return <div>{result.a}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Component />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ a: 1, renderCount: 1 }]);
    const initialRenderCount = renderCount;

    // Update b only - a stays the same
    await act(async () => {
      store.dispatch({ type: "SET_B", value: 100 });
    });

    // Should not re-render because selector returns prevResult
    logger.assertLog([]);
    expect(renderCount).toBe(initialRenderCount);

    // Update a - should trigger re-render
    await act(async () => {
      store.dispatch({ type: "SET_A", value: 10 });
    });

    logger.assertLog([{ a: 10, renderCount: 2 }]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("useStoreSelectorWithEquality handles inline selector", async () => {
    // Object-based state
    type ObjState = { a: number; b: number };
    type ObjAction =
      | { type: "SET_A"; value: number }
      | { type: "SET_B"; value: number };

    function objReducer(state: ObjState, action: ObjAction): ObjState {
      switch (action.type) {
        case "SET_A":
          return { ...state, a: action.value };
        case "SET_B":
          return { ...state, b: action.value };
        default:
          return state;
      }
    }

    function shallowEqual<T extends Record<string, unknown>>(
      objA: T,
      objB: T,
    ): boolean {
      if (objA === objB) return true;
      const keysA = Object.keys(objA);
      const keysB = Object.keys(objB);
      if (keysA.length !== keysB.length) return false;
      for (const key of keysA) {
        if (objA[key] !== objB[key]) return false;
      }
      return true;
    }

    const store = createStore(objReducer, { a: 1, b: 2 });

    let renderCount = 0;
    function Component() {
      renderCount++;
      // Inline selector - new function reference every render!
      const result = useStoreSelectorWithEquality(
        store,
        (state) => ({ a: state.a }),
        shallowEqual,
      );
      logger.log({ a: result.a, renderCount });
      return <div>{result.a}</div>;
    }

    const { unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Component />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ a: 1, renderCount: 1 }]);
    const initialRenderCount = renderCount;

    // Update b only - a stays the same, should not re-render due to shallowEqual
    await act(async () => {
      store.dispatch({ type: "SET_B", value: 100 });
    });

    // Should not re-render because shallowEqual({ a: 1 }, { a: 1 }) is true
    logger.assertLog([]);
    expect(renderCount).toBe(initialRenderCount);

    // Update a - should trigger re-render
    await act(async () => {
      store.dispatch({ type: "SET_A", value: 10 });
    });

    logger.assertLog([{ a: 10, renderCount: 2 }]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("inline selector does not cause issues with multiple components", async () => {
    const store = createStore(reducer, 1);

    const renderCounts = { A: 0, B: 0 };

    function ComponentA() {
      renderCounts.A++;
      // Inline selector
      const count = useStoreSelector(store, (state) => state);
      logger.log({ component: "A", count });
      return <div>A: {count}</div>;
    }

    function ComponentB() {
      renderCounts.B++;
      // Inline selector
      const count = useStoreSelector(store, (state) => state * 2);
      logger.log({ component: "B", count });
      return <div>B: {count}</div>;
    }

    const { asFragment, unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <ComponentA />
          <ComponentB />
        </StoreProvider>,
      );
    });

    logger.assertLog([
      { component: "A", count: 1 },
      { component: "B", count: 2 },
    ]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          A: 1
        </div>
        <div>
          B: 2
        </div>
      </DocumentFragment>
    `);

    // Reasonable render counts
    expect(renderCounts.A).toBeLessThan(5);
    expect(renderCounts.B).toBeLessThan(5);

    // Update store
    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([
      { component: "A", count: 2 },
      { component: "B", count: 4 },
    ]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });

  it("inline selector with closure captures current props", async () => {
    const store = createStore(reducer, 10);

    function Component({ multiplier }: { multiplier: number }) {
      // Inline selector that captures props - new function reference every render!
      const count = useStoreSelector(store, (state) => state * multiplier);
      logger.log({ count, multiplier });
      return <div>{count}</div>;
    }

    const { rerender, asFragment, unmount } = await act(async () => {
      return render(
        <StoreProvider>
          <Component multiplier={2} />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 20, multiplier: 2 }]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          20
        </div>
      </DocumentFragment>
    `);

    // Change multiplier prop
    await act(async () => {
      rerender(
        <StoreProvider>
          <Component multiplier={3} />
        </StoreProvider>,
      );
    });

    logger.assertLog([{ count: 30, multiplier: 3 }]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          30
        </div>
      </DocumentFragment>
    `);

    // Update store - should use current multiplier (3)
    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ count: 33, multiplier: 3 }]);

    unmount();
    expect(store._listeners.length).toBe(0);
  });
});
