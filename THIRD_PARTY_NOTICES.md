# Third-party notices

Glass in Motion bundles software created by other open-source projects. This file is intended to preserve attribution and license information when the standalone HTML is distributed. The contributors of the upstream projects are **not** claimed to be authors of the Glass in Motion studio UI, and Glass in Motion does **not** claim authorship of their original code.

## 1. LiquidGlass (`@ybouane/liquidglass`)

- Source: https://github.com/ybouane/liquidglass
- Project: LiquidGlass — WebGL refractive glass effect for HTML elements.
- Credit: ybouane and the LiquidGlass contributors.
- License declaration: MIT, per the upstream `README.md` and `package.json` (reviewed November 2026).
- Use in this project: bundled WebGL renderer, optical shader, rendering/compositing routines and supporting logic in `index.html`; this project adds a custom UI, presets, live controls, and wallpaper.

**Upstream notice caveat:** The upstream repository inspected did not include a separate `LICENSE` file or a source-specific copyright line. To avoid inventing an owner's exact copyright declaration, the attribution above names the upstream project and its contributors. The standard MIT terms declared by the upstream project are reproduced below, but they do not replace any original copyright notice that may be supplied by upstream in a later release.

### MIT license terms declared for LiquidGlass

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 2. html-to-image

- Source: https://github.com/bubkoo/html-to-image
- License: MIT.
- Use in this project: DOM capture utilities bundled within the LiquidGlass engine.
- Copyright notice reproduced from the upstream license:

```text
MIT License

Copyright (c) 2017-2026 W.Y.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 3. Glass in Motion studio

The custom presentation, configuration UI, presets, and wiring are maintained by `ademxg`. The repository's own `LICENSE` file covers the original material in this project, subject to third-party rights and notices above.

If upgrading or replacing the bundled upstream engine, review upstream license files and refresh this notice accordingly.
