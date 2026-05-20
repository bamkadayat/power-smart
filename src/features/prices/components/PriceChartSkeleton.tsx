import { Skeleton } from "@/shared/ui/skeleton";

// Pseudo-realistic Norwegian demand shape: low overnight, morning + evening peaks.
// Static (not random) so SSR and client render the same heights.
const BAR_HEIGHTS = [
  55, 50, 45, 40, 38, 42, 55, 70, 82, 78, 70, 60, 50, 40, 35, 45, 65, 80, 90, 95,
  88, 78, 68, 60,
];

export const PriceChartSkeleton = () => (
  <figure aria-hidden="true">
    <div className="flex h-48 items-end gap-[2px] sm:gap-1">
      {BAR_HEIGHTS.map((height, index) => (
        <div
          key={index}
          className="flex h-full flex-1 flex-col items-center justify-end gap-1"
        >
          <span className="h-3" />
          <Skeleton
            className="w-full rounded-t rounded-b-none"
            style={{ height: `${height}%` }}
          />
        </div>
      ))}
    </div>
    <div className="mt-2 flex justify-between text-xs tabular-nums">
      <span className="invisible">00</span>
      <span className="invisible">06</span>
      <span className="invisible">12</span>
      <span className="invisible">18</span>
      <span className="invisible">23</span>
    </div>
  </figure>
);
