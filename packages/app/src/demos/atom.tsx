import {
  startTransition,
  use,
  useState,
  useSyncExternalStore,
} from "react";
import { createStore, useStore } from "react-concurrent-store";
import { Blocked, Side } from "../compare";
import { makeGate, type Gate } from "../gate";
import { useSignal } from "../ui";

/**
 * Redux keeps everything in one atom, and a Redux app dispatches to it at both
 * urgencies: a slow filter change belongs in a transition, a keystroke does
 * not. The caller can already say which is which — `dispatch(x)` against
 * `startTransition(() => dispatch(x))`. Nothing else in React needs telling
 * twice.
 *
 * Three columns, because both of the obvious answers are wrong and seeing only
 * one of them makes the other look fine.
 */

type Period = "week" | "year";
type State = { period: Period; search: string };
type Action = { type: "period"; to: Period } | { type: "search"; text: string };

const initial: State = { period: "week", search: "" };

const reduce = (state: State, action: Action): State =>
  action.type === "period"
    ? { ...state, period: action.to }
    : { ...state, search: action.text };

type Policy = "uses" | "always" | "mixed";

type Column = {
  store: ReturnType<typeof createStore<State, Action>>;
  use: <T>(select: (state: State) => T) => T;
  setPeriod: (to: Period) => void;
  setSearch: (text: string) => void;
};

const makeColumn = (policy: Policy): Column => {
  const store = createStore<State, Action>(initial, reduce);
  const subscribe = (onChange: () => void) => store.subscribe(() => onChange());
  const read = <T,>(select: (state: State) => T) =>
    policy === "uses"
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useSyncExternalStore(
          subscribe,
          () => select(store.getState()),
          // The third argument useStore does not need.
          () => select(store.getState()),
        )
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useStore(store, select);
  return {
    store,
    use: read,
    // A slow change belongs in a transition in every column. That is not the
    // variable here.
    setPeriod: (to) =>
      startTransition(() => store.dispatch({ type: "period", to })),
    // The keystroke is the variable. "always" is the naive fix for the de-opt:
    // put every dispatch in a transition and the store can never flush one.
    setSearch: (text) =>
      policy === "always"
        ? startTransition(() => store.dispatch({ type: "search", text }))
        : store.dispatch({ type: "search", text }),
  };
};

function makeLoaders(gate: Gate) {
  const ready = Promise.resolve("ready");
  let year: Promise<string> | null = null;
  return {
    for: (period: Period) =>
      period === "week"
        ? ready
        : (year ??= (gate.promise() ?? Promise.resolve()).then(() => "ready")),
    reset() {
      year = null;
    },
  };
}

const TOTALS: Record<Period, number> = { week: 1284, year: 61203 };

function Dashboard({
  column,
  loaders,
}: {
  column: Column;
  loaders: ReturnType<typeof makeLoaders>;
}) {
  const period = column.use((state) => state.period);
  use(loaders.for(period));
  return <Panel column={column} period={period} />;
}

function Panel({ column, period }: { column: Column; period: Period }) {
  const search = column.use((state) => state.search);
  return (
    <div className="mock">
      <div className="crumb">
        <span>revenue</span>
        <span>/</span>
        <span className="where">{period}</span>
      </div>
      <div className="body">
        <div className="stat">
          <span className="k">orders this {period}</span>
          <span className="v">{TOTALS[period].toLocaleString()}</span>
        </div>
        <div className="echo">
          <span className="lbl">filter</span>
          <span className="val">
            {search === "" ? <em>type above…</em> : search}
          </span>
        </div>
      </div>
    </div>
  );
}

export function AtomPage() {
  const [{ gate, uses, always, mixed, loaders }, reset] = useReset();
  const held = useSignal(gate.held);
  const [typed, setTyped] = useState("");

  const columns = [uses, always, mixed];

  const slowSwitch = () => {
    gate.hold();
    loaders.reset();
    for (const column of columns) column.setPeriod("year");
  };

  const type = (text: string) => {
    setTyped(text);
    for (const column of columns) column.setSearch(text);
  };

  const blocked = (
    <Blocked
      what="loading the year…"
      why="The transition was flushed synchronously, so the period moved before its data arrived."
    />
  );
  const waiting = (
    <Blocked
      what="loading the year…"
      why="Still in a transition, as it should be — the old dashboard should be on screen."
    />
  );

  return (
    <>
      <div className="lede">
        <h2>One atom, two urgencies</h2>
        <p>
          Press <b>Switch to year</b> — a slow query, held open — and then{" "}
          <b>type in the filter box</b>. Every column puts the slow change in a
          transition. They differ in what they do with the keystroke.
        </p>
        <p>
          Both obvious answers are wrong, which is why this needs three columns
          and not two.
        </p>
      </div>
      <div className="ab">
        <div className="bar">
          <button onClick={slowSwitch} disabled={held}>
            Switch to year
          </button>
          <input
            className="field"
            value={typed}
            placeholder="filter orders…"
            onChange={(event) => type(event.target.value)}
          />
          <button onClick={() => gate.release()} disabled={!held}>
            Year data arrives
          </button>
          <span className="spacer" />
          <button onClick={reset}>Reset</button>
        </div>
        <div className="pair">
          <Side
            how="useSyncExternalStore"
            tag="today"
            kind="today"
            fallback={blocked}
            note={
              held ? (
                <>
                  <b>The dashboard is gone.</b> The reader opted the transition
                  out, so the period committed without its data. Nothing to type
                  into.
                </>
              ) : (
                <>What react-redux&rsquo;s useSelector does today.</>
              )
            }
          >
            <Dashboard column={uses} loaders={loaders} />
          </Side>
          <Side
            how="useStore, every dispatch in a transition"
            tag="the naive fix"
            kind="naive"
            fallback={waiting}
            note={
              held ? (
                <>
                  <b>Your keystrokes are not landing.</b> The old dashboard is
                  still up, which is right — but the keystroke was made a
                  transition too, so it is queued behind a query that has not
                  come back.
                </>
              ) : (
                <>Never flushes, so nothing urgent can overtake anything slow.</>
              )
            }
          >
            <Dashboard column={always} loaders={loaders} />
          </Side>
          <Side
            how="useStore, urgency per dispatch"
            tag="this package"
            kind="ours"
            fallback={waiting}
            note={
              held ? (
                <>
                  <b>Old dashboard, live filter.</b> The keystroke folds over
                  what is on screen instead of over the year that has not
                  arrived, and both are in order once it does.
                </>
              ) : (
                <>
                  The caller says which is which, the same way React always has.
                </>
              )
            }
          >
            <Dashboard column={mixed} loaders={loaders} />
          </Side>
        </div>
      </div>
    </>
  );
}

function useReset() {
  const build = () => {
    const gate = makeGate();
    return {
      gate,
      uses: makeColumn("uses"),
      always: makeColumn("always"),
      mixed: makeColumn("mixed"),
      loaders: makeLoaders(gate),
    };
  };
  const [state, setState] = useState(build);
  return [state, () => setState(build())] as const;
}
