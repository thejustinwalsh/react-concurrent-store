import { use, useDeferredValue, useState, useTransition } from "react";
import { createStore, useStore } from "react-concurrent-store";
import { Blocked, Side } from "../compare";
import { Lede, TryIt } from "../prose";
import { hueFor } from "../palette";
import { makeGate, type Gate } from "../gate";
import { useSignal } from "../ui";

/**
 * fate's `useRequest` ends in `use(useDeferredValue(promise))`: a transition
 * rebuilt by hand at the read site, because the request is read as a promise
 * rather than as state. It works, and for a plain refetch there is nothing
 * between it and this.
 *
 * The ceiling is that a deferred value can only hold the value that was there
 * before. It cannot hold that value with the thing you just did applied,
 * because there is one value and one urgency.
 *
 * Not a claim about TanStack Query, whose cache holds resolved data
 * (`QueryState.data`) rather than a promise — `setQueryData` during a refetch
 * of the same key lands fine. Its friction is the `useSyncExternalStore`
 * de-opt, which is the Router page.
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

/**
 * fate's line, verbatim. The previous promise stays while the next one loads,
 * and comparing the deferred value with the current one is how React suggests
 * you tell that it is stale.
 */
function Deferred({ promise }: { promise: Promise<Message[]> }) {
  const deferred = useDeferredValue(promise);
  const stale = deferred !== promise;
  return (
    <Side
      how="use(useDeferredValue(promise))"
      tag="fate"
      kind="today"
      pending={stale}
      fallback={<Blocked what="loading…" why="Nothing to show yet." />}
      note={
        stale ? (
          <>
            <b>Still showing the inbox.</b> Now mark it read.
          </>
        ) : (
          <>Holds the previous promise while the next one loads.</>
        )
      }
    >
      <List messages={use(deferred)} />
    </Side>
  );
}

function Stored({ store, pending }: { store: Store; pending: boolean }) {
  const state = useStore(store);
  return (
    <Side
      how="use(useStore(store))"
      tag="this package"
      kind="ours"
      pending={pending}
      fallback={<Blocked what="loading…" why="Nothing to show yet." />}
      note={
        pending ? (
          <>
            <b>Still showing the inbox.</b> An edit now applies to this list, not
            to the fetch that has not returned.
          </>
        ) : (
          <>Holds the previous value because the caller said it could wait.</>
        )
      }
    >
      <List messages={isPending(state) ? use(state) : state} />
    </Side>
  );
}

type Store = ReturnType<typeof createStore<State>>;

export function FetchingPage() {
  const [{ gate, store, initial }, reset] = useReset();
  const [promise, setPromise] = useState(initial);
  const held = useSignal(gate.held);
  const [transitionPending, startTransition] = useTransition();

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
      <Lede
        title="Updating data while it refetches"
        learn={[
          "What useDeferredValue does for a refetch, and does well",
          "Where a single deferred value runs out",
          "Why a store can show the old list with your edit applied",
        ]}
      >
        <p>
          <code>useDeferredValue</code> keeps the previous value on screen while
          a new one loads, so a refetch does not drop to a fallback.{" "}
          fate&rsquo;s read Hook ends in{" "}
          <code>use(useDeferredValue(promise))</code> for exactly that.
        </p>
        <TryIt
          steps={[
            <>
              Click <b>Open archive</b>. The fetch is held open.
            </>,
            <>
              Click <b>Mark all read</b> while you wait, then{" "}
              <b>Archive data arrives</b>.
            </>,
          ]}
        />
        <p>
          Both columns keep the inbox on screen, which is the part{" "}
          <code>useDeferredValue</code> gets right. Notice what happens on the
          second click: the left column still shows two unread. Its edit was
          applied to the fetch that has not returned, and the deferred value is
          still the untouched old list.
        </p>
        <p>
          A deferred value holds the value that was there before. It cannot hold
          that value with your change applied, because there is one value and one
          urgency. Two folds can.
        </p>
      </Lede>
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
          <Deferred promise={promise} />
          <Stored store={store} pending={transitionPending} />
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
