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
  [key: string]: any;
};

export class RecordSource {
  _records: Map<string, RelayRecord> = new Map();
  _newer: RecordSource | null = null;

  get(id: string): RelayRecord | undefined {
    const value = this._records.get(id);
    if (value === undefined && this._newer != null) {
      return this._newer.get(id);
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
  fragment: FragmentAstNode;
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

  lookup(fragmentRef: FragmentRef): any {
    return read(this._source, fragmentRef);
  }

  publishAndNotify(updater: Updater) {
    this._source = updater(this._source);
    this.reactStore.handleUpdate(updater);
  }
}

function read<T>(source: RecordSource, ref: FragmentRef): T {
  const rootRecord = source.get(ref.startingID);
  if (rootRecord == null) {
    throw new Error("No record found for id: " + ref.startingID);
  }
  const rootData = {};
  readNode(source, rootRecord, ref.fragment, rootData);
  return rootData as T;
}

function readNode(
  source: RecordSource,
  record: RelayRecord,
  node: FragmentAstNode,
  data: { [key: string]: any },
): any {
  switch (node.kind) {
    case "scalar":
      data[node.fieldName] = record[node.fieldName];
      return;
    case "object": {
      const newData = {};
      const id = record[node.fieldName];
      if (id == null) {
        throw new Error("No id found for field: " + node.fieldName);
      }
      const newRecord = source.get(id);
      if (newRecord == null) {
        throw new Error("No record found for id: " + record.id);
      }
      for (const selection of node.selections) {
        readNode(source, newRecord, selection, newData);
      }
      data[node.fieldName] = newData;
      return;
    }
    default: {
      // @ts-expect-error
      throw new Error("Unknown node kind: " + node.kind);
    }
  }
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

export function useFragment<T>(ref: FragmentRef): T {
  const store = useRelayStore();
  const selector = useMemo(() => {
    const cache = new WeakMap<RecordSource, T>();
    return (state: RecordSource): T => {
      if (!cache.has(state)) {
        cache.set(state, read(state, ref));
      }
      return cache.get(state)!;
    };
  }, [ref, store]);
  return useStoreSelector(store, selector);
}
