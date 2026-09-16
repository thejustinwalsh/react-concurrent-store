import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/withEqualityFn.ts", "src/urgent.ts"],
  format: ["cjs", "esm"],
  splitting: true,
  dts: true,
  sourcemap: true,
  clean: true,
});
