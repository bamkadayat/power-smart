import Link from "next/link";

export const Header = () => (
  <header className="border-b border-border">
    <div className="mx-auto w-full max-w-4xl px-4 py-4 flex items-center justify-between">
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
      >
        PowerSmart
      </Link>
      <nav>
        <Link
          href="/about"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          About
        </Link>
      </nav>
    </div>
  </header>
);
