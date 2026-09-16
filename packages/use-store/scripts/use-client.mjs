/**
 * Puts `"use client"` on the built chunks that need it, then checks it is
 * there.
 *
 * Not on all of them. `react-concurrent-store/store` exports `createStore`,
 * which is not a Hook and imports nothing React's server build lacks, so it is
 * usable inside a React Server Component graph — and a directive would take
 * that away. Everything reachable from that entry is left alone; everything
 * else, which is to say everything that can reach a Hook, is marked.
 *
 * Applied here rather than in tsup or in the source: a directive written in
 * the source is stripped by esbuild, and tsup's `banner` reaches the ESM output
 * but not the CJS one — the kind of thing that goes missing silently and breaks
 * in a consumer's build rather than in ours.
 *
 * `"use client"` ahead of `"use strict"` is fine. Both are directives and a
 * module may open with several.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const DIRECTIVE = '"use client";';
const dist = new URL("../dist", import.meta.url).pathname;
const scripts = readdirSync(dist).filter((name) => /\.(js|cjs)$/.test(name));

if (scripts.length === 0) {
  throw new Error("use-client: no build output found in dist/");
}

const read = (name) => readFileSync(join(dist, name), "utf8");

/** Everything the server-safe entries pull in, transitively. */
const serverSafe = new Set();
const walk = (name) => {
  if (serverSafe.has(name) || !scripts.includes(name)) return;
  serverSafe.add(name);
  for (const [, specifier] of read(name).matchAll(
    /(?:from\s*|require\()["'](\.\/[^"']+)["']/g,
  )) {
    walk(basename(specifier));
  }
};
walk("store.js");
walk("store.cjs");

const needsDirective = scripts.filter((name) => !serverSafe.has(name));

for (const name of needsDirective) {
  const path = join(dist, name);
  const source = read(name);
  if (/^["']use client["']/.test(source)) continue;
  writeFileSync(path, `${DIRECTIVE}\n${source}`);
}

const missing = needsDirective.filter((name) => !/^["']use client["']/.test(read(name)));
if (missing.length > 0) {
  throw new Error(`use-client: could not apply to ${missing.join(", ")}`);
}

const wrongly = [...serverSafe].filter((name) => /^["']use client["']/.test(read(name)));
if (wrongly.length > 0) {
  throw new Error(
    `use-client: the server-safe entry must not be marked: ${wrongly.join(", ")}`,
  );
}

console.log(
  `use-client: marked ${needsDirective.length}, left ${serverSafe.size} server-safe ` +
    `(${[...serverSafe].join(", ")})`,
);
