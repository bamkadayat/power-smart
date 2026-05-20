import "server-only";

import { createClient, type Client } from "@libsql/client";

import { serverEnv } from "@/shared/config/env";

let cached: Client | null = null;

export const tursoClient = (): Client => {
  if (!cached) {
    cached = createClient({
      url: serverEnv.tursoUrl(),
      authToken: serverEnv.tursoAuthToken(),
    });
  }
  return cached;
};
