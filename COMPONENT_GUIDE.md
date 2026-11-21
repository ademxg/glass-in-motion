# Reusable Glass in Motion component (experimental)

The existing [live control studio](https://ademxg.github.io/glass-in-motion/) remains at the repository root. The files in this package add a **separate reusable adapter** to the open-source [`ybouane/liquidglass`](https://github.com/ybouane/liquidglass) WebGL renderer. They do not modify or replace the original demo.

## Files to add to your repository

- `src/vendor/liquidglass.js` — bundled upstream WebGL engine and html-to-image dependency, with attribution
- `src/glass-in-motion.js` — wrapper exposing an easy `mountGlass()` API
- `src/glass-in-motion.css` — light styling plus CSS fallback
- `examples/basic/index.html`, `examples/basic/main.js` — tested example
- `COMPONENT_GUIDE.md` — this page

Keep existing `LICENSE` and `THIRD_PARTY_NOTICES.md` files in the repository. Do not remove upstream credits.

## Quick start (no npm/build tools)

Inside your project, keep the `src/` directory structure and load its CSS:

```html
<link rel="stylesheet" href="./src/glass-in-motion.css">
<main id="glass-root" class="gim-root" style="min-height:400px;background:linear-gradient(135deg,#304ad5,#d676d2)">
  <button class="gim-glass" type="button">Liquid Glass</button>
</main>
<script type="module">
import { mountGlass } from './src/glass-in-motion.js';
const glass = await mountGlass({
  root: document.querySelector('#glass-root'),
  preset: 'original'
});
// Adjust any time:
glass.update({ refraction: 1.1, chromAberration: 0.08 });
// Mark a canvas background redrawn, if you use one:
// glass.redraw(document.querySelector('#wallpaper'));
</script>
```

> Use a local server (such as `python -m http.server 8000`), not a `file://` page, because JavaScript modules have browser CORS restrictions. The GitHub Pages URL also works.

## Example

Once uploaded, go to `https://ademxg.github.io/glass-in-motion/examples/basic/` and experiment with the controls.

## API

```js
import { mountGlass, GLASS_PRESETS, DEFAULT_GLASS_CONFIG } from './src/glass-in-motion.js';
const glass=await mountGlass({
  root: document.querySelector('.gim-root'),
  elements: '.gim-glass',  // optional
  preset: 'original',      // original | crystal | soft | prism
  config: {refraction: .78} // optional overrides
});

glass.mode;                 // 'webgl' or 'fallback'
glass.update({ zRadius: 35 });
glass.update({ chromAberration: .1 }, someSpecificGlassElement);
glass.setPreset('crystal');
glass.getConfig();          // snapshot for first glass element
glass.redraw(canvasElement); // call after updating a canvas/video background
glass.destroy();            // detach renderer and restore initial element config
```

**Important:** WebGL initialization may fail in some environments. The module then enables its CSS fallback; the fallback is visual only and does not provide optical refraction. A `root` must contain the elements AND whatever background you want refracted.

## Licensing / authorship

- LiquidGlass WebGL renderer: ybouane and contributors (upstream MIT declaration).
- `html-to-image`: W.Y. and contributors (MIT).
- Glass in Motion wrapper/example by `ademxg`, subject to existing project MIT license.
- See the repository's `THIRD_PARTY_NOTICES.md` for details. The source of the renderer is not original code by Glass in Motion.

## Status

Experimental v0.1 component adapter. No npm package published. Test in your target browser before relying on it in production.
