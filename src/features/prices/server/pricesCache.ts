import "server-only";

import type { PriceArea } from "@/shared/lib/areas";
import { tursoClient } from "@/shared/lib/turso";

import type { ElectricityPrice } from "../types";

const TTL_MS = 60 * 60 * 1000;

let schemaReady: Promise<void> | null = null;

const ensureSchema = async (): Promise<void> => {
  if (!schemaReady) {
    schemaReady = tursoClient()
      .execute(
        `CREATE TABLE IF NOT EXISTS prices_cache (
          area       TEXT    NOT NULL,
          date       TEXT    NOT NULL,
          prices     TEXT    NOT NULL,
          fetched_at INTEGER NOT NULL,
          PRIMARY KEY (area, date)
        )`,
      )
      .then(() => undefined);
  }
  return schemaReady;
};

export const getFromCache = async (
  area: PriceArea,
  date: string,
): Promise<ElectricityPrice[] | null> => {
  await ensureSchema();
  const result = await tursoClient().execute({
    sql: "SELECT prices, fetched_at FROM prices_cache WHERE area = ? AND date = ?",
    args: [area, date],
  });

  const row = result.rows[0];
  if (!row) return null;

  const fetchedAt = Number(row.fetched_at);
  if (Date.now() - fetchedAt > TTL_MS) return null;

  return JSON.parse(String(row.prices)) as ElectricityPrice[];
};

export const saveToCache = async (
  area: PriceArea,
  date: string,
  prices: ElectricityPrice[],
): Promise<void> => {
  await ensureSchema();
  await tursoClient().execute({
    sql: `INSERT INTO prices_cache (area, date, prices, fetched_at)
          VALUES (?, ?, ?, ?)
          ON CONFLICT (area, date) DO UPDATE SET
            prices = excluded.prices,
            fetched_at = excluded.fetched_at`,
    args: [area, date, JSON.stringify(prices), Date.now()],
  });
};
