import "server-only";

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Set it in .env locally and in your Vercel project settings.`,
    );
  }
  return value;
};

const optional = (name: string, fallback: string): string =>
  process.env[name] ?? fallback;

const DEFAULT_UPSTREAM_PRICES_URL =
  "https://www.hvakosterstrommen.no/api/v1/prices";

export const serverEnv = {
  tursoUrl: () => required("TURSO_DATABASE_URL"),
  tursoAuthToken: () => required("TURSO_AUTH_TOKEN"),
  upstreamPricesUrl: () =>
    optional("UPSTREAM_PRICES_URL", DEFAULT_UPSTREAM_PRICES_URL),
};
