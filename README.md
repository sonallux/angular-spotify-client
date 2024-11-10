# Angular Music

🚧 This project is still WIP 🚧

## Goal

This repo contains a [Spotify Client](https://open.spotify.com) written in [Angular](https://angular.io) to showcase the features of the latest Angular versions:

- The simplier mental model with standalone components
- Build performance improvements with the `esbuild` builders
- Runtime performance improvements with the [NgOptimizedImage](https://angular.io/guide/image-directive)
- Server Side Rendering with Angular Universal
- Angular Signals

## Measure locally

- Build project using `npm build`
- Serve files using `npx serve -l 4200 --single .\dist\angular-music\browser\`
- Disable measuring build time in `scripts/measure.mjs`
- Execute `scripts/measure.mjs`
