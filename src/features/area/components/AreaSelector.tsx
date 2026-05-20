"use client";

import type { PriceArea } from "@/shared/lib/areas";
import { cn } from "@/shared/lib/cn";

import { ALL_AREAS } from "../lib/areaMeta";

type Props = {
  value: PriceArea | null;
  onChange: (next: PriceArea) => void;
  id?: string;
  className?: string;
};

export const AreaSelector = ({
  value,
  onChange,
  id = "area-selector",
  className,
}: Props) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    <label htmlFor={id} className="text-sm font-medium">
      Your price area
    </label>
    <select
      id={id}
      value={value ?? ""}
      onChange={(event) => onChange(event.target.value as PriceArea)}
      className="h-11 rounded-md border border-input bg-background px-3 text-sm text-foreground transition-colors hover:border-muted-foreground/60 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <option value="" disabled>
        Choose an area…
      </option>
      {ALL_AREAS.map((meta) => (
        <option key={meta.code} value={meta.code}>
          {meta.code} — {meta.city} ({meta.region})
        </option>
      ))}
    </select>
  </div>
);
