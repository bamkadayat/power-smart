"use client";

import { cn } from "@/shared/lib/cn";

import { useSelectedArea } from "../client/useSelectedArea";

export const AreaPill = () => {
  const { area } = useSelectedArea();
  const active = area !== null;

  return (
    <a
      href="#area"
      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-2 w-2 rounded-full",
          active ? "bg-accent" : "bg-muted-foreground",
        )}
      />
      {area ?? "Pick area"}
    </a>
  );
};
