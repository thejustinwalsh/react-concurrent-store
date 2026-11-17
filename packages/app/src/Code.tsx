import { Highlight, type PrismTheme } from "prism-react-renderer";

/**
 * A code block, highlighted with the app's own palette rather than a bundled
 * theme, so code on the page matches everything around it.
 */
const theme: PrismTheme = {
  plain: { color: "#cdd6f4", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "cdata"], style: { color: "#6c7086", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#9399b2" } },
    { types: ["keyword", "operator"], style: { color: "#cba6f7" } },
    { types: ["function"], style: { color: "#89b4fa" } },
    { types: ["string", "char", "attr-value"], style: { color: "#a6e3a1" } },
    { types: ["number", "boolean"], style: { color: "#fab387" } },
    { types: ["class-name", "maybe-class-name"], style: { color: "#f9e2af" } },
    { types: ["tag"], style: { color: "#f38ba8" } },
    { types: ["attr-name"], style: { color: "#f9e2af" } },
    { types: ["constant", "property"], style: { color: "#94e2d5" } },
  ],
};

export function Code({
  children,
  language = "tsx",
}: {
  children: string;
  language?: string;
}) {
  return (
    <Highlight theme={theme} code={children.trim()} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="code">
          <code>
            {tokens.map((line, i) => (
              <span key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
                {"\n"}
              </span>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}
