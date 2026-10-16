import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { logoAssets, brandColors } from "./brand-assets";
import { ORGANIZATION_LOGO } from "@/lib/structured-data";

const PUBLIC = path.resolve(__dirname, "../../public");
const publicFile = (urlPath: string) => path.join(PUBLIC, urlPath);

function pngSize(urlPath: string) {
  const buf = readFileSync(publicFile(urlPath));
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

describe("logo assets", () => {
  it("lists at least the dark, light and colour logos", () => {
    expect(logoAssets.length).toBeGreaterThanOrEqual(3);
    expect(logoAssets.some((a) => a.background === "light")).toBe(true);
    expect(logoAssets.some((a) => a.background === "dark")).toBe(true);
  });

  it("has unique names", () => {
    const names = logoAssets.map((a) => a.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it.each(logoAssets.map((a) => [a.name, a] as const))("%s files are in public/brand/", (_, asset) => {
    expect(asset.svg).toMatch(/^\/brand\/[a-z0-9-]+\.svg$/);
    expect(asset.png).toBe(asset.svg.replace(/\.svg$/, ".png"));
    expect(existsSync(publicFile(asset.svg))).toBe(true);
    expect(existsSync(publicFile(asset.png))).toBe(true);
  });
});

describe("brand colours", () => {
  it("are six-digit hex values", () => {
    for (const colour of brandColors) {
      expect(colour.hex).toMatch(/^#[0-9A-F]{6}$/);
    }
  });
});

describe("site icons and share image", () => {
  it("social card is a 1200×630 PNG", () => {
    expect(pngSize("/brand/social-card.png")).toEqual({ width: 1200, height: 630 });
  });

  it("organisation logo is a PNG in public/brand/", () => {
    const urlPath = new URL(ORGANIZATION_LOGO).pathname;
    expect(urlPath).toMatch(/^\/brand\/.+\.png$/);
    expect(existsSync(publicFile(urlPath))).toBe(true);
  });

  const manifest = JSON.parse(readFileSync(publicFile("/manifest.json"), "utf8")) as {
    icons: { src: string; sizes: string; type: string }[];
  };

  // /favicon.ico is served from the src/app/favicon.ico file convention, not public/.
  const APP = path.resolve(__dirname, "../app");

  it.each(manifest.icons.map((i) => [i.src, i] as const))("manifest icon %s exists at its stated size", (src, icon) => {
    expect([publicFile(src), path.join(APP, src)].some((file) => existsSync(file))).toBe(true);
    if (icon.type === "image/png") {
      const [width, height] = icon.sizes.split("x").map(Number);
      expect(pngSize(src)).toEqual({ width, height });
    }
  });

  it("apple touch icon is 180×180", () => {
    expect(pngSize("/brand/apple-touch-icon.png")).toEqual({ width: 180, height: 180 });
  });
});
