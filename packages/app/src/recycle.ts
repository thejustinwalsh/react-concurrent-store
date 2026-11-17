
/**
 * Recycles subtrees from `prevData` by replacing equal subtrees in `nextData`.
 * Does not mutate a frozen subtree.
 * https://github.com/facebook/relay/blob/ff3e51e6bb3dc87ab03632183bcb37b6d28b676e/packages/relay-runtime/util/recycleNodesInto.js
 */
export function recycleNodesInto<T>(prevData: T, nextData: T): T {
  if (
    prevData === nextData ||
    typeof prevData !== "object" ||
    !prevData ||
    (prevData.constructor !== Object && !Array.isArray(prevData)) ||
    typeof nextData !== "object" ||
    !nextData ||
    (nextData.constructor !== Object && !Array.isArray(nextData))
  ) {
    return nextData;
  }
  let canRecycle = false;

  // Assign local variables to preserve Flow type refinement.
  const prevArray: Array<unknown> | null = Array.isArray(prevData)
    ? prevData
    : null;
  const nextArray: Array<unknown> | null = Array.isArray(nextData)
    ? nextData
    : null;
  if (prevArray && nextArray) {
    canRecycle =
      nextArray.reduce((wasEqual: boolean, nextItem, ii) => {
        const prevValue = prevArray[ii];
        const nextValue = recycleNodesInto(prevValue, nextItem);
        if (nextValue !== nextArray[ii]) {
          nextArray[ii] = nextValue;
        }
        return wasEqual && nextValue === prevArray[ii];
      }, true) && prevArray.length === nextArray.length;
  } else if (!prevArray && !nextArray) {
    // Assign local variables to preserve Flow type refinement.
    const prevObject = prevData as Record<string, unknown>;
    const nextObject = nextData as Record<string, unknown>;
    const prevKeys = Object.keys(prevObject);
    const nextKeys = Object.keys(nextObject);
    canRecycle =
      nextKeys.reduce((wasEqual: boolean, key) => {
        const prevValue = prevObject[key];
        const nextValue = recycleNodesInto(prevValue, nextObject[key]);
        if (nextValue !== nextObject[key]) {
          // $FlowFixMe[cannot-write]
          nextObject[key] = nextValue;
        }
        return wasEqual && nextValue === prevObject[key];
      }, true) && prevKeys.length === nextKeys.length;
  }
  return canRecycle ? prevData : nextData;
}
