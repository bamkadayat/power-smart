"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
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
    <Select
      value={value ?? undefined}
      onValueChange={(next) => onChange(next as PriceArea)}
    >
      <SelectTrigger id={id} aria-label="Your price area">
        <SelectValue placeholder="Choose an area…" />
      </SelectTrigger>
      <SelectContent>
        {ALL_AREAS.map((meta) => (
          <SelectItem key={meta.code} value={meta.code}>
            {meta.code} — {meta.city} ({meta.region})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
