"use client";

import { useCallback, useSyncExternalStore } from "react";

import type { PriceArea } from "@/shared/lib/areas";

import {
  clearSelectedArea,
  loadSelectedArea,
  saveSelectedArea,
} from "../lib/areaStorage";

const STORAGE_KEY = "powersmart.priceArea";

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getSnapshot = (): PriceArea | null => loadSelectedArea();
const getServerSnapshot = (): PriceArea | null => null;

export type UseSelectedArea = {
  area: PriceArea | null;
  setArea: (next: PriceArea | null) => void;
};

export const useSelectedArea = (): UseSelectedArea => {
  const area = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setArea = useCallback((next: PriceArea | null) => {
    if (next) saveSelectedArea(next);
    else clearSelectedArea();
    // Native storage events only fire across documents; dispatch locally so this
    // hook re-reads from storage in the current tab.
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, []);

  return { area, setArea };
};
