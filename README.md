# SeedXY Games

Static GitHub Pages home for The Dark Seed and The Hospital Seed.

## Run locally

`python3 -m http.server 8080` from this folder. Open http://localhost:8080.

## Content and assets

- `index.html`, `style.css`: responsive Italian home page.
- `site.js`: seed illustration and the two impulse controls. The combination is an illustration, not a claim about specific game events. Only the supported `?seed=` number is sent to games.
- `seedxy-auth.js`: existing shared Firebase account and save system, retained unchanged.
- `auth-loader.js`: loads the retained account system near the Passport or on demand.
- `passport.js`: existing progress binding, retained with the new page.
- `assets/images/forest-hero.webp`: original The Dark Seed `docs/screenshots/env-dusk-vista.png`.
- `assets/images/dark-seed.webp`: original The Dark Seed `docs/screenshots/game-03-night-torch-cabin.png`.
- `assets/images/hospital-seed.webp`: original Hospital Seed menu environment, captured from the local game with UI hidden. No plot events or patient data.
- `assets/objects/product-render/specs/choice-seeds.json`: custom seed model, created using the taste rendering system. Three organic shells and branching roots. Material and seed code change with impulse combinations.

The supplied taste motion, layout, rendering and moment modules are copied without modifications. The generated stills provide fallback images on phones, with reduced motion, or without WebGL. The site remains usable without JavaScript; the seed controls require JavaScript.

Deploy by pushing the main branch to the existing GitHub Pages repository.
