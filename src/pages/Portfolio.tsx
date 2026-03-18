// src/pages/Portfolio.tsx
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ExternalLink, X, Github, ShoppingCart, Eye, ArrowUpRight,
  ChevronLeft, ChevronRight, BarChart2, Zap, Users, Globe,
  PenTool, Palette, Code, Star, Loader2, Camera
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { supabase } from "@/integrations/supabase/client";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const filters = ["All", "Web Dev", "Design", "Fine Art", "Photography"];

// ─── Category normalisation ───────────────────────────────────────────────────
const PRISMA_TO_DISPLAY: Record<string, string> = {
  WEB_DEV:      "Web Dev",
  DESIGN:       "Design",
  FINE_ART:     "Fine Art",
  PHOTOGRAPHY:  "Photography",
  "Web Dev":     "Web Dev",
  "Design":      "Design",
  "Fine Art":    "Fine Art",
  "Photography": "Photography",
};

function normalizeCategory(raw: string): string {
  return PRISMA_TO_DISPLAY[raw] ?? raw;
}

// ─── Style map ────────────────────────────────────────────────────────────────
interface CategoryStyle {
  accent: string; bg: string; border: string; badge: string; icon: LucideIcon;
}

const categoryStyles: Record<string, CategoryStyle> = {
  "Web Dev":     { accent: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/30",  badge: "bg-amber-500/15 text-amber-300",   icon: Code    },
  "Design":      { accent: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-500/30",   badge: "bg-cyan-500/15 text-cyan-300",     icon: Palette },
  "Fine Art":    { accent: "text-rose-400",   bg: "bg-rose-500/10",   border: "border-rose-500/30",   badge: "bg-rose-500/15 text-rose-300",     icon: PenTool },
  "Photography": { accent: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", badge: "bg-violet-500/15 text-violet-300", icon: Camera  },
};

const FALLBACK_STYLE: CategoryStyle = categoryStyles["Web Dev"];

function getStyle(category: string): CategoryStyle {
  return categoryStyles[normalizeCategory(category)] ?? FALLBACK_STYLE;
}

// ─── Domain interfaces ────────────────────────────────────────────────────────
interface ProjectLink { label: string; url: string; link_type: string; }

interface SoftwareMeta {
  tech_stack?: string[]; live_url?: string; repo_url?: string;
  lighthouse_score?: number; page_load_ms?: number;
  monthly_visitors?: number; uptime?: number; analytics_note?: string;
}
interface ArtMeta {
  medium?: string; dimensions?: string; year?: number;
  is_available?: boolean; price?: number; shop_url?: string;
}
interface DesignMeta {
  software?: string[]; client_name?: string; year?: number; behance_url?: string;
}

interface Project {
  id: string; title: string;
  category: string;
  description: string; tags: string[];
  images: string[];
  links: ProjectLink[]; featured?: boolean;
  softwareMeta?: SoftwareMeta; artMeta?: ArtMeta; designMeta?: DesignMeta;
}

// ─── Raw API shapes ───────────────────────────────────────────────────────────
interface RawImage { imageUrl?: string; image_url?: string; }
interface RawLink  { label: string; url: string; linkType?: string; link_type?: string; }

interface RawSoftwareMeta {
  techStack?: string[];     tech_stack?: string[];
  liveUrl?: string;         live_url?: string;
  repoUrl?: string;         repo_url?: string;
  lighthouseScore?: number; lighthouse_score?: number;
  pageLoadMs?: number;      page_load_ms?: number;
  monthlyVisitors?: number; monthly_visitors?: number;
  uptime?: number;
  analyticsNote?: string;   analytics_note?: string;
}
interface RawArtMeta {
  medium?: string; dimensions?: string; year?: number;
  isAvailable?: boolean; is_available?: boolean;
  price?: number; shopUrl?: string; shop_url?: string;
}
interface RawDesignMeta {
  software?: string[];
  clientName?: string; client_name?: string;
  year?: number;
  behanceUrl?: string; behance_url?: string;
}
interface RawProject {
  id: string; title: string; category: string;
  description?: string; tags?: string[]; featured?: boolean;
  images?: RawImage[]; links?: RawLink[];
  softwareMeta?: RawSoftwareMeta; artMeta?: RawArtMeta; designMeta?: RawDesignMeta;
}

// ─── Supabase row shapes ──────────────────────────────────────────────────────
interface SupabaseProject { id: string; title: string; category: string; description?: string; tags?: string[]; }
interface SupabaseImage   { image_url: string; }
interface SupabaseLink    { label: string; url: string; link_type: string; }

// ─── Meta normalizers ─────────────────────────────────────────────────────────
function normalizeSoftwareMeta(m: RawSoftwareMeta): SoftwareMeta {
  return {
    tech_stack:       m.techStack       ?? m.tech_stack       ?? [],
    live_url:         m.liveUrl         ?? m.live_url,
    repo_url:         m.repoUrl         ?? m.repo_url,
    lighthouse_score: m.lighthouseScore ?? m.lighthouse_score,
    page_load_ms:     m.pageLoadMs      ?? m.page_load_ms,
    monthly_visitors: m.monthlyVisitors ?? m.monthly_visitors,
    uptime:           m.uptime,
    analytics_note:   m.analyticsNote   ?? m.analytics_note,
  };
}
function normalizeArtMeta(m: RawArtMeta): ArtMeta {
  return {
    medium: m.medium, dimensions: m.dimensions, year: m.year,
    is_available: m.isAvailable ?? m.is_available,
    price: m.price, shop_url: m.shopUrl ?? m.shop_url,
  };
}
function normalizeDesignMeta(m: RawDesignMeta): DesignMeta {
  return {
    software:    m.software ?? [],
    client_name: m.clientName ?? m.client_name,
    year:        m.year,
    behance_url: m.behanceUrl ?? m.behance_url,
  };
}

// ─── Project normalizer ───────────────────────────────────────────────────────
function normalizeProject(p: RawProject): Project {
  const images = (p.images ?? [])
    .map(img => (img.imageUrl ?? img.image_url ?? "").trim())
    .filter(Boolean);

  return {
    id:           p.id,
    title:        p.title,
    category:     normalizeCategory(p.category),
    description:  p.description ?? "",
    tags:         p.tags ?? [],
    featured:     p.featured ?? false,
    images,
    links: (p.links ?? []).map(l => ({
      label:     l.label,
      url:       l.url,
      link_type: (l.linkType ?? l.link_type ?? "other").toLowerCase(),
    })),
    softwareMeta: p.softwareMeta ? normalizeSoftwareMeta(p.softwareMeta) : undefined,
    artMeta:      p.artMeta      ? normalizeArtMeta(p.artMeta)           : undefined,
    designMeta:   p.designMeta   ? normalizeDesignMeta(p.designMeta)     : undefined,
  };
}

// ─── Link icon ────────────────────────────────────────────────────────────────
const linkIcon = (type: string) => {
  switch (type) {
    case "live": return <ArrowUpRight size={14} />;
    case "repo": return <Github size={14} />;
    case "shop": return <ShoppingCart size={14} />;
    case "demo": return <Eye size={14} />;
    default:     return <ExternalLink size={14} />;
  }
};

// ─── Safe image ───────────────────────────────────────────────────────────────
// crossOrigin="anonymous" has been intentionally removed.
// Supabase Storage may not return the CORS headers needed for that mode,
// causing the browser to block an otherwise-valid image load. We rely solely
// on the React onError state to show the fallback instead.
function isValidUrl(src: string): boolean {
  if (!src || !src.trim()) return false;
  // Accept http/https URLs and base64 data URIs
  return src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:image/");
}

function SafeImage({
  src, alt, className, fallback,
}: {
  src: string; alt: string; className: string; fallback: React.ReactNode;
}) {
  const [errored, setErrored] = useState(false);

  // Reset error state whenever the src changes
  useEffect(() => { setErrored(false); }, [src]);

  // Reject obviously invalid URLs before even attempting to render an <img>
  if (!isValidUrl(src) || errored) return <>{fallback}</>;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      // !! No crossOrigin attribute — avoids CORS preflight rejection from Supabase Storage !!
      onError={() => setErrored(true)}
    />
  );
}

// ─── Badge strips ─────────────────────────────────────────────────────────────
const AnalyticsBadges = ({ meta }: { meta: SoftwareMeta }) => (
  <div className="flex flex-wrap gap-2 mt-3">
    {meta.lighthouse_score != null && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-300 font-mono text-xs"><Zap size={10} /> LH {meta.lighthouse_score}</span>}
    {meta.page_load_ms     != null && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-300 font-mono text-xs"><BarChart2 size={10} /> {meta.page_load_ms}ms</span>}
    {meta.monthly_visitors != null && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-300 font-mono text-xs"><Users size={10} /> {meta.monthly_visitors.toLocaleString()}/mo</span>}
    {(meta.tech_stack ?? []).length > 0 && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-300 font-mono text-xs"><Code size={10} /> {meta.tech_stack!.slice(0, 2).join(", ")}{meta.tech_stack!.length > 2 ? ` +${meta.tech_stack!.length - 2}` : ""}</span>}
  </div>
);
const ArtBadges = ({ meta }: { meta: ArtMeta }) => (
  <div className="flex flex-wrap gap-2 mt-3">
    {meta.medium     && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-rose-500/10 text-rose-300 font-mono text-xs"><PenTool size={10} /> {meta.medium.charAt(0) + meta.medium.slice(1).toLowerCase().replace(/_/g, " ")}</span>}
    {meta.dimensions && <span className="px-2 py-1 rounded-full bg-rose-500/10 text-rose-300 font-mono text-xs">{meta.dimensions}</span>}
    {meta.year       && <span className="px-2 py-1 rounded-full bg-rose-500/10 text-rose-300 font-mono text-xs">{meta.year}</span>}
    {meta.price != null && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-rose-500/15 text-rose-200 font-mono text-xs font-semibold">${meta.price}</span>}
    {meta.is_available && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-xs"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available</span>}
  </div>
);
const DesignBadges = ({ meta }: { meta: DesignMeta }) => (
  <div className="flex flex-wrap gap-2 mt-3">
    {(meta.software ?? []).map(sw => <span key={sw} className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-xs">{sw}</span>)}
    {meta.client_name && <span className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-xs">{meta.client_name}</span>}
    {meta.year        && <span className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-xs">{meta.year}</span>}
  </div>
);
const PhotographyBadges = ({ meta }: { meta: DesignMeta }) => (
  <div className="flex flex-wrap gap-2 mt-3">
    {(meta.software ?? []).map(eq => <span key={eq} className="px-2 py-1 rounded-full bg-violet-500/10 text-violet-300 font-mono text-xs">{eq}</span>)}
    {meta.client_name && <span className="px-2 py-1 rounded-full bg-violet-500/10 text-violet-300 font-mono text-xs">{meta.client_name}</span>}
    {meta.year        && <span className="px-2 py-1 rounded-full bg-violet-500/10 text-violet-300 font-mono text-xs">{meta.year}</span>}
  </div>
);

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = ({ active }: { active: string }) => (
  <div className="col-span-12 flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
      <Code size={28} className="text-muted-foreground opacity-40" />
    </div>
    <p className="font-display font-semibold text-foreground text-lg mb-1">No projects yet</p>
    <p className="text-muted-foreground font-body text-sm max-w-xs">
      {active === "All" ? "Projects will appear here once they've been added." : `No ${active} projects have been added yet.`}
    </p>
  </div>
);

// ─── Main Portfolio ───────────────────────────────────────────────────────────
const Portfolio = () => {
  const [active,   setActive]   = useState("All");
  const [lightbox, setLightbox] = useState<{ projectIdx: number; imageIdx: number } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // ── Express API ───────────────────────────────────────────────────────
      try {
        const res = await fetch(`${API}/projects`);
        if (res.ok) {
          const raw: RawProject[] = await res.json();
          const normalised = raw.map(normalizeProject);
          if (normalised.length > 0) {
            console.log("[Portfolio] sample project:", {
              id:       normalised[0].id,
              title:    normalised[0].title,
              category: normalised[0].category,
              images:   normalised[0].images,
            });
          }
          setProjects(normalised);
          setLoading(false);
          return;
        }
      } catch (_) { /* fall through to Supabase */ }

      // ── Supabase fallback ─────────────────────────────────────────────────
      try {
        const { data: projs } = await supabase.from("projects").select("*").order("display_order");
        if (!projs?.length) { setProjects([]); setLoading(false); return; }

        const full: Project[] = await Promise.all(
          (projs as SupabaseProject[]).map(async (p) => {
            const [{ data: imgs }, { data: lnks }] = await Promise.all([
              supabase.from("project_images").select("*").eq("project_id", p.id).order("display_order"),
              supabase.from("project_links") .select("*").eq("project_id", p.id).order("display_order"),
            ]);
            return {
              id:          p.id,
              title:       p.title,
              category:    normalizeCategory(p.category),
              description: p.description ?? "",
              tags:        p.tags ?? [],
              images:      ((imgs ?? []) as SupabaseImage[]).map(i => i.image_url).filter(Boolean),
              links:       ((lnks ?? []) as SupabaseLink[]) .map(l => ({ label: l.label, url: l.url, link_type: l.link_type })),
            };
          })
        );
        setProjects(full);
      } catch (_) {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered       = active === "All" ? projects : projects.filter(p => p.category === active);
  const currentProject = lightbox !== null ? (filtered[lightbox.projectIdx] ?? null) : null;

  const navigateImage = useCallback((dir: 1 | -1) => {
    if (!lightbox || !currentProject) return;
    const next = lightbox.imageIdx + dir;
    if (next >= 0 && next < currentProject.images.length)
      setLightbox({ ...lightbox, imageIdx: next });
  }, [lightbox, currentProject]);

  const getSpan = (i: number) => i % 3 === 0 ? "md:col-span-7" : i % 3 === 1 ? "md:col-span-5" : "md:col-span-6";

  return (
    <div>
      <PageHeader
        section="Portfolio" sectionNumber="03" title="Portfolio"
        subtitle="A curated selection of projects spanning web development, graphic design, and fine art."
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-4">
            <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">Selected Work</span>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-2 mb-12 flex-wrap">
            {filters.map(f => {
              const style = categoryStyles[f];
              const Icon  = style?.icon;
              return (
                <button key={f} onClick={() => setActive(f)}
                  className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all inline-flex items-center gap-1.5 ${
                    active === f
                      ? f === "All" ? "bg-gradient-amber text-primary-foreground" : `${style?.bg} ${style?.accent} ring-1 ring-current`
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {Icon && <Icon size={10} />} {f}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="flex flex-col items-center gap-4">
                <Loader2 size={32} className="animate-spin text-primary" />
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Loading projects…</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto">
              <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? <EmptyState active={active} /> : filtered.map((project, i) => {
                  const style    = getStyle(project.category);
                  const Icon     = style.icon;
                  const firstImg = project.images[0] ?? "";

                  return (
                    <motion.div
                      key={project.id} layout
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                      className={`group relative rounded-2xl overflow-hidden bg-card border ${style.border} hover:border-opacity-80 transition-all col-span-12 ${getSpan(i)}`}
                    >
                      {/* Image */}
                      <div className="aspect-[4/3] overflow-hidden cursor-pointer relative"
                        onClick={() => setLightbox({ projectIdx: i, imageIdx: 0 })}>

                        <SafeImage
                          src={firstImg}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          fallback={
                            <div className={`w-full h-full ${style.bg} flex items-center justify-center`}>
                              <Icon size={48} className={`${style.accent} opacity-30`} />
                            </div>
                          }
                        />

                        {project.images.length > 1 && (
                          <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-background/70 backdrop-blur-sm font-mono text-xs text-foreground">
                            1/{project.images.length}
                          </div>
                        )}
                        {project.featured && (
                          <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-primary/80 backdrop-blur-sm font-mono text-xs text-primary-foreground flex items-center gap-1">
                            <Star size={10} className="fill-current" /> Featured
                          </div>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                          <Icon size={20} className={`${style.accent} mb-2`} />
                          <span className={`${style.accent} font-mono text-xs uppercase tracking-wider mb-2`}>{project.category}</span>
                          <h3 className="font-display font-bold text-foreground text-xl mb-2">{project.title}</h3>
                          <p className="text-muted-foreground font-body text-sm mb-4 max-w-xs line-clamp-2">{project.description}</p>
                          {project.category === "Web Dev" && project.softwareMeta?.lighthouse_score && (
                            <div className="flex gap-3 mb-3">
                              <span className="font-mono text-xs text-amber-300">LH {project.softwareMeta.lighthouse_score}</span>
                              {project.softwareMeta.page_load_ms && <span className="font-mono text-xs text-amber-300">{project.softwareMeta.page_load_ms}ms</span>}
                            </div>
                          )}
                          {project.category === "Fine Art" && project.artMeta?.price && (
                            <div className="mb-3">
                              <span className="font-mono text-sm text-rose-300 font-semibold">${project.artMeta.price}</span>
                              {project.artMeta.is_available && <span className="ml-2 font-mono text-xs text-emerald-300">Available</span>}
                            </div>
                          )}
                          <div className="flex gap-2 mb-4 flex-wrap justify-center">
                            {project.tags.slice(0, 3).map(tag => <span key={tag} className={`px-3 py-1 rounded-full ${style.badge} font-mono text-xs`}>{tag}</span>)}
                          </div>
                          <button className={`inline-flex items-center gap-1 ${style.accent} font-mono text-xs hover:underline`}>
                            <Eye size={12} /> View Details
                          </button>
                        </div>
                      </div>

                      {/* Card footer */}
                      <div className="p-4 border-t border-border">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <span className={`${style.accent} font-mono text-xs uppercase`}>{project.category}</span>
                            <h3 className="font-display font-semibold text-foreground text-sm mt-0.5 truncate">{project.title}</h3>
                            {project.category === "Web Dev"     && project.softwareMeta && <AnalyticsBadges   meta={project.softwareMeta} />}
                            {project.category === "Fine Art"    && project.artMeta      && <ArtBadges         meta={project.artMeta}      />}
                            {project.category === "Design"      && project.designMeta   && <DesignBadges      meta={project.designMeta}   />}
                            {project.category === "Photography" && project.designMeta   && <PhotographyBadges meta={project.designMeta}   />}
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0 mt-1">
                            {project.links.slice(0, 3).map((link, li) => (
                              <a key={li} href={link.url} target="_blank" rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                className={`p-2 rounded-lg ${style.bg} ${style.accent} hover:scale-110 transition-transform`}
                                title={link.label}>
                                {linkIcon(link.link_type)}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && currentProject && (() => {
          const cs = getStyle(currentProject.category);
          const CI = cs.icon;
          return (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
              onClick={() => setLightbox(null)}
            >
              <button className="absolute top-6 right-6 text-foreground hover:text-primary z-10" onClick={() => setLightbox(null)}>
                <X size={28} />
              </button>

              <motion.div
                initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 30 }}
                className={`bg-card border ${cs.border} rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row`}
                onClick={e => e.stopPropagation()}
              >
                {/* Image side */}
                <div className="md:w-3/5 flex-shrink-0 relative bg-background/50">
                  {currentProject.images.length > 0 ? (
                    <AnimatePresence mode="wait">
                      <motion.div key={lightbox.imageIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                        <SafeImage
                          src={currentProject.images[lightbox.imageIdx]}
                          alt={`${currentProject.title} ${lightbox.imageIdx + 1}`}
                          className="w-full h-full object-cover max-h-[50vh] md:max-h-none"
                          fallback={
                            <div className={`w-full h-64 md:h-full ${cs.bg} flex items-center justify-center`}>
                              <CI size={64} className={`${cs.accent} opacity-20`} />
                            </div>
                          }
                        />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <div className={`w-full h-64 md:h-full ${cs.bg} flex items-center justify-center`}>
                      <CI size={64} className={`${cs.accent} opacity-20`} />
                    </div>
                  )}

                  {currentProject.images.length > 1 && (
                    <>
                      {lightbox.imageIdx > 0 && (
                        <button onClick={() => navigateImage(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 backdrop-blur-sm text-foreground hover:bg-background/90">
                          <ChevronLeft size={20} />
                        </button>
                      )}
                      {lightbox.imageIdx < currentProject.images.length - 1 && (
                        <button onClick={() => navigateImage(1)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 backdrop-blur-sm text-foreground hover:bg-background/90">
                          <ChevronRight size={20} />
                        </button>
                      )}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {currentProject.images.map((_, idx) => (
                          <button key={idx} onClick={() => setLightbox({ ...lightbox, imageIdx: idx })}
                            className={`w-2 h-2 rounded-full transition-all ${idx === lightbox.imageIdx ? "bg-primary scale-125" : "bg-foreground/30"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Info side */}
                <div className="p-6 md:p-8 flex flex-col justify-between md:w-2/5 overflow-y-auto">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CI size={14} className={cs.accent} />
                      <span className={`${cs.accent} font-mono text-xs uppercase tracking-wider`}>{currentProject.category}</span>
                      {currentProject.featured && <Star size={10} className="text-primary fill-primary" />}
                    </div>
                    <h2 className="font-display text-2xl font-bold text-foreground mt-1 mb-3">{currentProject.title}</h2>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{currentProject.description}</p>

                    {currentProject.category === "Web Dev" && currentProject.softwareMeta && (
                      <div className="mb-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                        <p className="font-mono text-xs text-amber-400 uppercase mb-2 flex items-center gap-1"><BarChart2 size={10} /> Analytics</p>
                        <div className="flex flex-wrap gap-2">
                          {currentProject.softwareMeta.lighthouse_score != null && <span className="text-amber-300 font-mono text-xs"><Zap size={10} className="inline mr-1" />LH {currentProject.softwareMeta.lighthouse_score}/100</span>}
                          {currentProject.softwareMeta.page_load_ms     != null && <span className="text-amber-300 font-mono text-xs">Load: {currentProject.softwareMeta.page_load_ms}ms</span>}
                          {currentProject.softwareMeta.monthly_visitors != null && <span className="text-amber-300 font-mono text-xs"><Users size={10} className="inline mr-1" />{currentProject.softwareMeta.monthly_visitors.toLocaleString()}/mo</span>}
                        </div>
                        {currentProject.softwareMeta.analytics_note && <p className="text-muted-foreground font-body text-xs mt-2 leading-relaxed">{currentProject.softwareMeta.analytics_note}</p>}
                      </div>
                    )}
                    {currentProject.category === "Fine Art" && currentProject.artMeta && (
                      <div className="mb-4 p-3 rounded-xl bg-rose-500/5 border border-rose-500/20">
                        <p className="font-mono text-xs text-rose-400 uppercase mb-2">Artwork Details</p>
                        <div className="space-y-1 text-xs font-mono text-rose-300">
                          {currentProject.artMeta.medium     && <div>Medium: {currentProject.artMeta.medium}</div>}
                          {currentProject.artMeta.dimensions && <div>Size: {currentProject.artMeta.dimensions}</div>}
                          {currentProject.artMeta.year       && <div>Year: {currentProject.artMeta.year}</div>}
                          {currentProject.artMeta.price != null && (
                            <div className="text-sm font-semibold text-rose-200 mt-1">
                              ${currentProject.artMeta.price} USD
                              {currentProject.artMeta.is_available ? <span className="ml-2 text-emerald-400">· Available</span> : <span className="ml-2 text-muted-foreground">· Sold</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {currentProject.category === "Design" && currentProject.designMeta && (
                      <div className="mb-4 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                        <p className="font-mono text-xs text-cyan-400 uppercase mb-2">Design Details</p>
                        <div className="flex flex-wrap gap-1.5">
                          {(currentProject.designMeta.software ?? []).map(sw => <span key={sw} className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-xs">{sw}</span>)}
                          {currentProject.designMeta.client_name && <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-xs">Client: {currentProject.designMeta.client_name}</span>}
                        </div>
                      </div>
                    )}
                    {currentProject.category === "Photography" && currentProject.designMeta && (
                      <div className="mb-4 p-3 rounded-xl bg-violet-500/5 border border-violet-500/20">
                        <p className="font-mono text-xs text-violet-400 uppercase mb-2 flex items-center gap-1"><Camera size={10} /> Photography Details</p>
                        <div className="flex flex-wrap gap-1.5">
                          {(currentProject.designMeta.software ?? []).map(eq => <span key={eq} className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 font-mono text-xs">{eq}</span>)}
                          {currentProject.designMeta.client_name && <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 font-mono text-xs">Series: {currentProject.designMeta.client_name}</span>}
                          {currentProject.designMeta.year        && <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 font-mono text-xs">{currentProject.designMeta.year}</span>}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-5">
                      {currentProject.tags.map(tag => <span key={tag} className={`px-3 py-1 rounded-full ${cs.badge} font-mono text-xs`}>{tag}</span>)}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col gap-2">
                    {currentProject.links.map((link, li) => (
                      <a key={li} href={link.url} target="_blank" rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider ${cs.bg} ${cs.accent} border ${cs.border} hover:scale-[1.02] transition-transform`}>
                        {linkIcon(link.link_type)} {link.label}
                      </a>
                    ))}
                    {currentProject.category === "Fine Art" && currentProject.artMeta?.shop_url && currentProject.artMeta.shop_url !== "#" && !currentProject.links.some(l => l.link_type === "shop") && (
                      <a href={currentProject.artMeta.shop_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:scale-[1.02] transition-transform">
                        <ShoppingCart size={14} /> Purchase This Piece
                      </a>
                    )}
                    {currentProject.category === "Web Dev" && currentProject.softwareMeta?.live_url && !currentProject.links.some(l => l.link_type === "live") && (
                      <a href={currentProject.softwareMeta.live_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:scale-[1.02] transition-transform">
                        <Globe size={14} /> Visit Live Site
                      </a>
                    )}
                    {currentProject.category === "Photography" && currentProject.designMeta?.behance_url && !currentProject.links.some(l => l.link_type === "live") && (
                      <a href={currentProject.designMeta.behance_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider bg-violet-500/10 text-violet-300 border border-violet-500/30 hover:scale-[1.02] transition-transform">
                        <ExternalLink size={14} /> View Gallery
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;