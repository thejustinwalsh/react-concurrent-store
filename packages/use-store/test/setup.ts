import "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock the main index module to ensure we're testing the correct implementation
vi.mock("../src/index.ts", async () => {
  const USE_UNSTABLE = process.env.USE_UNSTABLE === "true";

  if (USE_UNSTABLE) {
    const { createUnstableStore, useUnstableStore } = await vi.importActual(
      "../src/useUnstableStore"
    );
    return {
      createStore: createUnstableStore,
      useStore: useUnstableStore,
    };
  } else {
    const { createStore, useStore } = await vi.importActual("../src/useStore");
    return {
      createStore,
      useStore,
    };
  }
});
