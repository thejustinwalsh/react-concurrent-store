export default class Emitter<T extends Array<unknown>> {
  _listeners: Set<(...value: T) => void> = new Set();

  subscribe(cb: (...value: T) => void): () => void {
    this._listeners.add(cb);

    return () => {
      this._listeners.delete(cb);
    };
  }

  notify(...value: T) {
    for (const cb of this._listeners) {
      cb(...value);
    }
  }
}
