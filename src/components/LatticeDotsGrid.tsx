"use client";

import { useRef, useEffect } from "react";

/**
 * Fills the hero visual with dots at every background-grid intersection.
 * Size and opacity fall off smoothly with distance from the nucleus (container center).
 * A radial sine wave animates all dots — the whole data fabric pulses outward.
 *
 * Grid math:
 *   lattice-bg is position:fixed, background-size:50px, background-position:center center.
 *   Tile midpoint (25px) aligns with CSS viewport center, so grid lines sit at:
 *     x = (clientWidth/2 - 25) + n * 50
 *   We use clientWidth (excludes scrollbar) to match CSS.
 */

const GRID = 50;

// Wave — faster, fully dynamic (nodes can vanish entirely)
const WAVE_SPEED = 1.6;   // rad/s — brisk pulse
const WAVE_NUMBER = 1.0;  // spatial frequency
const SCALE_MIN = 0.3;
const SCALE_MAX = 1.6;
const OPACITY_MIN = 0.0;   // fully invisible at trough
const OPACITY_MAX = 1.0;

// Startup: wave front expands from nucleus at the wave's own propagation speed
// This ensures each dot starts from zero and grows when the front reaches it
const EXPANSION_SPEED = WAVE_SPEED / WAVE_NUMBER; // grid-units/sec = wave propagation speed

// Radial falloff for base size and opacity
const SIZE_CENTER = 12;    // px at nucleus
const SIZE_EDGE = 3;       // px at furthest dot
const OPACITY_CENTER = 0.85;
const OPACITY_EDGE = 0.08;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(Math.max(t, 0), 1);
}

// Text suppression — dots near the hero text are dimmed
// Desktop: text on the left (x-axis suppression)
// Mobile (<768px): text on top (y-axis suppression)
const MOBILE_BREAK = 768;
const TEXT_EDGE_DESKTOP = 0.55;    // left 55% of viewport
const TEXT_FADE_DESKTOP = 0.15;
const TEXT_EDGE_MOBILE = 0.45;     // top 45% of viewport
const TEXT_FADE_MOBILE = 0.15;
const TEXT_DIM_FLOOR = 0.07;       // minimum — dots still faintly pulse over text

interface DotData {
  x: number;       // container-local px
  y: number;
  dist: number;    // grid-unit distance from nucleus
  baseSize: number;
  baseOpacity: number;
  textDim: number; // 0–1 multiplier (0 = fully suppressed over text, 1 = full brightness)
}

export default function LatticeDotsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const dotsData = useRef<DotData[]>([]);

  // Build dots and start animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function buildDots() {
      const rect = container!.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;

      // Phase: where a grid line falls in container-local coords
      const phaseX = (((vw / 2 - 25 - rect.left) % GRID) + GRID) % GRID;
      const phaseY = (((vh / 2 - 25 - rect.top) % GRID) + GRID) % GRID;

      // Generate dots covering the ENTIRE viewport in container-local coords
      // viewport left edge = -rect.left, right edge = vw - rect.left
      // viewport top edge = -rect.top, bottom edge = vh - rect.top
      const minX = -rect.left - GRID;
      const maxX = vw - rect.left + GRID;
      const minY = -rect.top - GRID;
      const maxY = vh - rect.top + GRID;

      // First grid intersection at or after minX/minY
      const startX = phaseX + Math.ceil((minX - phaseX) / GRID) * GRID;
      const startY = phaseY + Math.ceil((minY - phaseY) / GRID) * GRID;

      const isMobile = vw < MOBILE_BREAK;

      // Nucleus: on desktop, center of container; on mobile, center of viewport horizontally
      const cx = isMobile
        ? (vw / 2 - rect.left)   // viewport center x in container coords
        : rect.width / 2;
      const cy = rect.height / 2;
      const nucX = phaseX + Math.round((cx - phaseX) / GRID) * GRID;
      const nucY = phaseY + Math.round((cy - phaseY) / GRID) * GRID;

      // Build all dots across viewport
      let maxDist = 0;
      const raw: { x: number; y: number; dist: number }[] = [];
      for (let x = startX; x <= maxX; x += GRID) {
        for (let y = startY; y <= maxY; y += GRID) {
          const dx = (x - nucX) / GRID;
          const dy = (y - nucY) / GRID;
          const dist = Math.sqrt(dx * dx + dy * dy);
          raw.push({ x, y, dist });
          if (dist > maxDist) maxDist = dist;
        }
      }

      // Compute base size, opacity, and text suppression
      const dots: DotData[] = raw.map(({ x, y, dist }) => {
        const t = maxDist > 0 ? dist / maxDist : 0;

        // Text suppression: desktop = horizontal (left), mobile = vertical (top)
        const vpFrac = isMobile
          ? (y + rect.top) / vh
          : (x + rect.left) / vw;
        const edge = isMobile ? TEXT_EDGE_MOBILE : TEXT_EDGE_DESKTOP;
        const fade = isMobile ? TEXT_FADE_MOBILE : TEXT_FADE_DESKTOP;
        const raw01 = Math.min(Math.max((vpFrac - (edge - fade)) / fade, 0), 1);
        const textDim = TEXT_DIM_FLOOR + raw01 * (1 - TEXT_DIM_FLOOR);

        return {
          x,
          y,
          dist,
          baseSize: lerp(SIZE_CENTER, SIZE_EDGE, t),
          baseOpacity: lerp(OPACITY_CENTER, OPACITY_EDGE, t),
          textDim,
        };
      });

      dotsData.current = dots;

      // Remove previous dots and create new DOM elements
      dotsRef.current.forEach((el) => el.remove());
      dotsRef.current = dots.map((dot) => {
        const el = document.createElement("div");
        el.className = "lattice-dot";
        el.style.left = `${dot.x}px`;
        el.style.top = `${dot.y}px`;
        el.style.width = `${dot.baseSize}px`;
        el.style.height = `${dot.baseSize}px`;
        container!.appendChild(el);
        return el;
      });
    }

    buildDots();

    // Animate — each dot waits until the expanding wave front reaches it,
    // then starts its oscillation from zero (trough). The expansion speed
    // matches the wave propagation speed so it seamlessly becomes the
    // steady-state traveling wave.
    let raf: number;
    const t0 = performance.now() / 1000;
    function loop() {
      const now = performance.now() / 1000;
      const elapsed = now - t0;

      const dots = dotsData.current;
      const els = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const el = els[i];
        if (!el) continue;

        // Each dot activates when the wave front reaches it
        const localTime = elapsed - d.dist / EXPANSION_SPEED;

        if (localTime <= 0) {
          // Wave front hasn't reached this dot yet — invisible
          el.style.transform = `translate(-50%,-50%) scale(${SCALE_MIN})`;
          el.style.opacity = "0";
          continue;
        }

        // -cos starts from trough (0) and grows, maintaining the traveling wave pattern
        const wave = (-Math.cos(localTime * WAVE_SPEED) + 1) / 2;
        const scale = SCALE_MIN + wave * (SCALE_MAX - SCALE_MIN);
        const opacity = d.baseOpacity * (OPACITY_MIN + wave * (OPACITY_MAX - OPACITY_MIN)) * d.textDim;
        const dimScale = SCALE_MIN + d.textDim * (scale - SCALE_MIN);
        el.style.transform = `translate(-50%,-50%) scale(${dimScale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    // Rebuild on resize
    function onResize() {
      cancelAnimationFrame(raf);
      buildDots();
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <div ref={containerRef} className="vision-hero-visual lattice-dots-area" />;
}
