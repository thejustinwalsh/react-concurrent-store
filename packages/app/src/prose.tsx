import type { ReactNode } from "react";

/**
 * The teaching furniture from react.dev: a lede that says what the page is
 * about and what you will learn, and the Note / Pitfall callouts.
 */

export function Lede({
  title,
  learn,
  children,
}: {
  title: string;
  learn: string[];
  children?: ReactNode;
}) {
  return (
    <div className="lede">
      <h2>{title}</h2>
      <div className="youwill">
        <p className="k">You will learn</p>
        <ul>
          {learn.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
}

export function Note({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="callout note">
      <p className="k">{title ?? "Note"}</p>
      {children}
    </aside>
  );
}

export function Pitfall({ children }: { children: ReactNode }) {
  return (
    <aside className="callout pitfall">
      <p className="k">Pitfall</p>
      {children}
    </aside>
  );
}

/** "Try it" instructions, so it is obvious what to press and what to watch. */
export function TryIt({ steps }: { steps: ReactNode[] }) {
  return (
    <div className="tryit">
      <p className="k">Try it</p>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
