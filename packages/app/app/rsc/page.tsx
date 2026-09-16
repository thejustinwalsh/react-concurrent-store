import { Suspense } from "react";
import { RscClient, type Row } from "../../src/demos/rsc";
import { StreamedClient } from "../../src/demos/streamed";

export const dynamic = "force-dynamic";

/**
 * A server component. Note what is *not* imported here: `createStore`. The
 * package carries a "use client" directive, so importing it in this file would
 * fail the build rather than fail at runtime — which is the right outcome,
 * because a server component has no state for a store to be.
 */
export default async function Page() {
  const rows = await fetchAccounts();
  return (
    <>
      <div className="lede">
        <h2>Fetched on the server, owned by the client</h2>
        <p>
          This page is a server component. It awaits its data on the server,
          where the query and its credentials stay, and hands plain rows to a
          client component that builds the store from them.
        </p>
        <p>
          The package is published with a <code>&quot;use client&quot;</code>{" "}
          directive, so reaching for the store in this file fails the build
          rather than failing in front of someone. That is the right answer: a
          server component renders once and has no state, so there is nothing
          for a store to be.
        </p>
        <pre className="terminal">
          <code>
            {`// app/rsc/page.tsx  — a server component
import { createStore } from "react-concurrent-store";

export default function Page() {
  const store = createStore(0);
  //            ^
  // Attempted to call createStore() from the server but createStore is on
  // the client. It's not possible to invoke a client function from the
  // server, it can only be rendered as a Component or passed to props of a
  // Client Component.`}
          </code>
        </pre>
      </div>
      <div className="ab">
        <div className="pair">
          <Suspense
            fallback={<section className="side ours"><div className="mock"><div className="blocked"><span className="big">streaming…</span></div></div></section>}
          >
            <StreamedClient rows={fetchAccounts()} />
          </Suspense>
        </div>
      </div>
      <RscClient
        rows={rows}
        fetchedOn={typeof window === "undefined" ? "the server" : "the client"}
        at={new Date().toISOString().slice(11, 19) + " UTC"}
      />
    </>
  );
}

async function fetchAccounts(): Promise<Row[]> {
  // Stands in for a query with credentials that must not reach the browser.
  await new Promise((resolve) => setTimeout(resolve, 15));
  return [
    { id: "ada", name: "Lovelace Analytical", region: "London", orders: 128 },
    { id: "grace", name: "Hopper Systems", region: "New York", orders: 311 },
    { id: "alan", name: "Turing Works", region: "Manchester", orders: 74 },
    { id: "katherine", name: "Johnson Aero", region: "Hampton", orders: 219 },
  ];
}
