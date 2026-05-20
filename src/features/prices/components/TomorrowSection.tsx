"use client";

import { useState } from "react";

import { ErrorCard } from "@/shared/components/ErrorCard";
import { SectionHeader } from "@/shared/components/SectionHeader";
import type { PriceArea } from "@/shared/lib/areas";
import { formatHourFromIso, osloTomorrowDateString } from "@/shared/lib/date";
import { findCheapestWindow } from "@/shared/lib/findCheapestWindow";
import { formatPrice } from "@/shared/lib/price";
import { cn } from "@/shared/lib/cn";

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

const TomorrowHeader = () => (
  <SectionHeader
    label="Forecast"
    title="Tomorrow"
    titleId="tomorrow-heading"
    meta="published 13:00 CET · Nord Pool"
  />
);

export const TomorrowSection = ({ area, todayPrices }: Props) => {
  const tomorrow = osloTomorrowDateString();
  const { state, refetch } = usePrices(area, tomorrow);

  const [stablePrices, setStablePrices] = useState<ElectricityPrice[] | null>(
    null,
  );
  if (state.status === "success" && state.prices !== stablePrices) {
    setStablePrices(state.prices);
  }

  const displayPrices =
    state.status === "success" ? state.prices : stablePrices;
  const isRefetching = state.status === "loading" && !!displayPrices;
  const isInitialLoading = state.status === "loading" && !displayPrices;

  if (isInitialLoading) {
    return (
      <div className="space-y-4">
        <TomorrowHeader />
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Checking tomorrow&apos;s prices…
          </p>
        </div>
      </div>
    );
  }

  if ((state.status === "error" || state.status === "idle") && !displayPrices) {
    return (
      <div className="space-y-4">
        <TomorrowHeader />
        <ErrorCard
          title="Tomorrow's prices not yet available"
          message="Day-ahead prices are normally published around 13:00 Europe/Oslo. Check back then."
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!displayPrices) return null;

  const avgTomorrow = getAveragePrice(displayPrices);
  const cheapest3h = findCheapestWindow(displayPrices, 3);
  const peak = getMostExpensiveHour(displayPrices);

  const avgToday = todayPrices ? getAveragePrice(todayPrices) : null;
  const pctChange =
    avgToday && avgToday > 0
      ? ((avgTomorrow - avgToday) / avgToday) * 100
      : null;

  return (
    <div
      className={cn(
        "space-y-4 transition-opacity duration-300",
        isRefetching && "opacity-60",
      )}
    >
      <TomorrowHeader />

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
            <PriceChart prices={displayPrices} />
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
