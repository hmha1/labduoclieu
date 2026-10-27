# HAHM Lab

This repository contains the HAHM Lab website. The GitHub Pages edition is a
Vite multi-page build with one document per route: `/`, `/profile/`,
`/research/`, `/publications/`, `/journey/`, and `/contact/`. The `app/`
directory also exposes the same pages as Next routes.

## Build for GitHub Pages

Run `npm ci`, `npm run build:github-pages`, then
`node scripts/sync-github-pages.mjs`. Commit the source files and the generated
root-level HTML and assets together. GitHub Pages serves the repository root.

The rotating protein model uses the deposited atomic coordinates of human
acetylcholinesterase [RCSB PDB 4EY4](https://www.rcsb.org/structure/4EY4),
downloaded from `https://files.rcsb.org/download/4EY4.pdb` and stored as
`public/4EY4.pdb`. Its ribbon representation is rendered from those coordinates
by [3Dmol.js](https://3dmol.org/); the vendored browser bundle is
`public/3Dmol-min.js`, with its license in `public/3Dmol-LICENSE`.
