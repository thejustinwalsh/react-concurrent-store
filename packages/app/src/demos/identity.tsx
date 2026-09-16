import { memo, useEffect, useState } from "react";
import { createStore, useStore } from "react-concurrent-store";
import { recycleNodesInto } from "../recycle";
import { Side } from "../compare";
import { Lede, TryIt } from "../prose";
import { hueFor } from "../palette";
import { createSignal, useSignal, type Signal } from "../ui";

/**
 * Relay reads a fragment out of a normalized record source, which means every
 * read builds a fresh tree: new objects all the way down, whether anything
 * changed or not. Handed to memoised components, that re-renders the entire
 * screen because one follower count moved.
 *
 * Relay's answer is `recycleNodesInto`: walk the fresh tree against the
 * previous one and put the old subtree back wherever they are deep-equal, so
 * identity survives where the data did not move. It needs the previous result,
 * which is why the selector here is `(state, previous)` rather than a state
 * and an equality function — an equality function can only say whether to keep
 * the whole thing.
 *
 * Both columns read the same records through the same projection. One recycles.
 */

type Record_ = { name: string; handle: string; posts: number; followers: number };
type Records = Record<string, Record_>;

/** The shape a component is handed, built fresh on every read. */
type View = Record<string, { name: string; handle: string; stats: { posts: number; followers: number } }>;

const project = (records: Records): View =>
  Object.fromEntries(
    Object.entries(records).map(([id, record]) => [
      id,
      {
        name: record.name,
        handle: record.handle,
        stats: { posts: record.posts, followers: record.followers },
      },
    ]),
  );

const initial: Records = {
  ada: { name: "Ada Lovelace", handle: "@ada", posts: 128, followers: 9421 },
  grace: { name: "Grace Hopper", handle: "@grace", posts: 311, followers: 18022 },
  alan: { name: "Alan Turing", handle: "@alan", posts: 74, followers: 12907 },
};

type Action = { id: string; patch: Partial<Record_> };

const reduce = (records: Records, { id, patch }: Action): Records => ({
  ...records,
  [id]: { ...records[id], ...patch },
});

/** Renders counted outside React, so counting cannot cause a render. */
type Ticks = Signal<Record<string, number>>;

const bump = (ticks: Ticks, key: string) => {
  const now = ticks.get();
  ticks.set({ ...now, [key]: (now[key] ?? 0) + 1 });
};

/**
 * Memoised, so it re-renders only when its `stats` object is a different
 * object. Whether that happens is the entire experiment.
 */
const Stats = memo(function Stats({
  id,
  stats,
  ticks,
}: {
  id: string;
  stats: { posts: number; followers: number };
  ticks: Ticks;
}) {
  // No dependency array: this runs on every render this component actually
  // does, which is what is being counted.
  useEffect(() => bump(ticks, id));
  return (
    <span className="who">
      <span>
        {stats.posts} posts · {stats.followers.toLocaleString()} followers
      </span>
    </span>
  );
});

function People({
  view,
  ticks,
}: {
  view: View;
  ticks: Ticks;
}) {
  return (
    <div className="mock">
      <div className="body">
        {Object.entries(view).map(([id, person]) => (
          <div className="row" key={id}>
            <span className="av" style={{ background: hueFor(id) }}>
              {person.name[0]}
            </span>
            <span className="who">
              <b>{person.name}</b>
              <Stats id={id} stats={person.stats} ticks={ticks} />
            </span>
          </div>
        ))}
      </div>
      <Ledger ticks={ticks} />
    </div>
  );
}

/** Outside the memoised subtree, so reading the counts cannot disturb them. */
function Ledger({ ticks }: { ticks: Ticks }) {
  const counts = useSignal(ticks);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return (
    <div className="ledger">
      <span className="k">stats rendered</span>
      {Object.keys(initial).map((id) => (
        <span className="c" key={id}>
          {id} <b>{counts[id] ?? 0}</b>
        </span>
      ))}
      <span className="tot">{total} total</span>
    </div>
  );
}

function Plain({ store, ticks }: { store: Store; ticks: Ticks }) {
  // A fresh projection every read, handed straight to the components.
  const view = useStore(store, (records: Records) => project(records));
  return <People view={view} ticks={ticks} />;
}

function Recycled({ store, ticks }: { store: Store; ticks: Ticks }) {
  // The same projection, with the unchanged subtrees put back.
  const view = useStore(store, (records: Records, previous: View | undefined) =>
    previous === undefined
      ? project(records)
      : recycleNodesInto(previous, project(records)),
  );
  return <People view={view} ticks={ticks} />;
}

type Store = ReturnType<typeof createStore<Records, Action>>;

export function IdentityPage() {
  const [{ store, plain, recycled }, reset] = useReset();

  const follow = () =>
    store.dispatch({
      id: "ada",
      patch: { followers: store.getState().ada.followers + 1 },
    });
  const rename = () =>
    store.dispatch({
      id: "grace",
      patch: { name: `Grace Hopper ${Math.floor(Math.random() * 90 + 10)}` },
    });

  return (
    <>
      <Lede
        title="Skipping re-renders with the previous result"
        learn={[
          "Why memoised components re-render for data that did not move",
          "What the second argument to a selector is for",
          "How Relay's recycleNodesInto uses it",
        ]}
      >
        <p>
          Reading from a normalized store builds a fresh object tree every time.
          Memoised components compare by identity, so they all re-render even
          though most of their data is unchanged.
        </p>
        <p>
          A selector here is called as{" "}
          <code>selector(state, previous)</code>. The second argument is its own
          previous result, so it can hand back the parts that did not move
          instead of returning all-new objects.
        </p>
        <TryIt
          steps={[
            <>
              Click <b>Ada gains a follower</b> a few times.
            </>,
            <>
              Watch <b>stats rendered</b> at the bottom of each column.
            </>,
          ]}
        />
        <p>
          Notice that only Ada&rsquo;s counter moves on the right. Grace and Alan
          came back as the objects they already were, so their{" "}
          <code>memo</code> held.
        </p>
        <p>
          An equality function cannot do this. It can only answer whether to keep
          the whole result; recycling needs the previous value itself.
        </p>
      </Lede>
      <div className="ab">
        <div className="bar">
          <button onClick={follow}>Ada gains a follower</button>
          <button onClick={rename}>Rename Grace</button>
          <span className="spacer" />
          <button onClick={reset}>Reset</button>
        </div>
        <div className="pair">
          <Side
            how="(state) => project(state)"
            tag="fresh"
            kind="today"
            fallback={null}
            note={
              <>
                <b>Everyone re-renders.</b> Ada&rsquo;s count moved, so the
                projection is new, and so is every object inside it.
              </>
            }
          >
            <Plain store={store} ticks={plain} />
          </Side>
          <Side
            how="(state, previous) => recycleNodesInto(previous, …)"
            tag="recycled"
            kind="ours"
            fallback={null}
            note={
              <>
                <b>Only Ada re-renders.</b> Grace and Alan came back as the same
                objects, so their <code>memo</code> held.
              </>
            }
          >
            <Recycled store={store} ticks={recycled} />
          </Side>
        </div>
      </div>
    </>
  );
}

function useReset() {
  const build = () => ({
    store: createStore<Records, Action>(initial, reduce),
    plain: createSignal<Record<string, number>>({}),
    recycled: createSignal<Record<string, number>>({}),
  });
  const [state, setState] = useState(build);
  return [state, () => setState(build())] as const;
}
