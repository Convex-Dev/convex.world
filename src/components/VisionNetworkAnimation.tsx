"use client";

import { useRef, useEffect } from "react";

/**
 * 3D rotating globe made of nodes and edges for the Vision hero.
 *
 * Represents "Building open economies for all":
 *  - Globe = global, inclusive economy
 *  - All nodes are equal peers on the surface (no center/gatekeeper)
 *  - Edges form a mesh network — open connectivity
 *  - Slow rotation reveals the full sphere — universal access
 *  - Depth-based opacity gives natural 3D appearance
 *
 * Pure SVG + math, no WebGL dependency.
 */

// Globe config
const NUM_NODES = 42;
const SPHERE_RADIUS = 200;
const ROTATION_SPEED = 0.15; // radians per second
const FOV = 600; // perspective field of view
const NODE_R_MIN = 1.5;
const NODE_R_MAX = 4.5;
const EDGE_ANGLE_THRESHOLD = 0.65; // radians — max angular distance for edge

interface Vec3 { x: number; y: number; z: number }

// Fibonacci sphere — evenly distributes N points on a sphere
function fibonacciSphere(n: number): Vec3[] {
  const pts: Vec3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2; // y goes from 1 to -1
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push({
      x: Math.cos(theta) * radius,
      y: y,
      z: Math.sin(theta) * radius,
    });
  }
  return pts;
}

// Precompute unit sphere points and edges
const UNIT_POINTS = fibonacciSphere(NUM_NODES);

interface Edge { a: number; b: number }
function buildEdges(): Edge[] {
  const edges: Edge[] = [];
  for (let i = 0; i < UNIT_POINTS.length; i++) {
    for (let j = i + 1; j < UNIT_POINTS.length; j++) {
      const a = UNIT_POINTS[i];
      const b = UNIT_POINTS[j];
      // Angular distance on unit sphere = acos(dot product)
      const dot = a.x * b.x + a.y * b.y + a.z * b.z;
      if (Math.acos(Math.min(dot, 1)) <= EDGE_ANGLE_THRESHOLD) {
        edges.push({ a: i, b: j });
      }
    }
  }
  return edges;
}

const EDGES = buildEdges();

// Rotate point around Y axis
function rotateY(p: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: p.x * cos + p.z * sin,
    y: p.y,
    z: -p.x * sin + p.z * cos,
  };
}

// Slight tilt around X axis for visual interest
function rotateX(p: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: p.x,
    y: p.y * cos - p.z * sin,
    z: p.y * sin + p.z * cos,
  };
}

// Project 3D to 2D with perspective
function project(p: Vec3, cx: number, cy: number): { x: number; y: number; scale: number; z: number } {
  const scale = FOV / (FOV + p.z * SPHERE_RADIUS);
  return {
    x: cx + p.x * SPHERE_RADIUS * scale,
    y: cy + p.y * SPHERE_RADIUS * scale,
    scale,
    z: p.z,
  };
}

export default function VisionNetworkAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Pre-create SVG elements for edges and nodes
    const edgeEls: SVGLineElement[] = EDGES.map(() => {
      const el = document.createElementNS("http://www.w3.org/2000/svg", "line");
      el.setAttribute("stroke-width", "0.75");
      el.setAttribute("stroke-linecap", "round");
      svg.appendChild(el);
      return el;
    });

    const nodeEls: SVGCircleElement[] = UNIT_POINTS.map(() => {
      const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      svg.appendChild(el);
      return el;
    });

    const TILT = 0.15; // slight tilt for 3D depth feel
    let raf: number;
    let prevOrder: number[] = []; // Track previous z-order to avoid unnecessary DOM reflows

    function loop() {
      const now = performance.now() / 1000;
      const angle = now * ROTATION_SPEED;

      // Use viewBox center (400x400), not pixel dimensions
      const cx = 200;
      const cy = 200;

      // Project all points
      const projected = UNIT_POINTS.map((p) => {
        const rotated = rotateX(rotateY(p, angle), TILT);
        return project(rotated, cx, cy);
      });

      // Update edges — all visible, back edges dimmer than front
      for (let i = 0; i < EDGES.length; i++) {
        const edge = EDGES[i];
        const pa = projected[edge.a];
        const pb = projected[edge.b];
        const avgZ = (pa.z + pb.z) / 2;
        const depthT = (avgZ + 1) / 2;
        const opacity = 0.03 + 0.15 * depthT;

        const el = edgeEls[i];
        el.setAttribute("x1", pa.x.toFixed(1));
        el.setAttribute("y1", pa.y.toFixed(1));
        el.setAttribute("x2", pb.x.toFixed(1));
        el.setAttribute("y2", pb.y.toFixed(1));
        el.setAttribute("stroke", `rgba(65,107,169,${opacity.toFixed(3)})`);
      }

      // Sort nodes by z-depth (back to front) for proper paint order
      const indices = projected.map((_, i) => i);
      indices.sort((a, b) => projected[a].z - projected[b].z);

      // Only reorder DOM when sort order actually changes
      const orderChanged = prevOrder.length !== indices.length ||
        indices.some((v, i) => v !== prevOrder[i]);

      for (let order = 0; order < indices.length; order++) {
        const i = indices[order];
        const p = projected[i];
        const depthT = (p.z + 1) / 2;
        const r = NODE_R_MIN + (NODE_R_MAX - NODE_R_MIN) * depthT;
        const opacity = 0.08 + 0.62 * depthT;

        const el = nodeEls[i];
        el.setAttribute("cx", p.x.toFixed(1));
        el.setAttribute("cy", p.y.toFixed(1));
        el.setAttribute("r", r.toFixed(2));
        el.setAttribute("fill", `rgba(124,163,220,${opacity.toFixed(3)})`);
        if (orderChanged) svg!.appendChild(el);
      }
      if (orderChanged) prevOrder = indices;

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      edgeEls.forEach((el) => el.remove());
      nodeEls.forEach((el) => el.remove());
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      style={{ width: "100%", height: "100%", minHeight: 400, overflow: "visible" }}
      xmlns="http://www.w3.org/2000/svg"
    />
  );
}
