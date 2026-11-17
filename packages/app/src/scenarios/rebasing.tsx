import { Suspense, startTransition, use, useState } from "react";
import { createStore, useStore } from "react-concurrent-store";
import { makeGate, type Gate } from "../gate";
import {
  Card,
  Chip,
  StoreValue,
  createProbe,
  createRecorder,
  useReport,
  useScript,
  useSignal,
  type Probe,
  type Recorder,
} from "../ui";

type Store = ReturnType<typeof createStore<string>>;

const show = (s: unknown) => (s === "" ? "∅" : String(s));

function Reader({
  store,
  gate,
  probe,
  recorder,
}: {
  store: Store;
  gate: Gate;
  probe: Probe;
  recorder: Recorder;
}) {
  const applied = useStore(store);
  // Uppercase is the slow letter: it holds until the gate is released.
  const held = gate.promise();
  if (held !== null && /[A-Z]/.test(applied)) use(held);
  const ref = useReport(probe, recorder, "on screen", applied);
  return <Chip ref={ref} name="on screen" value={show(applied)} />;
}

function Held({ probe, recorder }: { probe: Probe; recorder: Recorder }) {
  // reader = false: worth seeing arrive and leave, but not a reader of the
  // store, so it stays out of agreement.
  const ref = useReport(probe, recorder, "fallback", "held", false);
  return (
    <Chip ref={ref} name="fallback" value="held…" state="pending" probe={false} />
  );
}

function Controls({
  gate,
  onSync,
  onSlow,
  onReset,
  run,
}: {
  gate: Gate;
  onSync: (letter: string) => void;
  onSlow: (letter: string) => void;
  onReset: () => void;
  run: () => void;
}) {
  const held = useSignal(gate.held);
  return (
    <>
      <button onClick={() => onSync("b")}>append b (sync)</button>
      <button onClick={() => onSync("c")}>append c (sync)</button>
      <button onClick={() => onSlow("A")}>append A (transition, holds)</button>
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
 * Letters, not a counter. A counter shows that a number changed; letters show
 * *where* an action ended up, which is the whole of rebasing: a sync action
 * lands on what is on screen now, and is re-ordered behind the held transition
 * when that transition finally commits.
 */
export function RebasingScenario() {
  const [{ store, recorder, probe, gate }] = useState(() => ({
    // No reducer, so an action is a replacement value or an updater. That lets
    // a rerun start from a known state instead of accumulating.
    store: createStore(""),
    recorder: createRecorder(),
    probe: createProbe(),
    gate: makeGate(),
  }));

  const held = useSignal(gate.held);

  const sync = (letter: string) => {
    recorder.push("dispatch", `${letter} sync`);
    store.dispatch((s) => s + letter);
  };

  const slow = (letter: string) => {
    gate.hold();
    recorder.push("dispatch", `${letter} transition`);
    startTransition(() => store.dispatch((s) => s + letter));
  };

  const reset = () => {
    gate.release();
    store.dispatch("");
  };

  const onScreen = () => probe.value("on screen") ?? "";

  const { verdict, run } = useScript(recorder, async (script) => {
    reset();
    // Counts are cumulative over the panel's life; a rerun measures itself.
    probe.resetCounts();
    await script.wait(300);
    script.check("starts empty", onScreen(), "");

    slow("A");
    await script.step("append A inside a held transition");
    script.check("the store has A", store.getState(), "A");
    script.check("the screen does not", onScreen(), "");

    sync("b");
    await script.step("append b synchronously");
    script.check("the store has A then b", store.getState(), "Ab");
    script.check("the screen applied it to what it shows", onScreen(), "b");
    script.check("and never showed a fallback", probe.commits("fallback", "ref"), 0);

    sync("c");
    await script.step("append c synchronously");
    script.check("the store has A b c", store.getState(), "Abc");
    script.check("the screen still has no A", onScreen(), "bc");

    gate.release();
    await script.step("release the transition");
    script.check("the screen takes the dispatch order", onScreen(), "Abc");
    script.check("and agrees with the store", onScreen(), store.getState());
  });

  return (
    <div data-scenario="rebasing">
      <Card
        title="Rebasing"
        rule="A blocking update applies to what is on screen"
        proves="Each letter is an action."
        recorder={recorder}
        stage={
          <div className="readers">
            <Suspense fallback={<Held probe={probe} recorder={recorder} />}>
              <Reader
                store={store}
                gate={gate}
                probe={probe}
                recorder={recorder}
              />
            </Suspense>
            <StoreValue store={store} pending={held} format={show} />
          </div>
        }
        controls={
          <Controls
            gate={gate}
            onSync={sync}
            onSlow={slow}
            onReset={reset}
            run={run}
          />
        }
        verdict={verdict}
      />
    </div>
  );
}
