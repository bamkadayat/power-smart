import { describe, expect, it } from "vitest";

import { mockPrices } from "./_fixtures";
import { getCheapestHour } from "./getCheapestHour";

describe("getCheapestHour", () => {
  it("returns the entry with the lowest NOK_per_kWh", () => {
    const prices = mockPrices([3, 1, 2, 4]);
    expect(getCheapestHour(prices)?.NOK_per_kWh).toBe(1);
  });

  it("returns the first match on ties", () => {
    const prices = mockPrices([1, 1, 2]);
    expect(getCheapestHour(prices)?.time_start).toBe(prices[0].time_start);
  });

  it("returns null for empty input", () => {
    expect(getCheapestHour([])).toBeNull();
  });
});
