export type { ReactStore } from "./types";
import * as Experimental from "./useStoreNew";

export { createStore, useStore } from "./useStore";

// Until we update the docs, we export the new API under the name `experimental`
export const experimental = {
  createStore: Experimental.createStore,
  createStoreFromSource: Experimental.createStoreFromSource,
  useStore: Experimental.useStore,
  useStoreSelector: Experimental.useStoreSelector,
  StoreProvider: Experimental.StoreProvider,
};
