// Cases where the stable store doesn't behave like React state
// (useState/useReducer). Each test asserts what React state does, and the
// comments explain what the store does instead.
import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import {render, act} from '@testing-library/react';
import {useEffect, useLayoutEffect} from 'react';
import {flushSync} from 'react-dom';

import {createStore, useStore} from './index';
import Logger from '../test/TestLogger';

let logger: Logger;

beforeEach(() => {
  logger = new Logger();
});

afterEach(() => {
  logger.assertLog([]);
});

describe('Stable store: updates', () => {
  it('reads updates made before the first reader mounts', async () => {
    const store = createStore(1);
    store.update(2);
    store.update(3);

    function App() {
      const value = useStore(store);
      logger.log(value);
      return <span>{value}</span>;
    }

    // The reader should mount with the latest value.
    //
    // The store mounts readers with the value from the last update a reader
    // rendered, so updates made while nothing read the store are ignored until
    // the next update.
    const {container} = await act(async () => render(<App />));
    logger.assertLog([3]);
    expect(container.textContent).toBe('3');
  });

  it('does not miss updates made in a layout effect before the reader subscribes', async () => {
    const store = createStore(1);

    function Updater() {
      useLayoutEffect(() => {
        logger.log('Layout effect');
        store.update(2);
      }, []);
      return null;
    }

    function Reader() {
      const value = useStore(store);
      logger.log(`Reader: ${value}`);
      return <span>{value}</span>;
    }

    // The reader should re-render with the update.
    //
    // The store subscribes in a passive effect, so it misses updates made
    // before that, and the reader shows 1 until the next update.
    const {container} = await act(async () =>
      render(
        <>
          <Updater />
          <Reader />
        </>,
      ),
    );
    logger.assertLog(['Reader: 1', 'Layout effect', 'Reader: 2']);
    expect(container.textContent).toBe('2');
  });

  it('renders a reader once per update', async () => {
    const store = createStore(0);

    function Reader() {
      const value = useStore(store);
      logger.log(value);
      return <span>{value}</span>;
    }

    await act(async () => {
      render(<Reader />);
    });
    logger.assertLog([0]);

    // Like a useState update, the reader should render once, with the new
    // value.
    //
    // The store applies every update with useTransition's startTransition,
    // which first renders the reader again with the old value (to set
    // isPending), then with the new value.
    await act(async () => {
      store.update(1);
    });
    logger.assertLog([1]);
  });

  it('applies updates inside flushSync synchronously', async () => {
    const store = createStore(0);

    function Reader() {
      const value = useStore(store);
      logger.log(`Count: ${value}`);
      return <span>{value}</span>;
    }

    const {container} = await act(async () => render(<Reader />));
    logger.assertLog(['Count: 0']);

    // Updates inside flushSync are rendered before flushSync returns.
    //
    // The store applies every update in a transition, so it isn't rendered
    // until later.
    let syncText: string | null = null;
    await act(async () => {
      flushSync(() => {
        store.update(1);
      });
      syncText = container.textContent;
    });
    // Clear the log so a failure here doesn't also fail the afterEach check.
    logger._logs = [];
    expect(syncText).toBe('1');
  });

  it('does not re-render when an effect sets the value it already has', async () => {
    const store = createStore(false);
    let renders = 0;

    function Reader() {
      const value = useStore(store);
      renders++;
      useEffect(() => {
        // Guard so the test fails instead of looping forever.
        if (renders < 20) {
          store.update(true);
        }
      });
      return <span>{String(value)}</span>;
    }

    // Setting state to its current value bails out, so this settles after one
    // update: the first render, and one render with true.
    //
    // Every store update re-renders the reader (useTransition sets isPending
    // even when the value doesn't change), which runs the effect again, which
    // updates the store again, forever.
    await act(async () => {
      render(<Reader />);
    });
    expect(renders).toBeLessThanOrEqual(3);
  });
});
