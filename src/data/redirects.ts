/**
 * Client-side redirect map for stale or shorthand URLs.
 *
 * When a visitor lands on a 404 page, the path is checked against this table.
 * If matched, they are redirected instantly. Paths should be lowercase with
 * no trailing slash.
 *
 * Add new entries here as pages move or vanish — no server config needed.
 */
const redirects: Record<string, string> = {
  // Shorthand / vanity paths
  "/docs":            "https://docs.convex.world",
  "/github":          "https://github.com/Convex-Dev",
  "/discord":         "https://discord.com/invite/xfYGq4CT7v",
  "/twitter":         "https://twitter.com/convex_world",
  "/blog":            "https://docs.convex.world/blog",

  // Documentation deep links
  "/whitepaper":      "https://docs.convex.world/docs/overview/convex-whitepaper",
  "/manifesto":       "https://docs.convex.world/docs/overview/manifesto",
  "/faq":             "https://docs.convex.world/docs/overview/faq",
  "/tokenomics":      "https://docs.convex.world/docs/cad/tokenomics",
  "/cads":            "https://docs.convex.world/docs/cad/0000cads",

  // Old or alternative page names
  "/about":           "/vision",
  "/technology":      "/vision",
  "/consensus":       "/cpos",
  "/token":           "/coin",
  "/cvm":             "/coin",
  "/repl":            "/sandbox",
  "/console":         "/sandbox",
  "/projects":        "/ecosystem",
  "/partners":        "/ecosystem",
  "/press":           "/brand",
  "/logos":           "/brand",
  "/people":          "/team",

  // External products
  "/buy":             "https://app.paisley.io",
  "/mcp":             "https://docs.convex.world/docs/cad/mcp",
};

export default redirects;
