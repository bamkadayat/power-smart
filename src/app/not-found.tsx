import Link from "next/link";

import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-16 text-center sm:py-24">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Error 404
      </p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        We couldn&apos;t find what you were looking for. The link might be
        broken, or the page may have moved.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to PowerSmart</Link>
      </Button>
    </div>
  );
}
