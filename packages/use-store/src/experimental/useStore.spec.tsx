import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, act } from "@testing-library/react";
import {
  useState,
  startTransition,
  useEffect,
  useLayoutEffect,
  Suspense,
  use,
} from "react";
import { flushSync } from "react-dom";
import { experimental } from "../index";
import Logger from "../../test/TestLogger";

const { createStore, StoreProvider, useStoreSelector } = experimental;

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
  it("dynamic selectors are not yet supported", async () => {
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
});
