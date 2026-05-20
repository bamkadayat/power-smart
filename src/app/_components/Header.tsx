import Link from "next/link";

import { AreaPill } from "@/features/area";
import { Logo } from "@/shared/components/Logo";

import { MobileNav } from "./MobileNav";

const navLinkClass =
  "text-base font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm";

export const Header = () => (
  <header className="relative shadow-[0_1px_3px_rgba(9,60,93,0.06)]">
    <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4">
      <Link
        href="/"
        className="flex items-center gap-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
      >
        <Logo />
        <span className="text-lg font-semibold tracking-tight">PowerSmart</span>
      </Link>

      <nav
        aria-label="Primary"
        className="hidden items-center gap-4 sm:flex sm:gap-6"
      >
        <Link href="/about" className={navLinkClass}>
          About
        </Link>
        <AreaPill />
      </nav>

      <MobileNav />
    </div>
  </header>
);
