import { describe, expect, it } from "vitest";

import { formatPrice } from "./price";

describe("formatPrice", () => {
  it("formats to two decimals with NOK suffix", () => {
    expect(formatPrice(1.05)).toBe("1.05 NOK");
    expect(formatPrice(0.43213)).toBe("0.43 NOK");
  });

  it("rounds to two decimals", () => {
    expect(formatPrice(1.235)).toBe("1.24 NOK");
  });

  it("handles zero", () => {
    expect(formatPrice(0)).toBe("0.00 NOK");
  });
});
