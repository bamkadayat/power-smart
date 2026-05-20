import { HowItWorks } from "./_components/HowItWorks";
import { PriceDashboard } from "./_components/PriceDashboard";

export default function HomePage() {
  return (
    <>
      <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-8 sm:py-12">
        <section className="rounded-2xl border border-border/40 bg-linear-to-br from-card via-card to-muted px-6 py-10 shadow-[0_4px_20px_-8px_rgba(9,60,93,0.08)] sm:px-10 sm:py-14">
          <h1 className="max-w-3xl text-[28px] font-semibold leading-[1.15] tracking-tight sm:text-[44px]">
            Find the cheapest electricity hours near you.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            PowerSmart fetches Norwegian spot prices for your price area and
            tells you the best windows to run your washing machine, dishwasher,
            EV charger, and heating.
          </p>
        </section>
        <PriceDashboard />
      </div>
      <HowItWorks />
    </>
  );
}
