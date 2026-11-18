# Threadline verification and rendered critique

Date: 2026-11-17 (America/Denver). Reviewed by the implementing agent in a separate render-review pass; this was not an independent review.

## Implemented

The outer black Swiss product site now has compare/explore modes, native range keyboard support, responsive and phone previews, direct original/expanded links, section navigation, and a six-part capability guide. Preview frames are inert; the live frame supports normal keyboard, pointer and scroll interaction.

The expanded reference uses a shared React runtime with the product site. Its complete source is committed; generated bundles are no longer the only editable artifact. It includes the feedback workspace, native dialogs, validation, search/status filters, decisions, local persistence, confirmed reset, curated direction presets, a six-second motion story, pause/scrub/rotation/flat controls, and reduced-motion handling. No new runtime dependency was introduced.

## Executed evidence

| Gate | Result | Evidence and boundary |
| --- | --- | --- |
| Design contract | Recorded | [Contract](threadline-design-contract.md) defines audience, direction, truth boundaries, states, and acceptance before implementation. |
| Test-first slice | Passed | The first two tests failed against explicit unimplemented behavior: required-field validation returned no errors; combined search/status filtering returned an extra result. They passed after implementation. Remaining tests were added as coverage, not claimed as test-first work. |
| Unit tests | 13 passed | `npm test`: length boundaries, malformed input, search/status composition, immutability, empty/corrupt/duplicate saved data, isolated storage key, round trip, blocked storage, and quota failure. |
| Production build | Passed | `npm run build`, Vite multi-page output. Source and preview served under the actual Pages base path. |
| Browser journeys | Passed | `tests/browser-checks.mjs` executed with Playwright against the production preview. Search, no results, reset filters, validation and focus, save/reload, decisions, real storage failure/draft retention/retry, state previews, reset cancellation/confirmation, three presets, motion lifecycle, mobile Escape/focus return, slider endpoints and actual clipping, and embedded interaction. |
| Responsive | Passed in tested views | No horizontal document overflow at 320, 375, 768, 1024, and 1440 CSS px for the demo and comparison. Additional maximum-length unbroken title/context check passed at 320px. This is not a claim of testing every zoom/browser combination. |
| Motion | Passed | Play/pause/scrub, spatial rotation, flat view, dynamic reduced-motion changes and stage fallback. Scrolling the graphic offscreen stopped playback. |
| Automated accessibility | No detected violations in five scans | axe-core 4.10.3: Threadline desktop, mobile, validation dialog, product-site dark and light themes; WCAG 2 A/AA, 2.1 AA and 2.2 AA rules. Incomplete contrast items remained, plus iframe-related ARIA items on the product site. Automated results are not a complete accessibility certification. |
| Visual critique | Repaired and rechecked | Desktop/mobile screenshots of the landing, workspace, graphic and comparison were reviewed. See findings below. Geist loaded from the local font asset. |
| Static design audit | Clean for source | `velomesh.py audit-ui src`: zero findings after the font-size corrections. RC's consistency audit was also run; its literal-color inventory includes the untouched historical baseline. Neither heuristic establishes visual quality. |
| Runtime | Passed tested journeys | No page errors during the complete production browser journeys. A development React warning about an empty-string boolean `inert` prop was fixed by using `inert={true}`. |
| Backend / WebGL | Not applicable to this artifact | Local browser storage and CSS 3D are the implementation. No backend, account system, remote AI or WebGL scene exists here. |
| Field performance / broad benchmark | Not run | No field Core Web Vitals, cross-model evaluation, independent blind review or general skill-superiority score is claimed. |

## Rendered findings and repairs

1. **Mobile graphic text was obscured by overlapping notes.** Increased the scene's vertical space, adjusted note positions and type sizes, and inspected the resulting 375px composition. All primary note content is visible. The graphic is decorative to assistive technology; its stage and description are separately available.
2. **Several functional labels were too small.** Raised control and content-label sizes to at least 12px and rechecked the mobile workspace and comparison.
3. **Workspace grid overflow after resizing from desktop to 320px.** Content-size containment interacted with implicit minimum grid tracks. Explicit `minmax(0, 1fr)` tracks and zero minimum panel widths fixed it; the full stateful responsive journey passed again.
4. **Selected-row metadata had insufficient contrast.** axe measured 4.4:1 against the selected background. Darkened the muted semantic color; repeat desktop/mobile scans reported no violations.
5. **New-signal dialog initially focused its close control.** Moved focus to the title on open; validation focuses the first invalid field and Escape/close returns to Add signal. Verified in the running production build.
6. **A motion-preference change could land before the listener subscribed.** The hook now resynchronizes immediately after subscribing. Switching both into and out of reduced motion passed the browser journey.

## Screenshots

- [Desktop reference](screenshots/threadline-desktop.png)
- [Mobile reference](screenshots/threadline-mobile.png)
- [Desktop workspace](screenshots/workspace-desktop.png)
- [Mobile workspace detail](screenshots/workspace-mobile.png)
- [Desktop comparison](screenshots/comparison-desktop.png)
- [Mobile comparison](screenshots/comparison-mobile.png)

Screenshots use reduced motion for stable inspection. They are evidence of the rendered states shown, not evidence of every interaction.

## Remaining limits

Browser validation used Chromium through the available Playwright host. Safari, Firefox, physical touch devices, manual screen-reader operation, and a full zoom audit were not run. The original archived baseline was not altered or subjected to the new implementation's quality claims. This expanded treatment has a broader scope than the historical original, so the slider cannot isolate the effect of adding a skill to an identical prompt.

Review references: [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md) and [MDN dialog documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog). All graphic shapes and demo text in the new reference were authored for this project.
