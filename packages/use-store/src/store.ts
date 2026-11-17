/**
 * `react-concurrent-store/store` — the store on its own.
 *
 * The main entry carries a "use client" directive, because `useStore` is a
 * Hook and a Hook cannot run in a React Server Component. `createStore` is not
 * a Hook. It is a plain factory, and this entry imports nothing that React's
 * server build does not have, so it can be used in a server graph.
 *
 * What still cannot cross the boundary is the store itself — it holds
 * functions, so it is not serializable. Its *value* can, including as a promise
 * the server never awaited.
 */
export { createStore } from "./createStore";
export type {
  ConcurrentStoreInternals,
  ReactConcurrentStore,
  StoreHandle,
} from "./createStore";
export type { ISource, Reducer } from "./types";
