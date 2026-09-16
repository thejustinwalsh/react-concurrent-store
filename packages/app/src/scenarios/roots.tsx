import {
  StrictMode,
  Suspense,
  startTransition,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import { createStore, useStore } from "react-concurrent-store";
import { makeGate, type Gate } from "../gate";
import {
  Agreement,
  Card,
  Chip,
  createProbe,
  createRecorder,
  useReport,
  useScript,
  useSignal,
  type Probe,
  type Recorder,
} from "../ui";

type Store = ReturnType<typeof createStore<number>>;

type Props = { store: Store; probe: Probe; recorder: Recorder };

function ReaderA({ store, probe, recorder, gate }: Props & { gate: Gate }) {
  const n = useStore(store);
  const held = gate.promise();
  if (held !== null && n > 1) use(held);
  const ref = useReport(probe, recorder, "root A", n);
  return <Chip ref={ref} name="root A" value={n} />;
}

/** Rendered into the second root, so it takes what it needs as props. */
function ReaderB({ store, probe, recorder }: Props) {
  const n = useStore(store);
  const ref = useReport(probe, recorder, "root B", n);
  return <Chip ref={ref} name="root B (strict)" value={n} />;
}

function Held({ probe, recorder }: { probe: Probe; recorder: Recorder }) {
  const ref = useReport(probe, recorder, "fallback", "held", false);
  return (
    <Chip ref={ref} name="fallback" value="held…" state="pending" probe={false} />
  );
}

function Controls({
  gate,
  onSync,
  onBlockedBump,
  onReset,
  run,
}: {
  gate: Gate;
  onSync: () => void;
  onBlockedBump: () => void;
  onReset: () => void;
  run: () => void;
}) {
  const held = useSignal(gate.held);
  return (
    <>
      <button onClick={onSync}>+1 sync</button>
      <button onClick={onBlockedBump} disabled={held}>
        +1 in a blocked transition
      </button>
      <button onClick={() => gate.release()} disabled={!held}>
        release
      </button>
      <button onClick={onReset}>reset</button>
      <button className="run" onClick={run}>
        Run
      </button>
    </>
  );
}

/**
 * Two React roots, one store, no provider. The roots know nothing about each
 * other — React gives no cross-root commit guarantee — so the store is the
 * only thing keeping them in step. The second is wrapped in StrictMode, so its
 * reader is double-rendered while the first root's is not.
 */
export function RootsScenario() {
  const [{ store, recorder, probe, gate }] = useState(() => ({
    store: createStore(1),
    recorder: createRecorder(),
    probe: createProbe(),
    gate: makeGate(),
  }));

  const mount = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = mount.current;
    if (host === null) return;
    // Its own container: passing the same node to createRoot twice is an
    // error, and this effect can run again.
    const container = document.createElement("div");
    host.appendChild(container);
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <div className="readers">
          <ReaderB store={store} probe={probe} recorder={recorder} />
        </div>
      </StrictMode>,
    );
    return () => {
      // Out of the commit React is in while this cleanup runs.
      setTimeout(() => {
        root.unmount();
        container.remove();
      }, 0);
    };
  }, [store, probe, recorder]);

  const blockedBump = () => {
    gate.hold();
    recorder.push("dispatch", "+1 transition");
    startTransition(() => store.dispatch((n) => n + 1));
  };

  const { verdict, run } = useScript(recorder, async (script) => {
    gate.release();
    store.dispatch(1);
    await script.wait(350);
    script.check("both roots start together", probe.agree(), true);
    script.check("on the same value", probe.snapshot(), {
      "root A": 1,
      "root B": 1,
    });

    store.dispatch((n) => n + 1);
    await script.step("dispatch once, synchronously");
    script.check("both roots moved together", probe.snapshot(), {
      "root A": 2,
      "root B": 2,
    });

    blockedBump();
    await script.step("dispatch in a transition root A blocks on");
    script.check("root B does not run ahead", probe.agree(), true);

    store.dispatch((n) => n + 1);
    await script.step("interrupt it with a sync dispatch");
    script.check("still one value across both roots", probe.agree(), true);

    gate.release();
    await script.step("release");
    script.check("both land together", probe.agree(), true);
    script.check(
      "on the chronological value",
      probe.value("root A"),
      store.getState(),
    );
    // Eventual convergence is not the claim. No commit in between disagreed.
    script.check("no commit was ever torn", probe.tears(), []);
  });

  return (
    <div data-scenario="roots">
      <Card
        title="Multiple roots"
        rule="One store can serve two roots with no provider"
        recorder={recorder}
        stage={
          <>
            <div className="readers">
              <Suspense fallback={<Held probe={probe} recorder={recorder} />}>
                <ReaderA
                  store={store}
                  probe={probe}
                  recorder={recorder}
                  gate={gate}
                />
              </Suspense>
            </div>
            <div ref={mount} />
            <div className="readers">
              <Agreement probe={probe} />
            </div>
          </>
        }
        controls={
          <Controls
            gate={gate}
            onSync={() => store.dispatch((n) => n + 1)}
            onBlockedBump={blockedBump}
            onReset={() => {
              gate.release();
              store.dispatch(1);
            }}
            run={run}
          />
        }
        verdict={verdict}
      />
    </div>
  );
}
