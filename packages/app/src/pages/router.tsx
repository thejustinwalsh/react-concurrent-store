import {
  Suspense,
  startTransition,
  use,
  useState,
  useSyncExternalStore,
} from "react";
import { createStore, useStore } from "react-concurrent-store";
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

const HUE: Record<string, string> = {
  ada: "#7aa2ff",
  grace: "#37d67a",
  alan: "#f5b14c",
};

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
        useSyncExternalStore(subscribe, () => select(store.getState()))
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
          <span className="av" style={{ background: HUE[post.id] }}>
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
      <span className="av" style={{ background: HUE.ada }}>
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

function Blocked() {
  return (
    <div className="mock">
      <div className="blocked">
        <span className="big">⏳ loading profile…</span>
        <span className="why">
          The transition was flushed synchronously, so the route moved before
          its data arrived and the boundary took the page.
        </span>
      </div>
    </div>
  );
}

function Side({
  how,
  tag,
  kind,
  note,
  children,
}: {
  how: string;
  tag: string;
  kind: "today" | "ours";
  note: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className={`side ${kind}`}>
      <header>
        <code className="how">{how}</code>
        <span className="tag">{tag}</span>
      </header>
      <Suspense fallback={<Blocked />}>{children}</Suspense>
      <p className="note">{note}</p>
    </section>
  );
}

export function RouterPage() {
  const [{ gate, left, right, loaders }, reset] = useReset();
  const held = useSignal(gate.held);

  const navigate = (to: Route) => {
    for (const column of [left, right]) {
      startTransition(() => column.store.dispatch({ type: "navigate", to }));
    }
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

  return (
    <>
      <div className="lede">
        <h2>A navigation that has not arrived yet</h2>
        <p>
          Press <b>Go to profile</b>. Its data is held open, so you are looking
          at the moment every router spends most of its time in: the
          destination is decided, the data is not there. Then try to{" "}
          <b>like a post</b> on the page you are still on.
        </p>
        <p>
          Both columns run the same actions through the same reducer, and
          navigate inside <code>startTransition</code>. The only difference is
          the hook that reads the route.
        </p>
      </div>
      <div className="ab">
        <div className="bar">
          <button onClick={goProfile} disabled={held}>
            Go to profile
          </button>
          <button onClick={() => gate.release()} disabled={!held}>
            Profile data arrives
          </button>
          <button onClick={() => like("ada")}>♥ Like Ada&rsquo;s post</button>
          <span className="spacer" />
          <button onClick={reset}>Reset</button>
        </div>
        <div className="pair">
          <Side
            how="useSyncExternalStore"
            tag="today"
            kind="today"
            note={
              held ? (
                <>
                  <b>The page is gone.</b> Reading this store with{" "}
                  <code>useSyncExternalStore</code> opted the transition out, so
                  the route committed immediately and there is nothing to like.
                </>
              ) : (
                <>Reads the route with the hook every store library uses today.</>
              )
            }
          >
            <Screen column={left} loaders={loaders} onLike={like} />
          </Side>
          <Side
            how="useStore"
            tag="this package"
            kind="ours"
            note={
              held ? (
                <>
                  <b>Still on the feed, still interactive.</b> The navigation is
                  in flight; a like dispatched now lands on the page you are
                  looking at, and is still in order when the profile arrives.
                </>
              ) : (
                <>Reads the route with this package&rsquo;s hook.</>
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
