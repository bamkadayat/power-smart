import { describe, expect, it } from "vitest";

import { detectAreaFromCoords } from "./detectAreaFromCoords";

describe("detectAreaFromCoords", () => {
  it("maps Oslo to NO1", () => {
    expect(detectAreaFromCoords(59.91, 10.75)).toBe("NO1");
  });

  it("maps Kristiansand to NO2", () => {
    expect(detectAreaFromCoords(58.15, 8.0)).toBe("NO2");
  });

  it("maps Trondheim to NO3", () => {
    expect(detectAreaFromCoords(63.43, 10.4)).toBe("NO3");
  });

  it("maps Tromsø to NO4", () => {
    expect(detectAreaFromCoords(69.65, 18.95)).toBe("NO4");
  });

  it("maps Bergen to NO5", () => {
    expect(detectAreaFromCoords(60.39, 5.32)).toBe("NO5");
  });

  it("returns null for coordinates clearly outside Norway", () => {
    expect(detectAreaFromCoords(51.5, -0.13)).toBeNull(); // London
    expect(detectAreaFromCoords(40.71, -74.0)).toBeNull(); // New York
    expect(detectAreaFromCoords(0, 0)).toBeNull(); // Null Island
  });
});
