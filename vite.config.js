import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// Vite configuration
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Define `process.env` as an empty object to avoid errors
    "process.env": {},
  },
});
