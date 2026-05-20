import { describe, expect, it } from "vitest";

import { mockPrices } from "./_fixtures";
import { getCheapestContinuousWindow } from "./getCheapestContinuousWindow";

describe("getCheapestContinuousWindow", () => {
  it("finds the cheapest 2-hour window", () => {
    // index:        0  1  2  3  4
    const prices = mockPrices([5, 3, 1, 2, 4]);
    const result = getCheapestContinuousWindow(prices, 2);
    expect(result?.hours).toHaveLength(2);
    expect(result?.hours[0].NOK_per_kWh).toBe(1);
    expect(result?.hours[1].NOK_per_kWh).toBe(2);
    expect(result?.averagePrice).toBe(1.5);
  });

  it("returns null when duration exceeds available data", () => {
    expect(getCheapestContinuousWindow(mockPrices([1, 2]), 4)).toBeNull();
  });

  it("returns null for non-positive duration", () => {
    expect(getCheapestContinuousWindow(mockPrices([1, 2]), 0)).toBeNull();
  });

  it("returns null for empty input", () => {
    expect(getCheapestContinuousWindow([], 2)).toBeNull();
  });

  it("returns the only window when input length equals duration", () => {
    const prices = mockPrices([2, 4]);
    const result = getCheapestContinuousWindow(prices, 2);
    expect(result?.hours).toHaveLength(2);
    expect(result?.averagePrice).toBe(3);
  });
});
