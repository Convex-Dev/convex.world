'use client';

import { useMemo, useState, useRef, useEffect } from 'react';

/**
 * HexGridBackground - A seamless hexagonal grid using proper hex math.
 * Generates a full-viewport grid of pointy-top hexagons (like Convex logo).
 * Some hexes are "superpowers" with interactive content.
 */

const SQRT3 = Math.sqrt(3);
const SIZE = 360;
const GAP = 0.04;

const HEX_PATH = (() => {
  const s = SIZE * 0.95;
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angleDeg = 60 * i - 90;
    const angleRad = (Math.PI / 180) * angleDeg;
    const x = Math.round(s * Math.cos(angleRad) * 1000) / 1000;
    const y = Math.round(s * Math.sin(angleRad) * 1000) / 1000;
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
  }
  return points.join(' ') + ' Z';
})();

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
}

const SUPERPOWER_HEXES: Record<string, Superpower & { order: number }> = {
  '1,0': { title: "Data Lattice", desc: "Global self-healing fabric", href: "https://docs.convex.world/docs/overview/lattice", order: 0 },
  '2,-1': { title: "Convex Lisp", desc: "Functional programming", href: "https://docs.convex.world/docs/cad/lisp", order: 1 },
  '2,0': { title: "Digital Assets", desc: "Tokens & NFTs in one line", href: "https://docs.convex.world/docs/tutorial/coins", order: 2 },
  '1,1': { title: "Virtual Machine", desc: "High performance execution", href: "https://docs.convex.world/docs/overview/concepts", order: 3 },
  '0,1': { title: "Agent Ready", desc: "Agentic tools with MCP", href: "/developers", order: 4 },
  '0,0': { title: "On-Chain Compiler", desc: "No external toolchains", href: "/sandbox", order: 5 },
  '1,-1': { title: "CPoS Consensus", desc: "Realtime convergent consensus", href: "https://docs.convex.world/docs/overview/concepts#convergent-proof-of-stake-cpos", order: 6 },
};

interface GridCell {
  q: number;
  r: number;
  x: number;
  y: number;
  superpower: (Superpower & { order: number }) | null;
}

function pixelToAxial(px: number, py: number): { q: number; r: number } {
  const gapFactor = 1 + GAP;
  const r = py / (1.5 * SIZE * gapFactor);
  const q = (px / (SQRT3 * SIZE * gapFactor)) - r / 2;
  return { q: Math.round(q), r: Math.round(r) };
}

// Animation duration: 7 superpowers * 0.15s delay + 0.5s animation + buffer
const ANIMATION_COMPLETE_DELAY = 2500;

export default function HexGridBackground() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [isInSuperpowerArea, setIsInSuperpowerArea] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Detect theme changes and replay animation
  useEffect(() => {
    const handleThemeChange = () => {
      setAnimationKey(prev => prev + 1);
      setIsAnimationComplete(false);
      setHoveredKey(null);
      setIsInSuperpowerArea(false);
    };
    
    // Watch for class changes on document element (theme toggle)
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
  
  // Disable hover until animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, ANIMATION_COMPLETE_DELAY);
    return () => clearTimeout(timer);
  }, [animationKey]);
  
  const handleSuperpowerEnter = (key: string) => {
    if (!isAnimationComplete) return;
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setHoveredKey(key);
    setIsInSuperpowerArea(true);
  };
  
  const handleSuperpowerLeave = () => {
    if (!isAnimationComplete) return;
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredKey(null);
      setIsInSuperpowerArea(false);
    }, 100);
  };
  
  const gridCells = useMemo(() => {
    const cells: GridCell[] = [];
    const gapFactor = 1 + GAP;
    const hexWidth = SQRT3 * SIZE * gapFactor;
    const hexHeight = 1.5 * SIZE * gapFactor;
    
    const viewWidth = 5000;
    const viewHeight = 8000;
    const halfW = viewWidth / 2;
    const startY = -SIZE * 3;
    const endY = viewHeight;
    
    const seen = new Set<string>();
    
    for (let py = startY; py <= endY; py += hexHeight) {
      for (let px = -halfW - SIZE; px <= halfW + SIZE; px += hexWidth / 2) {
        const { q, r } = pixelToAxial(px, py);
        const key = `${q},${r}`;
        
        if (!seen.has(key)) {
          seen.add(key);
          const { x, y } = axialToPixel(q, r);
          const superpower = SUPERPOWER_HEXES[key] || null;
          cells.push({ q, r, x, y, superpower });
        }
      }
    }
    
    return cells;
  }, []);

  const bounds = useMemo(() => {
    if (gridCells.length === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    
    const hexWidth = SQRT3 * SIZE;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    
    gridCells.forEach(({ x, y }) => {
      minX = Math.min(minX, x - hexWidth / 2);
      maxX = Math.max(maxX, x + hexWidth / 2);
      minY = Math.min(minY, y - SIZE);
      maxY = Math.max(maxY, y + SIZE);
    });
    
    return { minX, maxX, minY, maxY };
  }, [gridCells]);

  const svgWidth = bounds.maxX - bounds.minX;
  const svgHeight = bounds.maxY - bounds.minY;
  const offsetX = -bounds.minX;
  const offsetY = -bounds.minY;

  return (
    <div className="hex-grid-bg" aria-hidden="true">
      <svg 
        key={animationKey}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="hex-grid-svg"
      >
        <defs>
          <linearGradient id="hexFeaturedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--accent-highlight)" stopOpacity="0.08" />
          </linearGradient>
          <filter id="hexGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform={`translate(${offsetX}, ${offsetY})`}>
          {(() => {
            const dataLatticePos = axialToPixel(1, 0);
            return gridCells.map((cell) => {
              const dx = cell.x - dataLatticePos.x;
              const dy = cell.y - dataLatticePos.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const delay = Math.min(distance / 2000, 0.8);
              const key = `${cell.q},${cell.r}`;
              const isHovered = hoveredKey === key;
              const isSuperpower = cell.superpower !== null;
              
              if (isSuperpower && cell.superpower) {
                const isExternal = cell.superpower.href.startsWith('http');
                const isDimmed = hoveredKey !== null && !isHovered;
                const superpowerDelay = cell.superpower.order * 0.15;
                const gridDelay = 0.15 * 7 + delay;
                return (
                  <g
                    key={`${cell.q}-${cell.r}`}
                    transform={`translate(${cell.x}, ${cell.y})`}
                    className={`hex-superpower ${isHovered ? 'hex-superpower-hovered' : ''} ${isDimmed ? 'hex-superpower-dimmed' : ''}`}
                    onMouseEnter={() => handleSuperpowerEnter(key)}
                    onMouseLeave={handleSuperpowerLeave}
                    style={{ cursor: 'pointer' }}
                    data-superpower-key={key}
                  >
                    <a href={cell.superpower.href} target={isExternal ? '_blank' : undefined}>
                      <path
                        d={HEX_PATH}
                        className={`hex-superpower-path ${isHovered ? 'hex-superpower-path-hovered' : ''}`}
                        style={{ animationDelay: `${superpowerDelay}s` }}
                      />
                      <text
                        className="hex-superpower-title"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        y={isHovered ? -80 : 0}
                        style={{ animationDelay: `${superpowerDelay + 0.1}s` }}
                      >
                        {cell.superpower.title}
                      </text>
                      {isHovered && (
                        <>
                          <text
                            className="hex-superpower-desc"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            y={30}
                          >
                            {cell.superpower.desc}
                          </text>
                          <text
                            className="hex-superpower-cta"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            y={120}
                          >
                            Learn more →
                          </text>
                        </>
                      )}
                    </a>
                  </g>
                );
              }
              
              const gridDelay = 1.2 + delay;
              const isBright = isInSuperpowerArea;
              
              return (
                <path
                  key={`${cell.q}-${cell.r}`}
                  d={HEX_PATH}
                  transform={`translate(${cell.x}, ${cell.y})`}
                  className={`hex-grid-cell ${isBright ? 'hex-grid-cell-bright' : ''}`}
                  style={{ animationDelay: `${gridDelay}s` }}
                />
              );
            });
          })()}
        </g>
      </svg>
    </div>
  );
}
