"use client";

import { use, useState, useTransition } from "react";
import { createStore, useStore } from "react-concurrent-store";
import { Side } from "../compare";
import { makeGate } from "../gate";
import { hueFor } from "../palette";
import { useSignal } from "../ui";

export type Row = { id: string; name: string; region: string; orders: number };

type Store = ReturnType<typeof createStore<Promise<Row[]>>>;

/**
 * The server started this fetch and did not await it. React serialized the
 * promise across the boundary, so what arrives here is a thenable that settles
 * when the server streams the value in. It goes straight in as the store's
 * initial value.
 */
export function StreamedClient({ rows }: { rows: Promise<Row[]> }) {
  const [{ store, gate }] = useState(() => ({
    store: createStore<Promise<Row[]>>(rows),
    gate: makeGate(),
  }));
  const [pending, startTransition] = useTransition();
  const held = useSignal(gate.held);
  const [batch, setBatch] = useState(1);

  // Held open on purpose, so the in-flight state lasts as long as you want to
  // look at it rather than a few hundred milliseconds.
  const refetch = () => {
    gate.hold();
    // Read the current rows before dispatching. Reading them inside the chain
    // would call getState() after the dispatch had already put this very
    // promise there, and a promise that resolves to itself never settles.
    const current = store.getState();
    const next = Promise.all([current, gate.promise()]).then(([rows]) =>
      rows.map((row) => ({ ...row, orders: row.orders + 10 })),
    );
    startTransition(() => store.dispatch(next));
  };

  const arrive = () => {
    setBatch((n) => n + 1);
    gate.release();
  };

  return (
    <div className="ab">
      <div className="bar">
        <button onClick={refetch} disabled={held}>
          Refetch in a Transition
        </button>
        <button onClick={arrive} disabled={!held}>
          New rows arrive
        </button>
        {held && <span className="held">fetch in flight</span>}
      </div>
      <div className="pair">
        <Side
          how="use(useStore(store))"
          tag="streamed"
          kind="ours"
          pending={pending}
          fallback={
            <div className="mock">
              <div className="blocked">
                <span className="big">streaming…</span>
              </div>
            </div>
          }
          note={
            held ? (
              <>
                <b>The rows stayed on screen.</b> The refetch is in flight and the
                store was told it could wait, so nothing fell back.
              </>
            ) : (
              <>
                These rows arrived as a promise the server never awaited.
                Batch {batch}.
              </>
            )
          }
        >
          <Table store={store} batch={batch} />
        </Side>
      </div>
    </div>
  );
}

function Table({ store, batch }: { store: Store; batch: number }) {
  const data = use(useStore(store));
  return (
    <div className="mock">
      <div className="crumb">
        <span>accounts</span>
        <span>/</span>
        <span className="where">batch {batch}</span>
      </div>
      <div className="body">
        {data.map((row) => (
          <div className="row" key={row.id}>
            <span className="av" style={{ background: hueFor(row.id) }}>
              {row.name[0]}
            </span>
            <span className="who">
              <b>{row.name}</b>
              <span>{row.region}</span>
            </span>
            <span className="like">{row.orders}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
