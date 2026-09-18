// Single place that knows where the serverless portfolio API lives.
// The API runs as a serverless edge function and talks directly to the Neon
// PostgreSQL database — there is no long-running server to keep alive.
const explicitUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined;

const functionsBase =
  (explicitUrl && explicitUrl.trim()) ||
  (projectId ? `https://${projectId}.supabase.co` : "") ||
  "https://ltfycpumqcuamjboptpp.supabase.co";

export const API_BASE = `${functionsBase.replace(/\/$/, "")}/functions/v1/api`;

/** Parse a response as JSON, but never explode when the server returns HTML. */
export async function safeJson<T = any>(response: Response): Promise<T | null> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
