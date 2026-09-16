import { Suspense, startTransition, use, useState } from "react";
import { createStore, useStore } from "react-concurrent-store";
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
type Deferred = { promise: Promise<string>; resolve: (name: string) => void };

const deferred = (): Deferred => {
  let resolve!: (name: string) => void;
  const promise = new Promise<string>((r) => (resolve = r));
  return { promise, resolve };
};

function Reader({
  store,
  probe,
  recorder,
}: {
  store: Store;
  probe: Probe;
  recorder: Recorder;
}) {
  const name = use(useStore(store));
  const ref = useReport(probe, recorder, "reader", name);
  return <Chip ref={ref} name="reader" value={name} />;
}

/**
 * The fallback reports through its own ref callback. Its attach and detach are
 * the only honest signal that the tree went to the fallback — counting renders
 * would also count renders React discarded while retrying.
 */
function Fallback({ probe, recorder }: { probe: Probe; recorder: Recorder }) {
  const ref = useReport(probe, recorder, "fallback", "loading", false);
  return (
    <Chip ref={ref} name="fallback" value="loading…" state="pending" probe={false} />
  );
}

/**
 * Two claims that only mean something together: a sync update to a pending
 * promise *should* show the fallback, and the same update inside a transition
 * *should not*. useSyncExternalStore cannot keep the second — its update is
 * forced to sync priority, so the tree drops to the fallback either way.
 */
export function SuspenseScenario() {
  const [{ store, recorder, probe }] = useState(() => ({
    store: createStore<Promise<string>>(Promise.resolve("ada")),
    recorder: createRecorder(),
    probe: createProbe(),
  }));
  const [pending, setPending] = useState<Deferred | null>(null);

  const load = (inTransition: boolean) => {
    const next = deferred();
    setPending(next);
    recorder.push("dispatch", inTransition ? "load (transition)" : "load (sync)");
    if (inTransition) {
      startTransition(() => store.dispatch(next.promise));
    } else {
      store.dispatch(next.promise);
    }
  };

  // How many times the fallback has been attached to the DOM.
  const fallbacks = () => probe.commits("fallback", "ref");

  const { verdict, run } = useScript(recorder, async (script) => {
    store.dispatch(Promise.resolve("ada"));
    setPending(null);
    await script.step("start on a resolved promise");
    script.check("reader shows it", probe.value("reader"), "ada");

    // --- the fallback you asked for ---------------------------------------
    let seen = fallbacks();
    const first = deferred();
    store.dispatch(first.promise);
    await script.step("dispatch a pending promise synchronously");
    script.check("the fallback was shown", fallbacks() > seen, true);
    script.check("and it is on screen now", probe.present("fallback", "ref"), true);

    first.resolve("bob");
    setPending(null);
    await script.step("resolve it");
    script.check("reader shows the new value", probe.value("reader"), "bob");
    script.check("the fallback is gone", probe.present("fallback", "ref"), false);

    // --- the one you did not ----------------------------------------------
    seen = fallbacks();
    const second = deferred();
    startTransition(() => store.dispatch(second.promise));
    setPending(second);
    await script.step("dispatch a pending promise inside a transition");
    script.check("no fallback this time", fallbacks(), seen);
    script.check("the old value stays on screen", probe.value("reader"), "bob");

    second.resolve("cleo");
    setPending(null);
    await script.step("resolve it");
    script.check("reader moves on", probe.value("reader"), "cleo");
    script.check("still no fallback", fallbacks(), seen);
  });

  return (
    <div data-scenario="suspense">
      <Card
        title="Suspense"
        rule="A Transition must not produce a fallback"
        recorder={recorder}
        stage={
          <div className="readers">
            <Suspense fallback={<Fallback probe={probe} recorder={recorder} />}>
              <Reader store={store} probe={probe} recorder={recorder} />
            </Suspense>
            {pending !== null && (
              <Chip
                name="in flight"
                value="unresolved"
                state="pending"
                probe={false}
              />
            )}
          </div>
        }
        controls={
          <>
            <button onClick={() => load(false)} disabled={pending !== null}>
              load (sync)
            </button>
            <button onClick={() => load(true)} disabled={pending !== null}>
              load (transition)
            </button>
            <button
              onClick={() => {
                pending?.resolve("bob");
                setPending(null);
              }}
              disabled={pending === null}
            >
              resolve
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
