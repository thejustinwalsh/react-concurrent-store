import { Suspense, type ReactNode } from "react";
import { Boundary } from "../Boundary";
import { runEveryScenario } from "../ui";
import { RebasingScenario } from "../scenarios/rebasing";
import { SuspenseScenario } from "../scenarios/suspense";
import { ErrorResetScenario } from "../scenarios/errors";
import { TearingScenario } from "../scenarios/tearing";
import { SelectorScenario } from "../scenarios/selectors";
import { RootsScenario } from "../scenarios/roots";

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
export function GauntletPage() {
  // One after another: see runEveryScenario for why not all at once.
  const runAll = () => {
    void runEveryScenario();
  };

  return (
    <>
      <div className="lede">
        <h2>Does it do the right thing?</h2>
        <p>
          Six panels, each one live. Drive them with the buttons, or press Run
          to watch a scripted sequence play out slowly and end in a verdict.
          Real React, real roots, no test harness and no <code>act()</code> —
          this is the browser&rsquo;s own scheduler.
        </p>
        <button className="run" onClick={runAll}>
          Run all
        </button>
      </div>
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
