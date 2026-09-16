"use client";

import { startTransition, use, useState } from "react";
import { createStore, useStore } from "react-concurrent-store";
import { hueFor } from "../palette";

export type Row = { id: string; name: string; region: string; orders: number };

type Store = ReturnType<typeof createStore<Promise<Row[]>>>;

/**
 * The server started this fetch and did not await it. React serialized the
 * promise across the boundary, so what arrives here is a thenable that settles
 * when the server streams the value in.
 *
 * It goes straight in as the store's initial value.
 */
export function StreamedClient({ rows }: { rows: Promise<Row[]> }) {
  const [store] = useState<Store>(() => createStore<Promise<Row[]>>(rows));
  return <Table store={store} />;
}

function Table({ store }: { store: Store }) {
  const data = use(useStore(store));

  const refetch = () => {
    startTransition(() =>
      store.dispatch(
        new Promise<Row[]>((resolve) =>
          setTimeout(
            () => resolve(data.map((row) => ({ ...row, orders: row.orders + 10 }))),
            600,
          ),
        ),
      ),
    );
  };

  return (
    <section className="side ours">
      <header>
        <code className="how">use(useStore(store))</code>
        <span className="tag">streamed from the server</span>
      </header>
      <div className="mock">
        <div className="crumb">
          <span>accounts</span>
          <span>/</span>
          <span className="where">{data.length} rows</span>
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
      <div className="controls">
        <button onClick={refetch}>Refetch in a Transition</button>
      </div>
    </section>
  );
}
