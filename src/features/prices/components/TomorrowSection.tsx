"use client";

import type { PriceArea } from "@/shared/lib/areas";
import { osloTomorrowDateString } from "@/shared/lib/date";

import { usePrices } from "../client/usePrices";

import { PriceSummary } from "./PriceSummary";

type Props = {
  area: PriceArea;
};

export const TomorrowSection = ({ area }: Props) => {
  const tomorrow = osloTomorrowDateString();
  const prices = usePrices(area, tomorrow);

  if (prices.status === "loading") {
    return (
      <p className="text-sm text-muted-foreground">
        Checking tomorrow&apos;s prices…
      </p>
    );
  }

  if (prices.status === "error") {
    return (
      <p className="text-sm text-muted-foreground">
        Tomorrow&apos;s prices are normally available after 13:00 Europe/Oslo.
      </p>
    );
  }

  if (prices.status === "success") {
    return <PriceSummary prices={prices.prices} />;
  }

  return null;
};
