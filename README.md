# RC's Frontend Skill — product website

[Visit the website](https://ritvikchunamari.github.io/rcs-frontend-site/) · [Explore Threadline](https://ritvikchunamari.github.io/rcs-frontend-site/comparison/after/index.html) · [Get the skill](https://github.com/RitvikChunamari/rcs-frontend-skill)

The product site includes an accessible before/after slider and an expanded, interactive Threadline reference. Compare the archived landing page, switch to a phone viewport, or explore the working demo in the frame or full screen.

The demo covers a local feedback workflow, validation, search and filters, decision selection, browser persistence and recovery, explicit interface-state previews, controllable motion, CSS 3D with a flat fallback, reduced motion, and three coherent art-direction presets. It uses React, Vite, native browser features, and a self-hosted open-source font. No API key or paid service is needed.

This is an illustrative design study, not a controlled benchmark. The original is preserved unchanged in `public/comparison/before`. The new reference is built from `src/demo` through the second Vite HTML entry at `comparison/after/index.html`. Loading and connection-error previews are simulations; local saving is real. All customer data is fictional. No backend, authentication, AI inference, or WebGL is claimed.

## Development

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

The Vite base is `/rcs-frontend-site/`. The production output is `dist` and is published to GitHub Pages through the `gh-pages` branch.

- [Design contract](docs/threadline-design-contract.md)
- [Verification and critique](docs/threadline-quality-report.md)
- [Node unit tests](tests/demo.test.js)
- [Playwright browser journeys](tests/browser-checks.mjs)

The browser journey module exports `verifyDemo(page, base)` and `verifyComparison(page, base)`. Pass a standard Playwright Page and the URL of a running dev or preview server. The implementation has no browser-test dependency; execution requires an available Playwright host. The checks mutate only the demo's own local-storage key on the supplied origin.

Font licensing is included in `public/fonts/OFL-Geist.txt`.
