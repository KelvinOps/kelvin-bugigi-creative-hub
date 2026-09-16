// api/health.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { pool } from "../lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ok", database: "connected", timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ status: "error", database: "disconnected", error: err instanceof Error ? err.message : "unknown" });
  }
}