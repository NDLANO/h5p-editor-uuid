import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: "esbuild",

    rollupOptions: {
      input: "h5p-editor-uuid.ts",
      output: {
        file: "h5p-editor-uuid.js",
        dir: undefined,
        esModule: false,
        format: "iife",
      },
    },

    target: "es6",
  },
});
