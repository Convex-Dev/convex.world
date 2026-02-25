'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { SQRT3, hexPath, axialToPixel as axialToPixelBase, hexBounds, SUPERPOWER_HEXES } from '@/lib/hex';
import { isRevisit } from '@/lib/session';

const BASE_SIZE = 300;
const GAP = 0.04;
const HEX_SCALE = 0.95;
const TEXT_INSET = 0.85;
const FULL_SIZE = 1900;

/** Scale hex size proportionally to viewport width. Full size at FULL_SIZE = 1900px, smaller below. */
function computeSize() {
  if (typeof window === 'undefined') return BASE_SIZE;
  return Math.round(Math.min(BASE_SIZE, BASE_SIZE * Math.min(FULL_SIZE, window.innerWidth) / FULL_SIZE));
}

interface GridCell {
  q: number;
  r: number;
  x: number;
  y: number;
  superpower: (typeof SUPERPOWER_HEXES)[string] | null;
}

function pixelToAxial(px: number, py: number, s: number): { q: number; r: number } {
  const gapFactor = 1 + GAP;
  const r = py / (1.5 * s * gapFactor);
  const q = (px / (SQRT3 * s * gapFactor)) - r / 2;
  return { q: Math.round(q), r: Math.round(r) };
}

// Animation duration: 9 superpowers * 0.15s delay + 0.5s animation + buffer
const ANIMATION_COMPLETE_DELAY = 3000;

export default function HexGridBackground() {
  const [size, setSize] = useState(computeSize);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [isInSuperpowerArea, setIsInSuperpowerArea] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(isRevisit);
  const [animationKey, setAnimationKey] = useState(0);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Recompute hex size on window resize
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setSize(computeSize()), 150);
    };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); clearTimeout(timeout); };
  }, []);

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
  
  const hexPathD = useMemo(() => hexPath(size * HEX_SCALE), [size]);

  const gridCells = useMemo(() => {
    const cells: GridCell[] = [];
    const gapFactor = 1 + GAP;
    const hexWidth = SQRT3 * size * gapFactor;
    const hexHeight = 1.5 * size * gapFactor;

    const viewWidth = 5000;
    const viewHeight = 8000;
    const halfW = viewWidth / 2;
    const startY = -size * 3;
    const endY = viewHeight;

    const seen = new Set<string>();

    for (let py = startY; py <= endY; py += hexHeight) {
      for (let px = -halfW - size; px <= halfW + size; px += hexWidth / 2) {
        const { q, r } = pixelToAxial(px, py, size);
        const key = `${q},${r}`;

        if (!seen.has(key)) {
          seen.add(key);
          const { x, y } = axialToPixelBase(q, r, size, GAP);
          const superpower = SUPERPOWER_HEXES[key] || null;
          cells.push({ q, r, x, y, superpower });
        }
      }
    }

    return cells;
  }, [size]);

  const bounds = useMemo(() => {
    if (gridCells.length === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    return hexBounds(gridCells, size);
  }, [gridCells, size]);

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
            const dataLatticePos = axialToPixelBase(1, 0, size, GAP);
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
                const superpowerDelay = isRevisit ? 0 : cell.superpower.order * 0.15;
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
                        d={hexPathD}
                        className={`hex-superpower-path ${isHovered ? 'hex-superpower-path-hovered' : ''}`}
                        style={{ animationDelay: `${superpowerDelay}s` }}
                      />
                      <foreignObject
                        x={-size * HEX_SCALE * SQRT3 * TEXT_INSET / 2}
                        y={-size * 0.5}
                        width={size * HEX_SCALE * SQRT3 * TEXT_INSET}
                        height={size}
                        className="hex-superpower-foreign"
                        style={{ animationDelay: `${superpowerDelay + 0.1}s` }}
                      >
                        <div className="hex-superpower-title">
                          {cell.superpower.title}
                        </div>
                      </foreignObject>
                    </a>
                  </g>
                );
              }
              
              // Grid animates after all 9 superpowers complete (9 * 0.15s = 1.35s + 0.5s animation buffer)
              const gridDelay = isRevisit ? 0 : 1.85 + delay;
              const isBright = isInSuperpowerArea;
              
              return (
                <path
                  key={`${cell.q}-${cell.r}`}
                  d={hexPathD}
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
