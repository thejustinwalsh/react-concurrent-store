"use client";

import { flushSync } from "react-dom";
import {
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createStore, useStore } from "react-concurrent-store";

/**
 * Measured in a browser, on a production build, against animation frames —
 * because the alternatives lie. jsdom is not a renderer, and React's
 * development build does work per `use()` on a thenable that production does
 * not.
 *
 * The number is updates committed per second with N readers subscribed: one
 * dispatch per animation frame, for a fixed window.
 */

type S = { n: number };

export type Row = {
  how: string;
  readers: number;
  /** Wall time for one dispatch committed to the DOM, back to back. */
  msPerCommit: number;
  /** Animation frames in one second while dispatching on every frame. */
  fps: number | null;
};

function UsesReader({ store }: { store: Store }) {
  const subscribe = useCallback(
    (cb: () => void) => store.subscribe(() => cb()),
    [store],
  );
  const snapshot = useCallback(() => store.getState().n, [store]);
  return <i>{useSyncExternalStore(subscribe, snapshot, snapshot)}</i>;
}

function StoreReader({ store }: { store: Store }) {
  return <i>{useStore(store, (s: S) => s.n)}</i>;
}

type Store = ReturnType<typeof createStore<S, number>>;

function Readers({ store, how, n }: { store: Store; how: How; n: number }) {
  const Reader = how === "uses" ? UsesReader : StoreReader;
  return (
    <div className="swarm">
      {Array.from({ length: n }, (_, i) => (
        <Reader key={i} store={store} />
      ))}
    </div>
  );
}

type How = "uses" | "store";

const LABEL: Record<How, string> = {
  uses: "useSyncExternalStore",
  store: "useStore",
};

export function MeasurePage() {
  const [readers, setReaders] = useState(400);
  const [how, setHow] = useState<How>("store");
  const [store] = useState<Store>(() =>
    createStore<S, number>({ n: 0 }, (_s, k) => ({ n: k })),
  );
  const [rows, setRows] = useState<Row[]>([]);
  const [running, setRunning] = useState(false);
  const busy = useRef(false);
  const version = useRef(1);

  const run = () => {
    if (busy.current) return;
    busy.current = true;
    setRunning(true);

    // Measured against the swarm that is already mounted. Building a fresh
    // store here meant the first dispatches were timed across a remount of
    // every reader, which is why the same configuration could read 1.4ms once
    // and 31ms the next time.
    setTimeout(() => {
      // Back-to-back dispatches, flushed synchronously. This is the number
      // that does not depend on the tab being composited, so it is the one to
      // trust when something else is driving the browser.
      const runs = 50;
      let k = version.current;
      flushSync(() => store.dispatch(k++));
      const started = performance.now();
      for (let i = 0; i < runs; i++) flushSync(() => store.dispatch(k++));
      const msPerCommit = (performance.now() - started) / runs;

      // Frames, for the same work paced by the display. Only meaningful in a
      // foreground tab: a browser throttles requestAnimationFrame otherwise,
      // and a throttled number here reads as a slow store rather than a
      // sleeping compositor.
      let frames = 0;
      const frameStart = performance.now();
      const step = () => {
        frames += 1;
        store.dispatch(k++);
        if (performance.now() - frameStart < 1000) {
          requestAnimationFrame(step);
          return;
        }
        setRows((previous) => [
          {
            how: LABEL[how],
            readers,
            msPerCommit: +msPerCommit.toFixed(3),
            fps: frames < 5 ? null : frames,
          },
          ...previous,
        ]);
        version.current = k;
        setRunning(false);
        busy.current = false;
      };
      requestAnimationFrame(step);
    }, 50);
  };

  return (
    <div className="ab">
      <div className="bar">
        <label className="pick">
          readers
          <select
            className="field"
            value={readers}
            disabled={running}
            onChange={(e) => setReaders(Number(e.target.value))}
          >
            {[100, 400, 1600].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="pick">
          read with
          <select
            className="field"
            value={how}
            disabled={running}
            onChange={(e) => setHow(e.target.value as How)}
          >
            <option value="store">useStore</option>
            <option value="uses">useSyncExternalStore</option>
          </select>
        </label>
        <button onClick={run} disabled={running}>
          {running ? "measuring…" : "Measure 2s"}
        </button>
        <span className="spacer" />
        <button onClick={() => setRows([])} disabled={running || rows.length === 0}>
          Clear
        </button>
      </div>

      {rows.length > 0 && (
        <table className="results">
          <thead>
            <tr>
              <th>read with</th>
              <th>readers</th>
              <th>ms per commit</th>
              <th>frames / s</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>
                  <code>{r.how}</code>
                </td>
                <td>{r.readers}</td>
                <td>{r.msPerCommit}</td>
                <td>{r.fps ?? "needs a foreground tab"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Readers store={store} how={how} n={readers} />
    </div>
  );
}
