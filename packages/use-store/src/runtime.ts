import * as ReactRuntime from "react";

/**
 * The two things this package reads off React that React does not export.
 *
 * Both are read through the module namespace rather than as named imports.
 * Under the `react-server` condition React exports a much smaller surface —
 * no `startTransition`, no hooks, and `__SERVER_INTERNALS_…` in place of
 * `__CLIENT_INTERNALS_…` — and a named import of something that is not there
 * fails the consumer's build. A namespace read just comes back undefined,
 * which lets `createStore` be used in a server graph at all.
 */
/**
 * Read a name off the React namespace that may not be there.
 *
 * A bare property read is not enough. Some module runners — vitest's included —
 * hand back an ESM namespace wrapped in a Proxy that throws on any name the
 * module does not export, so asking whether React has a server-only field has
 * to be allowed to fail.
 */
function peek<T>(name: string): T | undefined {
  try {
    return (ReactRuntime as unknown as Record<string, T | undefined>)[name];
  } catch {
    return undefined;
  }
}

const clientInternals = peek<{ T?: unknown }>(
  "__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE",
);

/** Whether this is React's server build, where there is no client to update. */
const onTheServer =
  peek("__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE") !==
  undefined;

/**
 * The caller's transition scope, or `null` when there isn't one.
 *
 * Nothing public tells a dispatch whether its caller was inside
 * `startTransition`, and a store that cannot tell cannot rebase: a
 * transition's action would enter the fold the tree is showing and an urgent
 * one would have nowhere separate to land. React's own proof of concept
 * (facebook/react#33215) reads this same field for the same reason.
 *
 * Read, never written. It is also what keeps a batch from spanning the two: a
 * transition dispatch and a flushSync dispatch in the same call stack land on
 * different lanes, so they cannot share one rebasing decision.
 *
 * On the client the field is read directly and its absence throws rather than
 * degrading to `null`. The field's name is its contract — a package that
 * touches it warns its users they cannot upgrade React freely — and silently
 * losing every transition is a worse way to find out than a stack trace.
 *
 * On the server `null` is not a degradation, it is the truth. A server render
 * happens once and there are no transitions to be inside of.
 */
export function transitionScope(): unknown {
  if (onTheServer) return null;
  if (clientInternals === undefined) {
    throw new Error(
      "react-concurrent-store: this React does not expose " +
        "__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, which is " +
        "how a dispatch knows whether its caller was inside startTransition. " +
        "This package pins react >=19.0.0 for that reason.",
    );
  }
  return clientInternals.T ?? null;
}

/**
 * Run `scope` at transition priority, for the chronological publish that
 * follows a rebased one.
 *
 * Only reachable when the two folds have parted, which needs a dispatch made
 * inside a transition, which cannot happen on a server. The fallback is there
 * so the module loads where `startTransition` is not exported, not because it
 * is expected to run.
 */
export function deferToTransition(scope: () => void): void {
  const startTransition = peek<(scope: () => void) => void>("startTransition");
  if (startTransition === undefined) {
    scope();
    return;
  }
  startTransition(scope);
}
