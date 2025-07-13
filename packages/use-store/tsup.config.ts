import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  splitting: true,
  dts: true,
  sourcemap: true,
  clean: true,
  env: {
    USE_UNSTABLE: process.env.USE_UNSTABLE || "false",
  },
});
