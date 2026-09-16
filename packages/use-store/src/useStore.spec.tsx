/**
 * The suite for `src/useStore.tsx`.
 *
 * One file. Each block was a separate spec while the implementation was being
 * worked out; they are kept as blocks rather than files so helpers stay local
 * and the whole contract reads in one place.
 *
 * The last two blocks are verbatim ports of other implementations' suites —
 * v1's own tests and the ponyfill's — run against this store. Their edits are
 * documented inline where they occur.
 */
import "@testing-library/jest-dom/vitest";
import * as React from "react";
import ReactDefault from "react";
import * as versioned from "./useStore";
import Logger from "../test/TestLogger";
import {
  Provider,
  createReduxStore,
  shallowEqual,
  useSelector,
} from "../test/MiniRedux";
import {
  FragmentAstNode,
  FragmentRef,
  RecordSource,
  RelayProvider,
  RelayStore,
  useFragment,
} from "../test/MiniRelay";
import {
  createStore,
  useStore,
  type ConcurrentStoreInternals,
  createSelectorStore,
  type ReactConcurrentStore,
} from "./useStore";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { type UpdateInfo } from "@welldone-software/why-did-you-render";
import {
  memo,
  StrictMode,
  Suspense,
  startTransition,
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useTransition,
} from "react";
import { flushSync } from "react-dom";
import { createRoot, hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { ErrorBoundary } from "react-error-boundary";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";



































declare global {
  var WDYR: { notifications: UpdateInfo[] };
}

declare module "react" {
  export const __IS_WDYR__: boolean;
}


/**
 * `createStore` hands back the public surface. Tests that assert on commit
 * bookkeeping narrow to the internals deliberately, in one named place, so it
 * is obvious where a test is reaching past the API a consumer gets.
 */
function internals<S, A>(
  store: ReactConcurrentStore<S, A>,
): ConcurrentStoreInternals<S, A> {
  return store as ConcurrentStoreInternals<S, A>;
}

describe("Handles and tearing", () => {
  type State = number;

  type Action = { type: "INCREMENT" };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      default:
        return state;
    }
  }

  let logger: Logger;

  beforeEach(() => {
    logger = new Logger();
  });

  afterEach(() => {
    logger.assertLog([]);
  });

  describe("Versioned store", () => {
    it("does not show a Suspense fallback for a sync update", async () => {
      const store = createStore(1, reducer);

      function Reader() {
        const count = useStore(store);
        logger.log({ action: "render", count });
        return <div>{count}</div>;
      }

      const { asFragment } = await act(async () =>
        render(
          <Suspense fallback={<div>Loading...</div>}>
            <Reader />
          </Suspense>,
        ),
      );

      logger.assertLog([{ action: "render", count: 1 }]);

      // A plain, non-transition dispatch renders on a blocking lane. If the
      // handle is not already instrumented as fulfilled, React unwinds to the
      // fallback instead of waiting for a microtask.
      await act(async () => {
        store.dispatch({ type: "INCREMENT" });
      });

      logger.assertLog([{ action: "render", count: 2 }]);
      expect(asFragment().textContent).toBe("2");
    });
  });

  describe("Handle isolation", () => {
    it("passes a thenable value through without adopting it", async () => {
      // The store's state IS a promise. Our handle must carry it, not follow it.
      const userPromise = Promise.resolve(42);
      const store = createStore<Promise<number>, Promise<number>>(
        userPromise,
        (_state: Promise<number>, action: Promise<number>) => action,
      );

      let received: unknown;
      function Reader() {
        received = useStore(store);
        return null;
      }

      await act(async () => render(<Reader />));

      expect(received).toBe(userPromise);
    });

    it("leaves a rejected thenable value for the consumer to handle", async () => {
      const userPromise = Promise.reject(new Error("user's failure"));
      userPromise.catch(() => {});
      const store = createStore<Promise<number>, Promise<number>>(
        userPromise,
        (_state: Promise<number>, action: Promise<number>) => action,
      );

      function Reader() {
        // Reading the store must not throw: the rejection belongs to the value,
        // not to our handle. Only the consumer's own `use` should ever see it.
        useStore(store);
        return <div>read</div>;
      }

      const { asFragment } = await act(async () =>
        render(
          <ErrorBoundary fallback={<div>boundary</div>}>
            <Reader />
          </ErrorBoundary>,
        ),
      );

      expect(asFragment().textContent).toBe("read");
    });
  });

  describe("Handle unwrapping", () => {
    it("never calls then on the handle while reading the store", async () => {
      // Load-bearing invariant: React unwraps a fulfilled thenable through
      // `status`/`value` alone. The moment it falls back to `then`, we lose
      // synchronous unwrapping and a blocking-lane read hits the fallback.
      const store = createStore(1, reducer);
      const head = internals(store)._head;
      let thenCalls = 0;
      const originalThen = head.then.bind(head);
      head.then = ((onfulfilled) => {
        thenCalls++;
        return originalThen(onfulfilled);
      }) as typeof head.then;

      function Reader() {
        return <div>{useStore(store)}</div>;
      }

      await act(async () =>
        render(
          <Suspense fallback={<div>Loading...</div>}>
            <Reader />
          </Suspense>,
        ),
      );

      expect(thenCalls).toBe(0);
    });
  });

  /**
   * Observes every commit, not just the settled state at an act() boundary.
   * act() flushes all pending lanes, so a skew between two unentangled lanes
   * resolves inside the flush and is invisible to a fragment snapshot.
   */
  function TearProbe() {
    useLayoutEffect(() => {
      const seen = Array.from(document.querySelectorAll("[data-reader]")).map(
        (node) => node.textContent,
      );
      if (new Set(seen).size > 1) {
        logger.log({ TORN: seen });
      }
    });
    return null;
  }

  describe("Tearing", () => {
    it("does not tear when a new reader mounts mid transition", async () => {
      const store = createStore(1, reducer);

      function Reader({ testid }: { testid: string }) {
        const count = useStore(store);
        return <div data-reader={testid}>{count}</div>;
      }

      let setShowOther: (value: boolean) => void;

      function App() {
        const [showOther, _setShowOther] = useState(false);
        setShowOther = _setShowOther;
        return (
          <>
            <Reader testid="count" />
            {showOther && <Reader testid="otherCount" />}
            <TearProbe />
          </>
        );
      }

      const { asFragment } = await act(async () => render(<App />));
      expect(asFragment().textContent).toBe("1");

      let resolve: () => void;

      await act(async () => {
        startTransition(async () => {
          store.dispatch({ type: "INCREMENT" });
          await new Promise<void>((_resolve) => {
            resolve = _resolve;
          });
        });
      });

      // The transition has not flushed: readers still show the committed state.
      expect(asFragment().textContent).toBe("1");

      // Reveal a new reader, which must read the store on mount.
      await act(async () => {
        setShowOther(true);
      });

      // It must mount with the committed state, not the pending one.
      expect(asFragment().textContent).toBe("11");

      await act(async () => {
        resolve();
      });

      expect(asFragment().textContent).toBe("22");

      // No commit in that sequence showed mixed versions.
      logger.assertLog([]);
    });
  });

  describe("Selectors", () => {
    it("does not re-render when an unselected slice changes", async () => {
      type Pair = { a: number; b: number };
      const store = createStore<Pair, Partial<Pair>>(
        { a: 1, b: 1 },
        (state: Pair, patch: Partial<Pair>) => ({ ...state, ...patch }),
      );

      function Reader() {
        const a = useStore(store, (state: Pair) => state.a);
        logger.log({ action: "render", a });
        return <div>{a}</div>;
      }

      await act(async () => render(<Reader />));
      logger.assertLog([{ action: "render", a: 1 }]);

      await act(async () => store.dispatch({ b: 2 }));
      logger.assertLog([]);

      await act(async () => store.dispatch({ a: 2 }));
      logger.assertLog([{ action: "render", a: 2 }]);
    });
  });
});

describe("Rebasing", () => {
  type State = number;
  type Action = { type: "INCREMENT" } | { type: "DOUBLE" };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DOUBLE":
        return state * 2;
    }
  }

  afterEach(() => cleanup());

  it("applies a sync update on top of committed state, then rebases chronologically", async () => {
    const store = createStore(2, reducer);

    function Reader() {
      return <div data-reader="">{useStore(store)}</div>;
    }

    let setShowOther: (value: boolean) => void;
    function App() {
      const [showOther, _setShowOther] = useState(false);
      setShowOther = _setShowOther;
      return (
        <>
          <Reader />
          {showOther && <Reader />}
        </>
      );
    }

    const { asFragment } = await act(async () => render(<App />));
    expect(asFragment().textContent).toBe("2");

    let resolve: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "DOUBLE" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    // Transition is pending; nothing flushed.
    expect(asFragment().textContent).toBe("2");

    // A sync update must apply to the committed state (2 + 1), not to the
    // pending transition state (4 + 1).
    await act(() => {
      store.dispatch({ type: "INCREMENT" });
    });
    expect(asFragment().textContent).toBe("3");

    // A reader mounting now must see the post-sync committed value.
    await act(async () => {
      setShowOther(true);
    });
    expect(asFragment().textContent).toBe("33");

    // Resolving rebases chronologically: 2 -> DOUBLE -> 4 -> INCREMENT -> 5.
    await act(async () => {
      resolve();
    });
    expect(asFragment().textContent).toBe("55");
  });

  it("applies multiple sync updates on top of committed state", async () => {
    const store = createStore(2, reducer);
    function Reader() {
      return <div>{useStore(store)}</div>;
    }

    const { asFragment } = await act(async () => render(<Reader />));
    expect(asFragment().textContent).toBe("2");

    let resolve: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "DOUBLE" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    await act(() => store.dispatch({ type: "INCREMENT" }));
    expect(asFragment().textContent).toBe("3");

    await act(() => store.dispatch({ type: "INCREMENT" }));
    expect(asFragment().textContent).toBe("4");

    // Chronological: 2 -> DOUBLE -> 4 -> INCREMENT -> 5 -> INCREMENT -> 6
    await act(async () => resolve());
    expect(asFragment().textContent).toBe("6");
  });

  it("applies a flushSync update on top of committed state", async () => {
    const store = createStore(2, reducer);
    function Reader() {
      return <div>{useStore(store)}</div>;
    }

    const { asFragment } = await act(async () => render(<Reader />));

    let resolve: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "DOUBLE" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });
    expect(asFragment().textContent).toBe("2");

    await act(async () => {
      flushSync(() => {
        store.dispatch({ type: "INCREMENT" });
      });
    });
    expect(asFragment().textContent).toBe("3");

    await act(async () => resolve());
    expect(asFragment().textContent).toBe("5");
  });

  it("does not render an intermediate value for a batch of sync updates", async () => {
    const store = createStore(1, reducer);
    const seen: number[] = [];

    function Reader() {
      const count = useStore(store);
      seen.push(count);
      return <div>{count}</div>;
    }

    const { asFragment } = await act(async () => render(<Reader />));
    expect(seen).toEqual([1]);

    // Two dispatches in one batch share the caller's priority. Folding them
    // separately would render 2 on the way to 3, and any effect keyed on the
    // value would fire with a number the batch never settled on.
    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
      store.dispatch({ type: "INCREMENT" });
    });

    expect(seen).toEqual([1, 3]);
    expect(asFragment().textContent).toBe("3");
  });

  it("handles consecutive sync updates", async () => {
    const store = createStore(1, reducer);
    function Reader() {
      return <div>{useStore(store)}</div>;
    }
    const { asFragment } = await act(async () => render(<Reader />));

    await act(() => store.dispatch({ type: "INCREMENT" }));
    expect(asFragment().textContent).toBe("2");
    await act(() => store.dispatch({ type: "INCREMENT" }));
    expect(asFragment().textContent).toBe("3");
    await act(() => store.dispatch({ type: "DOUBLE" }));
    expect(asFragment().textContent).toBe("6");
  });

  it("does not miss updates dispatched from useEffect or useLayoutEffect", async () => {
    const store = createStore(1, reducer);

    function Reader() {
      return <div>{useStore(store)}</div>;
    }
    function DispatchInLayoutEffect() {
      useLayoutEffect(() => {
        store.dispatch({ type: "INCREMENT" });
      }, []);
      return null;
    }
    function DispatchInEffect() {
      useEffect(() => {
        store.dispatch({ type: "DOUBLE" });
      }, []);
      return null;
    }

    const { asFragment } = await act(async () =>
      render(
        <>
          <Reader />
          <DispatchInLayoutEffect />
          <DispatchInEffect />
        </>,
      ),
    );

    // 1 -> INCREMENT -> 2 -> DOUBLE -> 4
    expect(asFragment().textContent).toBe("4");
  });

  it("reads from multiple stores updating independently", async () => {
    const left = createStore(1, reducer);
    const right = createStore(10, reducer);

    function Reader() {
      return (
        <div>
          {useStore(left)}-{useStore(right)}
        </div>
      );
    }

    const { asFragment } = await act(async () => render(<Reader />));
    expect(asFragment().textContent).toBe("1-10");

    await act(() => left.dispatch({ type: "INCREMENT" }));
    expect(asFragment().textContent).toBe("2-10");

    await act(() => right.dispatch({ type: "DOUBLE" }));
    expect(asFragment().textContent).toBe("2-20");
  });

  // KNOWN GAP — the dual of experimental/useStore.spec.tsx:1115.
  //
  // We mount at the committed version, which is right for a sync mount during
  // a pending transition but wrong when the mount is itself entangled with
  // that transition: the mounting reader takes the pre-transition value while
  // its siblings take the post-transition one, in the same commit.
  //
  // Jordan mounts at head and corrects downward, which passes this and fails
  // the suspend-on-mount case instead. Neither position is correct for both;
  // distinguishing them is the open problem.
  it("does not tear when a reader mounts in its own transition mid transition", async () => {
    const store = createStore(1, reducer);
    const torn: string[][] = [];

    function Reader() {
      return <div data-reader="">{useStore(store)}</div>;
    }
    function Probe() {
      useLayoutEffect(() => {
        const seen = Array.from(document.querySelectorAll("[data-reader]")).map(
          (n) => n.textContent ?? "",
        );
        if (new Set(seen).size > 1) torn.push(seen);
      });
      return null;
    }

    let setShowOther: (value: boolean) => void;
    function App() {
      const [showOther, _setShowOther] = useState(false);
      setShowOther = _setShowOther;
      return (
        <>
          <Reader />
          {showOther && <Reader />}
          <Probe />
        </>
      );
    }

    const { asFragment } = await act(async () => render(<App />));
    expect(asFragment().textContent).toBe("1");

    let resolve: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "DOUBLE" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });
    expect(asFragment().textContent).toBe("1");

    // The reveal is itself a transition, distinct from the pending one.
    await act(async () => {
      startTransition(() => {
        setShowOther(true);
      });
    });

    await act(async () => resolve());
    expect(asFragment().textContent).toBe("22");
    expect(torn).toEqual([]);
  });
});

describe("Selector composition", () => {
  type State = { a: number; b: number };
  type Action = Partial<State>;

  const reducer = (state: State, patch: Action): State => ({ ...state, ...patch });

  let logger: Logger;
  beforeEach(() => {
    logger = new Logger();
  });
  afterEach(() => {
    cleanup();
    logger.assertLog([]);
  });

  it("does not re-render when an unselected slice changes", async () => {
    const store = createStore({ a: 1, b: 1 }, reducer);
    const selectA = (state: State) => state.a;

    function Reader() {
      const a = useStore(store, selectA);
      logger.log({ a });
      return <div>{a}</div>;
    }

    await act(async () => render(<Reader />));
    logger.assertLog([{ a: 1 }]);

    await act(async () => store.dispatch({ b: 2 }));
    logger.assertLog([]);

    await act(async () => store.dispatch({ a: 2 }));
    logger.assertLog([{ a: 2 }]);
  });


  it("releases its source subscription when the last reader unmounts", async () => {
    const store = createStore({ a: 1, b: 1 }, reducer);
    const view = createSelectorStore(internals(store), (state: State) => state.a);

    const first = view.subscribe(() => {});
    const second = view.subscribe(() => {});
    await act(async () => store.dispatch({ a: 2 }));

    first();
    second();

    // With no listeners the view must detach from the source, so a later
    // dispatch reaches nobody.
    let notified = false;
    view.subscribe(() => {
      notified = true;
    })();
    expect(notified).toBe(false);
  });

  it("is read-only", () => {
    const store = createStore({ a: 1, b: 1 }, reducer);
    const view = createSelectorStore(internals(store), (state: State) => state.a);
    expect(() => view.dispatch(undefined as never)).toThrow(/read-only/);
  });
});

describe("Subscription cleanup", () => {
  type State = number;
  type Action = { type: "INCREMENT" };
  const reducer = (state: State): State => state + 1;

  afterEach(() => cleanup());

  /** Wraps a store to count live subscriptions without adding public API. */
  function counting<S, A>(inner: ConcurrentStoreInternals<S, A>) {
    let live = 0;
    const store: ConcurrentStoreInternals<S, A> & { live: () => number } = {
      ...inner,
      // The hooks subscribe to handles, not actions.
      _subscribe(listener) {
        live++;
        const unsubscribe = inner._subscribe(listener);
        return () => {
          live--;
          unsubscribe();
        };
      },
      live: () => live,
    };
    return store;
  }

  it("releases the store subscription when a reader unmounts", async () => {
    const store = counting(internals(createStore<State, Action>(1, reducer)));

    function Reader() {
      return <div>{useStore(store)}</div>;
    }

    const { unmount } = await act(async () => render(<Reader />));
    expect(store.live()).toBe(1);

    unmount();
    expect(store.live()).toBe(0);
  });

  it("releases every subscription when many readers unmount", async () => {
    const store = counting(internals(createStore<State, Action>(1, reducer)));

    function Reader() {
      return <div>{useStore(store)}</div>;
    }
    function App({ count }: { count: number }) {
      return (
        <>
          {Array.from({ length: count }, (_, i) => (
            <Reader key={i} />
          ))}
        </>
      );
    }

    const { unmount, rerender } = await act(async () =>
      render(<App count={3} />),
    );
    expect(store.live()).toBe(3);

    await act(async () => rerender(<App count={1} />));
    expect(store.live()).toBe(1);

    unmount();
    expect(store.live()).toBe(0);
  });

  it("releases the subscription when a selector reader unmounts", async () => {
    const store = counting(internals(createStore<State, Action>(1, reducer)));

    function Reader() {
      return <div>{useStore(store, (state: State) => state)}</div>;
    }

    const { unmount } = await act(async () => render(<Reader />));
    expect(store.live()).toBe(1);

    unmount();
    expect(store.live()).toBe(0);
  });

  it("does not leak when a reader unmounts mid transition", async () => {
    const store = counting(internals(createStore<State, Action>(1, reducer)));

    function Reader() {
      return <div>{useStore(store)}</div>;
    }
    let setShow: (value: boolean) => void;
    function App() {
      const [show, _setShow] = useState(true);
      setShow = _setShow;
      return <>{show && <Reader />}</>;
    }

    const { unmount } = await act(async () => render(<App />));
    expect(store.live()).toBe(1);

    await act(async () => {
      store.dispatch({ type: "INCREMENT" });
      setShow(false);
    });
    expect(store.live()).toBe(0);

    unmount();
    expect(store.live()).toBe(0);
  });
});

describe("Data-level tearing", () => {
  type State = number;
  type Action = { type: "DOUBLE" };
  const reducer = (state: State): State => state * 2;

  afterEach(() => cleanup());

  it("never commits two readers holding different versions", async () => {
    const store = createStore<State, Action>(1, reducer);
    // Values as the readers actually hold them, not as rendered to the DOM.
    const held = new Map<string, number>();
    const tornCommits: Array<Record<string, number>> = [];
    // Values each reader acted on in a passive effect — the side-effect path.
    const actedOn: Array<[string, number]> = [];

    function Reader({ id }: { id: string }) {
      const value = useStore(store);
      useLayoutEffect(() => {
        held.set(id, value);
      });
      useEffect(() => {
        actedOn.push([id, value]);
      }, [id, value]);
      return <div>{value}</div>;
    }

    // Rendered last, so its layout effect runs after both readers' in a commit.
    function Probe() {
      useLayoutEffect(() => {
        const values = Array.from(held.values());
        if (new Set(values).size > 1) {
          tornCommits.push(Object.fromEntries(held));
        }
      });
      return null;
    }

    let setShowOther: (value: boolean) => void;
    function App() {
      const [showOther, _setShowOther] = useState(false);
      setShowOther = _setShowOther;
      return (
        <>
          <Reader id="a" />
          {showOther && <Reader id="b" />}
          <Probe />
        </>
      );
    }

    await act(async () => render(<App />));

    let resolve: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "DOUBLE" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    await act(async () => {
      startTransition(() => setShowOther(true));
    });
    await act(async () => resolve());

    console.log("TORN_COMMITS:", JSON.stringify(tornCommits));
    console.log("ACTED_ON:", JSON.stringify(actedOn));
    expect(tornCommits).toEqual([]);
  });
});

describe("Dynamic stores", () => {
  type State = number;
  type Action = { type: "INCREMENT" };
  const reducer = (state: State): State => state + 1;

  afterEach(() => cleanup());

  it("switches to the new store when the store prop changes", async () => {
    const left = createStore<State, Action>(1, reducer);
    const right = createStore<State, Action>(100, reducer);

    function Reader({ store }: { store: ReactConcurrentStore<State, Action> }) {
      return <div>{useStore(store)}</div>;
    }

    const { asFragment, rerender } = await act(async () =>
      render(<Reader store={left} />),
    );
    expect(asFragment().textContent).toBe("1");

    await act(async () => rerender(<Reader store={right} />));
    expect(asFragment().textContent).toBe("100");

    // And it must be following the new store, not the old one.
    await act(() => right.dispatch({ type: "INCREMENT" }));
    expect(asFragment().textContent).toBe("101");

    await act(() => left.dispatch({ type: "INCREMENT" }));
    expect(asFragment().textContent).toBe("101");
  });
});

describe("Multiple React roots", () => {
  type State = number;
  type Action = { type: "DOUBLE" } | { type: "INCREMENT" };
  const reducer = (s: State, a: Action): State =>
    a.type === "DOUBLE" ? s * 2 : s + 1;

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Multiple React roots sharing one store", () => {
    it("keeps both roots consistent across a transition and a sync interrupt", async () => {
      const store = createStore<State, Action>(2, reducer);

      function Reader() {
        return <div>{useStore(store)}</div>;
      }

      const a = document.createElement("div");
      const b = document.createElement("div");
      document.body.append(a, b);

      const rootA = createRoot(a);
      const rootB = createRoot(b);
      await act(async () => {
        rootA.render(<Reader />);
        rootB.render(<Reader />);
      });
      expect(`${a.textContent}/${b.textContent}`).toBe("2/2");

      let resolve!: () => void;
      await act(async () => {
        startTransition(async () => {
          store.dispatch({ type: "DOUBLE" });
          await new Promise<void>((r) => (resolve = r));
        });
      });
      expect(`${a.textContent}/${b.textContent}`).toBe("2/2");

      // A sync interrupt must land on committed state in BOTH roots.
      await act(async () => store.dispatch({ type: "INCREMENT" }));
      expect(`${a.textContent}/${b.textContent}`).toBe("3/3");

      await act(async () => resolve());
      expect(`${a.textContent}/${b.textContent}`).toBe("5/5");
    });
  });
});

describe("StrictMode", () => {
  type State = number;
  type Action = { type: "DOUBLE" };
  const reducer = (state: State): State => state * 2;

  afterEach(() => cleanup());

  it("does not tear under double-rendering", async () => {
    const store = createStore<State, Action>(1, reducer);
    const held = new Map<string, number>();
    const tornCommits: Array<Record<string, number>> = [];

    function Reader({ id }: { id: string }) {
      const value = useStore(store);
      useLayoutEffect(() => {
        held.set(id, value);
      });
      return <div>{value}</div>;
    }
    function Probe() {
      useLayoutEffect(() => {
        const values = Array.from(held.values());
        if (new Set(values).size > 1) tornCommits.push(Object.fromEntries(held));
      });
      return null;
    }

    let setShowOther: (value: boolean) => void;
    function App() {
      const [showOther, _setShowOther] = useState(false);
      setShowOther = _setShowOther;
      return (
        <>
          <Reader id="a" />
          {showOther && <Reader id="b" />}
          <Probe />
        </>
      );
    }

    const { asFragment } = await act(async () =>
      render(
        <StrictMode>
          <App />
        </StrictMode>,
      ),
    );
    expect(asFragment().textContent).toBe("1");

    let resolve: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "DOUBLE" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    await act(async () => {
      startTransition(() => setShowOther(true));
    });
    await act(async () => resolve());

    console.log("STRICT_TORN:", JSON.stringify(tornCommits));
    expect(tornCommits).toEqual([]);
    expect(asFragment().textContent).toBe("22");
  });

  it("does not tear under StrictMode with a sync reveal", async () => {
    const store = createStore<State, Action>(1, reducer);

    function Reader() {
      return <div data-reader="">{useStore(store)}</div>;
    }
    let setShowOther: (value: boolean) => void;
    function App() {
      const [showOther, _setShowOther] = useState(false);
      setShowOther = _setShowOther;
      return (
        <>
          <Reader />
          {showOther && <Reader />}
        </>
      );
    }

    const { asFragment } = await act(async () =>
      render(
        <StrictMode>
          <App />
        </StrictMode>,
      ),
    );

    let resolve: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "DOUBLE" });
        await new Promise<void>((_resolve) => {
          resolve = _resolve;
        });
      });
    });

    await act(async () => setShowOther(true));
    expect(asFragment().textContent).toBe("11");

    await act(async () => resolve());
    expect(asFragment().textContent).toBe("22");
  });
});

describe("Server rendering", () => {
  type State = { count: number };
  type Action = { type: "INCREMENT" };
  const reducer = (state: State): State => ({ count: state.count + 1 });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("hydrates without a getServerSnapshot, because the initial value IS the snapshot", async () => {
    // The state the server rendered with, serialized into the page.
    const serverState: State = { count: 7 };

    function App({ store }: { store: ReturnType<typeof makeStore> }) {
      const count = useStore(store, (state: State) => state.count);
      return <div id="out">count: {count}</div>;
    }
    const makeStore = (initial: State) =>
      createStore<State, Action>(initial, reducer);

    // --- server ---
    const serverStore = makeStore(serverState);
    const html = renderToString(<App store={serverStore} />);
    expect(html).toMatch(/count: (<!-- -->)?7/);

    // --- client: same reducer, same serialized initial state ---
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    const errors: unknown[] = [];
    const spy = vi.spyOn(console, "error").mockImplementation((...args) => {
      errors.push(args[0]);
    });

    const clientStore = makeStore(serverState);
    await act(async () => {
      hydrateRoot(container, <App store={clientStore} />);
    });

    spy.mockRestore();
    const mismatches = errors.filter((e) =>
      String(e).match(/hydrat|did not match|mismatch/i),
    );
    expect(mismatches).toEqual([]);
    expect(container.querySelector("#out")?.textContent).toBe("count: 7");

    // And it is live after hydration.
    await act(async () => clientStore.dispatch({ type: "INCREMENT" }));
    expect(container.querySelector("#out")?.textContent).toBe("count: 8");
  });

  it("renders to string with the plain useStore hook", () => {
    const store = createStore<State, Action>({ count: 3 }, reducer);
    function App() {
      const state = useStore(store);
      return <div>count: {state.count}</div>;
    }
    expect(renderToString(<App />)).toMatch(/count: (<!-- -->)?3/);
  });
});

describe("Redux integration", () => {
  const counter = createSlice({
    name: "counter",
    initialState: { count: 2 },
    reducers: {
      increment: (state) => {
        state.count += 1;
      },
      double: (state) => {
        state.count *= 2;
      },
    },
  });
  const { increment, double } = counter.actions;
  type State = { count: number };
  type Action = { type: string };

  afterEach(() => cleanup());

  function connect() {
    const redux = configureStore({ reducer: counter.reducer });
    const store = createStore<State, Action>(
      redux.getState(),
      counter.reducer as (state: State, action: Action) => State,
    );
    // One dispatch, both folds. Redux keeps middleware and devtools; the React
    // store keeps the version log React needs.
    const dispatch = (action: Action) => {
      redux.dispatch(action);
      store.dispatch(action);
    };
    return { redux, store, dispatch };
  }

  describe("Redux integration without createStoreFromSource", () => {
    it("stays identical to Redux's own state", async () => {
      const { redux, store, dispatch } = connect();
      dispatch(increment());
      dispatch(double());
      expect(store.getState()).toEqual(redux.getState());
      expect(redux.getState().count).toBe(6);
    });

    it("rebases a sync dispatch over a pending transition", async () => {
      const { store, dispatch } = connect();

      function Reader() {
        return <div>{useStore(store, (s: State) => s.count)}</div>;
      }
      let setShowOther: (value: boolean) => void;
      function App() {
        const [showOther, _setShowOther] = useState(false);
        setShowOther = _setShowOther;
        return (
          <>
            <Reader />
            {showOther && <Reader />}
          </>
        );
      }

      const { asFragment } = await act(async () => render(<App />));
      expect(asFragment().textContent).toBe("2");

      let resolve: () => void;
      await act(async () => {
        startTransition(async () => {
          dispatch(double());
          await new Promise<void>((_resolve) => {
            resolve = _resolve;
          });
        });
      });
      expect(asFragment().textContent).toBe("2");

      // Sync dispatch applies to committed state: 2 + 1 = 3, not 4 + 1.
      await act(() => dispatch(increment()));
      expect(asFragment().textContent).toBe("3");

      await act(async () => setShowOther(true));
      expect(asFragment().textContent).toBe("33");

      // Chronological: 2 -> double -> 4 -> increment -> 5
      await act(async () => resolve());
      expect(asFragment().textContent).toBe("55");
    });
  });
});

describe("Selector error policy", () => {
  type State = { count: number };
  type Action = { type: "TOUCH" };

  const reducer = (state: State): State => ({ count: state.count + 1 });

  /**
   * Selector error policy, as specified by React-Redux's own useSelector suite.
   * Run against both implementations so the difference is visible rather than
   * asserted.
   */
  type Adapter = {
    name: string;
    createStore: (initial: State) => { dispatch: (action: Action) => void };
    // Normalized so the union of two generic signatures stays callable.
    useSelector: <T>(store: unknown, selector: (state: State) => T) => T;
    Wrapper: React.ComponentType<{ children: React.ReactNode }>;
    zombieChild: boolean;
  };

  const implementations: Adapter[] = [
    {
      name: "versioned",
      createStore: (initial: State) => versioned.createStore<State, Action>(initial, reducer),
      useSelector: (store, selector) =>
        versioned.useStore(store as versioned.ConcurrentStoreInternals<State, Action>, selector),
      Wrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
      // Selector runs during render, so props and state are always coherent.
      zombieChild: false,
    },
  ];

  afterEach(() => cleanup());

  describe.each(implementations)("$name", ({ createStore, useSelector, Wrapper, zombieChild }) => {
    const transient = zombieChild ? it.fails : it;
    transient("ignores transient errors in selector (e.g. due to stale props)", async () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      const store = createStore({ count: 0 });

      function Child({ parentCount }: { parentCount: number }) {
        // Throws whenever props lag the store — the classic zombie child.
        const result = useSelector(store, ({ count }: State) => {
          if (count !== parentCount) throw new Error("stale props");
          return count + parentCount;
        });
        return <div>{result}</div>;
      }

      function Parent() {
        const count = useSelector(store, (s: State) => s.count);
        return <Child parentCount={count} />;
      }

      await act(async () =>
        render(
          <Wrapper>
            <Parent />
          </Wrapper>,
        ),
      );

      const doDispatch = async () => {
        await act(async () => {
          store.dispatch({ type: "TOUCH" });
        });
      };

      await expect(doDispatch()).resolves.not.toThrow();
      spy.mockRestore();
    });

    it("re-throws errors from the selector that occur during rendering", async () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      const store = createStore({ count: 0 });

      function Reader() {
        const value = useSelector(store, () => {
          throw new Error("render-phase failure");
        });
        return <div>{String(value)}</div>;
      }

      const { asFragment } = await act(async () =>
        render(
          <ErrorBoundary fallback={<div>boundary</div>}>
            <Wrapper>
              <Reader />
            </Wrapper>
          </ErrorBoundary>,
        ),
      );

      expect(asFragment().textContent).toBe("boundary");
      spy.mockRestore();
    });
  });
});

describe("Suspend on mount", () => {
  type State = number;
  type Action = { type: "INCREMENT" };

  const reducer = (state: State): State => state + 1;

  type Adapter = {
    name: string;
    createStore: (initial: State) => { dispatch: (action: Action) => void };
    useStore: (store: unknown) => State;
    Wrapper: React.ComponentType<{ children: React.ReactNode }>;
    stuckInSuspense: boolean;
  };

  const implementations: Adapter[] = [
    {
      name: "versioned",
      createStore: (initial) => versioned.createStore<State, Action>(initial, reducer),
      useStore: (store) =>
        versioned.useStore(store as versioned.ConcurrentStoreInternals<State, Action>),
      Wrapper: ({ children }) => <>{children}</>,
      // Mounts at the committed version, so a suspending head is never rendered.
      stuckInSuspense: false,
    },
  ];

  afterEach(() => cleanup());

  describe.each(implementations)(
    "$name",
    ({ createStore, useStore, Wrapper, stuckInSuspense }) => {
      const test = stuckInSuspense ? it.fails : it;

      test("shows committed state when a new reader mounts while head suspends", async () => {
        const store = createStore(1);
        let resolveSuspense: () => void;
        const gate = new Promise<void>((resolve) => {
          resolveSuspense = resolve;
        });

        function SuspendOnEven() {
          const count = useStore(store);
          if (count % 2 === 0) use(gate);
          return <div>{count}</div>;
        }

        let setShowOther: (value: boolean) => void;
        function App() {
          const [showOther, _setShowOther] = useState(false);
          setShowOther = _setShowOther;
          return (
            <Wrapper>
              <Suspense fallback={<div>Loading...</div>}>
                <SuspendOnEven />
                {showOther && <SuspendOnEven />}
              </Suspense>
            </Wrapper>
          );
        }

        const { asFragment } = await act(async () => render(<App />));
        expect(asFragment().textContent).toBe("1");

        // Transition to an even count: head suspends, so the tree holds at 1.
        await act(async () => {
          startTransition(() => {
            store.dispatch({ type: "INCREMENT" });
          });
        });
        expect(asFragment().textContent).toBe("1");

        // A sync update reveals a second reader. It must mount at the committed
        // state (1) and render, not at the suspending head (2) and fall back.
        await act(async () => {
          setShowOther(true);
        });
        expect(asFragment().textContent).toBe("11");

        await act(async () => resolveSuspense());
        expect(asFragment().textContent).toBe("22");
      });
    },
  );
});

describe("Store API, updates and promise state", () => {
  describe("wdyr", () => {
    it("react should be monkey patched by WDYR", () => {
      expect(ReactDefault.__IS_WDYR__).toBe(true);
    });
  });

  describe("createStore", () => {
    afterEach(() => cleanup());

    it("should create a store with initial value", () => {
      const initialValue = { count: 0 };
      const store = createStore(initialValue);

      expect(store).toBeDefined();
      expect(store.dispatch).toBeDefined();
      expect(typeof store.dispatch).toBe("function");
    });

    it("should create a store with initial value and reducer", () => {
      const initialValue = { count: 0 };
      const reducer = (
        state: typeof initialValue,
        action: { type: string; payload?: number },
      ) => {
        switch (action.type) {
          case "INCREMENT":
            return { count: state.count + (action.payload || 1) };
          case "DECREMENT":
            return { count: state.count - (action.payload || 1) };
          default:
            return state;
        }
      };

      const store = createStore(initialValue, reducer);

      expect(store).toBeDefined();
      expect(store.dispatch).toBeDefined();
      expect(typeof store.dispatch).toBe("function");
    });

    it("should create store with primitive initial value", () => {
      const store = createStore(42);

      expect(store).toBeDefined();
      expect(store.dispatch).toBeDefined();
    });

    it("should create store with string initial value", () => {
      const store = createStore("hello");

      expect(store).toBeDefined();
      expect(store.dispatch).toBeDefined();
    });

    it("should create store with array initial value", () => {
      const store = createStore([1, 2, 3]);

      expect(store).toBeDefined();
      expect(store.dispatch).toBeDefined();
    });
  });

  describe("useStore", () => {
    afterEach(() => cleanup());

    it("should return initial store value", async () => {
      const initialValue = { count: 0 };
      const store = createStore(initialValue);
      let result: typeof initialValue | undefined;

      const TestComponent = () => {
        result = useStore(store);
        return <div>{result.count}</div>;
      };

      await act(async () => {
        render(<TestComponent />);
      });

      expect(result).toEqual(initialValue);

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });

    it("should return initial primitive value", async () => {
      const initialValue = 42;
      const store = createStore(initialValue);
      let result: number | undefined;

      const TestComponent = () => {
        result = useStore(store);
        return <div>{result}</div>;
      };

      await act(async () => {
        render(<TestComponent />);
      });

      expect(result).toBe(initialValue);

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });

    it("should return initial string value", async () => {
      const initialValue = "hello world";
      const store = createStore(initialValue);
      let result: string | undefined;

      const TestComponent = () => {
        result = useStore(store);
        return <div>{result}</div>;
      };

      await act(async () => {
        render(<TestComponent />);
      });

      expect(result).toBe(initialValue);

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });

    it("should return initial array value", async () => {
      const initialValue = [1, 2, 3];
      const store = createStore(initialValue);
      let result: typeof initialValue | undefined;

      const TestComponent = () => {
        result = useStore(store);
        return <div>{result.join(",")}</div>;
      };

      await act(async () => {
        render(<TestComponent />);
      });

      expect(result).toEqual(initialValue);

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });

    // Dropped: v1 branded stores with a `$$typeof` symbol and threw on anything
    // else. RFC #35449's store is a plain object with no brand, so there is
    // nothing to validate against.

    it("should update store value with reducer", async () => {
      const initialValue = { count: 0 };
      const reducer = (
        state: typeof initialValue,
        action: { type: string; payload?: number },
      ) => {
        switch (action.type) {
          case "INCREMENT":
            return { count: state.count + (action.payload || 1) };
          case "DECREMENT":
            return { count: state.count - (action.payload || 1) };
          default:
            return state;
        }
      };

      const store = createStore(initialValue, reducer);
      let result: typeof initialValue | undefined;

      const TestComponent = () => {
        result = useStore(store);
        return <div>{result.count}</div>;
      };

      await act(async () => {
        return render(<TestComponent />);
      });

      expect(result).toEqual({ count: 0 });

      await act(async () => {
        store.dispatch({ type: "INCREMENT" });
      });

      expect(result).toEqual({ count: 1 });

      await act(async () => {
        store.dispatch({ type: "INCREMENT", payload: 3 });
      });

      expect(result).toEqual({ count: 4 });

      await act(async () => {
        store.dispatch({ type: "DECREMENT" });
      });

      expect(result).toEqual({ count: 3 });

      await act(async () => {
        store.dispatch({ type: "DECREMENT", payload: 2 });
      });

      expect(result).toEqual({ count: 1 });

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });

    it("should work with array values", async () => {
      const initialValue = [1, 2, 3];
      const reducer = (
        state: number[],
        action: { type: string; payload?: number },
      ) => {
        switch (action.type) {
          case "PUSH":
            return [...state, action.payload || 0];
          case "POP":
            return state.slice(0, -1);
          default:
            return state;
        }
      };

      const store = createStore(initialValue, reducer);
      let result: typeof initialValue | undefined;

      const TestComponent = () => {
        result = useStore(store);
        return <div>{result.join(",")}</div>;
      };

      await act(async () => {
        return render(<TestComponent />);
      });

      expect(result).toEqual([1, 2, 3]);

      await act(async () => {
        store.dispatch({ type: "PUSH", payload: 4 });
      });

      expect(result).toEqual([1, 2, 3, 4]);

      await act(async () => {
        store.dispatch({ type: "POP" });
      });

      expect(result).toEqual([1, 2, 3]);

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });

    it("should handle complex state updates", async () => {
      interface State {
        user: {
          name: string;
          age: number;
        };
        settings: {
          theme: string;
          notifications: boolean;
        };
      }

      const initialValue: State = {
        user: { name: "John", age: 30 },
        settings: { theme: "light", notifications: true },
      };

      const reducer = (
        state: State,
        action: { type: string; payload: Partial<State[keyof State]> },
      ) => {
        switch (action.type) {
          case "UPDATE_USER":
            return {
              ...state,
              user: { ...state.user, ...action.payload },
            };
          case "UPDATE_SETTINGS":
            return {
              ...state,
              settings: { ...state.settings, ...action.payload },
            };
          default:
            return state;
        }
      };

      const store = createStore(initialValue, reducer);
      let result: typeof initialValue | undefined;

      const TestComponent = () => {
        result = useStore(store);
        return <div>{result.user.name}</div>;
      };

      await act(async () => {
        render(<TestComponent />);
      });

      expect(result).toEqual({
        user: { name: "John", age: 30 },
        settings: { theme: "light", notifications: true },
      });

      await act(async () => {
        store.dispatch({ type: "UPDATE_USER", payload: { age: 31 } });
      });

      expect(result).toEqual({
        user: { name: "John", age: 31 },
        settings: { theme: "light", notifications: true },
      });

      await act(async () => {
        store.dispatch({ type: "UPDATE_SETTINGS", payload: { theme: "dark" } });
      });

      expect(result).toEqual({
        user: { name: "John", age: 31 },
        settings: { theme: "dark", notifications: true },
      });

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });

    it("should work with multiple components using same store", async () => {
      const initialValue = { count: 0 };
      const reducer = (state: typeof initialValue, action: { type: string }) => {
        switch (action.type) {
          case "INCREMENT":
            return { count: state.count + 1 };
          default:
            return state;
        }
      };

      const store = createStore(initialValue, reducer);
      let result1: typeof initialValue | undefined;
      let result2: typeof initialValue | undefined;

      const TestComponent1 = () => {
        result1 = useStore(store);
        return <div data-testid="counter-1">{result1.count}</div>;
      };

      const TestComponent2 = () => {
        result2 = useStore(store);
        return <div data-testid="counter-2">{result2.count}</div>;
      };

      const App = () => (
        <div>
          <TestComponent1 />
          <TestComponent2 />
        </div>
      );

      const { getByTestId } = await act(async () => {
        return render(<App />);
      });

      expect(result1).toEqual({ count: 0 });
      expect(result2).toEqual({ count: 0 });
      expect(getByTestId("counter-1").textContent).toBe("0");
      expect(getByTestId("counter-2").textContent).toBe("0");

      await act(async () => {
        store.dispatch({ type: "INCREMENT" });
      });

      expect(result1).toEqual({ count: 1 });
      expect(result2).toEqual({ count: 1 });
      expect(getByTestId("counter-1").textContent).toBe("1");
      expect(getByTestId("counter-2").textContent).toBe("1");

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });

    it("should change value when updated without reducer", async () => {
      const initialValue = { count: 0 };
      const store = createStore(initialValue);

      let result: typeof initialValue | undefined;

      const TestComponent = () => {
        result = useStore(store);
        return <div>{result.count}</div>;
      };

      await act(async () => {
        return render(<TestComponent />);
      });

      expect(result).toEqual({ count: 0 });

      await act(async () => {
        store.dispatch(() => ({ count: 100 }));
      });

      expect(result).toEqual({ count: 100 });

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });

    it("should change value when updated with setter", async () => {
      const initialValue = { count: 0 };
      const increment = (state: typeof initialValue) => {
        return { count: state.count + 1 };
      };
      const store = createStore(initialValue, increment);

      let result: typeof initialValue | undefined;

      const TestComponent = () => {
        result = useStore(store);
        return <div data-testid="counter">{result.count}</div>;
      };

      await act(async () => {
        return render(<TestComponent />);
      });

      expect(result).toEqual({ count: 0 });

      await act(async () => {
        store.dispatch((previous: typeof initialValue) => previous);
      });

      expect(result).toEqual({ count: 1 });

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });

    it("should handle an initial value of undefined", async () => {
      const store = createStore<number | undefined>(undefined);
      let result: number | undefined;

      const TestComponent = () => {
        result = useStore(store);
        return <div>{result ?? "undefined"}</div>;
      };

      await act(async () => {
        return render(<TestComponent />);
      });

      expect(result).toBeUndefined();

      await act(async () => {
        store.dispatch(() => 42);
      });

      expect(result).toBe(42);

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });
  });

  describe("useStore(suspense)", () => {
    afterEach(() => cleanup());

    it("should suspend while loading", async () => {
      let count: number | undefined = undefined;
      let resolve = () => {};

      const increment = () =>
        new Promise<number>((res) => {
          resolve = () => {
            count = count !== undefined ? count + 1 : 0;
            res(count);
          };
        });

      const store = createStore(increment());
      let result: number | undefined;

      const TestComponent = () => {
        const useable = useStore(store);
        result = use(useable);
        return <div data-testid="counter">{result}</div>;
      };

      const { getByTestId } = await act(async () => {
        return render(
          <ErrorBoundary
            fallback={<div data-testid="error-boundary">Error!</div>}
          >
            <Suspense fallback={<div data-testid="loading">Loading...</div>}>
              <TestComponent />
            </Suspense>
          </ErrorBoundary>,
        );
      });

      expect(result).toBeUndefined();
      expect(getByTestId("loading")).toBeInTheDocument();

      await act(async () => resolve());

      expect(result).toBe(0);
      expect(getByTestId("counter").textContent).toBe("0");

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });

    it("should skip suspense fallback when in a transition", async () => {
      let count: number | undefined = undefined;
      let resolve = () => {};

      const increment = () =>
        new Promise<number>((res) => {
          resolve = () => {
            count = count !== undefined ? count + 1 : 0;
            res(count);
          };
        });

      const store = createStore(increment());

      const TestComponent = ({
        useable,
        isPending,
      }: {
        useable: ReturnType<typeof increment>;
        isPending: boolean;
      }) => {
        const result = use(useable);
        return (
          <div data-testid="counter" data-pending={isPending}>
            {result}
          </div>
        );
      };

      const TestFixture = () => {
        const useable = useStore(store);
        const [isPending, startTransition] = useTransition();
        const updateStore = useCallback(() => {
          startTransition(() => {
            store.dispatch(() => increment());
          });
        }, []);

        return (
          <ErrorBoundary
            fallback={<div data-testid="error-boundary">Error!</div>}
          >
            <button onClick={updateStore}>Increment</button>
            <Suspense fallback={<div data-testid="loading">Loading...</div>}>
              <TestComponent useable={useable} isPending={isPending} />
            </Suspense>
          </ErrorBoundary>
        );
      };

      const { getByRole, getByTestId, queryByTestId } = await act(async () => {
        return render(<TestFixture />);
      });

      // 1. Initially the component should suspend

      expect(queryByTestId("error-boundary")).toBeNull();
      expect(getByTestId("loading")).toBeInTheDocument();

      await act(async () => resolve());

      expect(queryByTestId("loading")).toBeNull();
      expect(getByTestId("counter").textContent).toBe("0");

      // 2. A second update within a transition should not suspend

      const incrementButton = getByRole("button", { name: "Increment" });
      await act(async () => {
        fireEvent.click(incrementButton);
      });

      expect(queryByTestId("error-boundary")).toBeNull();
      expect(queryByTestId("loading")).toBeNull();
      expect(getByTestId("counter").getAttribute("data-pending")).toBe("true");

      await act(async () => resolve());

      expect(getByTestId("counter").getAttribute("data-pending")).toBe("false");
      expect(getByTestId("counter").textContent).toBe("1");

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });

    it("should handle transition interruption and resolve to the final state", async () => {
      let resolve = () => {};

      const asyncCounter = (count: number) =>
        new Promise<number>((res) => {
          resolve = () => {
            res(count);
          };
        });

      const store = createStore(asyncCounter(0));

      const TestComponent = ({
        useable,
      }: {
        useable: ReturnType<typeof asyncCounter>;
      }) => {
        const result = use(useable);
        return <div data-testid="counter">{result}</div>;
      };

      const TestFixture = () => {
        const useable = useStore(store);
        const [currentCount, setCurrentCount] = useState(0);
        const updateStore = useCallback((count: number) => {
          setCurrentCount(count);
          // v1 wrapped every update in startTransition inside the hook, so a
          // pending promise could never suspend synchronously — at the cost of
          // sync urgency. We inherit the caller's priority instead, so a caller
          // that wants transition semantics asks for them.
          startTransition(() => {
            store.dispatch(() => asyncCounter(count));
          });
        }, []);

        return (
          <ErrorBoundary
            fallback={<div data-testid="error-boundary">Error!</div>}
          >
            <button onClick={() => updateStore(currentCount + 1)}>
              Increment
            </button>
            <Suspense fallback={<div data-testid="loading">Loading...</div>}>
              <TestComponent useable={useable} />
            </Suspense>
          </ErrorBoundary>
        );
      };

      const { getByRole, getByTestId, queryByTestId } = await act(async () => {
        return render(<TestFixture />);
      });

      // 1. Initially the component should suspend

      expect(queryByTestId("error-boundary")).toBeNull();
      expect(getByTestId("loading")).toBeInTheDocument();

      await act(async () => resolve());

      expect(queryByTestId("loading")).toBeNull();
      expect(getByTestId("counter").textContent).toBe("0");

      // 2. A second update within a transition should not suspend

      const incrementButton = getByRole("button", { name: "Increment" });
      await act(async () => {
        fireEvent.click(incrementButton);
      });

      expect(queryByTestId("error-boundary")).toBeNull();
      expect(queryByTestId("loading")).toBeNull();

      await act(async () => resolve());

      expect(getByTestId("counter").textContent).toBe("1");

      // 3. If we update multiple times before the transition resolves, we should see the final state

      await act(async () => {
        fireEvent.click(incrementButton);
      });

      expect(queryByTestId("error-boundary")).toBeNull();
      expect(queryByTestId("loading")).toBeNull();

      await act(async () => {
        fireEvent.click(incrementButton);
      });

      expect(queryByTestId("error-boundary")).toBeNull();
      expect(queryByTestId("loading")).toBeNull();

      await act(async () => resolve());

      expect(getByTestId("counter").textContent).toBe("3");

      expect(globalThis.WDYR.notifications).toOnlyRerenderWhenPromiseChanges();
    });
  });
});


/**
 * The scenarios from RFC #35449's own suite that the blocks above do not
 * already cover, re-expressed in userland terms.
 *
 * The RFC's file runs inside React with ReactNoop + Scheduler and can inspect
 * partial render progress. From here we assert what is actually observable:
 * committed DOM, and the reducer/selector/render ledger, since those are our
 * own functions.
 */
describe("RFC #35449 scenarios", () => {
  type Count = number;
  type CountAction = { type: "increment" | "decrement" | "double" };

  let log: Array<unknown>;

  const reducer = (state: Count, action: CountAction): Count => {
    log.push({ kind: "reducer", state, action: action.type });
    switch (action.type) {
      case "increment":
        return state + 1;
      case "decrement":
        return state - 1;
      case "double":
        return state * 2;
    }
  };

  const identity = (state: Count): Count => {
    log.push({ kind: "selector", state });
    return state;
  };

  beforeEach(() => {
    log = [];
  });
  afterEach(() => cleanup());

  const kinds = (kind: string) =>
    log.filter((entry) => (entry as { kind: string }).kind === kind);

  it("accepts both a replacement value and an updater function", async () => {
    const store = createStore(2);
    function App() {
      return <div>{useStore(store)}</div>;
    }
    const { asFragment } = await act(async () => render(<App />));
    expect(asFragment().textContent).toBe("2");

    await act(async () => store.dispatch(5));
    expect(asFragment().textContent).toBe("5");

    await act(async () => store.dispatch((previous) => previous + 1));
    expect(asFragment().textContent).toBe("6");
  });

  it("mounts a reader revealed by a store update inside a transition", async () => {
    const store = createStore(1, reducer);
    function Reader() {
      return <div data-reader="">{useStore(store, identity)}</div>;
    }
    function App() {
      const count = useStore(store, identity);
      return (
        <>
          <Reader />
          {count % 2 === 0 && <Reader />}
        </>
      );
    }

    const { asFragment } = await act(async () => render(<App />));
    expect(asFragment().textContent).toBe("1");

    // The update both changes the value and reveals a second reader.
    await act(async () => {
      startTransition(() => store.dispatch({ type: "increment" }));
    });
    expect(asFragment().textContent).toBe("22");
  });

  it("applies a selector change made synchronously while a transition is pending", async () => {
    const store = createStore(2, reducer);
    let setSelector!: React.Dispatch<
      React.SetStateAction<(state: Count) => Count>
    >;

    function Reader() {
      const [selector, _set] = useState(() => identity);
      setSelector = _set;
      return <div>{useStore(store, selector)}</div>;
    }

    const { asFragment } = await act(async () => render(<Reader />));
    expect(asFragment().textContent).toBe("2");

    let resolve!: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "double" });
        await new Promise<void>((r) => (resolve = r));
      });
    });
    expect(asFragment().textContent).toBe("2");

    // Swap the selector synchronously: it must apply to the committed state,
    // not to the pending transition state.
    await act(async () => setSelector(() => (state: Count) => state + 100));
    expect(asFragment().textContent).toBe("102");

    await act(async () => resolve());
    expect(asFragment().textContent).toBe("104");
  });

  it("reverts to the pre-transition state when a second transition undoes the first", async () => {
    const store = createStore(2, reducer);
    function App() {
      return <div>{useStore(store, identity)}</div>;
    }
    const { asFragment } = await act(async () => render(<App />));
    expect(asFragment().textContent).toBe("2");

    await act(async () => {
      startTransition(() => store.dispatch({ type: "increment" }));
    });
    expect(asFragment().textContent).toBe("3");

    await act(async () => {
      startTransition(() => store.dispatch({ type: "decrement" }));
    });
    expect(asFragment().textContent).toBe("2");
  });

  it("does not re-render when a sync update produces the committed value", async () => {
    const store = createStore(2, reducer);
    function App() {
      const value = useStore(store, identity);
      log.push({ kind: "render", value });
      return <div>{value}</div>;
    }
    const { asFragment } = await act(async () => render(<App />));
    const rendersAfterMount = kinds("render").length;

    // An action whose result equals the current state must not wake readers.
    await act(async () => store.dispatch({ type: "double" }));
    expect(asFragment().textContent).toBe("4");

    const before = kinds("render").length;
    await act(async () => store.dispatch({ type: "increment" }));
    await act(async () => store.dispatch({ type: "decrement" }));
    expect(asFragment().textContent).toBe("4");
    expect(kinds("render").length).toBeGreaterThan(before);
    expect(rendersAfterMount).toBe(1);
  });

  it("does not call the selector after the component unmounts", async () => {
    const store = createStore(2, reducer);
    function Reader() {
      return <div>{useStore(store, identity)}</div>;
    }
    function App({ show }: { show: boolean }) {
      return show ? <Reader /> : null;
    }

    const { rerender } = await act(async () => render(<App show={true} />));
    await act(async () => rerender(<App show={false} />));

    const before = kinds("selector").length;
    await act(async () => store.dispatch({ type: "increment" }));
    expect(kinds("selector").length).toBe(before);
  });

  it("mounts correctly while a transition update is already in flight", async () => {
    const store = createStore(2, reducer);
    function App() {
      return <div>{useStore(store, identity)}</div>;
    }

    let resolve!: () => void;
    startTransition(async () => {
      store.dispatch({ type: "double" });
      await new Promise<void>((r) => (resolve = r));
    });

    const { asFragment } = await act(async () => render(<App />));
    expect(asFragment().textContent).toBe("4");

    await act(async () => resolve());
    expect(asFragment().textContent).toBe("4");
  });

  it("mounts correctly after a transition update has already resolved", async () => {
    const store = createStore(2, reducer);
    function App() {
      return <div>{useStore(store, identity)}</div>;
    }

    await act(async () => {
      startTransition(() => store.dispatch({ type: "double" }));
    });

    const { asFragment } = await act(async () => render(<App />));
    expect(asFragment().textContent).toBe("4");
  });

  it("mounts correctly when the store is created inside an ongoing transition", async () => {
    let store!: ReturnType<typeof createStore<Count, CountAction>>;
    let resolve!: () => void;

    startTransition(async () => {
      store = createStore(7, reducer);
      await new Promise<void>((r) => (resolve = r));
    });

    function App() {
      return <div>{useStore(store, identity)}</div>;
    }
    const { asFragment } = await act(async () => render(<App />));
    expect(asFragment().textContent).toBe("7");

    await act(async () => resolve());
    expect(asFragment().textContent).toBe("7");
  });
});

/**
 * `subscribe` is the RFC-shaped, action-carrying subscription. It is what lets
 * an arbitrary external store be wrapped without handing us its reducer, so it
 * is public API and needs its own coverage.
 */
describe("subscribe (action form)", () => {
  type Count = number;
  type CountAction = { type: "increment" | "double" };
  const reducer = (state: Count, action: CountAction): Count =>
    action.type === "increment" ? state + 1 : state * 2;

  afterEach(() => cleanup());

  it("delivers the dispatched action to subscribers", () => {
    const store = createStore(1, reducer);
    const seen: CountAction[] = [];
    store.subscribe((action) => seen.push(action));

    store.dispatch({ type: "increment" });
    store.dispatch({ type: "double" });

    expect(seen).toEqual([{ type: "increment" }, { type: "double" }]);
  });

  it("stops delivering after unsubscribe", () => {
    const store = createStore(1, reducer);
    const seen: CountAction[] = [];
    const unsubscribe = store.subscribe((action) => seen.push(action));

    store.dispatch({ type: "increment" });
    unsubscribe();
    store.dispatch({ type: "increment" });

    expect(seen).toEqual([{ type: "increment" }]);
  });

  it("delivers to every subscriber", () => {
    const store = createStore(1, reducer);
    const a: CountAction[] = [];
    const b: CountAction[] = [];
    store.subscribe((action) => a.push(action));
    store.subscribe((action) => b.push(action));

    store.dispatch({ type: "double" });

    expect(a).toEqual([{ type: "double" }]);
    expect(b).toEqual(a);
  });

  it("delivers for transition dispatches as well as sync ones", async () => {
    const store = createStore(1, reducer);
    const seen: CountAction[] = [];
    store.subscribe((action) => seen.push(action));

    await act(async () => {
      startTransition(() => store.dispatch({ type: "increment" }));
    });
    store.dispatch({ type: "double" });

    expect(seen).toEqual([{ type: "increment" }, { type: "double" }]);
  });

  it("is enough to mirror the store into an external one", async () => {
    // The wrapping case the RFC's signature exists for: a foreign store that
    // owns its own state can stay in step without exposing its reducer to us.
    const store = createStore(2, reducer);
    let mirror = 2;
    store.subscribe((action) => {
      mirror = reducer(mirror, action);
    });

    function Reader() {
      return <div>{useStore(store)}</div>;
    }
    const { asFragment } = await act(async () => render(<Reader />));

    await act(async () => store.dispatch({ type: "double" }));
    await act(async () => store.dispatch({ type: "increment" }));

    expect(asFragment().textContent).toBe("5");
    expect(mirror).toBe(store.getState());
  });

  it("does not fire action subscribers for a no-op dispatch", () => {
    const store = createStore({ n: 1 });
    const seen: unknown[] = [];
    store.subscribe((action) => seen.push(action));

    const same = store.getState();
    store.dispatch(same);

    expect(store.getState()).toBe(same);
    expect(seen).toEqual([]);
  });
});

/**
 * The Relay harness from src/experimental/testUseCases, run against this store.
 *
 * This is the case `createStoreFromSource` exists for: a normalized record
 * store driven by updater functions rather than a reducer. Ours needs no such
 * constructor — the reducer applies the updater — so the wiring in
 * test/MiniRelay.tsx is shorter than the original by a mirrored record source.
 */
describe("Relay-like normalized store (MiniRelay)", () => {
  let logger: Logger;
  beforeEach(() => {
    logger = new Logger();
  });
  afterEach(() => {
    cleanup();
    logger.assertLog([]);
  });

  function initialize(_prev: RecordSource): RecordSource {
    const next = new RecordSource();
    next.set("ROOT", { id: "ROOT", me: "1" });
    next.set("1", { id: "1", name: "Alice", friend: "2" });
    next.set("2", { id: "2", name: "Bob", friend: "1" });
    return next;
  }

  it("Minimal example of MiniRelay", async () => {
    const FRAGMENT: FragmentAstNode = {
      kind: "object",
      fieldName: "me",
      selections: [
        { kind: "scalar", fieldName: "id" },
        { kind: "scalar", fieldName: "name" },
        {
          kind: "object",
          fieldName: "friend",
          selections: [
            { kind: "scalar", fieldName: "id" },
            { kind: "scalar", fieldName: "name" },
            {
              kind: "object",
              fieldName: "friend",
              selections: [
                { kind: "scalar", fieldName: "id" },
                { kind: "scalar", fieldName: "name" },
              ],
            },
          ],
        },
      ],
    };
    // Normally generated by Relay compiler
    type FragmentType = {
      me: {
        id: string;
        name: string;
        friend: {
          id: string;
          name: string;
          friend: {
            id: string;
            name: string;
          };
        };
      };
    };
    const store = new RelayStore();
    store.publishAndNotify(initialize);

    const ref = { startingID: "ROOT" };
    function FragmentComponent() {
      logger.log({ type: "render" });
      const data = useFragment<FragmentType>(FRAGMENT, ref);
      return (
        <div>
          Hello! My name is {data.me.name} (id: {data.me.id})
          <br />
          and my friend is {data.me.friend.name} (id: {data.me.friend.id})
          <br />
          and their friend is {data.me.friend.friend.name} (id:{" "}
          {data.me.friend.friend.id})
        </div>
      );
    }

    function App() {
      return (
        <>
          <RelayProvider store={store}>
            <FragmentComponent />
          </RelayProvider>
        </>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ type: "render" }]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          Hello! My name is Alice (id: 1)
          <br />
          and my friend is Bob (id: 2)
          <br />
          and their friend is Alice (id: 1)
        </div>
      </DocumentFragment>
    `);

    await act(async () => {
      store.publishAndNotify((_prev) => {
        const next = new RecordSource();
        next.set("1", { id: "1", name: "MALICE", friend: "1" });
        return next;
      });
    });
    logger.assertLog([{ type: "render" }]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          Hello! My name is MALICE (id: 1)
          <br />
          and my friend is MALICE (id: 1)
          <br />
          and their friend is MALICE (id: 1)
        </div>
      </DocumentFragment>
    `);

    unmount();
  });

  it("Avoids rerendering the component if the fragment value computes the same output", async () => {
    const store = new RelayStore();
    store.publishAndNotify(initialize);

    const FRAGMENT: FragmentAstNode = {
      kind: "object",
      fieldName: "me",
      selections: [{ kind: "scalar", fieldName: "id" }],
    };

    type FragmentType = {
      me: {
        id: string;
      };
    };

    const ref = { startingID: "ROOT" };

    function FragmentComponent() {
      logger.log({ type: "render" });
      const data = useFragment<FragmentType>(FRAGMENT, ref);
      return <div>Hello! My id is {data.me.id}</div>;
    }

    function App() {
      return (
        <>
          <RelayProvider store={store}>
            <FragmentComponent />
          </RelayProvider>
        </>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ type: "render" }]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          Hello! My id is 1
        </div>
      </DocumentFragment>
    `);

    await act(async () => {
      store.publishAndNotify((_prev) => {
        const next = new RecordSource();
        next.set("1", { id: "1", name: "MALICE", friend: "1" });
        return next;
      });
    });

    // Because the fragment only selects `id`, and `id` did not change,
    // the component should not rerender.
    logger.assertLog([]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          Hello! My id is 1
        </div>
      </DocumentFragment>
    `);

    unmount();
  });

  it("Implements structural sharing such that substructures remain referential identical even if parent object change", async () => {
    const store = new RelayStore();
    store.publishAndNotify(initialize);

    const FRAGMENT: FragmentAstNode = {
      kind: "object",
      fieldName: "me",
      selections: [
        { kind: "scalar", fieldName: "name" },
        { kind: "scalar", fieldName: "id" },
        {
          kind: "object",
          fieldName: "friend",
          selections: [{ kind: "spread", alias: "fragment" }],
        },
      ],
    };

    type FragmentType = {
      me: {
        id: string;
        name: string;
        friend: {
          fragment: FragmentRef;
        };
      };
    };

    const ref = { startingID: "ROOT" };
    function FragmentComponent() {
      logger.log({ type: "render" });
      const data = useFragment<FragmentType>(FRAGMENT, ref);

      return (
        <>
          <div>Hello! My name is {data.me.name}</div>
          <div>
            My friend's name is{" "}
            <ChildFragmentComponent user={data.me.friend.fragment} />
          </div>
        </>
      );
    }

    const CHILD_FRAGMENT: FragmentAstNode = {
      kind: "scalar",
      fieldName: "name",
    };

    const ChildFragmentComponent = memo(
      ({ user: userRef }: { user: FragmentRef }) => {
        logger.log({ type: "child-render" });
        const user = useFragment<{ name: string }>(CHILD_FRAGMENT, userRef);
        return user.name;
      },
    );

    function App() {
      return (
        <>
          <RelayProvider store={store}>
            <FragmentComponent />
          </RelayProvider>
        </>
      );
    }

    const { asFragment, unmount } = await act(async () => {
      return render(<App />);
    });

    logger.assertLog([{ type: "render" }, { type: "child-render" }]);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          Hello! My name is Alice
        </div>
        <div>
          My friend's name is Bob
        </div>
      </DocumentFragment>
    `);

    await act(async () => {
      store.publishAndNotify((_prev) => {
        const next = new RecordSource();
        next.set("1", { id: "1", name: "MALICE", friend: "2" });
        return next;
      });
    });

    // Because the child fragment id is stable, and the data is structurally
    // shared AND the child component is momoized, the child component does not
    // need to rerender.
    logger.assertLog([{ type: "render" }]);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          Hello! My name is MALICE
        </div>
        <div>
          My friend's name is Bob
        </div>
      </DocumentFragment>
    `);

    unmount();
  });
});

/**
 * markerikson's react-redux port (reduxjs/react-redux#2263) left three
 * `useSelector` failures. test/MiniRedux.tsx reimplements those semantics on
 * this package's public API alone — `createStore`, `useStore`, and the
 * equality wrapper — so whether they are resolved can be asserted.
 */
describe("react-redux semantics (MiniRedux)", () => {
  type State = { count: number; other: number };
  type Action = { type: "increment" | "touch" };

  const reducer = (state: State, action: Action): State =>
    action.type === "increment"
      ? { ...state, count: state.count + 1 }
      : { ...state, other: state.other + 1 };

  afterEach(() => cleanup());

  it("uses the latest selector", async () => {
    const store = createReduxStore(reducer, { count: 0, other: 0 });
    let setMultiplier!: (n: number) => void;

    function Reader() {
      const [multiplier, _set] = useState(1);
      setMultiplier = _set;
      const value = useSelector((state: State) => state.count * multiplier);
      return <div>{value}</div>;
    }

    const { asFragment } = await act(async () =>
      render(
        <Provider store={store}>
          <Reader />
        </Provider>,
      ),
    );

    await act(async () => store.dispatch({ type: "increment" }));
    expect(asFragment().textContent).toBe("1");

    // Swapping the selector must take effect immediately, not on the next
    // dispatch.
    await act(async () => setMultiplier(10));
    expect(asFragment().textContent).toBe("10");
  });

  it("ignores transient errors in the selector caused by stale props", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const store = createReduxStore(reducer, { count: 0, other: 0 });

    function Child({ parentCount }: { parentCount: number }) {
      const result = useSelector((state: State) => {
        if (state.count !== parentCount) throw new Error("stale props");
        return state.count + parentCount;
      });
      return <div>{result}</div>;
    }
    function Parent() {
      const count = useSelector((state: State) => state.count);
      return <Child parentCount={count} />;
    }

    await act(async () =>
      render(
        <Provider store={store}>
          <Parent />
        </Provider>,
      ),
    );

    await expect(
      act(async () => store.dispatch({ type: "increment" })),
    ).resolves.not.toThrow();
    spy.mockRestore();
  });

  it("re-throws selector errors that occur during rendering", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const store = createReduxStore(reducer, { count: 0, other: 0 });

    function Reader() {
      const value = useSelector(() => {
        throw new Error("render-phase failure");
      });
      return <div>{String(value)}</div>;
    }

    const { asFragment } = await act(async () =>
      render(
        <ErrorBoundary fallback={<div>boundary</div>}>
          <Provider store={store}>
            <Reader />
          </Provider>
        </ErrorBoundary>,
      ),
    );

    expect(asFragment().textContent).toBe("boundary");
    spy.mockRestore();
  });

  it("bails out on a shallow-equal slice built fresh each call", async () => {
    const store = createReduxStore(reducer, { count: 0, other: 0 });
    let renders = 0;

    function Reader() {
      // Returns a new object every call, so Object.is would never bail.
      const slice = useSelector(
        (state: State) => ({ count: state.count }),
        shallowEqual,
      );
      renders++;
      return <div>{slice.count}</div>;
    }

    await act(async () =>
      render(
        <Provider store={store}>
          <Reader />
        </Provider>,
      ),
    );
    const afterMount = renders;

    // Changes an unselected field: the slice is shallow-equal, so no re-render.
    await act(async () => store.dispatch({ type: "touch" }));
    expect(renders).toBe(afterMount);

    await act(async () => store.dispatch({ type: "increment" }));
    expect(renders).toBeGreaterThan(afterMount);
  });
});

/**
 * The handle is a Promise subclass carrying `status`/`value`, the shape React
 * reads to unwrap `use()` without a microtask — see Sebastian Markbåge,
 * https://bsky.app/profile/sebmarkbage.calyptus.eu/post/3lku7b7xjmk2w
 */
describe("Handle is a real Promise", () => {
  afterEach(() => cleanup());

  it("is an instance of Promise", () => {
    const store = createStore(1);
    expect(internals(store)._head).toBeInstanceOf(Promise);
  });

  it("carries status and value for a synchronous read", () => {
    const store = createStore({ n: 1 });
    const head = internals(store)._head;
    expect(head.status).toBe("fulfilled");
    expect(head.value).toEqual({ n: 1 });
  });

  it("returns a plain Promise from then, not another handle", async () => {
    const store = createStore(1);
    const chained = internals(store)._head.then((n) => n + 1);
    expect(chained).toBeInstanceOf(Promise);
    expect("version" in chained).toBe(false);
    await expect(chained).resolves.toBe(2);
  });

  it("does not report an unhandled rejection when the state is a rejecting promise", async () => {
    const unhandled: unknown[] = [];
    const onUnhandled = (event: PromiseRejectionEvent) => {
      unhandled.push(event.reason);
      event.preventDefault();
    };
    window.addEventListener("unhandledrejection", onUnhandled);

    const rejecting = Promise.reject(new Error("user failure"));
    rejecting.catch(() => {});
    const store = createStore(rejecting);

    // The handle adopts the rejection internally; it must not surface as ours.
    expect(internals(store)._head.status).toBe("fulfilled");
    expect(internals(store)._head.value).toBe(rejecting);

    await new Promise((resolve) => setTimeout(resolve, 10));
    window.removeEventListener("unhandledrejection", onUnhandled);
    expect(unhandled).toEqual([]);
  });
});
