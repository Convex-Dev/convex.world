# Agent Guidelines for convex.world

Canonical instructions for AI coding agents working in this repository. `CLAUDE.md` is a pointer to this file. If a workspace-level `AGENTS.md` exists above this repo, this file takes precedence within it.

## Project Overview

**convex.world** is the main marketing and information website for the Convex decentralised lattice platform. It is a statically exported Next.js site deployed to GitHub Pages.

**Live site:** https://convex.world

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Language:** TypeScript 6, React 19
- **Styling:** Custom CSS design system — **no Tailwind** (tokens in `src/styles/tokens.css`, architecture in `src/styles/README.md`)
- **Icons:** Lucide React (icon map in `src/lib/icons.ts`)
- **Fonts:** Inter (headings), Source Sans 3 (body), JetBrains Mono (code)
- **Tests:** Vitest (`src/**/*.test.ts`)
- **Package manager:** pnpm
- **Deployment:** GitHub Pages via GitHub Actions (push to `master`)

## Development

```bash
pnpm install
pnpm dev        # Dev server on localhost:3000
pnpm lint       # ESLint
pnpm typecheck  # tsc --noEmit
pnpm test       # Vitest
pnpm build      # Static export to ./out
```

CI (`.github/workflows/ci.yml`) runs all four checks on every pull request and on pushes to `develop` and `master`, then smoke-tests the installer scripts. Run the four checks locally before committing.

### Dependencies

The Convex TypeScript client is installed from npm as `@convex-world/convex-ts`; no sibling repository checkout is required. `src/lib/convex-api.ts` is a deliberate thin adapter over that library (peer switching, client-side latency, error-returning API, convenience queries) — keep it.

### Tests

Tests live beside the code they cover as `*.test.ts` and run with Vitest. They are mostly data-integrity checks: sitemap entries, navigation dropdowns, superpowers data, redirects, release version format, hex geometry, structured data, and wallet storage. Several assert minimum counts, required fields, and unique hrefs, so run `pnpm test` after adding a page, a superpower, or a navigation entry. Component tests are not yet set up (`.tsx` files are outside the test glob).

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (metadata, JSON-LD, theme script)
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # 404 page
│   ├── globals.css         # Legacy component/page styles (compatibility file)
│   ├── (superpowers)/      # Route group (no URL segment) — technology deep-dives:
│   │                       #   vision, lattice, cpos, ai, superpowers, lisp, vm,
│   │                       #   memory, cad3, cns, crdts, dids, dlfs, assets, defi,
│   │                       #   foundation, open-source
│   ├── (developers)/       # developers, tools, downloads, sandbox
│   ├── (community)/        # ecosystem, community, brand, press, team
│   ├── coin/               # /coin — CVM token
│   ├── demo/               # /demo — exported component showcase
│   ├── robots.ts           # robots.txt generation
│   └── sitemap.ts          # sitemap.xml generation (manually maintained list)
├── components/             # React components (one file per component)
│   └── icons/              # Custom SVG icon components
├── contexts/               # React contexts (Convex client, wallet)
├── data/                   # Content data files (typed arrays/objects)
├── lib/                    # Utilities (icon map, networks, convex-api adapter, helpers)
└── styles/                 # Design system: tokens.css, base.css, layout.css, README.md
public/
├── images/                 # Logos, ecosystem graphics, social icons
├── svg/                    # SVG assets
├── install.sh, install.ps1 # One-line installer scripts (smoke-tested in CI)
├── apidocs/, convex.jar/   # Redirect stubs to docs.convex.world and GitHub releases
├── llms.txt, llms-full.txt # LLM discoverability manifests
└── manifest.json           # PWA manifest
```

## Conventions

### Language and Spelling

- **Use British English throughout** (decentralised, organisation, colour, etc.)
- This is a hard requirement for consistency with Convex branding

### Styling

- Follow the architecture in `src/styles/README.md`
- Design tokens live in `src/styles/tokens.css`; document defaults and shared layouts live alongside it
- Treat `src/app/globals.css` as a compatibility file for existing styles, not the default home for new rules
- Keep new reusable component styles beside the component in a CSS Module
- Follow the existing design token system: `--surface-*`, `--accent-*`, `--text-*`, `--space-*`, `--font-*`
- Glass effects: use `--glass-bg`, `--glass-border`, `--glass-blur`
- Dark theme is the default; light mode is toggled via `.light` class on `<html>`
- Use the 8px spacing grid (`--space-1` through `--space-12`)

### Components

- One component per file in `src/components/`, PascalCase filenames
- Page templates: `ContentPage` (standard page with nav/footer), `SuperpowerPage` (feature page)
- Use `PageHero` and `Section` for normal content-page structure
- Use `SectionHeader` for numbered section titles
- Use `CtaSection` for repeated CTA groups, `Link` for internal navigation, and `ExtLink` for external links
- Icons: import from `lucide-react`, reference by name via the icon map in `src/lib/icons.ts`

### Content Data

- Page content is driven by typed data files in `src/data/`
- Add new content items to existing data files rather than hardcoding in page components
- Shared type definitions live in `src/data/types.ts`; feature-specific types may be colocated with their data
- Site-wide constants have a single home: peer URLs in `src/lib/networks.ts`, the displayed Convex release in `src/data/release.ts`

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

- **Default peer:** `TESTNET_PEER_URL` in `src/lib/networks.ts` (currently `https://mikera1337-convex-testnet.hf.space`)
- **Sandbox** (`/sandbox`) — Convex Lisp REPL with query/transact modes
- **Live Inspector** — real-time state browser on the homepage
- **Resource Gauges** — network resource visualisation

These depend on the `@convex-world/convex-ts` client library.

## Next.js Configuration

- `trailingSlash: true` — all URLs end with `/`
- `images.unoptimized: true` — required for static export
- Static export to `./out` — no server-side features at runtime (no API routes, no server actions)

## Branch Strategy

- **`develop`** — working branch. Make changes here, or on a feature branch off `develop`, and target `develop` with pull requests.
- **`master`** — release branch. Every push to `master` deploys to GitHub Pages. Release by merging `develop` into `master`; do not commit directly to `master`.
- CI runs on pull requests and on pushes to both branches.

## Release Version Bump

When a new Convex release is published, the site shows it in the footer status strip and as the Docker tag example on the Downloads page. Both read from one constant:

1. Edit `CONVEX_RELEASE_VERSION` in `src/data/release.ts` (plain `x.y.z`, no `v` prefix).
2. Run `pnpm test` (checks the format) and `pnpm build`.
3. Commit on `develop`, e.g. `Show Convex 0.8.17 as latest release`.
4. Merge `develop` into `master` to deploy.

No other file needs to change. Installer scripts and download links always fetch the latest GitHub release.

## Agent Tooling

- `.claude/settings.json` (checked in) pre-approves the four check commands and read-only git commands for Claude Code sessions. Add a rule there, not in personal settings, when every contributor's sessions would need it.
- This repo does not configure git identity. Check `git config user.name` before the first commit in a fresh clone.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for planned improvements and future work.

## Before Committing

- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` passes
- [ ] `pnpm build` succeeds (catches broken imports, missing pages)
- [ ] British English spelling
- [ ] New pages have appropriate metadata (title, description, Open Graph)
- [ ] New pages are added to `src/app/sitemap.ts` and, if user-facing, to `src/data/nav-dropdowns.ts`
- [ ] Data-driven content uses `src/data/` files, not hardcoded JSX
- [ ] CSS uses existing design tokens, no arbitrary values
