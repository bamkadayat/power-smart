"use client";

import { useCallback, useState } from "react";

import type { PriceArea } from "@/shared/lib/areas";

import { detectAreaFromCoords } from "../lib/detectAreaFromCoords";

export type GeolocationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "unsupported" }
  | { status: "denied" }
  | { status: "unavailable" }
  | { status: "success"; area: PriceArea | null };

export type UseGeolocation = {
  state: GeolocationState;
  request: () => Promise<PriceArea | null>;
};

export const useGeolocation = (): UseGeolocation => {
  const [state, setState] = useState<GeolocationState>({ status: "idle" });

  const request = useCallback(
    (): Promise<PriceArea | null> =>
      new Promise((resolve) => {
        if (typeof navigator === "undefined" || !navigator.geolocation) {
          setState({ status: "unsupported" });
          resolve(null);
          return;
        }

        setState({ status: "loading" });
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const detected = detectAreaFromCoords(
              pos.coords.latitude,
              pos.coords.longitude,
            );
            setState({ status: "success", area: detected });
            resolve(detected);
          },
          (err) => {
            setState({
              status:
                err.code === err.PERMISSION_DENIED ? "denied" : "unavailable",
            });
            resolve(null);
          },
          { timeout: 10_000, maximumAge: 0, enableHighAccuracy: false },
        );
      }),
    [],
  );

  return { state, request };
};
