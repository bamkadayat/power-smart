"use client";

import { useEffect, useState } from "react";

import type { PriceArea } from "@/shared/lib/areas";

import type { ElectricityPrice } from "../types";

export type PricesState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; prices: ElectricityPrice[] }
  | { status: "error"; message: string };

type ApiResponse =
  | { area: PriceArea; date: string; prices: ElectricityPrice[] }
  | { error: string };

export const usePrices = (
  area: PriceArea | null,
  date?: string,
): PricesState => {
  const [state, setState] = useState<PricesState>({ status: "loading" });

  useEffect(() => {
    if (!area) return;

    let active = true;
    const controller = new AbortController();

    const run = async () => {
      setState({ status: "loading" });
      try {
        const params = new URLSearchParams({ area });
        if (date) params.set("date", date);
        const res = await fetch(`/api/prices?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!active) return;
        const body = (await res.json()) as ApiResponse;
        if (!res.ok || "error" in body) {
          setState({
            status: "error",
            message: "error" in body ? body.error : "Failed to load prices.",
          });
          return;
        }
        setState({ status: "success", prices: body.prices });
      } catch (err: unknown) {
        if (!active) return;
        if (err instanceof DOMException && err.name === "AbortError") return;
        setState({ status: "error", message: "Failed to load prices." });
      }
    };

    void run();

    return () => {
      active = false;
      controller.abort();
    };
  }, [area, date]);

  if (!area) return { status: "idle" };
  return state;
};
