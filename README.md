# react-use-store

Ponyfill of experimental React concurrent stores.

> [!WARNING] > **This package uses React internals** that could be removed in any future version at any time. Specifically `getCacheForType` and `useCacheRefresh` from React's internal APIs. These internals have been available in both React 19.0 and React 19.1 releases, but there is no guarantee they will remain available in future versions.

_Work In Progress_

- [x] Update types and add support for stores without a reducer
- [ ] Add tests for Suspense and useTransition with async stores or stores of promises (in-progress)
- [ ] Add docs site with interactive examples
- [ ] Investigate SSR and streaming of promises and store values

## Why

Managing async resources with `useSyncExternalStore` breaks concurrency when [mutating the store during a non-blocking Transition](https://react.dev/reference/react/useSyncExternalStore#caveats). The React team has acknowledge and announced a new [concurrent store API](https://react.dev/blog/2025/04/23/react-labs-view-transitions-activity-and-more#concurrent-stores) to resolve this issue.

This package is a ponyfill based on the [initial stubs](https://github.com/facebook/react/pull/33215) of the concurrent store API which uses existing react internals to implement a fully compatible API that allows for mutating during a non-blocking transition and does not de-opt to a synchronous update. In turn, this will not trigger the nearest suspense boundary in this case, and resolves the issue present in `useSyncExternalStore`.

**You can use this package today as a ponyfill without using an experimental version of React.**

## Usage

```jsx
import { createStore, useStore } from "react-use-store";
import { Suspense, use } from "react";

// Create a store that manages an async resource
const fetchUser = async (id) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

const userStore = createStore(fetchUser(1));

function UserProfile() {
  // useStore resolves and caches the value from any calls to update between renders including transitions. This behavior makes it trivial to work with promises and integrate with suspense.
  const userPromise = useStore(userStore);
  const user = use(userPromise);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={() => userStore.update(fetchUser(user.id + 1))}>
        Load Next User
      </button>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile />
    </Suspense>
  );
}

// You can also use stores with reducers, and the state doesn't have to be asynchronous
const counterStore = createStore({ count: 0 }, (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
});

function Counter() {
  const state = useStore(counterStore);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => counterStore.update({ type: "increment" })}>
        Increment
      </button>
      <button onClick={() => counterStore.update({ type: "decrement" })}>
        Decrement
      </button>
    </div>
  );
}
```

## API Reference

### `createStore(initialValue, reducer?)`

Creates a new store with the given initial value and optional reducer function.

**Parameters:**

- `initialValue: T` - The initial value of the store
- `reducer?: (currentValue: T, action: Action) => T` - Optional reducer function to handle state updates. For stores without actions, you can provide a reducer that takes only the current value: `(currentValue: T) => T`

**Returns:** `ReactStore<T, Action>` - A store object with an `update` method

### `useStore(store)`

Hook that subscribes to a store and returns its current value. For stores managing async resources (promises), the returned value should be passed to React's `use()` hook within a Suspense boundary.

**Parameters:**

- `store: ReactStore<T, Action>` - The store to subscribe to

**Returns:** `T` - The current value of the store (or Promise for async stores)

### Store Methods

#### `store.update(action?)`

Updates the store with the given action. If a reducer was provided to `createStore`, it will be called with the current value and the action. If no reducer was provided, the action should be the new value. For reducers that don't take actions, you can call `update()` with no arguments.

**Parameters:**

- `action?: Action` - The action to dispatch, new value to set, or omitted for reducers without actions

## How It Works

This ponyfill uses React's internal cache system to provide concurrent-safe state management, particularly useful managing async resources. It leverages:

- `getCacheForType` - React's internal caching mechanism
- `useCacheRefresh` - React's cache invalidation system

The implementation ensures that:

- State updates are concurrent-safe
- Components re-render when store values change
- Store values are properly cached and life-cycled by react making it trivial to manage async resources wth suspense.
- The API matches the planned React concurrent stores feature
- TypeScript types are properly inferred

## Migration Path

When React's concurrent stores feature becomes stable, you can migrate by:

1. Replacing the import:

```jsx
// Before
import { createStore, useStore } from "react-use-store";

// After
import { createStore, use } from "react";
```

2. Replace `useStore` calls with direct `use` calls:

```jsx
// Before (with this ponyfill)
const userPromise = useStore(userStore);
const user = use(userPromise);

// After (with native React concurrent stores)
const user = use(userStore);
```

3. For synchronous stores, you may need to adjust based on the final React API, currently `use` will support anything that is a Usable, Context, or Store:

```jsx
// Current ponyfill approach
const state = useStore(counterStore);

// Future native approach (TBD - API may differ)
const state = use(counterStore);
```

The API is designed to be as close as possible to the proposed React concurrent stores feature. The main difference is that this ponyfill provides a `useStore` hook that returns a cached and life-cycled value, which you then pass to React's `use` hook for integration with suspense.

The `use` hook will accept a store directly in the expected final API.

## License

MIT © [Justin Walsh]()
