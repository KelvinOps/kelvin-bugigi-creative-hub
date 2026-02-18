// src/pages/Admin.tsx
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { ElementType } from "react";
import {
  Plus, Pencil, Trash2, LogOut, X, Check, AlertCircle,
  Code, Palette, PenTool, Image, Star,
  ChevronDown, ChevronUp, Loader2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/Footer";
import { useProjects } from "@/hooks/useProjects";
import type { ProjectFormData } from "@/hooks/useProjects";

// ── Types ────────────────────────────────────────────────────────────────────

type Category = "Web Dev" | "Design" | "Fine Art";
type LinkType = "live" | "repo" | "shop" | "demo" | "other";

// Fix 1: Replace `icon: any` with the proper React component type
interface CategoryStyleEntry {
  accent: string;
  bg: string;
  border: string;
  icon: ElementType;
}

// Fix 3a: Typed shape for projects coming back from the API (replaces `any[]`)
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

// Fix 2: Typed shape for the `initial` prop of ProjectModal (replaces `any`)
type InitialProject = ApiProject;

const CATEGORIES: readonly Category[] = ["Web Dev", "Design", "Fine Art"];
const LINK_TYPES: readonly LinkType[] = ["live", "repo", "shop", "demo", "other"];
const ART_MEDIUMS = [
  "PENCIL", "GRAPHITE", "BALLPOINT", "OIL",
  "ACRYLIC", "WATERCOLOR", "MIXED_MEDIA", "OTHER",
] as const;

const categoryStyle: Record<string, CategoryStyleEntry> = {
  "Web Dev":  { accent: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", icon: Code },
  "Design":   { accent: "text-cyan-400",  bg: "bg-cyan-500/10",  border: "border-cyan-500/30",  icon: Palette },
  "Fine Art": { accent: "text-rose-400",  bg: "bg-rose-500/10",  border: "border-rose-500/30",  icon: PenTool },
};

const emptyForm = (): ProjectFormData => ({
  title: "", category: "Web Dev", description: "", tags: [],
  displayOrder: 0, featured: false, images: [], links: [],
  softwareMeta: {
    techStack: [], liveUrl: "", repoUrl: "",
    lighthouseScore: undefined, pageLoadMs: undefined,
    monthlyVisitors: undefined, uptime: undefined, analyticsNote: "",
  },
  artMeta: { medium: "GRAPHITE", dimensions: "", year: undefined, isAvailable: true, price: undefined, shopUrl: "" },
  designMeta: { software: [], clientName: "", year: undefined, behanceUrl: "" },
});

// ── Tag input ────────────────────────────────────────────────────────────────
function TagInput({
  value, onChange, placeholder,
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
      {value.map(tag => (
        <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 text-primary font-mono text-xs">
          {tag}
          <button type="button" onClick={() => onChange(value.filter(t => t !== tag))}><X size={10} /></button>
        </span>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } }}
        onBlur={add}
        placeholder={placeholder || "Type and press Enter"}
        className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground min-w-[120px]"
      />
    </div>
  );
}

// ── Image manager ────────────────────────────────────────────────────────────
function ImageManager({
  value, onChange,
}: {
  value: ProjectFormData["images"];
  onChange: (v: ProjectFormData["images"]) => void;
}) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  return (
    <div className="space-y-3">
      {value.map((img, i) => (
        <div key={i} className="flex items-center gap-2 p-2 bg-secondary rounded-xl border border-border">
          {img.imageUrl && (
            <img
              src={img.imageUrl}
              alt={img.altText}
              className="w-14 h-10 object-cover rounded-lg flex-shrink-0"
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-foreground truncate">{img.imageUrl}</p>
            <p className="text-xs text-muted-foreground truncate">{img.altText || "No alt text"}</p>
          </div>
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="text-destructive hover:text-destructive/80"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <div className="flex gap-2">
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Image URL (https://...)"
          className="flex-1 px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
        />
        <input
          value={alt}
          onChange={e => setAlt(e.target.value)}
          placeholder="Alt text"
          className="w-32 px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
        />
        <button
          type="button"
          onClick={() => {
            if (url.trim()) {
              onChange([...value, { imageUrl: url.trim(), altText: alt.trim() }]);
              setUrl(""); setAlt("");
            }
          }}
          className="px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Link manager ─────────────────────────────────────────────────────────────
function LinkManager({
  value, onChange,
}: {
  value: ProjectFormData["links"];
  onChange: (v: ProjectFormData["links"]) => void;
}) {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  // Fix 3b: typed as LinkType instead of plain string
  const [type, setType] = useState<LinkType>("live");

  return (
    <div className="space-y-3">
      {value.map((link, i) => (
        <div key={i} className="flex items-center gap-2 p-2 bg-secondary rounded-xl border border-border">
          <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary font-mono text-xs flex-shrink-0">{link.linkType}</span>
          <span className="font-body text-sm text-foreground flex-1 truncate">{link.label}</span>
          <span className="text-xs text-muted-foreground truncate max-w-[120px]">{link.url}</span>
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
          // The select options only contain LinkType values so this cast is safe
          onChange={e => setType(e.target.value as LinkType)}
          className="px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground outline-none focus:ring-1 focus:ring-primary/50"
        >
          {LINK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="Label"
          className="flex-1 px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
        />
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="URL"
          className="flex-1 px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
        />
        <button
          type="button"
          onClick={() => {
            if (label.trim() && url.trim()) {
              // `type` is already LinkType — assignment is valid
              onChange([...value, { label: label.trim(), url: url.trim(), linkType: type }]);
              setLabel(""); setUrl("");
            }
          }}
          className="px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all";

// ── Project Form Modal ────────────────────────────────────────────────────────
// Fix 2: `initial` is typed as InitialProject instead of `any`
function ProjectModal({ initial, onClose, onSave }: {
  initial?: InitialProject;
  onClose: () => void;
  onSave: (data: ProjectFormData, id?: string) => Promise<void>;
}) {
  const [form, setForm] = useState<ProjectFormData>(
    initial ? {
      title: initial.title ?? "",
      category: (initial.category as Category) ?? "Web Dev",
      description: initial.description ?? "",
      tags: initial.tags ?? [],
      displayOrder: initial.displayOrder ?? 0,
      featured: initial.featured ?? false,
      images: (initial.images ?? []).map(img => ({
        imageUrl: img.imageUrl ?? img.image_url ?? "",
        altText: img.altText ?? img.alt_text ?? "",
      })),
      links: (initial.links ?? []).map(l => ({
        label: l.label ?? "",
        url: l.url ?? "",
        // Values from the DB are always valid LinkType members — cast is safe
        linkType: (l.linkType ?? l.link_type ?? "other") as LinkType,
      })),
      softwareMeta: initial.softwareMeta ?? { techStack: [], liveUrl: "", repoUrl: "" },
      artMeta: initial.artMeta ?? { medium: "GRAPHITE", isAvailable: true },
      designMeta: initial.designMeta ?? { software: [] },
    } : emptyForm()
  );
  const [saving, setSaving] = useState(false);
  const [showMedia, setShowMedia] = useState(true);

  // Fix 2 continued: fully typed generic setter — no `val: any`
  const set = <K extends keyof ProjectFormData>(key: K, val: ProjectFormData[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  const setSW = (key: keyof NonNullable<ProjectFormData["softwareMeta"]>, val: unknown) =>
    setForm(f => ({ ...f, softwareMeta: { ...f.softwareMeta!, [key]: val } }));

  const setArt = (key: keyof NonNullable<ProjectFormData["artMeta"]>, val: unknown) =>
    setForm(f => ({ ...f, artMeta: { ...f.artMeta!, [key]: val } }));

  const setDes = (key: keyof NonNullable<ProjectFormData["designMeta"]>, val: unknown) =>
    setForm(f => ({ ...f, designMeta: { ...f.designMeta!, [key]: val } }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form, initial?.id);
    setSaving(false);
  };

  const cat = form.category;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center bg-background/80 backdrop-blur-xl overflow-y-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="font-display font-bold text-foreground text-xl">
              {initial ? "Edit Project" : "New Project"}
            </h2>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">
              {initial ? `Editing: ${initial.title}` : "Add a new portfolio item"}
            </p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-secondary transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Category selector */}
          <div className="flex gap-2">
            {CATEGORIES.map(c => {
              const style = categoryStyle[c];
              const Icon = style.icon;
              return (
                <button key={c} type="button" onClick={() => set("category", c)}
                  className={`flex-1 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border transition-all ${
                    form.category === c
                      ? `${style.bg} ${style.accent} ${style.border}`
                      : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                  }`}>
                  <Icon size={12} /> {c}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Title" className="col-span-2">
              <input value={form.title} onChange={e => set("title", e.target.value)} required placeholder="Project title" className={inputCls} />
            </Field>
            <Field label="Display Order">
              <input type="number" value={form.displayOrder} onChange={e => set("displayOrder", Number(e.target.value))} className={inputCls} />
            </Field>
            <Field label="Featured">
              <button type="button" onClick={() => set("featured", !form.featured)}
                className={`w-full py-2.5 rounded-xl font-mono text-xs uppercase border flex items-center justify-center gap-2 transition-all ${
                  form.featured ? "bg-primary/10 text-primary border-primary/30" : "bg-secondary text-muted-foreground border-border"
                }`}>
                <Star size={12} className={form.featured ? "fill-current" : ""} />
                {form.featured ? "Featured" : "Not Featured"}
              </button>
            </Field>
          </div>

          <Field label="Description">
            <textarea value={form.description} onChange={e => set("description", e.target.value)}
              rows={3} placeholder="Describe the project..." className={inputCls + " resize-none"} />
          </Field>

          <Field label="Tags (press Enter to add)">
            <TagInput value={form.tags} onChange={v => set("tags", v)} />
          </Field>

          {/* Images & Links */}
          <div>
            <button type="button" onClick={() => setShowMedia(!showMedia)}
              className="w-full flex items-center justify-between py-2 font-mono text-xs text-muted-foreground uppercase tracking-wider">
              <span className="flex items-center gap-2"><Image size={12} /> Images & Links</span>
              {showMedia ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showMedia && (
              <div className="mt-3 space-y-4 border-t border-border pt-4">
                <Field label="Images">
                  <ImageManager value={form.images} onChange={v => set("images", v)} />
                </Field>
                <Field label="Links">
                  <LinkManager value={form.links} onChange={v => set("links", v)} />
                </Field>
              </div>
            )}
          </div>

          {/* Web Dev meta */}
          {cat === "Web Dev" && (
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-4">
              <p className="font-mono text-xs text-amber-400 uppercase flex items-center gap-1.5"><Code size={10} /> Software & Analytics</p>
              <Field label="Tech Stack (press Enter to add)">
                <TagInput value={form.softwareMeta?.techStack ?? []} onChange={v => setSW("techStack", v)} placeholder="Next.js, PostgreSQL..." />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Live URL"><input value={form.softwareMeta?.liveUrl ?? ""} onChange={e => setSW("liveUrl", e.target.value)} placeholder="https://..." className={inputCls} /></Field>
                <Field label="Repo URL"><input value={form.softwareMeta?.repoUrl ?? ""} onChange={e => setSW("repoUrl", e.target.value)} placeholder="https://github.com/..." className={inputCls} /></Field>
                <Field label="Lighthouse Score"><input type="number" min={0} max={100} value={form.softwareMeta?.lighthouseScore ?? ""} onChange={e => setSW("lighthouseScore", e.target.value ? Number(e.target.value) : undefined)} placeholder="98" className={inputCls} /></Field>
                <Field label="Page Load (ms)"><input type="number" value={form.softwareMeta?.pageLoadMs ?? ""} onChange={e => setSW("pageLoadMs", e.target.value ? Number(e.target.value) : undefined)} placeholder="780" className={inputCls} /></Field>
                <Field label="Monthly Visitors"><input type="number" value={form.softwareMeta?.monthlyVisitors ?? ""} onChange={e => setSW("monthlyVisitors", e.target.value ? Number(e.target.value) : undefined)} placeholder="1200" className={inputCls} /></Field>
                <Field label="Uptime (%)"><input type="number" step="0.1" min={0} max={100} value={form.softwareMeta?.uptime ?? ""} onChange={e => setSW("uptime", e.target.value ? Number(e.target.value) : undefined)} placeholder="99.9" className={inputCls} /></Field>
              </div>
              <Field label="Analytics Note">
                <textarea value={form.softwareMeta?.analyticsNote ?? ""} onChange={e => setSW("analyticsNote", e.target.value)}
                  rows={2} placeholder="Additional analytics context..." className={inputCls + " resize-none"} />
              </Field>
            </div>
          )}

          {/* Fine Art meta */}
          {cat === "Fine Art" && (
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-4">
              <p className="font-mono text-xs text-rose-400 uppercase flex items-center gap-1.5"><PenTool size={10} /> Artwork Details</p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Medium">
                  <select value={form.artMeta?.medium ?? "GRAPHITE"} onChange={e => setArt("medium", e.target.value)} className={inputCls}>
                    {ART_MEDIUMS.map(m => (
                      <option key={m} value={m}>{m.charAt(0) + m.slice(1).toLowerCase().replace(/_/g, " ")}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Dimensions"><input value={form.artMeta?.dimensions ?? ""} onChange={e => setArt("dimensions", e.target.value)} placeholder="40 × 50 cm" className={inputCls} /></Field>
                <Field label="Year"><input type="number" value={form.artMeta?.year ?? ""} onChange={e => setArt("year", e.target.value ? Number(e.target.value) : undefined)} placeholder="2024" className={inputCls} /></Field>
                <Field label="Price (USD)"><input type="number" step="0.01" value={form.artMeta?.price ?? ""} onChange={e => setArt("price", e.target.value ? Number(e.target.value) : undefined)} placeholder="350" className={inputCls} /></Field>
                <Field label="Shop / E-commerce URL" className="col-span-2">
                  <input value={form.artMeta?.shopUrl ?? ""} onChange={e => setArt("shopUrl", e.target.value)} placeholder="https://yourshop.com/product/..." className={inputCls} />
                </Field>
              </div>
              <button type="button" onClick={() => setArt("isAvailable", !form.artMeta?.isAvailable)}
                className={`px-4 py-2 rounded-xl font-mono text-xs uppercase border flex items-center gap-2 transition-all ${
                  form.artMeta?.isAvailable
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : "bg-secondary text-muted-foreground border-border"
                }`}>
                {form.artMeta?.isAvailable
                  ? <><Check size={12} /> Available for Purchase</>
                  : <><X size={12} /> Sold / Not Available</>}
              </button>
            </div>
          )}

          {/* Design meta */}
          {cat === "Design" && (
            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 space-y-4">
              <p className="font-mono text-xs text-cyan-400 uppercase flex items-center gap-1.5"><Palette size={10} /> Design Details</p>
              <Field label="Software Used (press Enter to add)">
                <TagInput value={form.designMeta?.software ?? []} onChange={v => setDes("software", v)} placeholder="Blender, Photoshop..." />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Client Name"><input value={form.designMeta?.clientName ?? ""} onChange={e => setDes("clientName", e.target.value)} placeholder="Client name" className={inputCls} /></Field>
                <Field label="Year"><input type="number" value={form.designMeta?.year ?? ""} onChange={e => setDes("year", e.target.value ? Number(e.target.value) : undefined)} placeholder="2024" className={inputCls} /></Field>
                <Field label="Behance / Portfolio URL" className="col-span-2">
                  <input value={form.designMeta?.behanceUrl ?? ""} onChange={e => setDes("behanceUrl", e.target.value)} placeholder="https://behance.net/..." className={inputCls} />
                </Field>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-secondary text-muted-foreground font-mono text-sm uppercase tracking-wider hover:text-foreground transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-3 rounded-xl bg-gradient-amber text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              {initial ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ── Delete confirm ────────────────────────────────────────────────────────────
function DeleteConfirm({ title, onConfirm, onCancel, loading }: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl px-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-card border border-destructive/30 rounded-2xl p-6 shadow-2xl text-center">
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-destructive" />
        </div>
        <h3 className="font-display font-bold text-foreground text-lg mb-2">Delete Project?</h3>
        <p className="text-muted-foreground text-sm mb-6">
          This will permanently delete <span className="text-foreground font-semibold">"{title}"</span> and all its images and links.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl bg-secondary text-muted-foreground font-mono text-sm uppercase">Cancel</button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-destructive text-white font-mono text-sm uppercase flex items-center justify-center gap-2 hover:bg-destructive/90 disabled:opacity-50">
            {loading && <Loader2 size={14} className="animate-spin" />} Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────
const Admin = () => {
  const { user, isAdmin, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { fetchProjects, createProject, updateProject, deleteProject, loading } = useProjects();

  // Fix 4: ALL hooks declared unconditionally at the top — early returns moved below
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<InitialProject | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ApiProject | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const load = async () => {
    const data = await fetchProjects();
    setProjects(data as ApiProject[]);
  };

  // Fix 4: useEffect is unconditional — no hook after an early return
  useEffect(() => { load(); }, []);

  // ── Early returns come AFTER all hook calls ──
  if (!authLoading && (!user || !isAdmin)) {
    return <Navigate to="/auth" replace />;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const handleSave = async (data: ProjectFormData, id?: string) => {
    if (id) {
      const { error } = await updateProject(id, data);
      if (error) { showToast(error, "error"); return; }
      showToast("Project updated successfully", "success");
    } else {
      const { error } = await createProject(data);
      if (error) { showToast(error, "error"); return; }
      showToast("Project created successfully", "success");
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
    if (error) { showToast(error, "error"); return; }
    setDeleteTarget(null);
    showToast("Project deleted", "success");
    await load();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-amber flex items-center justify-center font-display font-bold text-primary-foreground">K</div>
            <div>
              <p className="font-display font-bold text-foreground leading-none">Admin Dashboard</p>
              <p className="font-mono text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setEditTarget(null); setModal("create"); }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-amber text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Projects", value: projects.length, color: "" },
            { label: "Web Dev", value: projects.filter(p => p.category === "Web Dev").length, color: "text-amber-400" },
            { label: "Design", value: projects.filter(p => p.category === "Design").length, color: "text-cyan-400" },
            { label: "Fine Art", value: projects.filter(p => p.category === "Fine Art").length, color: "text-rose-400" },
          ].map(stat => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-5">
              <p className={`font-display font-bold text-3xl ${stat.color || "text-foreground"}`}>{stat.value}</p>
              <p className="font-mono text-xs text-muted-foreground uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {["All", ...CATEGORIES].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                filter === f ? "bg-gradient-amber text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}>
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
            <p className="text-muted-foreground font-body">No projects yet. Create your first one!</p>
            <button
              onClick={() => { setEditTarget(null); setModal("create"); }}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-amber text-primary-foreground font-display font-semibold text-sm hover:opacity-90"
            >
              <Plus size={16} /> Add Project
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((project, i) => {
                const style = categoryStyle[project.category] ?? categoryStyle["Web Dev"];
                const Icon = style.icon;
                return (
                  <motion.div key={project.id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.03 }}
                    className={`flex items-center gap-4 p-4 bg-card border ${style.border} rounded-2xl hover:shadow-md transition-all`}>
                    {project.images?.[0]?.imageUrl ? (
                      <img src={project.images[0].imageUrl} alt={project.title} className="w-16 h-12 object-cover rounded-xl flex-shrink-0" />
                    ) : (
                      <div className={`w-16 h-12 ${style.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon size={20} className={`${style.accent} opacity-50`} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-mono text-xs uppercase ${style.accent}`}>{project.category}</span>
                        {project.featured && <Star size={10} className="text-primary fill-primary" />}
                      </div>
                      <h3 className="font-display font-semibold text-foreground truncate">{project.title}</h3>
                      <p className="text-muted-foreground font-body text-xs truncate mt-0.5">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-mono text-xs text-muted-foreground hidden md:block">
                        {project.images?.length ?? 0} img · {project.links?.length ?? 0} links
                      </span>
                      <button
                        onClick={() => { setEditTarget(project as InitialProject); setModal("edit"); }}
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
            onClose={() => { setModal(null); setEditTarget(null); }}
            onSave={handleSave}
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl font-body text-sm ${
              toast.type === "success" ? "bg-emerald-500 text-white" : "bg-destructive text-white"
            }`}>
            {toast.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
        <Footer />
    </div>
  );
};

export default Admin;