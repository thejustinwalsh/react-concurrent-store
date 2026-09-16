import { Component, type ReactNode } from "react";

/**
 * A boundary with an explicit reset, plus `resetKeys` in the style of
 * react-error-boundary. Written out rather than pulled in so the reset path is
 * readable — it is the whole point of the error scenario.
 */
export class Boundary extends Component<
  {
    children: ReactNode;
    resetKeys?: readonly unknown[];
    onCaught?: (error: Error) => void;
    fallback: (error: Error, reset: () => void) => ReactNode;
  },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    this.props.onCaught?.(error);
  }

  componentDidUpdate(previous: {
    resetKeys?: readonly unknown[];
  }) {
    const before = previous.resetKeys ?? [];
    const now = this.props.resetKeys ?? [];
    if (
      this.state.error !== null &&
      (before.length !== now.length ||
        before.some((key, i) => !Object.is(key, now[i])))
    ) {
      this.setState({ error: null });
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    return this.state.error === null
      ? this.props.children
      : this.props.fallback(this.state.error, this.reset);
  }
}
