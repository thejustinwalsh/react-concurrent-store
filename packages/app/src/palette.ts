/** Catppuccin Mocha accents, matching the docs site's theme. */
export const HUE: Record<string, string> = {
  ada: "#89b4fa", // blue
  grace: "#a6e3a1", // green
  alan: "#fab387", // peach
  katherine: "#cba6f7", // mauve
  margaret: "#94e2d5", // teal
};

/** A stable colour for a name that has no assigned hue. */
export const hueFor = (id: string) =>
  HUE[id] ??
  Object.values(HUE)[
    [...id].reduce((a, c) => a + c.charCodeAt(0), 0) % Object.keys(HUE).length
  ];
