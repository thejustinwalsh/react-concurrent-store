import Emitter from "./Emitter";
import { Store } from "./Store";

type RefCountedSubscription = {
  count: number;
  unsubscribe: () => void;
};

type StoresSnapshot = Map<Store<unknown, unknown>, unknown>;

/**
 * StoreManager tracks all actively rendered stores in the tree and maintains a
 * reference-counted subscription to each one. This allows the <CommitTracker />
 * component to observe every state update and record each store's committed
 * state.
 */
export class StoreManager extends Emitter<[]> {
  _storeRefCounts: Map<Store<unknown, unknown>, RefCountedSubscription> =
    new Map();

  getAllCommittedStates(): StoresSnapshot {
    return new Map(
      Array.from(this._storeRefCounts.keys()).map((store) => [
        store,
        store.getCommittedState(),
      ])
    );
  }

  getAllStates(): StoresSnapshot {
    return new Map(
      Array.from(this._storeRefCounts.keys()).map((store) => [
        store,
        store.getState(),
      ])
    );
  }

  addStore(store: Store<any, any>) {
    const prev = this._storeRefCounts.get(store);
    if (prev == null) {
      this._storeRefCounts.set(store, {
        unsubscribe: store.subscribe(() => {
          this.notify();
        }),
        count: 1,
      });
    } else {
      this._storeRefCounts.set(store, { ...prev, count: prev.count + 1 });
    }
  }

  commitAllStates(state: StoresSnapshot) {
    for (const [store, committedState] of state) {
      store.commit(committedState);
    }
    this.sweep();
  }

  removeStore(store: Store<any, any>) {
    const prev = this._storeRefCounts.get(store);
    if (prev == null) {
      throw new Error(
        "Imblance in concurrent-safe store reference counting. This is a bug in react-use-store, please report it."
      );
    }
    // We decrement the count here, but don't actually do the cleanup.  This is
    // because a state update could cause the last store subscriber to unmount
    // while also mounting a new subscriber. In this case we need to ensure we
    // don't lose the currently commited state in the moment between when the
    // clean-up of the unmounting component is run and the useLayoutEffect of
    // the mounting component is run.

    // So, we cleanup unreferenced stores after each commit.
    this._storeRefCounts.set(store, {
      unsubscribe: prev.unsubscribe,
      count: prev.count - 1,
    });
  }

  sweep() {
    for (const [store, refs] of this._storeRefCounts) {
      if (refs.count < 1) {
        refs.unsubscribe();
        this._storeRefCounts.delete(store);
      }
    }
  }
}
