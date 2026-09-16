import { Suspense } from "react";
import { Boundary } from "./Boundary";
import { navigate, pages, usePage } from "./router";
import { GauntletPage } from "./pages/gauntlet";
import { RouterPage } from "./pages/router";
import { AtomPage } from "./pages/atom";
import { IdentityPage } from "./pages/identity";

function Nav() {
  const here = usePage();
  return (
    <nav className="tabs">
      {pages.map((page) => (
        <button
          key={page.id}
          className={page.id === here ? "tab here" : "tab"}
          aria-current={page.id === here ? "page" : undefined}
          onClick={() => navigate(page.id)}
        >
          <span className="t">{page.title}</span>
          <span className="b">{page.blurb}</span>
        </button>
      ))}
    </nav>
  );
}

function Routed() {
  const page = usePage();
  switch (page) {
    case "gauntlet":
      return <GauntletPage />;
    case "router":
      return <RouterPage />;
    case "atom":
      return <AtomPage />;
    case "identity":
      return <IdentityPage />;
    default:
      return (
        <div className="lede">
          <h2>Not built yet</h2>
        </div>
      );
  }
}

export function App() {
  return (
    <>
      <header className="top">
        <h1>Concurrent Store</h1>
        <span className="sub">react 19.3 · no test harness</span>
      </header>
      <Nav />
      <Boundary
        fallback={(error, reset) => (
          <div className="lede">
            <h2>This page threw</h2>
            <p>{error.message}</p>
            <button onClick={reset}>retry</button>
          </div>
        )}
      >
        <Suspense fallback={<div className="lede">loading…</div>}>
          <Routed />
        </Suspense>
      </Boundary>
    </>
  );
}
