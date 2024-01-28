import { resolve as _resolve } from "node:path";
import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";

const resolve = (p: string) => _resolve(__dirname, p);

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve("src/"),
    },
  },
  plugins: [
    // https://github.com/vitest-dev/vitest/issues/708#issuecomment-1118628479
    swc.vite(),
    swc.rollup(),
  ],
});
