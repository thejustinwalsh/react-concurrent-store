import React from "react";
import "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { beforeEach, expect, vi } from "vitest";
import wdyr, {
  HookDifference,
  type UpdateInfo,
} from "@welldone-software/why-did-you-render";

// Add WDYR support to React for assertions in tests
declare global {
  var WDYR: { notifications: UpdateInfo[] };
}
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

// Add matchers for WDYR notification assertions
expect.extend({
  /**
   * Custom matcher to check if WDYR notifications only re-render when a promise changes.
   * @param {UpdateInfo[]} received - The received WDYR notifications.
   */
  toOnlyRerenderWhenPromiseChanges(received: UpdateInfo[]) {
    const wasPromiseUpdate = (hookDiff: HookDifference) => {
      return (
        hookDiff.diffType === "different" &&
        (hookDiff.prevValue !== hookDiff.nextValue ||
          hookDiff.prevValue.value !== hookDiff.nextValue.value ||
          hookDiff.prevValue.status !== hookDiff.nextValue.status)
      );
    };

    const failingNotifications = received.filter((notification) => {
      return (
        notification.hookName !== "useState" ||
        notification.reason.propsDifferences === true ||
        notification.reason.stateDifferences === true ||
        notification.reason.hookDifferences.reduce(
          (acc, diff) => acc || !wasPromiseUpdate(diff),
          false
        )
      );
    });

    if (failingNotifications.length) {
      return {
        pass: false,
        message: () =>
          "Expected promise to only re-render when it changes, but found re-renders for other reasons",
        actual: failingNotifications,
        expected: [], // TODO: diff all notifications
      };
    }

    return {
      pass: true,
      message: () =>
        "All notifications are valid, promise only re-renders when it changes.",
    };
  },
});

beforeEach(() => {
  globalThis.WDYR.notifications = [];
});
