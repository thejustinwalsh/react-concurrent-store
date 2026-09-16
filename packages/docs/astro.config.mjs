// @ts-check
import { defineConfig, envField } from "astro/config";
import starlight from "@astrojs/starlight";
import catppuccin from "@catppuccin/starlight";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: "react-concurrent-store",
      description:
        "A ponyfill of the experimental React concurrent stores feature.",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/thejustinwalsh/react-concurrent-store",
        },
        /*
        {
          icon: "npm",
          label: "npm",
          href: "https://www.npmjs.com/package/react-concurrent-store",
        },
        */
      ],
      sidebar: [
        {
          label: "Demo",
          link: "https://react-use-store.tjw.dev",
          attrs: { target: "_blank" },
        },
        {
          label: "Getting Started",
          items: [{ label: "Quick Start", slug: "quick-start" }],
        },
        {
          label: "Guides",
          items: [
            { label: "Integrating an existing store", slug: "guides/integrating" },
            { label: "Holding a promise in a store", slug: "guides/async" },
            { label: "Server components and SSR", slug: "guides/server" },
          ],
        },
        {
          label: "Explanation",
          items: [
            { label: "Rebasing", slug: "explanation/rebasing" },
            { label: "Selectors and re-renders", slug: "explanation/selectors" },
            { label: "Limitations", slug: "explanation/limitations" },
          ],
        },
        {
          label: "Reference",
          items: [{ label: "API", slug: "reference/api" }],
        },
      ],
      plugins: [catppuccin()],
      customCss: ["./src/styles/custom.css"],
      lastUpdated: true,
    }),
  ],
  site: "https://thejustinwalsh.com",
  base: "react-concurrent-store",
  trailingSlash: "always",
  env: {
    schema: {
      PUBLIC_COMMIT_HASH: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
});
