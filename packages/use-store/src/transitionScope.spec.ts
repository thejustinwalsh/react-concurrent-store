/**
 * Its own file: the "React without the field" case is built by mocking the
 * react module, and vitest isolates a file's module registry.
 */
import { expect, it, vi } from "vitest";

const FIELD = "__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE";

it("reads the caller's transition scope from React", async () => {
  const { transitionScope } = await import("./transitionScope");
  const { startTransition } = await import("react");

  expect(transitionScope()).toBe(null);
  let inside: unknown;
  startTransition(() => {
    inside = transitionScope();
  });
  expect(inside).not.toBe(null);
});

it("fails loudly when React does not expose it", async () => {
  vi.resetModules();
  const actual = await vi.importActual<Record<string, unknown>>("react");
  // Set to undefined rather than removed: a real ESM namespace yields
  // undefined for a property it does not have, while vitest's mock proxy
  // throws on an undeclared export. Same branch, closer to reality.
  vi.doMock("react", () => ({ ...actual, [FIELD]: undefined }));

  // Importing must not throw: under the react-server condition React exports
  // __SERVER_INTERNALS_ instead, and pulling this into a server graph should
  // not break the build. Nothing dispatches there.
  const { transitionScope } = await import("./transitionScope");
  expect(() => transitionScope()).toThrow(new RegExp(FIELD));

  vi.doUnmock("react");
  vi.resetModules();
});
