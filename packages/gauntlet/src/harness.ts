import { createRoot, type Root } from "react-dom/client";
import type { ReactElement } from "react";

export type Observation = {
  label: string;
  observed: string;
  expected: string;
  ok: boolean;
};

export type Result = {
  id: string;
  title: string;
  proves: string;
  ok: boolean;
  observations: Observation[];
  error?: string;
  ms: number;
};

export type Probe = {
  /** Record a reading. The scenario keeps going so you see every failure. */
  check(label: string, observed: unknown, expected: unknown): void;
  mount(element: ReactElement): Mounted;
};

export type Mounted = {
  host: HTMLElement;
  root: Root;
  /** Visible text, with Suspense-hidden subtrees excluded the way a user sees it. */
  text(selector?: string): string;
  all(selector: string): string[];
  click(selector: string): void;
  unmount(): void;
};

export type Scenario = {
  id: string;
  title: string;
  /** What a pass actually establishes. Shown in the UI. */
  proves: string;
  run(probe: Probe): Promise<void>;
};

/** Two frames plus a macrotask: long enough for React to render and commit. */
export const paint = (): Promise<void> =>
  new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );

export const tick = (ms = 0): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const settle = async (): Promise<void> => {
  await paint();
  await tick(0);
  await paint();
};

const stage = (): HTMLElement => {
  const host = document.createElement("div");
  host.className = "stage";
  document.getElementById("stage-area")?.appendChild(host);
  return host;
};

const visibleText = (node: HTMLElement): string => {
  // React keeps suspended children mounted with display:none. A user does not
  // see them, so neither does a reading.
  let out = "";
  const walk = (n: Node) => {
    if (n.nodeType === Node.TEXT_NODE) {
      out += n.textContent ?? "";
      return;
    }
    if (n instanceof HTMLElement && n.style.display === "none") return;
    n.childNodes.forEach(walk);
  };
  walk(node);
  return out;
};

export async function runScenario(scenario: Scenario): Promise<Result> {
  const observations: Observation[] = [];
  const mounts: Mounted[] = [];
  const started = performance.now();

  const probe: Probe = {
    check(label, observed, expected) {
      const o = JSON.stringify(observed);
      const e = JSON.stringify(expected);
      observations.push({ label, observed: o, expected: e, ok: o === e });
    },
    mount(element) {
      const host = stage();
      const root = createRoot(host);
      root.render(element);
      const mounted: Mounted = {
        host,
        root,
        text: (selector) =>
          visibleText(
            selector
              ? ((host.querySelector(selector) as HTMLElement | null) ?? host)
              : host,
          ),
        all: (selector) =>
          Array.from(host.querySelectorAll(selector), (n) =>
            visibleText(n as HTMLElement),
          ),
        click: (selector) =>
          (host.querySelector(selector) as HTMLElement | null)?.click(),
        unmount: () => {
          root.unmount();
          host.remove();
        },
      };
      mounts.push(mounted);
      return mounted;
    },
  };

  let error: string | undefined;
  try {
    await scenario.run(probe);
  } catch (caught) {
    error = caught instanceof Error ? caught.message : String(caught);
  } finally {
    for (const m of mounts) {
      try {
        m.unmount();
      } catch {
        // A scenario that unmounted its own root already.
      }
    }
  }

  return {
    id: scenario.id,
    title: scenario.title,
    proves: scenario.proves,
    ok: error === undefined && observations.every((o) => o.ok),
    observations,
    error,
    ms: Math.round(performance.now() - started),
  };
}
