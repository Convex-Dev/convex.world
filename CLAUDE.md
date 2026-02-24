# Claude Code Guidelines for convex.world

## Project Overview

**convex.world** is the main marketing and information website for the Convex decentralised lattice platform. It is a statically exported Next.js site deployed to GitHub Pages.

**Live site:** https://convex.world

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Language:** TypeScript 5.9, React 19
- **Styling:** Custom CSS design system — **no Tailwind** (see `globals.css`)
- **Icons:** Lucide React (icon map in `src/lib/icons.ts`)
- **Fonts:** Inter (headings), Source Sans 3 (body), JetBrains Mono (code)
- **Package manager:** pnpm
- **Deployment:** GitHub Pages via GitHub Actions (push to `master`)

## Development

```bash
pnpm install
pnpm dev        # Dev server on localhost:3000
pnpm build      # Static export to ./out
pnpm lint       # ESLint
```

### Dependencies

The site depends on the sibling `convex.ts` repo via a local file reference:

```json
"@convex-world/convex-ts": "file:../convex.ts/packages/convex-client"
```

You must have `../convex.ts` cloned and built (`pnpm install && pnpm build` in that repo) before `pnpm install` will succeed here.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (metadata, JSON-LD, theme script)
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Design system tokens and global styles
│   ├── (superpowers)/      # Grouped routes (no layout segment)
│   │   ├── vision/         # /vision — principles and architecture
│   │   ├── lattice/        # /lattice — data lattice technology
│   │   ├── cpos/           # /cpos — Convergent Proof of Stake
│   │   ├── ai/             # /ai — agentic economy
│   │   └── coin/           # /coin — CVM token
│   ├── developers/         # /developers — developer hub
│   ├── ecosystem/          # /ecosystem — featured projects
│   ├── community/          # /community — social links, blog feed
│   ├── brand/              # /brand — logos, colours, guidelines
│   ├── tools/              # /tools — tools and quick start
│   ├── team/               # /team — team members
│   ├── sandbox/            # /sandbox — interactive Convex REPL
│   ├── demo/               # /demo — component showcase (dev only)
│   ├── api/                # API routes
│   ├── robots.ts           # robots.txt generation
│   └── sitemap.ts          # sitemap.xml generation
├── components/             # React components (one file per component)
├── data/                   # Content data files (typed arrays/objects)
├── lib/                    # Utilities (icon map, helpers)
└── contexts/               # React contexts (Convex client, wallet)
public/
├── images/                 # Logos, ecosystem graphics, social icons
├── svg/                    # SVG assets
├── llms.txt                # LLM discoverability manifest
└── manifest.json           # PWA manifest
```

## Conventions

### Language and Spelling

- **Use British English throughout** (decentralised, organisation, colour, etc.)
- This is a hard requirement for consistency with Convex branding

### Styling

- All styling uses **CSS custom properties** defined in `globals.css` — never add Tailwind or inline styles
- Follow the existing design token system: `--surface-*`, `--accent-*`, `--text-*`, `--space-*`, `--font-*`
- Glass effects: use `--glass-bg`, `--glass-border`, `--glass-blur`
- Dark theme is the default; light mode is toggled via `.light` class on `<html>`
- Use the 8px spacing grid (`--space-1` through `--space-12`)

### Components

- One component per file in `src/components/`, PascalCase filenames
- Page templates: `ContentPage` (standard page with nav/footer), `SuperpowerPage` (feature page)
- Use `SectionHeader` for numbered section titles
- Use `Button` component (variants: primary, secondary, sandbox) — not raw `<a>` or `<button>`
- Icons: import from `lucide-react`, reference by name via the icon map in `src/lib/icons.ts`

### Content Data

- Page content is driven by typed data files in `src/data/`
- Add new content items to existing data files rather than hardcoding in page components
- Type definitions live in `src/data/types.ts`

### Technical Terminology

- **CVM** — Convex coin token symbol (not CVX)
- **Juice** — transaction execution cost (never "gas")
- **Copper** — smallest unit (1 CVM = 1,000,000,000 copper)
- **Peer** — network node
- **Actor** — smart contract
- **CPoS** — Convergent Proof of Stake
- **Lattice** — Convex's data structure (not "blockchain")

## Interactive Features

The site connects to the Convex network via `ConvexContext`:

- **Default peer:** `https://mikera1337-convex-testnet.hf.space`
- **Sandbox** (`/sandbox`) — Convex Lisp REPL with query/transact modes
- **Live Inspector** — real-time state browser on the homepage
- **Resource Gauges** — network resource visualisation

These depend on the `@convex-world/convex-ts` client library.

## Next.js Configuration

- `trailingSlash: true` — all URLs end with `/`
- `images.unoptimized: true` — required for static export
- Static export to `./out` — no server-side features at runtime

## Branch Strategy

- **`master`** — production branch, auto-deploys to GitHub Pages
- Feature branches as needed

## Roadmap

See [ROADMAP.md](ROADMAP.md) for planned improvements and future work.

## Before Committing

- [ ] `pnpm build` succeeds (catches broken imports, missing pages)
- [ ] `pnpm lint` passes
- [ ] British English spelling
- [ ] New pages have appropriate metadata (title, description, Open Graph)
- [ ] Data-driven content uses `src/data/` files, not hardcoded JSX
- [ ] CSS uses existing design tokens, no arbitrary values
