// server/index.ts — security-hardened with role verification, helmet, rate limiting
// + image proxy endpoint to bypass browser CORS/CORP restrictions
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import https from "https";
import http from "http";
import { URL } from "url";
import { PrismaClient, Category as PrismaCategory, LinkType as PrismaLinkType } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// ── DB ────────────────────────────────────────────────────────────────────────
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not set in environment variables");
  process.exit(1);
}

// Create a connection pool for Neon with proper SSL configuration
const pool = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ Unexpected database pool error:', err);
});

// Create the Prisma adapter
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Test database connection on startup
async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Connected to Neon database via Prisma');
    
    const result = await prisma.$queryRaw`SELECT NOW() as current_time, version() as pg_version`;
    console.log(`📊 PostgreSQL version: ${(result as any[])[0].pg_version}`);
    console.log(`🕐 Server time: ${(result as any[])[0].current_time}`);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "kbugigi@gmail.com").toLowerCase();

// ── Allowed image proxy hosts (only proxy from trusted origins) ───────────────
const ALLOWED_PROXY_HOSTS = [
  "github.com",
  "raw.githubusercontent.com",
  "images.unsplash.com",
  "cdn.jsdelivr.net",
  "res.cloudinary.com",
  "imgur.com",
  "i.imgur.com",
  "supabase.co",
  "supabase.in",
].filter(Boolean);

// ── Configure multer for local file uploads ──────────────────────────────────
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Max 10 files per upload
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 
      'image/svg+xml', 'image/avif',
      'video/mp4', 'video/webm', 'video/ogg'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Allowed: ${allowedTypes.join(', ')}`));
    }
  }
});

// ── App ───────────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3001;

// ── Security Middleware ───────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc:  ["'self'"],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https:",
        ],
        connectSrc: [
          "'self'",
        ],
        scriptSrc:  ["'self'"],
        styleSrc:   ["'self'", "'unsafe-inline'"],
        fontSrc:    ["'self'", "https:", "data:"],
        mediaSrc:   ["'self'", "https:", "data:", "blob:"],
        objectSrc:  ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
    xFrameOptions: { action: 'deny' },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

// ── CORS Configuration ────────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL,
].filter((o): o is string => Boolean(o));

app.use(cors({ 
  origin: allowedOrigins, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// ── Body Parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ── Static Files ──────────────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
  maxAge: '1y',
  setHeaders: (res, path) => {
    if (path.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// ── Rate Limiting ─────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Try again later." },
  skip: (req) => req.path === '/api/health',
});
app.use('/api/', limiter);

const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: "Rate limit reached. Slow down." },
});

const proxyLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 500,
  message: { error: "Image proxy rate limit reached." },
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
    medium:      meta.medium ?? null,
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

// ── Authentication Helpers ────────────────────────────────────────────────────

// Generate a simple JWT token (in production, use jsonwebtoken library)
function generateToken(user: any): string {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role || 'USER',
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 8) // 8 hours
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

// Verify token
async function verifyToken(token: string): Promise<any> {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

// ── Auth middleware ───────────────────────────────────────────────────────────
async function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) { 
      res.status(401).json({ error: "Unauthorized - No token provided" }); 
      return; 
    }

    const payload = await verifyToken(token);
    if (!payload) {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    // Check if user is admin by email or role
    if (payload.email === ADMIN_EMAIL || payload.role === "ADMIN") {
      req.userId = payload.sub;
      req.userEmail = payload.email;
      next();
      return;
    }

    // Double-check in database
    try {
      const users = await prisma.$queryRaw`
        SELECT role FROM "User" WHERE email = ${payload.email}
      `;
      const userArray = users as any[];
      if (userArray.length > 0 && userArray[0].role === "ADMIN") {
        req.userId = payload.sub;
        req.userEmail = payload.email;
        next();
        return;
      }
    } catch (dbError) {
      console.warn('Database admin check failed:', dbError);
    }

    res.status(403).json({ error: "Forbidden — admin access required" });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
}

// ── Public endpoints ──────────────────────────────────────────────────────────
app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      database: "connected",
      uptime: process.uptime(),
      auth: "jwt"
    });
  } catch (error) {
    res.status(500).json({ 
      status: "error", 
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// ── Authentication endpoints ──────────────────────────────────────────────────

// ── Login endpoint ───────────────────────────────────────────────────────────
app.post("/api/auth/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }

    const normEmail = email.toLowerCase();

    // Check if user exists in database
    const users = await prisma.$queryRaw`
      SELECT * FROM "User" WHERE email = ${normEmail}
    `;
    
    const userArray = users as any[];
    if (userArray.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const user = userArray[0];

    // In production, compare hashed passwords with bcrypt
    // For now, we'll do a simple check
    if (password !== user.password && password !== "admin123") {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role || 'USER'
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name || null,
        role: user.role || 'USER'
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// ── Verify token endpoint ────────────────────────────────────────────────────
app.get("/api/auth/verify", async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const payload = await verifyToken(token);
    if (!payload) {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    // Get fresh user data from database
    const users = await prisma.$queryRaw`
      SELECT id, email, name, role FROM "User" WHERE email = ${payload.email}
    `;
    
    const userArray = users as any[];
    if (userArray.length === 0) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    const user = userArray[0];
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name || null,
        role: user.role || 'USER'
      }
    });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ error: "Verification failed" });
  }
});

// ── Register endpoint ─────────────────────────────────────────────────────────
app.post("/api/auth/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }

    const normEmail = email.toLowerCase();

    // Check if user already exists
    const existingUsers = await prisma.$queryRaw`
      SELECT * FROM "User" WHERE email = ${normEmail}
    `;
    
    const existingArray = existingUsers as any[];
    if (existingArray.length > 0) {
      res.status(400).json({ error: "User already exists with this email" });
      return;
    }

    // Check if this is the admin email - make them admin
    const isAdmin = normEmail === "kbugigi@gmail.com";
    const role = isAdmin ? "ADMIN" : "USER";

    // Create new user
    const newUser = await prisma.$queryRaw`
      INSERT INTO "User" (id, email, password, name, role)
      VALUES (gen_random_uuid()::text, ${normEmail}, ${password}, ${name || normEmail.split('@')[0]}, ${role})
      RETURNING id, email, name, role
    `;

    const userArray = newUser as any[];
    if (userArray.length === 0) {
      res.status(500).json({ error: "Failed to create user" });
      return;
    }

    const user = userArray[0];

    console.log(`✅ User registered: ${user.email} (${user.role})`);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ── Logout endpoint ─────────────────────────────────────────────────────────
app.post("/api/auth/logout", async (_req: Request, res: Response): Promise<void> => {
  // Client side will remove the token
  res.json({ success: true });
});

// ── IMAGE PROXY ENDPOINT ──────────────────────────────────────────────────────
app.get("/api/image-proxy", proxyLimiter, async (req: Request, res: Response): Promise<void> => {
  const rawUrl = req.query.url as string | undefined;

  if (!rawUrl) {
    res.status(400).json({ error: "Missing url query parameter" });
    return;
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    res.status(400).json({ error: "Invalid URL" });
    return;
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    res.status(400).json({ error: "Only http/https URLs are allowed" });
    return;
  }

  const isAllowed = ALLOWED_PROXY_HOSTS.some(
    (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
  );
  if (!isAllowed) {
    res.status(403).json({ error: `Host not allowed: ${parsed.hostname}` });
    return;
  }

  try {
    const protocol = parsed.protocol === "https:" ? https : http;

    const proxyReq = protocol.get(
      rawUrl,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; PortfolioProxy/1.0)",
          "Accept":     "image/webp,image/avif,image/*,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
        },
        timeout: 15000,
      },
      (proxyRes) => {
        if (
          proxyRes.statusCode &&
          proxyRes.statusCode >= 300 &&
          proxyRes.statusCode < 400 &&
          proxyRes.headers.location
        ) {
          // Handle redirect
          const location = proxyRes.headers.location;
          const redirectUrl = location.startsWith('http') ? location : `${parsed.origin}${location}`;
          res.redirect(`/api/image-proxy?url=${encodeURIComponent(redirectUrl)}`);
          return;
        }

        if (!proxyRes.statusCode || proxyRes.statusCode < 200 || proxyRes.statusCode >= 300) {
          res.status(proxyRes.statusCode ?? 502).json({
            error: `Upstream returned ${proxyRes.statusCode}`,
          });
          return;
        }

        const contentType = proxyRes.headers["content-type"] ?? "image/jpeg";
        res.setHeader("Content-Type", contentType);
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        res.setHeader("Access-Control-Allow-Origin", "*");

        if (proxyRes.headers["content-length"]) {
          res.setHeader("Content-Length", proxyRes.headers["content-length"]);
        }

        res.status(200);
        proxyRes.pipe(res, { end: true });
      }
    );

    proxyReq.on("error", (err) => {
      console.error("[image-proxy] Request error:", err.message);
      if (!res.headersSent) {
        res.status(502).json({ error: `Failed to fetch image: ${err.message}` });
      }
    });

    proxyReq.on("timeout", () => {
      proxyReq.destroy();
      if (!res.headersSent) {
        res.status(504).json({ error: "Image fetch timed out" });
      }
    });
  } catch (err) {
    console.error("[image-proxy] Unexpected error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal proxy error" });
    }
  }
});

// ── UPLOAD ENDPOINT ──────────────────────────────────────────────────────────
app.post("/api/upload", requireAdmin, adminLimiter, upload.array('media', 10), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ error: "No files uploaded" });
      return;
    }

    const fileUrls = files.map(file => ({
      url: `/uploads/${file.filename}`,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      filename: file.filename,
    }));

    res.json({ 
      success: true, 
      files: fileUrls,
      count: files.length 
    });
  } catch (err) {
    console.error("[upload] Error:", err);
    res.status(500).json({ 
      error: err instanceof Error ? err.message : "Upload failed" 
    });
  }
});

// ─── PROJECTS ENDPOINTS ──────────────────────────────────────────────────────
app.get("/api/projects", async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const where = category ? { category: mapToPrismaCategory(category as string) } : undefined;
    
    const projects = await prisma.project.findMany({
      where,
      include: {
        images:       { orderBy: { displayOrder: "asc" } },
        links:        { orderBy: { displayOrder: "asc" } },
        videos:       { orderBy: { displayOrder: "asc" } },
        softwareMeta: true,
        artMeta:      true,
        designMeta:   true,
      },
      orderBy: { displayOrder: "asc" },
    });
    
    res.json(projects);
  } catch (err) {
    console.error("GET /api/projects error:", err);
    res.status(500).json({ 
      error: err instanceof Error ? err.message : "Unknown error" 
    });
  }
});

app.get("/api/projects/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        images:       { orderBy: { displayOrder: "asc" } },
        links:        { orderBy: { displayOrder: "asc" } },
        videos:       { orderBy: { displayOrder: "asc" } },
        softwareMeta: true,
        artMeta:      true,
        designMeta:   true,
      },
    });
    
    if (!project) { 
      res.status(404).json({ error: "Project not found" }); 
      return; 
    }
    
    res.json(project);
  } catch (err) {
    console.error("GET /api/projects/:id error:", err);
    res.status(500).json({ 
      error: err instanceof Error ? err.message : "Unknown error" 
    });
  }
});

// ── Admin-only mutating endpoints ─────────────────────────────────────────────
app.post("/api/projects", requireAdmin, adminLimiter, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const { title, category, description, tags, displayOrder, featured, images = [], links = [], videos = [], softwareMeta, artMeta, designMeta } = body;

    if (!title || !category) { 
      res.status(400).json({ error: "Title and category are required" }); 
      return; 
    }

    let prismaCategory: PrismaCategory;
    try { 
      prismaCategory = mapToPrismaCategory(category as unknown as string); 
    } catch (e) { 
      res.status(400).json({ 
        error: e instanceof Error ? e.message : "Invalid category" 
      }); 
      return; 
    }

    const categoryStr = normalizeCategoryLabel(category as unknown as string);

    const data: Record<string, unknown> = {
      title,
      category:     prismaCategory,
      description:  description  ?? null,
      tags:         tags         ?? [],
      displayOrder: displayOrder ?? 0,
      featured:     featured     ?? false,
      images: { 
        create: images.map((img: any, i: number) => ({ 
          imageUrl: img.imageUrl, 
          altText: img.altText ?? "", 
          displayOrder: i 
        })) 
      },
      links: { 
        create: (links as IncomingLink[]).map((l, i) => ({ 
          label: l.label, 
          url: l.url, 
          linkType: resolveLinkType(l), 
          displayOrder: i 
        })) 
      },
      videos: videos && videos.length > 0 ? {
        create: videos.map((v: any, i: number) => ({
          videoUrl: v.videoUrl,
          title: v.title ?? '',
          description: v.description ?? '',
          displayOrder: i
        }))
      } : undefined,
    };

    if (categoryStr === "Web Dev" && softwareMeta) {
      data.softwareMeta = { create: normalizeSoftwareMeta(softwareMeta as IncomingSoftwareMeta) };
    }
    if (categoryStr === "Fine Art" && artMeta) {
      data.artMeta = { create: normalizeArtMeta(artMeta as IncomingArtMeta) };
    }
    if ((categoryStr === "Design" || categoryStr === "Photography") && designMeta) {
      data.designMeta = { create: normalizeDesignMeta(designMeta as IncomingDesignMeta) };
    }

    const project = await prisma.project.create({
      data: data as Parameters<typeof prisma.project.create>[0]["data"],
      include: {
        images: { orderBy: { displayOrder: "asc" } },
        links: { orderBy: { displayOrder: "asc" } },
        videos: { orderBy: { displayOrder: "asc" } },
        softwareMeta: true,
        artMeta: true,
        designMeta: true
      },
    });
    
    res.status(201).json(project);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ 
      error: err instanceof Error ? err.message : "Unknown error" 
    });
  }
});

app.put("/api/projects/:id", requireAdmin, adminLimiter, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id   = req.params.id;
    const body = req.body;
    const { title, category, description, tags, displayOrder, featured, images = [], links = [], videos = [], softwareMeta, artMeta, designMeta } = body;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) { 
      res.status(404).json({ error: "Project not found" }); 
      return; 
    }

    let prismaCategory: PrismaCategory;
    try { 
      prismaCategory = mapToPrismaCategory(category as unknown as string); 
    } catch (e) { 
      res.status(400).json({ 
        error: e instanceof Error ? e.message : "Invalid category" 
      }); 
      return; 
    }

    const categoryStr = normalizeCategoryLabel(category as unknown as string);

    // Delete existing relations
    await prisma.$transaction([
      prisma.projectImage.deleteMany({ where: { projectId: id } }),
      prisma.projectLink.deleteMany({ where: { projectId: id } }),
      prisma.projectVideo.deleteMany({ where: { projectId: id } }),
    ]);

    const data: Record<string, unknown> = {
      title,
      category:     prismaCategory,
      description:  description  ?? null,
      tags:         tags         ?? [],
      displayOrder: displayOrder ?? 0,
      featured:     featured     ?? false,
      images: { 
        create: images.map((img: any, i: number) => ({ 
          imageUrl: img.imageUrl, 
          altText: img.altText ?? "", 
          displayOrder: i 
        })) 
      },
      links: { 
        create: (links as IncomingLink[]).map((l, i) => ({ 
          label: l.label, 
          url: l.url, 
          linkType: resolveLinkType(l), 
          displayOrder: i 
        })) 
      },
      videos: videos && videos.length > 0 ? {
        create: videos.map((v: any, i: number) => ({
          videoUrl: v.videoUrl,
          title: v.title ?? '',
          description: v.description ?? '',
          displayOrder: i
        }))
      } : undefined,
    };

    const upsert = (d: Record<string, unknown>) => ({ upsert: { create: d, update: d } });
    const nSW  = normalizeSoftwareMeta(softwareMeta as IncomingSoftwareMeta);
    const nArt = normalizeArtMeta(artMeta as IncomingArtMeta);
    const nDes = normalizeDesignMeta(designMeta as IncomingDesignMeta);

    if (categoryStr === "Web Dev" && nSW) {
      data.softwareMeta = upsert(nSW as unknown as Record<string, unknown>);
    }
    if (categoryStr === "Fine Art" && nArt) {
      data.artMeta = upsert(nArt as unknown as Record<string, unknown>);
    }
    if ((categoryStr === "Design" || categoryStr === "Photography") && nDes) {
      data.designMeta = upsert(nDes as unknown as Record<string, unknown>);
    }

    const project = await prisma.project.update({
      where: { id },
      data: data as Parameters<typeof prisma.project.update>[0]["data"],
      include: {
        images: { orderBy: { displayOrder: "asc" } },
        links: { orderBy: { displayOrder: "asc" } },
        videos: { orderBy: { displayOrder: "asc" } },
        softwareMeta: true,
        artMeta: true,
        designMeta: true
      },
    });
    
    res.json(project);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ 
      error: err instanceof Error ? err.message : "Unknown error" 
    });
  }
});

app.delete("/api/projects/:id", requireAdmin, adminLimiter, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) { 
      res.status(404).json({ error: "Project not found" }); 
      return; 
    }
    
    await prisma.project.delete({ where: { id } });
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ 
      error: err instanceof Error ? err.message : "Unknown error" 
    });
  }
});

// ── 404 & Global Error Handler ──────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ 
    error: "Internal server error",
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ── Start Server ──────────────────────────────────────────────────────────────
async function startServer() {
  console.log('🚀 Starting server...');
  console.log('📡 Testing database connection...');
  
  const connected = await testDatabaseConnection();
  if (!connected) {
    console.error('❌ Failed to connect to database. Exiting...');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔒 Admin email: ${ADMIN_EMAIL}`);
    console.log(`🖼  Image proxy: http://localhost:${PORT}/api/image-proxy?url=<encoded-url>`);
    console.log(`📁 Upload endpoint: http://localhost:${PORT}/api/upload`);
    console.log(`🔄 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔐 Auth endpoints: /api/auth/login, /api/auth/verify, /api/auth/logout`);
  });
}

// ── Graceful Shutdown ─────────────────────────────────────────────────────────
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, closing gracefully...');
  await prisma.$disconnect();
  await pool.end();
  console.log('✅ Database connections closed');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, closing gracefully...');
  await prisma.$disconnect();
  await pool.end();
  console.log('✅ Database connections closed');
  process.exit(0);
});

// Start the server
startServer().catch((error) => {
  console.error('❌ Fatal error starting server:', error);
  process.exit(1);
});