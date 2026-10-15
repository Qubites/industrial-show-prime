import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Relative asset paths, as on the live site (Gigahost): works in the web root and in a subfolder.
  base: './',
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  build: {
    // Two pages: the front page and the references page (a real file, no URL rewriting needed).
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        referencer: path.resolve(__dirname, "referencer.html"),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
