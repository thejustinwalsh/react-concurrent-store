# Experimental Concurrent-Safe React Store API

WARNING: This is an experimental API that is not intended for production use. It is subject to change without notice, has meaningful performance/correctness caveats, and depends on internal implementation details of the current version of React.

## Project Goals

The goal of this implementation is to appoximate a "concurrent-compatible" React store API in user space in order to quickly explore what shape such an API would need to take in order to be compatible with existing ecosystem offerings.

It also serves as a proof of concept demonstrating how close a user space implementation can get while highlighting what still remains impossible or sub optimal without a proper React implementation.

## Implementation Goals

The goals of this implementation are to build an API that is spiritually similar to [`useSyncExternalStoreWithSelector`](https://github.com/facebook/react/blob/903366b8b1ee4206020492c6e8140645c0cb563e/packages/use-sync-external-store/src/useSyncExternalStoreWithSelector.js#L19) but with semantics that match how a `useReducer` exposed in context would behave when used with concurrent features.

Historically libraries which aim to provide a shared data store/cache to many components in the tree have had to choose between three sub-optimal approaches:

1. State + `useContext` - Forces all components that observe any portion of the state to rerender on each update.
2. `useSyncExternalStoreWithSelector` - Forces all state updates to flush sync, precluding the use of store updates participating in transitions.
3. Manually subscribe to a slice of the store in each component - Introduces potential tearing when components mount mid transition, and does not match React's rebasing semantics

This implementation explores a novel implementation of approach three which ensures:

- When a new state reader component mounts during a transition that is actively updating the store state, that component should mount with the pre-transition state and then update to the transition state along with all other readers
- When a store recieves a sync update while still processing a transition update, the sync update should flush sync and match React's [state update reordering](https://jordaneldredge.com/notes/react-rebasing/) semantics.

## Known Issues

In the case of a store-reading component mounting syncronously while the store is updating as part of a transition, the component will initially render with the transition state and then attempt to "fix-up" inside a `useLayoutEffect` to the pre-transition state, in order to avoid tearing.

This is sub-optimal from a performance perspective since it means the component must render twice. **It also introduces a potential correctness problem.** If the newly mounted component suspends when attempting to render the transition state it will not mount and thus be unable to apply the fix-up. If that some component would not have suspended in the sync state, this is incorrect behavior and technically a bug.

## API

### `<StoreProvider />`

Your application must have _exactly one_ instance of `<StoreProvider />` at the root of your component such that all components which read from stores are nested within it. This component is an implementation detail of our user-space approach and should not be needed in a first-party implementation of these APIs.

```ts
import { experimental } from "<this-library>";
import { createRoot } from "react-dom/client";
const { StoreProvider } = experimental;


import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StoreProvider>
    <App />
  </StoreProvide>
);
```

### `createStore`

Creates a simple store that works similarly to `useReducer`.

```ts
import { experimental } from "<this-library>";
const { createStore } = experimental;

function reducer(state, action) {
  switch (state.type) {
    case "increment":
      return state + 1;
    default:
      return state;
  }
}

const counterStore = createStore(reducer, 1);

counterStore.dispatch({ type: "increment" });
```

Of course, your actions and reducer can be whatever you want:

```ts
import { experimental } from "<this-library>";
const { createStore } = experimental;

function reducer(state, action) {
  return action(state);
}

const counterStore = createStore(reducer, 1);

counterStore.dispatch((previous) => previous + 1);
```

**Note:**

The `reducer` function _must not_ produce side effects. It may occasionally be invoked to produce temporary states. See [React’s useTransition and state update reordering](https://jordaneldredge.com/notes/react-rebasing/).

### `createStoreFromSource`

Creates a store from some non-React data source. Note that concurrent features places additional requirements on the external state source. Specifically that all updates be expressable as a pure function which can be provided to React such that it can implement update reordering if needed.

```ts
import { experimental } from "<this-library>";
const { createStoreFromSource } = experimental;

const state = 1;

const counterSource = {
  reducer(state, action) {
    return action(state);
  },
  getState() {
    return state;
  },
};

const counterStore = createStoreFromSource(counterSource);

function increment() {
  const action = (n) => n + 1;
  state = counterSource.reducer(action);
  counterStore.handleUpdate(action);
}

increment();
```

**Note:**

- It is the source's responsibilty to notify the store _after_ each update by calling `store.handleUpdate(action)`.
- The store returned from `createStoreFromSource` is read only. All updates must be triggered by the data source.

### `useStore`

Use the entire store value in a component:

```ts
import { experimental } from "<this-library>";
import counterStore from "./MyStore";
const { useStore } = experimental;

function Counter() {
  const count = useStore(counterStore);
  return <div>The count is {count}</div>
}
```

### `useStoreSelector`

Use a value derived from the store in a component.

```ts
import { experimental } from "<this-library>";
import counterStore from "./MyStore";
const { useStoreSelector } = experimental;

function getIsEven(count) {
  return count % 2 === 0;
}

function Counter() {
  const isEven = useStoreSelector(counterStore, getIsEven);
  return <div>The count is {isEven ? "even" : "odd"}</div>
}
```

**Note:** There are special requirements of selectors:

- They must be stable. Currently, the identity of the selector function may not change between renders.
- The selector value _should_ be memoized. In some cases the hook will call the selector multiple times and use the `===` equality to determine if a fix-up render is needed. Note that unlike sync stores there may be multiple states in play at any given time. A `WeakMap` memoizaiton technique is recomended.
