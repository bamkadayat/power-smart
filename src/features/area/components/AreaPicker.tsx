"use client";

import { useGeolocation, type GeolocationState } from "../client/useGeolocation";
import { useSelectedArea } from "../client/useSelectedArea";
import { AREA_META } from "../lib/areaMeta";

import { AreaSelector } from "./AreaSelector";
import { LocationButton } from "./LocationButton";

const buildStatusMessage = (state: GeolocationState): string | null => {
  switch (state.status) {
    case "idle":
    case "loading":
      return null;
    case "success":
      if (state.area) {
        const meta = AREA_META[state.area];
        return `We detected ${meta.code} / ${meta.region}. Please change manually if this is wrong.`;
      }
      return "You don't appear to be in Norway. Please pick an area manually.";
    case "denied":
      return "Location permission denied. Please pick an area manually.";
    case "unavailable":
      return "We couldn't read your location. Please pick an area manually.";
    case "unsupported":
      return "Your browser doesn't support geolocation. Please pick an area manually.";
  }
};

export const AreaPicker = () => {
  const { area, setArea } = useSelectedArea();
  const { state: geoState, request: requestLocation } = useGeolocation();

  const handleLocate = async () => {
    const detected = await requestLocation();
    if (detected) setArea(detected);
  };

  const message = buildStatusMessage(geoState);

  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
        <LocationButton
          onClick={handleLocate}
          state={geoState}
          className="w-full sm:w-auto"
        />
        <AreaSelector
          value={area}
          onChange={setArea}
          className="w-full sm:max-w-sm"
        />
      </div>
      <p
        role="status"
        aria-live="polite"
        className="min-h-[1.25rem] text-sm text-muted-foreground"
      >
        {message}
      </p>
    </section>
  );
};
