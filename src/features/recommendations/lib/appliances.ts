import type { ApplianceKey } from "../types";

export type ApplianceMeta = {
  label: string;
  durationHours: number;
};

export const APPLIANCES: Record<ApplianceKey, ApplianceMeta> = {
  washingMachine: { label: "Washing machine", durationHours: 2 },
  dishwasher: { label: "Dishwasher", durationHours: 2 },
  evCharging: { label: "EV charging", durationHours: 4 },
  heating: { label: "Heating", durationHours: 3 },
};

export const APPLIANCE_KEYS: ApplianceKey[] = Object.keys(
  APPLIANCES,
) as ApplianceKey[];
