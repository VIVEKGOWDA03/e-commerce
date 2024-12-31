import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import NodeGlobalsPolyfillPlugin from 'vite-plugin-node-polyfills';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),NodeGlobalsPolyfillPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
