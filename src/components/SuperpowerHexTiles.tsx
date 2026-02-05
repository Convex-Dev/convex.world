'use client';

import { useState } from 'react';
import Link from 'next/link';

const SQRT3 = Math.sqrt(3);
const SIZE = 80;
const GAP = 0.08;

function axialToPixel(q: number, r: number): { x: number; y: number } {
  const gapFactor = 1 + GAP;
  const x = SQRT3 * SIZE * (q + r / 2) * gapFactor;
  const y = 1.5 * SIZE * r * gapFactor;
  return { x, y };
}

function getPointyTopHexPath(size: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angleDeg = 60 * i - 90;
    const angleRad = (Math.PI / 180) * angleDeg;
    const x = Math.round(size * Math.cos(angleRad) * 1000) / 1000;
    const y = Math.round(size * Math.sin(angleRad) * 1000) / 1000;
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
  }
  return points.join(' ') + ' Z';
}

const HEX_PATH = getPointyTopHexPath(SIZE * 0.95);

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
    ...axialToPixel(sp.q, sp.r)
  }));

  const hexWidth = SQRT3 * SIZE;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  positions.forEach(({ x, y }) => {
    minX = Math.min(minX, x - hexWidth / 2);
    maxX = Math.max(maxX, x + hexWidth / 2);
    minY = Math.min(minY, y - SIZE);
    maxY = Math.max(maxY, y + SIZE);
  });

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
          <filter id="superpowerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
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
