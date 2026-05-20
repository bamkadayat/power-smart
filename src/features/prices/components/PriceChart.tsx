import { formatHourFromIso } from "@/shared/lib/date";
import { formatPrice } from "@/shared/lib/price";
import { cn } from "@/shared/lib/cn";

import type { ElectricityPrice } from "../types";

type Props = {
  prices: ElectricityPrice[];
  now?: Date;
};

type BarKind = "cheap" | "expensive" | "normal";

const SYMBOL: Record<BarKind, string> = {
  cheap: "↓",
  expensive: "↑",
  normal: "",
};

const BAR_BG: Record<BarKind, string> = {
  cheap: "bg-chart-cheap",
  expensive: "bg-chart-expensive",
  normal: "bg-chart-normal",
};

export const PriceChart = ({ prices, now = new Date() }: Props) => {
  if (prices.length === 0) return null;

  const max = Math.max(...prices.map((p) => p.NOK_per_kWh));
  const minPrice = Math.min(...prices.map((p) => p.NOK_per_kWh));
  const maxPrice = max;
  const nowMs = now.getTime();

  return (
    <figure aria-label="Hourly electricity prices for today">
      <figcaption className="sr-only">
        Bar chart of hourly spot prices. Cheapest hour marked with a down arrow,
        most expensive with an up arrow.
      </figcaption>
      <div className="flex h-48 items-end gap-[2px] sm:gap-1" role="list">
        {prices.map((p) => {
          const isCheapest = p.NOK_per_kWh === minPrice;
          const isExpensive = p.NOK_per_kWh === maxPrice;
          const kind: BarKind = isCheapest
            ? "cheap"
            : isExpensive
              ? "expensive"
              : "normal";

          const start = new Date(p.time_start).getTime();
          const end = new Date(p.time_end).getTime();
          const isCurrent = start <= nowMs && nowMs < end;

          const hour = formatHourFromIso(p.time_start);
          const label = `${hour}, ${formatPrice(p.NOK_per_kWh)}${
            isCheapest ? ", cheapest hour" : ""
          }${isExpensive ? ", most expensive hour" : ""}${
            isCurrent ? ", current hour" : ""
          }`;

          return (
            <div
              key={p.time_start}
              role="listitem"
              aria-label={label}
              className="flex h-full flex-1 flex-col items-center justify-end gap-1"
            >
              <span
                aria-hidden="true"
                className="text-xs font-semibold leading-none"
              >
                {SYMBOL[kind]}
              </span>
              <div
                className={cn(
                  "w-full rounded-t transition-colors",
                  BAR_BG[kind],
                  isCurrent &&
                    "outline outline-2 outline-offset-1 outline-foreground",
                )}
                style={{ height: `${(p.NOK_per_kWh / max) * 100}%` }}
              />
            </div>
          );
        })}
      </div>
      <div
        aria-hidden="true"
        className="mt-2 flex justify-between text-xs text-muted-foreground tabular-nums"
      >
        <span>00</span>
        <span>06</span>
        <span>12</span>
        <span>18</span>
        <span>23</span>
      </div>
    </figure>
  );
};
