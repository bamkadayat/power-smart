const OSLO_TZ = "Europe/Oslo";

export type OsloDateParts = { year: string; month: string; day: string };

export const formatOsloDate = (date: Date = new Date()): OsloDateParts => {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: OSLO_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [year, month, day] = fmt.format(date).split("-");
  return { year, month, day };
};

export const osloDateString = (date: Date = new Date()): string => {
  const { year, month, day } = formatOsloDate(date);
  return `${year}-${month}-${day}`;
};

const DAY_MS = 24 * 60 * 60 * 1000;

export const osloTomorrowDateString = (date: Date = new Date()): string =>
  osloDateString(new Date(date.getTime() + DAY_MS));

// Extract HH:mm from an ISO timestamp string like "2026-05-20T14:00:00+02:00".
// The upstream API returns timestamps already in the Norwegian local offset, so
// slicing is safe and avoids a timezone round-trip.
export const formatHourFromIso = (iso: string): string => iso.slice(11, 16);

export const formatOsloDateLong = (date: Date = new Date()): string =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: OSLO_TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
