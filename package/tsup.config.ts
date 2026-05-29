import { defineConfig } from "tsup"
import { cpSync } from "fs"
import type { Plugin } from "esbuild"

/**
 * Plugin that bridges CJS require("react") → ESM import.
 *
 * Problem: When bundling deps that use CJS require("react"), esbuild
 * generates __require("react") which throws in browser ESM context.
 *
 * Solution: Intercept all react resolves → virtual ESM module →
 * re-export from truly external ESM "react" (resolved via importmap).
 */
const externalReactPlugin: Plugin = {
  name: "external-react",
  setup(build) {
    // Intercept react/react-dom imports from ANY source (CJS or ESM)
    build.onResolve(
      { filter: /^react(-dom)?(\/.*)?$/ },
      (args) => {
        if (args.namespace === "react-bridge") {
          // From our virtual module → mark as truly external ESM import
          return { path: args.path, external: true }
        }
        // From user code or CJS deps → redirect to our virtual bridge
        return { path: args.path, namespace: "react-bridge" }
      }
    )

    // Virtual bridge module: re-exports everything from the external package
    build.onLoad(
      { filter: /.*/, namespace: "react-bridge" },
      (args) => ({
        contents: `export * from "${args.path}"; import __d from "${args.path}"; export default __d;`,
        loader: "js",
      })
    )
  },
}

export default defineConfig([
  // Lean build — for npm/bundler usage (deps externalized)
  {
    entry: { index: "src/index.ts" },
    format: ["esm"],
    outDir: "dist",
    outExtension: () => ({ js: ".mjs" }),
    dts: {
      compilerOptions: { skipLibCheck: true },
    },
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: [
      "react",
      "react-dom",
      "react/jsx-runtime",
    ],
    jsx: "automatic",
    esbuildOptions(options) {
      options.banner = { js: '"use client";' }
    },
    onSuccess: async () => {
      cpSync("src/theme.css", "dist/theme.css")
      console.log("✅ Copied theme.css to dist/")
    },
  },
  // Fat build — for CDN/no-build-step (all deps bundled except React)
  {
    entry: { "index.standalone": "src/index.ts" },
    format: ["esm"],
    outDir: "dist",
    outExtension: () => ({ js: ".mjs" }),
    dts: false,
    splitting: false,
    sourcemap: true,
    clean: false,
    treeshake: true,
    noExternal: [/.*/],
    // Don't use `external` here — the plugin handles it
    jsx: "automatic",
    env: {
      NODE_ENV: "production",
    },
    esbuildPlugins: [externalReactPlugin],
    esbuildOptions(options) {
      options.banner = { js: '"use client";' }
    },
  },
])
