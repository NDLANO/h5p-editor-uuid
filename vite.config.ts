import type { OutputAsset, OutputChunk } from "rollup";
import { defineConfig, PluginOption } from "vite";

const isOutputChunk = (
  chunkOrAsset: OutputChunk | OutputAsset,
): chunkOrAsset is OutputChunk => {
  return chunkOrAsset["code"] != null;
};

const wrapIIFE = (): PluginOption => ({
  name: "wrap-iife",
  generateBundle(options, bundle) {
    const chunks = Object.values(bundle);

    for (let i = 0; i < chunks.length; i += 1) {
      const chunk = chunks[i];
      if (isOutputChunk(chunk)) {
        // eslint-disable-next-line no-param-reassign
        chunk.code = `(function(){\n${chunk.code}\n})()`;
      }
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [wrapIIFE()],
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
