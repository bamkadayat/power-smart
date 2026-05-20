import { describe, expect, it } from "vitest";

import { mockPrices } from "./_fixtures";
import { getMostExpensiveHour } from "./getMostExpensiveHour";

describe("getMostExpensiveHour", () => {
  it("returns the entry with the highest NOK_per_kWh", () => {
    const prices = mockPrices([3, 1, 5, 4]);
    expect(getMostExpensiveHour(prices)?.NOK_per_kWh).toBe(5);
  });

  it("returns null for empty input", () => {
    expect(getMostExpensiveHour([])).toBeNull();
  });
});
