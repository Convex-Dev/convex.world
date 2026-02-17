'use client';

import { useState } from 'react';
import Link from 'next/link';
import { hexPath, axialToPixel, hexBounds, SQRT3 } from '@/lib/hex';

const SIZE = 80;
const GAP = 0.08;

const HEX_PATH = hexPath(SIZE * 0.95);

function toPixel(q: number, r: number) {
  return axialToPixel(q, r, SIZE, GAP);
}

interface Superpower {
  title: string;
  desc: string;
  href: string;
  q: number;
  r: number;
}

const SUPERPOWERS: Superpower[] = [
  { title: "Agent Ready", desc: "Agentic tools using the Model Context Protocol", href: "/developers", q: 1, r: -2 },
  { title: "Virtual Machine", desc: "High performance execution for smart contracts", href: "/developers#cvm", q: 2, r: -2 },
  { title: "CPoS Consensus", desc: "Realtime convergent consensus algorithm", href: "/developers#consensus", q: 2, r: -1 },
  { title: "Convex Lisp", desc: "Powerful functional programming language", href: "/developers#lisp", q: 3, r: -1 },
  { title: "Data Lattice", desc: "Global, self-healing data fabric", href: "/developers#lattice", q: 2, r: 0 },
  { title: "Digital Assets", desc: "Create tokens and NFTs in one expression", href: "/developers#assets", q: 3, r: 0 },
  { title: "On-Chain Compiler", desc: "Dynamic compilation with no toolchains", href: "/developers#compiler", q: 3, r: 1 },
  { title: "Open Source", desc: "Fully open-source, developer-friendly", href: "https://github.com/Convex-Dev", q: 4, r: 1 },
];

export default function SuperpowerHexTiles() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const positions = SUPERPOWERS.map((sp, idx) => ({
    ...sp,
    idx,
    ...toPixel(sp.q, sp.r)
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
            const isHovered = hoveredIndex === tile.idx;
            const isExternal = tile.href.startsWith('http');
            
            return (
              <g
                key={tile.idx}
                transform={`translate(${tile.x}, ${tile.y})`}
                className={`superpower-tile ${isHovered ? 'superpower-tile-hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(tile.idx)}
                onMouseLeave={() => setHoveredIndex(null)}
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
