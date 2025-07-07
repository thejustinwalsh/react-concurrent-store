# react-use-store

Ponyfill of experimental React concurrent stores.
> [!WARNING]
> **This package uses React internals** that could be removed in any future version at any time. Specifically, we use `getCacheForType` and `useCacheRefresh` from React's internal APIs. These internals have been available in both React 19.0 and React 19.1 releases, but there is no guarantee they will remain available in future versions.

_Work In Progress_  
- [x] Update types and add support for stores without a reducer
- [ ] Add tests for Suspense and useTransition with async stores or stores of promises (in-progress)
- [ ] Add docs site with interactive examples

## Usage

This package implements the same API as the experimental React concurrent stores feature, based on the [React Labs announcement](https://react.dev/blog/2025/04/23/react-labs-view-transitions-activity-and-more#concurrent-stores) and the [initial implementation](https://github.com/facebook/react/pull/33215). You can use this package as a ponyfill, without using an experimental version of React.

### Usage

```jsx
import { createStore, useStore } from "react-use-store";

// Create a store with initial value and reducer
const counterStore = createStore({ count: 0 }, (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
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
      <button onClick={() => counterStore.update({ type: "reset" })}>
        Reset
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
- `reducer?: (currentValue: T, action: Action) => T` - Optional reducer function to handle state updates

**Returns:** `ReactStore<T, Action>` - A store object with an `update` method

### `useStore(store)`

Hook that subscribes to a store and returns its current value.

**Parameters:**

- `store: ReactStore<T, Action>` - The store to subscribe to

**Returns:** `T` - The current value of the store

### Store Methods

#### `store.update(action)`

Updates the store with the given action. If a reducer was provided to `createStore`, it will be called with the current value and the action. Otherwise, the action should be the new value.

**Parameters:**

- `action: Action` - The action to dispatch or new value to set

## How It Works

This ponyfill uses React's internal cache system to provide concurrent-safe state management. It leverages:

- `getCacheForType` - React's internal caching mechanism
- `useCacheRefresh` - React's cache invalidation system

The implementation ensures that:

- State updates are concurrent-safe
- Components re-render when store values change
- The API matches the planned React concurrent stores feature
- TypeScript types are properly inferred

## Compatibility

- **React Version:** Requires React 19.0 or higher
- **Environment:** Works in both client and server environments
- **Bundlers:** Compatible with all major bundlers (Webpack, Vite, etc.)

## Migration Path

When React's concurrent stores feature becomes stable, you can migrate by:

1. Replacing the import:

   ```jsx
   // Before
   import { createStore, useStore } from "react-use-store";

   useStore(store);

   // After
   import { createStore, use } from "react";

   use(store);
   ```

2. The API is designed to be as close to what has been published regarding concurrent stores, though the ponyfill provides a `useStore` hook rather than overriding the `use` hook directly. When migrating to the official concurrent store implementation, you can pass your store to the `use` hook.

## License

MIT © [Justin Walsh]()
