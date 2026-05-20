"use client";

import { AreaPicker, useSelectedArea } from "@/features/area";
import { usePrices } from "@/features/prices/client/usePrices";

export const PriceDashboard = () => {
  const { area } = useSelectedArea();
  const prices = usePrices(area);

  return (
    <div className="space-y-6">
      <AreaPicker />

      <div role="status" aria-live="polite" className="text-sm">
        {prices.status === "idle" && (
          <p className="text-muted-foreground">
            Pick an area to see today&apos;s electricity prices.
          </p>
        )}
        {prices.status === "loading" && (
          <p className="text-muted-foreground">Loading prices…</p>
        )}
        {prices.status === "error" && (
          <p className="text-foreground">{prices.message}</p>
        )}
        {prices.status === "success" && (
          <p className="text-muted-foreground">
            Loaded {prices.prices.length} hourly prices for {area}.
          </p>
        )}
      </div>
    </div>
  );
};
