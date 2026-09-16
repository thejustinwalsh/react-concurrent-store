import { Activity, Suspense, startTransition, use, useState } from "react";
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

function Gated({ store, probe, recorder, gate }: Props & { gate: Gate }) {
  const n = useStore(store);
  const held = gate.promise();
  if (held !== null && n > 1) use(held);
  const ref = useReport(probe, recorder, "gated", n);
  return <Chip ref={ref} name="gated" value={n} />;
}

function Late({ store, probe, recorder }: Props) {
  const n = useStore(store);
  const ref = useReport(probe, recorder, "revealed", n);
  return <Chip ref={ref} name="revealed" value={n} />;
}

function Hiding({ store, probe, recorder }: Props) {
  const n = useStore(store);
  const ref = useReport(probe, recorder, "activity", n);
  return <Chip ref={ref} name="activity" value={n} />;
}

function Held({ probe, recorder }: { probe: Probe; recorder: Recorder }) {
  const ref = useReport(probe, recorder, "fallback", "held", false);
  return (
    <Chip ref={ref} name="fallback" value="held…" state="pending" probe={false} />
  );
}

function Controls({
  gate,
  revealed,
  hidden,
  onReveal,
  onHide,
  onBlockedBump,
  run,
}: {
  gate: Gate;
  revealed: boolean;
  hidden: boolean;
  onReveal: () => void;
  onHide: () => void;
  onBlockedBump: () => void;
  run: () => void;
}) {
  const held = useSignal(gate.held);
  return (
    <>
      <button onClick={onBlockedBump} disabled={held}>
        +1 in a blocked transition
      </button>
      <button onClick={onReveal}>
        {revealed ? "hide" : "reveal"} second reader
      </button>
      <button onClick={onHide}>
        {hidden ? "show" : "hide"} Activity tree
      </button>
      <button onClick={() => gate.release()} disabled={!held}>
        release
      </button>
      <button className="run" onClick={run}>
        Run
      </button>
    </>
  );
}

/**
 * A reader that appears while a transition is still blocked must show what its
 * siblings show. The tempting move — join head inside startTransition — starts
 * a *second* transition, which commits the moment nothing in it suspends while
 * the first is still waiting. The new reader then displays a version no other
 * reader on the page has.
 */
export function TearingScenario() {
  const [{ store, recorder, probe, gate }] = useState(() => ({
    store: createStore(1),
    recorder: createRecorder(),
    probe: createProbe(),
    gate: makeGate(),
  }));

  const [revealed, setRevealed] = useState(false);
  const [hidden, setHidden] = useState(true);
  const props = { store, probe, recorder };

  const blockedBump = () => {
    gate.hold();
    recorder.push("dispatch", "+1 transition");
    startTransition(() => store.dispatch((n) => n + 1));
  };

  const { verdict, run } = useScript(recorder, async (script) => {
    gate.release();
    setRevealed(false);
    setHidden(true);
    store.dispatch(1);
    probe.resetCounts();
    // Watch what each painted frame actually showed, not just what committed.
    const stopWatching = probe.watchFrames();
    await script.wait(350);

    blockedBump();
    await script.step("dispatch inside a transition the gated reader blocks");
    script.check("nothing moved", probe.snapshot(), { gated: 1 });

    setRevealed(true);
    await script.step("reveal a second reader while it is still blocked");
    script.check("every reader agrees", probe.agree(), true);
    script.check("on the value already on screen", probe.snapshot(), {
      gated: 1,
      revealed: 1,
    });

    setHidden(false);
    await script.step("show the hidden Activity tree as well");
    script.check("still one value committed", probe.agree(), true);
    // A hidden tree has no attached nodes; showing it is what attaches them.
    script.check("and it is attached now", probe.value("activity", "ref"), 1);

    gate.release();
    await script.step("release the transition");
    script.check("all three move together", probe.snapshot(), {
      gated: 2,
      revealed: 2,
      activity: 2,
    });
    script.check("and agree once attached too", probe.agree("ref"), true);
    script.check("no fallback was ever shown", probe.commits("fallback", "ref"), 0);
    // Not "do they agree now" — no commit along the way disagreed either.
    script.check("no commit was ever torn", probe.tears(), []);

    stopWatching();
    // The repair a reader makes when it lands behind runs in a layout effect,
    // which flushes before paint — so it should never get a frame of its own.
    const painted = probe.frames();
    script.check(
      "no painted frame was torn",
      painted.filter((f) => new Set(Object.values(f)).size > 1),
      [],
    );
    script.check(
      "every painted frame showed a value the tree committed",
      painted.every((f) => Object.values(f).every((v) => v === 1 || v === 2)),
      true,
    );
  });

  return (
    <div data-scenario="tearing">
      <Card
        title="Tearing"
        rule="A component mounting mid-Transition shows what its siblings show"
proves={
        "A component that appears while a Transition is blocked must " +
        "display what the rest of the page is displaying, not the value the " +
        "Transition is waiting on. Otherwise one part of the screen is " +
        "ahead of the rest, which is a tear. Reveal a second reader, or an " +
        "Activity tree, while the Transition is held."
      }
        recorder={recorder}
        stage={
          <>
            <div className="readers">
              <Suspense fallback={<Held probe={probe} recorder={recorder} />}>
                <Gated {...props} gate={gate} />
                {revealed && <Late {...props} />}
                <Activity mode={hidden ? "hidden" : "visible"}>
                  <Hiding {...props} />
                </Activity>
              </Suspense>
            </div>
            <div className="readers">
              <Agreement probe={probe} />
            </div>
          </>
        }
        controls={
          <Controls
            gate={gate}
            revealed={revealed}
            hidden={hidden}
            onReveal={() => setRevealed((r) => !r)}
            onHide={() => setHidden((h) => !h)}
            onBlockedBump={blockedBump}
            run={run}
          />
        }
        verdict={verdict}
      />
    </div>
  );
}
