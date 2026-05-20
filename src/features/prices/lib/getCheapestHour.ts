import type { ElectricityPrice } from "../types";

export const getCheapestHour = (
  prices: ElectricityPrice[],
): ElectricityPrice | null => {
  if (prices.length === 0) return null;
  return prices.reduce((cheapest, p) =>
    p.NOK_per_kWh < cheapest.NOK_per_kWh ? p : cheapest,
  );
};
