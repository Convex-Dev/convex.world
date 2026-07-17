import { describe, expect, it } from "vitest";
import { parseStoredWalletKeys } from "./wallet-storage";

describe("parseStoredWalletKeys", () => {
  it("parses a stored public-key to seed map", () => {
    expect(parseStoredWalletKeys('{"abc":"def"}')).toEqual({ abc: "def" });
  });

  it.each([null, "", "not json", "null", "[]", '{"abc":42}'])(
    "rejects invalid wallet data: %s",
    (raw) => {
      expect(parseStoredWalletKeys(raw)).toBeNull();
    },
  );

  it("accepts an empty wallet", () => {
    expect(parseStoredWalletKeys("{}")).toEqual({});
  });
});
