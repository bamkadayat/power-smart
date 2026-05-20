import { describe, expect, it } from "vitest";

import { mockPrices } from "./_fixtures";
import { getCurrentPrice } from "./getCurrentPrice";

describe("getCurrentPrice", () => {
  const prices = mockPrices([1, 2, 3, 4], "2026-05-20T00:00:00+02:00");

  it("returns the hour containing the given instant", () => {
    const at0230 = new Date("2026-05-20T02:30:00+02:00");
    expect(getCurrentPrice(prices, at0230)?.NOK_per_kWh).toBe(3);
  });

  it("treats the start as inclusive and end as exclusive", () => {
    const atStart = new Date("2026-05-20T01:00:00+02:00");
    expect(getCurrentPrice(prices, atStart)?.NOK_per_kWh).toBe(2);
  });

  it("returns null when no hour matches", () => {
    const future = new Date("2030-01-01T00:00:00+02:00");
    expect(getCurrentPrice(prices, future)).toBeNull();
  });

  it("returns null for empty input", () => {
    expect(getCurrentPrice([])).toBeNull();
  });
});
