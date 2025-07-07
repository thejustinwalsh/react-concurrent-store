import React from "react";

const REACT_STORE_TYPE: symbol = Symbol.for("react.store");

export type ReactStore<Value, Action = Value> = {
  [REACT_STORE_TYPE]: never;
  update: (action: Action) => void;
};

type StoreCache<Value> = {
  _current: Value;
};

type Store<Value, Action> = ReactStore<Value, Action> & {
  $$typeof: typeof REACT_STORE_TYPE;
  _cache: () => StoreCache<Value>;
  _refresh: () => void;
  _sync: Value;
  _transition: Value;
};

const isStore = <Value>(value: any): value is Store<Value, any> => {
  return value && "$$typeof" in value && value.$$typeof === REACT_STORE_TYPE;
};

const getCacheForType = <T>(resourceType: () => T) =>
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.A.getCacheForType(
    resourceType
  );

const useCacheRefresh = () =>
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useCacheRefresh();

export function createStore<Value>(
  initialValue: Value
): ReactStore<Value, Value>;

export function createStore<Value, Action>(
  initialValue: Value,
  reducer: (currentValue: Value) => Value
): ReactStore<Value, void>;

export function createStore<Value, Action>(
  initialValue: Value,
  reducer: (currentValue: Value, action: Action) => Value
): ReactStore<Value, Action>;

export function createStore<Value, Action>(
  initialValue: Value,
  reducer?: (currentValue: Value, action: Action) => Value
): ReactStore<Value, Action> {
  const store: Store<Value, Action> = {
    $$typeof: REACT_STORE_TYPE,
    _cache: () => ({
      _current: initialValue,
    }),
    _sync: initialValue,
    _transition: initialValue,
    _refresh: () => {},
    update: (action: Action) => {
      store._refresh();
      store._transition = reducer
        ? reducer(store._transition ?? store._sync, action)
        : (action as unknown as Value);
    },
  };

  return store;
}

export function useStore<Value>(store: ReactStore<Value, any>): Value {
  // If the store is not a valid React store, throw an error
  if (!isStore<Value>(store)) {
    throw new Error(
      "Invalid store type. Ensure you are using a valid React store."
    );
  }

  // Use this fiber's cache refresh function for the store
  store._refresh = useCacheRefresh();

  // If we updated the store, we need to hydrate it with the updated transition value
  const cache = getCacheForType(store._cache);
  if (store._transition !== store._sync) {
    store._sync = store._transition;
  }
  if (cache._current !== store._sync) {
    cache._current = store._sync;
  }

  return cache._current;
}
