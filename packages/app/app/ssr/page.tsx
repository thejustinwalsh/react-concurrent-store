import { SsrDemo, type Snapshot } from "../../src/demos/ssr";

// Rendered per request, so the timestamp in the HTML is real and the page is
// genuinely server-rendered rather than prerendered once at build time.
export const dynamic = "force-dynamic";

/**
 * A server component. It does the work a server component is for — awaiting
 * data — and hands a plain serializable object to the client component that
 * owns the store.
 */
export default async function Page() {
  const snapshot: Snapshot = await loadFromTheServer();
  return <SsrDemo snapshot={snapshot} />;
}

async function loadFromTheServer(): Promise<Snapshot> {
  await new Promise((resolve) => setTimeout(resolve, 10));
  return {
    // Captured here, where there is no window. If this string ever renders as
    // anything else, the page was not server-rendered.
    renderedOn: typeof window === "undefined" ? "the server" : "the client",
    at: new Date().toISOString().slice(11, 19) + " UTC",
    orders: 1284,
    revenue: 62916,
  };
}
