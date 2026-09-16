import { Suspense } from "react";
import { createStore } from "react-concurrent-store/store";
import { RscClient, type Row } from "../../src/demos/rsc";
import { StreamedClient } from "../../src/demos/streamed";
import { Code } from "../../src/Code";
import { Lede, Note, Pitfall } from "../../src/prose";

export const dynamic = "force-dynamic";

/**
 * A server component. It fetches, and hands the result to client components
 * that own the stores — once as resolved rows, once as a promise it never
 * awaited.
 */
export default async function Page() {
  const rows = await fetchAccounts();

  // A store, created and folded on the server. No Hook, no window, no client.
  const totals = createStore<
    { accounts: number; orders: number },
    Row
  >({ accounts: 0, orders: 0 }, (state, row) => ({
    accounts: state.accounts + 1,
    orders: state.orders + row.orders,
  }));
  for (const row of rows) totals.dispatch(row);
  const summary = totals.getState();

  return (
    <>
      <Lede
        title="Filling a store from the server"
        learn={[
          "How a server component hands data to a store on the client",
          "How to stream a promise into a store without awaiting it",
          "That createStore itself runs on the server too",
        ]}
      >
        <p>
          This page is a server component. It fetches on the server, where the
          query and its credentials stay, and the client builds the store from
          what arrives. Nothing is fetched twice and no loading state is spent
          on data the server already had.
        </p>
      </Lede>

      <div className="lede">
        <h3>Streaming a promise into a store</h3>
        <p>
          The server starts this fetch and does not <code>await</code> it. React
          serializes the promise across the boundary, so the client receives a
          thenable and puts it straight in as the store&rsquo;s initial value.
          The shell is sent immediately with a fallback, and the rows arrive
          later in the same response.
        </p>
        <Code>{`// A server component. Note the missing await.
<StreamedClient rows={fetchAccounts()} />

// A client component.
const [store] = useState(() => createStore(rows));
const data = use(useStore(store));`}</Code>
        <p>
          Then press <b>Refetch in a Transition</b>. The fetch is held open, so
          you can sit in the in-flight state: the column says the Transition is
          pending and dims, and the rows you were reading stay on screen instead
          of being replaced by a fallback. Press <b>New rows arrive</b> to let it
          finish.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="ab">
            <div className="pair">
              <section className="side ours">
                <div className="mock">
                  <div className="blocked">
                    <span className="big">streaming…</span>
                    <span className="why">
                      The shell was sent before the server had these rows.
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        }
      >
        <StreamedClient rows={fetchAccounts()} />
      </Suspense>

      <div className="lede">
        <h3>Or awaiting it first</h3>
        <p>
          When the data is quick, <code>await</code> it in the server component
          and pass plain rows. The store is created from them on the client and
          everything on top — the filter, the counters — is ordinary client
          state.
        </p>
      </div>
      <RscClient
        rows={rows}
        fetchedOn={typeof window === "undefined" ? "the server" : "the client"}
        at={new Date().toISOString().slice(11, 19) + " UTC"}
      />

      <div className="lede">
        <h3>Creating a store on the server</h3>
        <p>
          <code>createStore</code> is not a Hook. It is a plain factory, and it
          works in a server component — this summary was folded by a store that
          was created, dispatched to and read during this render, on the server:
        </p>
        <Code>{`import { createStore } from "react-concurrent-store/store";

export default async function Page() {
  const totals = createStore(
    { accounts: 0, orders: 0 },
    (state, row) => ({
      accounts: state.accounts + 1,
      orders: state.orders + row.orders,
    }),
  );
  for (const row of await fetchAccounts()) totals.dispatch(row);
  // ${summary.accounts} accounts, ${summary.orders} orders
}`}</Code>
        <Note>
          <p>
            Import it from <code>react-concurrent-store/store</code>. The main
            entry also exports <code>useStore</code>, which is a Hook, so it
            carries a <code>&quot;use client&quot;</code> directive and cannot be
            pulled into a server graph.
          </p>
        </Note>
        <Pitfall>
          <p>
            The store itself does not cross the boundary — it holds functions,
            so it is not serializable. Its <i>value</i> does, including as a
            promise the server never awaited. A store created on the server is
            for this render; one at module scope is shared by every request.
          </p>
        </Pitfall>
      </div>
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
