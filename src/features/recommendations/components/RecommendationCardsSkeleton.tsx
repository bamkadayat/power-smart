import { Skeleton } from "@/shared/ui/skeleton";

const CardSkeleton = () => (
  <div className="rounded-lg border border-border bg-card p-4">
    <Skeleton className="h-3 w-24" />
    <Skeleton className="mt-2 h-6 w-32" />
    <Skeleton className="mt-2 h-3 w-20" />
  </div>
);

export const RecommendationCardsSkeleton = () => (
  <div
    className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    aria-hidden="true"
  >
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </div>
);
