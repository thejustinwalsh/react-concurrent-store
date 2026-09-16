import { createSignal, type Signal } from "./ui";

/**
 * A promise a panel can hold open, so a transition stays pending for as long
 * as you want to look at it. `held` is a signal rather than component state:
 * reading it with useSyncExternalStore updates the controls without forcing a
 * sync re-render of the tree that is currently suspended on it.
 */
export type Gate = {
  held: Signal<boolean>;
  promise(): Promise<void> | null;
  hold(): void;
  release(): void;
};

export function makeGate(): Gate {
  const held = createSignal(false);
  let release: (() => void) | null = null;
  let promise: Promise<void> | null = null;
  return {
    held,
    promise: () => promise,
    hold() {
      if (promise !== null) return;
      promise = new Promise<void>((r) => (release = r));
      held.set(true);
    },
    release() {
      release?.();
      release = null;
      promise = null;
      held.set(false);
    },
  };
}
