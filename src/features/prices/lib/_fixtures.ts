import type { ElectricityPrice } from "../types";

const HOUR_MS = 3_600_000;

export const mockPrices = (
  nokPerHour: number[],
  startIso = "2026-05-20T00:00:00+02:00",
): ElectricityPrice[] => {
  const base = new Date(startIso).getTime();
  return nokPerHour.map((nok, hour) => ({
    NOK_per_kWh: nok,
    EUR_per_kWh: Number((nok / 11).toFixed(5)),
    EXR: 11,
    time_start: new Date(base + hour * HOUR_MS).toISOString(),
    time_end: new Date(base + (hour + 1) * HOUR_MS).toISOString(),
  }));
};
