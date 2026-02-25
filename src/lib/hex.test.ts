import { describe, it, expect } from "vitest";
import { hexPath, axialToPixel, hexBounds, SUPERPOWER_HEXES } from "./hex";

describe("hexPath", () => {
  it("returns a closed SVG path", () => {
    const path = hexPath(50);
    expect(path).toMatch(/^M /);
    expect(path).toMatch(/ Z$/);
  });

  it("contains 6 vertices (1 M + 5 L)", () => {
    const path = hexPath(50);
    expect(path.match(/[ML]/g)).toHaveLength(6);
  });
});

describe("axialToPixel", () => {
  it("returns origin for (0, 0)", () => {
    const { x, y } = axialToPixel(0, 0, 50, 0);
    expect(x).toBe(0);
    expect(y).toBe(0);
  });

  it("scales with size", () => {
    const small = axialToPixel(1, 0, 10, 0);
    const large = axialToPixel(1, 0, 100, 0);
    expect(large.x / small.x).toBeCloseTo(10);
  });

  it("gap increases spacing", () => {
    const tight = axialToPixel(1, 0, 50, 0);
    const loose = axialToPixel(1, 0, 50, 0.1);
    expect(loose.x).toBeGreaterThan(tight.x);
  });
});

describe("hexBounds", () => {
  it("returns correct bounds for a single position at origin", () => {
    const bounds = hexBounds([{ x: 0, y: 0 }], 50);
    expect(bounds.minX).toBeLessThan(0);
    expect(bounds.maxX).toBeGreaterThan(0);
    expect(bounds.minY).toBeLessThan(0);
    expect(bounds.maxY).toBeGreaterThan(0);
  });

  it("expands with more positions", () => {
    const single = hexBounds([{ x: 0, y: 0 }], 50);
    const multi = hexBounds([{ x: -100, y: 0 }, { x: 100, y: 0 }], 50);
    expect(multi.maxX - multi.minX).toBeGreaterThan(single.maxX - single.minX);
  });
});

describe("SUPERPOWER_HEXES", () => {
  it("has 9 entries", () => {
    expect(Object.keys(SUPERPOWER_HEXES)).toHaveLength(9);
  });

  it("every entry has title, desc, href, order", () => {
    for (const [key, def] of Object.entries(SUPERPOWER_HEXES)) {
      expect(def.title, `${key} missing title`).toBeTruthy();
      expect(def.desc, `${key} missing desc`).toBeTruthy();
      expect(def.href, `${key} missing href`).toBeTruthy();
      expect(typeof def.order, `${key} order not number`).toBe("number");
    }
  });
});
