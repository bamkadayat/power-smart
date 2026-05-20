import type { ElectricityPrice } from "../types";

export const getAveragePrice = (prices: ElectricityPrice[]): number => {
  if (prices.length === 0) return 0;
  const total = prices.reduce((sum, p) => sum + p.NOK_per_kWh, 0);
  return total / prices.length;
};
