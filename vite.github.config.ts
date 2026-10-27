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
    rollupOptions: {
      input: Object.fromEntries(["index", "profile", "research", "publications", "journey", "contact"].map((name) => [
        name,
        fileURLToPath(new URL(name === "index" ? "./github-pages-src/index.html" : `./github-pages-src/${name}/index.html`, import.meta.url)),
      ])),
    },
  },
  resolve: {
    alias: {
      "@site": projectRoot,
    },
  },
});
