import { formatHourFromIso } from "@/shared/lib/date";
import { formatPrice } from "@/shared/lib/price";

import { buildRecommendations } from "../lib/buildRecommendations";
import type { PriceLike } from "../types";

type Props = {
  prices: PriceLike[];
};

export const RecommendationCards = ({ prices }: Props) => {
  const recommendations = buildRecommendations(prices);

  if (recommendations.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Not enough price data for recommendations.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {recommendations.map((rec) => (
        <li
          key={rec.appliance}
          className="rounded-lg border border-border bg-card p-4 text-card-foreground"
        >
          <p className="text-sm font-medium">{rec.label}</p>
          <p className="mt-1 text-xl font-semibold tabular-nums">
            {formatHourFromIso(rec.start)}–{formatHourFromIso(rec.end)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground tabular-nums">
            avg {formatPrice(rec.averagePrice)}
          </p>
        </li>
      ))}
    </ul>
  );
};
