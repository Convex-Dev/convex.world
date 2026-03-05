'use client';

import { useState, useEffect, useMemo } from 'react';
import { SQRT3, hexPath, axialToPixel as axialToPixelBase, hexBounds, SUPERPOWER_HEXES } from '@/lib/hex';
import { isRevisit } from '@/lib/session';

const SIZE = 72;
const GAP = 0.04;
const VIEWPORT_WIDTH = 420;
const HEX_SCALE = 0.95;

const HEX_PATH = hexPath(SIZE * HEX_SCALE);

// Split multi-word titles into balanced lines for SVG <tspan> rendering.
// Native SVG <text> has no word-wrap, so we split manually at the midpoint.
function titleLines(title: string): string[] {
  const words = title.split(' ');
  if (words.length <= 1) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

function toPixel(q: number, r: number) {
  return axialToPixelBase(q, r, SIZE, GAP);
}

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
  // Start false (SSR-safe) — updated client-side to avoid hydration mismatch
  // since sessionStorage isn't available during server rendering.
  const [skipAnimations, setSkipAnimations] = useState(false);

  useEffect(() => {
    if (isRevisit) setSkipAnimations(true);
  }, []);

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

  const superpowerPositions = Object.keys(SUPERPOWER_HEXES).map(key => {
    const [q, r] = key.split(',').map(Number);
    return toPixel(q, r);
  });

  const { minX, maxX, minY, maxY } = hexBounds(superpowerPositions, SIZE);

  const svgWidth = Math.max(maxX - minX + 40, VIEWPORT_WIDTH);
  const svgHeight = maxY - minY + 80;
  const offsetX = svgWidth / 2 - (minX + maxX) / 2;
  const offsetY = -minY + 40;

  // Center position for distance calculation
  const centerPos = toPixel(1, 0);

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
            const { x, y } = toPixel(q, r);
            const dx = x - centerPos.x;
            const dy = y - centerPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const delay = skipAnimations ? 0 : 0.8 + (distance / 300) * 0.3;

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
            const { x, y } = toPixel(q, r);
            const superpowerDelay = skipAnimations ? 0 : 0.3 + superpower.order * 0.12;
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
                  {/* Native SVG <text> instead of <foreignObject> — iOS Safari
                     has long-standing rendering bugs with foreignObject that
                     cause labels to be invisible on real devices. */}
                  <g className="hex-superpower-title-group"
                    style={{ animationDelay: `${superpowerDelay + 0.1}s` }}
                  >
                    <text className="hex-superpower-title" textAnchor="middle" dominantBaseline="middle">
                      {(() => {
                        const lines = titleLines(superpower.title);
                        if (lines.length === 1) return lines[0];
                        return lines.map((line, i) => (
                          <tspan key={i} x={0} dy={i === 0 ? '-0.6em' : '1.2em'}>
                            {line}
                          </tspan>
                        ));
                      })()}
                    </text>
                  </g>
                </a>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
