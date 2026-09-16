import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // The gauntlet runs the source, not the build, so a scenario failure
      // points at a line you can edit.
      "react-concurrent-store": fileURLToPath(
        new URL("../use-store/src/index.ts", import.meta.url),
      ),
    },
  },
  server: { port: 5178 },
});
