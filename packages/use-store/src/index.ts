export type { ReactStore } from "./types";
import * as Experimental from "./experimental";

export { createStore, useStore } from "./useStore";

// Until we update the docs, we export the new API under the name `experimental`
export const experimental = Experimental;
