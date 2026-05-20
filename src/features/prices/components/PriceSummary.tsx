import { formatHourFromIso } from "@/shared/lib/date";
import { formatPrice } from "@/shared/lib/price";

import { getAveragePrice } from "../lib/getAveragePrice";
import { getCheapestHour } from "../lib/getCheapestHour";
import { getCurrentPrice } from "../lib/getCurrentPrice";
import { getMostExpensiveHour } from "../lib/getMostExpensiveHour";
import type { ElectricityPrice } from "../types";

import { SummaryCard } from "./SummaryCard";

type Props = {
  prices: ElectricityPrice[];
  now?: Date;
};

const hourRange = (p: { time_start: string; time_end: string }) =>
  `${formatHourFromIso(p.time_start)}–${formatHourFromIso(p.time_end)}`;

export const PriceSummary = ({ prices, now }: Props) => {
  const current = getCurrentPrice(prices, now);
  const cheapest = getCheapestHour(prices);
  const peak = getMostExpensiveHour(prices);
  const average = getAveragePrice(prices);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <SummaryCard
        label="Current"
        value={current ? formatPrice(current.NOK_per_kWh) : "—"}
        detail={current ? hourRange(current) : undefined}
      />
      <SummaryCard
        label="Cheapest"
        value={cheapest ? formatPrice(cheapest.NOK_per_kWh) : "—"}
        detail={cheapest ? hourRange(cheapest) : undefined}
      />
      <SummaryCard
        label="Most expensive"
        value={peak ? formatPrice(peak.NOK_per_kWh) : "—"}
        detail={peak ? hourRange(peak) : undefined}
      />
      <SummaryCard label="Average" value={formatPrice(average)} />
    </div>
  );
};
