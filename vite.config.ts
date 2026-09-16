// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // use "@vitejs/plugin-react" if that's what package.json has
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: "dist",
    sourcemap: false,
  },
});