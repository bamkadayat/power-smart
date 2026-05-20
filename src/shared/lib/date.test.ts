import { describe, expect, it } from "vitest";

import { formatOsloDate, osloDateString } from "./date";

describe("formatOsloDate", () => {
  it("returns YYYY/MM/DD parts for a known instant in Europe/Oslo time", () => {
    // 2026-05-20T22:00:00Z = 2026-05-21 00:00 in Oslo (CEST, +02:00)
    const parts = formatOsloDate(new Date("2026-05-20T22:00:00Z"));
    expect(parts).toEqual({ year: "2026", month: "05", day: "21" });
  });

  it("zero-pads month and day", () => {
    const parts = formatOsloDate(new Date("2026-01-05T12:00:00Z"));
    expect(parts.month).toBe("01");
    expect(parts.day).toBe("05");
  });
});

describe("osloDateString", () => {
  it("formats as YYYY-MM-DD", () => {
    expect(osloDateString(new Date("2026-05-20T12:00:00Z"))).toBe("2026-05-20");
  });
});
