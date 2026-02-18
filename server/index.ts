// server/index.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { PrismaClient, Category as PrismaCategory, LinkType as PrismaLinkType } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { ProjectFormData, Category } from "../src/types/project";

dotenv.config();

// Extend Express Request type to include userId
interface AuthenticatedRequest extends Request {
  userId?: string;
}

// Prisma requires a driver adapter — we use pg
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set in .env");
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Supabase admin for verifying JWTs
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) throw new Error("VITE_SUPABASE_URL is not set in .env");
if (!supabaseServiceRole) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set in .env");

const supabase = createClient(
  supabaseUrl,
  supabaseServiceRole
);

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter((origin): origin is string => Boolean(origin));

app.use(cors({ 
  origin: allowedOrigins,
  credentials: true 
}));
app.use(express.json({ limit: "10mb" }));

// Helper function to map frontend category to Prisma category
function mapToPrismaCategory(category: Category): PrismaCategory {
  const categoryMap: Record<Category, PrismaCategory> = {
    "Web Dev": PrismaCategory.WEB_DEV,
    "Design": PrismaCategory.DESIGN,
    "Fine Art": PrismaCategory.FINE_ART
  };
  return categoryMap[category];
}

// Helper function to map frontend link type to Prisma link type
function mapToPrismaLinkType(linkType: string): PrismaLinkType {
  const typeMap: Record<string, PrismaLinkType> = {
    "live": PrismaLinkType.LIVE,
    "repo": PrismaLinkType.REPO,
    "shop": PrismaLinkType.SHOP,
    "demo": PrismaLinkType.DEMO,
    "other": PrismaLinkType.OTHER
  };
  return typeMap[linkType.toLowerCase()] || PrismaLinkType.OTHER;
}

// Types for incoming metadata from requests
interface IncomingSoftwareMeta {
  tech_stack?: string[];
  techStack?: string[];
  live_url?: string | null;
  liveUrl?: string | null;
  repo_url?: string | null;
  repoUrl?: string | null;
  lighthouse_score?: number | null;
  lighthouseScore?: number | null;
  page_load_ms?: number | null;
  pageLoadMs?: number | null;
  monthly_visitors?: number | null;
  monthlyVisitors?: number | null;
  uptime?: number | null;
  analytics_note?: string | null;
  analyticsNote?: string | null;
}

interface IncomingArtMeta {
  medium?: string;
  dimensions?: string | null;
  year?: number | null;
  is_available?: boolean;
  isAvailable?: boolean;
  price?: number | null;
  shop_url?: string | null;
  shopUrl?: string | null;
}

interface IncomingDesignMeta {
  software?: string[];
  client_name?: string | null;
  clientName?: string | null;
  year?: number | null;
  behance_url?: string | null;
  behanceUrl?: string | null;
}

// Auth middleware
async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Unauthorized - No token provided" });
      return;
    }
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }
    
    req.userId = user.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
}

// GET all projects
app.get("/api/projects", async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    
    const where = category 
      ? { category: mapToPrismaCategory(category as Category) }
      : undefined;
    
    const projects = await prisma.project.findMany({
      where,
      include: { 
        images: { orderBy: { displayOrder: "asc" } }, 
        links: { orderBy: { displayOrder: "asc" } }
      },
      orderBy: { displayOrder: "asc" },
    });
    
    res.json(projects);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

// GET one project
app.get("/api/projects/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: { 
        images: { orderBy: { displayOrder: "asc" } }, 
        links: { orderBy: { displayOrder: "asc" } }
      },
    });
    
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    
    res.json(project);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

// Normalizer functions
function normalizeSoftwareMeta(meta: IncomingSoftwareMeta | undefined) {
  if (!meta) return undefined;
  
  return {
    techStack: meta.tech_stack ?? meta.techStack ?? [],
    liveUrl: meta.live_url ?? meta.liveUrl ?? null,
    repoUrl: meta.repo_url ?? meta.repoUrl ?? null,
    lighthouseScore: meta.lighthouse_score ?? meta.lighthouseScore ?? null,
    pageLoadMs: meta.page_load_ms ?? meta.pageLoadMs ?? null,
    monthlyVisitors: meta.monthly_visitors ?? meta.monthlyVisitors ?? null,
    uptime: meta.uptime ?? null,
    analyticsNote: meta.analytics_note ?? meta.analyticsNote ?? null,
  };
}

function normalizeArtMeta(meta: IncomingArtMeta | undefined) {
  if (!meta) return undefined;
  
  return {
    medium: (meta.medium ?? "OTHER").toUpperCase().replace(/ /g, "_"),
    dimensions: meta.dimensions ?? null,
    year: meta.year ?? null,
    isAvailable: meta.is_available ?? meta.isAvailable ?? true,
    price: meta.price ?? null,
    shopUrl: meta.shop_url ?? meta.shopUrl ?? null,
  };
}

function normalizeDesignMeta(meta: IncomingDesignMeta | undefined) {
  if (!meta) return undefined;
  
  return {
    software: meta.software ?? [],
    clientName: meta.client_name ?? meta.clientName ?? null,
    year: meta.year ?? null,
    behanceUrl: meta.behance_url ?? meta.behanceUrl ?? null,
  };
}

// POST create project
app.post("/api/projects", requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const body = req.body as ProjectFormData;
    const { 
      title, 
      category, 
      description, 
      tags, 
      displayOrder, 
      featured, 
      images = [], 
      links = [], 
      softwareMeta, 
      artMeta, 
      designMeta 
    } = body;

    // Validate required fields
    if (!title || !category) {
      res.status(400).json({ error: "Title and category are required" });
      return;
    }

    // Normalize metadata
    const normalizedSoftwareMeta = softwareMeta ? normalizeSoftwareMeta(softwareMeta as any) : undefined;
    const normalizedArtMeta = artMeta ? normalizeArtMeta(artMeta as any) : undefined;
    const normalizedDesignMeta = designMeta ? normalizeDesignMeta(designMeta as any) : undefined;

    // Map category to Prisma enum
    const prismaCategory = mapToPrismaCategory(category);

    // Prepare data object
    const data: any = {
      title,
      category: prismaCategory,
      description: description ?? null,
      tags: tags ?? [],
      displayOrder: displayOrder ?? 0,
      featured: featured ?? false,
      images: {
        create: images.map((img, i) => ({
          imageUrl: img.imageUrl,
          altText: img.altText ?? "",
          displayOrder: i,
        })),
      },
      links: {
        create: links.map((l, i) => ({
          label: l.label,
          url: l.url,
          linkType: mapToPrismaLinkType(l.linkType),
          displayOrder: i,
        })),
      },
    };

    // Add metadata based on category
    if (category === "Web Dev" && normalizedSoftwareMeta) {
      data.softwareMeta = { create: normalizedSoftwareMeta };
    }
    if (category === "Fine Art" && normalizedArtMeta) {
      data.artMeta = { create: normalizedArtMeta };
    }
    if (category === "Design" && normalizedDesignMeta) {
      data.designMeta = { create: normalizedDesignMeta };
    }

    // Create the project with relations
    const project = await prisma.project.create({
      data,
      include: { 
        images: { orderBy: { displayOrder: "asc" } }, 
        links: { orderBy: { displayOrder: "asc" } } 
      },
    });

    res.status(201).json(project);
  } catch (err: unknown) {
    console.error("Error creating project:", err);
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

// PUT update project
app.put("/api/projects/:id", requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const body = req.body as ProjectFormData;
    const { 
      title, 
      category, 
      description, 
      tags, 
      displayOrder, 
      featured, 
      images = [], 
      links = [], 
      softwareMeta, 
      artMeta, 
      designMeta 
    } = body;

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });

    if (!existingProject) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    // Normalize metadata
    const normalizedSoftwareMeta = softwareMeta ? normalizeSoftwareMeta(softwareMeta as any) : undefined;
    const normalizedArtMeta = artMeta ? normalizeArtMeta(artMeta as any) : undefined;
    const normalizedDesignMeta = designMeta ? normalizeDesignMeta(designMeta as any) : undefined;

    // Map category to Prisma enum
    const prismaCategory = mapToPrismaCategory(category);

    // Delete existing relations
    await prisma.$transaction([
      prisma.projectImage.deleteMany({ where: { projectId: id } }),
      prisma.projectLink.deleteMany({ where: { projectId: id } }),
    ]);

    // Prepare data object
    const data: any = {
      title,
      category: prismaCategory,
      description: description ?? null,
      tags: tags ?? [],
      displayOrder: displayOrder ?? 0,
      featured: featured ?? false,
      images: {
        create: images.map((img, i) => ({
          imageUrl: img.imageUrl,
          altText: img.altText ?? "",
          displayOrder: i,
        })),
      },
      links: {
        create: links.map((l, i) => ({
          label: l.label,
          url: l.url,
          linkType: mapToPrismaLinkType(l.linkType),
          displayOrder: i,
        })),
      },
    };

    // Add metadata based on category
    if (category === "Web Dev" && normalizedSoftwareMeta) {
      data.softwareMeta = { 
        upsert: { 
          create: normalizedSoftwareMeta, 
          update: normalizedSoftwareMeta 
        } 
      };
    }
    if (category === "Fine Art" && normalizedArtMeta) {
      data.artMeta = { 
        upsert: { 
          create: normalizedArtMeta, 
          update: normalizedArtMeta 
        } 
      };
    }
    if (category === "Design" && normalizedDesignMeta) {
      data.designMeta = { 
        upsert: { 
          create: normalizedDesignMeta, 
          update: normalizedDesignMeta 
        } 
      };
    }

    // Update the project with new relations
    const project = await prisma.project.update({
      where: { id },
      data,
      include: { 
        images: { orderBy: { displayOrder: "asc" } }, 
        links: { orderBy: { displayOrder: "asc" } } 
      },
    });

    res.json(project);
  } catch (err: unknown) {
    console.error("Error updating project:", err);
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

// DELETE project
app.delete("/api/projects/:id", requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });

    if (!existingProject) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    // Delete project (relations will be deleted automatically due to cascade)
    await prisma.project.delete({
      where: { id }
    });

    res.json({ success: true, message: "Project deleted successfully" });
  } catch (err: unknown) {
    console.error("Error deleting project:", err);
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response): void => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler for undefined routes
app.use((_req: Request, res: Response): void => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
});