import { useEffect, useState, useTransition } from "react";
import { REACT_STORE_TYPE, ReactStore } from "./types";

type Store<Value, Action = Value> = ReactStore<Value, Action> & {
  $$typeof: typeof REACT_STORE_TYPE;
  _listeners: Set<() => void>;
  _current: Value;
  _sync: Value;
  _transition: Value;
  subscribe: (listener: () => void) => () => void;
  refresh: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStore = <Value>(value: any): value is Store<Value, any> => {
  return value && "$$typeof" in value && value.$$typeof === REACT_STORE_TYPE;
};

export function createStore<Value>(
  initialValue: Value
): ReactStore<Value, Value>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    _listeners: new Set(),
    _current: initialValue,
    _sync: initialValue,
    _transition: initialValue,
    refresh: () => {
      store._listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      store._listeners.add(listener);
      return () => {
        store._listeners.delete(listener);
      };
    },
    update: (action: Action) => {
      store._transition = reducer
        ? reducer(store._transition, action)
        : (action as unknown as Value);
      store.refresh();
    },
  };

  return store;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useStore<Value>(store: ReactStore<Value, any>): Value {
  if (!isStore<Value>(store)) {
    throw new Error(
      "Invalid store type. Ensure you are using a valid React store."
    );
  }

  const [cache, setCache] = useState(() => store._current);
  const [_, startTransition] = useTransition();

  useEffect(() => {
    return store.subscribe(() => {
      if (store._current === store._transition) {
        setCache(store._current);
      } else {
        store._sync = store._transition;
        startTransition(() => {
          setCache((store._current = store._sync));
        });
      }
    });
  }, [store]);

  return cache;
}
