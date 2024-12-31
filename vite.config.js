import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    NodeGlobalsPolyfillPlugin({
      protocolImports: true, // Enables Node.js polyfills for the browser
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {}, // Ensures `process.env` is defined
  },
});
