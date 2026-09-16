# react-concurrent-store

Ponyfill of experimental React concurrent stores.

_Work In Progress_

- [x] Update types and add support for stores without a reducer
- [x] Add tests for Suspense and useTransition with async stores or stores of promises
- [x] Align the API with [React RFC #35449](https://github.com/facebook/react/issues/35449) (`createStore(initialValue, reducer?)`, `useStore(store, selector?)`)
- [x] Selector support with a custom equality function
- [x] SSR and hydration without a `getServerSnapshot` equivalent
- [x] Add a docs site, and a live demo that exercises the concurrent edges
- [ ] Streaming of promises and store values

## Why

Managing async resources with `useSyncExternalStore` breaks concurrency when [mutating the store during a non-blocking Transition](https://react.dev/reference/react/useSyncExternalStore#caveats). The React team has announced a new [concurrent store API](https://react.dev/blog/2025/04/23/react-labs-view-transitions-activity-and-more#concurrent-stores) to resolve this issue.

This package is a ponyfill based on the [initial stubs](https://github.com/facebook/react/pull/33215) of the concurrent store API as the `useStore` hook. The hook aims to implement this API in user land which allows for mutating during a non-blocking transition and does not de-opt to a synchronous update, avoiding the issue present in `useSyncExternalStore`.

This ponyfill exists to generate feedback and to get a feel for the upcoming concurrent store API.
This package will be deprecated once the concurrent store feature is released in the core React library.

**You can use this package today as a ponyfill without using an experimental version of React.**

## Usage

```jsx
import { createStore, useStore } from "react-concurrent-store";
import { Suspense, use } from "react";

// Create a store that manages an async resource
const fetchUser = async (id) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

const userStore = createStore(fetchUser(1));

function UserProfile() {
  // useStore resolves and caches the value from calls to update between renders/transitions
  // This behavior makes it trivial to work with promises and integrate with suspense
  const userPromise = useStore(userStore);
  const user = use(userPromise);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={() => userStore.dispatch(fetchUser(user.id + 1))}>
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

// Pass a selector to read a slice. The component only re-renders when the
// selected value changes.
function UserName() {
  const name = useStore(userStore, (user) => user.name);
  return <h1>{name}</h1>;
}

// A selector also receives its own previous result, so it can decide for
// itself when nothing has changed. Returning the previous value unchanged is
// how you tell useStore to skip the render.
function VisibleTodos() {
  const todos = useStore(todoStore, (state, previous) => {
    const next = state.todos.filter((todo) => !todo.done);
    return previous?.length === next.length &&
      previous.every((todo, i) => todo === next[i])
      ? previous
      : next;
  });
  return <List items={todos} />;
}

// If you would rather pass an equality function, that wrapper ships from its
// own entry point so it costs nothing unless you import it.
import { useStoreWithEqualityFn } from "react-concurrent-store/with-equality-fn";

function UserCard() {
  const { name, email } = useStoreWithEqualityFn(
    userStore,
    (user) => ({ name: user.name, email: user.email }),
    shallowEqual,
  );
  return <p>{name} — {email}</p>;
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
      <button onClick={() => counterStore.dispatch({ type: "increment" })}>
        Increment
      </button>
      <button onClick={() => counterStore.dispatch({ type: "decrement" })}>
        Decrement
      </button>
    </div>
  );
}
```

## The gauntlet

`packages/app` is a live demo of the behaviour this library exists for, in a
real browser with real React and no test harness. Six panels, each driveable by
hand, each with a **Run** that plays a scripted sequence slowly enough to watch
and ends in a verdict showing every reading it took.

```bash
pnpm --filter @react-concurrent-store/app dev
```

| Panel | What you can watch |
| --- | --- |
| Rebasing | A sync action lands on what is on screen, then is re-ordered behind a held transition when that commits: the screen goes `bc` then `Abc` while the store reads `Ab` then `Abc` |
| Nobody arrives early | A reader revealed mid-transition, and an `<Activity>` tree being shown, both wait for the tree instead of arriving on a version nothing else has |
| Suspense | The fallback a sync update asks for, against the one a transition must not produce |
| Error reset | Why resetting a boundary alone puts you straight back in the fallback, and what actually clears it |
| Selectors | Committed render counts per reader, with no equality function |
| Two roots | Separate `createRoot` trees sharing one store, one of them in StrictMode, with no provider |

Readings come from a probe outside React, written from ref callbacks, layout
effects and passive effects, so what a reader *committed* is distinguishable
from what it merely rendered and from what was attached to the DOM.

## How it works

Two folds over the same actions, told apart by one thing recorded at dispatch —
whether the caller was inside a transition:

- **head** — every action, in dispatch order
- **sync** — only the urgent ones: what the tree may show right now

Every action enters `head`. An urgent one also enters `sync`; a transition's
does not, and stays out until the tree catches up. So an urgent update lands on
what is on screen rather than on a state the user cannot see yet, and when the
transition commits the actions are re-ordered into the order they were
dispatched.

State is carried on a promise with `status`/`value` expandos, the shape React
reads to unwrap `use()` without a microtask. That is what lets a store hold a
value that is not ready yet, and lets the same object serve a suspending client
read and a synchronous server render.

## API

```ts
createStore(initialValue)                       // action is a value or an updater
createStore(initialValue, reducer)              // action is whatever the reducer takes

useStore(store)                                 // the whole value
useStore(store, (state, previous) => slice)     // a slice; return `previous` to skip the render

store.getState()                                // outside React
store.dispatch(action)
store.subscribe(action => {})                   // getState() is up to date inside the callback
```

An equality-function wrapper ships from its own entry point so it costs nothing
unless imported:

```ts
import { useStoreWithEqualityFn } from "react-concurrent-store/with-equality-fn";
```

### When a selector throws

A speculative throw is a question the store cannot answer, so it asks render
instead. A throw in render is an error.

The store calls your selector in two situations. **During render** it is
producing the value a component is about to show, so a throw there is left
alone and reaches your error boundary. **Speculatively** — when an update is
published, when a view attaches, and when the tree commits past a reader — it is
only deciding whether that reader needs to re-render, and a throw is usually the
zombie-child case: the selector asked about a state its component will not be
rendered with, because a parent already removed it. Those are swallowed and the
update is forwarded, so the selector throws again during render if the component
really is about to use it, and only then does it surface.

```tsx
// Throws harmlessly while the store is only asking whether this reader is
// affected. Throws for real, to the boundary, if this component still renders it.
const item = useStore(store, (state) => {
  const found = state.items[id];
  if (found === undefined) throw new Error(`missing ${id}`);
  return found;
});
```

This is the behaviour React-Redux's `useSelector` suite specifies, checked here
both directly and through a React-Redux-shaped harness.

Full reference, guides, and the one thing a userland version cannot do:
[thejustinwalsh.com/react-concurrent-store](https://thejustinwalsh.com/react-concurrent-store)

## License

MIT © [Justin Walsh]()
