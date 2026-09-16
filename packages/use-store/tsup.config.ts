import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/withEqualityFn.ts"],
  // The "use client" directive is added afterwards by scripts/use-client.mjs,
  // not here: tsup's banner reaches the ESM output and not the CJS output, and
  // esbuild strips a directive written in the source.
  format: ["cjs", "esm"],
  splitting: true,
  dts: true,
  sourcemap: true,
  clean: true,
});
