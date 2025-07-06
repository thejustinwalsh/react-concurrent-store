import React from "react";

const REACT_STORE_TYPE: symbol = Symbol.for("react.store");

export type ReactStore<Value, Action> = {
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
  _transition?: Value;
};

const getCacheForType = <T>(resourceType: () => T) =>
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.A.getCacheForType(
    resourceType
  );

const useCacheRefresh = () =>
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useCacheRefresh();

export function createStore<Value, Action>(
  initialValue: Value,
  reducer?: (pendingValue: Value, action: Action) => Value
): ReactStore<Value, Action> {
  const store: Store<Value, Action> = {
    $$typeof: REACT_STORE_TYPE,
    _cache: () => ({
      _current: initialValue,
    }),
    _sync: initialValue,
    _refresh: () => {},
    update: (action: Action) => {
      store._refresh();
      if (reducer) {
        store._transition = reducer(store._transition ?? store._sync, action);
      }
    },
  };

  return store;
}

export function useStore<Value, Action>(
  store: ReactStore<Value, Action>
): Value {
  const _store = store as Store<Value, Action>;
  // If the store is not a valid React store, throw an error
  if (_store.$$typeof !== REACT_STORE_TYPE) {
    throw new Error(
      "Invalid store type. Ensure you are using a valid React store."
    );
  }

  // Use this fiber's cache refresh function for the store
  _store._refresh = useCacheRefresh();

  // If we updated the store, we need to hydrate it with the updated transition value
  const cache = getCacheForType(_store._cache);
  if (_store._transition && _store._transition !== _store._sync) {
    _store._sync = _store._transition;
  }
  if (cache._current !== _store._sync) {
    cache._current = _store._sync;
  }

  return cache._current;
}
