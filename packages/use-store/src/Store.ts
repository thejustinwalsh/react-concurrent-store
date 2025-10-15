import * as React from "react";
import { startTransition } from "react";
import { ISource } from "./types";
import Emitter from "./Emitter";

/**
 * Concurrent-Safe Store
 *
 * The store and a associated hook ensures that when new store readers mount,
 * they will observe the same state as all other components currently mounted,
 * even if the store's state is currently updating within a slow transition.
 *
 * They further ensure that React's rebasing rules apply to state observed via
 * these hooks. Specifically, updates always apply in the order in chronological
 * order. This means that if a sync update to the store is triggered while a
 * transition update to the store is still pending that sync update will apply
 * on top of the pre-transition state (as if the transition update had not yet
 * happened), but when the transition resolves it will reflect the chronological
 * ordering of: initial, transition, sync.
 *
 * Note: Rather than expose generic versions of these hooks/providers and have them
 * read the store via context, we use a factory function which returns pre-bound
 * functions. This has the advantage of producing typed variants of the hooks.
 *
 * A more standard context based solution should also be possible.
 */

const sharedReactInternals: { T: unknown } =
  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE as any;

function reactTransitionIsActive() {
  return !!sharedReactInternals.T;
}

export class Store<S, A> extends Emitter<[]> {
  private source: ISource<S, A>;
  private state: S;
  private committedState: S;
  constructor(source: ISource<S, A>) {
    super();
    this.source = source;
    this.state = source.getState();
    this.committedState = source.getState();
  }

  commit(state: S) {
    this.committedState = state;
  }
  getCommittedState(): S {
    return this.committedState;
  }
  getState(): S {
    return this.state;
  }
  handleUpdate(action: A) {
    const noPendingTransitions = this.committedState === this.state;

    this.state = this.source.getState();

    if (reactTransitionIsActive()) {
      // For transition updates, everything is simple. Just notify all readers
      // of the new state.
      this.notify();
    } else {
      // For sync updates, we must consider if we need to juggle multiple state
      // updates.

      // If there are no pending transition updates, things are very similar to
      // a transition update except that we can proactively mark the new state
      // as committed.
      if (noPendingTransitions) {
        this.committedState = this.state;
        this.notify();
      } else {
        // If there are pending transition updates, we must ensure we compute
        // an additional new states: This update applied on top of the current
        // committed state.

        const newState = this.state;

        // React's rebasing semantics mean readers will expect to see this
        // update applied on top of the currently committed state sync.
        this.committedState = this.source.reducer(this.committedState, action);
        // Temporarily set the state so that readers during this notify read the
        // new committed state.
        this.state = this.committedState;
        this.notify();

        // Now that we've triggered the sync updates, we need to ensure the
        // pending transition update now goes to the correct new state. We reset
        // the state to point to the new transition state and trigger a set of
        // updates inside a transition.

        // With existing transition semantics this should result in these
        // updates entangling with the previous transition and that transition
        // will now include this state instead of the previously pending state.
        this.state = newState;
        startTransition(() => {
          this.notify();
        });
      }
    }
  }
}
