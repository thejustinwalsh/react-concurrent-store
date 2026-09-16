"use client";

import { useEffect, useState } from "react";
import { createStore, useStore } from "react-concurrent-store";

/**
 * What a store has to get right under server rendering, in a real App Router
 * pipeline rather than a test renderer.
 *
 * `useSyncExternalStore` needs a third argument, `getServerSnapshot`, and
 * throws without one — every store library has to invent a second source of
 * truth for the server. `useStore` does not, because the value a store was
 * constructed with already is that snapshot: the server renders from it, and
 * the client is constructed from the same serialized state, so the first client
 * render is the same render.
 *
 * The proof is that the numbers below were written into the HTML by the server
 * and are still the numbers after hydration, with nothing logged.
 */

export type Snapshot = {
  renderedOn: string;
  at: string;
  orders: number;
  revenue: number;
};

export function SsrDemo({ snapshot }: { snapshot: Snapshot }) {
  // One store per mount, constructed from exactly what the server rendered.
  const [store] = useState(() => createStore(snapshot));
  const state = useStore(store);

  // Hydration is the only thing an effect can tell you that render cannot: it
  // runs on the client and never on the server.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const sell = () =>
    store.dispatch({
      ...state,
      orders: state.orders + 1,
      revenue: state.revenue + 49,
    });

  return (
    <>
      <div className="lede">
        <h2>Rendered on the server, continued on the client</h2>
        <p>
          This page is server-rendered by Next. The figures below were in the
          HTML before any JavaScript ran — view source and they are there. No{" "}
          <code>getServerSnapshot</code> was supplied, because the value the
          store was created with already is one.
        </p>
      </div>
      <div className="ab">
        <div className="bar">
          <button onClick={sell}>Sell one</button>
          <span className="spacer" />
          <span className="tag-inline">
            {hydrated ? "hydrated ✓" : "server HTML, not yet hydrated"}
          </span>
        </div>
        <div className="pair">
          <section className="side ours">
            <header>
              <code className="how">useStore(store)</code>
              <span className="tag">this package</span>
            </header>
            <div className="mock">
              <div className="crumb">
                <span>rendered by</span>
                <span className="where">{state.renderedOn}</span>
                <span className="spin">{state.at}</span>
              </div>
              <div className="body">
                <div className="stat">
                  <span className="k">orders</span>
                  <span className="v">{state.orders.toLocaleString()}</span>
                </div>
                <div className="stat">
                  <span className="k">revenue</span>
                  <span className="v">
                    £{state.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <p className="note">
              <b>Same numbers before and after hydration.</b> A mismatch would
              have been logged by React and replaced this subtree; press{" "}
              <b>Sell one</b> and it carries on from the server&rsquo;s figures
              rather than from a second snapshot.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
