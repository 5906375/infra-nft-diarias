import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

export default defineConfig({
  server: {
    host: true,
  },
  define: {
    "process.env": {}, // 👈 Corrige falha em ambientes Docker
  },
  resolve: {
    alias: {
      crypto: "crypto-browserify", // 👈 Polyfill necessário para Docker
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({
      filename: "./dist/stats.html",
      template: "treemap",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
