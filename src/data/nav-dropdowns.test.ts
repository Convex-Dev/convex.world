import { describe, it, expect } from "vitest";
import { navDropdowns } from "./nav-dropdowns";

describe("navDropdowns", () => {
  it("has 5 top-level dropdowns", () => {
    expect(navDropdowns).toHaveLength(5);
  });

  it("every dropdown has key, label, href, and sections", () => {
    for (const dd of navDropdowns) {
      expect(dd.key, "missing key").toBeTruthy();
      expect(dd.label, `${dd.key} missing label`).toBeTruthy();
      expect(dd.href, `${dd.key} missing href`).toBeTruthy();
      expect(dd.sections.length, `${dd.key} has no sections`).toBeGreaterThan(0);
    }
  });

  it("every item has label, href, and icon", () => {
    for (const dd of navDropdowns) {
      for (const section of dd.sections) {
        for (const item of section.items) {
          expect(item.label, `item missing label in ${dd.key}`).toBeTruthy();
          expect(item.href, `${item.label} missing href`).toBeTruthy();
          expect(item.icon, `${item.label} missing icon`).toBeTruthy();
        }
      }
    }
  });

  it("Innovation dropdown has infrastructure, economy, and platform sections", () => {
    const innovation = navDropdowns.find((dd) => dd.key === "innovation");
    expect(innovation).toBeDefined();
    const titles = innovation!.sections.map((s) => s.title);
    expect(titles).toContain("Core Infrastructure");
    expect(titles).toContain("Smart Economy");
    expect(titles).toContain("Platform");
  });

  it("internal hrefs start with /", () => {
    for (const dd of navDropdowns) {
      for (const section of dd.sections) {
        for (const item of section.items) {
          if (!item.external) {
            expect(item.href, `${item.label} should start with /`).toMatch(/^\//);
          }
        }
      }
    }
  });
});
