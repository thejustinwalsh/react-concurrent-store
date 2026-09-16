import { startTransition, use, useState } from "react";
import { createStore, useStore } from "react-concurrent-store";
import { Boundary } from "../Boundary";
import {
  Card,
  Chip,
  createProbe,
  createRecorder,
  useReport,
  useScript,
  type Probe,
  type Recorder,
} from "../ui";

type Store = ReturnType<typeof createStore<Promise<string>>>;

const settled = (value: string) => Promise.resolve(value);

const rejecting = (message: string) => {
  const p = Promise.reject(new Error(message));
  // The handle carries the promise without adopting it. This only quiets the
  // browser's unhandled-rejection warning for the copy held here.
  p.catch(() => {});
  return p as Promise<string>;
};

function Reader({
  store,
  recorder,
  probe,
}: {
  store: Store;
  recorder: Recorder;
  probe: Probe;
}) {
  const name = use(useStore(store));
  useReport(probe, recorder, "reader", name);
  return <Chip name="reader" value={name} />;
}

function Guarded({
  store,
  recorder,
  probe,
  onCaught,
}: {
  store: Store;
  recorder: Recorder;
  probe: Probe;
  onCaught: (error: Error) => void;
}) {
  // The promise currently in the store is the reset key. A boundary reset
  // while the store still holds the rejected promise just throws again, so
  // moving the store on is what actually clears it.
  const current = useStore(store);
  return (
    <Boundary
      resetKeys={[current]}
      onCaught={onCaught}
      fallback={(error, reset) => (
        <>
          <Chip name="boundary" value={`caught: ${error.message}`} probe={false} />
          <button data-role="reset-only" onClick={reset}>
            reset only
          </button>
          <button
            className="run"
            onClick={() => {
              store.dispatch(settled("grace"));
              reset();
            }}
          >
            reset + retry
          </button>
        </>
      )}
    >
      <Reader store={store} recorder={recorder} probe={probe} />
    </Boundary>
  );
}

export function ErrorResetScenario() {
  const [{ store, recorder, probe, catches }] = useState(() => ({
    store: createStore<Promise<string>>(settled("ada")),
    recorder: createRecorder(),
    probe: createProbe(),
    // The count lives in a closure, not as a field on a value React handed
    // back: mutating one of those is what react-hooks/immutability is for.
    catches: (() => {
      let count = 0;
      return { bump: () => (count += 1), count: () => count };
    })(),
  }));

  const onCaught = (error: Error) => {
    catches.bump();
    recorder.push("note", `caught ${error.message}`);
  };

  const { verdict, run } = useScript(recorder, async (script) => {
    store.dispatch(settled("ada"));
    await script.step("start on a resolved promise");
    script.check("reader shows the value", probe.value("reader"), "ada");
    const before = catches.count();

    store.dispatch(rejecting("network"));
    await script.step("dispatch a rejecting promise");
    script.check("the boundary caught it", catches.count() - before, 1);

    document
      .querySelector<HTMLButtonElement>(
        "[data-scenario='error-reset'] [data-role='reset-only']",
      )
      ?.click();
    await script.step("reset the boundary without moving the store on");
    script.check("it throws straight back", catches.count() - before, 2);

    store.dispatch(settled("grace"));
    await script.step("dispatch a good promise, which is the reset key");
    script.check("recovered", probe.value("reader"), "grace");
    script.check("and stayed recovered", catches.count() - before, 2);
  });

  return (
    <div data-scenario="error-reset">
      <Card
        title="Error boundaries"
        rule="Resetting one needs the store to move on"
proves={
        "use() rethrows the same rejection every time it reads it, so " +
        "resetting the boundary renders the same rejected promise and " +
        "throws again — watch the catch count climb. What clears it is the " +
        "store holding something else, which makes the store's current " +
        "value a workable reset key."
      }
        recorder={recorder}
        stage={
          <div className="readers">
            <Guarded
              store={store}
              recorder={recorder}
              probe={probe}
              onCaught={onCaught}
            />
          </div>
        }
        controls={
          <>
            <button onClick={() => store.dispatch(settled("ada"))}>
              resolve ada
            </button>
            <button onClick={() => store.dispatch(rejecting("network"))}>
              reject
            </button>
            <button
              onClick={() =>
                startTransition(() => store.dispatch(rejecting("slow fail")))
              }
            >
              reject in a transition
            </button>
            <button className="run" onClick={run}>
              Run
            </button>
          </>
        }
        verdict={verdict}
      />
    </div>
  );
}
