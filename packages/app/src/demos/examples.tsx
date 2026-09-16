import { Suspense, type ReactNode } from "react";
import { Boundary } from "../Boundary";
import { runEveryScenario } from "../ui";
import { Lede } from "../prose";
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
          "Where a blocking update lands while a Transition is still in flight",
          "What a component mounting mid-Transition is allowed to display",
          "When a promise in a store shows a fallback, and when it must not",
          "What actually clears a rejected promise behind an error boundary",
        ]}
      >
        <p>
          React&rsquo;s documentation advises against suspending a render on a
          value read with <code>useSyncExternalStore</code>. A mutation to an
          external store cannot be marked as a Transition, so it triggers the
          nearest Suspense fallback and replaces content that is already on
          screen. It also notes that a store mutated during a Transition makes
          React redo that update as a blocking one.
        </p>
        <p>
          Every panel below suspends on a store value on purpose. These are the
          six guarantees that makes possible.
        </p>
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
