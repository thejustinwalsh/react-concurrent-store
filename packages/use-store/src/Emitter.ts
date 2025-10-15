export default class Emitter {
  _listeners: Array<() => void> = [];
  subscribe(cb: () => void): () => void {
    const wrapped = () => cb();
    this._listeners.push(wrapped);
    return () => {
      this._listeners = this._listeners.filter((s) => s !== wrapped);
    };
  }
  protected notify() {
    this._listeners.forEach((cb) => {
      cb();
    });
  }
}
