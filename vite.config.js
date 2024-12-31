import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from 'vite-plugin-node-polyfills'; // Named import

export default defineConfig({
  plugins: [
    react(),
    NodeGlobalsPolyfillPlugin() // Apply the polyfill plugin correctly
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
