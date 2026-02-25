/**
 * Shared hexagonal grid math for pointy-top hexagons.
 * Used by HexGridBackground, HexGridMobile, and SuperpowerHexTiles.
 */

export const SQRT3 = Math.sqrt(3);

/** Generate an SVG path string for a pointy-top hexagon of the given size. */
export function hexPath(size: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 90);
    const x = Math.round(size * Math.cos(angle) * 1000) / 1000;
    const y = Math.round(size * Math.sin(angle) * 1000) / 1000;
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
  }
  return points.join(' ') + ' Z';
}

/** Convert axial hex coordinates to pixel coordinates. */
export function axialToPixel(
  q: number,
  r: number,
  size: number,
  gap: number
): { x: number; y: number } {
  const gapFactor = 1 + gap;
  return {
    x: SQRT3 * size * (q + r / 2) * gapFactor,
    y: 1.5 * size * r * gapFactor,
  };
}

/** Compute the bounding box of a set of hex positions. */
export function hexBounds(
  positions: { x: number; y: number }[],
  size: number
): { minX: number; maxX: number; minY: number; maxY: number } {
  const hexWidth = SQRT3 * size;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const { x, y } of positions) {
    minX = Math.min(minX, x - hexWidth / 2);
    maxX = Math.max(maxX, x + hexWidth / 2);
    minY = Math.min(minY, y - size);
    maxY = Math.max(maxY, y + size);
  }
  return { minX, maxX, minY, maxY };
}

export interface SuperpowerDef {
  title: string;
  desc: string;
  href: string;
  order: number;
}

/** Superpower hex definitions keyed by "q,r" axial coordinates. */
export const SUPERPOWER_HEXES: Record<string, SuperpowerDef> = {
  '1,0':  { title: "Lattice",              desc: "Global self-healing fabric",  href: "/lattice",  order: 0 },
  '1,-1': { title: "Convergent Consensus", desc: "Realtime convergent consensus", href: "/cpos",   order: 1 },
  '2,-1': { title: "Convex Lisp",          desc: "Functional programming",      href: "/lisp",    order: 2 },
  '3,-1': { title: "DIDs",                 desc: "Decentralised identity",       href: "/dids",    order: 3 },
  '2,0':  { title: "Digital Assets",       desc: "Tokens & NFTs in one line",   href: "/assets",  order: 4 },
  '1,1':  { title: "Virtual Machine",      desc: "High performance execution",  href: "/vm",      order: 5 },
  '0,1':  { title: "Agentic Economy",      desc: "Agentic tools with MCP",      href: "/ai",         order: 6 },
  '-1,1': { title: "Live Compiler",        desc: "No external toolchains",      href: "/sandbox",    order: 7 },
  '0,0':  { title: "Convex Coin",          desc: "Utility token for global state", href: "/coin",   order: 8 },
};
