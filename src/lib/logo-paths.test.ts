import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { LOGO_PATHS, LOGO_VIEWBOX, MARK_PATHS, MARK_VIEWBOX } from "./logo-paths";

const BRAND = path.resolve(__dirname, "../../public/brand");

function readSvg(name: string) {
  const text = readFileSync(path.join(BRAND, name), "utf8");
  return {
    viewBox: text.match(/viewBox="([^"]*)"/)?.[1],
    paths: [...text.matchAll(/<path d="([^"]*)"/g)].map((m) => m[1]),
  };
}

// The inline Logo component and the downloadable files must draw the same logo.
describe("logo path data", () => {
  it.each(["convex-logo-dark-blue.svg", "convex-logo-white.svg"])("matches %s", (name) => {
    const svg = readSvg(name);
    expect(svg.viewBox).toBe(LOGO_VIEWBOX);
    expect(svg.paths).toEqual(LOGO_PATHS);
  });

  it.each(["convex-mark-dark-blue.svg", "convex-mark-white.svg"])("matches %s", (name) => {
    const svg = readSvg(name);
    expect(svg.viewBox).toBe(MARK_VIEWBOX);
    expect(svg.paths).toEqual(MARK_PATHS);
  });
});
