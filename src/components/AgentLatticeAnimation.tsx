"use client";

import { useRef, useEffect } from "react";

/**
 * Living agent network — 3D sphere of nodes that continuously grows,
 * propagates signals, and expands, representing the agentic economy.
 *
 *  - Fibonacci sphere for mathematically even node distribution
 *  - Slow Y-axis rotation + X tilt reveals 3D depth
 *  - Each node drifts via unique sinusoidal oscillation (golden ratio phases)
 *  - BFS broadcast waves propagate through the network graph
 *  - Receiving nodes swell on signal arrival (super-linear energy response)
 *  - Two-layer radius system:
 *      1. Growth radius — logarithmic expansion as nodes join
 *      2. Energy radius — collective breathing on broadcast activity
 *  - Green signal particles travel along edges during broadcasts
 *  - Network grows continuously: spawn rate accelerates over time
 *
 * Pure SVG + math, no external dependencies.
 */

// ── Geometry ──────────────────────────────────────────────────────
const VB = 400;
const CX = VB / 2;
const CY = VB / 2;
const FOV = 600;
const INITIAL_NODES = 14;
const MAX_NODES = 80;
const EDGE_ANGLE_THRESHOLD = 0.82;

// ── Growth ────────────────────────────────────────────────────────
const RADIUS_BASE = 120;          // starting sphere radius
const RADIUS_GROWTH = 0.28;      // logarithmic growth coefficient
const GROWTH_SMOOTHING = 2;      // how fast radius tracks growth target

// ── Motion ────────────────────────────────────────────────────────
const ROTATION_SPEED = 0.1;      // rad/s
const TILT = 0.18;               // X-axis tilt for depth
const DRIFT_AMP = 0.035;        // per-node surface drift amplitude
const NODE_R_MIN = 2;
const NODE_R_MAX = 5;

// ── Signals ───────────────────────────────────────────────────────
const BROADCAST_INTERVAL = 3.5;
const SIGNAL_DURATION = 0.8;
const SIGNAL_R = 2.5;
const ENERGY_DECAY = 0.982;

// ── Spawning ──────────────────────────────────────────────────────
const SPAWN_INTERVAL_INITIAL = 4.0;
const SPAWN_INTERVAL_MIN = 1.5;
const SPAWN_ACCELERATION = 0.94;  // multiply interval by this each spawn

// ── Energy expansion ──────────────────────────────────────────────
const EXPANSION_STRENGTH = 0.18;
const EXPANSION_SMOOTHING = 4;

// ── Types ─────────────────────────────────────────────────────────
interface Vec3 { x: number; y: number; z: number }
interface Edge { a: number; b: number }
interface Signal { fromIdx: number; toIdx: number; startTime: number }

interface BroadcastWave {
  frontier: number[];
  visited: Set<number>;
  nextTime: number;
}

// ── Math ──────────────────────────────────────────────────────────
const PHI = Math.PI * (3 - Math.sqrt(5));

function fibonacciSphere(n: number): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = PHI * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

function normalize(v: Vec3): Vec3 {
  const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) || 1;
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

function rotateY(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
}

function rotateX(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}

function project(p: Vec3, radius: number): { x: number; y: number; scale: number; z: number } {
  const wz = p.z * radius;
  const scale = FOV / (FOV + wz);
  return {
    x: CX + p.x * radius * scale,
    y: CY + p.y * radius * scale,
    scale,
    z: p.z,
  };
}

// Smooth per-node drift — unique sinusoidal pattern on the sphere surface
function driftedPosition(base: Vec3, index: number, t: number): Vec3 {
  const f1 = 0.25 + index * 0.017;
  const f2 = 0.18 + index * 0.013;
  const p1 = index * 1.618; // golden ratio phase offsets
  const p2 = index * 2.399;
  const dx = Math.sin(t * f1 + p1) * DRIFT_AMP;
  const dy = Math.sin(t * f2 + p2) * DRIFT_AMP;
  const dz = Math.cos(t * f1 * 0.7 + index * 0.831) * DRIFT_AMP;
  return normalize({ x: base.x + dx, y: base.y + dy, z: base.z + dz });
}

// Logarithmic growth radius — decelerating expansion as network densifies
function growthRadius(nodeCount: number): number {
  const growth = Math.log(1 + (nodeCount - INITIAL_NODES) / INITIAL_NODES);
  return RADIUS_BASE * (1 + RADIUS_GROWTH * growth);
}

// Build edges based on angular proximity on the unit sphere
function buildEdges(positions: Vec3[], count: number): Edge[] {
  const edges: Edge[] = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dot = positions[i].x * positions[j].x +
                  positions[i].y * positions[j].y +
                  positions[i].z * positions[j].z;
      if (Math.acos(Math.min(dot, 1)) <= EDGE_ANGLE_THRESHOLD) {
        edges.push({ a: i, b: j });
      }
    }
  }
  return edges;
}

// Frame-rate independent exponential interpolation
function expLerp(current: number, target: number, rate: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-dt * rate));
}

// ── Component ─────────────────────────────────────────────────────
export default function AgentLatticeAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const allBasePositions = fibonacciSphere(MAX_NODES);

    // ── Mutable state ──
    let visibleCount = INITIAL_NODES;
    let smoothGrowth = growthRadius(INITIAL_NODES);
    let smoothRadius = smoothGrowth;
    let spawnInterval = SPAWN_INTERVAL_INITIAL;
    let prevTime = performance.now() / 1000;
    let prevOrder: number[] = [];
    let raf: number;

    const energy: number[] = new Array(MAX_NODES).fill(0);
    const birthTime: number[] = [];
    for (let i = 0; i < MAX_NODES; i++) {
      birthTime.push(i < INITIAL_NODES ? -10 : Infinity);
    }

    let edges = buildEdges(allBasePositions, visibleCount);

    // ── SVG element pools ──
    const edgeEls: SVGLineElement[] = [];
    const nodeEls: SVGCircleElement[] = [];
    const signals: Signal[] = [];
    const signalEls: SVGCircleElement[] = [];
    const signalPool: SVGCircleElement[] = [];

    function syncEdgeEls() {
      while (edgeEls.length > edges.length) edgeEls.pop()!.remove();
      while (edgeEls.length < edges.length) {
        const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
        el.setAttribute("stroke-width", "0.6");
        el.setAttribute("stroke-linecap", "round");
        svg!.insertBefore(el, svg!.firstChild);
        edgeEls.push(el);
      }
    }

    for (let i = 0; i < MAX_NODES; i++) {
      const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      el.setAttribute("opacity", "0");
      svg.appendChild(el);
      nodeEls.push(el);
    }

    syncEdgeEls();

    function getSignalEl(): SVGCircleElement {
      if (signalPool.length > 0) return signalPool.pop()!;
      const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      el.setAttribute("r", String(SIGNAL_R));
      el.setAttribute("fill", "rgba(147,213,0,0.8)");
      svg!.appendChild(el);
      return el;
    }

    // ── Event state ──
    const waves: BroadcastWave[] = [];
    const t0 = prevTime;
    let nextBroadcast = t0 + 2.0;
    let nextSpawn = t0 + 3.0;

    function loop() {
      const now = performance.now() / 1000;
      const elapsed = now - t0;
      const dt = now - prevTime;
      prevTime = now;

      // ── Energy decay ──
      for (let i = 0; i < visibleCount; i++) {
        energy[i] *= ENERGY_DECAY;
      }

      // ── Broadcast events ──
      if (now >= nextBroadcast && visibleCount > 0) {
        const origin = Math.floor(Math.random() * visibleCount);
        energy[origin] = Math.min(energy[origin] + 1.0, 1);
        waves.push({
          frontier: [origin],
          visited: new Set([origin]),
          nextTime: now + SIGNAL_DURATION * 0.7,
        });
        nextBroadcast = now + BROADCAST_INTERVAL + Math.random() * 1.5;
      }

      // Propagate waves through network (BFS)
      for (let w = waves.length - 1; w >= 0; w--) {
        const wave = waves[w];
        if (now >= wave.nextTime && wave.frontier.length > 0) {
          const next: number[] = [];
          for (const nodeIdx of wave.frontier) {
            for (const edge of edges) {
              const nb = edge.a === nodeIdx ? edge.b : edge.b === nodeIdx ? edge.a : -1;
              if (nb >= 0 && !wave.visited.has(nb)) {
                wave.visited.add(nb);
                next.push(nb);
                // Energy deferred — injected when signal arrives (see signal completion below)
                signals.push({ fromIdx: nodeIdx, toIdx: nb, startTime: now });
                signalEls.push(getSignalEl());
              }
            }
          }
          wave.frontier = next;
          wave.nextTime = now + SIGNAL_DURATION;
          if (next.length === 0) waves.splice(w, 1);
        }
      }

      // ── Spawn new nodes ──
      if (now >= nextSpawn && visibleCount < MAX_NODES) {
        birthTime[visibleCount] = now;
        visibleCount++;
        edges = buildEdges(allBasePositions, visibleCount);
        syncEdgeEls();
        spawnInterval = Math.max(SPAWN_INTERVAL_MIN, spawnInterval * SPAWN_ACCELERATION);
        nextSpawn = now + spawnInterval + Math.random() * spawnInterval * 0.4;
      }

      // ── Two-layer radius: growth + energy breathing ──
      const targetGrowth = growthRadius(visibleCount);
      smoothGrowth = expLerp(smoothGrowth, targetGrowth, GROWTH_SMOOTHING, dt);

      let totalEnergy = 0;
      for (let i = 0; i < visibleCount; i++) totalEnergy += energy[i];
      const meanEnergy = totalEnergy / visibleCount;
      const targetRadius = smoothGrowth * (1 + meanEnergy * EXPANSION_STRENGTH);
      smoothRadius = expLerp(smoothRadius, targetRadius, EXPANSION_SMOOTHING, dt);

      // ── Compute projected positions ──
      const rotAngle = elapsed * ROTATION_SPEED;
      const projected: { x: number; y: number; scale: number; z: number }[] = [];

      for (let i = 0; i < visibleCount; i++) {
        const drifted = driftedPosition(allBasePositions[i], i, elapsed);
        const rotated = rotateX(rotateY(drifted, rotAngle), TILT);
        projected.push(project(rotated, smoothRadius));
      }

      // ── Render edges ──
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        if (edge.a >= projected.length || edge.b >= projected.length) continue;
        const pa = projected[edge.a], pb = projected[edge.b];
        const depthT = ((pa.z + pb.z) / 2 + 1) / 2;
        const edgeEnergy = (energy[edge.a] + energy[edge.b]) / 2;
        const energyBoost = edgeEnergy * edgeEnergy * 0.5;
        const fadeA = Math.min((now - birthTime[edge.a]) * 1.5, 1);
        const fadeB = Math.min((now - birthTime[edge.b]) * 1.5, 1);
        const opacity = Math.min((0.18 + 0.22 * depthT + energyBoost) * fadeA * fadeB, 0.6);

        const el = edgeEls[i];
        el.setAttribute("x1", pa.x.toFixed(1));
        el.setAttribute("y1", pa.y.toFixed(1));
        el.setAttribute("x2", pb.x.toFixed(1));
        el.setAttribute("y2", pb.y.toFixed(1));
        el.setAttribute("stroke", `rgba(124,163,220,${opacity.toFixed(3)})`);
      }

      // ── Render nodes (depth-sorted, back to front) ──
      const indices: number[] = [];
      for (let i = 0; i < projected.length; i++) indices.push(i);
      indices.sort((a, b) => projected[a].z - projected[b].z);

      const orderChanged = prevOrder.length !== indices.length ||
        indices.some((v, i) => v !== prevOrder[i]);

      for (const i of indices) {
        const p = projected[i];
        const depthT = (p.z + 1) / 2;
        const fadeIn = Math.min((now - birthTime[i]) * 1.5, 1);
        const breathe = Math.sin(elapsed * 0.8 + i * 1.618) * 0.08;
        const pulse = Math.pow(energy[i], 1.5) * 1.5;
        const r = (NODE_R_MIN + (NODE_R_MAX - NODE_R_MIN) * depthT) * (1 + breathe + pulse) * fadeIn;
        const opacity = (0.15 + 0.55 * depthT + energy[i] * 0.3) * fadeIn;

        const el = nodeEls[i];
        el.setAttribute("cx", p.x.toFixed(1));
        el.setAttribute("cy", p.y.toFixed(1));
        el.setAttribute("r", Math.max(r, 0).toFixed(2));
        el.setAttribute("fill", `rgba(124,163,220,${Math.min(opacity, 0.9).toFixed(3)})`);
        el.setAttribute("opacity", "1");
        if (orderChanged) svg!.appendChild(el);
      }

      for (let i = projected.length; i < MAX_NODES; i++) {
        nodeEls[i].setAttribute("opacity", "0");
      }

      if (orderChanged) prevOrder = indices.slice();

      // ── Render signals ──
      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        const t = (now - sig.startTime) / SIGNAL_DURATION;
        if (t >= 1 || sig.fromIdx >= projected.length || sig.toIdx >= projected.length) {
          // Inject energy at the moment of arrival — not before
          if (t >= 1 && sig.toIdx < visibleCount) {
            energy[sig.toIdx] = Math.min(energy[sig.toIdx] + 0.8, 1);
          }
          signalEls[i].setAttribute("opacity", "0");
          signalPool.push(signalEls[i]);
          const last = signals.length - 1;
          if (i < last) { signals[i] = signals[last]; signalEls[i] = signalEls[last]; }
          signals.pop(); signalEls.pop();
          continue;
        }
        const ease = 1 - Math.pow(1 - t, 3);
        const from = projected[sig.fromIdx], to = projected[sig.toIdx];
        const x = from.x + (to.x - from.x) * ease;
        const y = from.y + (to.y - from.y) * ease;
        const opacity = Math.min(t * 5, 1) * Math.min((1 - t) * 4, 1) * 0.8;
        signalEls[i].setAttribute("cx", x.toFixed(1));
        signalEls[i].setAttribute("cy", y.toFixed(1));
        signalEls[i].setAttribute("opacity", opacity.toFixed(3));
      }

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      edgeEls.forEach(el => el.remove());
      nodeEls.forEach(el => el.remove());
      signalEls.forEach(el => el.remove());
      signalPool.forEach(el => el.remove());
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VB} ${VB}`}
      style={{ width: "100%", height: "100%", minHeight: 400, overflow: "visible" }}
      xmlns="http://www.w3.org/2000/svg"
    />
  );
}
