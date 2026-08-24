// src/pages/Index.tsx

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValue,
  useInView,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState, useCallback } from "react";
import {
  ArrowRight,
  Code,
  Palette,
  PenTool,
  GraduationCap,
  ChevronDown,
  Sparkles,
  Zap,
  Star,
  ExternalLink,
  Terminal,
  Brush,
} from "lucide-react";
import TypewriterEffect from "@/components/TypewriterEffect";
import StatCounter from "@/components/StatCounter";
import heroPortrait from "@/assets/kelvin-portrait.jpg";

/* ─────────────────────────────── DATA ─────────────────────────────── */

const disciplines = [
  {
    icon: Code,
    title: "Software Development",
    desc: "Full-stack web apps with Python, Java & Next.js",
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    hoverBorder: "hover:border-amber-500/50",
    glow: "hsl(38 95% 58% / 0.2)",
    tag: "01 — DEV",
    gradient: "from-amber-500/20 to-orange-500/5",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Brand identities, UI/UX & marketing materials",
    accent: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    hoverBorder: "hover:border-cyan-500/50",
    glow: "hsl(190 90% 50% / 0.2)",
    tag: "02 — DESIGN",
    gradient: "from-cyan-500/20 to-sky-500/5",
  },
  {
    icon: PenTool,
    title: "Fine Art",
    desc: "Hyperrealistic ballpoint pen art & portraiture",
    accent: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    hoverBorder: "hover:border-rose-500/50",
    glow: "hsl(350 80% 55% / 0.2)",
    tag: "03 — ART",
    gradient: "from-rose-500/20 to-pink-500/5",
  },
  {
    icon: GraduationCap,
    title: "Vocational Training",
    desc: "Empowering the next generation of creatives",
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/50",
    glow: "hsl(150 70% 45% / 0.2)",
    tag: "04 — TEACH",
    gradient: "from-emerald-500/20 to-teal-500/5",
  },
];

const portfolioItems = [
  {
    label: "Web Development",
    sub: "Full-stack Applications",
    glow: "hsl(38 95% 58% / 0.5)",
    gradient: "radial-gradient(circle at 30% 70%, hsl(38 95% 58% / 0.35), transparent 65%)",
    accent: "text-amber-400",
    tag: "Next.js · Python · APIs",
    num: "01",
  },
  {
    label: "Graphic Design",
    sub: "Brand & Visual Identity",
    glow: "hsl(190 90% 50% / 0.5)",
    gradient: "radial-gradient(circle at 70% 30%, hsl(190 90% 50% / 0.35), transparent 65%)",
    accent: "text-cyan-400",
    tag: "Figma · Illustrator · Branding",
    num: "02",
  },
  {
    label: "Fine Art",
    sub: "Hyperrealistic Portraiture",
    glow: "hsl(350 80% 55% / 0.5)",
    gradient: "radial-gradient(circle at 50% 50%, hsl(350 80% 55% / 0.35), transparent 65%)",
    accent: "text-rose-400",
    tag: "Ballpoint · Graphite · Canvas",
    num: "03",
  },
];

/* ───────────────────────── CURSOR FOLLOWER ────────────────────────── */

const CursorGlow = () => {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 120, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full z-0 hidden lg:block"
      style={{
        x: springX,
        y: springY,
        background: "radial-gradient(circle, hsl(38 95% 58% / 0.06) 0%, transparent 70%)",
      }}
    />
  );
};

/* ──────────────────────── NOISE OVERLAY ──────────────────────────── */

const NoiseOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      backgroundSize: "128px",
    }}
  />
);

/* ───────────────────────────── PARTICLES ──────────────────────────── */

const Particle = ({ delay, x, y, size = 1 }: { delay: number; x: number; y: number; size?: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{ left: `${x}%`, top: `${y}%`, width: `${size}px`, height: `${size}px`, background: "hsl(38 95% 65%)" }}
    animate={{ y: [0, -80, -160], opacity: [0, 0.7, 0], scale: [0, 1, 0] }}
    transition={{ duration: 4 + Math.random() * 2, delay, repeat: Infinity, repeatDelay: Math.random() * 5, ease: "easeOut" }}
  />
);

/* ──────────────────────────── ANIMATED ORB ────────────────────────── */

const Orb = ({ className, style, delay = 0 }: { className: string; style: React.CSSProperties; delay?: number }) => (
  <motion.div
    className={className}
    style={style}
    animate={{ x: [0, 25, -12, 0], y: [0, -18, 12, 0], scale: [1, 1.06, 0.97, 1] }}
    transition={{ duration: 14, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* ──────────────────── TILT HOOK ───────────────────────────────────── */

function useTilt(maxDeg = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setTilt({
        x: ((e.clientY - rect.top - rect.height / 2) / rect.height) * maxDeg,
        y: -(((e.clientX - rect.left - rect.width / 2) / rect.width) * maxDeg),
      });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxDeg]);

  return { ref, tilt };
}

/* ──────────────────── DISCIPLINE CARD ────────────────────────────── */

const DisciplineCard = ({ d, i }: { d: (typeof disciplines)[0]; i: number }) => {
  const { ref, tilt } = useTilt(5);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease",
          boxShadow: hovered ? `0 24px 50px -8px ${d.glow}` : "none",
        }}
        className={`group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border ${d.border} ${d.hoverBorder} transition-colors duration-300 overflow-hidden cursor-default h-full`}
      >
        {/* Gradient fill */}
        <div className={`absolute inset-0 bg-gradient-to-br ${d.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Shimmer line */}
        {hovered && (
          <motion.div
            className="absolute top-0 left-0 w-full h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${d.glow.replace("0.2", "1")}, transparent)` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        )}

        {/* Tag */}
        <span className={`relative z-10 inline-block font-mono text-[9px] tracking-[0.22em] ${d.accent} opacity-50 mb-4`}>
          {d.tag}
        </span>

        {/* Icon */}
        <div className={`relative z-10 w-11 h-11 rounded-xl ${d.bg} flex items-center justify-center mb-4`}>
          <d.icon size={20} className={d.accent} strokeWidth={1.5} />
          {hovered && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{ border: `1px solid ${d.glow.replace("0.2", "0.7")}` }}
              animate={{ scale: [1, 1.6, 2.2], opacity: [0.7, 0.3, 0] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            />
          )}
        </div>

        <h3 className="relative z-10 font-semibold text-base text-foreground mb-1.5 tracking-tight">
          {d.title}
        </h3>
        <p className="relative z-10 text-muted-foreground text-sm leading-relaxed mb-4">
          {d.desc}
        </p>

        <Link
          to="/services"
          className={`relative z-10 ${d.accent} font-mono text-[11px] inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0`}
        >
          Explore <ArrowRight size={10} />
        </Link>
      </div>
    </motion.div>
  );
};

/* ──────────────────── PORTFOLIO CARD ─────────────────────────────── */

const PortfolioCard = ({ item, i }: { item: (typeof portfolioItems)[0]; i: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border hover:border-white/10 transition-colors duration-500 cursor-pointer"
    >
      {/* Number watermark */}
      <div
        className="absolute top-4 right-5 font-mono text-[11px] tracking-[0.2em] text-muted-foreground/20 group-hover:text-muted-foreground/40 transition-colors duration-500 select-none"
      >
        {item.num}
      </div>

      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 opacity-25 group-hover:opacity-60 transition-opacity duration-700"
        style={{ background: item.gradient }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className={`font-mono text-[9px] tracking-[0.22em] ${item.accent} opacity-60`}>
            {item.tag}
          </span>
          <motion.div
            animate={hovered ? { rotate: -45, scale: 1.15 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ExternalLink size={13} className="text-muted-foreground/30 group-hover:text-foreground/50 transition-colors" />
          </motion.div>
        </div>

        <div>
          <p className="text-muted-foreground/50 font-mono text-[11px] mb-1 tracking-wide">{item.sub}</p>
          <h3 className="font-bold text-lg text-foreground/25 group-hover:text-foreground/65 transition-colors duration-500 tracking-tight">
            {item.label}
          </h3>
        </div>
      </div>

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Corner glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full blur-2xl"
            style={{ background: item.glow }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.35 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ────────────────────────── SECTION LABEL ─────────────────────────── */

const SectionLabel = ({ index, label }: { index: string; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center gap-2 mb-10"
  >
    <div className="flex items-center gap-3">
      <div className="h-px w-6 bg-border/60" />
      <span className="font-mono text-[9px] tracking-[0.28em] text-muted-foreground/60 uppercase">
        {index} · {label}
      </span>
      <div className="h-px w-6 bg-border/60" />
    </div>
    <div
      className="w-px h-6"
      style={{ background: "linear-gradient(to bottom, hsl(38 95% 58% / 0.5), transparent)" }}
    />
  </motion.div>
);

/* ──────────────────────── STATS ROW ───────────────────────────────── */

const stats = [
  { end: 4, label: "Disciplines", suffix: "" },
  { end: 50, label: "Projects", suffix: "+" },
  { end: 5, label: "Years Exp.", suffix: "+" },
  { end: 100, label: "Students", suffix: "+" },
];

/* ─────────────────────────────── PAGE ──────────────────────────────── */

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const heroY = useTransform(scrollY, [0, 450], [0, 60]);
  const portraitScale = useTransform(scrollY, [0, 400], [1, 0.92]);
  const portraitY = useTransform(scrollY, [0, 400], [0, 40]);

  const springHeroY = useSpring(heroY, { stiffness: 90, damping: 22 });
  const springPortraitY = useSpring(portraitY, { stiffness: 70, damping: 18 });

  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    delay: i * 0.45,
    x: 5 + Math.random() * 90,
    y: 10 + Math.random() * 80,
    size: Math.random() > 0.6 ? 2 : 1,
  }));

  return (
    <div className="relative">
      <CursorGlow />
      <NoiseOverlay />

      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">

        {/* Animated grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: "linear-gradient(hsl(36 90% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(36 90% 55%) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />

        {particles.map((p) => <Particle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />)}

        <Orb
          className="absolute -top-10 -left-20 w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(38 95% 58% / 0.08), transparent 70%)", filter: "blur(70px)" }}
        />
        <Orb
          className="absolute bottom-0 right-0 w-[650px] h-[650px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(16 88% 60% / 0.06), transparent 70%)", filter: "blur(90px)" }}
          delay={5}
        />

        {/* Ghost watermark */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(160px, 28vw, 480px)", color: "hsl(38 95% 58% / 0.02)", letterSpacing: "-0.05em" }}
          animate={{ scale: [1, 1.012, 1], rotate: [0, 0.25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          KB
        </motion.div>

        <motion.div
          style={{ y: springHeroY, opacity: heroOpacity }}
          className="container mx-auto px-6 pt-24 pb-16 relative z-10"
        >
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">

            {/* ── LEFT: TEXT ── */}
            <div className="max-w-2xl">

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 1.6 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                  Available for freelance · Eldoret, Kenya
                </span>
              </motion.div>

              {/* Name reveal */}
              <div className="overflow-hidden mb-1">
                <motion.div
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-black text-[clamp(2.6rem,6.5vw,5rem)] text-foreground leading-[0.95] tracking-tight"
                >
                  Hello, I'm
                </motion.div>
              </div>
              <div className="overflow-hidden mb-6">
                <motion.div
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 1.98, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-black text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.95] tracking-tight shimmer-text pb-2"
                >
                  Kelvin Bugigi
                </motion.div>
              </div>

              {/* Typewriter */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="h-8 mb-6">
                <TypewriterEffect />
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 2.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="origin-left w-14 h-px mb-6"
                style={{ background: "linear-gradient(90deg, hsl(38 95% 58%), hsl(16 88% 55%))" }}
              />

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3, duration: 0.65 }}
                className="text-muted-foreground text-[1rem] max-w-md leading-relaxed mb-9"
              >
                A multidisciplinary creative — crafting code, designing visuals,
                and creating art that bridges technology and human expression.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.65 }}
                className="flex flex-wrap gap-3 mb-12"
              >
                <Link
                  to="/portfolio"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-primary-foreground overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, hsl(38 95% 58%), hsl(16 88% 50%))",
                    boxShadow: "0 6px 28px hsl(38 95% 58% / 0.32)",
                  }}
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative z-10 flex items-center gap-2">
                    View My Work
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                      <ArrowRight size={14} />
                    </motion.span>
                  </span>
                </Link>

                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold text-sm hover:border-primary/35 hover:bg-primary/5 transition-all duration-300"
                >
                  Get In Touch
                  <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} className="grid grid-cols-4 gap-4">
                {stats.map((s) => (
                  <StatCounter key={s.label} end={s.end} label={s.label} />
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: PORTRAIT ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 8 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.0, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: springPortraitY, scale: portraitScale }}
              className="relative flex justify-center mt-10 lg:mt-0"
            >
              <div className="relative">
                {/* Rotating rings */}
                <div className="absolute inset-0 -m-6 sm:-m-8 lg:-m-10 pointer-events-none">
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/10"
                    style={{ borderStyle: "dashed" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-5 sm:inset-6 lg:inset-7 rounded-full border border-primary/5"
                    style={{ borderStyle: "dotted" }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* Corner accents */}
                {["-top-3 -left-3 border-t-2 border-l-2 rounded-tl-full", "-bottom-3 -right-3 border-b-2 border-r-2 rounded-br-full"].map(
                  (cls, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-10 h-10 sm:w-12 sm:h-12 border-primary/${i === 0 ? "55" : "30"} ${cls}`}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2.5, delay: i * 1.2, repeat: Infinity }}
                    />
                  )
                )}

                {/* Portrait — circular, responsive, always visible */}
                <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden pulse-glow relative border-2 border-primary/20 shrink-0 mx-auto">
                  <img
                    src={heroPortrait}
                    alt="Kelvin Bugigi"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, hsl(222 28% 8% / 0.35) 0%, transparent 55%)" }}
                  />
                </div>

                {/* Floating badges — hidden on small screens to avoid overlap/clipping */}
                {[
                  { icon: Sparkles, label: "Next.js", pos: "-left-4 top-6 sm:-left-14 sm:top-10 lg:-left-18 lg:top-12", color: "text-primary border-primary/30", dir: -7 },
                  { icon: Palette, label: "Blender 3D", pos: "-right-4 top-1/3 sm:-right-12 lg:-right-16", color: "text-cyan-400 border-cyan-500/30", dir: 8 },
                  { icon: PenTool, label: "Fine Art", pos: "-left-4 bottom-10 sm:-left-10 sm:bottom-14 lg:-left-12 lg:bottom-16", color: "text-rose-400 border-rose-500/30", dir: -6 },
                ].map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    className={`hidden sm:flex absolute ${badge.pos} items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-card/90 backdrop-blur-md border ${badge.color} font-mono text-[10px] shadow-xl`}
                    animate={{ y: [0, badge.dir, 0] }}
                    transition={{ duration: 3 + i * 0.5, delay: i * 0.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <badge.icon size={9} />
                    {badge.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          >
            <span className="text-muted-foreground font-mono text-[8px] tracking-[0.4em] uppercase">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown size={13} className="text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════ MARQUEE ═══════════════════════════ */}
      <div className="overflow-hidden py-4 border-y border-border/25 bg-card/15">
        <motion.div
          className="flex whitespace-nowrap gap-12 font-mono text-[10px] tracking-[0.22em] text-muted-foreground/25 uppercase"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {Array(10)
            .fill("Kelvin Bugigi · Creative Developer · Fine Artist · Educator ·")
            .map((t, i) => <span key={i}>{t}</span>)}
        </motion.div>
      </div>

      {/* ═══════════════════════ ABOUT PREVIEW ════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, hsl(38 95% 58% / 0.04), transparent 70%)", filter: "blur(60px)" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <SectionLabel index="01" label="About Me" />

          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="font-display font-black text-[clamp(1.85rem,4.5vw,3.4rem)] text-foreground leading-[1.06] tracking-tight text-center mb-5"
            >
              Crafting at the intersection of{" "}
              <br className="hidden md:block" />
              <span className="text-gradient">code & canvas</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.65 }}
              className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed text-center mb-8"
            >
              I'm Kelvin Bugigi — a multidisciplinary creative based in Eldoret, Kenya. I build
              full-stack applications, design compelling visuals, and create fine art that
              bridges technology and human expression.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex justify-center"
            >
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary font-mono text-xs hover:underline underline-offset-4"
                >
                  More About Me <ArrowRight size={12} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ DISCIPLINES ═══════════════════════════ */}
      <section className="py-20 relative">
        {/* Vertical rule lines */}
        {[1 / 4, 3 / 4].map((pos, i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-px opacity-[0.04] pointer-events-none"
            style={{
              left: `${pos * 100}%`,
              background: `linear-gradient(to bottom, transparent, hsl(${i === 0 ? "38 95% 58%" : "16 88% 60%"}), transparent)`,
            }}
          />
        ))}

        <div className="container mx-auto px-6 relative z-10">
          <SectionLabel index="02" label="What I Do" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-black text-[clamp(1.85rem,4.5vw,3.4rem)] text-foreground tracking-tight">
              Four Disciplines,{" "}
              <span className="text-gradient">One Vision</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {disciplines.map((d, i) => (
              <DisciplineCard key={d.title} d={d} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ FEATURED WORK ══════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[350px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom right, hsl(16 88% 60% / 0.05), transparent 70%)", filter: "blur(80px)" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <SectionLabel index="03" label="Selected Work" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-black text-[clamp(1.85rem,4.5vw,3.4rem)] text-foreground tracking-tight mb-4">
              Work I'm <span className="text-gradient">Proud Of</span>
            </h2>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm">
              A curated selection across disciplines — full portfolio coming soon.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
            {portfolioItems.map((item, i) => (
              <PortfolioCard key={item.label} item={item} i={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/portfolio"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-primary-foreground overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(38 95% 58%), hsl(16 88% 50%))",
                boxShadow: "0 6px 28px hsl(38 95% 58% / 0.25)",
              }}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
              <span className="relative z-10 flex items-center gap-2">
                Browse Full Portfolio <ArrowRight size={12} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════ CTA ════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="bg-gradient-amber-subtle absolute inset-0" />
          <motion.div
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: "linear-gradient(hsl(38 95% 58%) 1px, transparent 1px), linear-gradient(90deg, hsl(38 95% 58%) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
            animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, hsl(38 95% 58% / 0.07), transparent 70%)", filter: "blur(60px)" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="max-w-xl mx-auto text-center"
          >
            <motion.div
              animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Star size={24} className="text-primary mx-auto" strokeWidth={1.5} />
            </motion.div>

            <h2 className="font-display font-black text-[clamp(1.85rem,4.5vw,3.4rem)] text-foreground tracking-tight mb-4">
              Let's Create <span className="text-gradient">Together</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-sm mx-auto mb-10 leading-relaxed">
              Whether it's code, design, or canvas — I bring ideas to life with precision and passion.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/portfolio"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-primary-foreground overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, hsl(38 95% 58%), hsl(16 88% 50%))",
                  boxShadow: "0 6px 28px hsl(38 95% 58% / 0.32)",
                }}
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10">View Portfolio</span>
              </Link>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold text-sm hover:border-primary/35 hover:bg-primary/5 transition-all duration-300"
              >
                Get In Touch
                <Zap size={12} className="text-primary opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;