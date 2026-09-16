import { startTransition } from "react";
import { createStore, useStore } from "react-concurrent-store";

/**
 * The app's own router, on the public API and nothing else.
 *
 * Small on purpose: a page is a string, a navigation is a transition. The
 * interesting routing is inside the case pages, where a route has a loader
 * that can be held open. This one just decides which case you are looking at,
 * and demonstrates the shape while doing it.
 */
export const pages = [
  { id: "gauntlet", title: "Gauntlet", blurb: "Is it correct?" },
  { id: "router", title: "Router", blurb: "TanStack Router + Query" },
  { id: "atom", title: "One atom", blurb: "Redux" },
  { id: "identity", title: "Identity", blurb: "Relay" },
  { id: "fetching", title: "Fetching", blurb: "Fate · TanStack Query" },
] as const;

export type Page = (typeof pages)[number]["id"];

const isPage = (value: string): value is Page =>
  pages.some((page) => page.id === value);

const fromHash = (): Page => {
  const hash = location.hash.replace(/^#\/?/, "");
  return isPage(hash) ? hash : "gauntlet";
};

const router = createStore<Page, Page>(fromHash(), (_current, next) => next);

// The back button is a navigation like any other, so it goes through the same
// transition rather than a separate path.
addEventListener("hashchange", () => {
  startTransition(() => router.dispatch(fromHash()));
});

export function navigate(to: Page) {
  if (location.hash === `#/${to}`) return;
  location.hash = `#/${to}`;
}

export function usePage(): Page {
  return useStore(router);
}
