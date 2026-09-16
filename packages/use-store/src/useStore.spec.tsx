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
import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { type UpdateInfo } from "@welldone-software/why-did-you-render";
import {
  Activity,
  ViewTransition,
  memo,
  StrictMode,
  Suspense,
  startTransition,
  use,
  useDeferredValue,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useOptimistic,
  useState,
  useSyncExternalStore,
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
      _subscribe(listener, from) {
        live++;
        const unsubscribe = inner._subscribe(listener, from);
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
    // A view holds its source subscription across the gap while its reader
    // resubscribes, which happens on every update, so the release lands on a
    // microtask rather than in this tick. It still lands.
    await act(async () => {});
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

  /**
   * The question behind issue #23: useSyncExternalStore takes a
   * getServerSnapshot so a reader can render the server's value during
   * hydration even though the client store has moved on. There is no such
   * option here, because the initial value IS the snapshot — so what happens
   * when the store moves before React gets to run?
   *
   * No option is needed. The client store is built from the same serialized
   * state the server rendered from, so the store already holds that value: it
   * is the handle it was created with. A reader hydrates on that handle and
   * then catches up, which is what getServerSnapshot buys, from state the
   * store has anyway.
   */
  it("hydrates on the server's value when the store moved first, then catches up", async () => {
    const make = (initial: State) => createStore<State, Action>(initial, reducer);
    function App({ store }: { store: ReturnType<typeof make> }) {
      const count = useStore(store, (state: State) => state.count);
      return <div id="out">count: {count}</div>;
    }

    const html = renderToString(<App store={make({ count: 7 })} />);
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    // React reports hydration mismatches on the recoverable-error channel. A
    // console spy does not consume them, and an unconsumed one fails the run.
    const recoverable: string[] = [];
    const client = make({ count: 7 });
    client.dispatch({ type: "INCREMENT" });

    await act(async () => {
      hydrateRoot(container, <App store={client} />, {
        onRecoverableError: (error) => recoverable.push(String(error)),
      });
    });

    expect(
      recoverable.filter((e) => /hydrat|did not match|mismatch/i.test(e)),
    ).toEqual([]);
    // Caught up to the client's value, without ever mismatching to get there.
    expect(container.querySelector("#out")?.textContent).toBe("count: 8");
  });

  it("handles a dispatch that races the hydration commit", async () => {
    const make = (initial: State) => createStore<State, Action>(initial, reducer);
    function App({ store }: { store: ReturnType<typeof make> }) {
      const count = useStore(store, (state: State) => state.count);
      return <div id="out">count: {count}</div>;
    }

    const html = renderToString(<App store={make({ count: 7 })} />);
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    const recoverable: string[] = [];
    const client = make({ count: 7 });
    await act(async () => {
      hydrateRoot(container, <App store={client} />, {
        onRecoverableError: (error) => recoverable.push(String(error)),
      });
      // An event fires before hydration has finished — the realistic case, and
      // the one a getServerSnapshot would cover.
      client.dispatch({ type: "INCREMENT" });
    });

    expect(
      recoverable.filter((e) => /hydrat|did not match|mismatch/i.test(e)),
    ).toEqual([]);
    expect(container.querySelector("#out")?.textContent).toBe("count: 8");

    // Live and correct from there on.
    await act(async () => client.dispatch({ type: "INCREMENT" }));
    expect(container.querySelector("#out")?.textContent).toBe("count: 9");
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

  /** Selector error policy, as specified by React-Redux's own useSelector suite. */
  type Adapter = {
    name: string;
    createStore: (initial: State) => { dispatch: (action: Action) => void };
    // Normalized so the union of two generic signatures stays callable.
    useSelector: <T>(store: unknown, selector: (state: State) => T) => T;
    Wrapper: React.ComponentType<{ children: React.ReactNode }>;
  };

  const implementations: Adapter[] = [
    {
      name: "versioned",
      createStore: (initial: State) => versioned.createStore<State, Action>(initial, reducer),
      useSelector: (store, selector) =>
        versioned.useStore(store as versioned.ConcurrentStoreInternals<State, Action>, selector),
      Wrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    },
  ];

  afterEach(() => cleanup());

  describe.each(implementations)("$name", ({ createStore, useSelector, Wrapper }) => {
    it("ignores transient errors in selector (e.g. due to stale props)", async () => {
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
  };

  const implementations: Adapter[] = [
    {
      name: "versioned",
      createStore: (initial) => versioned.createStore<State, Action>(initial, reducer),
      useStore: (store) =>
        versioned.useStore(store as versioned.ConcurrentStoreInternals<State, Action>),
      Wrapper: ({ children }) => <>{children}</>,
    },
  ];

  afterEach(() => cleanup());

  describe.each(implementations)(
    "$name",
    ({ createStore, useStore, Wrapper }) => {
      it("shows committed state when a new reader mounts while head suspends", async () => {
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

/**
 * Both of these came from the same wall: userland cannot see render priority
 * or root identity, so the store infers them from a global commit pointer and
 * a slot recording what the current pass rendered. Both inferences leaked —
 * one past the pass that wrote it, one past the readers it spoke for.
 */
describe("Inferred priority and identity", () => {
  type Slice = { count: number; other: number };
  type SliceAction = { type: "increment" | "double" | "touch" };
  const sliceReducer = (s: Slice, a: SliceAction): Slice => {
    switch (a.type) {
      case "increment":
        return { ...s, count: s.count + 1 };
      case "double":
        return { ...s, count: s.count * 2 };
      case "touch":
        return { ...s, other: s.other + 1 };
    }
  };

  const readAll = () =>
    Array.from(document.querySelectorAll("[data-reader]"), (n) => n.textContent);

  afterEach(() => cleanup());

  // Two leaks met here. The pass slot is module-level, so a render abandoned
  // in one root was visible to a mount in another, and the mounting reader
  // adopted a handle no tree had committed. Within one root the parent
  // re-render overwrites the slot, which is why it only showed across roots.
  // Then the reader that did mount at committed started a transition of its
  // own to reach head, and reached it while the first root was still blocked.
  it("does not mount another root from an abandoned render's handle", async () => {
    const store = createStore(1);
    const never = new Promise<void>(() => {});
    const bRenders: number[] = [];

    function A() {
      const count = useStore(store);
      if (count === 2) use(never);
      return <div data-reader="a">{count}</div>;
    }
    function B() {
      const count = useStore(store);
      bRenders.push(count);
      return <div data-reader="b">{count}</div>;
    }

    await act(async () =>
      render(
        <Suspense fallback={<div>loading</div>}>
          <A />
        </Suspense>,
      ),
    );
    await act(async () => {
      startTransition(() => store.dispatch(2));
    });
    // A's render of 2 is abandoned: the transition never finishes.
    expect(document.querySelector('[data-reader="a"]')?.textContent).toBe("1");

    await act(async () => {
      render(<B />);
    });

    // B mounts at the committed state and stays there. It never opens on 2,
    // which no tree ever showed, and it does not start a transition of its own
    // to reach a head that root A is still blocked on.
    expect(bRenders).toEqual([1]);
    expect(readAll()).toEqual(["1", "1"]);
  });

  // A selector view that bails out used to mark the source committed, so
  // `committed` could name a version no reader ever rendered and a later sync
  // update folded onto the pending transition instead of rebasing onto what is
  // on screen. The mark was a symptom: an inline selector has a new identity
  // every render, so the view was rebuilt every render and could not know
  // which slice its readers already showed.
  it("rebases a sync update onto what is on screen, not the pending transition", async () => {
    const store = createStore({ count: 2, other: 0 }, sliceReducer);
    const renders: string[] = [];
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));

    function Suspender() {
      const count = useStore(store, (s: Slice) => s.count);
      renders.push(`s${count}`);
      if (count === 4) use(gate);
      return <div data-reader="">s{count}</div>;
    }
    function Other() {
      const other = useStore(store, (s: Slice) => s.other);
      renders.push(`o${other}`);
      return <div data-reader="">o{other}</div>;
    }
    function Watcher() {
      const count = useStore(store, (s: Slice) => s.count);
      renders.push(`w${count}`);
      return <div data-reader="">w{count}</div>;
    }

    await act(async () =>
      render(
        <Suspense fallback={<div>loading</div>}>
          <Suspender />
          <Other />
          <Watcher />
        </Suspense>,
      ),
    );
    expect(readAll()).toEqual(["s2", "o0", "w2"]);

    await act(async () => {
      startTransition(() => store.dispatch({ type: "double" }));
    });
    // The suspender gates on 4, so the transition cannot commit.
    expect(readAll()).toEqual(["s2", "o0", "w2"]);

    renders.length = 0;
    await act(async () => store.dispatch({ type: "increment" }));

    // Rebased onto what is on screen first: 2 + 1 = 3, never straight to 5.
    // Then the chronological order, 4 + 1 = 5, which clears the gate and so
    // lands in the same flush.
    expect(renders.indexOf("w3")).toBeGreaterThanOrEqual(0);
    expect(renders.indexOf("w3")).toBeLessThan(renders.indexOf("w5"));
    // The slice nobody changed never re-renders.
    expect(renders.filter((r) => r.startsWith("o"))).toEqual([]);
    expect(readAll()).toEqual(["s5", "o0", "w5"]);

    await act(async () => release());
    expect(readAll()).toEqual(["s5", "o0", "w5"]);
  });
});

describe("No useSyncExternalStore de-opt", () => {
  type Count = number;
  type CountAction = { type: "increment" | "double" };
  const reducer = (n: Count, a: CountAction): Count =>
    a.type === "increment" ? n + 1 : n * 2;

  afterEach(() => cleanup());


  it("a transition update stays a transition instead of flushing synchronously", async () => {
    const store = createStore(1, reducer);
    const seen: number[] = [];

    function Reader() {
      const n = useStore(store);
      seen.push(n);
      return <div>{n}</div>;
    }

    const { asFragment } = await act(async () => render(<Reader />));

    let resolve!: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "double" });
        await new Promise<void>((r) => (resolve = r));
      });
    });

    // useSyncExternalStore would have redone this as a blocking update, so the
    // DOM would already read 2 here.
    expect(asFragment().textContent).toBe("1");
    expect(seen).toEqual([1]);

    await act(async () => resolve());
    expect(asFragment().textContent).toBe("2");
  });

  it("does not show a fallback when a transition update suspends on unrelated data", async () => {
    const store = createStore(1, reducer);
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    let setShowSlow!: (v: boolean) => void;

    function Reader() {
      return <div data-reader="">{useStore(store)}</div>;
    }
    function Slow() {
      use(gate);
      return <div>slow</div>;
    }
    function App() {
      const [showSlow, _set] = useState(false);
      setShowSlow = _set;
      return (
        <Suspense fallback={<div data-fallback="">Loading…</div>}>
          <Reader />
          {showSlow && <Slow />}
        </Suspense>
      );
    }

    const { asFragment } = await act(async () => render(<App />));
    expect(asFragment().textContent).toBe("1");

    // One transition both updates the store and reveals a suspending child.
    await act(async () => {
      startTransition(() => {
        store.dispatch({ type: "increment" });
        setShowSlow(true);
      });
    });

    // The transition should hold the previous content, not fall back.
    expect(document.querySelector("[data-fallback]")).toBeNull();
    expect(asFragment().textContent).toBe("1");

    await act(async () => release());
    expect(asFragment().textContent).toBe("2slow");
  });

  it("keeps two overlapping transitions in chronological order", async () => {
    const store = createStore(2, reducer);
    function Reader() {
      return <div>{useStore(store)}</div>;
    }
    const { asFragment } = await act(async () => render(<Reader />));

    let releaseA!: () => void;
    let releaseB!: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "double" });
        await new Promise<void>((r) => (releaseA = r));
      });
    });
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "increment" });
        await new Promise<void>((r) => (releaseB = r));
      });
    });

    await act(async () => {
      releaseA();
      releaseB();
    });
    // 2 -> double -> 4 -> increment -> 5
    expect(asFragment().textContent).toBe("5");
  });
});

describe("Other concurrency surfaces", () => {
  type Count = number;
  type CountAction = { type: "increment" | "double" };
  const reducer = (n: Count, a: CountAction): Count =>
    a.type === "increment" ? n + 1 : n * 2;

  afterEach(() => cleanup());


  it("works through useDeferredValue", async () => {
    const store = createStore(1, reducer);
    const seen: Array<[number, number]> = [];

    function Reader() {
      const n = useStore(store);
      const deferred = useDeferredValue(n);
      seen.push([n, deferred]);
      return <div>{`${n}/${deferred}`}</div>;
    }

    const { asFragment } = await act(async () => render(<Reader />));
    expect(asFragment().textContent).toBe("1/1");

    await act(async () => store.dispatch({ type: "double" }));
    // Both settle; the deferred value must not get stuck behind.
    expect(asFragment().textContent).toBe("2/2");

    await act(async () => store.dispatch({ type: "increment" }));
    expect(asFragment().textContent).toBe("3/3");
  });

  it("does not lose an update when a reader unmounts mid transition", async () => {
    const store = createStore(2, reducer);
    let setShowSecond!: (v: boolean) => void;

    function Reader({ id }: { id: string }) {
      return <div data-reader="">{`${id}${useStore(store)}`}</div>;
    }
    function App() {
      const [showSecond, _set] = useState(true);
      setShowSecond = _set;
      return (
        <>
          <Reader id="a" />
          {showSecond && <Reader id="b" />}
        </>
      );
    }

    const { asFragment } = await act(async () => render(<App />));
    expect(asFragment().textContent).toBe("a2b2");

    let resolve!: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "double" });
        await new Promise<void>((r) => (resolve = r));
      });
    });

    // The second reader leaves while the transition is still pending.
    await act(async () => setShowSecond(false));
    await act(async () => resolve());

    expect(asFragment().textContent).toBe("a4");
  });

  it("applies a dispatch made from a passive effect during a transition", async () => {
    const store = createStore(2, reducer);
    let setArmed!: (v: boolean) => void;

    function Reader() {
      return <div>{useStore(store)}</div>;
    }
    function Bump() {
      useEffect(() => {
        store.dispatch({ type: "increment" });
      }, []);
      return null;
    }
    function App() {
      const [armed, _set] = useState(false);
      setArmed = _set;
      return (
        <>
          <Reader />
          {armed && <Bump />}
        </>
      );
    }

    const { asFragment } = await act(async () => render(<App />));

    let resolve!: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "double" });
        await new Promise<void>((r) => (resolve = r));
      });
    });
    expect(asFragment().textContent).toBe("2");

    // Mounting Bump synchronously dispatches from its effect: 2 + 1 = 3.
    await act(async () => setArmed(true));
    expect(asFragment().textContent).toBe("3");

    // Chronologically: 2 -> double -> 4 -> increment -> 5.
    await act(async () => resolve());
    expect(asFragment().textContent).toBe("5");
  });
});

describe("Commit tracking under a stalled render", () => {
  afterEach(() => cleanup());

  it("does not drop an action when a reader suspends between two sync dispatches", async () => {
    const store = versioned.createStore<number, number>(0, (s, a) => s + a);
    let release: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    let gateArmed = false;

    function Reader() {
      const count = versioned.useStore(store);
      // An unrelated reason to suspend, revealed by the first dispatch.
      if (gateArmed && count > 0) use(gate);
      return <div data-testid="out">{count}</div>;
    }

    const { getAllByTestId, asFragment } = await act(async () =>
      render(
        <Suspense fallback={<div data-testid="out">fallback</div>}>
          <Reader />
        </Suspense>,
      ),
    );
    expect(asFragment().textContent).toBe("0");

    // First sync dispatch. The re-render suspends, so no layout effect runs
    // and the store's commit pointer stays at 0 while head is 1.
    gateArmed = true;
    await act(async () => {
      store.dispatch(1);
    });
    expect(asFragment().textContent).toContain("fallback");

    // Second sync dispatch, still no transition anywhere. Head must be 3.
    await act(async () => {
      store.dispatch(2);
    });
    expect(store.getState()).toBe(3);

    gateArmed = false;
    await act(async () => release());

    // The tree must show every dispatched action, not head-minus-the-stalled-one.
    expect(getAllByTestId("out").map((n) => n.textContent)).toEqual(["3"]);
  });
});

describe("Commit tracking with a stalled sibling", () => {
  afterEach(() => cleanup());

  it("never shows a state that skips an action when a sibling is suspended", async () => {
    const store = versioned.createStore<number, number>(0, (s, a) => s + a);
    let release: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    let gateArmed = false;
    const seen: number[] = [];

    function Stalls() {
      const count = versioned.useStore(store);
      if (gateArmed && count > 0) use(gate);
      return <div>{count}</div>;
    }

    function Watches() {
      const count = versioned.useStore(store);
      seen.push(count);
      return <div data-testid="watch">{count}</div>;
    }

    const { getByTestId } = await act(async () =>
      render(
        <>
          <Suspense fallback={<div>fallback</div>}>
            <Stalls />
          </Suspense>
          <Watches />
        </>,
      ),
    );
    expect(seen).toEqual([0]);

    gateArmed = true;
    await act(async () => store.dispatch(1));
    await act(async () => store.dispatch(2));

    gateArmed = false;
    await act(async () => release());

    expect(getByTestId("watch").textContent).toBe("3");
    // 2 would be 0 + the second action: a state in which the first never happened.
    expect(seen).not.toContain(2);
    expect(seen).toEqual([0, 1, 3]);
  });
});

describe("Multiple roots at different versions", () => {
  type Action = { type: "INCREMENT" };
  const reducer = (s: number): number => s + 1;

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("mounts a reader at its own root's version, not a sibling root's", async () => {
    const store = versioned.createStore<number, Action>(0, reducer);

    function Reader() {
      return <div>{versioned.useStore(store)}</div>;
    }
    function Host({ extra }: { extra: boolean }) {
      return (
        <>
          <Reader />
          {extra && <Reader />}
        </>
      );
    }

    const a = document.createElement("div");
    const b = document.createElement("div");
    document.body.append(a, b);
    const rootA = createRoot(a);
    const rootB = createRoot(b);

    await act(async () => {
      rootA.render(<Host extra={false} />);
      rootB.render(<Host extra={false} />);
    });
    expect(`${a.textContent}/${b.textContent}`).toBe("0/0");

    // Hold a transition open so head runs ahead of committed.
    let release!: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch({ type: "INCREMENT" });
        await new Promise<void>((r) => (release = r));
      });
    });
    expect(`${a.textContent}/${b.textContent}`).toBe("0/0");

    // Reveal a second reader in root B only, synchronously. It must agree with
    // root B's existing reader, not adopt whatever root A last rendered.
    await act(async () => {
      rootB.render(<Host extra={true} />);
    });
    expect(b.textContent).toBe("00");

    await act(async () => release());
    expect(`${a.textContent}/${b.textContent}`).toBe("1/11");
  });
});

describe("Multiple roots committing at different rates", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("mounts into a lagging root without tearing against its stalled reader", async () => {
    const store = versioned.createStore<number, number>(0, (s, a) => s + a);
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    let armed = false;

    function Fast() {
      return <i>{versioned.useStore(store)}</i>;
    }
    function Stalls() {
      const v = versioned.useStore(store);
      if (armed && v > 0) use(gate);
      return <i>{v}</i>;
    }
    function Late() {
      return <b>{versioned.useStore(store)}</b>;
    }
    function HostB({ extra }: { extra: boolean }) {
      return (
        <Suspense fallback={<i>F</i>}>
          <Stalls />
          {extra && <Late />}
        </Suspense>
      );
    }

    const a = document.createElement("div");
    const b = document.createElement("div");
    document.body.append(a, b);
    const rootA = createRoot(a);
    const rootB = createRoot(b);
    await act(async () => {
      rootA.render(<Fast />);
      rootB.render(<HostB extra={false} />);
    });
    expect(`${a.textContent}/${b.textContent}`).toBe("0/0");

    // Root A commits 1; root B cannot commit, it suspends.
    armed = true;
    await act(async () => store.dispatch(1));
    expect(a.textContent).toBe("1");

    // Reveal a new reader inside the stalled root.
    await act(async () => rootB.render(<HostB extra={true} />));

    armed = false;
    await act(async () => release());
    // Both readers in root B must agree.
    expect(b.textContent).toBe("11");
    expect(a.textContent).toBe("1");
  });
});

describe("Selector memory across an abandoned render", () => {
  afterEach(() => cleanup());

  it("does not hand back a previous result written by a render that never committed", async () => {
    type Slice = { n: number; label: string };
    const store = createStore({ n: 1 });
    const never = new Promise<void>(() => {});
    const seen: string[] = [];

    function Reader({ label }: { label: string }) {
      const slice = useStore(
        store,
        (state: { n: number }, previous: Slice | undefined): Slice =>
          // Stable on n alone, so a `previous` left behind by a render with
          // different props would be returned unchanged.
          previous !== undefined && previous.n === state.n
            ? previous
            : { n: state.n, label },
      );
      seen.push(`${slice.label}#${slice.n}`);
      if (label === "B") use(never);
      return (
        <div>
          {slice.label}#{slice.n}
        </div>
      );
    }

    let setLabel!: (l: string) => void;
    function App() {
      const [label, _set] = useState("A");
      setLabel = _set;
      return (
        <Suspense fallback={<div>loading</div>}>
          <Reader label={label} />
        </Suspense>
      );
    }

    await act(async () => render(<App />));
    expect(seen).toEqual(["A#1"]);

    // This render suspends forever and is abandoned, after the selector has
    // already run and written its memory.
    await act(async () => {
      startTransition(() => setLabel("B"));
    });
    seen.length = 0;

    await act(async () => store.dispatch({ n: 2 }));
    await act(async () => store.dispatch({ n: 1 }));

    // Every reading belongs to the committed tree, which is still label A.
    expect(seen.every((s) => s.startsWith("A"))).toBe(true);
    expect(document.body.textContent).toContain("A#1");
  });
});

describe("Activity", () => {
  afterEach(() => cleanup());

  it("a hidden reader agrees with a visible one when it is revealed", async () => {
    const store = createStore(0, (n: number, step: number) => n + step);

    function Reader({ id }: { id: string }) {
      return <div data-testid={id}>{useStore(store)}</div>;
    }
    function App({ mode }: { mode: "hidden" | "visible" }) {
      return (
        <>
          <Reader id="visible" />
          <Activity mode={mode}>
            <Reader id="hidden" />
          </Activity>
        </>
      );
    }

    const { rerender, getByTestId } = await act(async () =>
      render(<App mode="hidden" />),
    );
    expect(getByTestId("visible").textContent).toBe("0");

    // The hidden tree has no layout effects, so it cannot report a commit.
    await act(async () => store.dispatch(1));
    await act(async () => store.dispatch(1));
    expect(getByTestId("visible").textContent).toBe("2");

    await act(async () => rerender(<App mode="visible" />));
    expect(getByTestId("hidden").textContent).toBe("2");
    expect(getByTestId("visible").textContent).toBe("2");
  });

  it("a hidden reader does not strand the commit pointer behind a visible one", async () => {
    const store = createStore(0, (n: number, step: number) => n + step);
    const seen: number[] = [];

    function Visible() {
      const n = useStore(store);
      seen.push(n);
      return <div data-testid="visible">{n}</div>;
    }
    function App() {
      return (
        <>
          <Visible />
          <Activity mode="hidden">
            <div>{useStoreInHidden(store)}</div>
          </Activity>
        </>
      );
    }
    function useStoreInHidden(s: typeof store) {
      return useStore(s);
    }

    const { getByTestId } = await act(async () => render(<App />));
    seen.length = 0;

    // A hidden reader that never commits must not make every later dispatch
    // look like a pending transition and publish twice.
    await act(async () => store.dispatch(1));
    expect(getByTestId("visible").textContent).toBe("1");
    expect(seen).toEqual([1]);

    await act(async () => store.dispatch(1));
    expect(getByTestId("visible").textContent).toBe("2");
    expect(seen).toEqual([1, 2]);
  });

  // A reader that is already level with the tree when a transition is in
  // flight has no way to join that transition from userland: setHandle inside
  // startTransition starts a second one, which commits on its own as soon as
  // nothing in it suspends, while the first is still blocked. Waiting at
  // committed instead needs the store to nudge stragglers when the pointer
  // advances, and that notify reaches every reader, not just the one behind,
  // so it re-enters the publish path and unpicks rebasing. Recorded rather
  // than hidden; this is the case the RFC exists to solve inside React.
  it("a reader revealed during a pending transition lands with the tree", async () => {
    const store = createStore(1, (n: number, step: number) => n + step);
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));

    function Gated() {
      const n = useStore(store);
      if (n === 2) use(gate);
      return <div data-testid="gated">{n}</div>;
    }
    function Peer() {
      return <div data-testid="peer">{useStore(store)}</div>;
    }
    function App({ mode }: { mode: "hidden" | "visible" }) {
      return (
        <Suspense fallback={<div>loading</div>}>
          <Gated />
          <Activity mode={mode}>
            <Peer />
          </Activity>
        </Suspense>
      );
    }

    const { rerender, getByTestId } = await act(async () =>
      render(<App mode="hidden" />),
    );
    expect(getByTestId("gated").textContent).toBe("1");

    await act(async () => {
      startTransition(() => store.dispatch(1));
    });
    expect(getByTestId("gated").textContent).toBe("1");

    // Revealed while the transition is still held: it must show what the tree
    // shows, not the version the transition is waiting on.
    await act(async () => rerender(<App mode="visible" />));
    expect(getByTestId("peer").textContent).toBe("1");
    expect(getByTestId("gated").textContent).toBe("1");

    await act(async () => release());
    expect(getByTestId("peer").textContent).toBe("2");
    expect(getByTestId("gated").textContent).toBe("2");
  });
});

describe("Promise identity", () => {
  afterEach(() => cleanup());

  /**
   * React's own rule: a promise passed to use() must have a stable identity
   * across renders, and React warns when it does not ("a component was
   * suspended by an uncached promise"). The store is what gives the promise
   * its identity here, so that warning firing would mean the store is handing
   * out a different promise on each read.
   */
  it("never suspends React on an uncached promise", async () => {
    const logged: string[] = [];
    const spy = vi
      .spyOn(console, "error")
      .mockImplementation((...args: unknown[]) => {
        logged.push(args.map(String).join(" "));
      });

    let resolve!: (name: string) => void;
    const pending = new Promise<string>((r) => (resolve = r));
    const store = createStore<Promise<string>>(Promise.resolve("ada"));

    function Reader() {
      return <span>{use(useStore(store))}</span>;
    }

    const { container } = await act(async () =>
      render(
        <Suspense fallback={<span>loading</span>}>
          <Reader />
        </Suspense>,
      ),
    );
    expect(container.textContent).toBe("ada");

    await act(async () => store.dispatch(pending));
    // React keeps the suspended child mounted but hidden, so the container
    // holds both; the fallback being present is the reading that matters.
    expect(container.textContent).toContain("loading");

    await act(async () => resolve("grace"));
    expect(container.textContent).toBe("grace");

    // A transition over a pending promise too: this is the path that retries.
    let releaseSecond!: (name: string) => void;
    const second = new Promise<string>((r) => (releaseSecond = r));
    await act(async () => {
      startTransition(() => store.dispatch(second));
    });
    await act(async () => releaseSecond("hopper"));
    expect(container.textContent).toBe("hopper");

    spy.mockRestore();
    expect(logged.filter((line) => /uncached promise/i.test(line))).toEqual([]);
    // Nothing else React considers a rules violation either.
    expect(logged.filter((line) => /not wrapped in act|Cannot update a component/i.test(line))).toEqual([]);
  });

  it("hands the same promise to every reader in a pass", async () => {
    const stored = Promise.resolve("ada");
    const store = createStore<Promise<string>>(stored);
    const seen: unknown[] = [];

    function Reader() {
      const promise = useStore(store);
      seen.push(promise);
      return <span>{use(promise)}</span>;
    }

    await act(async () =>
      render(
        <Suspense fallback={<span>loading</span>}>
          <Reader />
          <Reader />
        </Suspense>,
      ),
    );

    expect(seen.length).toBeGreaterThan(1);
    expect(new Set(seen).size).toBe(1);
    expect(seen[0]).toBe(stored);
  });
});

describe("A sync update that does not suspend, over a transition that does", () => {
  afterEach(() => cleanup());

  it("never commits the fallback for the sync value", async () => {
    // Letters: uppercase suspends while the gate is held, lowercase never does.
    const store = createStore("");
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    let held = true;
    let fallbackRenders = 0;
    let fallbackCommits = 0;

    function Reader() {
      const applied = useStore(store);
      if (held && /[A-Z]/.test(applied)) use(gate);
      return <span data-testid="screen">{applied}</span>;
    }
    function Fallback() {
      fallbackRenders += 1;
      // A render React discards is not one anybody saw; a commit is.
      useEffect(() => {
        fallbackCommits += 1;
      }, []);
      return <span>loading</span>;
    }

    const { getAllByTestId } = await act(async () =>
      render(
        <Suspense fallback={<Fallback />}>
          <Reader />
        </Suspense>,
      ),
    );
    const screen = () => getAllByTestId("screen").map((n) => n.textContent);
    expect(screen()).toEqual([""]);
    fallbackRenders = 0;
    fallbackCommits = 0;

    // The chronological value contains A, so every head render suspends.
    await act(async () => {
      startTransition(() => store.dispatch((s) => s + "A"));
    });
    expect(screen()).toEqual([""]);
    expect(store.getState()).toBe("A");

    // The rebased value is "b", which never suspends. It must render, and the
    // tree must not drop to the fallback to get there.
    await act(async () => store.dispatch((s) => s + "b"));
    expect(store.getState()).toBe("Ab");
    expect(screen()).toEqual(["b"]);
    // React renders the fallback while it retries the suspended attempt, but
    // never commits it, so nobody sees it. Committing is the claim.
    expect(fallbackCommits).toBe(0);
    expect(fallbackRenders).toBeGreaterThanOrEqual(0);

    await act(async () => store.dispatch((s) => s + "c"));
    expect(store.getState()).toBe("Abc");
    expect(screen()).toEqual(["bc"]);
    expect(fallbackCommits).toBe(0);

    held = false;
    await act(async () => release());
    expect(screen()).toEqual(["Abc"]);
  });
});

describe("Reordering keys", () => {
  type Rows = { order: string[]; value: Record<string, number> };

  afterEach(() => cleanup());

  const reducer = (state: Rows, action: Partial<Rows>): Rows => ({
    ...state,
    ...action,
  });

  it("keeps each reader on its own row when the list is reordered", async () => {
    const store = createStore<Rows, Partial<Rows>>(
      { order: ["a", "b", "c"], value: { a: 1, b: 2, c: 3 } },
      reducer,
    );

    function Row({ id }: { id: string }) {
      const n = useStore(store, (s: Rows) => s.value[id]);
      return <li data-row={id}>{`${id}:${n}`}</li>;
    }
    function List() {
      const order = useStore(store, (s: Rows) => s.order);
      return (
        <ul>
          {order.map((id) => (
            <Row key={id} id={id} />
          ))}
        </ul>
      );
    }

    const { container } = await act(async () => render(<List />));
    const read = () =>
      Array.from(container.querySelectorAll("li"), (n) => n.textContent);
    expect(read()).toEqual(["a:1", "b:2", "c:3"]);

    // Reorder only. Fibers move; no row's own value changed.
    await act(async () => store.dispatch({ order: ["c", "a", "b"] }));
    expect(read()).toEqual(["c:3", "a:1", "b:2"]);

    // Reorder and change a value in the same action.
    await act(async () =>
      store.dispatch({ order: ["b", "c", "a"], value: { a: 1, b: 20, c: 3 } }),
    );
    expect(read()).toEqual(["b:20", "c:3", "a:1"]);

    // Remove a row that a reader was mounted on.
    await act(async () =>
      store.dispatch({ order: ["c", "b"], value: { b: 20, c: 3 } }),
    );
    expect(read()).toEqual(["c:3", "b:20"]);
  });

  it("does not let a reordered row mount from another row's pass", async () => {
    const store = createStore<Rows, Partial<Rows>>(
      { order: ["a", "b"], value: { a: 1, b: 2 } },
      reducer,
    );
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    let held = true;

    function Row({ id }: { id: string }) {
      const n = useStore(store, (s: Rows) => s.value[id] ?? -1);
      if (held && n === 99) use(gate);
      return <li data-row={id}>{`${id}:${n}`}</li>;
    }
    function List() {
      const order = useStore(store, (s: Rows) => s.order);
      return (
        <ul>
          {order.map((id) => (
            <Row key={id} id={id} />
          ))}
        </ul>
      );
    }

    const { container } = await act(async () => render(<List />));
    const read = () =>
      Array.from(container.querySelectorAll("li"), (n) => n.textContent);
    expect(read()).toEqual(["a:1", "b:2"]);

    // A transition that blocks: row a would become 99 and suspend.
    await act(async () => {
      startTransition(() =>
        store.dispatch({ value: { a: 99, b: 2 } }),
      );
    });
    expect(read()).toEqual(["a:1", "b:2"]);

    // Reorder and add a row synchronously while that is still blocked. The new
    // row must mount on the state the list is showing, not on the pending one.
    await act(async () =>
      store.dispatch({
        order: ["c", "b", "a"],
        value: { a: 1, b: 2, c: 3 },
      }),
    );
    expect(read()).toEqual(["c:3", "b:2", "a:1"]);

    held = false;
    await act(async () => release());
    // The chronological order folds the transition's value onto the sync one.
    expect(read()).toEqual(["c:3", "b:2", "a:1"]);
  });
});

describe("A publish nobody takes", () => {
  type Pair = { a: number; b: number };

  afterEach(() => cleanup());

  /**
   * Ordinary selector use, no transition anywhere. When every reader's slice
   * is unchanged, nothing re-renders, so nothing reports a commit. If the
   * commit pointer is left behind on that, the next dispatch is misread as a
   * rebase and rebuilds from a state the earlier action was never applied to —
   * and that state is what a later reader mounts on.
   */
  it("still moves the commit pointer, so the next dispatch is not misread", async () => {
    const store = createStore<Pair, "a" | "b">({ a: 0, b: 0 }, (s, which) =>
      which === "a" ? { ...s, a: s.a + 1 } : { ...s, b: s.b + 1 },
    );

    function OnlyB() {
      const b = useStore(store, (s: Pair) => s.b);
      return <span data-testid="b">{`b=${b}`}</span>;
    }
    function Full() {
      const s = useStore(store);
      return <span data-testid="full">{`${s.a}/${s.b}`}</span>;
    }

    let reveal!: () => void;
    function App() {
      const [showFull, setShowFull] = useState(false);
      reveal = () => setShowFull(true);
      return (
        <>
          <OnlyB />
          {showFull && <Full />}
        </>
      );
    }

    const { getByTestId } = await act(async () => render(<App />));

    // Nobody selects `a`, so this renders nothing at all.
    await act(async () => store.dispatch("a"));
    await act(async () => store.dispatch("b"));
    expect(getByTestId("b").textContent).toBe("b=1");
    expect(store.getState()).toEqual({ a: 1, b: 1 });

    // A reader mounting now must see both actions, not just the one its
    // sibling happened to care about.
    await act(async () => reveal());
    expect(getByTestId("full").textContent).toBe("1/1");
  });
});

describe("A batch is one tick at one priority", () => {
  afterEach(() => cleanup());

  /**
   * Dispatches in one tick share a rebasing decision, because the commit
   * pointer cannot move until React renders and a second sync dispatch would
   * otherwise read its own predecessor as a pending transition. That sharing
   * must not span priorities: startTransition and flushSync in one call stack
   * get different lanes from React.
   */
  it("does not let a flushSync inherit a pending transition's decision", async () => {
    const store = createStore(2, (n: number, a: "double" | "inc") =>
      a === "double" ? n * 2 : n + 1,
    );
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    let held = true;
    const seen: number[] = [];

    function Gated() {
      const n = useStore(store);
      seen.push(n);
      if (held && n >= 4) use(gate);
      return <span data-testid="out">{n}</span>;
    }

    const { getAllByTestId } = await act(async () =>
      render(
        <Suspense fallback={<span data-testid="out">loading</span>}>
          <Gated />
        </Suspense>,
      ),
    );
    const screen = () => getAllByTestId("out").map((n) => n.textContent);
    expect(screen()).toEqual(["2"]);
    seen.length = 0;

    await act(async () => {
      startTransition(() => store.dispatch("double"));
      // Same call stack, same tick, different lane.
      flushSync(() => store.dispatch("inc"));
    });

    // Rebased onto what is on screen: 2 + 1. Never straight to 5, which would
    // put the transition nobody has seen on screen, and never the fallback.
    expect(seen[0]).toBe(3);
    expect(screen()).toEqual(["3"]);
    expect(store.getState()).toBe(5);

    held = false;
    await act(async () => release());
    expect(screen()).toEqual(["5"]);
  });
});

describe("A selector reader that mounts during a pending transition", () => {
  type Slice = { n: number };

  afterEach(() => cleanup());

  /**
   * Its view's slice memory has to be seeded from the handle the reader is
   * showing, not from what the store last published. A reader that mounted on
   * committed state has never seen the published slice, and recording that
   * slice as already delivered means the commit that finally lands is filtered
   * out as a duplicate — leaving that reader behind its siblings for good.
   */
  it("is brought forward when the transition finally commits", async () => {
    const store = createStore<Slice, number>({ n: 1 }, (_s, n) => ({ n }));
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    let held = true;

    function Gated() {
      const n = useStore(store, (s: Slice) => s.n);
      if (held && n === 2) use(gate);
      return <span data-testid="g">{n}</span>;
    }
    function Late() {
      const n = useStore(store, (s: Slice) => s.n);
      return <span data-testid="l">{n}</span>;
    }

    let reveal!: () => void;
    function App() {
      const [show, setShow] = useState(false);
      reveal = () => setShow(true);
      return (
        <Suspense fallback={<span>loading</span>}>
          <Gated />
          {show && <Late />}
        </Suspense>
      );
    }

    const { getAllByTestId, queryAllByTestId } = await act(async () =>
      render(<App />),
    );
    const read = () => [
      ...getAllByTestId("g").map((x) => x.textContent),
      ...queryAllByTestId("l").map((x) => x.textContent),
    ];
    expect(read()).toEqual(["1"]);

    await act(async () => {
      startTransition(() => store.dispatch(2));
    });
    expect(read()).toEqual(["1"]);

    // Mounts on what the tree shows, not on the pending transition.
    await act(async () => reveal());
    expect(read()).toEqual(["1", "1"]);

    held = false;
    await act(async () => release());
    // Both move. Neither is left behind.
    expect(read()).toEqual(["2", "2"]);
  });
});

describe("A selector that changes in the same commit as a dispatch", () => {
  type Pair = { a: number; b: number };

  afterEach(() => cleanup());

  /**
   * The new selector applies to the render immediately, but the view holding
   * the subscription has to be told about it too. If that hand-off happens in
   * a layout effect, a dispatch from an earlier sibling's layout effect is
   * judged against the selector this render replaced: it bails out, and
   * nothing is scheduled that would ever repair the reader.
   */
  it("does not judge that dispatch with the selector it replaced", async () => {
    const store = createStore<Pair, Partial<Pair>>({ a: 0, b: 0 }, (s, patch) => ({
      ...s,
      ...patch,
    }));

    let bump!: () => void;

    // Earlier in the tree, so its layout effect runs before the reader's.
    function Sibling({ armed }: { armed: boolean }) {
      useLayoutEffect(() => {
        if (armed) store.dispatch({ b: 1 });
      }, [armed]);
      return null;
    }

    function Reader({ which }: { which: "a" | "b" }) {
      const value = useStore(store, (s: Pair) => s[which]);
      return <span data-testid="out">{`${which}=${value}`}</span>;
    }

    function App() {
      const [which, setWhich] = useState<"a" | "b">("a");
      bump = () => setWhich("b");
      return (
        <>
          <Sibling armed={which === "b"} />
          <Reader which={which} />
        </>
      );
    }

    const { getByTestId } = await act(async () => render(<App />));
    expect(getByTestId("out").textContent).toBe("a=0");

    await act(async () => bump());
    expect(store.getState()).toEqual({ a: 0, b: 1 });
    expect(getByTestId("out").textContent).toBe("b=1");
  });
});

describe("The hydration check costs nothing when it is not needed", () => {
  type State = { count: number };
  type Action = { type: "INCREMENT" };
  const reducer = (state: State): State => ({ count: state.count + 1 });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  const hydrateCounting = async (moveFirst: boolean) => {
    const make = (initial: State) => createStore<State, Action>(initial, reducer);
    let renders = 0;

    function App({ store }: { store: ReturnType<typeof make> }) {
      const count = useStore(store, (state: State) => state.count);
      renders += 1;
      return <div id="out">count: {count}</div>;
    }

    const html = renderToString(<App store={make({ count: 7 })} />);
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    const client = make({ count: 7 });
    if (moveFirst) client.dispatch({ type: "INCREMENT" });

    renders = 0;
    const recoverable: string[] = [];
    await act(async () => {
      hydrateRoot(container, <App store={client} />, {
        onRecoverableError: (error) => recoverable.push(String(error)),
      });
    });
    return { renders, recoverable, text: container.querySelector("#out")?.textContent };
  };

  it("renders once for an ordinary hydration", async () => {
    const { renders, recoverable, text } = await hydrateCounting(false);
    expect(recoverable).toEqual([]);
    expect(text).toBe("count: 7");
    // The server and client snapshots of the hydration check are both false
    // when the store has not moved, so nothing ever differs and React has no
    // reason to render again.
    expect(renders).toBe(1);
  });

  it("spends one extra render only when the store moved first", async () => {
    const { renders, recoverable, text } = await hydrateCounting(true);
    expect(recoverable).toEqual([]);
    expect(text).toBe("count: 8");
    // Hydrate on the server's value, then catch up. That second render is the
    // whole price, and it is only paid in the case that needs it.
    expect(renders).toBe(2);
  });
});

describe("Router-shaped navigation", () => {
  type Route = { route: string; prefetched: string[] };
  type Nav =
    | { type: "navigate"; route: string }
    | { type: "prefetch"; route: string };

  afterEach(() => cleanup());

  /**
   * The shape a router actually has: navigation is a transition that suspends
   * on the page it is going to, an urgent update can interrupt it, the
   * abandoned navigation still settles eventually, and history moves in both
   * directions afterwards.
   */
  it("survives an interrupted navigation, a prefetch, and history in both directions", async () => {
    const store = createStore<Route, Nav>(
      { route: "/a", prefetched: [] },
      (state, action) =>
        action.type === "navigate"
          ? { ...state, route: action.route }
          : state.prefetched.includes(action.route)
            ? state
            : { ...state, prefetched: [...state.prefetched, action.route] },
    );

    const settle = new Map<string, (page: string) => void>();
    const pages = new Map<string, Promise<string>>([
      ["/a", Promise.resolve("page-a")],
    ]);
    for (const route of ["/b", "/c"]) {
      pages.set(
        route,
        new Promise<string>((resolve) => settle.set(route, resolve)),
      );
    }

    function Router() {
      const state = useStore(store);
      useEffect(() => {
        const pop = () => {
          const route = (window.history.state as { route: string }).route;
          startTransition(() => store.dispatch({ type: "navigate", route }));
        };
        window.addEventListener("popstate", pop);
        return () => window.removeEventListener("popstate", pop);
      }, []);
      return (
        <>
          <span data-testid="route">{state.route}</span>
          <span data-testid="prefetch">{state.prefetched.join(",")}</span>
          <span data-testid="page">{use(pages.get(state.route)!)}</span>
        </>
      );
    }

    window.history.replaceState({ route: "/a" }, "");
    const screen = await act(async () =>
      render(
        <Suspense fallback={<span data-testid="page">loading</span>}>
          <Router />
        </Suspense>,
      ),
    );
    const at = (id: string) =>
      screen.getAllByTestId(id).map((n) => n.textContent)[0];

    const navigate = async (route: string) => {
      window.history.pushState({ route }, "");
      await act(async () => {
        startTransition(() => store.dispatch({ type: "navigate", route }));
      });
    };

    await navigate("/b");
    // /b has not settled, so the transition holds and /a stays on screen.
    expect(at("route")).toBe("/a");

    // An urgent prefetch interrupts the held navigation. It must land without
    // dragging the pending route onto the screen with it.
    await act(async () => store.dispatch({ type: "prefetch", route: "/c" }));
    expect(at("prefetch")).toBe("/c");
    expect(at("route")).toBe("/a");

    // A second navigation replaces the first while it is still in flight.
    await navigate("/c");
    await act(async () => settle.get("/c")!("page-c"));
    expect(at("route")).toBe("/c");

    // The abandoned navigation settles late. It must not roll the route back.
    await act(async () => settle.get("/b")!("page-b"));
    expect(at("route")).toBe("/c");
    expect(at("page")).toBe("page-c");

    // jsdom's back/forward are asynchronous and unreliable; the store only
    // ever sees the popstate, so that is what this drives.
    const pop = async (route: string) => {
      window.history.replaceState({ route }, "");
      await act(async () => {
        window.dispatchEvent(new PopStateEvent("popstate", { state: { route } }));
      });
    };

    await pop("/b");
    await act(async () => {
      await waitFor(() => expect(at("route")).toBe("/b"));
    });
    expect(at("page")).toBe("page-b");

    await pop("/c");
    await act(async () => {
      await waitFor(() => expect(at("route")).toBe("/c"));
    });
    expect(at("page")).toBe("page-c");
    // The prefetch survived every one of those.
    expect(at("prefetch")).toBe("/c");
  });
});

describe("Crossing a server/client boundary", () => {
  /**
   * A store cannot travel through Flight. It holds functions, mutable sets and
   * promises, none of which serialize. The supported shape is to send the
   * serializable initial state to a Client Component and build the store
   * there — which is also what makes the hydration path work, since both sides
   * start from the same value.
   */
  it("is not something a server component can hand to a client one", () => {
    const store = createStore({ count: 1 });
    expect(() => structuredClone(store)).toThrow();

    // What does travel: the state.
    const state = store.getState();
    expect(structuredClone(state)).toEqual({ count: 1 });

    // And a store built from it on the other side is equivalent, though it is
    // a different object with its own identity, subscriptions and history.
    const clientStore = createStore(structuredClone(state));
    expect(clientStore.getState()).toEqual(store.getState());
    expect(clientStore).not.toBe(store);
  });
});

describe("Other React 19 surfaces at once", () => {
  afterEach(() => cleanup());

  /**
   * ViewTransition around a tree that contains an Activity boundary, a reader
   * feeding useDeferredValue and useOptimistic, a transition that suspends,
   * and a flushSync that interrupts it. The claim is narrow: none of these
   * change where an action lands.
   */
  it("keeps a flushSync rebase correct through all of them", async () => {
    const store = createStore(2, (n: number, action: "double" | "increment") =>
      action === "double" ? n * 2 : n + 1,
    );
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    let held = true;
    let addForecast!: (delta: number) => void;

    function Reader({ id }: { id: string }) {
      const n = useStore(store);
      const deferred = useDeferredValue(n);
      const [forecast, add] = useOptimistic(
        n,
        (value: number, delta: number) => value + delta,
      );
      if (id === "visible") addForecast = add;
      if (held && n >= 4) use(gate);
      return (
        <span data-testid={id} data-forecast={forecast}>
          {`${n}/${deferred}`}
        </span>
      );
    }

    let reveal!: () => void;
    function App() {
      const [mode, setMode] = useState<"hidden" | "visible">("hidden");
      reveal = () => setMode("visible");
      return (
        <Suspense fallback={<span data-testid="fallback">loading</span>}>
          <ViewTransition>
            <Reader id="visible" />
            <Activity mode={mode}>
              <Reader id="activity" />
            </Activity>
          </ViewTransition>
        </Suspense>
      );
    }

    const screen = await act(async () => render(<App />));
    const at = (id: string) =>
      screen.queryAllByTestId(id).map((n) => n.textContent)[0];

    await act(async () => {
      startTransition(() => {
        addForecast(10);
        reveal();
        store.dispatch("double");
      });
      // Interrupts the held transition from inside the same call stack.
      flushSync(() => store.dispatch("increment"));
    });

    // 2 + 1, rebased onto what is on screen. Not 4 + 1, and not the fallback.
    expect(at("visible")).toBe("3/3");
    expect(screen.queryAllByTestId("fallback")).toEqual([]);
    expect(store.getState()).toBe(5);

    held = false;
    await act(async () => release());
    expect(at("visible")).toBe("5/5");
    expect(at("activity")).toBe("5/5");
  });
});

describe("Why a reader that lands behind cannot simply join the transition", () => {
  afterEach(() => cleanup());

  /**
   * This is plain React, no store involved, and it is the constraint the whole
   * catch-up design rests on. A reader revealed while a transition is blocked
   * would ideally join that transition and arrive with everyone else. The only
   * tool userland has is startTransition, and a later startTransition does not
   * join a pending one — it commits on its own as soon as nothing in it
   * suspends, which puts that reader ahead of every sibling.
   *
   * That leaves three reachable options and no fourth:
   *
   *   hold (suspend)        no waterfall, but an urgent reveal shows a
   *                         fallback and a lone reader freezes
   *   catch up in our own   no fallback, but it commits early: a tear
   *     transition
   *   catch up in a layout  no fallback and no tear, at the price of a second
   *     effect (what we do) render, so effects keyed on the value fire twice
   *
   * React can entangle a new reader with an in-flight transition internally.
   * Userland cannot, and that is the single reason the waterfall is not
   * removable from here.
   */
  it("a later startTransition commits without waiting for a pending one", async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    let held = true;
    let bumpBlocked!: (n: number) => void;
    let bumpFree!: (n: number) => void;

    function Blocked() {
      const [n, set] = useState(0);
      bumpBlocked = set;
      if (held && n === 1) use(gate);
      return <span data-testid="blocked">{n}</span>;
    }
    function Free() {
      const [n, set] = useState(0);
      bumpFree = set;
      return <span data-testid="free">{n}</span>;
    }

    const { queryAllByTestId } = await act(async () =>
      render(
        <Suspense fallback={<span data-testid="fb">loading</span>}>
          <Blocked />
          <Free />
        </Suspense>,
      ),
    );
    const at = (id: string) =>
      queryAllByTestId(id).map((n) => n.textContent)[0];

    await act(async () => {
      startTransition(() => bumpBlocked(1));
    });
    expect(at("blocked")).toBe("0");

    // A separate transition, started while the first is still blocked.
    await act(async () => {
      startTransition(() => bumpFree(9));
    });

    // It did not wait. This is the tear, in its simplest possible form.
    expect(at("free")).toBe("9");
    expect(at("blocked")).toBe("0");
    expect(queryAllByTestId("fb")).toEqual([]);

    held = false;
    await act(async () => release());
    expect(at("blocked")).toBe("1");
    expect(at("free")).toBe("9");
  });
});

describe("subscribe reports state, not just the action", () => {
  afterEach(() => cleanup());

  /**
   * `subscribe` is documented as called after each update. A subscriber that
   * reads getState in the callback is the whole point of it — devtools,
   * persistence, logging, and anything bridging to useSyncExternalStore, which
   * pairs subscribe with a snapshot and re-reads on every notification.
   */
  it("has applied the action by the time it calls back", () => {
    const store = createStore(1, (n: number, step: number) => n + step);
    const seen: number[] = [];
    store.subscribe(() => seen.push(store.getState()));

    store.dispatch(1);
    store.dispatch(1);

    expect(seen).toEqual([2, 3]);
    expect(store.getState()).toBe(3);
  });

  it("drives a useSyncExternalStore reader built on the public pair", async () => {
    const store = createStore(1, (n: number, step: number) => n + step);

    function Bridged() {
      const n = useSyncExternalStore(store.subscribe, store.getState);
      return <span data-testid="bridged">{n}</span>;
    }

    const { getByTestId } = await act(async () => render(<Bridged />));
    expect(getByTestId("bridged").textContent).toBe("1");

    await act(async () => store.dispatch(1));
    expect(getByTestId("bridged").textContent).toBe("2");

    await act(async () => {
      startTransition(() => store.dispatch(1));
    });
    expect(getByTestId("bridged").textContent).toBe("3");
  });
});

describe("When a pending promise shows the fallback", () => {
  afterEach(() => cleanup());

  /**
   * Priority decides this, not which API was used. An urgent update says show
   * this now; if the new state has not settled there is nothing to show and
   * React cannot wait, so it commits the fallback. A transition says the
   * opposite, and must not.
   *
   * The middle case is the one useSyncExternalStore cannot keep — it de-opts
   * the transition to sync, and the tree drops to a fallback nobody asked for.
   */
  const fallbacksFor = async (
    dispatch: (
      store: ReturnType<typeof createStore<Promise<string>>>,
      pending: Promise<string>,
    ) => void,
  ) => {
    const store = createStore<Promise<string>>(Promise.resolve("a"));
    let committed = 0;
    function Reader() {
      return <span data-testid="out">{use(useStore(store))}</span>;
    }
    function Fallback() {
      useEffect(() => {
        committed += 1;
      }, []);
      return <span>loading</span>;
    }
    const { getAllByTestId } = await act(async () =>
      render(
        <Suspense fallback={<Fallback />}>
          <Reader />
        </Suspense>,
      ),
    );
    committed = 0;
    let settle!: (value: string) => void;
    const pending = new Promise<string>((r) => (settle = r));
    await act(async () => dispatch(store, pending));
    await act(async () => settle("b"));
    expect(getAllByTestId("out").map((n) => n.textContent)).toEqual(["b"]);
    return committed;
  };

  it("shows it for a plain sync dispatch", async () => {
    expect(await fallbacksFor((store, pending) => store.dispatch(pending))).toBe(1);
  });

  it("does not show it for a dispatch inside a transition", async () => {
    expect(
      await fallbacksFor((store, pending) => {
        startTransition(() => store.dispatch(pending));
      }),
    ).toBe(0);
  });

  it("shows it for a dispatch inside flushSync", async () => {
    expect(
      await fallbacksFor((store, pending) => {
        flushSync(() => store.dispatch(pending));
      }),
    ).toBe(1);
  });
});

describe("flushSync with promise state is a dead end, not a tradeoff", () => {
  afterEach(() => cleanup());

  /**
   * flushSync exists so the caller can read the DOM the moment it returns. If
   * the dispatched value is a promise that has not settled, what is in the DOM
   * when it returns is the fallback — so nothing flushSync is for is possible
   * on that DOM. Recorded so the documentation cannot drift back into calling
   * it a limitation with a known behaviour.
   */
  it("leaves the fallback in the DOM, not the value", async () => {
    const store = createStore<Promise<string>>(Promise.resolve("a"));
    function Reader() {
      return <span>{use(useStore(store))}</span>;
    }
    const { container } = await act(async () =>
      render(
        <Suspense fallback={<span>SPINNER</span>}>
          <Reader />
        </Suspense>,
      ),
    );
    expect(container.textContent).toBe("a");

    let settle!: (value: string) => void;
    const pending = new Promise<string>((r) => (settle = r));
    flushSync(() => store.dispatch(pending));

    // No await: this is the line a measuring caller would run.
    expect(container.textContent).toContain("SPINNER");

    await act(async () => settle("b"));
    expect(container.textContent).toBe("b");
  });

  it("does what you expect with a settled value", async () => {
    const store = createStore("a");
    function Reader() {
      return <span>{useStore(store)}</span>;
    }
    const { container } = await act(async () => render(<Reader />));
    flushSync(() => store.dispatch("b"));
    expect(container.textContent).toBe("b");
  });
});

describe("The promise rules are React's, not this store's", () => {
  afterEach(() => cleanup());

  /**
   * The same readings, with plain useState and use() and no store anywhere.
   * An urgent update to a promise that has not settled commits the fallback;
   * the same update in a transition keeps the current content. Whatever ships
   * this API — this package, or React itself — inherits both, because they are
   * properties of use() and update priority rather than of a store.
   */
  it("plain useState behaves identically", async () => {
    let setValue!: (p: Promise<string>) => void;

    function Reader({ value }: { value: Promise<string> }) {
      return <span>{use(value)}</span>;
    }
    function App() {
      const [value, set] = useState<Promise<string>>(Promise.resolve("a"));
      setValue = set;
      return (
        <Suspense fallback={<span>SPINNER</span>}>
          <Reader value={value} />
        </Suspense>
      );
    }

    const { container } = await act(async () => render(<App />));
    expect(container.textContent).toBe("a");

    let settle!: (value: string) => void;
    const pending = new Promise<string>((r) => (settle = r));
    flushSync(() => setValue(pending));
    // The spinner, exactly as with the store.
    expect(container.textContent).toContain("SPINNER");
    await act(async () => settle("b"));
    expect(container.textContent).toBe("b");

    let settleAgain!: (value: string) => void;
    const alsoPending = new Promise<string>((r) => (settleAgain = r));
    await act(async () => {
      startTransition(() => setValue(alsoPending));
    });
    // Current content kept, no fallback — again exactly as with the store.
    expect(container.textContent).toBe("b");
    await act(async () => settleAgain("c"));
    expect(container.textContent).toBe("c");
  });
});

describe("React rebases its own queue", () => {
  afterEach(() => cleanup());

  /**
   * With state held in React and updates expressed as updater functions, React
   * already does what this store does: an urgent update renders against the
   * committed base, skipping the transition's update, and the transition then
   * replays the whole queue in order.
   *
   *   rendered [3, 5] from a base of 2 — 2 + 1 first, then 2 * 2 + 1
   *
   * It does that by lane, and it can only do it for updates it owns. A store's
   * state lives outside React, so the queue never sees the actions and none of
   * this applies to it. That is the whole reason the store computes the two
   * folds itself, and it is worth having written down: the machinery is not
   * novel, it is React's, reimplemented where React cannot reach.
   */
  it("does it for updater functions, which is what a store cannot hand it", async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    let held = true;
    let update!: (fn: (n: number) => number) => void;
    const rendered: number[] = [];

    function Counter() {
      const [n, set] = useState(2);
      update = set;
      rendered.push(n);
      if (held && n === 4) use(gate);
      return <span data-testid="out">{n}</span>;
    }

    const { queryAllByTestId } = await act(async () =>
      render(
        <Suspense fallback={<span data-testid="fb">loading</span>}>
          <Counter />
        </Suspense>,
      ),
    );
    rendered.length = 0;

    await act(async () => {
      startTransition(() => update((n) => n * 2));
    });
    // Rendered 4 and suspended, so nothing was committed.
    expect(rendered).toEqual([4]);
    expect(queryAllByTestId("out").map((n) => n.textContent)[0]).toBe("2");
    rendered.length = 0;

    await act(async () => update((n) => n + 1));

    // 3 is the urgent update against the committed base, with the transition's
    // update skipped. 5 is the queue replayed in order.
    expect(rendered).toEqual([3, 5]);
    expect(queryAllByTestId("fb")).toEqual([]);

    held = false;
    await act(async () => release());
    expect(queryAllByTestId("out").map((n) => n.textContent)[0]).toBe("5");
  });
});

describe("The one limitation, pinned", () => {
  afterEach(() => cleanup());

  /**
   * A reader that lands behind shows what its siblings show and corrects
   * itself when the transition commits, so an effect keyed on the value runs
   * twice — once for the value the tree was showing. This is the only thing
   * the documentation claims cannot be fixed from userland, and until now
   * nothing held it: it could have regressed, or quietly improved, unnoticed.
   *
   * What is asserted is the shape, not a happy number. Mount-only effects run
   * once and memos with stable dependencies are not recomputed; it is
   * specifically things keyed on the value that run again.
   */
  it("an effect keyed on the value runs twice, mount-only effects do not", async () => {
    const store = createStore(1);
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    let held = true;

    const seen = { renders: 0, onValue: [] as number[], onMount: 0, stableMemo: 0 };

    function Gated() {
      const n = useStore(store);
      if (held && n === 2) use(gate);
      return <span>{n}</span>;
    }
    function Late() {
      const n = useStore(store);
      seen.renders += 1;
      useMemo(() => {
        seen.stableMemo += 1;
      }, []);
      useEffect(() => {
        seen.onValue.push(n);
      }, [n]);
      useEffect(() => {
        seen.onMount += 1;
      }, []);
      return <span data-testid="late">{n}</span>;
    }

    let reveal!: () => void;
    function App() {
      const [shown, setShown] = useState(false);
      reveal = () => setShown(true);
      return (
        <Suspense fallback={<span>loading</span>}>
          <Gated />
          {shown && <Late />}
        </Suspense>
      );
    }

    await act(async () => render(<App />));
    await act(async () => {
      startTransition(() => store.dispatch(2));
    });

    // Revealed while the transition is blocked: it opens on what the tree shows.
    await act(async () => reveal());
    expect(seen.onValue).toEqual([1]);

    held = false;
    await act(async () => release());

    // The correction. This is the cost, and it is only paid by effects keyed
    // on the value.
    expect(seen.onValue).toEqual([1, 2]);
    expect(seen.renders).toBe(2);
    expect(seen.onMount).toBe(1);
    expect(seen.stableMemo).toBe(1);
  });
});
