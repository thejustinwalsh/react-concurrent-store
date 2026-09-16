import * as ReactRuntime from "react";

/**
 * The caller's transition scope, or `null` when there isn't one.
 *
 * Nothing public tells a dispatch whether its caller was inside
 * `startTransition`, and a store that cannot tell cannot rebase: a transition's
 * action would enter the fold the tree is showing and an urgent one would have
 * nowhere separate to land. React's own proof of concept
 * (facebook/react#33215) reads this same field for the same reason. Read here
 * the way it reads it, in one place, so there is one answer to "where does this
 * reach into React".
 *
 * Read, never written.
 *
 * It is also what keeps a batch from spanning the two. A transition dispatch
 * and a flushSync dispatch in the same call stack land on different lanes, so
 * they cannot share one rebasing decision, and the scope is what tells them
 * apart.
 *
 * It is read directly and fails loudly rather than degrading to `null`. The
 * field's name is its contract — a package that touches it warns its users they
 * cannot upgrade React freely — and silently losing every transition would be a
 * far worse way to find out than a stack trace pointing here.
 *
 * Captured at module load and checked at first use, not at load. Under the
 * `react-server` condition React exports
 * `__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE` instead, so
 * this field really is absent there; merely importing this module into a server
 * graph must not break the build, and nothing dispatches in one.
 */
const clientInternals = (
  ReactRuntime as unknown as {
    __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?: {
      T?: unknown;
    };
  }
).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

export function transitionScope(): unknown {
  if (clientInternals === undefined) {
    throw new Error(
      "react-concurrent-store: this React does not expose " +
        "__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, which is " +
        "how a dispatch knows whether its caller was inside startTransition. " +
        "Either the React version changed it — this package pins >=19.0.0 for " +
        "that reason — or a store was dispatched to in a react-server " +
        'environment, where it does not belong: mark the module "use client".',
    );
  }
  return clientInternals.T ?? null;
}
