import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";

const entries = sitemap();

describe("sitemap", () => {
  it("returns at least 25 entries", () => {
    expect(entries.length).toBeGreaterThanOrEqual(25);
  });

  it("every entry has url, changeFrequency, and priority", () => {
    for (const entry of entries) {
      expect(entry.url).toBeTruthy();
      expect(entry.changeFrequency).toBeTruthy();
      expect(entry.priority).toBeGreaterThan(0);
    }
  });

  it("all URLs start with https://convex.world", () => {
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/convex\.world/);
    }
  });

  it("has no duplicate URLs", () => {
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  const requiredPages = ["/", "/vision", "/coin", "/developers", "/memory", "/tools", "/ecosystem"];
  it.each(requiredPages)("includes %s", (path) => {
    const url = path === "/" ? "https://convex.world" : `https://convex.world${path}`;
    expect(entries.some((e) => e.url === url)).toBe(true);
  });
});
