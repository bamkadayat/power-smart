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
