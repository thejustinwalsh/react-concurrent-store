/**
 * Puts `"use client"` on every built chunk, then checks it is there.
 *
 * Every export in this package is a client hook or the store one reads, and a
 * store holds mutable state a server component cannot own. Without the
 * directive, importing the package from an App Router server component fails
 * with a message about hooks instead of one about where a store belongs.
 *
 * Done here rather than in tsup or in the source. A directive written in the
 * source is stripped by esbuild, and tsup's `banner` reaches the ESM output but
 * not the CJS one — which is the kind of thing that goes missing silently and
 * breaks in a consumer's build rather than in ours. So: one mechanism, applied
 * to every format, and an error if a file ends up without it.
 *
 * `"use client"` ahead of `"use strict"` is fine. Both are directives and a
 * module may open with several.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIRECTIVE = '"use client";';
const dist = new URL("../dist", import.meta.url).pathname;
const scripts = readdirSync(dist).filter((name) => /\.(js|cjs)$/.test(name));

if (scripts.length === 0) {
  throw new Error("use-client: no build output found in dist/");
}

for (const name of scripts) {
  const path = join(dist, name);
  const source = readFileSync(path, "utf8");
  if (/^["']use client["']/.test(source)) continue;
  writeFileSync(path, `${DIRECTIVE}\n${source}`);
}

const missing = scripts.filter(
  (name) => !/^["']use client["']/.test(readFileSync(join(dist, name), "utf8")),
);
if (missing.length > 0) {
  throw new Error(`use-client: could not apply to ${missing.join(", ")}`);
}

console.log(`use-client: applied to ${scripts.length} files`);
