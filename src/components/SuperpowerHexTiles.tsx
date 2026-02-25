'use client';

import { useState } from 'react';
import Link from 'next/link';
import { hexPath, axialToPixel, hexBounds, SUPERPOWER_HEXES } from '@/lib/hex';

const SIZE = 80;
const GAP = 0.08;

const HEX_PATH = hexPath(SIZE * 0.95);

function toPixel(q: number, r: number) {
  return axialToPixel(q, r, SIZE, GAP);
}

const tiles = Object.entries(SUPERPOWER_HEXES).map(([key, def]) => {
  const [q, r] = key.split(',').map(Number);
  return { ...def, q, r, key };
});

export default function SuperpowerHexTiles() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const positions = tiles.map((tile) => ({
    ...tile,
    ...toPixel(tile.q, tile.r),
  }));

  const { minX, minY, maxX, maxY } = hexBounds(positions, SIZE);

  const svgWidth = maxX - minX + SIZE * 0.5;
  const svgHeight = maxY - minY + SIZE * 0.5;
  const offsetX = -minX + SIZE * 0.25;
  const offsetY = -minY + SIZE * 0.25;

  return (
    <div className="superpower-hex-tiles">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="superpower-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="superpowerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--accent-highlight)" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="superpowerHoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent-highlight)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <g transform={`translate(${offsetX}, ${offsetY})`}>
          {positions.map((tile) => {
            const isHovered = hoveredKey === tile.key;
            const isExternal = tile.href.startsWith('http');

            return (
              <g
                key={tile.key}
                transform={`translate(${tile.x}, ${tile.y})`}
                className={`superpower-tile ${isHovered ? 'superpower-tile-hovered' : ''}`}
                onMouseEnter={() => setHoveredKey(tile.key)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{ cursor: 'pointer' }}
              >
                <Link href={tile.href} target={isExternal ? '_blank' : undefined}>
                  <path
                    d={HEX_PATH}
                    className={`superpower-hex ${isHovered ? 'superpower-hex-hovered' : ''}`}
                  />
                  <text
                    className="superpower-title"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    y={isHovered ? -12 : 0}
                  >
                    {tile.title}
                  </text>
                  {isHovered && (
                    <text
                      className="superpower-desc"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      y={12}
                    >
                      {tile.desc.length > 30 ? tile.desc.slice(0, 30) + '...' : tile.desc}
                    </text>
                  )}
                </Link>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
