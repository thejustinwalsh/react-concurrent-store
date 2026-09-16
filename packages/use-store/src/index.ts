export type { ISource, Reducer } from "./types";
import * as Experimental from "./experimental";

export { createStore, useStore } from "./useStore";
export type { ReactConcurrentStore, StoreHandle } from "./useStore";

// The prior prototype, kept for comparison. Not the recommended API.
export const experimental = Experimental;
