import {
  createContext,
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ track */

export type Mark = {
  kind: "render" | "dispatch" | "note";
  text: string;
  at: number;
};

export type Recorder = {
  marks: Mark[];
  push(kind: Mark["kind"], text: string): void;
  clear(): void;
  subscribe(listener: () => void): () => void;
  /** Monotonic, so a snapshot can be compared by value. */
  version(): number;
};

export function createRecorder(): Recorder {
  const marks: Mark[] = [];
  const listeners = new Set<() => void>();
  let queued = false;
  let version = 0;

  // Readers record from inside their own render, so telling the track about it
  // straight away would be a setState during someone else's render. The mark
  // is kept immediately; only the notification waits for the microtask.
  const announce = () => {
    version += 1;
    if (queued) return;
    queued = true;
    queueMicrotask(() => {
      queued = false;
      for (const l of listeners) l();
    });
  };

  return {
    version: () => version,
    marks,
    push(kind, text) {
      marks.push({ kind, text, at: performance.now() });
      announce();
    },
    clear() {
      marks.length = 0;
      announce();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

/* ------------------------------------------------------------------ probe */

/**
 * Bookkeeping kept outside React entirely, recorded in all three phases a
 * reader passes through, each with its own teardown:
 *
 *   ref     the value attached to a live DOM node (React 19 ref callbacks
 *           return their own cleanup, which runs on detach)
 *   layout  the value committed, before paint
 *   effect  the value still standing once passive effects have run
 *
 * They can disagree, and which one disagrees is the interesting part. A
 * disagreement at `layout` was on screen in a single commit. Something present
 * at `layout` but absent at `ref` was committed into a hidden tree.
 *
 * Only entries marked as readers count towards agreement. A Suspense fallback
 * reports too — its arrival and departure are worth seeing — but it is not a
 * reader of the store and comparing it against one says nothing.
 */
export type Phase = "ref" | "layout" | "effect";

export type Probe = {
  report(name: string, phase: Phase, value: unknown, reader: boolean): void;
  forget(name: string, phase: Phase): void;
  value(name: string, phase?: Phase): unknown;
  values(phase?: Phase): unknown[];
  agree(phase?: Phase): boolean;
  commits(name: string, phase?: Phase): number;
  snapshot(phase?: Phase): Record<string, unknown>;
  present(name: string, phase?: Phase): boolean;
  /**
   * Every commit in which the readers did not agree, appended and never
   * cleared. Checking agreement after a delay cannot tell "never torn" from
   * "torn, then repaired on the next commit" — only a history can.
   */
  tears(): ReadonlyArray<Record<string, unknown>>;
  /**
   * What the readers showed in each painted frame, sampled once per animation
   * frame and recorded only when it changes. A commit whose repair runs in a
   * layout effect never reaches a frame of its own, because layout effects
   * flush before paint — so this is the only thing that can tell a render the
   * user saw from one they did not.
   */
  watchFrames(): () => void;
  frames(): ReadonlyArray<Record<string, unknown>>;
  /**
   * Clears the counters but keeps what each reader is currently showing.
   * Clearing the values too would drop live readers that have no reason to
   * re-render, and they would never report again.
   */
  resetCounts(): void;
  subscribe(listener: () => void): () => void;
  /** Monotonic, so a snapshot can be compared by value. */
  version(): number;
};

export function createProbe(): Probe {
  const cells = new Map<Phase, Map<string, unknown>>([
    ["ref", new Map()],
    ["layout", new Map()],
    ["effect", new Map()],
  ]);
  const counts = new Map<string, number>();
  const readers = new Set<string>();
  const order: string[] = [];
  const listeners = new Set<() => void>();
  const tears: Array<Record<string, unknown>> = [];
  const frames: Array<Record<string, unknown>> = [];
  let queued = false;
  let version = 0;

  const cell = (phase: Phase) => cells.get(phase)!;
  const key = (name: string, phase: Phase) => `${phase}:${name}`;
  const readerNames = (phase: Phase) =>
    order.filter((name) => readers.has(name) && cell(phase).has(name));

  // Reported from effects, so a listener is told on a microtask rather than
  // synchronously inside someone else's commit.
  // One check per commit, on a microtask: every layout effect in that commit
  // has run by then, and paint has not happened yet. Checking inside a report
  // would see the commit half-applied and call every commit torn.
  const announce = () => {
    version += 1;
    if (queued) return;
    queued = true;
    queueMicrotask(() => {
      queued = false;
      const names = order.filter(
        (name) => readers.has(name) && cell("layout").has(name),
      );
      const shown = names.map((name) => cell("layout").get(name));
      if (new Set(shown).size > 1) {
        tears.push(Object.fromEntries(names.map((n, i) => [n, shown[i]])));
      }
      for (const l of listeners) l();
    });
  };

  const snapshotOf = (phase: Phase) => {
    const names = order.filter(
      (name) => readers.has(name) && cell(phase).has(name),
    );
    return Object.fromEntries(names.map((n) => [n, cell(phase).get(n)]));
  };

  return {
    version: () => version,
    tears: () => tears,
    frames: () => frames,
    watchFrames() {
      let live = true;
      let previous = "";
      const sample = () => {
        if (!live) return;
        // Sampled in a frame callback, so this is what the frame showed.
        const shown = JSON.stringify(snapshotOf("ref"));
        if (shown !== previous) {
          previous = shown;
          frames.push(JSON.parse(shown) as Record<string, unknown>);
        }
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
      return () => {
        live = false;
      };
    },
    report(name, phase, value, reader) {
      if (!order.includes(name)) order.push(name);
      if (reader) readers.add(name);
      cell(phase).set(name, value);
      const k = key(name, phase);
      counts.set(k, (counts.get(k) ?? 0) + 1);
      announce();
    },
    forget(name, phase) {
      cell(phase).delete(name);
      announce();
    },
    value: (name, phase = "layout") => cell(phase).get(name),
    values: (phase = "layout") =>
      readerNames(phase).map((name) => cell(phase).get(name)),
    agree(phase = "layout") {
      return new Set(readerNames(phase).map((n) => cell(phase).get(n))).size <= 1;
    },
    commits: (name, phase = "layout") => counts.get(key(name, phase)) ?? 0,
    snapshot: (phase = "layout") =>
      Object.fromEntries(
        readerNames(phase).map((name) => [name, cell(phase).get(name)]),
      ),
    present: (name, phase = "layout") => cell(phase).has(name),
    resetCounts() {
      counts.clear();
      tears.length = 0;
      frames.length = 0;
      announce();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

/**
 * Report what this reader attached, committed and settled on. Returns a ref
 * callback for the caller to put on its DOM node; the ref's own cleanup is
 * what tells the probe the node went away, which is how a hidden Activity tree
 * or a departing fallback becomes visible to it.
 */
export function useReport(
  probe: Probe,
  recorder: Recorder,
  name: string,
  value: unknown,
  reader = true,
) {
  const attach = useCallback(
    (node: HTMLElement | null) => {
      if (node === null) return;
      probe.report(name, "ref", value, reader);
      return () => probe.forget(name, "ref");
    },
    [probe, name, value, reader],
  );

  useLayoutEffect(() => {
    probe.report(name, "layout", value, reader);
    return () => probe.forget(name, "layout");
  });

  useEffect(() => {
    probe.report(name, "effect", value, reader);
    recorder.push("render", `${name} ${String(value)}`);
    return () => probe.forget(name, "effect");
  });

  return attach;
}

/**
 * Reads agreement by subscribing, not by reading the probe during render:
 * the probe is written from effects, so a render-time read is always a commit
 * behind and would call a settled screen torn.
 */
export function Agreement({ probe }: { probe: Probe }) {
  useSyncExternalStore(probe.subscribe, probe.version);
  const torn = !probe.agree();
  const values = probe.values();
  const history = probe.tears();
  const everTorn = history.length > 0;
  return (
    <Chip
      name="agreement"
      probe={false}
      value={
        values.length === 0
          ? "no readers"
          : torn
            ? `TORN ${JSON.stringify(probe.snapshot())}`
            : everTorn
              ? `repaired, but torn in ${history.length} commit(s): ${JSON.stringify(history[0])}`
              : `consistent · ${String(values[0])}`
      }
      state={torn || everTorn ? "torn" : undefined}
    />
  );
}

/* ----------------------------------------------------------------- signal */

/**
 * The smallest external store that will do, for state the panels keep outside
 * React — whether a gate is held, for instance. Read with useSyncExternalStore
 * rather than by forcing the panel to re-render: a panel-wide re-render is a
 * *sync* render of a subtree that may be suspended, which makes React commit a
 * fallback that the concurrent path would never have shown. That is an
 * artefact of the harness, and it does not belong in a reading.
 */
export type Signal<T> = {
  get(): T;
  set(value: T): void;
  subscribe(listener: () => void): () => void;
};

export function createSignal<T>(initial: T): Signal<T> {
  let value = initial;
  const listeners = new Set<() => void>();
  return {
    get: () => value,
    set(next) {
      if (Object.is(next, value)) return;
      value = next;
      for (const l of listeners) l();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export function useSignal<T>(signal: Signal<T>): T {
  return useSyncExternalStore(signal.subscribe, signal.get);
}

/**
 * The store's chronological state — every action in the order dispatched —
 * read through the public `subscribe`/`getState` pair rather than through
 * useStore, so it is not a reader of the store and shows head rather than
 * what any tree is displaying.
 */
export function Chronological<S, A>({
  store,
  pending,
  format = String,
}: {
  store: {
    getState(): S;
    subscribe(callback: (action: A) => void): () => void;
  };
  pending?: boolean;
  format?: (value: S) => string;
}) {
  const state = useSyncExternalStore(
    (onChange: () => void) => store.subscribe(onChange),
    () => store.getState(),
  );
  return (
    <Chip
      name="chronological"
      probe={false}
      value={format(state)}
      state={pending ? "pending" : undefined}
    />
  );
}

const RecorderContext = createContext<Recorder | null>(null);

export function RecorderProvider({
  recorder,
  children,
}: {
  recorder: Recorder;
  children: ReactNode;
}) {
  return <RecorderContext value={recorder}>{children}</RecorderContext>;
}

/** `use`, not `useContext` — this reads fine inside a branch. */
export function useRecorder(): Recorder {
  const recorder = use(RecorderContext);
  if (recorder === null) throw new Error("No recorder in scope");
  return recorder;
}

export function Track({ recorder }: { recorder: Recorder }) {
  // Debug readouts mirroring a mutable source outside React, which is exactly
  // what useSyncExternalStore is for. The store itself avoids it because of
  // the transition de-opt; a readout of what already happened does not care.
  useSyncExternalStore(recorder.subscribe, recorder.version);
  const shown = recorder.marks.slice(-26);
  return (
    <div className="track">
      {shown.length === 0 ? (
        <span className="t">idle</span>
      ) : (
        shown.map((m, i) => (
          <span key={i} className={`t ${m.kind}`}>
            {m.text}
          </span>
        ))
      )}
    </div>
  );
}

/* ------------------------------------------------------------------- chip */

/**
 * A reader's current value. Flashes on every render so a render you did not
 * expect is visible rather than inferred.
 */
export function Chip({
  name,
  value,
  state,
  probe = true,
  ref,
}: {
  name: string;
  value: ReactNode;
  state?: "pending" | "torn";
  /**
   * Whether this chip is a reader of the store. Status and fallback chips are
   * not, and must stay out of any "do all readers agree" reading.
   */
  probe?: boolean;
  /**
   * A ref callback, which React 19 lets return its own cleanup. That cleanup
   * firing is how the probe learns a node left the DOM — which is what
   * happens to a Suspense fallback, an error fallback, or a hidden Activity
   * tree, none of which announce themselves any other way.
   */
  ref?: (node: HTMLElement | null) => (() => void) | void;
}) {
  const node = useRef<HTMLSpanElement | null>(null);

  // Composed, so the caller's ref still gets the node and still gets to return
  // its own cleanup.
  const attach = useCallback(
    (element: HTMLSpanElement | null) => {
      node.current = element;
      const release = ref?.(element);
      return () => {
        node.current = null;
        release?.();
      };
    },
    [ref],
  );

  // The flash is decoration, so it is driven straight on the element rather
  // than through state — setting state here would schedule a render for every
  // value a reader shows. Reading offsetWidth restarts the CSS animation.
  useEffect(() => {
    const element = node.current;
    if (element === null) return;
    element.classList.remove("flash");
    void element.offsetWidth;
    element.classList.add("flash");
  }, [value]);

  return (
    <span
      ref={attach}
      className={`chip${state ? ` ${state}` : ""}`}
      data-reader={probe ? name : undefined}
      data-value={String(value)}
    >
      <span className="name">{name}</span>
      <span className="value">{value}</span>
    </span>
  );
}

/* ------------------------------------------------------------------- card */

export type Check = { label: string; got: string; want: string; ok: boolean };

export type Verdict =
  | { kind: "idle" }
  | { kind: "running"; step: string }
  | { kind: "done"; ok: boolean; checks: Check[]; error?: string };

/**
 * The verdict is its own component reading its own signal. If the panel
 * re-rendered on every step, that would be a *sync* render of a subtree whose
 * pending transition state suspends — which makes React commit a fallback the
 * concurrent path would never have shown. The harness must not be able to
 * change the thing it is measuring.
 */
function VerdictRow({ verdict: signal }: { verdict: Signal<Verdict> }) {
  const verdict = useSignal(signal);
  const light =
    verdict.kind === "running"
      ? "wait"
      : verdict.kind === "done"
        ? verdict.ok
          ? "ok"
          : "bad"
        : "";
  const message =
    verdict.kind === "running"
      ? verdict.step
      : verdict.kind === "done"
        ? (verdict.error ??
          (verdict.ok ? "every reading matched" : "a reading did not match"))
        : "drive it by hand, or press Run";
  return (
    <>
      <div className="verdict">
        <span className={`light ${light}`} />
        <span
          className={`msg${verdict.kind === "done" ? (verdict.ok ? " ok" : " bad") : ""}`}
        >
          {message}
        </span>
      </div>
      {verdict.kind === "done" && verdict.checks.length > 0 && (
        <ul className="checks">
          {verdict.checks.map((c, i) => (
            <li key={i} className={c.ok ? "ok" : "bad"}>
              <span className="mark">{c.ok ? "✓" : "✗"}</span>
              <span className="label">{c.label}</span>
              <span className="got">{c.ok ? c.got : `${c.got} ≠ ${c.want}`}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function Card({
  title,
  proves,
  stage,
  controls,
  recorder,
  verdict,
}: {
  title: string;
  proves: string;
  stage: ReactNode;
  controls: ReactNode;
  recorder: Recorder;
  verdict: Signal<Verdict>;
}) {
  return (
    <section className="card">
      <header>
        <h2>{title}</h2>
        <p className="proves">{proves}</p>
      </header>
      <div className="stage">
        {stage}
        <Track recorder={recorder} />
      </div>
      <div className="controls">{controls}</div>
      <VerdictRow verdict={verdict} />
    </section>
  );
}

/* ----------------------------------------------------------------- script */

/**
 * Every panel's scripted run, in mount order. They run one after another
 * rather than together: six panels driving transitions at once contend for the
 * main thread, and a scripted wait that was long enough alone stops being long
 * enough under that load. Sequential is also what you want to watch.
 */
const runners = new Map<number, () => Promise<void>>();
let nextRunnerId = 0;

export async function runEveryScenario(): Promise<void> {
  for (const id of Array.from(runners.keys()).sort((a, b) => a - b)) {
    await runners.get(id)?.();
  }
}

export type Script = {
  step(label: string): Promise<void>;
  check(label: string, got: unknown, want: unknown): void;
  wait(ms?: number): Promise<void>;
  /**
   * Wait for something observable instead of for a duration. Two frames and a
   * macrotask is not "React has committed" — not for a suspended transition,
   * an interrupted one, time-sliced work, or hydration.
   */
  until(what: string, ready: () => boolean, timeout?: number): Promise<void>;
};

/** Two frames and a macrotask: React has rendered and committed by then. */
export const settle = (): Promise<void> =>
  new Promise((resolve) =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setTimeout(resolve, 0)),
    ),
  );

/**
 * Runs a scenario's scripted sequence slowly enough to watch, recording each
 * reading. `beat` is the pause between steps.
 */
export function useScript(
  recorder: Recorder,
  body: (script: Script) => Promise<void>,
  beat = 520,
) {
  const [verdict] = useState(() => createSignal<Verdict>({ kind: "idle" }));
  const running = useRef(false);
  const [id] = useState(() => nextRunnerId++);
  const latest = useRef<() => Promise<void>>(async () => {});

  const run = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    recorder.clear();
    const checks: Check[] = [];
    const script: Script = {
      async step(label) {
        verdict.set({ kind: "running", step: label });
        recorder.push("note", label);
        await settle();
        await new Promise((r) => setTimeout(r, beat));
      },
      check(label, got, want) {
        const g = JSON.stringify(got);
        const w = JSON.stringify(want);
        const ok = g === w;
        checks.push({ label, got: g, want: w, ok });
        // On the track as well, so a reading can be placed in the sequence
        // that produced it rather than only in the summary.
        recorder.push("note", `${ok ? "✓" : "✗"} ${label} ${g}`);
      },
      wait: (ms = beat) =>
        settle().then(() => new Promise<void>((r) => setTimeout(r, ms))),
      async until(what, ready, timeout = 4000) {
        const deadline = performance.now() + timeout;
        for (;;) {
          await settle();
          if (ready()) return;
          if (performance.now() > deadline) {
            throw new Error(`timed out waiting for ${what}`);
          }
          await new Promise((r) => setTimeout(r, 30));
        }
      },
    };
    try {
      await body(script);
      verdict.set({
        kind: "done",
        ok: checks.every((c) => c.ok),
        checks,
      });
    } catch (error) {
      verdict.set({
        kind: "done",
        ok: false,
        checks,
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      running.current = false;
    }
  }, [recorder, body, beat, verdict]);

  // Registered through a ref so the entry is stable even though `run` is a new
  // closure on every render.
  useEffect(() => {
    latest.current = run;
  });
  useEffect(() => {
    const call = () => latest.current();
    runners.set(id, call);
    return () => {
      runners.delete(id);
    };
  }, [id]);

  return { verdict, run };
}
