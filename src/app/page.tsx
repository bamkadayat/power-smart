import { HowItWorks } from "./_components/HowItWorks";
import { PriceDashboard } from "./_components/PriceDashboard";

export default function HomePage() {
  return (
    <>
      <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-8 sm:py-12">
        <section>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Find the cheapest electricity hours near you.
          </h1>
          <p className="mt-3 max-w-prose text-muted-foreground">
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
