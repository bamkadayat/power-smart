export type ApplianceKey = "washingMachine" | "dishwasher" | "evCharging" | "heating";

export type PriceLike = {
  NOK_per_kWh: number;
  time_start: string;
  time_end: string;
};

export type Recommendation = {
  appliance: ApplianceKey;
  label: string;
  start: string;
  end: string;
  averagePrice: number;
};
