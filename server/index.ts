// server/index.ts — security-hardened with role verification, helmet, rate limiting
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { PrismaClient, Category as PrismaCategory, LinkType as PrismaLinkType } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { ProjectFormData } from "../src/types/project";

dotenv.config();

// ── DB ────────────────────────────────────────────────────────────────────────
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ── Supabase service-role client ──────────────────────────────────────────────
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl) throw new Error("VITE_SUPABASE_URL is not set");
if (!supabaseServiceRole) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
const supabase = createClient(supabaseUrl, supabaseServiceRole);

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "kbugigi@gmail.com").toLowerCase();

// ── Derive the Supabase storage hostname for CSP/CORP headers ─────────────────
// e.g. "https://abcxyz.supabase.co" → "abcxyz.supabase.co"
let supabaseStorageHost = "";
try {
  supabaseStorageHost = new URL(supabaseUrl).hostname; // e.g. "abcxyz.supabase.co"
} catch {
  console.warn("Could not parse VITE_SUPABASE_URL for CSP host extraction");
}

// ── App ───────────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc:  ["'self'"],
        // !! FIXED: allow images from Supabase storage and any https source.
        // The previous config only allowed 'self', data:, and https: which some
        // browsers interpret strictly and block cross-origin image requests.
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https:",
          // Explicitly list the Supabase storage origin so no ambiguity remains
          ...(supabaseStorageHost ? [`https://${supabaseStorageHost}`] : []),
        ],
        connectSrc: [
          "'self'",
          supabaseUrl,
          ...(supabaseStorageHost ? [`https://${supabaseStorageHost}`] : []),
        ],
        scriptSrc:  ["'self'"],
        styleSrc:   ["'self'", "'unsafe-inline'"],
        fontSrc:    ["'self'", "https:", "data:"],
      },
    },
    // !! FIXED: "same-site" blocks browsers from loading images that come from
    // a DIFFERENT origin (Supabase storage) even when the CSP allows them.
    // "cross-origin" tells the browser: this resource MAY be embedded by any
    // origin, which is what we need for a portfolio site serving public images.
    crossOriginResourcePolicy: { policy: "cross-origin" },
    // Keep other sensible defaults
    crossOriginEmbedderPolicy: false, // set true only if you need COEP isolation
  })
);

const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter((o): o is string => Boolean(o));

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: "10mb" }));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Try again later." },
}));

const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: "Rate limit reached. Slow down." },
});

// ── Types ─────────────────────────────────────────────────────────────────────
interface AuthenticatedRequest extends Request {
  userId?: string;
  userEmail?: string;
}

interface IncomingSoftwareMeta {
  tech_stack?: string[];    techStack?: string[];
  live_url?: string | null; liveUrl?: string | null;
  repo_url?: string | null; repoUrl?: string | null;
  lighthouse_score?: number | null; lighthouseScore?: number | null;
  page_load_ms?: number | null;     pageLoadMs?: number | null;
  monthly_visitors?: number | null; monthlyVisitors?: number | null;
  uptime?: number | null;
  analytics_note?: string | null;   analyticsNote?: string | null;
}

interface IncomingArtMeta {
  medium?: string;
  dimensions?: string | null;
  year?: number | null;
  is_available?: boolean; isAvailable?: boolean;
  price?: number | null;
  shop_url?: string | null; shopUrl?: string | null;
}

interface IncomingDesignMeta {
  software?: string[];
  client_name?: string | null; clientName?: string | null;
  year?: number | null;
  behance_url?: string | null; behanceUrl?: string | null;
}

interface IncomingLink {
  label: string; url: string;
  linkType?: string; link_type?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const CATEGORY_MAP: Record<string, PrismaCategory> = {
  "Web Dev":     PrismaCategory.WEB_DEV,
  "Design":      PrismaCategory.DESIGN,
  "Fine Art":    PrismaCategory.FINE_ART,
  "Photography": PrismaCategory.PHOTOGRAPHY,
  "WEB_DEV":     PrismaCategory.WEB_DEV,
  "DESIGN":      PrismaCategory.DESIGN,
  "FINE_ART":    PrismaCategory.FINE_ART,
  "PHOTOGRAPHY": PrismaCategory.PHOTOGRAPHY,
};

function mapToPrismaCategory(category: string): PrismaCategory {
  const result = CATEGORY_MAP[category];
  if (!result) throw new Error(`Unknown category: "${category}". Valid values: ${Object.keys(CATEGORY_MAP).join(", ")}`);
  return result;
}

function mapToPrismaLinkType(linkType: string): PrismaLinkType {
  const m: Record<string, PrismaLinkType> = {
    live: PrismaLinkType.LIVE, repo: PrismaLinkType.REPO,
    shop: PrismaLinkType.SHOP, demo: PrismaLinkType.DEMO, other: PrismaLinkType.OTHER,
  };
  return m[linkType?.toLowerCase()] ?? PrismaLinkType.OTHER;
}

function normalizeSoftwareMeta(meta?: IncomingSoftwareMeta) {
  if (!meta) return undefined;
  return {
    techStack:       meta.tech_stack       ?? meta.techStack       ?? [],
    liveUrl:         meta.live_url         ?? meta.liveUrl         ?? null,
    repoUrl:         meta.repo_url         ?? meta.repoUrl         ?? null,
    lighthouseScore: meta.lighthouse_score ?? meta.lighthouseScore ?? null,
    pageLoadMs:      meta.page_load_ms     ?? meta.pageLoadMs      ?? null,
    monthlyVisitors: meta.monthly_visitors ?? meta.monthlyVisitors ?? null,
    uptime:          meta.uptime           ?? null,
    analyticsNote:   meta.analytics_note   ?? meta.analyticsNote   ?? null,
  };
}

function normalizeArtMeta(meta?: IncomingArtMeta) {
  if (!meta) return undefined;
  return {
    medium:      (meta.medium ?? "OTHER").toUpperCase().replace(/ /g, "_"),
    dimensions:  meta.dimensions   ?? null,
    year:        meta.year         ?? null,
    isAvailable: meta.is_available ?? meta.isAvailable ?? true,
    price:       meta.price        ?? null,
    shopUrl:     meta.shop_url     ?? meta.shopUrl ?? null,
  };
}

function normalizeDesignMeta(meta?: IncomingDesignMeta) {
  if (!meta) return undefined;
  return {
    software:   meta.software    ?? [],
    clientName: meta.client_name ?? meta.clientName ?? null,
    year:       meta.year        ?? null,
    behanceUrl: meta.behance_url ?? meta.behanceUrl ?? null,
  };
}

function resolveLinkType(l: IncomingLink): PrismaLinkType {
  return mapToPrismaLinkType(l.linkType ?? l.link_type ?? "other");
}

const CATEGORY_KEY_TO_LABEL: Record<string, string> = {
  "WEB_DEV":     "Web Dev",
  "DESIGN":      "Design",
  "FINE_ART":    "Fine Art",
  "PHOTOGRAPHY": "Photography",
  "Web Dev":     "Web Dev",
  "Design":      "Design",
  "Fine Art":    "Fine Art",
  "Photography": "Photography",
};

function normalizeCategoryLabel(category: string): string {
  return CATEGORY_KEY_TO_LABEL[category] ?? category;
}

// ── Auth middleware ───────────────────────────────────────────────────────────
async function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) { res.status(401).json({ error: "Unauthorized" }); return; }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) { res.status(401).json({ error: "Invalid token" }); return; }

    const emailMatch = user.email?.toLowerCase() === ADMIN_EMAIL;
    if (!emailMatch) {
      const { data: row } = await supabase.from("users").select("role").eq("id", user.id).single();
      const r = row as { role?: string } | null;
      if (r?.role !== "ADMIN") { res.status(403).json({ error: "Forbidden — admin access required" }); return; }
    }

    req.userId    = user.id;
    req.userEmail = user.email;
    next();
  } catch {
    res.status(401).json({ error: "Authentication failed" });
  }
}

// ── Public endpoints ──────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/projects", async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const where = category ? { category: mapToPrismaCategory(category as string) } : undefined;
    const projects = await prisma.project.findMany({
      where,
      include: {
        images:       { orderBy: { displayOrder: "asc" } },
        links:        { orderBy: { displayOrder: "asc" } },
        softwareMeta: true,
        artMeta:      true,
        designMeta:   true,
      },
      orderBy: { displayOrder: "asc" },
    });
    res.json(projects);
  } catch (err) {
    console.error("GET /api/projects error:", err);
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

app.get("/api/projects/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        images:       { orderBy: { displayOrder: "asc" } },
        links:        { orderBy: { displayOrder: "asc" } },
        softwareMeta: true,
        artMeta:      true,
        designMeta:   true,
      },
    });
    if (!project) { res.status(404).json({ error: "Not found" }); return; }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

// ── Admin-only mutating endpoints ─────────────────────────────────────────────
app.post("/api/projects", requireAdmin, adminLimiter, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const body = req.body as ProjectFormData;
    const { title, category, description, tags, displayOrder, featured, images = [], links = [], softwareMeta, artMeta, designMeta } = body;

    if (!title || !category) { res.status(400).json({ error: "Title and category are required" }); return; }

    let prismaCategory: PrismaCategory;
    try { prismaCategory = mapToPrismaCategory(category as unknown as string); }
    catch (e) { res.status(400).json({ error: e instanceof Error ? e.message : "Invalid category" }); return; }

    const categoryStr = normalizeCategoryLabel(category as unknown as string);

    const data: Record<string, unknown> = {
      title,
      category:     prismaCategory,
      description:  description  ?? null,
      tags:         tags         ?? [],
      displayOrder: displayOrder ?? 0,
      featured:     featured     ?? false,
      images: { create: images.map((img, i) => ({ imageUrl: img.imageUrl, altText: img.altText ?? "", displayOrder: i })) },
      links:  { create: (links as IncomingLink[]).map((l, i) => ({ label: l.label, url: l.url, linkType: resolveLinkType(l), displayOrder: i })) },
    };

    if (categoryStr === "Web Dev"    && softwareMeta) data.softwareMeta = { create: normalizeSoftwareMeta(softwareMeta as IncomingSoftwareMeta) };
    if (categoryStr === "Fine Art"   && artMeta)      data.artMeta      = { create: normalizeArtMeta(artMeta as IncomingArtMeta) };
    if ((categoryStr === "Design" || categoryStr === "Photography") && designMeta)
      data.designMeta = { create: normalizeDesignMeta(designMeta as IncomingDesignMeta) };

    const project = await prisma.project.create({
      data: data as Parameters<typeof prisma.project.create>[0]["data"],
      include: { images: { orderBy: { displayOrder: "asc" } }, links: { orderBy: { displayOrder: "asc" } }, softwareMeta: true, artMeta: true, designMeta: true },
    });
    res.status(201).json(project);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

app.put("/api/projects/:id", requireAdmin, adminLimiter, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id   = req.params.id;
    const body = req.body as ProjectFormData;
    const { title, category, description, tags, displayOrder, featured, images = [], links = [], softwareMeta, artMeta, designMeta } = body;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) { res.status(404).json({ error: "Not found" }); return; }

    let prismaCategory: PrismaCategory;
    try { prismaCategory = mapToPrismaCategory(category as unknown as string); }
    catch (e) { res.status(400).json({ error: e instanceof Error ? e.message : "Invalid category" }); return; }

    const categoryStr = normalizeCategoryLabel(category as unknown as string);

    await prisma.$transaction([
      prisma.projectImage.deleteMany({ where: { projectId: id } }),
      prisma.projectLink.deleteMany({  where: { projectId: id } }),
    ]);

    const data: Record<string, unknown> = {
      title,
      category:     prismaCategory,
      description:  description  ?? null,
      tags:         tags         ?? [],
      displayOrder: displayOrder ?? 0,
      featured:     featured     ?? false,
      images: { create: images.map((img, i) => ({ imageUrl: img.imageUrl, altText: img.altText ?? "", displayOrder: i })) },
      links:  { create: (links as IncomingLink[]).map((l, i) => ({ label: l.label, url: l.url, linkType: resolveLinkType(l), displayOrder: i })) },
    };

    const upsert = (d: Record<string, unknown>) => ({ upsert: { create: d, update: d } });
    const nSW  = normalizeSoftwareMeta(softwareMeta as IncomingSoftwareMeta);
    const nArt = normalizeArtMeta(artMeta as IncomingArtMeta);
    const nDes = normalizeDesignMeta(designMeta as IncomingDesignMeta);

    if (categoryStr === "Web Dev"    && nSW)  data.softwareMeta = upsert(nSW  as unknown as Record<string, unknown>);
    if (categoryStr === "Fine Art"   && nArt) data.artMeta      = upsert(nArt as unknown as Record<string, unknown>);
    if ((categoryStr === "Design" || categoryStr === "Photography") && nDes)
      data.designMeta = upsert(nDes as unknown as Record<string, unknown>);

    const project = await prisma.project.update({
      where: { id },
      data:  data as Parameters<typeof prisma.project.update>[0]["data"],
      include: { images: { orderBy: { displayOrder: "asc" } }, links: { orderBy: { displayOrder: "asc" } }, softwareMeta: true, artMeta: true, designMeta: true },
    });
    res.json(project);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

app.delete("/api/projects/:id", requireAdmin, adminLimiter, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) { res.status(404).json({ error: "Not found" }); return; }
    await prisma.project.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

// ── Admin: generate Supabase Storage signed upload URL ────────────────────────
app.post("/api/admin/upload-url", requireAdmin, adminLimiter, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { filename, contentType, bucket = "portfolio" } = req.body as { filename: string; contentType: string; bucket?: string; };
    if (!filename || !contentType) { res.status(400).json({ error: "filename and contentType required" }); return; }

    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key  = `${Date.now()}-${safe}`;

    const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(key);
    if (error || !data) { res.status(500).json({ error: error?.message || "Could not create upload URL" }); return; }

    const publicUrl = supabase.storage.from(bucket).getPublicUrl(key).data.publicUrl;
    res.json({ signedUrl: data.signedUrl, token: data.token, key, publicUrl });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

// ── 404 & global error ────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: "Not found" }));
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 API: http://localhost:${PORT}`);
  console.log(`🔒 Admin email: ${ADMIN_EMAIL}`);
  console.log(`🖼  Images allowed from: ${supabaseStorageHost || "(any https)"}`);
});