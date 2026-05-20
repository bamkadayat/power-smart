"use client";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";

import type { GeolocationState } from "../client/useGeolocation";

type Props = {
  onClick: () => void;
  state: GeolocationState;
  className?: string;
};

const LocationPin = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
      clipRule="evenodd"
    />
  </svg>
);

const Spinner = () => (
  <span
    aria-hidden="true"
    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
  />
);

export const LocationButton = ({ onClick, state, className }: Props) => {
  const loading = state.status === "loading";
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
      className={cn("h-11 cursor-pointer disabled:cursor-not-allowed", className)}
    >
      {loading ? <Spinner /> : <LocationPin />}
      {loading ? "Detecting your area…" : "Use my location"}
    </Button>
  );
};
