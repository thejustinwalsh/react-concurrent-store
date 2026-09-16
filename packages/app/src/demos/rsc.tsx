"use client";

import { useState } from "react";
import { createStore, useStore } from "react-concurrent-store";
import { hueFor } from "../palette";

/**
 * The client half of the boundary. The server component did the fetching and
 * handed over plain data; this owns the store.
 *
 * That split is not a convention this package chose — it is the only shape
 * available. A store is mutable state with subscribers, and a server component
 * runs once, has no state and no effects, so there is nothing for a store to be
 * there. The package is published with a "use client" directive for that
 * reason: importing it from a server component is a mistake worth catching at
 * build time.
 */

export type Row = { id: string; name: string; region: string; orders: number };

export function RscClient({
  rows,
  fetchedOn,
  at,
}: {
  rows: Row[];
  fetchedOn: string;
  at: string;
}) {
  // Constructed from what came across the boundary. Nothing is refetched to
  // build it, and no second snapshot is needed for the server render.
  const [store] = useState(() => createStore(rows));
  const [query, setQuery] = useState("");
  const all = useStore(store);

  const shown = all.filter((row) =>
    (row.name + row.region).toLowerCase().includes(query.toLowerCase()),
  );

  const sell = (id: string) =>
    store.dispatch(
      all.map((row) =>
        row.id === id ? { ...row, orders: row.orders + 1 } : row,
      ),
    );

  return (
    <div className="ab">
      <div className="bar">
        <input
          className="field"
          value={query}
          placeholder="filter accounts…"
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="spacer" />
        <span className="tag-inline">
          fetched on {fetchedOn} at {at}
        </span>
      </div>
      <div className="pair">
        <section className="side ours">
          <header>
            <code className="how">useStore(store)</code>
            <span className="tag">client component</span>
          </header>
          <div className="mock">
            <div className="crumb">
              <span>accounts</span>
              <span>/</span>
              <span className="where">{shown.length} shown</span>
            </div>
            <div className="body">
              {shown.map((row) => (
                <div className="row" key={row.id}>
                  <span className="av" style={{ background: hueFor(row.id) }}>
                    {row.name[0]}
                  </span>
                  <span className="who">
                    <b>{row.name}</b>
                    <span>{row.region}</span>
                  </span>
                  <button className="like" onClick={() => sell(row.id)}>
                    {row.orders}
                  </button>
                </div>
              ))}
              {shown.length === 0 && (
                <div className="row ghost">
                  <span className="who">
                    <b>Nothing matches</b>
                    <span>try a different filter</span>
                  </span>
                </div>
              )}
            </div>
          </div>
          <p className="note">
            <b>The store lives here, the fetch did not.</b> The rows arrived as
            data, the store was built from them, and the filter is ordinary
            client state on top.
          </p>
        </section>
      </div>
    </div>
  );
}
