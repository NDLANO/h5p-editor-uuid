import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: "esbuild",
    outDir: "",
    emptyOutDir: false,
    sourcemap: true,

    lib: {
      entry: ["h5p-editor-uuid.ts"],
      formats: ["iife"],
      name: "H5PEditorCsvToText",
      fileName: () => "h5p-editor-uuid.js",
    },

    target: "ES2015",
  },
});
