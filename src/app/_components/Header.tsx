import Link from "next/link";

import { AreaPill } from "@/features/area";
import { Logo } from "@/shared/components/Logo";

const navLinkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm";

export const Header = () => (
  <header className="border-b border-border">
    <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4">
      <Link
        href="/"
        className="flex items-center gap-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
      >
        <Logo />
        <span className="text-lg font-semibold tracking-tight">PowerSmart</span>
      </Link>

      <nav className="flex items-center gap-4 sm:gap-6">
        <Link href="/#today" className={`hidden sm:inline-flex ${navLinkClass}`}>
          Today
        </Link>
        <Link
          href="/#tomorrow"
          className={`hidden sm:inline-flex ${navLinkClass}`}
        >
          Tomorrow
        </Link>
        <Link href="/about" className={navLinkClass}>
          About
        </Link>
        <span className="hidden sm:inline-flex">
          <AreaPill />
        </span>
      </nav>
    </div>
  </header>
);
