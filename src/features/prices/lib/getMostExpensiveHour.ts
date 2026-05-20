import type { ElectricityPrice } from "../types";

export const getMostExpensiveHour = (
  prices: ElectricityPrice[],
): ElectricityPrice | null => {
  if (prices.length === 0) return null;
  return prices.reduce((peak, p) =>
    p.NOK_per_kWh > peak.NOK_per_kWh ? p : peak,
  );
};
