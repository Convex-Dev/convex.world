import { describe, it, expect } from "vitest";
import redirects from "./redirects";

describe("redirects", () => {
  it("has at least 10 entries", () => {
    expect(Object.keys(redirects).length).toBeGreaterThanOrEqual(10);
  });

  it("every key starts with /", () => {
    for (const key of Object.keys(redirects)) {
      expect(key, `key "${key}" should start with /`).toMatch(/^\//);
    }
  });

  it("every value is a URL or internal path", () => {
    for (const [key, value] of Object.entries(redirects)) {
      expect(
        value.startsWith("/") || value.startsWith("https://"),
        `redirect "${key}" → "${value}" is not a valid target`,
      ).toBe(true);
    }
  });

  it("no redirect loops (key !== value)", () => {
    for (const [key, value] of Object.entries(redirects)) {
      expect(value, `"${key}" redirects to itself`).not.toBe(key);
    }
  });
});
