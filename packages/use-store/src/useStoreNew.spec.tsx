import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, act } from "@testing-library/react";
import { makeExperimentalStoreHooks as makeStoreHooks } from "./useStoreNew";
import { useState, startTransition } from "react";

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

// let React;
// let ReactNoop;
// let Scheduler;
// let act;
// let useEffect;
// let startTransition;
// let logger.assertLog;
// let useLayoutEffect;
// let useState;
// let makeStoreHooks;
// let flushSync;

describe("Experimental Userland Store", () => {
  //   beforeEach(() => {
  //     jest.resetModules();

  //     React = require("react");

  //     ReactNoop = require("react-noop-renderer");
  //     Scheduler = require("scheduler");
  //     act = require("internal-test-utils").act;
  //     useEffect = React.useEffect;
  //     startTransition = React.startTransition;
  //     useLayoutEffect = React.useLayoutEffect;
  //     useState = React.useState;
  //     makeStoreHooks = require("../ExperimentalStore").makeExperimentalStoreHooks;
  //     flushSync = require("react-dom").flushSync;

  //     const InternalTestUtils = require("internal-test-utils");
  //     logger.assertLog = InternalTestUtils.logger.assertLog;
  //   });

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

    // const root = ReactNoop.createRoot();
    // await act(async () => {
    //   root.render(<App />);
    // });
    const { asFragment } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 1 }]);

    // Check that we mount correctly
    // expect(root).toMatchRenderedOutput(<div>1</div>);
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
    // expect(root).toMatchRenderedOutput(<div>1</div>);
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
    // expect(root).toMatchRenderedOutput(
    //   <>
    //     <div>1</div>
    //     <div>1</div>
    //   </>
    // );
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
    // expect(root).toMatchRenderedOutput(
    //   <>
    //     <div>2</div>
    //     <div>2</div>
    //   </>
    // );
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

  it.skip("Does not tear when new component mounts in its own transition mid transition", async () => {
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

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 1 }]);
    // Check that we mount correctly
    expect(root).toMatchRenderedOutput(<div>1</div>);

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
    expect(root).toMatchRenderedOutput(<div>1</div>);

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
    expect(root).toMatchRenderedOutput(
      <>
        <div>2</div>
        <div>2</div>
      </>
    );
  });

  it.skip("Does not miss updates triggered in useEffect or useLayoutEffect", async () => {
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

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(
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
    expect(root).toMatchRenderedOutput(<div>2</div>);

    await act(async () => {
      root.render(
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
    expect(root).toMatchRenderedOutput(
      <>
        <div>3</div>
        <div>3</div>
      </>
    );

    await act(async () => {
      root.render(
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
    expect(root).toMatchRenderedOutput(<div>4</div>);

    await act(async () => {
      root.render(
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
    expect(root).toMatchRenderedOutput(
      <>
        <div>5</div>
        <div>5</div>
      </>
    );
  });

  // This should catch the case where fixups accidentally could get entangled with a transition when they should flush sync.
  it.skip("Does not miss sync updates triggered in useEffect or useLayoutEffect during a long-running transition", async () => {
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

    let resolve;
    startTransition(async () => {
      dispatch({ type: "DOUBLE" });
      await new Promise((_resolve) => {
        resolve = _resolve;
      });
    });

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(
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
    expect(root).toMatchRenderedOutput(<div>3</div>);

    await act(async () => {
      root.render(
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
    expect(root).toMatchRenderedOutput(
      <>
        <div>4</div>
        <div>4</div>
      </>
    );

    await act(async () => {
      root.render(
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
    expect(root).toMatchRenderedOutput(<div>5</div>);

    await act(async () => {
      root.render(
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
    expect(root).toMatchRenderedOutput(
      <>
        <div>6</div>
        <div>6</div>
      </>
    );

    // Not technically part of the test, but just for completeness, let's
    // confirm we get the right thing when the transition completes.
    await act(async () => {
      resolve();
    });
    logger.assertLog([
      { testid: "count", count: 8 },
      { testid: "otherCount", count: 8 },
    ]);
    expect(root).toMatchRenderedOutput(
      <>
        <div>8</div>
        <div>8</div>
      </>
    );
  });

  it.skip("Sync update interrupting transition correctly tracks committed state", async () => {
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

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 2 }]);

    expect(root).toMatchRenderedOutput(<div>2</div>);

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
    expect(root).toMatchRenderedOutput(<div>2</div>);

    // Interrupt with a sync update
    await act(() => {
      dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ testid: "count", count: 3 }]);

    // Check that we flushed the sync update on top of the currently committed
    // state.
    expect(root).toMatchRenderedOutput(<div>3</div>);

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
    expect(root).toMatchRenderedOutput(
      <>
        <div>3</div>
        <div>3</div>
      </>
    );

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
    expect(root).toMatchRenderedOutput(
      <>
        <div>5</div>
        <div>5</div>
      </>
    );
  });

  it.skip("Multiple sync updates interrupting transition correctly tracks committed state", async () => {
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

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 2 }]);

    expect(root).toMatchRenderedOutput(<div>2</div>);

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
    expect(root).toMatchRenderedOutput(<div>2</div>);

    // Interrupt with a sync update
    await act(() => {
      dispatch({ type: "INCREMENT" });
      dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ testid: "count", count: 4 }]);

    // Check that we flushed the sync update on top of the currently comitted
    // state.
    expect(root).toMatchRenderedOutput(<div>4</div>);

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
    expect(root).toMatchRenderedOutput(
      <>
        <div>4</div>
        <div>4</div>
      </>
    );

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
    expect(root).toMatchRenderedOutput(
      <>
        <div>6</div>
        <div>6</div>
      </>
    );
  });

  it.skip("flushSync update interrupting transition correctly tracks committed state", async () => {
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

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 2 }]);

    expect(root).toMatchRenderedOutput(<div>2</div>);

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

    expect(root).toMatchRenderedOutput(<div>2</div>);

    // Interrupt with a flushSync update
    await act(() => {
      startTransition(() => {
        flushSync(() => {
          dispatch({ type: "DOUBLE" });
        });
      });
    });

    logger.assertLog([{ testid: "count", count: 4 }]);

    // Check that we flushed the sync update only
    expect(root).toMatchRenderedOutput(<div>4</div>);

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
    expect(root).toMatchRenderedOutput(
      <>
        <div>4</div>
        <div>4</div>
      </>
    );

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
    expect(root).toMatchRenderedOutput(
      <>
        <div>6</div>
        <div>6</div>
      </>
    );
  });

  it.skip("correctly handles consecutive sync updates", async () => {
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

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 1 }]);
    expect(root).toMatchRenderedOutput(<div>1</div>);

    await act(async () => {
      dispatch({ type: "INCREMENT" });
      dispatch({ type: "INCREMENT" });
    });

    // Autobatching means these flush together
    logger.assertLog([{ testid: "count", count: 3 }]);

    expect(root).toMatchRenderedOutput(<div>3</div>);
  });

  it.skip("useDispatch provides a bound dispatch function", async () => {
    const { useStoreSelector, StoreProvider, useStoreDispatch } =
      makeStoreHooks(reducer, 1);

    function Count({ testid }: { testid: string }) {
      const count = useStoreSelector(identity);
      logger.log({ testid, count });
      return <div>{count}</div>;
    }

    let dispatch;

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

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 1 }]);

    expect(root).toMatchRenderedOutput(<div>1</div>);

    await act(async () => {
      dispatch({ type: "INCREMENT" });
    });

    logger.assertLog([{ testid: "count", count: 2 }]);

    expect(root).toMatchRenderedOutput(<div>2</div>);
  });

  it.skip("dynamic selectors are not yet supported", async () => {
    const { useStoreSelector, StoreProvider } = makeStoreHooks(reducer, 1);

    let setSelector;
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

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(<App />);
    });

    logger.assertLog([{ testid: "count", count: 1 }]);

    expect(root).toMatchRenderedOutput(<div>1</div>);

    let error;
    try {
      await act(async () => {
        setSelector((s) => s * 2);
      });
    } catch (e) {
      error = e;
    }

    logger.assertLog([]);

    expect(error.message).toMatch(
      "useStoreSelector does not currently support dynamic selectors"
    );
  });

  it.skip("transition store update causes new store reader to mount", async () => {
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

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(<App />);
    });

    logger.assertLog([{ action: "render", testid: "countIfEven", count: 1 }]);

    expect(root).toMatchRenderedOutput(null);

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

    expect(root).toMatchRenderedOutput(<div>2</div>);
  });
});
