# react-concurrent-store

A userland implementation of the `createStore` / `useStore` API proposed in
[React RFC #35449](https://github.com/facebook/react/issues/35449), for React
19 and up. No experimental React build required.

## Why

An external store read with `useSyncExternalStore` cannot take part in a
transition: a store update during one
[opts the transition out](https://react.dev/reference/react/useSyncExternalStore#caveats)
and React flushes it synchronously. So a navigation that should have kept the
old screen up drops to a fallback instead, and the caller's
`startTransition` — which said exactly what it wanted — is discarded by the
hook doing the reading.

`useStore` honours it. It does that by reading one field out of React —
[see below](#what-it-reads-from-react).

```tsx
// Navigate to a page whose data has not arrived. The screen keeps what it has.
startTransition(() => store.dispatch({ type: "navigate", to: "/profile" }));

// The user likes something while they wait. This has to be visible now, and it
// lands on the page they are actually looking at — not on the one still loading.
store.dispatch({ type: "like" });
```

| | screen | store |
| --- | --- | --- |
| navigating | `home/0` | `profile/0` |
| after the like | `home/1` | `profile/1` |
| after the page loads | `profile/1` | `profile/1` |

The like is visible immediately, no half-loaded profile is ever shown, and the
final state has both actions in the order they were dispatched.

## Install

```bash
npm install react-concurrent-store
```

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

An equality-function wrapper ships from its own entry point, so it costs
nothing unless imported:

```ts
import { useStoreWithEqualityFn } from "react-concurrent-store/with-equality-fn";
```

## How it works

Two folds over the same actions, told apart by one thing recorded at dispatch —
whether the caller was inside a transition:

- **head** — every action, in dispatch order
- **sync** — only the urgent ones: what the tree may show right now

Every action enters `head`. An urgent one also enters `sync`; a transition's
does not, and stays out until the tree catches up. That is why an urgent update
lands on what is on screen rather than on a state the user cannot see yet, and
why the actions are back in dispatch order once the transition commits.

State is carried on a promise with `status`/`value` expandos, the shape React
reads to unwrap `use()` without a microtask. That is what lets a store hold a
value that is not ready yet, and lets the same object serve a suspending client
read and a synchronous server render.

## What it reads from React

`useStore` needs one thing React does not expose: whether the caller was inside
`startTransition` when they dispatched.

```ts
const clientInternals = (React as …).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
const transitionScope = (): unknown => clientInternals?.T ?? null;
```

Read, never written, feature-detected, and the only unsupported thing this
package does. No experimental React build is needed — but that is why.

It is not incidental. With that field, 152 tests pass. Stub it out and 42 fail,
including every transition case, and what is left behaves like
`useSyncExternalStore`.

There is no public replacement. A library can only be told by its caller, and
being told misses every transition started on your behalf — which is most of
them, because a router starts navigations inside itself. Which makes this the
clearest case for the feature landing in React rather than an argument against
it: the reconciler has this information for free.

## The demo

`packages/app` runs the cases in a real browser, with real React and no test
harness.

```bash
pnpm --filter @react-concurrent-store/app dev
```

| Page | What you can watch |
| --- | --- |
| **Gauntlet** | Six live panels — rebasing, tearing, Suspense, error reset, selectors, two roots — each with a **Run** that plays a scripted sequence slowly and ends in a verdict showing every reading it took |
| **Router** | The same navigation in two columns that differ only in the hook reading the route. One loses the page to its own fallback; the other stays interactive and takes a like |
| **One atom** | A slow query and a keystroke, three ways. `useSyncExternalStore` loses the dashboard; making every dispatch a transition keeps the dashboard but queues the keystroke; urgency per dispatch keeps both |
| **Identity** | A normalized read builds a fresh tree every time. Relay's `recycleNodesInto`, which is what the `(state, previous)` selector signature is for, takes twelve stats renders down to six |
| **Fetching** | An optimistic update made while a refetch is in flight. A deferred value can hold the list that was there before; it cannot hold that list with your change applied |

Readings come from a probe outside React, written from ref callbacks, layout
effects and passive effects, so what a reader *committed* is distinguishable
from what it merely rendered and from what was attached to the DOM.

## When a selector throws

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

This is the behaviour react-redux's `useSelector` suite specifies, checked here
both directly and through a react-redux-shaped harness.

## Still to do

- Streaming of promises and store values

Full reference and guides:
[thejustinwalsh.com/react-concurrent-store](https://thejustinwalsh.com/react-concurrent-store)

## License

MIT © [Justin Walsh]()
