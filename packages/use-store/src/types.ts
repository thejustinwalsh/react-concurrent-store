export const REACT_STORE_TYPE: symbol = Symbol.for("react.store");

export type ReactStore<Value, Action = Value> = {
  [REACT_STORE_TYPE]: never;
  update: (action: Action) => void;
};

/**
 * Represents a data source which can be connected to React by wrapping it as a
 * React Store
 */
export interface ISource<S, A> {
  /**
   * Returns an immutable snapshot of the current state
   */
  getState(): S;
  /**
   * A pure function which takes and arbitrary state and an updater/action and
   * returns a new state.
   *
   * React needs this in order to generate temporary states.
   *
   * See: https://jordaneldredge.com/notes/react-rebasing/
   */
  reducer: Reducer<S, A>;
  /**
   * A function which takes an updater/action, syncronously updates the state
   * returned by `getState` and optinonally synchronously notifies non-React
   * consumers.
   *
   * TODO(captbaritone): I think this can be improved.
   */
  dispatch(action: A): void;
}

export type Reducer<S, A> = (state: S, action: A) => S;
