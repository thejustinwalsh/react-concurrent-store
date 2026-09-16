export type { ISource, Reducer } from "./types";
import * as Experimental from "./experimental";

export {
  createStore,
  useStore,
  createSelectorStore,
} from "./useStore";
export type { Handle, VersionedStore } from "./useStore";

// The prior prototype, kept for comparison. Not the recommended API.
export const experimental = Experimental;
