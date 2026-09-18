// Single place that knows where the serverless portfolio API lives.
// The API runs as a serverless function and talks directly to the Neon
// PostgreSQL database — there is no long-running server to keep alive.
const FUNCTIONS_BASE = import.meta.env.VITE_SUPABASE_URL as string | undefined;

export const API_BASE = FUNCTIONS_BASE
  ? `${FUNCTIONS_BASE.replace(/\/$/, "")}/functions/v1/api`
  : "/api";
