import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // The source, not the build, so a failure points at a line you can
      // edit. useStore.ts rather than index.ts: index also re-exports the
      // vendored prototype, which reaches into React's internals and has no
      // business in this app's graph.
      "react-concurrent-store": fileURLToPath(
        new URL("../use-store/src/useStore.ts", import.meta.url),
      ),
    },
  },
  server: { port: 5178 },
});
