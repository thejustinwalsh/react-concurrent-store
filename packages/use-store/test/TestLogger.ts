import {expect} from 'vitest';

// Emulate the Scheduler.log/assertLog pattern from React internal tests
export default class Logger {
  _logs: Array<unknown> = [];
  log(value: unknown) {
    this._logs.push(value);
  }
  assertLog(expected: Array<unknown>) {
    const previous = this._logs;
    // Reset logs before assertings so that if we fail the assertion we don't
    // also fail the `afterEach` check.
    this._logs = [];

    expect(previous).toEqual(expected);
  }
}
