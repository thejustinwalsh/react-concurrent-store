import "@testing-library/jest-dom/vitest";
import { render, act, waitFor, cleanup } from "@testing-library/react";

import { afterEach, describe, expect, it } from "vitest";
import { ErrorBoundary } from "react-error-boundary";

import { createStore, useStore } from "./useStore";
import { Suspense, use } from "react";

describe("createStore", () => {
  afterEach(() => cleanup());

  it("should create a store with initial value", () => {
    const initialValue = { count: 0 };
    const store = createStore(initialValue);

    expect(store).toBeDefined();
    expect(store.update).toBeDefined();
    expect(typeof store.update).toBe("function");
  });

  it("should create a store with initial value and reducer", () => {
    const initialValue = { count: 0 };
    const reducer = (
      state: typeof initialValue,
      action: { type: string; payload?: number }
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
    expect(store.update).toBeDefined();
    expect(typeof store.update).toBe("function");
  });

  it("should create store with primitive initial value", () => {
    const store = createStore(42);

    expect(store).toBeDefined();
    expect(store.update).toBeDefined();
  });

  it("should create store with string initial value", () => {
    const store = createStore("hello");

    expect(store).toBeDefined();
    expect(store.update).toBeDefined();
  });

  it("should create store with array initial value", () => {
    const store = createStore([1, 2, 3]);

    expect(store).toBeDefined();
    expect(store.update).toBeDefined();
  });
});

describe("useStore", () => {
  afterEach(() => cleanup());

  it("should return initial store value", async () => {
    const initialValue = { count: 0 };
    const store = createStore(initialValue);
    let result: any;

    const TestComponent = () => {
      result = useStore(store);
      return <div>{result.count}</div>;
    };

    await act(async () => {
      render(<TestComponent />);
    });

    expect(result).toEqual(initialValue);
  });

  it("should return initial primitive value", async () => {
    const initialValue = 42;
    const store = createStore(initialValue);
    let result: any;

    const TestComponent = () => {
      result = useStore(store);
      return <div>{result}</div>;
    };

    await act(async () => {
      render(<TestComponent />);
    });

    expect(result).toBe(initialValue);
  });

  it("should return initial string value", async () => {
    const initialValue = "hello world";
    const store = createStore(initialValue);
    let result: any;

    const TestComponent = () => {
      result = useStore(store);
      return <div>{result}</div>;
    };

    await act(async () => {
      render(<TestComponent />);
    });

    expect(result).toBe(initialValue);
  });

  it("should return initial array value", async () => {
    const initialValue = [1, 2, 3];
    const store = createStore(initialValue);
    let result: any;

    const TestComponent = () => {
      result = useStore(store);
      return <div>{result.join(",")}</div>;
    };

    await act(async () => {
      render(<TestComponent />);
    });

    expect(result).toEqual(initialValue);
  });

  it("should throw error for invalid store type", async () => {
    const invalidStore = {
      $$typeof: Symbol.for("invalid"),
      update: () => {},
    } as any;

    const TestComponent = () => {
      useStore(invalidStore);
      return <div>test</div>;
    };

    expect(() => {
      render(<TestComponent />);
    }).toThrow("Invalid store type. Ensure you are using a valid React store.");
  });
});

describe("useStore", () => {
  afterEach(() => cleanup());

  it("should update store value with reducer", async () => {
    const initialValue = { count: 0 };
    const reducer = (
      state: typeof initialValue,
      action: { type: string; payload?: number }
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
    let result: any;

    const TestComponent = () => {
      result = useStore(store);
      return <div data-testid="counter">{result.count}</div>;
    };

    const { getByTestId } = await act(async () => {
      return render(<TestComponent />);
    });

    expect(result).toEqual({ count: 0 });

    await act(async () => {
      store.update({ type: "INCREMENT" });
    });

    // Wait for React to schedule and execute the re-render
    await waitFor(
      () => {
        expect(getByTestId("counter").textContent).toBe("1");
      },
      { timeout: 100 }
    );

    expect(result).toEqual({ count: 1 });
  }, 5000);

  it("should update store with custom payload", async () => {
    const initialValue = { count: 0 };
    const reducer = (
      state: typeof initialValue,
      action: { type: string; payload?: number }
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
    let result: any;

    const TestComponent = () => {
      result = useStore(store);
      return <div data-testid="counter-value">{result.count}</div>;
    };

    const { getByTestId } = await act(async () => {
      return render(<TestComponent />);
    });

    expect(result).toEqual({ count: 0 });
    expect(getByTestId("counter-value").textContent).toBe("0");

    await act(async () => {
      store.update({ type: "INCREMENT", payload: 5 });
    });

    // Wait for React to schedule and execute the re-render
    await waitFor(
      () => {
        expect(getByTestId("counter-value").textContent).toBe("5");
      },
      { timeout: 100 }
    );

    expect(result).toEqual({ count: 5 });
  }, 5000);

  it("should handle decrement action", async () => {
    const initialValue = { count: 10 };
    const reducer = (
      state: typeof initialValue,
      action: { type: string; payload?: number }
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
    let result: any;

    const TestComponent = () => {
      result = useStore(store);
      return <div>{result.count}</div>;
    };

    await act(async () => {
      render(<TestComponent />);
    });

    expect(result).toEqual({ count: 10 });

    await act(async () => {
      store.update({ type: "DECREMENT", payload: 3 });
    });

    // Wait for the component to re-render after the store update
    await waitFor(async () => {
      expect(result).toEqual({ count: 7 });
    });
  });

  it("should handle multiple sequential updates", async () => {
    const initialValue = { count: 0 };
    const reducer = (
      state: typeof initialValue,
      action: { type: string; payload?: number }
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
    let result: any;

    const TestComponent = () => {
      result = useStore(store);
      return <div data-testid="count-display">{result.count}</div>;
    };

    const { getByTestId } = await act(async () => {
      return render(<TestComponent />);
    });

    expect(result).toEqual({ count: 0 });
    expect(getByTestId("count-display").textContent).toBe("0");

    await act(async () => {
      store.update({ type: "INCREMENT", payload: 2 });
    });

    // Wait for React to schedule and execute the re-render
    await waitFor(
      () => {
        expect(getByTestId("count-display").textContent).toBe("2");
      },
      { timeout: 100 }
    );

    expect(result).toEqual({ count: 2 });

    await act(async () => {
      store.update({ type: "INCREMENT", payload: 3 });
    });

    // Wait for React to schedule and execute the re-render
    await waitFor(
      () => {
        expect(getByTestId("count-display").textContent).toBe("5");
      },
      { timeout: 100 }
    );

    expect(result).toEqual({ count: 5 });

    await act(async () => {
      store.update({ type: "DECREMENT", payload: 1 });
    });

    // Wait for React to schedule and execute the re-render
    await waitFor(
      () => {
        expect(getByTestId("count-display").textContent).toBe("4");
      },
      { timeout: 100 }
    );

    expect(result).toEqual({ count: 4 });
  }, 10000);

  it("should work with primitive values", async () => {
    const initialValue = 42;
    const reducer = (
      state: number,
      action: { type: string; payload?: number }
    ) => {
      switch (action.type) {
        case "ADD":
          return state + (action.payload || 1);
        case "MULTIPLY":
          return state * (action.payload || 2);
        default:
          return state;
      }
    };

    const store = createStore(initialValue, reducer);
    let result: any;

    const TestComponent = () => {
      result = useStore(store);
      return <div>{result}</div>;
    };

    await act(async () => {
      render(<TestComponent />);
    });

    expect(result).toBe(42);

    await act(async () => {
      store.update({ type: "ADD", payload: 8 });
    });

    // Wait for the component to re-render after the store update
    await waitFor(async () => {
      expect(result).toBe(50);
    });

    await act(async () => {
      store.update({ type: "MULTIPLY", payload: 2 });
    });

    // Wait for the component to re-render after the store update
    await waitFor(async () => {
      expect(result).toBe(100);
    });
  });

  it("should work with array values", async () => {
    const initialValue = [1, 2, 3];
    const reducer = (
      state: number[],
      action: { type: string; payload?: number }
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
    let result: any;

    const TestComponent = () => {
      result = useStore(store);
      return <div>{result.join(",")}</div>;
    };

    await act(async () => {
      return render(<TestComponent />);
    });

    expect(result).toEqual([1, 2, 3]);

    await act(async () => {
      store.update({ type: "PUSH", payload: 4 });
    });

    // Wait for the component to re-render after the store update
    await waitFor(async () => {
      expect(result).toEqual([1, 2, 3, 4]);
    });

    await act(async () => {
      store.update({ type: "POP" });
    });

    await waitFor(async () => {
      expect(result).toEqual([1, 2, 3]);
    });
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

    const reducer = (state: State, action: { type: string; payload: any }) => {
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
    let result: any;

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
      store.update({ type: "UPDATE_USER", payload: { age: 31 } });
    });

    // Wait for the component to re-render after the store update
    await waitFor(async () => {
      expect(result).toEqual({
        user: { name: "John", age: 31 },
        settings: { theme: "light", notifications: true },
      });
    });

    await act(async () => {
      store.update({ type: "UPDATE_SETTINGS", payload: { theme: "dark" } });
    });

    // Wait for the component to re-render after the store update
    await waitFor(async () => {
      expect(result).toEqual({
        user: { name: "John", age: 31 },
        settings: { theme: "dark", notifications: true },
      });
    });
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
    let result1: any;
    let result2: any;

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
      store.update({ type: "INCREMENT" });
    });

    // Wait for React to schedule and execute the re-render for both components
    await waitFor(
      () => {
        expect(getByTestId("counter-1").textContent).toBe("1");
        expect(getByTestId("counter-2").textContent).toBe("1");
      },
      { timeout: 100 }
    );

    expect(result1).toEqual({ count: 1 });
    expect(result2).toEqual({ count: 1 });
  });

  it("should change value when updated without reducer", async () => {
    const initialValue = { count: 0 };
    const store = createStore(initialValue);

    let result: any;

    const TestComponent = () => {
      result = useStore(store);
      return <div>{result.count}</div>;
    };

    await act(async () => {
      return render(<TestComponent />);
    });

    expect(result).toEqual({ count: 0 });

    await act(async () => {
      store.update({ count: 1 });
    });

    expect(result).toEqual({ count: 1 });
  });

  it("should change value when updated with setter", async () => {
    const initialValue = { count: 0 };
    const increment = (state: typeof initialValue) => {
      return { count: state.count + 1 };
    };
    const store = createStore(initialValue, increment);

    let result: any;

    const TestComponent = () => {
      result = useStore(store);
      return <div data-testid="counter">{result.count}</div>;
    };

    await act(async () => {
      return render(<TestComponent />);
    });

    expect(result).toEqual({ count: 0 });

    await act(async () => {
      store.update();
    });

    expect(result).toEqual({ count: 1 });
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
    let result: any;

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
        </ErrorBoundary>
      );
    });

    await waitFor(() => {
      expect(getByTestId("loading")).toBeInTheDocument();
    });

    expect(result).toBeUndefined();

    await act(async () => resolve());

    expect(result).toBe(0);

    await waitFor(() => {
      expect(getByTestId("counter").textContent).toBe("0");
    });
  });

  it("should re-suspend on subsequent updates", async () => {
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
    let result: any;

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
        </ErrorBoundary>
      );
    });

    // Initially, the component should suspend

    await waitFor(() => {
      expect(getByTestId("loading")).toBeInTheDocument();
    });

    await act(async () => resolve());

    await waitFor(async () => {
      expect(getByTestId("counter").textContent).toBe("0");
    });

    // If we signal another update the component should suspend again

    await act(async () => {
      store.update(increment());
    });

    await waitFor(() => {
      expect(getByTestId("loading")).toBeInTheDocument();
    });

    await act(async () => resolve());

    await waitFor(() => {
      expect(getByTestId("counter").textContent).toBe("1");
    });
  });
});
