import { Suspense, type ReactNode } from "react";
import { Boundary } from "../Boundary";
import { runEveryScenario } from "../ui";
import { Lede, Note } from "../prose";
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
export function ExamplesPage() {
  // One after another: see runEveryScenario for why not all at once.
  const runAll = () => {
    void runEveryScenario();
  };

  return (
    <>
      <Lede
        title="Examples"
        learn={[
          "What each panel asserts, and how to drive it yourself",
          "How the readings are taken",
        ]}
      >
        <p>
          Six panels. Drive each one with its buttons, or press <b>Run</b> to
          play a scripted sequence slowly and end in a verdict listing every
          reading it took.
        </p>
        <Note>
          <p>
            Readings come from a probe outside React, written from ref
            callbacks, layout Effects and Effects. That is what makes what a
            component <i>committed</i> distinguishable from what it merely
            rendered, and from what reached the DOM.
          </p>
        </Note>
        <button className="run" onClick={runAll}>
          Run all
        </button>
      </Lede>
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
