// Password hashing + JWT signing/verification (Web Crypto only).
const enc = new TextEncoder();

const JWT_SECRET = Deno.env.get("PORTFOLIO_JWT_SECRET") ?? "";
if (!JWT_SECRET) console.error("PORTFOLIO_JWT_SECRET is not set");

// ── Password hashing (PBKDF2-SHA256, 210k iterations) ──────────────────────
const ITERATIONS = 210_000;

function toHex(buf: ArrayBuffer | Uint8Array): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function fromHex(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

async function pbkdf2(password: string, salt: Uint8Array): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
    key,
    256,
  );
  return toHex(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt);
  return `pbkdf2$${ITERATIONS}$${toHex(salt)}$${hash}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
  const salt = fromHex(parts[2]);
  const candidate = await pbkdf2(password, salt);
  if (candidate.length !== parts[3].length) return false;
  let diff = 0;
  for (let i = 0; i < candidate.length; i++) diff |= candidate.charCodeAt(i) ^ parts[3].charCodeAt(i);
  return diff === 0;
}

// ── JWT (HS256) ────────────────────────────────────────────────────────────
function b64url(data: Uint8Array | string): string {
  const bytes = typeof data === "string" ? enc.encode(data) : data;
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(s: string): string {
  const pad = s.replace(/-/g, "+").replace(/_/g, "/");
  return atob(pad + "=".repeat((4 - (pad.length % 4)) % 4));
}

async function hmacKey(): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  exp: number;
}

export async function signToken(payload: Omit<TokenPayload, "exp">, days = 7): Promise<string> {
  const body: TokenPayload = { ...payload, exp: Math.floor(Date.now() / 1000) + days * 86400 };
  const head = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const data = `${head}.${b64url(JSON.stringify(body))}`;
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(), enc.encode(data));
  return `${data}.${b64url(new Uint8Array(sig))}`;
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const [head, body, sig] = token.split(".");
    if (!head || !body || !sig) return null;
    const valid = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(),
      Uint8Array.from(b64urlDecode(sig), (c) => c.charCodeAt(0)),
      enc.encode(`${head}.${body}`),
    );
    if (!valid) return null;
    const payload = JSON.parse(b64urlDecode(body)) as TokenPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function requireAdmin(req: Request): Promise<TokenPayload | null> {
  const header = req.headers.get("Authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload || payload.role.toUpperCase() !== "ADMIN") return null;
  return payload;
}
