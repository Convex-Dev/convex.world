# convex.world -- Developer Handoff

This document covers the full refactoring work completed and provides a guide for continuing development.

---

## What Was Done

### Phase 0: Code Quality Cleanup
- Removed dead markup (`lattice-node` divs), unused provider wrapping, duplicate CSS rules
- Fixed light theme selector specificity, inconsistent data field keys, missing sitemap entries
- Hoisted magic numbers to module-level constants

### Phase 1: Architecture Refactor
- **Extracted shared components**: `ContentPage`, `SuperpowerPage`, `SectionHeader`, `CtaSection`
- **Extracted all inline data** to `src/data/` files with typed interfaces
- **Extracted inline SVG icons** (`CvmIcon`, `LatticeDataIcon`, `ConvexLogoAnimated`, `ReleaseCurveChart`)
- **Created `getIcon()` system** (`src/lib/icons.ts`) -- string keys map to Lucide icons, eliminating scattered icon imports
- **Refactored every page** to use the shared wrappers (7 pages to `ContentPage`, 3 to `SuperpowerPage`)
- **Extracted navbar data** to `src/data/nav-dropdowns.ts` -- Navigation.tsx became a pure renderer with zero inline data

### Phase 2: Navbar Enhancements
- Header changed from `position: sticky` to `position: fixed`
- Added **Innovation mega-dropdown** showing all 17 superpowers grouped by category (infrastructure / economy / platform), built from `superpowers.json`
- Added **"The Vision" featured item** with Convex hexagon logo at top of Innovation dropdown
- Fixed **hover overlap** on active dropdown items (replaced `border` + negative margin with `box-shadow: inset`)
- Reduced all dropdown sizing for tighter proportions
- Added **Innovation nav link styling** -- green text with subtle glow and contained glowing underline
- Differentiated Network/Ecosystem overview icons
- Made `navClass` data-driven (no hardcoded key checks in the component)

### Phase 3: Page Enhancements
- Added **hero highlight stat bars** to `/vision`, `/lattice`, `/cpos` -- glass container with vertical dividers
- **Moved superpower pages** to `src/app/(superpowers)/` route group (URLs unchanged)
- **Condensed community page** -- social cards replaced with compact centred logo row, section header removed, activity section renamed to "Feed"
- Added **Convex Desktop CTA** to sandbox sidebar
- Corrected all Innovation dropdown links to point to correct CAD documentation

---

## Architecture

### Three Page Patterns

Every page follows one of three patterns. Choose based on content type:

#### 1. `SuperpowerPage` -- for technology deep-dives

```
src/app/(superpowers)/vision/page.tsx
src/app/(superpowers)/lattice/page.tsx
src/app/(superpowers)/cpos/page.tsx
```

```tsx
import SuperpowerPage from "@/components/SuperpowerPage";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/CtaSection";

export default function PageName() {
  return (
    <SuperpowerPage
      tag="// Tag Line"
      title={<>Title with <span className="hero-accent">accent</span></>}
      description="Hero description text."
      highlights={[
        { label: "Label", value: "Value" },
      ]}
      visual={<YourAnimation />}  // optional hero visual (right side)
    >
      <section className="vision-section">
        <SectionHeader number="001" title="..." subtitle="..." />
        {/* section content */}
      </section>

      <CtaSection
        className="vision-cta"
        heading="h2"
        title="..."
        description="..."
        links={[
          { label: "Primary", href: "/..." },
          { label: "Secondary", href: "/...", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
```

**Props reference** (`src/components/SuperpowerPage.tsx`):
| Prop | Type | Required | Notes |
|------|------|----------|-------|
| `tag` | `string` | yes | Eyebrow text, e.g. `"// Consensus"` |
| `title` | `ReactNode` | yes | Use `<span className="hero-accent">` for colour |
| `description` | `string` | yes | Hero paragraph |
| `highlights` | `{ label, value }[]` | no | Stat pills in glass bar below description |
| `visual` | `ReactNode` | no | Animation component for right side of hero |
| `children` | `ReactNode` | yes | Page sections below the hero |

**Internal CSS classes**: `vision-hero`, `vision-section`, `vision-pillars`, `vision-pillar`, `vision-principles-grid`, `vision-principle-card`, `vision-stack`, `vision-stack-layer`, `vision-cta`.

#### 2. `ContentPage` -- for general pages

```
src/app/developers/page.tsx
src/app/ecosystem/page.tsx
src/app/tools/page.tsx
src/app/community/page.tsx
src/app/brand/page.tsx
src/app/team/page.tsx
src/app/(superpowers)/coin/page.tsx
```

```tsx
import ContentPage from "@/components/ContentPage";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/CtaSection";

export default function PageName() {
  return (
    <ContentPage mainClassName="optional-page-class">
      <section className="your-hero">
        {/* custom hero */}
      </section>

      <section className="your-section">
        <SectionHeader number="001" title="..." subtitle="..." />
        {/* content */}
      </section>

      <CtaSection className="your-cta" ... />
    </ContentPage>
  );
}
```

**Props reference** (`src/components/ContentPage.tsx`):
| Prop | Type | Required | Notes |
|------|------|----------|-------|
| `children` | `ReactNode` | yes | Full page content |
| `mainClassName` | `string` | no | Extra class on `<main>`, e.g. `"coin-page"` |
| `noLatticeBg` | `boolean` | no | Suppress the `lattice-bg` div |

Provides: `<Navigation />`, `<main>`, `.lattice-bg`, `.geo-line`, `<Footer />`.

#### 3. Custom -- for pages needing network providers

```
src/app/page.tsx          (home)
src/app/sandbox/page.tsx
src/app/demo/page.tsx
```

These compose `Navigation` and `Footer` manually because they wrap content in `WalletProvider` + `ConvexProvider` for live network features.

---

### Data Pattern

All page content lives in typed data files under `src/data/`. Pages import data and render it -- no inline arrays of content in components.

```
src/data/
  types.ts                     -- shared IconCardItem interface
  superpowers.json             -- 17 superpowers (drives Innovation dropdown)
  nav-dropdowns.ts             -- all 5 navbar dropdowns
  vision-principles.ts         -- 8 principles for /vision
  cpos-advantages.ts           -- 6 advantages for /cpos
  cpos-how-it-works.ts         -- 4 steps for /cpos
  lattice-foundation.ts        -- 4 blocks for /lattice
  lattice-regions.ts           -- 5 regions for /lattice
  lattice-innovations.ts       -- 6 innovations for /lattice
  developer-terminal-sequences.ts
  ecosystem-items.ts
  community-social.ts
  brand-assets.ts
  tools.ts
```

**The shared type** for icon-driven card grids:

```ts
// src/data/types.ts
export interface IconCardItem {
  icon: string;    // key for getIcon(), e.g. "shield", "zap"
  title: string;
  text: string;
}
```

Used by: `vision-principles`, `cpos-advantages`, `cpos-how-it-works`, `lattice-foundation`.

**Rendering an IconCardItem array:**

```tsx
import { getIcon } from "@/lib/icons";
import { myData } from "@/data/my-data";

{myData.map((item) => {
  const Icon = getIcon(item.icon);
  return (
    <article key={item.title} className="vision-principle-card">
      <div className="vision-principle-icon"><Icon size={24} strokeWidth={1.5} /></div>
      <h4>{item.title}</h4>
      <p>{item.text}</p>
    </article>
  );
})}
```

---

### Icon System

All icons are resolved from string keys via `getIcon()` in `src/lib/icons.ts`. This eliminates scattered Lucide imports across the codebase.

**To add a new icon:**

```ts
// src/lib/icons.ts
import { ..., NewIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ...
  "new-icon": NewIcon,
};
```

Then use `"new-icon"` as the `icon` field in any data file. The fallback icon is `Shield`.

**Currently available keys** (32): `shield`, `database`, `hard-drive`, `cpu`, `network`, `git-merge`, `layers`, `file-code`, `file-text`, `clock`, `users`, `lock`, `leaf`, `zap`, `globe-2`, `eye`, `scale`, `coins`, `code-2`, `code`, `compass`, `monitor`, `monitor-smartphone`, `globe`, `terminal`, `boxes`, `gem`, `gauge`, `at-sign`, `fingerprint`, `bot`, `github`, `heart`, `book-open`, `graduation-cap`, `package`, `server`, `wrench`, `message-circle`, `twitter`, `youtube`, `newspaper`, `help-circle`.

---

### Navbar Data

The navbar is entirely data-driven via `src/data/nav-dropdowns.ts`.

**To add/edit a dropdown item**, edit the relevant section in `navDropdowns`. No component changes needed.

**To add a new dropdown**, add an entry to the `navDropdowns` array:

```ts
{
  key: "unique-key",
  label: "Display Name",
  href: "/default-link",
  navClass: "nav-link-custom",  // optional CSS class for the trigger
  graphicKey: "image-name",     // optional: shows /images/navbar/image-name.webp
  featuredItem: { ... },        // optional: highlighted banner at top
  sections: [
    {
      title: "Section Title",
      items: [
        { label: "Item", href: "/path", description: "...", icon: "zap", featured: true },
      ],
    },
  ],
}
```

- `graphicKey` present = right-side image panel, narrower content
- `graphicKey` absent = wide layout (`.nav-dropdown-menu-wide`), good for many items
- `featured: true` = green-bordered highlight on the item
- `featuredItem` = special banner above the section columns

**The Innovation dropdown** is auto-generated from `superpowers.json` via `buildInnovationSections()`. To add a new superpower, add an entry to the JSON with `title`, `desc`, `href`, `category` (infrastructure/economy/platform), `icon`, and optionally `external: true`.

---

## File Structure

```
src/
  app/
    layout.tsx                 -- root layout (fonts, meta, theme script)
    page.tsx                   -- home (custom pattern)
    globals.css                -- ALL styles (8000+ lines, CSS custom properties)
    (superpowers)/             -- route group (no URL effect)
      vision/page.tsx          -- SuperpowerPage
      lattice/page.tsx         -- SuperpowerPage
      cpos/page.tsx            -- SuperpowerPage
      coin/page.tsx            -- ContentPage
    developers/page.tsx        -- ContentPage
    ecosystem/page.tsx         -- ContentPage
    tools/page.tsx             -- ContentPage
    community/page.tsx         -- ContentPage (async, RSS fetch)
    brand/page.tsx             -- ContentPage
    team/page.tsx              -- ContentPage
    sandbox/page.tsx           -- custom (network providers)
    demo/page.tsx              -- custom
  components/
    ContentPage.tsx            -- base page shell (nav + footer + lattice-bg)
    SuperpowerPage.tsx         -- tech deep-dive page (hero + highlights + visual)
    SectionHeader.tsx          -- // 001 Title + subtitle
    CtaSection.tsx             -- call-to-action with heading + buttons
    Navigation.tsx             -- data-driven mega-dropdown navbar
    Footer.tsx                 -- 3-column footer
    Logo.tsx                   -- Convex logo image
    ColorMode.tsx              -- dark/light toggle
    Card.tsx                   -- legacy card wrapper (used by demo + team)
    Hero.tsx                   -- home page hero
    HexGridBackground.tsx      -- home page hex grid (desktop)
    HexGridMobile.tsx          -- home page hex grid (mobile)
    CapabilitySections.tsx     -- home page 6 capability cards
    LiveInspector.tsx          -- home page state inspector
    ResourceGauges.tsx         -- home page gauge bars
    ReplSandbox.tsx            -- sandbox REPL console
    AnimatedTerminal.tsx       -- typewriter terminal for /developers
    VisionNetworkAnimation.tsx -- 3D globe for /vision
    CposHexAnimation.tsx       -- hex gossip animation for /cpos
    LatticeDotsGrid.tsx        -- pulsing dots for /lattice
    ConvexLogoAnimated.tsx     -- animated hex logo for /coin
    ReleaseCurveChart.tsx      -- SVG chart for /coin
    NetworkSelector.tsx        -- network picker (sandbox)
    ImportKeyDialog.tsx        -- key import modal (sandbox)
    PublicKey.tsx               -- truncated key display
    CVMBalance.tsx             -- formatted balance display
    Button.tsx                 -- link-as-button utility
    Code.tsx                   -- code block utility
    Hex.tsx                    -- hexagonal container
    icons/
      CvmIcon.tsx              -- CVM chip SVG
      LatticeDataIcon.tsx      -- lattice squares SVG
  data/
    types.ts                   -- IconCardItem shared type
    superpowers.json           -- 17 superpowers (Innovation dropdown source)
    nav-dropdowns.ts           -- 5 navbar dropdowns (data-driven)
    vision-principles.ts       -- /vision principles data
    cpos-advantages.ts         -- /cpos advantages data
    cpos-how-it-works.ts       -- /cpos steps data
    lattice-foundation.ts      -- /lattice foundation data
    lattice-regions.ts         -- /lattice regions data
    lattice-innovations.ts     -- /lattice innovations data
    developer-terminal-sequences.ts
    ecosystem-items.ts
    community-social.ts
    brand-assets.ts
    tools.ts
  lib/
    icons.ts                   -- getIcon() string-to-LucideIcon resolver
    hex.ts                     -- hex grid geometry + SUPERPOWER_HEXES
    convex-api.ts              -- Convex peer HTTP client
  contexts/
    ConvexContext.tsx           -- network connection + address + keypair
    WalletContext.tsx           -- Ed25519 key management + localStorage
```

---

## How To: Common Tasks

### Create a new superpower page

1. Create `src/app/(superpowers)/new-page/page.tsx` using the `SuperpowerPage` pattern
2. Create a data file `src/data/new-page-data.ts` exporting `IconCardItem[]` arrays
3. Add any new icon keys to `src/lib/icons.ts`
4. Add the superpower to `src/data/superpowers.json` (it appears in the Innovation dropdown automatically)
5. Add CSS for any page-specific layouts to `src/app/globals.css`

### Create a new general page

1. Create `src/app/new-page/page.tsx` using the `ContentPage` pattern
2. Extract content data to `src/data/new-page.ts`
3. Add a navigation entry to `src/data/nav-dropdowns.ts`
4. Add CSS for page-specific styles to `src/app/globals.css`

### Add a superpower to the Innovation dropdown

Add an entry to `src/data/superpowers.json`:

```json
{
  "title": "New Thing",
  "desc": "Short description",
  "href": "/new-page",
  "category": "infrastructure",
  "icon": "zap"
}
```

If `href` starts with `https://`, also add `"external": true`. Categories: `infrastructure`, `economy`, `platform`.

### Add a navbar dropdown item

Edit the relevant dropdown in `src/data/nav-dropdowns.ts`. Each item needs `label`, `href`, `icon` (string key), and optionally `description`, `external`, `featured`.

### Modify the hero highlight stats

Edit the `highlights` prop in the page file:

```tsx
highlights={[
  { label: "Label", value: "42" },
]}
```

No component changes needed. Renders as a glass stat bar with vertical dividers.

---

## CSS Conventions

- **All styles** in `src/app/globals.css` using CSS custom properties (no Tailwind, no modules)
- **Design tokens** defined in `:root` (lines 14-167) -- surfaces, colours, spacing, typography, transitions
- **Light mode** overrides in `html.light` block at bottom of file
- **Page-specific styles** are grouped by page with comment headers
- **Shared hero class**: `vision-hero` (used by all SuperpowerPage instances)
- **Shared section class**: `vision-section` (consistent max-width + padding)
- **Card grids**: `vision-principles-grid` + `vision-principle-card` (reused across vision and cpos)
- **Pillar layout**: `vision-pillars` + `vision-pillar` (3-column stat blocks)
- **Section pattern**: `SectionHeader` renders `.section-header` > `.section-number` + `h2` + `p`

---

## Key Conventions

- **British English** in all copy
- **No inline data** in components -- extract to `src/data/`
- **String icon keys** resolved via `getIcon()` -- never import Lucide directly in page files
- **Data-driven navbar** -- no component logic for specific dropdown keys
- **`featured: true`** on data items for green highlight (not computed from URL matching)
- **Server components by default** -- only add `'use client'` when state/effects are needed
- **Static export** -- `pnpm build` produces `./out` for GitHub Pages deployment
