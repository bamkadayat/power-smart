import { isPriceArea, type PriceArea } from "@/shared/lib/areas";

const STORAGE_KEY = "powersmart.priceArea";

export const loadSelectedArea = (): PriceArea | null => {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value && isPriceArea(value) ? value : null;
  } catch {
    return null;
  }
};

export const saveSelectedArea = (area: PriceArea): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, area);
  } catch {
    // localStorage may be unavailable (private mode, quota exceeded).
    // Silent failure is acceptable here — the area falls back to detection or manual selection.
  }
};

export const clearSelectedArea = (): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // See saveSelectedArea — silent failure is acceptable.
  }
};
