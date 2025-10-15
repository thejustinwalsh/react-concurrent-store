import { createContext, useCallback, useContext } from "react";
import { experimental } from "../index";
import type { Store } from "../Store";
import { ISource } from "../types";
const { createStoreFromSource, useStoreSelector } = experimental;

/**
 * A minimal implementation of a key value store that works similarly to Relay's
 * store API.
 */
type RelayRecord = {
  id: string;
  [key: string]: any;
};

export class RecordSource {
  _records: Map<string, RelayRecord> = new Map();
  _previous: RecordSource | null = null;

  get(id: string): RelayRecord | undefined {
    const value = this._records.get(id);
    if (value === undefined && this._previous != null) {
      return this._previous.get(id);
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
      dispatch: (updater) => {
        this._publishAndNotify(updater);
      },
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
    return this.reactStore.dispatch(updater);
  }

  _publishAndNotify(updater: Updater) {
    const next = updater(this._source);
    const current = this._source;
    const previous = new RecordSource();
    for (const [id, record] of next._records) {
      const currentRecord = current.get(id);
      if (currentRecord != null) {
        previous.set(id, currentRecord);
      }
      current.set(id, record);
    }
    current._previous = previous;
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
  data: { [key: string]: any }
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
  const selector = useCallback(
    (state: RecordSource): T => {
      return read(state, ref);
    },
    [ref, store]
  );
  return useStoreSelector(store, selector);
}
