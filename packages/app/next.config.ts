import type { NextConfig } from "next";

/**
 * The app deliberately consumes the built package rather than its source. The
 * "use client" directive is applied at build time, so aliasing to source would
 * take it out of the graph and this would stop proving anything about how the
 * package behaves in an App Router build.
 *
 * Run `pnpm --filter react-concurrent-store build` first.
 */
const config: NextConfig = {};

export default config;
