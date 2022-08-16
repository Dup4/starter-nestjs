import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";

export default defineConfig({
  plugins: [
    // https://github.com/vitest-dev/vitest/issues/708#issuecomment-1118628479
    swc.vite(),
    swc.rollup(),
  ],
});
