import { describe, it, expect } from "vitest";
import { CONVEX_RELEASE_VERSION } from "./release";

describe("release", () => {
  it("is a plain x.y.z version without a v prefix", () => {
    expect(CONVEX_RELEASE_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
