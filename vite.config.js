import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import polyfillNode from "rollup-plugin-polyfill-node";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {}, // Defines `process.env` to prevent errors
  },
  build: {
    rollupOptions: {
      plugins: [
        polyfillNode(), // Add Node.js polyfills for the browser
      ],
    },
  },
});
