import React, { use, useEffect, useState, useTransition } from "react";
import { REACT_STORE_TYPE, ReactStore } from "./types";

type StoreVersionInfo = {
  _uuid: string;
  _version: number;
};

type StoreCache<Value> = StoreVersionInfo & {
  _current: Value;
  _sync?: Value;
  _transition: Value;
};

type Store<Value, Action> = ReactStore<Value, Action> &
  StoreCache<Value> & {
    $$typeof: typeof REACT_STORE_TYPE;
    _cache: () => StoreCache<Value>;
    _refresh: () => void;
  };

export const isStore = <Value>(value: any): value is Store<Value, any> => {
  return value && "$$typeof" in value && value.$$typeof === REACT_STORE_TYPE;
};

export const CACHE_VERSION = new Map<string, number>();

export const getNextVersion = (store: StoreVersionInfo): number => {
  const current = CACHE_VERSION.get(store._uuid) ?? 0;
  return CACHE_VERSION.set(store._uuid, current + 1).get(store._uuid)!;
};

const getCacheForType = <T>(resourceType: () => T) =>
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.A.getCacheForType(
    resourceType
  );

const useCacheRefresh = () =>
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.H.useCacheRefresh();

export function createUnstableStore<Value>(
  initialValue: Value
): ReactStore<Value, Value>;

export function createUnstableStore<Value, Action>(
  initialValue: Value,
  reducer: (currentValue: Value) => Value
): ReactStore<Value, void>;

export function createUnstableStore<Value, Action>(
  initialValue: Value,
  reducer: (currentValue: Value, action: Action) => Value
): ReactStore<Value, Action>;

export function createUnstableStore<Value, Action>(
  initialValue: Value,
  reducer?: (currentValue: Value, action: Action) => Value
): ReactStore<Value, Action> {
  const store: Store<Value, Action> = {
    $$typeof: REACT_STORE_TYPE,
    _uuid: crypto.randomUUID(),
    _version: 0,
    _cache: () => ({
      _uuid: store._uuid,
      _version: getNextVersion(store),
      _current: store._current,
      _transition: store._transition,
    }),
    _current: initialValue,
    _transition: initialValue,
    _refresh: () => {},
    update: (action: Action) => {
      store._refresh();
      store._transition = reducer
        ? reducer(store._transition, action)
        : (action as unknown as Value);
    },
  };

  return store;
}

export function useUnstableStore<Value>(store: ReactStore<Value, any>): Value {
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

  const [_, startTransition] = useTransition();
  const _update = store.update;
  store.update = (action: any) => {
    startTransition(() => {
      _update(action);
    });
  };

  // Hydrate the cache with the most recent transition value when needed
  // If _sync is not present, we have triggered a refresh
  if ("_sync" in cache === false) {
    store._current = cache._current = store._transition;
    store._version = cache._version;
    cache._transition = store._transition;
    cache._sync = store._transition;
  }

  return cache._current;
}
