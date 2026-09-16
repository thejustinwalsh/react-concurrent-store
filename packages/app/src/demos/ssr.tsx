"use client";

import { useState, useSyncExternalStore } from "react";
import { createStore, useStore } from "react-concurrent-store";
import { Lede, Note } from "../prose";

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

  // Whether this render is the server's or the client's. The server snapshot
  // says false and the client one says true, and a subscribe that never fires
  // means it is answered once and never again. This is the same trick useStore
  // uses internally to notice a hydration render.
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const sell = () =>
    store.dispatch({
      ...state,
      orders: state.orders + 1,
      revenue: state.revenue + 49,
    });

  return (
    <>
      <Lede
        title="Rendering a store on the server"
        learn={[
          "Why useStore needs no getServerSnapshot",
          "How to check the value really came from the server",
        ]}
      >
        <p>
          This page is server-rendered. The figures below were in the HTML
          before any JavaScript ran — open the page source and they are there.
        </p>
        <p>
          <code>useSyncExternalStore</code> throws during a server render unless
          you pass a third argument, <code>getServerSnapshot</code>, so every
          store library has to keep a second source of truth for the server.{" "}
          <code>useStore</code> takes no such argument. The value the store was
          created with already is the snapshot, and the client store is created
          from the same serialized state.
        </p>
        <Note>
          <p>
            Press <b>Sell one</b> after the page says <i>hydrated</i>. It
            continues from the server&rsquo;s figures. A mismatch would have been
            logged by React and this subtree replaced.
          </p>
        </Note>
      </Lede>
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
              <b>The same numbers before and after hydration.</b> No second
              snapshot was supplied for the server render.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
