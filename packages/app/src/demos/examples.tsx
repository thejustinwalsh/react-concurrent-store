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
 * Every panel is live: click through it with the buttons, or press Run to
 * watch a scripted sequence play out slowly and end in a verdict. Nothing here is
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
        title="What a store guarantees under concurrent React"
        learn={[
          "Where an urgent update lands while a Transition is still in flight",
          "What a component mounting mid-Transition is allowed to display",
          "When a promise in a store shows a fallback, and when it must not",
          "What actually clears a rejected promise behind an error boundary",
        ]}
      >
        <p>
          Six behaviours you can try yourself. Click through a panel with its
          buttons, or press <b>Run</b> to watch the same sequence play out
          slowly and finish with a list of every value it read.
        </p>
        <p>
          These are the guarantees a store has to make once React can render in
          the background, abandon that work and start again. Four of the six
          are guarantees <code>useSyncExternalStore</code> cannot make, because
          a store update during a Transition opts that Transition out.
        </p>
        <Note>
          <p>
            Readings come from a probe outside React, written from ref
            callbacks, layout Effects and Effects. That is what makes what a
            component <i>committed</i> distinguishable from what it merely
            rendered, and from what reached the DOM — a value React renders and
            then throws away is not a tear.
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
