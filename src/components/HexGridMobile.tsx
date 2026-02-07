'use client';

import { useState, useEffect, useMemo } from 'react';

/**
 * HexGridMobile - A compact hexagonal grid for mobile displays.
 * Shows the 7 superpower hexagons centered, with background hexagons
 * dynamically generated to fill available space without overflow.
 * Uses a fixed viewport width approach to ensure proper sizing.
 */

const SQRT3 = Math.sqrt(3);
const SIZE = 72; // Larger size for mobile hexagons
const GAP = 0.04;
const VIEWPORT_WIDTH = 420; // Target mobile viewport width
const HEX_SCALE = 0.95;  // Shrink factor so adjacent hexes don't touch
const TEXT_INSET = 0.85;  // Text area as fraction of hex width

function createHexPath(size: number): string {
  const s = size * HEX_SCALE;
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angleDeg = 60 * i - 90;
    const angleRad = (Math.PI / 180) * angleDeg;
    const x = Math.round(s * Math.cos(angleRad) * 1000) / 1000;
    const y = Math.round(s * Math.sin(angleRad) * 1000) / 1000;
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
  }
  return points.join(' ') + ' Z';
}

const HEX_PATH = createHexPath(SIZE);

function axialToPixel(q: number, r: number): { x: number; y: number } {
  const gapFactor = 1 + GAP;
  const x = SQRT3 * SIZE * (q + r / 2) * gapFactor;
  const y = 1.5 * SIZE * r * gapFactor;
  return { x, y };
}

interface Superpower {
  title: string;
  desc: string;
  href: string;
  order: number;
}

// Clockwise order starting from Lattice (center), then spreading outward
const SUPERPOWER_HEXES: Record<string, Superpower> = {
  '1,0': { title: "Lattice", desc: "Global self-healing fabric", href: "/lattice", order: 0 },
  '1,-1': { title: "Convergent Consensus", desc: "Realtime consensus", href: "/cpos", order: 1 },
  '2,-1': { title: "Convex Lisp", desc: "Functional programming", href: "https://docs.convex.world/docs/cad/lisp", order: 2 },
  '3,-1': { title: "DIDs", desc: "Decentralised identity", href: "https://docs.convex.world/docs/cad/did", order: 3 },
  '2,0': { title: "Digital Assets", desc: "Tokens & NFTs", href: "https://docs.convex.world/docs/tutorial/coins", order: 4 },
  '1,1': { title: "Virtual Machine", desc: "High performance", href: "https://docs.convex.world/docs/overview/concepts", order: 5 },
  '0,1': { title: "Agent Native", desc: "Agentic tools", href: "/developers", order: 6 },
  '-1,1': { title: "Live Compiler", desc: "No toolchains", href: "/sandbox", order: 7 },
  '0,0': { title: "Convex Coin", desc: "Utility token", href: "/coin", order: 8 },
};

// Animation duration: 9 superpowers * 0.15s delay + 0.5s animation + buffer
const ANIMATION_COMPLETE_DELAY = 3000;

// Generate background hexes - full grid extending in all directions
function generateBackgroundHexes(): Array<{q: number, r: number}> {
  const hexes: Array<{q: number, r: number}> = [];
  const superpowerKeys = new Set(Object.keys(SUPERPOWER_HEXES));
  
  // Generate a full grid - extend far in all directions
  // q range: -4 to 6 (covers left to right edges)
  // r range: -6 to 4 (extends further up toward subheading)
  for (let q = -4; q <= 6; q++) {
    for (let r = -6; r <= 4; r++) {
      const key = `${q},${r}`;
      if (superpowerKeys.has(key)) continue;
      hexes.push({ q, r });
    }
  }
  
  return hexes;
}

export default function HexGridMobile() {
  const [animationKey, setAnimationKey] = useState(0);

  // Detect theme changes and replay animation
  useEffect(() => {
    const handleThemeChange = () => {
      setAnimationKey(prev => prev + 1);
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          handleThemeChange();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Generate background hexes - full grid
  const backgroundHexes = useMemo(() => generateBackgroundHexes(), []);

  // Calculate bounds based only on superpowers (fixed size)
  const superpowerPositions = Object.keys(SUPERPOWER_HEXES).map(key => {
    const [q, r] = key.split(',').map(Number);
    return axialToPixel(q, r);
  });

  const hexWidth = SQRT3 * SIZE;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  
  superpowerPositions.forEach(({ x, y }) => {
    minX = Math.min(minX, x - hexWidth / 2);
    maxX = Math.max(maxX, x + hexWidth / 2);
    minY = Math.min(minY, y - SIZE);
    maxY = Math.max(maxY, y + SIZE);
  });

  // Use fixed viewport width for consistent sizing
  const svgWidth = Math.max(maxX - minX + 40, VIEWPORT_WIDTH);
  const svgHeight = maxY - minY + 80;
  const offsetX = svgWidth / 2 - (minX + maxX) / 2;
  const offsetY = -minY + 40;

  // Center position for distance calculation
  const centerPos = axialToPixel(1, 0);

  return (
    <div className="hex-grid-mobile" aria-hidden="true">
      <svg
        key={animationKey}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="hex-grid-mobile-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={`translate(${offsetX}, ${offsetY})`}>
          {/* Background hexagons */}
          {backgroundHexes.map(({ q, r }) => {
            const { x, y } = axialToPixel(q, r);
            const dx = x - centerPos.x;
            const dy = y - centerPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const delay = 0.8 + (distance / 300) * 0.3;

            return (
              <path
                key={`bg-${q}-${r}`}
                d={HEX_PATH}
                transform={`translate(${x}, ${y})`}
                className="hex-grid-cell"
                style={{ animationDelay: `${delay}s` }}
              />
            );
          })}

          {/* Superpower hexagons */}
          {Object.entries(SUPERPOWER_HEXES).map(([key, superpower]) => {
            const [q, r] = key.split(',').map(Number);
            const { x, y } = axialToPixel(q, r);
            const superpowerDelay = 0.3 + superpower.order * 0.12;
            const isExternal = superpower.href.startsWith('http');

            return (
              <g
                key={key}
                className="hex-superpower"
                transform={`translate(${x}, ${y})`}
              >
                <a href={superpower.href} target={isExternal ? '_blank' : undefined}>
                  <path
                    d={HEX_PATH}
                    className="hex-superpower-path"
                    style={{ animationDelay: `${superpowerDelay}s` }}
                  />
                  <foreignObject
                    x={-SIZE * HEX_SCALE * SQRT3 * TEXT_INSET / 2}
                    y={-SIZE * 0.5}
                    width={SIZE * HEX_SCALE * SQRT3 * TEXT_INSET}
                    height={SIZE}
                    className="hex-superpower-foreign"
                    style={{ animationDelay: `${superpowerDelay + 0.1}s` }}
                  >
                    <div className="hex-superpower-title">
                      {superpower.title}
                    </div>
                  </foreignObject>
                </a>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
