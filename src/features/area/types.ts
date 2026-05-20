import type { PriceArea } from "@/shared/lib/areas";

export type AreaMeta = {
  code: PriceArea;
  city: string;
  region: string;
};

export type AreaDetection = {
  area: PriceArea;
  confidence: "high" | "low";
};
