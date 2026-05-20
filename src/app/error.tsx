"use client";

import { useEffect } from "react";

import { Button } from "@/shared/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-16 text-center sm:py-24">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Something went wrong
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        We hit a snag.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Sorry — the page failed to render. Try again, or head back to the home
        page.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Back to PowerSmart
        </Button>
      </div>
      {error.digest && (
        <p className="mt-8 font-mono text-xs text-muted-foreground">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
