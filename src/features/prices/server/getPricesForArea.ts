import "server-only";

import type { PriceArea } from "@/shared/lib/areas";

import type { ElectricityPrice } from "../types";
import { fetchUpstreamPrices } from "./fetchUpstreamPrices";
import { getFromCache, saveToCache } from "./pricesCache";

export type PricesSource = "cache" | "upstream";

export type PricesResult = {
  prices: ElectricityPrice[];
  source: PricesSource;
};

export const getPricesForArea = async (
  area: PriceArea,
  year: string,
  monthDay: string,
): Promise<PricesResult> => {
  const date = `${year}-${monthDay}`;

  try {
    const cached = await getFromCache(area, date);
    if (cached) return { prices: cached, source: "cache" };
  } catch (err) {
    console.warn("Turso cache read failed, falling back to upstream", err);
  }

  const prices = await fetchUpstreamPrices(area, year, monthDay);

  try {
    await saveToCache(area, date, prices);
  } catch (err) {
    console.warn("Turso cache write failed, continuing", err);
  }

  return { prices, source: "upstream" };
};
