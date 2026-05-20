const STEPS = [
  {
    number: "01",
    title: "Pick your area",
    description: "Five Norwegian price zones, from NO1 Oslo to NO4 Tromsø.",
  },
  {
    number: "02",
    title: "We watch Nord Pool",
    description: "Hourly spot prices, updated as soon as they publish.",
  },
  {
    number: "03",
    title: "Run loads when it's cheap",
    description:
      "Get the best 2–4h windows for each appliance, today and tomorrow.",
  },
];

export const HowItWorks = () => (
  <section
    aria-labelledby="how-heading"
    className="bg-brand-navy text-white"
  >
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:py-16">
      <p className="text-xs font-medium uppercase tracking-wider text-brand-mint">
        How it works
      </p>
      <h2
        id="how-heading"
        className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Three steps. No app to install.
      </h2>

      <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STEPS.map((step) => (
          <li
            key={step.number}
            className="rounded-lg border border-white/10 bg-white/5 p-6"
          >
            <p className="font-mono text-2xl text-brand-mint">{step.number}</p>
            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-white/70">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
