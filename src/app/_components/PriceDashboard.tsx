"use client";

import { AREA_META, AreaPicker, useSelectedArea } from "@/features/area";
import {
  PriceChart,
  PriceChartSkeleton,
  PriceSummary,
  PriceSummarySkeleton,
  TomorrowSection,
  usePrices,
} from "@/features/prices";
import {
  RecommendationCards,
  RecommendationCardsSkeleton,
} from "@/features/recommendations";

export const PriceDashboard = () => {
  const { area } = useSelectedArea();
  const today = usePrices(area);

  const showSkeleton = area && today.status === "loading";
  const showData = area && today.status === "success";
  const showError = area && today.status === "error";

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
        <p className="text-sm text-foreground">{today.message}</p>
      )}

      {area && (showSkeleton || showData) && (
        <>
          <section
            id="today"
            aria-labelledby="today-heading"
            className="space-y-4 scroll-mt-20"
          >
            <h2 id="today-heading" className="text-xl font-semibold">
              Today — {AREA_META[area].code} {AREA_META[area].city}
            </h2>
            {showData ? (
              <>
                <PriceSummary prices={today.prices} />
                <PriceChart prices={today.prices} />
              </>
            ) : (
              <>
                <PriceSummarySkeleton />
                <PriceChartSkeleton />
              </>
            )}
          </section>

          <section aria-labelledby="recs-heading" className="space-y-4">
            <h2 id="recs-heading" className="text-xl font-semibold">
              Recommended times
            </h2>
            {showData ? (
              <RecommendationCards prices={today.prices} />
            ) : (
              <RecommendationCardsSkeleton />
            )}
          </section>

          <section id="tomorrow" className="scroll-mt-20">
            <TomorrowSection
              area={area}
              todayPrices={showData ? today.prices : undefined}
            />
          </section>
        </>
      )}
    </div>
  );
};
