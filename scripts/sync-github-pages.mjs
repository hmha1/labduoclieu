import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = fileURLToPath(new URL("../github-pages-dist/", import.meta.url));
const pages = ["profile", "research", "publications", "journey", "contact"];
const files = await readdir(dist);
if (!files.includes("index.html") || !files.includes("4EY4.pdb") ||
    pages.some((page) => !files.includes(page))) {
  throw new Error("Incomplete GitHub Pages build; run npm run build:github-pages first.");
}

// Only these paths are generated publication artifacts. Leave project source intact.
await rm(new URL("../assets/", import.meta.url), { recursive: true, force: true });
await mkdir(new URL("../assets/", import.meta.url), { recursive: true });
for (const name of ["index.html", "assets", "4EY4.pdb", "3Dmol-min.js", "3Dmol-LICENSE", "favicon.svg", ...pages]) {
  await cp(new URL(`../github-pages-dist/${name}`, import.meta.url), new URL(`../${name}`, import.meta.url), { recursive: true, force: true });
}
console.log("GitHub Pages root synchronized from github-pages-dist.");
