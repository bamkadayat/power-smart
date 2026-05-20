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

export const serverEnv = {
  tursoUrl: () => required("TURSO_DATABASE_URL"),
  tursoAuthToken: () => required("TURSO_AUTH_TOKEN"),
};
