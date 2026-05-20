import type { PriceArea } from "@/shared/lib/areas";

import type { AreaMeta } from "../types";

export const AREA_META: Record<PriceArea, AreaMeta> = {
  NO1: { code: "NO1", city: "Oslo", region: "East Norway" },
  NO2: { code: "NO2", city: "Kristiansand", region: "South Norway" },
  NO3: { code: "NO3", city: "Trondheim", region: "Central Norway" },
  NO4: { code: "NO4", city: "Tromsø", region: "North Norway" },
  NO5: { code: "NO5", city: "Bergen", region: "West Norway" },
};

export const ALL_AREAS: AreaMeta[] = Object.values(AREA_META);
