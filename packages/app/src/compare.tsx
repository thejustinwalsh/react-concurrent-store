import { Suspense, type ReactNode } from "react";

export type Kind = "today" | "naive" | "ours";

/**
 * One column of a side-by-side. Its own Suspense boundary, so a column that
 * loses its page loses only its own.
 */
export function Side({
  how,
  tag,
  kind,
  note,
  fallback,
  pending = false,
  children,
}: {
  how: string;
  tag: string;
  kind: Kind;
  note: ReactNode;
  fallback: ReactNode;
  /** Whether this column has a Transition in flight, from its own useTransition. */
  pending?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={`side ${kind}${pending ? " pending" : ""}`}>
      <header>
        <code className="how">{how}</code>
        {pending && <span className="pulse">pending</span>}
        <span className="tag">{tag}</span>
      </header>
      <Suspense fallback={fallback}>{children}</Suspense>
      <p className="note">{note}</p>
    </section>
  );
}

/** What a column shows when its boundary has taken the page. */
export function Blocked({ what, why }: { what: string; why: string }) {
  return (
    <div className="mock">
      <div className="blocked">
        <span className="big">⏳ {what}</span>
        <span className="why">{why}</span>
      </div>
    </div>
  );
}
