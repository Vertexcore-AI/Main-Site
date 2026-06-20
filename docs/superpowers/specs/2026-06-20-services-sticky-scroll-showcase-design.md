# Services Showcase — Sticky-Scroll Redesign

**Date:** 2026-06-20
**Component:** replaces the 3 stacked service rows in `components/services-viewport-section.tsx`
**Section heading kept:** "Services That Transform"

## Goal

Redesign the 3 service blocks (Website Development / Mobile App Development /
Digital Systems) from independent 2-column rows into one cohesive Apple-style
**sticky-scroll showcase**: text scrolls on the left, a single pinned visual
stage on the right morphs between 3 stylized device mockups via crossfade+scale.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Scope | Full layout redesign |
| Pattern | Sticky-scroll showcase (left text scrolls, right visual pinned) |
| Pinned visual | New unified animated device mockups |
| Mockup content | Stylized fake UI (no real screenshots) |
| Transition | Crossfade + scale |

## Architecture

New file: `components/services-showcase.tsx` exporting `ServicesShowcase`.
`services-viewport-section.tsx` keeps its `<section>`, background effects, and
header `motion.div`, and renders `<ServicesShowcase />` in place of the old
`services.map(...)` block. The existing `services[]` data array and the old
`ServiceUIGraphic` / `*UIGraphic` helper functions are removed from the viewport
file (data array moves into the new component, old graphics deleted).

### Units

1. **`ServicesShowcase`** — owns scroll tracking + grid.
   - `useScroll({ target: trackRef })` → `scrollYProgress`.
   - Maps progress to `activeIndex` (0/1/2) via a derived motion value +
     `useState` synced through `useMotionValueEvent`.
   - Renders `lg:grid-cols-2`: left `<ServicePanel>` track, right `<VisualStage>`.

2. **`ServicePanel`** (left, ×3) — one per service, min-height ~`90vh`.
   - Accent pill (subtitle) → `h3` title → description → feature list
     (stagger `whileInView`) → 3-stat strip → tech chips.
   - Last panel renders the existing **View Our Projects** button
     (`router.push("/projects")`).
   - Reuses the current `services[]` fields verbatim (id, title, subtitle,
     description, icon, features, stats, technologies, gradient, accentColor).

3. **`VisualStage`** (right) — `sticky top-[15vh]`, fixed height (~`520px`).
   - Renders all 3 mockups absolutely stacked; `activeIndex` drives which is
     visible. Inactive: `opacity:0 scale:0.92 pointer-events-none`.
     Active: `opacity:1 scale:1`. `transition` ~`0.5s ease`.
   - Accent glow ring color = active service gradient.

4. **Mockup components** (stylized fake UI, glassmorphic):
   - `BrowserMockup` (blue) — traffic-light dots, address bar, shimmer hero +
     content blocks loading in.
   - `PhoneMockup` (purple) — status bar, app screen with animated list rows,
     bottom tab bar, pulsing FAB.
   - `DashboardMockup` (emerald) — sidebar, KPI stat cards (count-up),
     mini bar/line chart, live activity ticker.

### Data flow

`scrollYProgress` (0→1) → segmented into 3 bands → `activeIndex` →
`VisualStage` selects active mockup → accent color tween. No external state, no
props drilling beyond `services` + `activeIndex`.

## Styling

- Glass: `bg-white/[0.04] backdrop-blur-xl border border-white/10`.
- Per-service neon glow via accent gradient ring (`blur-2xl`, low opacity).
- Black section bg unchanged. White headings, `text-gray-300/400` body.
- Tailwind only; matches existing utility conventions.

## Responsive

- `<lg`: sticky removed, grid collapses to single column. For each service the
  mockup renders above its text block (vertical stack). No pinning.
- Breakpoints verified mentally at 375 / 768 / 1024 / 1440.

## Accessibility & performance

- `prefers-reduced-motion`: disable scroll-driven morph + looping mockup
  animations; show active/first mockup statically, all panels visible.
- Animate `transform` + `opacity` only (GPU); no width/height or layout-shift
  hover scales on cards.
- Mockups are pure SVG/divs — zero image network requests.
- Icon-only buttons get `aria-label`; clickable elements get `cursor-pointer`.
- Decorative mockups marked `aria-hidden`.

## Out of scope

- No change to section heading text, background effects, or other page sections.
- No change to `/projects` route or navigation behavior.
- Real screenshots intentionally dropped from this section (per decision).

## Risk / rollback

Self-contained new file + one swap in `services-viewport-section.tsx`. Rollback =
revert the two files. Old graphics deleted but recoverable from git history.
