import React from "react";
import "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { beforeEach, vi } from "vitest";

// Add WDYR support to React for assertions in tests
globalThis.WDYR = { notifications: [] };
vi.mock("react", async () => {
  const react = await vi.importActual("react");

  const proxyProperties = new Set([
    "__IS_WDYR__",
    "createElement",
    "createFactory",
    "cloneElement",
    "useState",
    "useReducer",
    "useContext",
    "useSyncExternalStore",
    "useMemo",
    "useCallback",
    "__REVERT_WHY_DID_YOU_RENDER__",
  ]);
  const proxyState = new WeakMap<typeof React, Map<string, unknown>>();
  const handler: ProxyHandler<typeof React> = {
    get(target, prop, receiver) {
      proxyState.has(target) || proxyState.set(target, new Map());
      const state = proxyState.get(target);
      if (state && typeof prop === "string" && state.has(prop)) {
        return state.get(prop);
      }
      return Reflect.get(target, prop, receiver);
    },

    set(target, prop, value) {
      proxyState.has(target) || proxyState.set(target, new Map());
      const state = proxyState.get(target);
      if (state && typeof prop === "string" && proxyProperties.has(prop)) {
        state.set(prop, value);
        return true;
      }
      throw Error(`Cannot set property ${prop.toString()} on React proxy`);
    },

    defineProperty(target, prop, descriptor) {
      proxyState.has(target) || proxyState.set(target, new Map());
      const state = proxyState.get(target);
      if (state && typeof prop === "string" && proxyProperties.has(prop)) {
        state.set(prop, descriptor.value);
        return true;
      }
      throw Error(`Cannot define property ${prop.toString()} on React proxy`);
    },

    deleteProperty(target, prop) {
      proxyState.has(target) || proxyState.set(target, new Map());
      const state = proxyState.get(target);
      if (state && typeof prop === "string" && proxyProperties.has(prop)) {
        if (state.has(prop)) {
          return state.delete(prop);
        }
      }
      throw Error(`Cannot delete property ${prop.toString()} on React proxy`);
    },
  };

  const proxiedReact = new Proxy(react as typeof React, handler);
  const { default: wdyr } = await import(
    "@welldone-software/why-did-you-render"
  );
  wdyr(proxiedReact, {
    include: [/.*/],
    collapseGroups: false,
    trackHooks: true,
    trackAllPureComponents: true,
    notifier: (options) => {
      globalThis.WDYR.notifications.push(options);
    },
  });

  return { ...proxiedReact, default: proxiedReact };
});

// Mock the main index module to ensure we're testing the correct implementation
vi.mock("../src/index.ts", async () => {
  const USE_UNSTABLE = process.env.USE_UNSTABLE === "true";

  if (USE_UNSTABLE) {
    const { createUnstableStore, useUnstableStore } = await vi.importActual(
      "../src/useUnstableStore"
    );
    return {
      createStore: createUnstableStore,
      useStore: useUnstableStore,
    };
  } else {
    const { createStore, useStore } = await vi.importActual("../src/useStore");
    return {
      createStore,
      useStore,
    };
  }
});

beforeEach(() => {
  globalThis.WDYR.notifications = [];
});
