import { afterEach, describe, expect, it } from "vitest";

import {
  clearSelectedArea,
  loadSelectedArea,
  saveSelectedArea,
} from "./areaStorage";

afterEach(() => {
  window.localStorage.clear();
});

describe("areaStorage", () => {
  it("returns null when nothing is stored", () => {
    expect(loadSelectedArea()).toBeNull();
  });

  it("round-trips a saved area", () => {
    saveSelectedArea("NO5");
    expect(loadSelectedArea()).toBe("NO5");
  });

  it("ignores invalid stored values", () => {
    window.localStorage.setItem("powersmart.priceArea", "NO9");
    expect(loadSelectedArea()).toBeNull();
  });

  it("clears the stored area", () => {
    saveSelectedArea("NO1");
    clearSelectedArea();
    expect(loadSelectedArea()).toBeNull();
  });
});
