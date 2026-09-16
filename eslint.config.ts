import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    // src/experimental is the prior prototype, vendored for comparison and not
    // edited here.
    ignores: [
      "**/dist/",
      "**/node_modules/",
      "packages/use-store/src/experimental/",
    ],
  },
  // The full React Compiler rule set, not just rules-of-hooks and
  // exhaustive-deps: this is what catches a render-phase write or a ref read
  // during render before the compiler silently skips the component.
  reactHooksPlugin.configs.flat["recommended-latest"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tsPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "react-compiler": {
        optimizationLevel: 2,
        strict: true,
        componentNamePattern: "^[A-Z][a-zA-Z0-9]*$",
        performance: {
          warnOnExpensiveOperations: true,
          maxRenderComplexity: 15,
        },
      },
    },
    rules: {
      // React rules
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // TypeScript rules
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: [
      "packages/use-store/src/useStore.ts",
      "packages/use-store/test/MiniRelay.tsx",
    ],
    rules: {
      // Both of these fire on deliberate patterns that React Compiler itself
      // accepts — react-compiler-healthcheck compiles this file 1 out of 1.
      //
      // immutability: the selector's previous result is held in closure
      // variables written during render. This is the structure React's own
      // useSyncExternalStoreWithSelector uses for the same job, down to the
      // ref it writes during render. A render that is abandoned can write it,
      // and the next render overwrites it from its own state, which is what
      // "Selector memory across an abandoned render" asserts.
      //
      // set-state-in-effect: a reader that mounts behind the tree corrects
      // itself from a layout effect, which flushes before the commit returns,
      // so nothing torn is painted. Deferring it is what would paint the tear.
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];
