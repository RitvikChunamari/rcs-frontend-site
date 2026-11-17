# Black Swiss redesign

Audience: developers choosing an agent design skill.
Primary journey: inspect the before/after demonstration, then copy the installation command.
User direction: black Swiss. Intensity: editorial utility.

Concept: a numbered design manual with oversized grotesk type and one red registration mark.
Adjectives: precise, spare, graphic.
Grid: twelve columns for the desktop hero; aligned section labels and headings; single-column mobile flow.
Typography: locally available Helvetica/Arial display and body, system monospace annotations.
Palette: black, off-white, neutral gray, red accent. Black is the first-visit default, with the existing light-mode control retained.
Motion: brief interaction feedback and reduced-motion support.
Signature: original typographic rc. mark, shared alignment axes, flat ruled sections.
Alternative considered: a poster-dense layout with vertically stacked headline and giant full-width monogram. Selected the split desktop composition to keep comparison access visible.

Public references consulted: Swissted for the Swiss poster context, It's Nice That for editorial content organization, and Vercel Web Interface Guidelines for focus, semantics and interaction review. No third-party assets copied. IBM typography page was inaccessible through the browsing tool.

Verified: production build, desktop hero and mobile hero/comparison/install viewport screenshots, no document overflow at 320/375/768/1024/1440, mobile menu Escape behavior, light/dark switching, correct comparison endpoints, keyboard slider increment, actual clipboard contents, simulated clipboard-denial feedback, reduced-motion scroll behavior.
Second pass: replaced theme glyph with SVG, corrected comparison clipping direction, added clipboard-denial feedback. Full-page screenshot capture produced repeated viewport tiles, so visual inspection used separate viewport screenshots.

Source-only VeloMesh audit: zero findings. Whole-tree audit also reads archived comparison artifacts, built output and node_modules cache, which retain their existing styling findings.
No new dependencies. No configured lint/typecheck scripts. Full axe scan, screen-reader evaluation, performance metrics, cross-browser and real-device tests remain unperformed.
Changes are local and have not been published.

## Typography refinement, 2026-11-16

User feedback: the initial typography felt amateur and needed a more disciplined Swiss character.
Observed cause: the headline used -0.075em tracking (over 12px compression at 1440px), with an overlapping monogram and inconsistent section axes.

Replaced the system-font display with self-hosted Geist variable WOFF2, distributed with its SIL Open Font License. Source: https://github.com/vercel/geist-font. Swiss influence documented by its publisher: https://vercel.com/font. The unmodified font is approximately 70KB. Public asset paths respect the Vite GitHub Pages base. Preload and CSS reference the same resource.

Hero uses uppercase, 520 weight and -0.035em tracking, with mobile tracking relaxed to -0.025em. Body, annotations and section headings use the same family at purpose-specific weights. Monospace is reserved for the command. Replaced the decorative monogram with the six-discipline index, aligned headings and workflow copy to a shared twelve-column grid, reduced heading sizes and improved mobile density. Comparison captions distinguish the visible samples and hide when their side is too narrow.

Verification after refinement:
- Production build and git diff whitespace check passed.
- Geist reports loaded in the browser at 320, 375, 768, 1024 and 1440px, with no horizontal document overflow.
- Reviewed desktop hero and comparison, mobile hero/workflow/install, and light comparison screenshots. Second visual pass corrected label background and alignment offsets.
- CSS-simulated 200% zoom checked for overflow. Native browser zoom and real devices remain untested.
- Mobile menu Escape, theme switching, comparison endpoint and arrow-key behavior, and actual clipboard contents passed.
- Axe-core 4.10.3 WCAG A/AA automated scans returned zero violations in dark and light modes. ARIA and contrast checks include incomplete results requiring manual assessment; these scans do not establish complete accessibility compliance.
- Source-only VeloMesh audit reports zero findings. Archived comparison designs remain separate examples with their existing visual characteristics.
- Changes remain local.
