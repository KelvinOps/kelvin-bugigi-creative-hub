// api/image-proxy.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import https from "https";
import http from "http";
import { URL } from "url";

const ALLOWED_PROXY_HOSTS = [
  "github.com", "raw.githubusercontent.com", "images.unsplash.com",
  "cdn.jsdelivr.net", "res.cloudinary.com", "imgur.com", "i.imgur.com",
  "supabase.co", "supabase.in",
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const rawUrl = req.query.url as string | undefined;
  if (!rawUrl) { res.status(400).json({ error: "Missing url query parameter" }); return; }

  let parsed: URL;
  try { parsed = new URL(rawUrl); } catch { res.status(400).json({ error: "Invalid URL" }); return; }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    res.status(400).json({ error: "Only http/https URLs are allowed" }); return;
  }
  const isAllowed = ALLOWED_PROXY_HOSTS.some(h => parsed.hostname === h || parsed.hostname.endsWith(`.${h}`));
  if (!isAllowed) { res.status(403).json({ error: `Host not allowed: ${parsed.hostname}` }); return; }

  const protocol = parsed.protocol === "https:" ? https : http;
  protocol.get(rawUrl, { headers: { "User-Agent": "Mozilla/5.0" }, timeout: 15000 }, (proxyRes) => {
    if (!proxyRes.statusCode || proxyRes.statusCode >= 300) {
      res.status(proxyRes.statusCode ?? 502).json({ error: `Upstream returned ${proxyRes.statusCode}` });
      return;
    }
    res.setHeader("Content-Type", proxyRes.headers["content-type"] ?? "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    proxyRes.pipe(res);
  }).on("error", (err) => {
    if (!res.headersSent) res.status(502).json({ error: err.message });
  });
}