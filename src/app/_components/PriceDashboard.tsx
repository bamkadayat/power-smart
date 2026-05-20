"use client";

import { useState } from "react";

import { AREA_META, AreaPicker, useSelectedArea } from "@/features/area";
import {
  PriceChart,
  PriceChartSkeleton,
  PriceSummary,
  PriceSummarySkeleton,
  TomorrowSection,
  usePrices,
  type ElectricityPrice,
} from "@/features/prices";
import {
  RecommendationCards,
  RecommendationCardsSkeleton,
} from "@/features/recommendations";
import { ErrorCard } from "@/shared/components/ErrorCard";
import { SectionHeader } from "@/shared/components/SectionHeader";
import { formatOsloDateLong } from "@/shared/lib/date";

export const PriceDashboard = () => {
  const { area } = useSelectedArea();
  const { state: today, refetch: refetchToday } = usePrices(area);

  // Keep the last successful prices visible during a refetch so the chart
  // smoothly morphs into new values rather than flashing a skeleton.
  // (React 19 pattern: setState during render is idempotent and discarded
  // before commit if it doesn't change the value.)
  const [stableTodayPrices, setStableTodayPrices] =
    useState<ElectricityPrice[] | null>(null);
  if (
    today.status === "success" &&
    today.prices !== stableTodayPrices
  ) {
    setStableTodayPrices(today.prices);
  }

  const displayPrices =
    today.status === "success" ? today.prices : stableTodayPrices;

  const showError = area && today.status === "error";
  const showInitialLoading =
    area && today.status === "loading" && !displayPrices;
  const isRefetching =
    area && today.status === "loading" && !!displayPrices;
  const showData = area && !showError && !!displayPrices;

  return (
    <div className="space-y-10">
      <div id="area" className="scroll-mt-20">
        <AreaPicker />
      </div>

      <div role="status" aria-live="polite" className="sr-only">
        {today.status === "loading" && "Loading prices."}
        {today.status === "error" && today.message}
      </div>

      {!area && (
        <p className="text-sm text-muted-foreground">
          Pick an area to see today&apos;s electricity prices.
        </p>
      )}

      {showError && (
        <ErrorCard
          title="Couldn't load prices"
          message={today.message}
          onRetry={refetchToday}
        />
      )}

      {(showInitialLoading || showData) && area && (
        <>
          <section
            id="today"
            aria-labelledby="today-heading"
            className="space-y-4 scroll-mt-20"
          >
            <SectionHeader
              label="Today"
              title={`${AREA_META[area].code} · ${AREA_META[area].city}`}
              titleId="today-heading"
              meta={formatOsloDateLong()}
            />
            {showData ? (
              <>
                <PriceSummary prices={displayPrices} />
                <PriceChart
                  prices={displayPrices}
                  className={isRefetching ? "opacity-60" : undefined}
                />
              </>
            ) : (
              <>
                <PriceSummarySkeleton />
                <PriceChartSkeleton />
              </>
            )}
          </section>

          <section
            aria-labelledby="recs-heading"
            className="space-y-4"
          >
            <SectionHeader
              label="Recommendations"
              title="Run heavy loads here"
              titleId="recs-heading"
            />
            {showData ? (
              <div
                className={
                  isRefetching
                    ? "opacity-60 transition-opacity duration-300"
                    : "transition-opacity duration-300"
                }
              >
                <RecommendationCards prices={displayPrices} />
              </div>
            ) : (
              <RecommendationCardsSkeleton />
            )}
          </section>

          <section id="tomorrow" className="scroll-mt-20">
            <TomorrowSection
              area={area}
              todayPrices={showData ? displayPrices : undefined}
            />
          </section>
        </>
      )}
    </div>
  );
};
