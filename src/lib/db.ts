// lib/db.ts
// Serverless functions can spin up on every request, so we cache the pool
// on the global object to avoid exhausting Neon's connection limit.
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: pg.Pool | undefined;
}

export const pool =
  globalThis._pgPool ??
  new pg.Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 5, // keep low — serverless functions run many concurrent instances
  });

if (process.env.NODE_ENV !== "production") {
  globalThis._pgPool = pool;
}