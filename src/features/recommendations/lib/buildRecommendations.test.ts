import { describe, expect, it } from "vitest";

import type { PriceLike } from "../types";
import { buildRecommendations } from "./buildRecommendations";

const makePrices = (values: number[]): PriceLike[] =>
  values.map((nok, hour) => ({
    NOK_per_kWh: nok,
    time_start: `2026-05-20T${String(hour).padStart(2, "0")}:00:00Z`,
    time_end: `2026-05-20T${String(hour + 1).padStart(2, "0")}:00:00Z`,
  }));

describe("buildRecommendations", () => {
  it("returns one recommendation per appliance when input is long enough", () => {
    const prices = makePrices(Array.from({ length: 24 }, (_, i) => i + 1));
    const recs = buildRecommendations(prices);
    expect(recs.map((r) => r.appliance)).toEqual([
      "washingMachine",
      "dishwasher",
      "evCharging",
      "heating",
    ]);
  });

  it("recommends the cheapest window for each appliance", () => {
    // Hours 4 and 5 are cheapest at 0.1 each
    const prices = makePrices([5, 5, 5, 5, 0.1, 0.1, 5, 5, 5, 5]);
    const recs = buildRecommendations(prices);
    const washer = recs.find((r) => r.appliance === "washingMachine");
    expect(washer?.averagePrice).toBeCloseTo(0.1);
  });

  it("omits appliances whose duration exceeds available data", () => {
    // Only 2 hours of data — EV (4h) and heating (3h) cannot fit
    const recs = buildRecommendations(makePrices([1, 2]));
    expect(recs.map((r) => r.appliance)).toEqual([
      "washingMachine",
      "dishwasher",
    ]);
  });

  it("returns an empty list for empty input", () => {
    expect(buildRecommendations([])).toEqual([]);
  });
});
