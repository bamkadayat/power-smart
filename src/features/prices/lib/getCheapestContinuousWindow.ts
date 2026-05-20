import type { ElectricityPrice } from "../types";

export type PriceWindow = {
  start: string;
  end: string;
  averagePrice: number;
  hours: ElectricityPrice[];
};

export const getCheapestContinuousWindow = (
  prices: ElectricityPrice[],
  durationHours: number,
): PriceWindow | null => {
  if (durationHours <= 0 || prices.length < durationHours) return null;

  let bestStart = 0;
  let bestSum = Infinity;

  for (let start = 0; start <= prices.length - durationHours; start++) {
    let sum = 0;
    for (let i = 0; i < durationHours; i++) {
      sum += prices[start + i].NOK_per_kWh;
    }
    if (sum < bestSum) {
      bestSum = sum;
      bestStart = start;
    }
  }

  const hours = prices.slice(bestStart, bestStart + durationHours);
  return {
    start: hours[0].time_start,
    end: hours[hours.length - 1].time_end,
    averagePrice: bestSum / durationHours,
    hours,
  };
};
