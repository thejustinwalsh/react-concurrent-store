type ListenerEntry<T extends Array<unknown>> = {
  cb: (...value: T) => void;
  prev: ListenerEntry<T> | null;
  next: ListenerEntry<T> | null;
};

export default class Emitter<T extends Array<unknown>> {
  private _firstListener: ListenerEntry<T> | null = null;
  private _lastListener: ListenerEntry<T> | null = null;

  subscribe(cb: (...value: T) => void): () => void {
    const entry: ListenerEntry<T> = {
      cb,
      prev: this._lastListener,
      next: null,
    };
    if (this._lastListener) {
      this._lastListener.next = entry;
    }
    this._lastListener = entry;
    if (!this._firstListener) {
      this._firstListener = entry;
    }

    return () => {
      if (entry.prev) {
        entry.prev.next = entry.next;
      } else {
        this._firstListener = entry.next;
      }
      if (entry.next) {
        entry.next.prev = entry.prev;
      } else {
        this._lastListener = entry.prev;
      }
    };
  }

  notify(...value: T) {
    let current = this._firstListener;
    while (current) {
      current.cb(...value);
      current = current.next;
    }
  }

  get listenerCount(): number {
    // This could be made more efficient by caching the result or updating the counter
    // on subscribe/unsubscribe, if this turn out to be a hot path.
    let count = 0;
    let current = this._firstListener;

    while (current) {
      count++;
      current = current.next;
    }

    return count;
  }
}
