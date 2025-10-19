import { createContext, useContext, useMemo } from "react";
import { experimental } from "../../index";
import type { Store } from "../Store";
import { ISource } from "../../types";
const { createStoreFromSource, useStoreSelector } = experimental;

/**
 * A minimal implementation of a key value store that works similarly to Relay's
 * store API, but adapted to be compatible with the useStoreSelector hook.
 */
type RelayRecord = {
  id: string;
  [key: string]: unknown;
};

export class RecordSource {
  _records: Map<string, RelayRecord> = new Map();
  _older: RecordSource | null = null;

  get(id: string): RelayRecord | undefined {
    const value = this._records.get(id);
    if (value === undefined && this._older != null) {
      return this._older.get(id);
    }
    return value;
  }

  set(id: string, record: RelayRecord) {
    this._records.set(id, record);
  }

  delete(id: string) {
    this._records.delete(id);
  }
}

export type FragmentRef = {
  startingID: string;
};

export type FragmentAstNode =
  | {
      kind: "scalar";
      fieldName: string;
    }
  | {
      kind: "object";
      fieldName: string;
      selections: FragmentAstNode[];
    }
  | {
      kind: "spread";
      alias: string;
    };

// Updates in Relay look like functions wich take a current record source and
// produce an update (sparse RecordSource) to be applied to store.
type Updater = (source: RecordSource) => RecordSource;

export class RelayStore {
  private _source: RecordSource = new RecordSource();
  reactStore: Store<RecordSource, Updater>;
  constructor() {
    const source: ISource<RecordSource, Updater> = {
      getState: () => this._source,
      reducer: (recordSource: RecordSource, updater: Updater): RecordSource => {
        return updater(recordSource);
      },
    };
    this.reactStore = createStoreFromSource(source);
  }

  lookup(fragment: FragmentAstNode, fragmentRef: FragmentRef): unknown {
    return read(this._source, fragment, fragmentRef);
  }

  publishAndNotify(updater: Updater) {
    const wrapped = wrapUpdater(updater);
    this._source = wrapped(this._source);
    this.reactStore.handleUpdate(wrapped);
  }
}

function read<T>(
  source: RecordSource,
  fragment: FragmentAstNode,
  ref: FragmentRef,
): T {
  const rootRecord = source.get(ref.startingID);
  if (rootRecord == null) {
    throw new Error("No record found for id: " + ref.startingID);
  }
  const rootData = {};
  readNode(source, rootRecord, fragment, rootData);
  return rootData as T;
}

function readNode(
  source: RecordSource,
  record: RelayRecord,
  node: FragmentAstNode,
  data: { [key: string]: unknown },
): void {
  switch (node.kind) {
    case "scalar":
      data[node.fieldName] = record[node.fieldName];
      return;
    case "object": {
      const newData: { [key: string]: unknown } = {};
      const id = record[node.fieldName];
      if (id == null) {
        throw new Error("No id found for field: " + node.fieldName);
      }
      const newRecord = source.get(id as string);
      if (newRecord == null) {
        throw new Error("No record found for id: " + record.id);
      }
      for (const selection of node.selections) {
        readNode(source, newRecord, selection, newData);
      }
      data[node.fieldName] = newData;
      return;
    }
    case "spread":
      data[node.alias] = {
        startingID: record.id,
      };
      return;
    default: {
      // @ts-expect-error
      throw new Error("Unknown node kind: " + node.kind);
    }
  }
}

// Turns an `updater` function which returns a sparse RecordSource containing
// only the changed records into one which chains the new source onto
// the previous source for lookups of unchanged records.
export function wrapUpdater(updater: Updater): Updater {
  return (source: RecordSource) => {
    const next = updater(source);
    // NOTE! This creates a memory leak today since we don't have any kind of
    // compaction/cleanup when new states commit.
    next._older = source;
    return next;
  };
}

const relayContext = createContext<RelayStore | null>(null);

export function RelayProvider({
  children,
  store,
}: React.PropsWithChildren<{
  store: RelayStore;
}>) {
  return (
    <relayContext.Provider value={store}>{children}</relayContext.Provider>
  );
}

export function useRelayStore(): Store<RecordSource, Updater> {
  const store = useContext(relayContext);
  if (store == null) {
    throw new Error("No RelayStore found in context");
  }
  return store.reactStore;
}

export function useFragment<T>(fragment: FragmentAstNode, ref: FragmentRef): T {
  const store = useRelayStore();
  const selector = useMemo(() => {
    const cache = new WeakMap<RecordSource, T>();
    return (state: RecordSource): T => {
      if (!cache.has(state)) {
        const newValue = read<T>(state, fragment, ref);

        // If we have a cached value for the immediate older source, we can
        // attempt to recycle nodes from it to ensure stable object identity and
        // potentially avoid rerenders.
        if (state._older != null && cache.has(state._older)) {
          const previousValue = cache.get(state._older)!;
          const recycledValue = recycleNodesInto(previousValue, newValue);
          cache.set(state, recycledValue);
        } else {
          cache.set(state, newValue);
        }
      }
      return cache.get(state)!;
    };
  }, [fragment, ref]);
  return useStoreSelector(store, selector);
}

/**
 * Recycles subtrees from `prevData` by replacing equal subtrees in `nextData`.
 * Does not mutate a frozen subtree.
 * https://github.com/facebook/relay/blob/ff3e51e6bb3dc87ab03632183bcb37b6d28b676e/packages/relay-runtime/util/recycleNodesInto.js
 */
function recycleNodesInto<T>(prevData: T, nextData: T): T {
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
