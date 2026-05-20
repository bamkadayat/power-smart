import { APP_VERSION, GIT_SHA } from "@/shared/config/version";

import { Logo } from "./Logo";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <Logo />
            <div className="max-w-sm">
              <p className="text-base font-semibold tracking-tight text-foreground">
                PowerSmart
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                A free tool that helps Norwegian households shift heavy
                appliance use to cheaper hours.
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Spot prices via{" "}
            <a
              href="https://www.hvakosterstrommen.no"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Hva koster strømmen.no
            </a>
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} PowerSmart · Made in Norway</p>
          <p className="font-mono">
            v{APP_VERSION} · {GIT_SHA}
          </p>
        </div>
      </div>
    </footer>
  );
};
