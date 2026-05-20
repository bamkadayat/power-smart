import type { Metadata } from "next";

import { HowItWorks } from "../_components/HowItWorks";

export const metadata: Metadata = {
  title: "About — PowerSmart",
  description:
    "How PowerSmart helps Norwegian households shift electricity use to cheaper hours, what the prices mean, and our privacy approach.",
};

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-3xl space-y-10 px-4 py-8 sm:py-12">
        <header>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            About
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Find the cheapest electricity hours in Norway.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            PowerSmart is a free tool that shows hourly Norwegian spot prices
            and recommends the best windows to run heavy appliances.
          </p>
        </header>

        <section aria-labelledby="prices-heading" className="space-y-3">
          <h2 id="prices-heading" className="text-xl font-semibold">
            About the prices
          </h2>
          <p className="text-muted-foreground">
            The numbers shown are{" "}
            <strong className="font-medium text-foreground">spot prices</strong>
            — the raw market rate set by Nord Pool for your price area. They do{" "}
            <strong className="font-medium text-foreground">not</strong>{" "}
            include VAT (moms), grid rent (nettleie), surcharges, or your
            retailer&apos;s margin. Your actual bill will be higher than these
            numbers; the pattern and timing are what matters for shifting load.
          </p>
        </section>

        <section aria-labelledby="privacy-heading" className="space-y-3">
          <h2 id="privacy-heading" className="text-xl font-semibold">
            Privacy
          </h2>
          <p className="text-muted-foreground">
            If you use the location button, your browser sends your coordinates
            to PowerSmart only long enough to estimate your price area.{" "}
            <strong className="font-medium text-foreground">
              We never store your coordinates.
            </strong>{" "}
            The only thing we save is the 3-character price area code (e.g.{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              NO5
            </code>
            ), and it lives in your browser&apos;s localStorage — not on any
            server. You can clear it any time from your browser&apos;s site
            settings.
          </p>
        </section>

        <section aria-labelledby="data-heading" className="space-y-3">
          <h2 id="data-heading" className="text-xl font-semibold">
            Where the data comes from
          </h2>
          <p className="text-muted-foreground">
            Hourly spot prices are sourced from{" "}
            <a
              href="https://www.hvakosterstrommen.no"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              hvakosterstrommen.no
            </a>
            , a free public API run by volunteers in Norway, which in turn
            relays day-ahead prices from Nord Pool. PowerSmart caches their
            responses to reduce upstream load.
          </p>
        </section>

        <section aria-labelledby="areas-heading" className="space-y-3">
          <h2 id="areas-heading" className="text-xl font-semibold">
            Price areas
          </h2>
          <p className="text-muted-foreground">
            Norway is split into five bidding zones. The price you pay depends
            on which zone you live in.
          </p>
          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              ["NO1", "Oslo / East Norway"],
              ["NO2", "Kristiansand / South Norway"],
              ["NO3", "Trondheim / Central Norway"],
              ["NO4", "Tromsø / North Norway"],
              ["NO5", "Bergen / West Norway"],
            ].map(([code, region]) => (
              <div
                key={code}
                className="flex gap-3 rounded-md border border-border bg-card p-3"
              >
                <dt className="font-mono font-semibold tabular-nums">{code}</dt>
                <dd className="text-muted-foreground">{region}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <HowItWorks />
    </>
  );
}
