import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    env: {
      USE_UNSTABLE: process.env.USE_UNSTABLE || "false",
    },
  },
});
