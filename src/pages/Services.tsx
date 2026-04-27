// src/pages/Services.tsx — UPGRADED with animations & visual redesign

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Palette, Box, PenTool, Layout, GraduationCap, CheckCircle2, Zap } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const services = [
  {
    icon: Code,
    number: "01",
    title: "Web Development",
    desc: "Building responsive, scalable web applications using Python, Java, and Next.js with modern best practices.",
    items: ["Full-stack apps", "REST APIs", "Database design", "Deployment"],
    accent: "text-amber-400",
    bg: "bg-amber-500/8",
    border: "border-amber-500/20",
    glow: "hsl(38 95% 58% / 0.2)",
    tags: ["Python", "Java", "Next.js", "PostgreSQL"],
  },
  {
    icon: Palette,
    number: "02",
    title: "Graphic Design",
    desc: "Creating stunning visuals, brand identities, and marketing materials using Photoshop and modern design tools.",
    items: ["Brand identity", "Social media", "Print design", "Packaging"],
    accent: "text-cyan-400",
    bg: "bg-cyan-500/8",
    border: "border-cyan-500/20",
    glow: "hsl(190 90% 50% / 0.2)",
    tags: ["Photoshop", "Illustrator", "Branding", "Print"],
  },
  {
    icon: Box,
    number: "03",
    title: "3D & Animation",
    desc: "Crafting 3D models, characters, and animations in Blender for games, ads, and creative projects.",
    items: ["3D modeling", "Character design", "Motion graphics", "Rendering"],
    accent: "text-violet-400",
    bg: "bg-violet-500/8",
    border: "border-violet-500/20",
    glow: "hsl(270 70% 55% / 0.2)",
    tags: ["Blender", "3D Modeling", "Animation", "VFX"],
  },
  {
    icon: PenTool,
    number: "04",
    title: "Fine Art Commissions",
    desc: "Hyperrealistic ballpoint, pencil portraits, and custom paintings — each piece a one-of-a-kind creation.",
    items: ["Portraits", "Landscapes", "Custom pieces", "Gallery work"],
    accent: "text-rose-400",
    bg: "bg-rose-500/8",
    border: "border-rose-500/20",
    glow: "hsl(350 80% 55% / 0.2)",
    tags: ["Ballpoint", "Pencil", "Oil Paint", "Commissions"],
  },
  {
    icon: Layout,
    number: "05",
    title: "UI/UX Design",
    desc: "Designing intuitive, beautiful user interfaces that balance aesthetics with seamless user experience.",
    items: ["Wireframes", "Prototypes", "User research", "Design systems"],
    accent: "text-blue-400",
    bg: "bg-blue-500/8",
    border: "border-blue-500/20",
    glow: "hsl(210 90% 60% / 0.2)",
    tags: ["Figma", "Wireframes", "Prototyping", "UX Research"],
  },
  {
    icon: GraduationCap,
    number: "06",
    title: "Training & Workshops",
    desc: "Technical and vocational training in software development, design tools, and creative arts.",
    items: ["Curriculum", "Hands-on labs", "Mentoring", "Certification prep"],
    accent: "text-emerald-400",
    bg: "bg-emerald-500/8",
    border: "border-emerald-500/20",
    glow: "hsl(150 70% 45% / 0.2)",
    tags: ["Curriculum", "Mentorship", "Workshops", "Certification"],
  },
];

// Service card with flip animation on hover
const ServiceCard = ({
  s,
  i,
}: {
  s: (typeof services)[0];
  i: number;
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ perspective: "1000px", minHeight: 240 }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
    >
      {/* Front */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0, opacity: flipped ? 0 : 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative p-4 rounded-2xl bg-card border ${s.border} overflow-hidden h-full`}
        style={{
          backfaceVisibility: "hidden",
          boxShadow: flipped ? `0 20px 50px ${s.glow}` : "none",
          position: flipped ? "absolute" : "relative",
          width: "100%",
        }}
      >
        <span className="absolute top-3 right-3 font-display font-bold text-6xl text-foreground/[0.04] select-none">
          {s.number}
        </span>

        <motion.div
          className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center mb-3`}
          animate={flipped ? { rotate: 15, scale: 0.9 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <s.icon size={24} className={s.accent} />
        </motion.div>

        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-2">{s.title}</h3>
        <p className="text-muted-foreground font-body text-sm leading-relaxed mb-3">{s.desc}</p>

        <ul className="space-y-1">
          {s.items.map((item) => (
            <li key={item} className="text-muted-foreground font-mono text-xs flex items-center gap-2">
              <span className={`w-1 h-1 rounded-full ${s.accent.replace("text-", "bg-")}`} />
              {item}
            </li>
          ))}
        </ul>

        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.accent.replace("text-", "from-").replace("-400", "-400")} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
      </motion.div>

      {/* Back — revealed on hover */}
      <motion.div
        animate={{ rotateY: flipped ? 0 : -180, opacity: flipped ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute inset-0 p-4 rounded-2xl ${s.bg} border ${s.border} overflow-hidden flex flex-col justify-between`}
        style={{
          backfaceVisibility: "hidden",
          boxShadow: `0 20px 50px ${s.glow}`,
        }}
      >
        <div>
          <s.icon size={20} className={`${s.accent} mb-3`} />
          <h3 className={`font-display font-bold text-base ${s.accent} mb-2`}>{s.title}</h3>

          <div className="space-y-1.5 mb-3">
            {s.items.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={12} className={s.accent} />
                <span className="text-foreground font-body text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1">
            {s.tags.map((tag) => (
              <span
                key={tag}
                className={`px-1.5 py-0.5 rounded-full ${s.bg} border ${s.border} ${s.accent} font-mono text-[10px]`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <Link
          to="/contact"
          className={`inline-flex items-center gap-2 ${s.accent} font-mono text-xs mt-3 hover:underline`}
        >
          <Zap size={11} /> Start a Project <ArrowRight size={11} />
        </Link>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <div>
      <PageHeader
        section="Services"
        sectionNumber="04"
        title="Services"
        subtitle="Professional services across software development, design, art, and education."
      />

      {/* ── SERVICES GRID ── */}
      <section className="py-10 relative">
        {/* Animated grid bg */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
          <motion.div
            style={{
              backgroundImage:
                "linear-gradient(hsl(38 95% 58%) 1px, transparent 1px), linear-gradient(90deg, hsl(38 95% 58%) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              inset: 0,
              position: "absolute",
            }}
            animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
              What I Offer
            </span>
            <div
              className="w-16 h-0.5 mx-auto mt-2 mb-4 rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(38 95% 58%), hsl(16 88% 60%))" }}
            />
            <p className="text-muted-foreground font-body text-sm max-w-md mx-auto">
              Hover each card to explore what's included
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-10 bg-card/20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
              How We Work
            </span>
            <div
              className="w-16 h-0.5 mx-auto mt-2 mb-4 rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(38 95% 58%), hsl(16 88% 60%))" }}
            />
            <h2 className="font-display font-bold text-2xl text-foreground">
              My <span className="text-gradient">Process</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-0">
            {["Discover", "Design", "Develop", "Deliver"].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex-1 relative"
              >
                {/* Connector */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-5 left-full w-full h-px z-0">
                    <motion.div
                      className="h-full"
                      style={{ background: "linear-gradient(90deg, hsl(38 95% 58% / 0.4), transparent)" }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                    />
                  </div>
                )}

                <div className="text-center px-3 relative z-10">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gradient-amber flex items-center justify-center font-display font-bold text-primary-foreground text-xs mx-auto mb-3"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.div>
                  <h3 className="font-display font-semibold text-foreground mb-1.5">{step}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {[
                      "Understanding your goals, audience, and requirements",
                      "Crafting beautiful, purposeful solutions",
                      "Building with quality code and attention to detail",
                      "Launching and supporting your project",
                    ][i]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-10 relative">
        <div className="absolute inset-0 bg-gradient-amber-subtle" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-2xl text-foreground mb-3">
              Interested in working together?
            </h2>
            <p className="text-muted-foreground font-body text-base mb-6">
              Let's turn your ideas into reality.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, hsl(38 95% 58%), hsl(16 88% 55%))",
                  boxShadow: "0 8px 24px hsl(38 95% 58% / 0.3)",
                }}
              >
                Start a Conversation <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;