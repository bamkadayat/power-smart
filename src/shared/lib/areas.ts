export const PRICE_AREAS = ["NO1", "NO2", "NO3", "NO4", "NO5"] as const;

export type PriceArea = (typeof PRICE_AREAS)[number];

export const isPriceArea = (value: unknown): value is PriceArea =>
  typeof value === "string" && (PRICE_AREAS as readonly string[]).includes(value);
