import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: fileURLToPath(new URL("./github-pages-src", import.meta.url)),
  base: "/labduoclieu/",
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  plugins: [react()],
  build: {
    outDir: fileURLToPath(new URL("./github-pages-dist", import.meta.url)),
    emptyOutDir: true,
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@site": projectRoot,
    },
  },
});
