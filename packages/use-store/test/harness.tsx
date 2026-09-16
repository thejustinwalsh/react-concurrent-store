import { act, render, type RenderResult } from "@testing-library/react";
import type { ReactNode } from "react";
import {
  useStore,
  type ConcurrentStoreInternals,
  type ReactConcurrentStore,
} from "../src/useStore";

/**
 * The parts every test in the suite was writing out by hand: render inside
 * act, read the text back, hold a promise open, count live subscriptions.
 */

/** Render, flushed, with the text scoped to this render's own container. */
export async function mount(node: ReactNode): Promise<
  RenderResult & { text: () => string | null; show: (next: ReactNode) => Promise<void> }
> {
  const view = await act(async () => render(node));
  return {
    ...view,
    /** What this tree is showing. Scoped, so earlier renders do not leak in. */
    text: () => view.container.textContent,
    /** Re-render and flush. */
    show: async (next: ReactNode) => {
      await act(async () => view.rerender(next));
    },
  };
}

/** A promise you can release, for holding a Transition open. */
export function held() {
  let release!: () => void;
  const promise = new Promise<void>((resolve) => (release = resolve));
  return { promise, release };
}

/** A component that renders a store's value, or a slice of it. */
export function readerFor<S, A>(
  store: ReactConcurrentStore<S, A>,
  selector?: (state: S) => unknown,
): () => ReactNode {
  return function Reader() {
    const value = selector
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useStore(store, selector)
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useStore(store);
    return <div data-reader="">{String(value)}</div>;
  };
}

/** Wraps a store to count live subscriptions, without adding public API. */
export function counting<S, A>(inner: ConcurrentStoreInternals<S, A>) {
  let live = 0;
  return {
    ...inner,
    _subscribe(...args: Parameters<typeof inner._subscribe>) {
      live++;
      const unsubscribe = inner._subscribe(...args);
      return () => {
        live--;
        unsubscribe();
      };
    },
    live: () => live,
  } as ConcurrentStoreInternals<S, A> & { live: () => number };
}
