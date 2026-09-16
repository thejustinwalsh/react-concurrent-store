import { use, useState, useSyncExternalStore, useTransition } from "react";
import { createStore, useStore } from "react-concurrent-store";
import { Blocked, Side } from "../compare";
import { Lede, TryIt } from "../prose";
import { hueFor } from "../palette";
import { makeGate, type Gate } from "../gate";
import { useSignal } from "../ui";

/**
 * TanStack Router drives navigation through `startTransition`. TanStack Query
 * reads through `useSyncExternalStore`. Each is right on its own, and together
 * they cancel out: a `useSyncExternalStore` reader subscribed to a store that
 * changes during a transition forces React to flush that transition
 * synchronously. The navigation lands at once, the new route has no data yet,
 * and the Suspense boundary takes the page.
 *
 * Both columns run the same actions against the same reducer. The only
 * difference is the hook that reads the route. They are separate store
 * instances so the left column's de-opt cannot drag the right one with it.
 */

type Route = "home" | "profile";
type State = {
  route: Route;
  likes: Record<string, number>;
};
type Action = { type: "navigate"; to: Route } | { type: "like"; id: string };

const FEED = [
  { id: "ada", name: "Ada Lovelace", said: "Notes on the analytical engine" },
  { id: "grace", name: "Grace Hopper", said: "Found an actual moth" },
  { id: "alan", name: "Alan Turing", said: "Halting, eventually" },
];

const initial: State = { route: "home", likes: { ada: 12, grace: 31, alan: 7 } };

const reduce = (state: State, action: Action): State => {
  switch (action.type) {
    case "navigate":
      return state.route === action.to ? state : { ...state, route: action.to };
    case "like":
      return {
        ...state,
        likes: { ...state.likes, [action.id]: state.likes[action.id] + 1 },
      };
  }
};

/** One column: its own store, and its own way of reading the route. */
type Column = {
  store: ReturnType<typeof createStore<State, Action>>;
  useRoute: () => Route;
  useLikes: () => Record<string, number>;
};

const makeColumn = (read: "uses" | "store"): Column => {
  const store = createStore<State, Action>(initial, reduce);
  const subscribe = (onChange: () => void) => store.subscribe(() => onChange());
  // A column reads all of its state the one way, so it is consistent with
  // itself and the only variable between the two is the hook.
  const pick = <T,>(select: (state: State) => T) =>
    read === "uses"
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useSyncExternalStore(
          subscribe,
          () => select(store.getState()),
          // The third argument useStore does not need: the value a store was
          // created with already is the server snapshot.
          () => select(store.getState()),
        )
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useStore(store, select);
  return {
    store,
    useRoute: () => pick((state) => state.route),
    useLikes: () => pick((state) => state.likes),
  };
};

/**
 * The profile route's data. Held open by the gate so a navigation can be
 * looked at while it is still in flight, which is the only way to see the
 * difference. One promise for both columns — `use` is happy to be handed the
 * same one twice.
 */
function makeLoaders(gate: Gate) {
  const ready = Promise.resolve("ready");
  let profile: Promise<string> | null = null;
  return {
    for(route: Route) {
      if (route === "home") return ready;
      profile ??= (gate.promise() ?? Promise.resolve()).then(() => "ready");
      return profile;
    },
    reset() {
      profile = null;
    },
  };
}

function Feed({
  likes,
  onLike,
}: {
  likes: Record<string, number>;
  onLike: (id: string) => void;
}) {
  return (
    <>
      {FEED.map((post) => (
        <div className="row" key={post.id}>
          <span className="av" style={{ background: hueFor(post.id) }}>
            {post.name[0]}
          </span>
          <span className="who">
            <b>{post.name}</b>
            <span>{post.said}</span>
          </span>
          <button className="like" onClick={() => onLike(post.id)}>
            ♥ {likes[post.id]}
          </button>
        </div>
      ))}
    </>
  );
}

function Profile({ likes }: { likes: Record<string, number> }) {
  const total = Object.values(likes).reduce((a, b) => a + b, 0);
  return (
    <div className="row" style={{ alignItems: "flex-start" }}>
      <span className="av" style={{ background: hueFor("ada") }}>
        A
      </span>
      <span className="who">
        <b>Ada Lovelace</b>
        <span>{total} hearts across the feed</span>
      </span>
    </div>
  );
}

function Screen({
  column,
  loaders,
  onLike,
}: {
  column: Column;
  loaders: ReturnType<typeof makeLoaders>;
  onLike: (id: string) => void;
}) {
  const route = column.useRoute();
  // Suspends until the route this column is showing has its data.
  use(loaders.for(route));
  return <Body column={column} route={route} onLike={onLike} />;
}

function Body({
  column,
  route,
  onLike,
}: {
  column: Column;
  route: Route;
  onLike: (id: string) => void;
}) {
  const likes = column.useLikes();
  return (
    <div className="mock">
      <div className="crumb">
        <span>app</span>
        <span>/</span>
        <span className="where">{route}</span>
      </div>
      <div className="body">
        {route === "home" ? (
          <Feed likes={likes} onLike={onLike} />
        ) : (
          <Profile likes={likes} />
        )}
      </div>
    </div>
  );
}

export function RouterPage() {
  const [{ gate, left, right, loaders }, reset] = useReset();
  const held = useSignal(gate.held);

  // One per column, so each reports its own pending state rather than sharing
  // one. Watching them is the point: the left column's Transition ends almost
  // immediately because reading the store opted it out.
  const [leftPending, startLeft] = useTransition();
  const [rightPending, startRight] = useTransition();

  const navigate = (to: Route) => {
    startLeft(() => left.store.dispatch({ type: "navigate", to }));
    startRight(() => right.store.dispatch({ type: "navigate", to }));
  };

  const like = (id: string) => {
    for (const column of [left, right]) {
      column.store.dispatch({ type: "like", id });
    }
  };

  const goProfile = () => {
    gate.hold();
    loaders.reset();
    navigate("profile");
  };

  const blocked = (
    <Blocked
      what="loading profile…"
      why="React flushed the Transition synchronously, so the route changed before its data arrived."
    />
  );

  return (
    <>
      <Lede
        title="Navigating before the data arrives"
        learn={[
          "Why a store update cancels the Transition a router started",
          "What the user sees when that happens",
          "How useStore keeps the current screen up instead",
        ]}
      >
        <p>
          A router changes the route inside <code>startTransition</code>, so
          React keeps the current screen on the page until the next one is
          ready. Both columns below dispatch exactly that way, through the same
          reducer. They differ only in the Hook that reads the route.
        </p>
        <TryIt
          steps={[
            <>
              Click <b>Go to profile</b>. Its data is held open, so the
              navigation stays in flight until you release it.
            </>,
            <>
              Click <b>Like Ada&rsquo;s post</b> while you wait, then{" "}
              <b>Profile data arrives</b>.
            </>,
          ]}
        />
        <p>
          Notice that the left column loses the feed as soon as you navigate. A
          component reading the store with <code>useSyncExternalStore</code> opts
          the Transition out, so React commits the route immediately, the profile
          has no data yet, and the Suspense boundary replaces the page.
        </p>
        <p>
          The right column stays on the feed and stays interactive. Your like
          lands on the post you are looking at, not on the profile that has not
          loaded, and both updates are in the order you made them once the
          profile arrives.
        </p>
        <p>
          That first behaviour is a documented caveat of{" "}
          <code>useSyncExternalStore</code>: a store update during a Transition
          makes React flush it synchronously. The caller already said what it
          wanted by calling <code>startTransition</code>. Only the reading Hook
          discards it.
        </p>
      </Lede>
      <div className="ab">
        <div className="bar">
          <button onClick={goProfile} disabled={held}>
            Go to profile
          </button>
          <button onClick={() => gate.release()} disabled={!held}>
            Profile data arrives
          </button>
          <button onClick={() => like("ada")}>♥ Like Ada&rsquo;s post</button>
          {held && <span className="held">loader held</span>}
          <span className="spacer" />
          <button onClick={reset}>Reset</button>
        </div>
        <div className="pair">
          <Side
            how="useSyncExternalStore"
            tag="blocking"
            kind="today"
            pending={leftPending}
            fallback={blocked}
            note={
              held ? (
                <>
                  <b>The feed is gone.</b> The route committed before its data
                  existed, so the Suspense boundary took the page. There is
                  nothing here to like.
                </>
              ) : (
                <>Reads the route the way store libraries read one today.</>
              )
            }
          >
            <Screen column={left} loaders={loaders} onLike={like} />
          </Side>
          <Side
            how="useStore"
            tag="transition"
            kind="ours"
            pending={rightPending}
            fallback={blocked}
            note={
              held ? (
                <>
                  <b>Still on the feed.</b> The navigation is in flight. A like
                  you dispatch now applies to the feed you can see, and is still
                  in order when the profile arrives.
                </>
              ) : (
                <>Reads the route with <code>useStore</code>.</>
              )
            }
          >
            <Screen column={right} loaders={loaders} onLike={like} />
          </Side>
        </div>
      </div>
    </>
  );
}

/** A fresh pair of stores, so Reset is a real reset and not an undo. */
function useReset() {
  const build = () => {
    const gate = makeGate();
    return {
      gate,
      left: makeColumn("uses"),
      right: makeColumn("store"),
      loaders: makeLoaders(gate),
    };
  };
  const [state, setState] = useState(build);
  return [state, () => setState(build())] as const;
}
