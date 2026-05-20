import { Skeleton } from "@/shared/ui/skeleton";

const SummaryCardSkeleton = () => (
  <div className="rounded-lg border border-border bg-card p-4">
    <Skeleton className="h-3 w-20" />
    <Skeleton className="mt-3 h-7 w-24" />
    <Skeleton className="mt-2 h-3 w-16" />
  </div>
);

export const PriceSummarySkeleton = () => (
  <div
    className="grid grid-cols-2 gap-3 sm:grid-cols-4"
    aria-hidden="true"
  >
    <SummaryCardSkeleton />
    <SummaryCardSkeleton />
    <SummaryCardSkeleton />
    <SummaryCardSkeleton />
  </div>
);
