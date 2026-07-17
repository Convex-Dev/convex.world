# CSS architecture

The styling system is organised by responsibility so ordinary content can be
added without creating page-specific CSS.

## Foundation files

- `tokens.css` owns theme values, typography scales, spacing, radii and layout
  constants. Components consume semantic tokens instead of raw values.
- `base.css` owns the reset and document-level element defaults.
- `layout.css` owns the small shared vocabulary used to compose content pages:
  page bounds, sections, responsive grids, shared heroes and shared CTAs.
- `app/globals.css` contains existing component and page styles while they are
  migrated. It is a compatibility file, not the default home for new rules.

## Rules for new work

1. Build normal pages from `ContentPage`, `PageHero`, `Section`,
   `SectionHeader`, `CtaSection`, shared grids and existing card components.
2. Add a token only when it represents a reusable design decision. Do not add
   tokens as aliases for one-off page values.
3. Keep reusable component styles beside the component in a CSS Module.
4. Reserve page-specific CSS for genuinely unique compositions, illustrations
   and interactive visualisations.
5. Describe intent with variants such as `tone="accent"`; do not encode content
   names in reusable component styles.
6. Prefer fluid layout, `auto-fit` grids and container-aware components over
   repeated page breakpoints.
7. Avoid IDs, `!important`, deep selectors and page-qualified overrides.
8. Inline styles are only for values calculated at runtime; pass them through a
   CSS custom property where practical.

The practical test is that a normal content page should require no new CSS. A
new rule should either strengthen a shared primitive or belong to a genuinely
new visual component.
