export const REACT_STORE_TYPE: symbol = Symbol.for("react.store");

export type ReactStore<Value, Action = Value> = {
  [REACT_STORE_TYPE]: never;
  update: (action: Action) => void;
};


export type Reducer<S, A> = (state: S, action: A) => S;
