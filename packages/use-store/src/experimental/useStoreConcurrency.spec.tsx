// Concurrent-rendering cases where the experimental store doesn't behave like
// React state (useState/useReducer). Each test asserts what React state does,
// and the comments explain what the store does instead.
import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import {render, act} from '@testing-library/react';
import {useLayoutEffect, useState, startTransition, Suspense, use} from 'react';
import {flushSync} from 'react-dom';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {renderToString} from 'react-dom/server';
import {experimental} from '../index';
import Logger from '../../test/TestLogger';

const {createStore, StoreProvider, useStore} = experimental;

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}

// useState's reducer, so dispatch() takes a value or an updater function.
function setState<T>(state: T, action: T | ((prev: T) => T)): T {
  return typeof action === 'function'
    ? (action as (prev: T) => T)(state)
    : action;
}

let logger: Logger;

beforeEach(() => {
  logger = new Logger();
});

afterEach(() => {
  logger.assertLog([]);
});

// Returns the log so far without asserting on it, so a test can finish its
// pending work before it asserts.
function takeLog(): Array<unknown> {
  const log = logger._logs;
  logger._logs = [];
  return log;
}

describe('Experimental store: concurrent rendering', () => {
  it('a reader that mounts during a transition renders the committed value without a fixup render', async () => {
    const store = createStore(setState<number>, 1);

    function Reader({name}: {name: string}) {
      const value = useStore(store);
      logger.log(`${name}: ${value}`);
      return <span>{value}</span>;
    }

    let setShowConditional: (value: boolean) => void;
    function App() {
      const [showConditional, _setShowConditional] = useState(false);
      setShowConditional = _setShowConditional;
      return (
        <StoreProvider>
          <Reader name="Stable" />
          {showConditional ? <Reader name="Conditional" /> : null}
        </StoreProvider>
      );
    }

    await act(async () => {
      render(<App />);
    });
    logger.assertLog(['Stable: 1']);

    let resolve: () => void;
    await act(async () => {
      startTransition(async () => {
        store.dispatch(2);
        await new Promise<void>(r => (resolve = r));
      });
    });
    logger.assertLog([]);

    // Mount a new reader with a sync update. Like a component that reads
    // useReducer state, it should render the committed value, once.
    //
    // The store renders it with the pending transition's value first (a torn
    // render), then fixes it up in a layout effect with a second render.
    await act(async () => {
      setShowConditional(true);
    });
    const mountLog = takeLog();

    // Finish the transition before asserting. React entangles every later
    // transition with a pending async action, so leaving it pending when an
    // assertion fails would block the transitions in the next tests.
    await act(async () => {
      resolve();
    });
    const resolveLog = takeLog();

    expect(mountLog).toEqual(['Stable: 1', 'Conditional: 1']);
    expect(resolveLog).toEqual(['Stable: 2', 'Conditional: 2']);
  });

  it('a store update during a concurrent render does not commit a torn tree', async () => {
    const store = createStore(setState<number>, 1);
    const container = document.createElement('div');
    document.body.appendChild(container);

    let updated = false;
    function Reader({name}: {name: string}) {
      const value = useStore(store);
      if (name === 'A' && !updated) {
        updated = true;
        // Runs when React yields after rendering <Slow />, before B renders.
        queueMicrotask(() => store.dispatch(2));
      }
      return <span>{`${name}: ${value} `}</span>;
    }

    function Slow() {
      // Takes long enough that React yields after rendering it.
      const start = performance.now();
      while (performance.now() - start < 20) {
        // Busy wait.
      }
      return null;
    }

    const committed: Array<string> = [];
    function CommitSpy() {
      // Runs in every commit that renders the whole tree, after the readers
      // are in the DOM.
      useLayoutEffect(() => {
        committed.push(container.textContent ?? '');
      });
      return null;
    }

    const prevActEnvironment = globalThis.IS_REACT_ACT_ENVIRONMENT;
    // Let React yield. act() would render the whole tree without yielding.
    globalThis.IS_REACT_ACT_ENVIRONMENT = false;
    const root = createRoot(container);
    try {
      startTransition(() => {
        root.render(
          <StoreProvider>
            <Reader name="A" />
            <Slow />
            <Reader name="B" />
            <CommitSpy />
          </StoreProvider>,
        );
      });
      for (let i = 0; i < 100 && container.textContent !== 'A: 2 B: 2 '; i++) {
        await new Promise(r => setTimeout(r, 10));
      }
      expect(container.textContent).toBe('A: 2 B: 2 ');
      expect(updated).toBe(true);

      // React restarts a render when state it read changes during the render,
      // so readers never commit with different values. useSyncExternalStore
      // guarantees the same thing.
      //
      // The store finishes the render with A: 1 and B: 2, commits that, and
      // then re-renders A in a layout effect.
      expect(committed).toEqual(['A: 2 B: 2 ']);
    } finally {
      root.unmount();
      globalThis.IS_REACT_ACT_ENVIRONMENT = prevActEnvironment;
      container.remove();
    }
  });

  it('a reader that mounts after the last reader unmounted does not see a pending transition early', async () => {
    const store = createStore(setState<number>, 0);

    function Reader() {
      const value = useStore(store);
      logger.log(`Reader: ${value}`);
      return <span>{value}</span>;
    }

    let setShow: (value: boolean) => void;
    let setTab: (value: string) => void;
    let setCount: (value: number) => void;
    function App() {
      const [show, _setShow] = useState(true);
      const [tab, _setTab] = useState('a');
      const [count, _setCount] = useState(0);
      setShow = _setShow;
      setTab = _setTab;
      setCount = _setCount;
      logger.log(`Tab: ${tab} ${count}`);
      return <>{show && <Reader />}</>;
    }

    await act(async () => {
      render(
        <StoreProvider>
          <App />
        </StoreProvider>,
      );
    });
    logger.assertLog(['Tab: a 0', 'Reader: 0']);

    let syncLog: Array<unknown> = [];
    await act(async () => {
      startTransition(() => {
        store.dispatch(1);
        setTab('b');
      });
      // Unmount the only reader while the transition is pending, and commit
      // something else.
      flushSync(() => setShow(false));
      flushSync(() => setCount(1));
      // A reader that mounts in a sync render shouldn't see the transition
      // before it commits, just like the tab state doesn't.
      //
      // The store renders the new reader with the transition's value, then
      // fixes it up in a layout effect.
      flushSync(() => setShow(true));
      syncLog = takeLog();
    });
    const transitionLog = takeLog();
    expect(syncLog).toEqual(['Tab: a 0', 'Tab: a 1', 'Tab: a 1', 'Reader: 0']);
    expect(transitionLog).toEqual(['Tab: b 1', 'Reader: 1']);
  });
});

describe('Experimental store: Suspense', () => {
  type Thenable<T> = PromiseLike<T> & {status?: string; value?: T};

  // A thenable that React's use() reads synchronously.
  function fulfilled<T>(value: T): Thenable<T> {
    return {status: 'fulfilled', value, then() {}} as Thenable<T>;
  }

  it('an update retries a boundary whose reader suspended on mount', async () => {
    const store = createStore(
      setState<Thenable<string>>,
      new Promise<string>(() => {}),
    );

    function Consumer() {
      const value = use(useStore(store));
      logger.log(value);
      return <span>{value}</span>;
    }

    const {container} = await act(async () =>
      render(
        <StoreProvider>
          <Suspense fallback="Loading">
            <Consumer />
          </Suspense>
        </StoreProvider>,
      ),
    );
    expect(container.textContent).toBe('Loading');

    // React retries a boundary when a context value that a suspended
    // component read changes, even if the component never committed. A store
    // update should do the same.
    //
    // The store subscribes in a layout effect, which a component that
    // suspended on mount never ran, so nothing re-renders and the boundary
    // shows its fallback forever.
    await act(async () => {
      store.dispatch(fulfilled('Result'));
    });
    logger.assertLog(['Result']);
    expect(container.textContent).toBe('Result');
  });

  it('an update retries a boundary whose new reader suspended during an update', async () => {
    const store = createStore(
      setState<Thenable<string>>,
      new Promise<string>(() => {}),
    );

    function Consumer() {
      const value = use(useStore(store));
      logger.log(value);
      return <span>{value}</span>;
    }

    let setShow: (value: boolean) => void;
    function Show() {
      const [show, _setShow] = useState(false);
      setShow = _setShow;
      return show ? <Consumer /> : 'Nothing';
    }

    const {container} = await act(async () =>
      render(
        <StoreProvider>
          <Suspense fallback="Loading">
            <Show />
          </Suspense>
        </StoreProvider>,
      ),
    );
    expect(container.textContent).toBe('Nothing');

    await act(async () => {
      setShow(true);
    });
    expect(container.textContent).toBe('Loading');

    // Same as above: the new reader never subscribed, so the update doesn't
    // retry its boundary.
    await act(async () => {
      store.dispatch(fulfilled('Result'));
    });
    logger.assertLog(['Result']);
    expect(container.textContent).toBe('Result');
  });
});

describe('Experimental store: hydration', () => {
  it('an update before a reader hydrates does not cause a hydration mismatch', async () => {
    const store = createStore(setState<string>, 'A');
    let resolve: () => void;
    const promise = new Promise<void>(r => (resolve = r));
    let suspend = false;

    function Reader() {
      const value = useStore(store);
      if (suspend) {
        throw promise;
      }
      return value;
    }

    function App() {
      return (
        <StoreProvider>
          <Suspense fallback="Loading">
            <Reader />
          </Suspense>
        </StoreProvider>
      );
    }

    const container = document.createElement('div');
    container.innerHTML = renderToString(<App />);
    expect(container.textContent).toBe('A');

    // Keep the reader's boundary dehydrated while the store is updated.
    suspend = true;
    const errors: Array<string> = [];
    await act(async () => {
      hydrateRoot(container, <App />, {
        onRecoverableError(error) {
          errors.push((error as Error).message);
        },
      });
    });
    await act(async () => {
      store.dispatch('B');
    });

    suspend = false;
    await act(async () => {
      resolve();
    });

    // Like useState, or useSyncExternalStore with getServerSnapshot, the
    // reader should hydrate with the value the server rendered, then update.
    //
    // The store hydrates the reader with "B", which doesn't match the server
    // HTML, so React discards the HTML and renders the boundary on the client.
    expect(errors).toEqual([]);
    expect(container.textContent).toBe('B');
  });
});
