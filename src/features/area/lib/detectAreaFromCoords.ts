import type { PriceArea } from "@/shared/lib/areas";

/**
 * Best-effort price-area detection from coordinates.
 * Returns null outside Norway's rough bounding box. Coarse near boundaries —
 * UI always keeps a manual selector visible so the user can correct.
 */
export const detectAreaFromCoords = (
  lat: number,
  lon: number,
): PriceArea | null => {
  if (lat < 57.8 || lat > 71.5) return null;
  if (lon < 4 || lon > 31.5) return null;

  if (lat >= 65) return "NO4";
  if (lat >= 62.5) return "NO3";
  if (lon < 7) return "NO5";
  if (lat < 59.5 && lon < 10) return "NO2";
  return "NO1";
};
