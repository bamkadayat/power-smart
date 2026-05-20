"use client";

import { Button } from "@/shared/ui/button";

import type { GeolocationState } from "../client/useGeolocation";

type Props = {
  onClick: () => void;
  state: GeolocationState;
  className?: string;
};

export const LocationButton = ({ onClick, state, className }: Props) => {
  const loading = state.status === "loading";
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
      className={className}
    >
      {loading ? "Detecting your area…" : "Use my location"}
    </Button>
  );
};
