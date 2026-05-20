import { describe, expect, it } from "vitest";

import { PRICE_AREAS } from "@/shared/lib/areas";

import { ALL_AREAS, AREA_META } from "./areaMeta";

describe("AREA_META", () => {
  it("covers every price area exactly once", () => {
    expect(Object.keys(AREA_META).sort()).toEqual([...PRICE_AREAS].sort());
  });

  it("ALL_AREAS lists the same entries", () => {
    expect(ALL_AREAS).toHaveLength(PRICE_AREAS.length);
  });
});
