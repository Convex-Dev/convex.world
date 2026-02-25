import { describe, it, expect } from "vitest";
import superpowers from "./superpowers.json";
import { getSuperpowerMetadata, getSuperpowerPage, buildHeroTitle } from "./superpower-metadata";

/** All hrefs that have a `page` block in superpowers.json */
const pageHrefs = superpowers
  .filter((sp) => "page" in sp && sp.page)
  .map((sp) => sp.href);

describe("superpowers.json integrity", () => {
  it("has at least 18 entries", () => {
    expect(superpowers.length).toBeGreaterThanOrEqual(18);
  });

  it("every entry has title, desc, href, category, icon", () => {
    for (const sp of superpowers) {
      expect(sp.title, `entry missing title`).toBeTruthy();
      expect(sp.desc, `${sp.title} missing desc`).toBeTruthy();
      expect(sp.href, `${sp.title} missing href`).toBeTruthy();
      expect(sp.category, `${sp.title} missing category`).toBeTruthy();
      expect(sp.icon, `${sp.title} missing icon`).toBeTruthy();
    }
  });

  it("has no duplicate hrefs", () => {
    const hrefs = superpowers.map((sp) => sp.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe("getSuperpowerMetadata", () => {
  it.each(pageHrefs)("returns metadata for %s", (href) => {
    const meta = getSuperpowerMetadata(href);
    expect(meta.title).toBeTruthy();
    expect(meta.description).toBeTruthy();
  });

  it("throws for unknown href", () => {
    expect(() => getSuperpowerMetadata("/nonexistent")).toThrow();
  });
});

describe("getSuperpowerPage", () => {
  it.each(pageHrefs)("returns page data for %s", (href) => {
    const page = getSuperpowerPage(href);
    expect(page.tag).toBeTruthy();
    expect(page.heroTitle).toBeTruthy();
    expect(page.description).toBeTruthy();
    expect(page.highlights.length).toBeGreaterThan(0);
  });

  it("throws for unknown href", () => {
    expect(() => getSuperpowerPage("/nonexistent")).toThrow();
  });

  it("docs entries have label and href when present", () => {
    for (const href of pageHrefs) {
      const page = getSuperpowerPage(href);
      if (page.docs) {
        for (const doc of page.docs) {
          expect(doc.label, `doc in ${href} missing label`).toBeTruthy();
          expect(doc.href, `doc in ${href} missing href`).toBeTruthy();
        }
      }
    }
  });
});

describe("buildHeroTitle", () => {
  it("returns plain string when no accent", () => {
    const result = buildHeroTitle({
      tag: "T",
      heroTitle: "Hello",
      description: "D",
      highlights: [],
    });
    expect(result).toBe("Hello");
  });

  it("returns JSX when accent is present", () => {
    const result = buildHeroTitle({
      tag: "T",
      heroTitle: "Hello",
      heroAccent: "World",
      description: "D",
      highlights: [],
    });
    expect(result).not.toBe("Hello");
    expect(typeof result).toBe("object");
  });
});
