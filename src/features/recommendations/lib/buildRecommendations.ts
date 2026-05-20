import { findCheapestWindow } from "@/shared/lib/findCheapestWindow";

import type { PriceLike, Recommendation } from "../types";
import { APPLIANCE_KEYS, APPLIANCES } from "./appliances";

export const buildRecommendations = (
  prices: PriceLike[],
): Recommendation[] => {
  const results: Recommendation[] = [];

  for (const key of APPLIANCE_KEYS) {
    const { label, durationHours } = APPLIANCES[key];
    const window = findCheapestWindow(prices, durationHours);
    if (!window) continue;

    results.push({
      appliance: key,
      label,
      start: window.start,
      end: window.end,
      averagePrice: window.averagePrice,
    });
  }

  return results;
};
