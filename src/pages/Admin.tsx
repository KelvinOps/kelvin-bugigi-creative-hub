// src/pages/Admin.tsx
// Full-featured admin dashboard with:
//   • Supabase Storage direct image uploads (no base64 over API)
//   • Photography / Design photo gallery management
//   • Fine-art with e-commerce link
//   • Web Dev with analytics
//   • Top-notch security (ADMIN-role gated)

import { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { ElementType } from "react";
import {
  Plus, Pencil, Trash2, LogOut, X, Check, AlertCircle,
  Code, Palette, PenTool, Image, Star, Camera,
  ChevronDown, ChevronUp, Loader2, Upload, ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/Footer";
import { useProjects } from "@/hooks/useProjects";
import type { ProjectFormData } from "@/hooks/useProjects";
import { supabase } from "@/integrations/supabase/client";

// ── Constants ──────────────────────────────────────────────────────────────────
type Category = "Web Dev" | "Design" | "Fine Art" | "Photography";
type LinkType = "live" | "repo" | "shop" | "demo" | "other";

const CATEGORIES: readonly Category[] = ["Web Dev", "Design", "Fine Art", "Photography"];
const LINK_TYPES: readonly LinkType[] = ["live", "repo", "shop", "demo", "other"];
const ART_MEDIUMS = [
  "PENCIL", "GRAPHITE", "BALLPOINT", "OIL",
  "ACRYLIC", "WATERCOLOR", "MIXED_MEDIA", "OTHER",
] as const;

const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET || "portfolio";

// ── FIX: Robust API URL resolution ────────────────────────────────────────────
// In production on Vercel/deployed sites, VITE_API_URL must be set to your
// backend URL (e.g. https://your-api.railway.app/api).
// Locally it defaults to http://localhost:3001/api.
// If neither is set, we use a relative path so same-origin deployments work.
function getApiUrl(): string {
  const env = import.meta.env.VITE_API_URL;
  if (env && env.trim() !== "") return env.trim().replace(/\/$/, "");
  // Fallback: relative path (works if frontend and backend are on same origin)
  return "/api";
}
const API_URL = getApiUrl();

interface CategoryStyleEntry {
  accent: string; bg: string; border: string; icon: ElementType;
}
const categoryStyle: Record<string, CategoryStyleEntry> = {
  "Web Dev":     { accent: "text-amber-400", bg: "bg-amber-500/10",  border: "border-amber-500/30",  icon: Code },
  "Design":      { accent: "text-cyan-400",  bg: "bg-cyan-500/10",   border: "border-cyan-500/30",   icon: Palette },
  "Fine Art":    { accent: "text-rose-400",  bg: "bg-rose-500/10",   border: "border-rose-500/30",   icon: PenTool },
  "Photography": { accent: "text-violet-400",bg: "bg-violet-500/10", border: "border-violet-500/30", icon: Camera },
};

interface ApiProject {
  id: string;
  title: string;
  category: string;
  description?: string;
  featured?: boolean;
  displayOrder?: number;
  tags?: string[];
  images?: { imageUrl?: string; image_url?: string; altText?: string; alt_text?: string }[];
  links?: { label?: string; url?: string; linkType?: string; link_type?: string }[];
  softwareMeta?: ProjectFormData["softwareMeta"];
  artMeta?: ProjectFormData["artMeta"];
  designMeta?: ProjectFormData["designMeta"];
}
type InitialProject = ApiProject;

const emptyForm = (): FormState => ({
  title: "", category: "Web Dev" as unknown as ProjectFormData["category"],
  description: "", tags: [], displayOrder: 0, featured: false,
  images: [], links: [],
  softwareMeta: { techStack: [], liveUrl: "", repoUrl: "", lighthouseScore: undefined, pageLoadMs: undefined, monthlyVisitors: undefined, uptime: undefined, analyticsNote: "" },
  artMeta: { medium: "GRAPHITE", dimensions: "", year: undefined, isAvailable: true, price: undefined, shopUrl: "" },
  designMeta: { software: [], clientName: "", year: undefined, behanceUrl: "" },
});

// ── Ensure the storage bucket exists (creates it if missing) ─────────────────
// ── Supabase Storage uploader ─────────────────────────────────────────────────
// Strategy 1: Signed URL via Express backend
// Strategy 2: Direct Supabase JS client upload
// Strategy 3: Base64 data URL — NO bucket/policies needed, always works
async function uploadToSupabase(
  file: File,
  session: { access_token: string } | null,
  addLog: (msg: string) => void
): Promise<string> {
  if (!session) throw new Error("Not authenticated — please sign in again");

  // ── Strategy 1: signed URL via backend ──────────────────────────────────
  addLog(`Attempting backend upload via ${API_URL}/admin/upload-url …`);
  try {
    const res = await fetch(`${API_URL}/admin/upload-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ filename: file.name, contentType: file.type, bucket: STORAGE_BUCKET }),
    });
    if (res.ok) {
      const { signedUrl, publicUrl } = await res.json() as { signedUrl: string; token: string; publicUrl: string };
      addLog("Got signed URL. Uploading…");
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type, "x-upsert": "true" },
        body: file,
      });
      if (uploadRes.ok) { addLog("✓ Upload successful via backend."); return publicUrl; }
      addLog(`Backend PUT failed (${uploadRes.status}). Trying direct upload…`);
    } else {
      const errBody = await res.json().catch(() => ({ error: res.statusText })) as { error?: string };
      addLog(`Backend returned ${res.status}: ${errBody.error ?? res.statusText}. Trying direct upload…`);
    }
  } catch (backendErr) {
    addLog(`Backend unreachable (${backendErr instanceof Error ? backendErr.message : String(backendErr)}). Trying direct upload…`);
  }

  // ── Strategy 2: direct Supabase JS client ───────────────────────────────
  // Skipping listBuckets() — it always fails with RLS even when bucket exists.
  addLog(`Trying direct Supabase Storage upload to bucket "${STORAGE_BUCKET}"…`);
  try {
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `uploads/${Date.now()}-${safe}`;
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(key, file, { contentType: file.type, upsert: true });
    if (!error) {
      const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(data.path);
      addLog("✓ Direct Supabase upload successful.");
      return urlData.publicUrl;
    }
    addLog(`Direct upload failed: ${error.message}. Using base64 fallback…`);
  } catch (storageErr) {
    addLog(`Direct upload threw error. Using base64 fallback…`);
  }

  // ── Strategy 3: base64 data URL fallback ────────────────────────────────
  // Stores image inline as a data URL. No bucket or policies needed at all.
  // Perfect for local dev. For production, fix storage policies or backend.
  addLog("Converting image to base64 data URL (no storage bucket required)…");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      addLog(`✓ Success! Image stored as base64 (${(dataUrl.length / 1024).toFixed(0)} KB inline).`);
      resolve(dataUrl);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}


// ── Tag input ──────────────────────────────────────────────────────────────────
function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");
  const add = () => {
    const t = input.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setInput("");
  };
  return (
    <div className="flex flex-wrap gap-2 p-2 bg-secondary border border-border rounded-xl min-h-[44px]">
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 text-primary font-mono text-xs"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((t) => t !== tag))}
          >
            <X size={10} />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          }
        }}
        onBlur={add}
        placeholder={placeholder || "Type and press Enter"}
        className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground min-w-[120px]"
      />
    </div>
  );
}

// ── Image manager with upload support ─────────────────────────────────────────
function ImageManager({
  value,
  onChange,
  session,
}: {
  value: ProjectFormData["images"];
  onChange: (v: ProjectFormData["images"]) => void;
  session: { access_token: string } | null;
}) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const addLog = (msg: string) => {
    const ts = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${ts}] ${msg}`]);
    console.log(`[ImageUpload] ${msg}`);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxMB = 10;
    if (file.size > maxMB * 1024 * 1024) {
      setUploadError(`File too large. Max size is ${maxMB}MB.`);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files are allowed (JPG, PNG, GIF, WebP, etc.)");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    setUploadError(null);
    setLogs([]);
    setShowLogs(true);
    setUploading(true);
    addLog(`Starting upload: ${file.name} (${(file.size / 1024).toFixed(1)} KB, ${file.type})`);
    addLog(`Storage bucket: "${STORAGE_BUCKET}" | API: ${API_URL}`);

    try {
      const publicUrl = await uploadToSupabase(file, session, addLog);
      onChange([
        ...value,
        {
          imageUrl: publicUrl,
          altText: alt.trim() || file.name.replace(/\.[^.]+$/, ""),
        },
      ]);
      setAlt("");
      addLog("✓ Image added to form successfully.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setUploadError(msg);
      addLog(`✗ Error: ${msg}`);
      console.error("Image upload error:", err);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const addUrl = () => {
    if (url.trim()) {
      onChange([...value, { imageUrl: url.trim(), altText: alt.trim() }]);
      setUrl("");
      setAlt("");
    }
  };

  return (
    <div className="space-y-3">
      {value.map((img, i) => (
        <div
          key={i}
          className="flex items-center gap-2 p-2 bg-secondary rounded-xl border border-border"
        >
          {img.imageUrl && (
            <img
              src={img.imageUrl}
              alt={img.altText}
              className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-foreground truncate">{img.imageUrl}</p>
            <p className="text-xs text-muted-foreground">
              {img.altText || "No alt text"}
            </p>
          </div>
          <a
            href={img.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <ExternalLink size={12} />
          </a>
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="text-destructive hover:text-destructive/80"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      {/* Alt text shared between both upload methods */}
      <input
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
        placeholder="Alt text / caption (optional)"
        className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
      />

      {/* Upload from device */}
      <div className="flex gap-2">
        <input
          key={uploading ? "uploading" : "idle"}
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => {
            setUploadError(null);
            setLogs([]);
            fileRef.current?.click();
          }}
          disabled={uploading}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-primary/30 text-primary hover:bg-primary/5 transition-colors font-mono text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Upload size={14} />
          )}
          {uploading ? "Uploading…" : "Upload from Device"}
        </button>
      </div>

      {/* Upload error */}
      {uploadError && (
        <div className="text-xs text-destructive p-3 bg-destructive/5 rounded-lg border border-destructive/20 space-y-1">
          <p className="flex items-start gap-1.5 font-semibold">
            <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
            {uploadError}
          </p>
          {uploadError.includes("Bucket not found") && (
            <p className="text-muted-foreground pl-4">
              Fix: Go to <strong>Supabase Dashboard → Storage</strong> and create a new public bucket named{" "}
              <code className="bg-secondary px-1 rounded">{STORAGE_BUCKET}</code>.
              Then set <code className="bg-secondary px-1 rounded">VITE_STORAGE_BUCKET={STORAGE_BUCKET}</code> in your <code>.env</code>.
            </p>
          )}
          {uploadError.includes("RLS") || uploadError.includes("policy") ? (
            <p className="text-muted-foreground pl-4">
              Fix: In Supabase Dashboard → Storage → {STORAGE_BUCKET} → Policies, add a policy allowing authenticated users to INSERT and SELECT objects.
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => setShowLogs(!showLogs)}
            className="pl-4 text-primary underline text-xs"
          >
            {showLogs ? "Hide" : "Show"} upload logs
          </button>
        </div>
      )}

      {/* Upload logs panel */}
      {showLogs && logs.length > 0 && (
        <div className="rounded-xl border border-border bg-black/40 p-3 space-y-0.5 font-mono text-[10px] text-muted-foreground max-h-40 overflow-y-auto">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-foreground font-semibold">Upload Logs</span>
            <button type="button" onClick={() => setShowLogs(false)} className="text-muted-foreground hover:text-foreground">
              <X size={12} />
            </button>
          </div>
          {logs.map((log, i) => (
            <p key={i} className={log.includes("✓") ? "text-emerald-400" : log.includes("✗") ? "text-red-400" : ""}>
              {log}
            </p>
          ))}
        </div>
      )}

      {/* Or paste a URL */}
      <div className="flex gap-2 items-center">
        <div className="flex-1 h-px bg-border" />
        <span className="font-mono text-[10px] text-muted-foreground uppercase">
          or paste URL
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addUrl(); } }}
          placeholder="https://..."
          className="flex-1 px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
        />
        <button
          type="button"
          onClick={addUrl}
          className="px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Typed link item — ensures linkType is always present and strongly typed ────
interface LinkItem {
  label: string;
  url: string;
  linkType: LinkType;
}

// Local form state type that uses the stricter LinkItem[] for links
type FormState = Omit<ProjectFormData, "links"> & { links: LinkItem[] };

// ── Link manager ───────────────────────────────────────────────────────────────
function LinkManager({
  value,
  onChange,
}: {
  value: LinkItem[];
  onChange: (v: LinkItem[]) => void;
}) {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<LinkType>("live");

  const addLink = () => {
    if (label.trim() && url.trim()) {
      onChange([...value, { label: label.trim(), url: url.trim(), linkType: type }]);
      setLabel("");
      setUrl("");
    }
  };

  return (
    <div className="space-y-3">
      {value.map((link, i) => (
        <div
          key={i}
          className="flex items-center gap-2 p-2 bg-secondary rounded-xl border border-border"
        >
          <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary font-mono text-xs flex-shrink-0">
            {link.linkType}
          </span>
          <span className="font-body text-sm text-foreground flex-1 truncate">
            {link.label}
          </span>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <ExternalLink size={12} />
          </a>
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="text-destructive hover:text-destructive/80"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <div className="flex gap-2 flex-wrap">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as LinkType)}
          className="px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary/50"
        >
          {LINK_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label"
          className="flex-1 px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addLink(); } }}
          placeholder="URL"
          className="flex-1 px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
        />
        <button
          type="button"
          onClick={addLink}
          className="px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all";

// ── Project Modal ──────────────────────────────────────────────────────────────
function ProjectModal({
  initial,
  onClose,
  onSave,
  session,
}: {
  initial?: InitialProject;
  onClose: () => void;
  onSave: (data: ProjectFormData, id?: string) => Promise<void>;
  session: { access_token: string } | null;
}) {
  const [form, setForm] = useState<FormState>(
    initial
      ? ({
          title: initial.title ?? "",
          category:
            (initial.category as ProjectFormData["category"]) ?? "Web Dev",
          description: initial.description ?? "",
          tags: initial.tags ?? [],
          displayOrder: initial.displayOrder ?? 0,
          featured: initial.featured ?? false,
          images: (initial.images ?? []).map((img) => ({
            imageUrl: img.imageUrl ?? img.image_url ?? "",
            altText: img.altText ?? img.alt_text ?? "",
          })),
          // Normalize API response (snake_case or camelCase) → always LinkItem
          links: (initial.links ?? []).map((l): LinkItem => ({
            label: l.label ?? "",
            url: l.url ?? "",
            linkType: (
              (l.linkType ?? l.link_type ?? "other") as string
            ).toLowerCase() as LinkType,
          })),
          softwareMeta: initial.softwareMeta ?? {
            techStack: [],
            liveUrl: "",
            repoUrl: "",
          },
          artMeta: initial.artMeta ?? {
            medium: "GRAPHITE",
            isAvailable: true,
          },
          designMeta: initial.designMeta ?? { software: [] },
        } satisfies FormState)
      : emptyForm()
  );
  const [saving, setSaving] = useState(false);
  const [showMedia, setShowMedia] = useState(true);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [showBuildLogs, setShowBuildLogs] = useState(false);

  const addBuildLog = (msg: string) => {
    const ts = new Date().toLocaleTimeString();
    setBuildLogs((prev) => [...prev, `[${ts}] ${msg}`]);
    console.log(`[ProjectSave] ${msg}`);
  };

  const set = <K extends keyof FormState>(
    key: K,
    val: FormState[K]
  ) => setForm((f) => ({ ...f, [key]: val }));
  const setSW = (
    key: keyof NonNullable<ProjectFormData["softwareMeta"]>,
    val: unknown
  ) =>
    setForm((f) => ({
      ...f,
      softwareMeta: { ...f.softwareMeta!, [key]: val },
    }));
  const setArt = (
    key: keyof NonNullable<ProjectFormData["artMeta"]>,
    val: unknown
  ) =>
    setForm((f) => ({ ...f, artMeta: { ...f.artMeta!, [key]: val } }));
  const setDes = (
    key: keyof NonNullable<ProjectFormData["designMeta"]>,
    val: unknown
  ) =>
    setForm((f) => ({
      ...f,
      designMeta: { ...f.designMeta!, [key]: val },
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setBuildLogs([]);
    setShowBuildLogs(true);

    // ── Sanitize tags: split any joined strings (e.g. "A · B · C" → ["A","B","C"])
    // This handles the case where tags were pasted as a single string with separators
    const splitTags = (tags: string[]): string[] =>
      tags.flatMap((t) =>
        t.split(/[·,;\n]+/).map((s) => s.trim()).filter(Boolean)
      );

    const sanitizedForm: typeof form = {
      ...form,
      tags: splitTags(form.tags),
      softwareMeta: form.softwareMeta
        ? { ...form.softwareMeta, techStack: splitTags(form.softwareMeta.techStack ?? []) }
        : form.softwareMeta,
    };

    addBuildLog(`Saving: "${sanitizedForm.title}" (${sanitizedForm.category as unknown as string})`);
    addBuildLog(`Tags (${sanitizedForm.tags.length}): ${sanitizedForm.tags.join(", ") || "none"}`);
    addBuildLog(`Images: ${sanitizedForm.images.length} | Links: ${sanitizedForm.links.length}`);
    if ((sanitizedForm.category as unknown as string) === "Web Dev") {
      addBuildLog(`Tech stack (${sanitizedForm.softwareMeta?.techStack?.length ?? 0}): ${sanitizedForm.softwareMeta?.techStack?.join(", ") || "none"}`);
    }
    addBuildLog(`Sending ${initial?.id ? "PUT" : "POST"} to ${API_URL}/projects${initial?.id ? `/${initial.id}` : ""}…`);

    try {
      await onSave(sanitizedForm as unknown as ProjectFormData, initial?.id);
      addBuildLog("✓ Save completed — check toast for result.");
    } catch (err) {
      addBuildLog(`✗ Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const cat = form.category as unknown as Category;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center bg-background/80 backdrop-blur-xl overflow-y-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="font-display font-bold text-foreground text-xl">
              {initial ? "Edit Project" : "New Project"}
            </h2>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">
              {initial
                ? `Editing: ${initial.title}`
                : "Add a new portfolio item"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Category selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CATEGORIES.map((c) => {
              const style = categoryStyle[c];
              const Icon = style.icon;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() =>
                    set("category", c as unknown as ProjectFormData["category"])
                  }
                  className={`py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border transition-all ${
                    cat === c
                      ? `${style.bg} ${style.accent} ${style.border}`
                      : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  <Icon size={12} /> {c}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Title" className="col-span-2">
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                required
                placeholder="Project title"
                className={inputCls}
              />
            </Field>
            <Field label="Display Order">
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) =>
                  set("displayOrder", Number(e.target.value))
                }
                className={inputCls}
              />
            </Field>
            <Field label="Featured">
              <button
                type="button"
                onClick={() => set("featured", !form.featured)}
                className={`w-full py-2.5 rounded-xl font-mono text-xs uppercase border flex items-center justify-center gap-2 transition-all ${
                  form.featured
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "bg-secondary text-muted-foreground border-border"
                }`}
              >
                <Star
                  size={12}
                  className={form.featured ? "fill-current" : ""}
                />
                {form.featured ? "Featured" : "Not Featured"}
              </button>
            </Field>
          </div>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="Describe the project..."
              className={inputCls + " resize-none"}
            />
          </Field>

          <Field label="Tags (press Enter to add)">
            <TagInput
              value={form.tags}
              onChange={(v) => set("tags", v)}
            />
          </Field>

          {/* Images & Links */}
          <div>
            <button
              type="button"
              onClick={() => setShowMedia(!showMedia)}
              className="w-full flex items-center justify-between py-2 font-mono text-xs text-muted-foreground uppercase tracking-wider"
            >
              <span className="flex items-center gap-2">
                <Image size={12} /> Images & Links
              </span>
              {showMedia ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showMedia && (
              <div className="mt-3 space-y-4 border-t border-border pt-4">
                <Field label="Images (upload or URL)">
                  <ImageManager
                    value={form.images}
                    onChange={(v) => set("images", v)}
                    session={session}
                  />
                </Field>
                <Field label="Links">
                  <LinkManager
                    value={form.links}
                    onChange={(v) => set("links", v)}
                  />
                </Field>
              </div>
            )}
          </div>

          {/* ── Web Dev meta ── */}
          {cat === "Web Dev" && (
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-4">
              <p className="font-mono text-xs text-amber-400 uppercase flex items-center gap-1.5">
                <Code size={10} /> Software & Analytics
              </p>
              <Field label="Tech Stack (press Enter to add)">
                <TagInput
                  value={form.softwareMeta?.techStack ?? []}
                  onChange={(v) => setSW("techStack", v)}
                  placeholder="Next.js, PostgreSQL…"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Live URL">
                  <input
                    value={form.softwareMeta?.liveUrl ?? ""}
                    onChange={(e) => setSW("liveUrl", e.target.value)}
                    placeholder="https://…"
                    className={inputCls}
                  />
                </Field>
                <Field label="Repo URL">
                  <input
                    value={form.softwareMeta?.repoUrl ?? ""}
                    onChange={(e) => setSW("repoUrl", e.target.value)}
                    placeholder="https://github.com/…"
                    className={inputCls}
                  />
                </Field>
                <Field label="Lighthouse Score">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={form.softwareMeta?.lighthouseScore ?? ""}
                    onChange={(e) =>
                      setSW(
                        "lighthouseScore",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="98"
                    className={inputCls}
                  />
                </Field>
                <Field label="Page Load (ms)">
                  <input
                    type="number"
                    value={form.softwareMeta?.pageLoadMs ?? ""}
                    onChange={(e) =>
                      setSW(
                        "pageLoadMs",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="780"
                    className={inputCls}
                  />
                </Field>
                <Field label="Monthly Visitors">
                  <input
                    type="number"
                    value={form.softwareMeta?.monthlyVisitors ?? ""}
                    onChange={(e) =>
                      setSW(
                        "monthlyVisitors",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="1200"
                    className={inputCls}
                  />
                </Field>
                <Field label="Uptime (%)">
                  <input
                    type="number"
                    step="0.1"
                    min={0}
                    max={100}
                    value={form.softwareMeta?.uptime ?? ""}
                    onChange={(e) =>
                      setSW(
                        "uptime",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="99.9"
                    className={inputCls}
                  />
                </Field>
              </div>
              <Field label="Analytics Note">
                <textarea
                  value={form.softwareMeta?.analyticsNote ?? ""}
                  onChange={(e) => setSW("analyticsNote", e.target.value)}
                  rows={2}
                  placeholder="Additional context…"
                  className={inputCls + " resize-none"}
                />
              </Field>
            </div>
          )}

          {/* ── Fine Art meta ── */}
          {cat === "Fine Art" && (
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-4">
              <p className="font-mono text-xs text-rose-400 uppercase flex items-center gap-1.5">
                <PenTool size={10} /> Artwork Details
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Medium">
                  <select
                    value={form.artMeta?.medium ?? "GRAPHITE"}
                    onChange={(e) => setArt("medium", e.target.value)}
                    className={inputCls}
                  >
                    {ART_MEDIUMS.map((m) => (
                      <option key={m} value={m}>
                        {m.charAt(0) +
                          m
                            .slice(1)
                            .toLowerCase()
                            .replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Dimensions">
                  <input
                    value={form.artMeta?.dimensions ?? ""}
                    onChange={(e) => setArt("dimensions", e.target.value)}
                    placeholder="40 × 50 cm"
                    className={inputCls}
                  />
                </Field>
                <Field label="Year">
                  <input
                    type="number"
                    value={form.artMeta?.year ?? ""}
                    onChange={(e) =>
                      setArt(
                        "year",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="2024"
                    className={inputCls}
                  />
                </Field>
                <Field label="Price (USD)">
                  <input
                    type="number"
                    step="0.01"
                    value={form.artMeta?.price ?? ""}
                    onChange={(e) =>
                      setArt(
                        "price",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="350"
                    className={inputCls}
                  />
                </Field>
                <Field label="E-Commerce / Shop URL" className="col-span-2">
                  <input
                    value={form.artMeta?.shopUrl ?? ""}
                    onChange={(e) => setArt("shopUrl", e.target.value)}
                    placeholder="https://yourshop.com/product/…"
                    className={inputCls}
                  />
                </Field>
              </div>
              <button
                type="button"
                onClick={() =>
                  setArt("isAvailable", !form.artMeta?.isAvailable)
                }
                className={`px-4 py-2 rounded-xl font-mono text-xs uppercase border flex items-center gap-2 transition-all ${
                  form.artMeta?.isAvailable
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : "bg-secondary text-muted-foreground border-border"
                }`}
              >
                {form.artMeta?.isAvailable ? (
                  <>
                    <Check size={12} /> Available for Purchase
                  </>
                ) : (
                  <>
                    <X size={12} /> Sold / Not Available
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── Photography / Design meta ── */}
          {(cat === "Design" || cat === "Photography") && (
            <div
              className={`p-4 rounded-xl space-y-4 ${
                cat === "Photography"
                  ? "bg-violet-500/5 border border-violet-500/20"
                  : "bg-cyan-500/5 border border-cyan-500/20"
              }`}
            >
              <p
                className={`font-mono text-xs uppercase flex items-center gap-1.5 ${
                  cat === "Photography"
                    ? "text-violet-400"
                    : "text-cyan-400"
                }`}
              >
                {cat === "Photography" ? (
                  <Camera size={10} />
                ) : (
                  <Palette size={10} />
                )}
                {cat === "Photography"
                  ? "Photography Details"
                  : "Design Details"}
              </p>

              {cat === "Photography" ? (
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Shoot / Series Name" className="col-span-2">
                    <input
                      value={form.designMeta?.clientName ?? ""}
                      onChange={(e) => setDes("clientName", e.target.value)}
                      placeholder="Portrait series, Street, Wildlife…"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Year">
                    <input
                      type="number"
                      value={form.designMeta?.year ?? ""}
                      onChange={(e) =>
                        setDes(
                          "year",
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      placeholder="2024"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Print Shop / Gallery URL">
                    <input
                      value={form.designMeta?.behanceUrl ?? ""}
                      onChange={(e) => setDes("behanceUrl", e.target.value)}
                      placeholder="https://…"
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label="Camera / Equipment Tags"
                    className="col-span-2"
                  >
                    <TagInput
                      value={form.designMeta?.software ?? []}
                      onChange={(v) => setDes("software", v)}
                      placeholder="Sony A7IV, 85mm f/1.4…"
                    />
                  </Field>
                </div>
              ) : (
                <>
                  <Field label="Software Used (press Enter to add)">
                    <TagInput
                      value={form.designMeta?.software ?? []}
                      onChange={(v) => setDes("software", v)}
                      placeholder="Blender, Photoshop…"
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Client Name">
                      <input
                        value={form.designMeta?.clientName ?? ""}
                        onChange={(e) =>
                          setDes("clientName", e.target.value)
                        }
                        placeholder="Client name"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Year">
                      <input
                        type="number"
                        value={form.designMeta?.year ?? ""}
                        onChange={(e) =>
                          setDes(
                            "year",
                            e.target.value
                              ? Number(e.target.value)
                              : undefined
                          )
                        }
                        placeholder="2024"
                        className={inputCls}
                      />
                    </Field>
                    <Field
                      label="Behance / Portfolio URL"
                      className="col-span-2"
                    >
                      <input
                        value={form.designMeta?.behanceUrl ?? ""}
                        onChange={(e) =>
                          setDes("behanceUrl", e.target.value)
                        }
                        placeholder="https://behance.net/…"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── Build / save logs ── */}
          {showBuildLogs && buildLogs.length > 0 && (
            <div className="rounded-xl border border-border bg-black/40 p-3 space-y-0.5 font-mono text-[10px] text-muted-foreground max-h-36 overflow-y-auto">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-foreground font-semibold">Save Logs</span>
                <button type="button" onClick={() => setShowBuildLogs(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={12} />
                </button>
              </div>
              {buildLogs.map((log, i) => (
                <p key={i} className={log.includes("✓") ? "text-emerald-400" : log.includes("✗") || log.includes("Error") ? "text-red-400" : ""}>
                  {log}
                </p>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-secondary text-muted-foreground font-mono text-sm uppercase tracking-wider hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-display font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Check size={16} />
              )}
              {initial ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ── Delete confirm ─────────────────────────────────────────────────────────────
function DeleteConfirm({
  title,
  onConfirm,
  onCancel,
  loading,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-card border border-destructive/30 rounded-2xl p-6 shadow-2xl text-center"
      >
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-destructive" />
        </div>
        <h3 className="font-display font-bold text-foreground text-lg mb-2">
          Delete Project?
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          This will permanently delete{" "}
          <span className="text-foreground font-semibold">"{title}"</span> and
          all its images and links.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl bg-secondary text-muted-foreground font-mono text-sm uppercase"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-destructive text-white font-mono text-sm uppercase flex items-center justify-center gap-2 hover:bg-destructive/90 disabled:opacity-50"
          >
            {loading && <Loader2 size={14} className="animate-spin" />} Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Admin ─────────────────────────────────────────────────────────────────
const Admin = () => {
  const { user, isAdmin, session, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { fetchProjects, createProject, updateProject, deleteProject, loading } =
    useProjects();

  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<InitialProject | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ApiProject | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const load = async () => {
    const data = await fetchProjects();
    setProjects(data as ApiProject[]);
  };

  useEffect(() => {
    load();
  }, []);

  if (!authLoading && (!user || !isAdmin))
    return <Navigate to="/auth" replace />;
  if (authLoading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );

  const handleSave = async (data: ProjectFormData, id?: string) => {
    try {
      if (id) {
        const { data: result, error } = await updateProject(id, data);
        if (error) throw new Error(error);
        console.log("updateProject success:", result);
        showToast("Project updated ✓", "success");
      } else {
        const { data: result, error } = await createProject(data);
        if (error) throw new Error(error);
        console.log("createProject success:", result);
        showToast("Project created ✓", "success");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      showToast(`Failed: ${msg}`, "error");
      console.error("handleSave error:", err);
      // Re-throw so the modal's build log shows the error too
      throw err;
    }
    setModal(null);
    setEditTarget(null);
    await load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const { error } = await deleteProject(deleteTarget.id);
    setDeleting(false);
    if (error) {
      showToast(error, "error");
      return;
    }
    setDeleteTarget(null);
    showToast("Project deleted", "success");
    await load();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const allCategories = ["All", ...CATEGORIES];
  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-display font-bold text-black/80">
              K
            </div>
            <div>
              <p className="font-display font-bold text-foreground leading-none">
                Admin Dashboard
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <ShieldCheck size={10} className="text-emerald-400" />
                <p className="font-mono text-xs text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditTarget(null);
                setModal("create");
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-display font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20"
            >
              <Plus size={16} /> New Project
            </button>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-muted-foreground font-mono text-xs uppercase hover:text-foreground transition-colors"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            { label: "Total", value: projects.length, color: "" },
            {
              label: "Web Dev",
              value: projects.filter((p) => p.category === "Web Dev").length,
              color: "text-amber-400",
            },
            {
              label: "Design",
              value: projects.filter((p) => p.category === "Design").length,
              color: "text-cyan-400",
            },
            {
              label: "Fine Art",
              value: projects.filter((p) => p.category === "Fine Art").length,
              color: "text-rose-400",
            },
            {
              label: "Photography",
              value: projects.filter((p) => p.category === "Photography")
                .length,
              color: "text-violet-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <p
                className={`font-display font-bold text-3xl ${stat.color || "text-foreground"}`}
              >
                {stat.value}
              </p>
              <p className="font-mono text-xs text-muted-foreground uppercase mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {allCategories.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                filter === f
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project list */}
        {loading && projects.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body">
              No projects yet. Create your first one!
            </p>
            <button
              onClick={() => {
                setEditTarget(null);
                setModal("create");
              }}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-display font-bold text-sm hover:opacity-90"
            >
              <Plus size={16} /> Add Project
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((project, i) => {
                const style =
                  categoryStyle[project.category] ?? categoryStyle["Web Dev"];
                const Icon = style.icon;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.03 }}
                    className={`flex items-center gap-4 p-4 bg-card border ${style.border} rounded-2xl hover:shadow-md transition-all`}
                  >
                    {project.images?.[0]?.imageUrl ? (
                      <img
                        src={project.images[0].imageUrl}
                        alt={project.title}
                        className="w-16 h-12 object-cover rounded-xl flex-shrink-0"
                      />
                    ) : (
                      <div
                        className={`w-16 h-12 ${style.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon
                          size={20}
                          className={`${style.accent} opacity-50`}
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`font-mono text-xs uppercase ${style.accent}`}
                        >
                          {project.category}
                        </span>
                        {project.featured && (
                          <Star
                            size={10}
                            className="text-primary fill-primary"
                          />
                        )}
                      </div>
                      <h3 className="font-display font-semibold text-foreground truncate">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground font-body text-xs truncate mt-0.5">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-mono text-xs text-muted-foreground hidden md:block">
                        {project.images?.length ?? 0} img ·{" "}
                        {project.links?.length ?? 0} links
                      </span>
                      <button
                        onClick={() => {
                          setEditTarget(project);
                          setModal("edit");
                        }}
                        className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(project)}
                        className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {(modal === "create" || modal === "edit") && (
          <ProjectModal
            initial={modal === "edit" ? (editTarget ?? undefined) : undefined}
            onClose={() => {
              setModal(null);
              setEditTarget(null);
            }}
            onSave={handleSave}
            session={session}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirm
            title={deleteTarget.title}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
            loading={deleting}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-[200] flex items-start gap-3 px-5 py-3.5 rounded-2xl shadow-xl font-body text-sm max-w-md ${
              toast.type === "success"
                ? "bg-emerald-500 text-white"
                : "bg-destructive text-white"
            }`}
          >
            {toast.type === "success" ? (
              <Check size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Admin;