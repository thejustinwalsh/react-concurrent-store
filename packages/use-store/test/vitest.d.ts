/* eslint-disable @typescript-eslint/no-explicit-any */

import "vitest";

interface CustomMatchers<R = unknown> {
  toOnlyRerenderWhenPromiseChanges: () => R;
}

declare module "vitest" {
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
