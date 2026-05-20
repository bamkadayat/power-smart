import { describe, expect, it } from "vitest";

import { mockPrices } from "./_fixtures";
import { getAveragePrice } from "./getAveragePrice";

describe("getAveragePrice", () => {
  it("returns the mean of NOK_per_kWh", () => {
    expect(getAveragePrice(mockPrices([1, 2, 3, 4]))).toBe(2.5);
  });

  it("returns 0 for empty input", () => {
    expect(getAveragePrice([])).toBe(0);
  });
});
