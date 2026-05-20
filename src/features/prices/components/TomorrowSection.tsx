"use client";

import { findCheapestWindow } from "@/shared/lib/findCheapestWindow";
import { formatHourFromIso, osloTomorrowDateString } from "@/shared/lib/date";
import { formatPrice } from "@/shared/lib/price";
import type { PriceArea } from "@/shared/lib/areas";

import { usePrices } from "../client/usePrices";
import { getAveragePrice } from "../lib/getAveragePrice";
import { getMostExpensiveHour } from "../lib/getMostExpensiveHour";
import type { ElectricityPrice } from "../types";

import { PriceChart } from "./PriceChart";
import { WindowCard } from "./WindowCard";

type Props = {
  area: PriceArea;
  todayPrices?: ElectricityPrice[];
};

const SectionHeader = () => (
  <header className="flex items-baseline justify-between gap-4">
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Forecast
      </p>
      <h2 className="text-2xl font-bold tracking-tight">Tomorrow</h2>
    </div>
    <p className="text-xs text-muted-foreground">
      published 13:00 CET · Nord Pool
    </p>
  </header>
);

const FallbackMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-4">
    <SectionHeader />
    <div className="rounded-lg border border-border bg-card p-6">
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  </div>
);

export const TomorrowSection = ({ area, todayPrices }: Props) => {
  const tomorrow = osloTomorrowDateString();
  const prices = usePrices(area, tomorrow);

  if (prices.status === "loading") {
    return <FallbackMessage>Checking tomorrow&apos;s prices…</FallbackMessage>;
  }
  if (prices.status === "error" || prices.status === "idle") {
    return (
      <FallbackMessage>
        Tomorrow&apos;s prices are normally available after 13:00 Europe/Oslo.
      </FallbackMessage>
    );
  }

  const tomorrowPrices = prices.prices;
  const avgTomorrow = getAveragePrice(tomorrowPrices);
  const cheapest3h = findCheapestWindow(tomorrowPrices, 3);
  const peak = getMostExpensiveHour(tomorrowPrices);

  const avgToday = todayPrices ? getAveragePrice(todayPrices) : null;
  const pctChange =
    avgToday && avgToday > 0
      ? ((avgTomorrow - avgToday) / avgToday) * 100
      : null;

  return (
    <div className="space-y-4">
      <SectionHeader />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Tomorrow&apos;s curve
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums">
                avg {avgTomorrow.toFixed(2)}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  NOK/kWh
                </span>
              </p>
            </div>
            {pctChange !== null && (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium tabular-nums">
                <span aria-hidden="true">{pctChange >= 0 ? "▲" : "▼"}</span>
                {Math.abs(pctChange).toFixed(0)}% vs. today
              </span>
            )}
          </div>
          <div className="mt-4">
            <PriceChart prices={tomorrowPrices} />
          </div>
        </div>

        <div className="space-y-4">
          {cheapest3h && (
            <WindowCard
              variant="cheap"
              label="Cheapest 3h window"
              value={`${formatHourFromIso(cheapest3h.start)}–${formatHourFromIso(cheapest3h.end)}`}
              detail={`avg ${formatPrice(cheapest3h.averagePrice)} · best for heavy appliances`}
            />
          )}
          {peak && (
            <WindowCard
              variant="peak"
              label="Peak hour"
              value={`${formatHourFromIso(peak.time_start)}–${formatHourFromIso(peak.time_end)}`}
              detail={`${formatPrice(peak.NOK_per_kWh)} · avoid running heavy loads`}
            />
          )}
        </div>
      </div>
    </div>
  );
};
