import { describe, expect, it } from "vitest";

import {
  formatHourFromIso,
  formatOsloDate,
  formatOsloDateLong,
  osloDateString,
  osloTomorrowDateString,
} from "./date";

describe("formatOsloDate", () => {
  it("returns YYYY/MM/DD parts for a known instant in Europe/Oslo time", () => {
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

describe("osloTomorrowDateString", () => {
  it("returns the next calendar day in Oslo", () => {
    expect(osloTomorrowDateString(new Date("2026-05-20T12:00:00Z"))).toBe(
      "2026-05-21",
    );
  });

  it("crosses month boundaries", () => {
    expect(osloTomorrowDateString(new Date("2026-05-31T12:00:00Z"))).toBe(
      "2026-06-01",
    );
  });
});

describe("formatHourFromIso", () => {
  it("extracts HH:mm from a full ISO timestamp", () => {
    expect(formatHourFromIso("2026-05-20T14:00:00+02:00")).toBe("14:00");
    expect(formatHourFromIso("2026-05-20T00:00:00+02:00")).toBe("00:00");
  });
});

describe("formatOsloDateLong", () => {
  it("includes weekday, day, and month for a known date in Europe/Oslo", () => {
    // 2026-05-20T10:00:00Z = Wed 12:00 CEST in Oslo
    const result = formatOsloDateLong(new Date("2026-05-20T10:00:00Z"));
    expect(result).toMatch(/Wed/);
    expect(result).toMatch(/20/);
    expect(result).toMatch(/May/);
  });
});
