import { APP_VERSION, GIT_SHA } from "@/shared/config/version";

export const Footer = () => (
  <footer className="border-t border-border mt-8">
    <div className="mx-auto w-full max-w-4xl px-4 py-6 text-sm text-muted-foreground space-y-2">
      <p>
        Electricity prices delivered by{" "}
        <a
          href="https://www.hvakosterstrommen.no"
          className="text-foreground underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hva koster strømmen.no
        </a>
        . Spot price without VAT, grid rent and fees.
      </p>
      <p className="font-mono text-xs">
        v{APP_VERSION} · {GIT_SHA}
      </p>
    </div>
  </footer>
);
