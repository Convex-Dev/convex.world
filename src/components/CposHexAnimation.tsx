"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Animated hexagon graphic for the CPoS hero — grid-aligned.
 *
 * Vertices snap to background grid intersections (50px lattice).
 * Grid offsets from center (in grid units):
 *   (0,-4), (4,-2), (4,2), (0,4), (-4,2), (-4,-2)
 *
 * Visually represents Convergent Proof of Stake:
 *  1. Gossip signals travel between PEERS along hexagon edges
 *  2. Spoke signals flow bidirectionally (peer ↔ consensus)
 *  3. Convergence cycle: peers align, center glows, then drift repeats
 */

const GRID = 50;

// Vertex offsets in grid units — forms a hexagonal shape on the square grid
const VERTEX_OFFSETS: [number, number][] = [
  [0, -4],   // top
  [4, -2],   // upper-right
  [4, 2],    // lower-right
  [0, 4],    // bottom
  [-4, 2],   // lower-left
  [-4, -2],  // upper-left
];

// All directed gossip links — every node sends AND receives
const GOSSIP_SEQUENCE: [number, number][] = [
  [0, 1], [2, 3], [4, 5],
  [1, 2], [3, 4], [5, 0],
  [1, 0], [3, 2], [5, 4],
  [2, 1], [4, 3], [0, 5],
];

// Gossip signals (along edges between peers)
const GOSSIP_DURATION = 1.4;
const GOSSIP_INTERVAL = 0.5;
const SIGNAL_RADIUS = 2.5;

// Spoke signals (bidirectional: peer ↔ consensus state)
const SPOKE_DURATION = 1.0;
const SPOKE_INTERVAL = 0.8;
const SPOKE_SIGNAL_RADIUS = 2;

// Convergence cycle
const CYCLE_PERIOD = 6.0;
const NODE_BASE_R = 4;
const NODE_MAX_R = 6;
const CENTER_BASE_R = 5;
const CENTER_MAX_R = 8;

interface Pt { x: number; y: number }

interface GossipSignal {
  fromIdx: number;
  toIdx: number;
  startTime: number;
}

interface SpokeSignal {
  peerIdx: number;
  inward: boolean;
  startTime: number;
}

export default function CposHexAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [layout, setLayout] = useState<{ center: Pt; vertices: Pt[]; w: number; h: number } | null>(null);

  // Measure container and snap to grid
  useEffect(() => {
    function calc() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;

      const cx = rect.width / 2;
      const cy = rect.height / 2;

      let snapX: number;
      let snapY: number;

      if (vw < 768) {
        // On mobile, center precisely — grid alignment isn't visible
        snapX = cx;
        snapY = cy;
      } else {
        // On desktop, snap to grid intersection nearest to container center
        const phaseX = (((vw / 2 - 25 - rect.left) % GRID) + GRID) % GRID;
        const phaseY = (((vh / 2 - 25 - rect.top) % GRID) + GRID) % GRID;
        snapX = phaseX + Math.round((cx - phaseX) / GRID) * GRID;
        snapY = phaseY + Math.round((cy - phaseY) / GRID) * GRID;
      }

      const center = { x: snapX, y: snapY };
      const vertices = VERTEX_OFFSETS.map(([dx, dy]) => ({
        x: snapX + dx * GRID,
        y: snapY + dy * GRID,
      }));

      setLayout({ center, vertices, w: rect.width, h: rect.height });
    }

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Animation
  useEffect(() => {
    if (!layout || !svgRef.current) return;
    const svg = svgRef.current;
    const { center, vertices } = layout;

    const peerEls = svg.querySelectorAll<SVGCircleElement>(".cpos-peer-node");
    const centerEl = svg.querySelector<SVGCircleElement>(".cpos-center-node");

    const signals: GossipSignal[] = [];
    const signalEls: SVGCircleElement[] = [];
    const spokeSignals: SpokeSignal[] = [];
    const spokeEls: SVGCircleElement[] = [];
    const pool: SVGCircleElement[] = [];

    const t0 = performance.now() / 1000;
    let nextGossip = t0 + 0.2;
    let gossipIdx = 0;
    let nextSpoke = t0 + 0.6;
    let spokeIdx = 0;

    function getEl(r: number): SVGCircleElement {
      if (pool.length > 0) {
        const el = pool.pop()!;
        el.setAttribute("r", String(r));
        return el;
      }
      const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      el.setAttribute("r", String(r));
      el.setAttribute("fill", "rgba(124,163,220,0.7)");
      svg.appendChild(el);
      return el;
    }

    let raf: number;
    function loop() {
      const now = performance.now() / 1000;
      const elapsed = now - t0;

      // --- Convergence cycle ---
      const cyclePhase = (elapsed % CYCLE_PERIOD) / CYCLE_PERIOD;
      const convergence = cyclePhase < 0.6
        ? Math.pow(cyclePhase / 0.6, 1.5)
        : cyclePhase < 0.75
          ? 1.0
          : 1.0 - Math.pow((cyclePhase - 0.75) / 0.25, 2);

      // Update peer nodes
      for (let i = 0; i < peerEls.length; i++) {
        const peer = peerEls[i];
        const peerPhase = Math.sin(elapsed * 1.5 + i * 1.047) * (1 - convergence);
        const brightness = 0.3 + 0.5 * convergence + 0.2 * peerPhase;
        const r = NODE_BASE_R + (NODE_MAX_R - NODE_BASE_R) * convergence;
        peer.setAttribute("r", r.toFixed(2));
        peer.setAttribute("fill", `rgba(124,163,220,${brightness.toFixed(3)})`);
      }

      // Update center consensus node
      if (centerEl) {
        const centerBrightness = 0.2 + 0.7 * convergence;
        const centerR = CENTER_BASE_R + (CENTER_MAX_R - CENTER_BASE_R) * convergence;
        centerEl.setAttribute("r", centerR.toFixed(2));
        centerEl.setAttribute("fill", `rgba(124,163,220,${centerBrightness.toFixed(3)})`);
      }

      // --- Gossip signals along edges ---
      const gossipRate = GOSSIP_INTERVAL * (1.2 - 0.7 * convergence);
      while (now >= nextGossip) {
        const [from, to] = GOSSIP_SEQUENCE[gossipIdx % GOSSIP_SEQUENCE.length];
        signals.push({ fromIdx: from, toIdx: to, startTime: nextGossip });
        signalEls.push(getEl(SIGNAL_RADIUS));
        gossipIdx++;
        nextGossip += gossipRate;
      }

      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        const t = (now - sig.startTime) / GOSSIP_DURATION;
        if (t >= 1) {
          signalEls[i].setAttribute("opacity", "0");
          pool.push(signalEls[i]);
          // Swap-and-pop: O(1) removal
          const last = signals.length - 1;
          if (i < last) { signals[i] = signals[last]; signalEls[i] = signalEls[last]; }
          signals.pop(); signalEls.pop();
          continue;
        }
        const ease = 1 - Math.pow(1 - t, 3);
        const from = vertices[sig.fromIdx];
        const to = vertices[sig.toIdx];
        const x = from.x + (to.x - from.x) * ease;
        const y = from.y + (to.y - from.y) * ease;
        const opacity = Math.min(t * 5, 1) * Math.min((1 - t) * 4, 1) * 0.7;
        signalEls[i].setAttribute("cx", x.toFixed(1));
        signalEls[i].setAttribute("cy", y.toFixed(1));
        signalEls[i].setAttribute("opacity", opacity.toFixed(3));
      }

      // --- Spoke signals (bidirectional) ---
      while (now >= nextSpoke) {
        const peerIdx = spokeIdx % 6;
        const inward = convergence < 0.8;
        spokeSignals.push({ peerIdx, inward, startTime: nextSpoke });
        spokeEls.push(getEl(SPOKE_SIGNAL_RADIUS));
        spokeIdx++;
        nextSpoke += SPOKE_INTERVAL;
      }

      for (let i = spokeSignals.length - 1; i >= 0; i--) {
        const sig = spokeSignals[i];
        const t = (now - sig.startTime) / SPOKE_DURATION;
        if (t >= 1) {
          spokeEls[i].setAttribute("opacity", "0");
          pool.push(spokeEls[i]);
          const last = spokeSignals.length - 1;
          if (i < last) { spokeSignals[i] = spokeSignals[last]; spokeEls[i] = spokeEls[last]; }
          spokeSignals.pop(); spokeEls.pop();
          continue;
        }
        const ease = 1 - Math.pow(1 - t, 3);
        const peer = vertices[sig.peerIdx];
        const fromPt = sig.inward ? peer : center;
        const toPt = sig.inward ? center : peer;
        const x = fromPt.x + (toPt.x - fromPt.x) * ease;
        const y = fromPt.y + (toPt.y - fromPt.y) * ease;
        const opacity = Math.min(t * 5, 1) * Math.min((1 - t) * 3, 1) * 0.45;
        spokeEls[i].setAttribute("cx", x.toFixed(1));
        spokeEls[i].setAttribute("cy", y.toFixed(1));
        spokeEls[i].setAttribute("opacity", opacity.toFixed(3));
      }

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      signalEls.forEach((el) => el.remove());
      spokeEls.forEach((el) => el.remove());
      pool.forEach((el) => el.remove());
    };
  }, [layout]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: 400, position: "relative" }}>
      {layout && (
        <svg
          ref={svgRef}
          width={layout.w}
          height={layout.h}
          style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagon outline */}
          <polygon
            points={layout.vertices.map(v => `${v.x},${v.y}`).join(" ")}
            stroke="rgba(65,107,169,0.18)"
            strokeWidth="1"
            fill="none"
          />

          {/* Spokes to center */}
          {layout.vertices.map((v, i) => (
            <line
              key={`spoke-${i}`}
              x1={v.x}
              y1={v.y}
              x2={layout.center.x}
              y2={layout.center.y}
              stroke="rgba(65,107,169,0.12)"
              strokeWidth="0.75"
            />
          ))}

          {/* 6 peer nodes */}
          {layout.vertices.map((v, i) => (
            <circle
              key={`peer-${i}`}
              className="cpos-peer-node"
              cx={v.x}
              cy={v.y}
              r={NODE_BASE_R}
              fill="rgba(65,107,169,0.3)"
            />
          ))}

          {/* Consensus centre */}
          <circle
            className="cpos-center-node"
            cx={layout.center.x}
            cy={layout.center.y}
            r={CENTER_BASE_R}
            fill="rgba(124,163,220,0.2)"
          />
        </svg>
      )}
    </div>
  );
}
