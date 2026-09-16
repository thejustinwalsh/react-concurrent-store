import { startTransition, use, useDeferredValue, useState } from "react";
import { createStore, useStore } from "react-concurrent-store";
import { Blocked, Side } from "../compare";
import { hueFor } from "../palette";
import { makeGate, type Gate } from "../gate";
import { useSignal } from "../ui";

/**
 * Fate's read hooks are `use(useDeferredValue(promise))` and
 * `use(useDeferredValue(useSyncExternalStore(...)))`. TanStack Query spells the
 * same idea `placeholderData: keepPreviousData`. Both are a transition rebuilt
 * by hand at the read site, because the reading hook threw the real one away.
 *
 * They work, and for a plain refetch there is nothing between them and this.
 * The ceiling is that a deferred value can only hold the value that was there
 * before. It cannot hold the value that was there before plus the thing you
 * just did — there is one value and one urgency, so an optimistic patch and a
 * slow refetch cannot both win.
 *
 * Both columns hold a promise of the same messages and refetch in the same way.
 */

type Message = { id: string; from: string; subject: string; read: boolean };
type Folder = "inbox" | "archive";

/**
 * The store holds the messages, and a refetch puts a promise in it for as long
 * as it takes. Rebasing folds actions over values, so a store whose state is
 * permanently a promise has nothing to fold an urgent update onto — keep the
 * data, and let the promise be the transient.
 */
type State = Message[] | Promise<Message[]>;

const isPending = (state: State): state is Promise<Message[]> =>
  state instanceof Promise;

const MESSAGES: Record<Folder, Message[]> = {
  inbox: [
    { id: "1", from: "Ada", subject: "Engine notes, part four", read: false },
    { id: "2", from: "Grace", subject: "Re: the moth", read: false },
    { id: "3", from: "Alan", subject: "Does this terminate?", read: true },
  ],
  archive: [
    { id: "4", from: "Katherine", subject: "Trajectory checked", read: true },
    { id: "5", from: "Margaret", subject: "Apollo build 2.1", read: false },
  ],
};

const markAllRead = (messages: Message[]) =>
  messages.map((message) => ({ ...message, read: true }));

/** A fetch for a folder, held open by the gate so it can be looked at. */
const fetchFolder = (folder: Folder, gate: Gate): Promise<Message[]> =>
  folder === "inbox"
    ? Promise.resolve(MESSAGES.inbox)
    : (gate.promise() ?? Promise.resolve()).then(() => MESSAGES.archive);

function List({ messages }: { messages: Message[] }) {
  const unread = messages.filter((message) => !message.read).length;
  return (
    <div className="mock">
      <div className="crumb">
        <span>mail</span>
        <span>/</span>
        <span className="where">{unread} unread</span>
      </div>
      <div className="body">
        {messages.map((message) => (
          <div className={message.read ? "row ghost" : "row"} key={message.id}>
            <span className="av" style={{ background: hueFor(message.from.toLowerCase()) }}>
              {message.from[0]}
            </span>
            <span className="who">
              <b>{message.from}</b>
              <span>{message.subject}</span>
            </span>
            <span className="like">{message.read ? "read" : "new"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Fate's line, verbatim: the previous promise stays while the next one loads. */
function Deferred({ promise }: { promise: Promise<Message[]> }) {
  return <List messages={use(useDeferredValue(promise))} />;
}

function Stored({ store }: { store: Store }) {
  const state = useStore(store);
  return <List messages={isPending(state) ? use(state) : state} />;
}

type Store = ReturnType<typeof createStore<State>>;

export function FetchingPage() {
  const [{ gate, store, initial }, reset] = useReset();
  const [promise, setPromise] = useState(initial);
  const held = useSignal(gate.held);

  const openArchive = () => {
    gate.hold();
    const next = fetchFolder("archive", gate);
    // Both columns refetch the same way. This is not the variable.
    setPromise(next);
    startTransition(() => store.dispatch(next));
  };

  // The urgent one: patch what is on screen, now. Both columns express it the
  // same way — derive the next value from the current one.
  const readAll = () => {
    setPromise((current) => current.then(markAllRead));
    store.dispatch((current: State) =>
      isPending(current) ? current.then(markAllRead) : markAllRead(current),
    );
  };

  const startOver = () => {
    gate.release();
    reset();
    setPromise(Promise.resolve(MESSAGES.inbox));
  };

  return (
    <>
      <div className="lede">
        <h2>A refetch you can still act on</h2>
        <p>
          Press <b>Open archive</b> — held open — and then{" "}
          <b>Mark all read</b>. Both columns keep the old list up rather than
          dropping to a fallback, which is what a deferred value is for and what
          it is good at.
        </p>
        <p>
          The difference is the second press. A deferred value can hold what was
          there before; it cannot hold what was there before with your change
          applied, because there is one value and one urgency.
        </p>
      </div>
      <div className="ab">
        <div className="bar">
          <button onClick={openArchive} disabled={held}>
            Open archive
          </button>
          <button onClick={readAll}>Mark all read</button>
          <button onClick={() => gate.release()} disabled={!held}>
            Archive data arrives
          </button>
          <span className="spacer" />
          <button onClick={startOver}>Reset</button>
        </div>
        <div className="pair">
          <Side
            how="use(useDeferredValue(promise))"
            tag="fate · keepPreviousData"
            kind="today"
            fallback={<Blocked what="loading…" why="Nothing to show yet." />}
            note={
              held ? (
                <>
                  <b>Marked read, still showing unread.</b> The patch was applied
                  to the fetch that has not come back, so the deferred value is
                  still the untouched old list.
                </>
              ) : (
                <>Holds the previous promise while the next one loads.</>
              )
            }
          >
            <Deferred promise={promise} />
          </Side>
          <Side
            how="use(useStore(store))"
            tag="this package"
            kind="ours"
            fallback={<Blocked what="loading…" why="Nothing to show yet." />}
            note={
              held ? (
                <>
                  <b>Marked read on the list you are looking at.</b> The patch
                  folded over what is on screen rather than over the fetch, and
                  the archive arrives already read.
                </>
              ) : (
                <>Holds the previous value because the caller said to.</>
              )
            }
          >
            <Stored store={store} />
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
      // The deferred column holds a promise, because that is what fate holds.
      initial: Promise.resolve(MESSAGES.inbox),
      // The store holds the data.
      store: createStore<State>(MESSAGES.inbox),
    };
  };
  const [state, setState] = useState(build);
  return [state, () => setState(build())] as const;
}
