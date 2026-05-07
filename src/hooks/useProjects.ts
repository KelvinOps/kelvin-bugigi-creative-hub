// src/hooks/useProjects.ts
import { useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { ProjectFormData, Project } from "@/types/project";

const API = (import.meta.env.VITE_API_URL || "http://localhost:3001/api").replace(/\/$/, "");

export type { ProjectFormData };

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT — Run this SQL in Supabase SQL Editor once to fix your DB:
//
//   -- 1. Find exact Category enum values:
//   SELECT enumlabel FROM pg_enum
//   JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
//   WHERE typname = 'Category' ORDER BY enumsortorder;
//
//   -- 2. Add Photography if missing:
//   ALTER TYPE "Category" ADD VALUE IF NOT EXISTS 'PHOTOGRAPHY';
//   -- OR if your enum uses mapped strings:
//   ALTER TYPE "Category" ADD VALUE IF NOT EXISTS 'Photography';
//
//   -- 3. Add default UUID generation to meta tables (fixes "null value in id"):
//   ALTER TABLE software_meta ALTER COLUMN id SET DEFAULT gen_random_uuid();
//   ALTER TABLE art_meta      ALTER COLUMN id SET DEFAULT gen_random_uuid();
//   ALTER TABLE design_meta   ALTER COLUMN id SET DEFAULT gen_random_uuid();
// ─────────────────────────────────────────────────────────────────────────────

// ── Normalise any raw category string to a stable UI label ───────────────────
function toUiLabel(raw: string): string {
  const map: Record<string, string> = {
    "WEB_DEV":     "Web Dev",
    "DESIGN":      "Design",
    "FINE_ART":    "Fine Art",
    "PHOTOGRAPHY": "Photography",
    // @map values (what Prisma stores in DB when @map is applied)
    "Web Dev":     "Web Dev",
    "Design":      "Design",
    "Fine Art":    "Fine Art",
    "Photography": "Photography",
  };
  return map[raw] ?? raw;
}

// ── All candidate DB values to probe per category — most likely first ─────────
// We try each one with a zero-row SELECT to find which the DB accepts.
const CATEGORY_CANDIDATES: Record<string, string[]> = {
  "Web Dev":     ["WEB_DEV",     "Web Dev"],
  "Design":      ["DESIGN",      "Design"],
  "Fine Art":    ["FINE_ART",    "Fine Art"],
  "Photography": ["PHOTOGRAPHY", "Photography"],
};

// ── ArtMedium → exact DB value ───────────────────────────────────────────────
// MIXED_MEDIA has @map("Mixed Media") in schema → DB stores "Mixed Media".
// All others have no @map → DB stores the key name directly.
const ART_MEDIUM_TO_DB: Record<string, string> = {
  PENCIL:      "PENCIL",
  GRAPHITE:    "GRAPHITE",
  BALLPOINT:   "BALLPOINT",
  OIL:         "OIL",
  ACRYLIC:     "ACRYLIC",
  WATERCOLOR:  "WATERCOLOR",
  MIXED_MEDIA: "Mixed Media",
  OTHER:       "OTHER",
};

// ── Runtime enum probe ───────────────────────────────────────────────────────
// Tries each candidate value against the live DB with a zero-row SELECT.
// PostgreSQL rejects invalid enum values immediately, so the first one that
// returns no error (or a non-enum error) is the accepted value.
// Results are cached for the session lifetime.
const resolvedCategoryCache: Record<string, string> = {};

async function resolveCategoryForDB(rawCategory: string): Promise<string> {
  const uiLabel = toUiLabel(rawCategory);

  if (resolvedCategoryCache[uiLabel]) {
    return resolvedCategoryCache[uiLabel];
  }

  const candidates = CATEGORY_CANDIDATES[uiLabel];
  if (!candidates) {
    // Unknown category — return as-is and let the real DB error surface
    console.warn(`[useProjects] Unknown category "${rawCategory}" — no candidates to probe`);
    return rawCategory;
  }

  for (const candidate of candidates) {
    const { error } = await supabase
      .from("projects")
      .select("id")
      .eq("category", candidate)
      .limit(0);

    const isEnumError =
      error?.message?.includes("invalid input value for enum") ||
      error?.message?.includes("invalid input syntax for type");

    if (!error || !isEnumError) {
      console.log(`[useProjects] ✓ "${uiLabel}" → DB enum value: "${candidate}"`);
      resolvedCategoryCache[uiLabel] = candidate;
      return candidate;
    }

    console.warn(`[useProjects] "${candidate}" rejected — trying next...`);
  }

  // All candidates failed — throw a clear error so the user knows what to fix
  throw new Error(
    `Category "${uiLabel}" is not a valid enum value in your database. ` +
    `Run this SQL in Supabase SQL Editor to fix it:\n` +
    `ALTER TYPE "Category" ADD VALUE IF NOT EXISTS 'PHOTOGRAPHY';\n` +
    `(or 'Photography' — check which style matches your existing enum values)`
  );
}

// ── Fetch existing meta row IDs (needed for upsert without DB-level defaults) ─
async function getExistingMetaId(
  table: "software_meta" | "art_meta" | "design_meta",
  projectId: string
): Promise<string | null> {
  const { data } = await supabase
    .from(table)
    .select("id")
    .eq("project_id", projectId)
    .maybeSingle();
  return (data as { id: string } | null)?.id ?? null;
}

// ── Direct Supabase save (fallback when backend is unreachable) ───────────────
async function saveProjectToSupabase(
  data: ProjectFormData,
  existingId?: string
): Promise<Project> {
  // Resolve the category to whichever string the DB enum actually accepts
  const category = await resolveCategoryForDB(data.category as unknown as string);
  const uiLabel  = toUiLabel(data.category as unknown as string);

  const now = new Date().toISOString();
  const projectPayload = {
    title:         data.title,
    category,
    description:   data.description  ?? null,
    tags:          data.tags          ?? [],
    display_order: data.displayOrder  ?? 0,
    featured:      data.featured      ?? false,
    updated_at:    now,
  };

  let projectId: string;

  // ── 1. Upsert project row ──────────────────────────────────────────────────
  if (existingId) {
    const { data: updated, error } = await supabase
      .from("projects")
      .update(projectPayload)
      .eq("id", existingId)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    projectId = updated.id;

    // Remove old child rows before re-inserting
    await supabase.from("project_images").delete().eq("project_id", projectId);
    await supabase.from("project_links").delete().eq("project_id", projectId);
  } else {
    const newId = crypto.randomUUID();
    const { data: created, error } = await supabase
      .from("projects")
      .insert({ id: newId, created_at: now, ...projectPayload })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    projectId = created.id;
  }

  // ── 2. Insert images ───────────────────────────────────────────────────────
  if (data.images?.length) {
    const imageRows = data.images.map((img, i) => ({
      id:            crypto.randomUUID(),   // explicit UUID — avoids null-id errors
      project_id:    projectId,
      image_url:     img.imageUrl,
      alt_text:      img.altText ?? "",
      display_order: i,
      created_at:    now,
    }));
    const { error } = await supabase.from("project_images").insert(imageRows);
    if (error) throw new Error(`Images: ${error.message}`);
  }

  // ── 3. Insert links ────────────────────────────────────────────────────────
  if (data.links?.length) {
    const linkRows = (
      data.links as Array<{
        label: string;
        url: string;
        linkType?: string;
        link_type?: string;
      }>
    ).map((l, i) => ({
      id:            crypto.randomUUID(),   // explicit UUID
      project_id:    projectId,
      label:         l.label,
      url:           l.url,
      // LinkType @map values are all lowercase: live, repo, shop, demo, other
      link_type:     (l.linkType ?? l.link_type ?? "other").toLowerCase(),
      display_order: i,
      created_at:    now,
    }));
    const { error } = await supabase.from("project_links").insert(linkRows);
    if (error) throw new Error(`Links: ${error.message}`);
  }

  // ── 4. Upsert category-specific meta ──────────────────────────────────────
  // We always supply an explicit `id` UUID because the meta tables may not have
  // gen_random_uuid() set as the column default in Supabase (even if Prisma
  // schema says @default(uuid())). We fetch the existing row id first so that
  // re-saving an existing project reuses the same meta row id.

  if (uiLabel === "Web Dev" && data.softwareMeta) {
    const m = data.softwareMeta;
    // Fetch existing meta id (null if new project)
    const existingMetaId = existingId
      ? await getExistingMetaId("software_meta", projectId)
      : null;
    const { error } = await supabase.from("software_meta").upsert({
      id:               existingMetaId ?? crypto.randomUUID(),
      project_id:       projectId,
      tech_stack:       m.techStack       ?? [],
      live_url:         m.liveUrl         ?? null,
      repo_url:         m.repoUrl         ?? null,
      lighthouse_score: m.lighthouseScore ?? null,
      page_load_ms:     m.pageLoadMs      ?? null,
      monthly_visitors: m.monthlyVisitors ?? null,
      uptime:           m.uptime          ?? null,
      analytics_note:   m.analyticsNote   ?? null,
      created_at:       now,
    }, { onConflict: "project_id" });
    if (error) throw new Error(`SoftwareMeta: ${error.message}`);
  }

  if (uiLabel === "Fine Art" && data.artMeta) {
    const m = data.artMeta;
    const existingMetaId = existingId
      ? await getExistingMetaId("art_meta", projectId)
      : null;
    // Normalise medium: "Mixed Media" → "Mixed Media" (via ART_MEDIUM_TO_DB)
    const rawMedium = (m.medium ?? "OTHER").toUpperCase().replace(/ /g, "_");
    const medium    = ART_MEDIUM_TO_DB[rawMedium] ?? rawMedium;
    const { error } = await supabase.from("art_meta").upsert({
      id:           existingMetaId ?? crypto.randomUUID(),
      project_id:   projectId,
      medium,
      dimensions:   m.dimensions  ?? null,
      year:         m.year        ?? null,
      is_available: m.isAvailable ?? true,
      price:        m.price       ?? null,
      shop_url:     m.shopUrl     ?? null,
      created_at:   now,
    }, { onConflict: "project_id" });
    if (error) throw new Error(`ArtMeta: ${error.message}`);
  }

  if ((uiLabel === "Design" || uiLabel === "Photography") && data.designMeta) {
    const m = data.designMeta;
    const existingMetaId = existingId
      ? await getExistingMetaId("design_meta", projectId)
      : null;
    const { error } = await supabase.from("design_meta").upsert({
      id:          existingMetaId ?? crypto.randomUUID(),
      project_id:  projectId,
      software:    m.software    ?? [],
      client_name: m.clientName  ?? null,
      year:        m.year        ?? null,
      behance_url: m.behanceUrl  ?? null,
      created_at:  now,
    }, { onConflict: "project_id" });
    if (error) throw new Error(`DesignMeta: ${error.message}`);
  }

  // ── 5. Return minimal Project object ──────────────────────────────────────
  return { id: projectId, ...projectPayload } as unknown as Project;
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useProjects() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const getAuthHeaders = useCallback((): HeadersInit => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept":       "application/json",
    };
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }
    return headers;
  }, [session]);

  // ── fetchProjects ────────────────────────────────────────────────────────
  const fetchProjects = useCallback(async (category?: string): Promise<Project[]> => {
    setLoading(true);
    setError(null);
    try {
      const url = category
        ? `${API}/projects?category=${encodeURIComponent(category)}`
        : `${API}/projects`;
      const res = await fetch(url, {
        method: "GET",
        headers: getAuthHeaders(),
        mode: "cors",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`${res.status}`);
      return await res.json();
    } catch {
      try {
        const { data, error: sbErr } = await supabase
          .from("projects")
          .select(`*, project_images(*), project_links(*), software_meta(*), art_meta(*), design_meta(*)`)
          .order("display_order");
        if (sbErr) throw new Error(sbErr.message);
        return (data ?? []) as unknown as Project[];
      } catch (e2) {
        const msg = e2 instanceof Error ? e2.message : "Unknown error";
        setError(msg);
        return [];
      }
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  // ── fetchProjectById ─────────────────────────────────────────────────────
  const fetchProjectById = useCallback(async (id: string): Promise<Project | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/projects/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
        mode: "cors",
        credentials: "include",
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      const { data } = await supabase
        .from("projects")
        .select(`*, project_images(*), project_links(*), software_meta(*), art_meta(*), design_meta(*)`)
        .eq("id", id)
        .single();
      return data as unknown as Project | null;
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  // ── createProject ────────────────────────────────────────────────────────
  const createProject = useCallback(async (data: ProjectFormData) => {
    setLoading(true);
    setError(null);
    try {
      // Try backend first — Prisma handles all enum/mapping automatically
      const res = await fetch(`${API}/projects`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
        mode: "cors",
        credentials: "include",
      });
      if (res.ok) {
        const result = await res.json();
        return { data: result as Project, error: null };
      }
      const errText = await res.text();
      let errMsg = `Server error (${res.status})`;
      try { errMsg = JSON.parse(errText).error ?? errMsg; } catch { /* ignore */ }
      throw new Error(errMsg);
    } catch (backendErr) {
      // Backend unreachable — fall back to direct Supabase write
      console.warn("[useProjects] Backend unreachable, saving directly to Supabase:", backendErr);
      try {
        const result = await saveProjectToSupabase(data);
        return { data: result, error: null };
      } catch (sbErr) {
        const msg = sbErr instanceof Error ? sbErr.message : "Unknown error";
        setError(msg);
        return { data: null, error: msg };
      }
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  // ── updateProject ────────────────────────────────────────────────────────
  const updateProject = useCallback(async (id: string, data: ProjectFormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/projects/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
        mode: "cors",
        credentials: "include",
      });
      if (res.ok) {
        return { data: await res.json() as Project, error: null };
      }
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || "Failed to update project");
    } catch (backendErr) {
      console.warn("[useProjects] Backend unreachable, updating directly in Supabase:", backendErr);
      try {
        const result = await saveProjectToSupabase(data, id);
        return { data: result, error: null };
      } catch (sbErr) {
        const msg = sbErr instanceof Error ? sbErr.message : "Unknown error";
        setError(msg);
        return { data: null, error: msg };
      }
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  // ── deleteProject ────────────────────────────────────────────────────────
  const deleteProject = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/projects/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        mode: "cors",
        credentials: "include",
      });
      if (res.ok) return { error: null };
      throw new Error("Backend delete failed");
    } catch {
      // Cascade delete handles child rows (images, links, meta)
      const { error: sbErr } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);
      if (sbErr) {
        setError(sbErr.message);
        return { error: sbErr.message };
      }
      return { error: null };
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  return {
    fetchProjects,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject,
    loading,
    error,
  };
}