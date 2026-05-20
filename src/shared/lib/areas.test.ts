import { describe, expect, it } from "vitest";

import { PRICE_AREAS, isPriceArea } from "./areas";

describe("isPriceArea", () => {
  it("accepts every valid Norwegian price area code", () => {
    for (const area of PRICE_AREAS) {
      expect(isPriceArea(area)).toBe(true);
    }
  });

  it("rejects unknown strings", () => {
    expect(isPriceArea("NO6")).toBe(false);
    expect(isPriceArea("oslo")).toBe(false);
  });

  it("rejects non-strings", () => {
    expect(isPriceArea(undefined)).toBe(false);
    expect(isPriceArea(1)).toBe(false);
    expect(isPriceArea(null)).toBe(false);
  });
});
