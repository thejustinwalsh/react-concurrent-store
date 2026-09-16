import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/store.ts", "src/withEqualityFn.ts"],
  // The "use client" directive is added afterwards by scripts/use-client.mjs.
  // It cannot be a banner here: tsup's reaches the ESM output and not the CJS
  // output, esbuild strips a directive written in the source, and the store
  // entry must not get one at all.
  format: ["cjs", "esm"],
  splitting: true,
  dts: true,
  sourcemap: true,
  clean: true,
});
