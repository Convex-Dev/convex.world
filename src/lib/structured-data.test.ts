import { describe, it, expect } from "vitest";
import { resolveTitle, buildSchema } from "./structured-data";

describe("resolveTitle", () => {
  it("returns 'Convex' for null/undefined", () => {
    expect(resolveTitle(null)).toBe("Convex");
    expect(resolveTitle(undefined)).toBe("Convex");
  });

  it("returns a plain string as-is", () => {
    expect(resolveTitle("My Page")).toBe("My Page");
  });

  it("extracts default from title object", () => {
    expect(resolveTitle({ default: "Foo", template: "%s | Bar" })).toBe("Foo");
  });

  it("extracts absolute from title object", () => {
    expect(resolveTitle({ absolute: "Exact Title" })).toBe("Exact Title");
  });
});

describe("buildSchema", () => {
  const metadata = { title: "Test Page", description: "A test" };

  it("includes required JSON-LD fields", () => {
    const schema = buildSchema("WebPage", metadata, "/test/");
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("WebPage");
    expect(schema.name).toBe("Test Page");
    expect(schema.description).toBe("A test");
    expect(schema.url).toBe("https://convex.world/test/");
  });

  it("WebSite type includes potentialAction", () => {
    const schema = buildSchema("WebSite", metadata, "/");
    expect(schema.potentialAction).toBeDefined();
  });

  it("WebApplication type includes applicationCategory", () => {
    const schema = buildSchema("WebApplication", metadata, "/sandbox/");
    expect(schema.applicationCategory).toBe("DeveloperApplication");
  });

  it("always includes publisher", () => {
    const schema = buildSchema("WebPage", metadata, "/");
    expect(schema.publisher).toBeDefined();
  });
});
