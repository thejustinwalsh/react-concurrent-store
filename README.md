# react-concurrent-store

A store for React 19 that works with Transitions, implementing the
`createStore` / `useStore` API proposed in
[React RFC #35449](https://github.com/facebook/react/issues/35449). No
experimental React build.

```bash
npm install react-concurrent-store
```

## The problem

React lets you mark an update as a Transition, so the current screen stays up
while the next one gets ready. That works for state held in components. It does
not work for state held in a store.

React's own documentation says why. A store changed during a Transition makes
React [redo that update as a blocking one](https://react.dev/reference/react/useSyncExternalStore#caveats),
and suspending on a value read through `useSyncExternalStore` replaces what is
on screen with a fallback.

So a navigation that should have kept the current page up shows a spinner
instead — and any update the user makes while waiting is stuck behind it.

## How it works

The store keeps two versions of its state:

- **everything** — every action applied, in the order you dispatched them.
- **on screen** — only the ones a component is allowed to show right now.

They are usually the same object. They come apart only while a Transition is in
flight, and they rejoin when it commits.

What tells them apart is one thing, recorded when you dispatch: whether the
caller was inside `startTransition`.

```tsx
// Goes into "everything". Not shown until its data is ready.
startTransition(() => store.dispatch({ type: "navigate", to: "/profile" }));

// Goes into both — and into "on screen" applied to the feed, not to the
// profile that has not loaded.
store.dispatch({ type: "like" });
```

A dispatch takes one of four paths:

| when | what happens |
| --- | --- |
| nothing is in flight | both versions take it, one notification |
| inside a Transition | only *everything* takes it, at Transition priority |
| a blocking update while a Transition is in flight | *on screen* applies it to what is on screen; *everything* applies it in order. Two notifications: the first now, the second in a Transition |
| a blocking update whose new value is a promise | the versions rejoin and the boundary shows a fallback — there is no version of a value that has not arrived |

The third row is the whole point. The user's like is applied to the feed they
are looking at rather than to the profile that is still loading, and when the
profile arrives both actions are there in the order they were made.

A component reads *on screen*. `getState()` returns *everything*. While a
Transition is in flight those differ, deliberately.

## How React would implement it

Most of this package exists to reconstruct things the reconciler already knows.
A version inside React keeps the idea and deletes the scaffolding.

**It would read the Transition directly.** Knowing whether the caller was inside
`startTransition` is the one thing this package cannot get from a public API —
it reads an internal field, which is the only unsupported thing it does. React
has that for free.

**It would not need two versions of the state.** React already rebases its own
update queue by lane: a `useState` update made during a Transition is replayed
on top of whatever committed first. The two versions here are a hand-rolled
copy of machinery React has.

**It would let a component join a Transition already in flight.** This is the
one behaviour userland cannot reproduce. `startTransition` can start a
Transition but never join one, so a component that mounts while a Transition is
blocked has to show what its siblings show and correct itself afterwards — which
costs a second run of any Effect keyed on the value. React can add a fiber to a
lane that already exists, and the problem disappears.

**It would hand the render its value.** When a store changes, this package runs
the selector once to decide whether to re-render and the component runs it again
to produce the value. React schedules the render itself, so it can carry the
value with it — one call instead of two.

What is left is small: the decision above, which is about fifty lines.

## What it reads from React

```ts
const clientInternals = (React as …).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
const transitionScope = (): unknown => clientInternals?.T ?? null;
```

Read, never written, and the only unsupported thing here. React's own proof of
concept ([facebook/react#33215](https://github.com/facebook/react/pull/33215))
reads the same field for the same reason.

It is not incidental. Make that read answer "never in a Transition" and 44 of
157 tests fail, including every Transition case, and what is left behaves like
`useSyncExternalStore`. If React ever stops exposing it, the first dispatch
throws rather than quietly losing every Transition.

## API

```ts
createStore(initialValue)                    // an action is a value or an updater
createStore(initialValue, reducer)           // an action is whatever the reducer takes

useStore(store)                              // the whole value
useStore(store, (state, previous) => slice)  // a slice; return `previous` to skip the render

store.getState()
store.dispatch(action)
store.subscribe(action => {})
```

`useStore` is a Hook, so the main entry carries `"use client"`. `createStore` is
not, and ships separately for use in a Server Component:

```ts
import { createStore } from "react-concurrent-store/store";
```

[Full reference and guides](https://thejustinwalsh.com/react-concurrent-store)

## The demo

**[react-use-store.tjw.dev](https://react-use-store.tjw.dev)** — eight pages,
each one live, covering navigation, mixed updates, selectors, refetching,
server rendering and Server Components.

Or run it yourself:

```bash
pnpm --filter @react-concurrent-store/app dev
```

## License

MIT © [Justin Walsh]()
