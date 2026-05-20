import { formatHourFromIso } from "@/shared/lib/date";
import { formatPrice } from "@/shared/lib/price";
import { cn } from "@/shared/lib/cn";

import type { ElectricityPrice } from "../types";

type Props = {
  prices: ElectricityPrice[];
  now?: Date;
  className?: string;
};

type BarKind = "cheap" | "expensive" | "normal";

const BAR_BG: Record<BarKind, string> = {
  cheap: "bg-chart-cheap",
  expensive: "bg-chart-expensive",
  normal: "bg-chart-normal",
};

const KIND_LABEL: Record<BarKind, string> = {
  cheap: "cheap",
  expensive: "expensive",
  normal: "normal",
};

const quartile = (sorted: number[], q: number): number => {
  const index = Math.min(
    sorted.length - 1,
    Math.max(0, Math.floor(sorted.length * q)),
  );
  return sorted[index];
};

export const PriceChart = ({ prices, now = new Date(), className }: Props) => {
  if (prices.length === 0) return null;

  const values = prices.map((p) => p.NOK_per_kWh);
  const max = Math.max(...values);
  const sorted = [...values].sort((a, b) => a - b);
  const lowCut = quartile(sorted, 0.25);
  const highCut = quartile(sorted, 0.75);
  const absMin = sorted[0];
  const absMax = sorted[sorted.length - 1];
  const nowMs = now.getTime();

  return (
    <figure
      aria-label="Hourly electricity prices"
      className={cn("transition-opacity duration-300", className)}
    >
      <figcaption className="sr-only">
        Bar chart of hourly spot prices. Cheap hours are highlighted in mint,
        peak hours in dark navy.
      </figcaption>
      <div className="flex h-40 items-end gap-[2px] sm:gap-1" role="list">
        {prices.map((p, index) => {
          const kind: BarKind =
            p.NOK_per_kWh <= lowCut
              ? "cheap"
              : p.NOK_per_kWh >= highCut
                ? "expensive"
                : "normal";

          const isAbsoluteCheapest = p.NOK_per_kWh === absMin;
          const isAbsolutePeak = p.NOK_per_kWh === absMax;
          const start = new Date(p.time_start).getTime();
          const end = new Date(p.time_end).getTime();
          const isCurrent = start <= nowMs && nowMs < end;

          const hour = formatHourFromIso(p.time_start);
          const label = `${hour}, ${formatPrice(p.NOK_per_kWh)}, ${KIND_LABEL[kind]}${
            isAbsoluteCheapest ? ", cheapest hour" : ""
          }${isAbsolutePeak ? ", peak hour" : ""}${
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
                className="text-xs font-semibold leading-none text-muted-foreground"
              >
                {isAbsoluteCheapest ? "↓" : isAbsolutePeak ? "↑" : ""}
              </span>
              <div
                className={cn(
                  "bar-grow w-full rounded-t transition-all duration-500 ease-out",
                  BAR_BG[kind],
                  isCurrent &&
                    "outline outline-2 outline-offset-1 outline-foreground",
                )}
                style={{
                  height: `${(p.NOK_per_kWh / max) * 100}%`,
                  animationDelay: `${index * 20}ms`,
                }}
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
