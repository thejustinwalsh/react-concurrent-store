import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, act } from "@testing-library/react";
import { makeExperimentalStoreHooks as makeStoreHooks } from "./useStoreNew";
import { useState, startTransition, useEffect, useLayoutEffect } from "react";
import { flushSync } from "react-dom";

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

// Emulate the Scheduler.log/assertLog pattern from React internal tests
class Logger {
  _logs: Array<unknown> = [];
  log(value: unknown) {
    this._logs.push(value);
  }
  assertLog(expected: Array<unknown>) {
    expect(this._logs).toEqual(expected);
    this._logs = [];
  }
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
    const { useStoreSelector, StoreProvider, dispatch } = makeStoreHooks(
      reducer,
      1
    );

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(identity);
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

    const { asFragment } = await act(async () => {
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
        dispatch({ type: "INCREMENT" });
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
  });

  it("Does not tear when new component mounts in its own transition mid transition", async () => {
    const { useStoreSelector, StoreProvider, dispatch } = makeStoreHooks(
      reducer,
      1
    );

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(identity);
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

    const { asFragment } = await act(async () => {
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
        dispatch({ type: "INCREMENT" });
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
  });

  it("Does not miss updates triggered in useEffect or useLayoutEffect", async () => {
    const { useStoreSelector, StoreProvider, useStoreDispatch } =
      makeStoreHooks(reducer, 1);

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(identity);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    function IncrementOnMount() {
      const dispatch = useStoreDispatch();
      useEffect(() => {
        startTransition(() => {
          dispatch({ type: "INCREMENT" });
        });
      }, [dispatch]);
      return null;
    }

    function IncrementOnLayout() {
      const dispatch = useStoreDispatch();
      useLayoutEffect(() => {
        startTransition(() => {
          dispatch({ type: "INCREMENT" });
        });
      }, [dispatch]);
      return null;
    }

    const { rerender, asFragment } = await act(async () => {
      return render(
        <StoreProvider>
          <IncrementOnMount />
          <Count testid="count" />
        </StoreProvider>
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
        </StoreProvider>
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
          <IncrementOnLayout />
          <Count testid="count" />
        </StoreProvider>
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

    await act(async () => {
      rerender(
        <StoreProvider>
          <Count testid="count" />
          <IncrementOnLayout />
          <Count testid="otherCount" />
        </StoreProvider>
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
  });

  // This should catch the case where fixups accidentally could get entangled with a transition when they should flush sync.
  it("Does not miss sync updates triggered in useEffect or useLayoutEffect during a long-running transition", async () => {
    const { useStoreSelector, StoreProvider, dispatch } = makeStoreHooks(
      reducer,
      2
    );

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(identity);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    function IncrementOnMount() {
      useEffect(() => {
        dispatch({ type: "INCREMENT" });
      }, [dispatch]);
      return null;
    }

    function IncrementOnLayout() {
      useLayoutEffect(() => {
        dispatch({ type: "INCREMENT" });
      }, [dispatch]);
      return null;
    }

    // Start a long running transition that will run for the whole test. This
    // should catch cases where fixups get

    let resolve: () => void;
    startTransition(async () => {
      dispatch({ type: "DOUBLE" });
      await new Promise<void>((_resolve) => {
        resolve = _resolve;
      });
    });

    const { rerender, asFragment } = await act(async () => {
      return render(
        <StoreProvider>
          <IncrementOnMount />
          <Count testid="count" />
        </StoreProvider>
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
        </StoreProvider>
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
        </StoreProvider>
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
        </StoreProvider>
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
  });

  it("Sync update interrupting transition correctly tracks committed state", async () => {
    const { useStoreSelector, StoreProvider, dispatch } = makeStoreHooks(
      reducer,
      2
    );

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(identity);
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

    const { asFragment } = await act(async () => {
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
        dispatch({ type: "DOUBLE" });
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
      dispatch({ type: "INCREMENT" });
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
  });

  it("Multiple sync updates interrupting transition correctly tracks committed state", async () => {
    const { useStoreSelector, StoreProvider, dispatch } = makeStoreHooks(
      reducer,
      2
    );

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(identity);
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

    const { asFragment } = await act(async () => {
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
        dispatch({ type: "DOUBLE" });
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
      dispatch({ type: "INCREMENT" });
      dispatch({ type: "INCREMENT" });
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
  });

  it("flushSync update interrupting transition correctly tracks committed state", async () => {
    const { useStoreSelector, StoreProvider, dispatch } = makeStoreHooks(
      reducer,
      2
    );

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(identity);
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

    const { asFragment } = await act(async () => {
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
        dispatch({ type: "INCREMENT" });
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
        dispatch({ type: "DOUBLE" });
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
  });

  it("correctly handles consecutive sync updates", async () => {
    const { useStoreSelector, StoreProvider, dispatch } = makeStoreHooks(
      reducer,
      1
    );

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(identity);
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

    const { asFragment } = await act(async () => {
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
      dispatch({ type: "INCREMENT" });
      dispatch({ type: "INCREMENT" });
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
  });

  it("useDispatch provides a bound dispatch function", async () => {
    const { useStoreSelector, StoreProvider, useStoreDispatch } =
      makeStoreHooks(reducer, 1);

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(identity);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    let dispatch: any;

    function Increment() {
      dispatch = useStoreDispatch();
      return null;
    }

    function App() {
      return (
        <StoreProvider>
          <Count testid="count" />
          <Increment />
        </StoreProvider>
      );
    }

    const { asFragment } = await act(async () => {
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
      dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ testid: "count", count: 2 }]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          2
        </div>
      </DocumentFragment>
    `);
  });

  it("dynamic selectors are not yet supported", async () => {
    const { useStoreSelector, StoreProvider } = makeStoreHooks(reducer, 1);

    let setSelector: any;
    function Count({ testid }: { testid: string }) {
      const [selector, _setSelector] = useState(() => identity);
      setSelector = _setSelector;
      const count = useStoreSelector(selector);
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

    const { asFragment } = await act(async () => {
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
        setSelector((s: number) => s * 2);
      });
    } catch (e) {
      error = e;
    }

    logger.assertLog([]);

    expect(error.message).toMatch(
      "useStoreSelector does not currently support dynamic selectors"
    );
  });

  it("transition store update causes new store reader to mount", async () => {
    const { useStoreSelector, StoreProvider, dispatch } = makeStoreHooks(
      reducer,
      1
    );

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(identity);
      logger.log({ action: "render", testid, count });
      useEffect(() => {
        logger.log({ action: "mount", testid, count });
      }, [count, testid]);
      return <div>{count}</div>;
    }
    function CountIfEven() {
      const count = useStoreSelector(identity);
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

    const { asFragment } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ action: "render", testid: "countIfEven", count: 1 }]);

    expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);

    await act(async () => {
      startTransition(() => {
        dispatch({ type: "INCREMENT" });
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
  });
});
