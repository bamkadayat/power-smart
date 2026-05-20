"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AreaPill } from "@/features/area";
import { cn } from "@/shared/lib/cn";

const LINKS = [{ href: "/about", label: "About" }];

export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span aria-hidden="true" className="relative block h-5 w-6">
          <span
            className={cn(
              "absolute left-0 right-0 top-0 h-0.5 rounded bg-current transition-all duration-300 ease-out",
              open && "top-1/2 -translate-y-1/2 rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute left-1 right-0 top-1/2 h-0.5 -translate-y-1/2 rounded bg-current transition-opacity duration-200",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute bottom-0 left-0 right-0 h-0.5 rounded bg-current transition-all duration-300 ease-out",
              open && "bottom-auto top-1/2 -translate-y-1/2 -rotate-45",
            )}
          />
        </span>
      </button>

      <div
        id="mobile-nav-panel"
        className={cn(
          "absolute inset-x-0 top-full z-50 origin-top overflow-hidden border-b border-border bg-background shadow-lg transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex w-full max-w-4xl flex-col gap-1 px-4 py-3"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-base text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </Link>
          ))}
          <div className="px-3 pb-1 pt-2">
            <AreaPill />
          </div>
        </nav>
      </div>
    </div>
  );
};
