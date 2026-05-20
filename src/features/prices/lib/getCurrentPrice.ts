import type { ElectricityPrice } from "../types";

export const getCurrentPrice = (
  prices: ElectricityPrice[],
  now: Date = new Date(),
): ElectricityPrice | null => {
  const t = now.getTime();
  for (const p of prices) {
    const start = new Date(p.time_start).getTime();
    const end = new Date(p.time_end).getTime();
    if (start <= t && t < end) return p;
  }
  return null;
};
