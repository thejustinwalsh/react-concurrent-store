import { Suspense, type ReactNode } from "react";
import { Boundary } from "./Boundary";
import { runEveryScenario } from "./ui";
import { RebasingScenario } from "./scenarios/rebasing";
import { SuspenseScenario } from "./scenarios/suspense";
import { ErrorResetScenario } from "./scenarios/errors";
import { TearingScenario } from "./scenarios/tearing";
import { SelectorScenario } from "./scenarios/selectors";
import { RootsScenario } from "./scenarios/roots";

/** One panel throwing must not take the page with it. */
function Panel({ children }: { children: ReactNode }) {
  return (
    <Boundary
      fallback={(error, reset) => (
        <section className="card">
          <header>
            <h2>This panel threw</h2>
            <p className="proves">{error.message}</p>
          </header>
          <div className="controls">
            <button onClick={reset}>retry</button>
          </div>
        </section>
      )}
    >
      <Suspense
        fallback={
          <section className="card">
            <header>
              <h2>loading…</h2>
            </header>
          </section>
        }
      >
        {children}
      </Suspense>
    </Boundary>
  );
}

/**
 * Every panel is live: drive it with the buttons, or press Run to watch the
 * scripted sequence play out slowly and end in a verdict. Nothing here is
 * mocked and there is no act() — this is the browser's own scheduler.
 */
export function App() {
  // One after another: see runEveryScenario for why not all at once.
  const runAll = () => {
    void runEveryScenario();
  };

  return (
    <>
      <header className="top">
        <h1>Concurrent Store — the gauntlet</h1>
        <span className="sub">real React 19.3, real roots, no test harness</span>
        <span className="tally">
          <button className="run" onClick={runAll}>
            Run all
          </button>
        </span>
      </header>
      <main>
        <Panel>
          <RebasingScenario />
        </Panel>
        <Panel>
          <TearingScenario />
        </Panel>
        <Panel>
          <SuspenseScenario />
        </Panel>
        <Panel>
          <ErrorResetScenario />
        </Panel>
        <Panel>
          <SelectorScenario />
        </Panel>
        <Panel>
          <RootsScenario />
        </Panel>
      </main>
    </>
  );
}
