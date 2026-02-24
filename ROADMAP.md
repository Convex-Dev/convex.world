# convex.world Roadmap

High-level initiatives for improving the Convex website.

## Social Sharing & SEO

- **Open Graph image** — Replace the SVG logo with a proper 1200×630 raster social card (`social_card.webp`) for rich previews on Twitter/Discord/LinkedIn
- **Structured data** — Add page-level JSON-LD (Article, FAQPage, SoftwareApplication) beyond the current Organisation schema
- **Accessibility audit** — Add ARIA landmarks, skip navigation, keyboard focus management, and screen reader testing across all pages

## Performance & Images

- **Responsive images** — Add `<picture>` elements with `srcset` and format fallbacks (WebP/AVIF/PNG) for ecosystem logos and team photos
- **Lazy loading** — Defer off-screen animations (hex grids, lattice dots) to reduce initial bundle and paint time
- **Bundle analysis** — Profile the client-side JS bundle; consider code-splitting heavy interactive components (Sandbox, Inspector, charts)

## Content & Pages

- **Dynamic ecosystem** — Replace hardcoded project list with a data-driven or CMS-backed approach as the ecosystem grows
- **Use cases page** — Dedicated page with concrete examples: DeFi, AI agents, gaming, governance, supply chain
- **Comparison page** — Structured comparison of Convex vs traditional blockchains (Ethereum, Solana) on speed, cost, developer experience, and sustainability
- **Blog integration** — First-class blog section (or tighter Docusaurus integration) rather than RSS-only on the Community page

## Interactive Features

- **Peer failover** — Automatic fallback when the default HuggingFace peer is unreachable (try `peer.convex.live`, then show a clear offline state)
- **Guided sandbox** — Step-by-step tutorial mode in the REPL Sandbox walking new users through their first query, transfer, and actor call
- **Live network dashboard** — Real-time metrics page showing TPS, peer count, consensus latency, and total accounts

## Developer Experience

- **Testing** — Add a test framework (Vitest or Playwright) with at minimum build smoke tests and component tests for interactive features
- **Storybook or component catalogue** — Formalise the existing `/demo` page into a proper component showcase for design consistency
- **CI checks** — Add lint, type-check, and build verification to the GitHub Actions workflow on pull requests (currently only runs on push to `master`)

## Infrastructure

- **Publish convex-ts to npm** — Remove the fragile local `file:` dependency so the site can be built without a sibling repo checkout
- **Preview deployments** — Deploy PR branches to preview URLs (Vercel, Netlify, or GitHub Pages environments) for design review
- **Analytics** — Privacy-respecting analytics (Plausible, Umami) to understand traffic patterns and popular content

## Design & Brand

- **Light mode polish** — Audit and refine the light theme; currently dark-first with light mode as a secondary consideration
- **Animation performance** — Profile hex grid and lattice animations on lower-end devices; add `prefers-reduced-motion` support
- **Consistent illustration style** — Develop a reusable illustration system for feature pages beyond the current mix of animations and static graphics
