import { cn } from "@/shared/lib/cn";

type Props = {
  label: string;
  value: string;
  detail?: string;
  className?: string;
};

export const SummaryCard = ({ label, value, detail, className }: Props) => (
  <div
    className={cn(
      "rounded-lg border border-border bg-card p-4 text-card-foreground",
      className,
    )}
  >
    <p className="text-xs uppercase tracking-wide text-muted-foreground">
      {label}
    </p>
    <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
    {detail ? (
      <p className="mt-1 text-xs text-muted-foreground tabular-nums">{detail}</p>
    ) : null}
  </div>
);
