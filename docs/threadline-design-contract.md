# Threadline expanded reference

Audience: product teams reviewing customer signals; visitors evaluating RC's Frontend Skill.
Primary task: explore a real local feedback workflow, then inspect the design decisions.

## Direction
Preserve the outer site's black Swiss identity. The reference uses Swiss structure with an editorial paper/burgundy treatment: clear, considered, tactile. Typography is local Geist with a restrained Georgia accent; generous measures and a shared grid. The thread motif connects source notes into a decision. Mobile uses document flow and stacked panels. A neon, heavily animated dashboard was rejected because reading and prioritizing evidence is the task.

## Scope and truth
The original public/comparison/before directory is an unchanged historical landing-page artifact. This expanded treatment is not an independent same-prompt benchmark. No quantitative superiority claim. Existing fabricated testimonial/pricing affordances are replaced in the new demo by explicitly fictional sample data and local actions. No backend, account, model inference or network synchronization. Art-direction presets are curated examples, not an AI running in the browser. CSS 3D is not WebGL.

## Acceptance
- Slider endpoints reveal the correct side; arrows/Home/End update its value. Both frames share one actual viewport, including mobile; no scaled desktop crop on phones.
- Comparison mode is a visual preview; Explore mode enables keyboard, pointer and scrolling. Full-page links remain available.
- Search and status filtering compose; empty results can reset. Selecting a note exposes its context. A valid new signal persists locally. Invalid data stays editable. Storage failure is explicit and does not claim success. Reset only clears this demo's key after a confirmation dialog.
- The motion story supports play/pause/replay/scrub, stops when offscreen or hidden, and has a readable reduced-motion state. Spatial rotation has a labeled range control and a flat alternative.
- Appearance presets change coherent type/space roles. Context-selected default includes a written rationale.
- Render at 320/375/768/1024/1440 widths. Verify keyboard, dialog focus return, contrast, overflow, loading/empty/error previews, persistence and actual error recovery.
- Native Node tests cover logic. Browser journeys cover visible controls. Separate rendered critique and verification are required. No fabricated field performance data or general benchmark result.

## State contracts
Workspace: populated -> filtering -> empty -> clear; selected -> add to decision -> remove. New signal: dialog -> invalid (field errors) -> valid -> stored, or storage error retaining fields -> retry. Escape/cancel returns focus. State preview controls explicitly simulate loading/empty/error and return to real local data.
Motion: idle -> playing -> paused/completed; scrub cancels play; reduced motion changes stages directly. Unmount/offscreen/document-hidden cancels frame work.
Comparison: split -> original/refined -> split; explore mounts an interactive reference; returning to compare restores landing view. Mobile width is min(390px, available), desktop uses available width.
