import { Suspense } from "react";
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

  return (
    <>
      <Lede
        title="Filling a store from the server"
        learn={[
          "How a server component hands data to a store on the client",
          "How to stream a promise into a store without awaiting it",
          "Why createStore belongs on the client",
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
          Then press <b>Refetch in a Transition</b>. The rows you are reading
          stay on screen while the next ones load, because the store was told
          the update could wait.
        </p>
      </div>
      <div className="ab">
        <div className="pair">
          <Suspense
            fallback={
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
            }
          >
            <StreamedClient rows={fetchAccounts()} />
          </Suspense>
        </div>
      </div>

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
        <h3>Where createStore belongs</h3>
        <Note>
          <p>
            What crosses the boundary is data, never the store. A store is
            mutable state with subscribers; a server component renders once and
            has neither, and a store at module scope on a server is shared by
            every request.
          </p>
        </Note>
        <Pitfall>
          <p>
            The package is published with a{" "}
            <code>&quot;use client&quot;</code> directive, so reaching for{" "}
            <code>createStore</code> in a server component fails the build
            instead of failing in front of someone:
          </p>
          <Code>{`// app/page.tsx — a server component
import { createStore } from "react-concurrent-store";

export default function Page() {
  const store = createStore(0);
}`}</Code>
          <pre className="terminal">
            <code>
              {`Attempted to call createStore() from the server but createStore is on
the client. It's not possible to invoke a client function from the server,
it can only be rendered as a Component or passed to props of a Client
Component.`}
            </code>
          </pre>
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
