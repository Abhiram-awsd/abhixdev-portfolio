# abhixdev-portfolio

Personal portfolio of Abhiram Appani, full-stack developer and freelancer.

It is a static site with no build step: plain HTML, CSS and JavaScript.

## Structure

| Path | What it is |
|---|---|
| `index.html` | The portfolio |
| `work/stitchwork/` | Concept: SaaS landing page with a draggable workflow demo |
| `work/aurel/` | Concept: 3D product page for a smart ring (Three.js) |
| `work/kolam/` | Concept: restaurant site with generative kolam art and table booking |
| `work/kuppi/` | Concept: coffee storefront with dynamic theming and a cart |
| `work/chillar/` | Concept: app landing page with a working bill splitter |
| `photos/` | Images for the photography section |

The sites under `work/` are concept projects for fictional brands.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Edit content

Skills, layers and photos are plain arrays in the block marked `EDIT ME` near the top of the script in `index.html`.

## Deploy

Vercel serves the repository root as a static site. Every push to `main` deploys.
