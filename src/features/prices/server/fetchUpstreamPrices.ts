import type { PriceArea } from "@/shared/lib/areas";

import type { ElectricityPrice } from "../types";

const UPSTREAM_BASE = "https://www.hvakosterstrommen.no/api/v1/prices";

export class PricesUnavailableError extends Error {
  constructor(area: PriceArea, date: string) {
    super(`Prices unavailable for ${area} on ${date}`);
    this.name = "PricesUnavailableError";
  }
}

export const fetchUpstreamPrices = async (
  area: PriceArea,
  year: string,
  monthDay: string,
): Promise<ElectricityPrice[]> => {
  const url = `${UPSTREAM_BASE}/${year}/${monthDay}_${area}.json`;
  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (res.status === 404) {
    throw new PricesUnavailableError(area, `${year}-${monthDay}`);
  }

  if (!res.ok) {
    throw new Error(`Upstream returned ${res.status}`);
  }

  return (await res.json()) as ElectricityPrice[];
};
