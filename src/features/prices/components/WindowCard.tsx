import { cn } from "@/shared/lib/cn";

export type WindowCardVariant = "cheap" | "peak";

type Props = {
  variant: WindowCardVariant;
  label: string;
  value: string;
  detail: string;
};

const SURFACE: Record<WindowCardVariant, string> = {
  cheap:
    "border-accent/40 bg-[color-mix(in_srgb,var(--accent)_18%,var(--card))]",
  peak: "border-border bg-muted",
};

const DOT: Record<WindowCardVariant, string> = {
  cheap: "bg-accent",
  peak: "bg-muted-foreground",
};

export const WindowCard = ({ variant, label, value, detail }: Props) => (
  <div className={cn("rounded-lg border p-4", SURFACE[variant])}>
    <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 rounded-full", DOT[variant])}
      />
      {label}
    </p>
    <p className="mt-2 text-2xl font-bold tabular-nums">{value}</p>
    <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
  </div>
);
