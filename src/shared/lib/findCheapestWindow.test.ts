import { describe, expect, it } from "vitest";

import { findCheapestWindow, type PriceLike } from "./findCheapestWindow";

const makePrices = (values: number[]): PriceLike[] =>
  values.map((nok, hour) => ({
    NOK_per_kWh: nok,
    time_start: `2026-05-20T${String(hour).padStart(2, "0")}:00:00Z`,
    time_end: `2026-05-20T${String(hour + 1).padStart(2, "0")}:00:00Z`,
  }));

describe("findCheapestWindow", () => {
  it("finds the cheapest contiguous run", () => {
    const result = findCheapestWindow(makePrices([5, 3, 1, 2, 4]), 2);
    expect(result?.hours.map((h) => h.NOK_per_kWh)).toEqual([1, 2]);
    expect(result?.averagePrice).toBe(1.5);
  });

  it("returns null when duration exceeds available data", () => {
    expect(findCheapestWindow(makePrices([1, 2]), 4)).toBeNull();
  });

  it("returns null for zero or negative duration", () => {
    expect(findCheapestWindow(makePrices([1, 2]), 0)).toBeNull();
    expect(findCheapestWindow(makePrices([1, 2]), -1)).toBeNull();
  });

  it("returns null for empty input", () => {
    expect(findCheapestWindow([], 2)).toBeNull();
  });

  it("returns the only window when input length equals duration", () => {
    const result = findCheapestWindow(makePrices([2, 4]), 2);
    expect(result?.averagePrice).toBe(3);
  });

  it("preserves the input element type via generics", () => {
    type Extended = PriceLike & { id: string };
    const prices: Extended[] = makePrices([3, 1, 2]).map((p, i) => ({
      ...p,
      id: `h${i}`,
    }));
    const result = findCheapestWindow(prices, 2);
    expect(result?.hours[0].id).toBe("h1");
  });
});
