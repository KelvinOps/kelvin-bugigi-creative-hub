// src/pages/Skills.tsx — UPGRADED with animations & visual redesign

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";

const skillCategories = [
  {
    title: "Software Development",
    color: "from-amber-500 to-yellow-400",
    solidColor: "hsl(38 95% 58%)",
    glow: "hsl(36 90% 55% / 0.35)",
    borderAccent: "border-amber-500/25",
    textAccent: "text-amber-400",
    bgAccent: "bg-amber-500/8",
    skills: [
      { name: "Python",          level: 90 },
      { name: "Java",            level: 85 },
      { name: "Next.js / React", level: 88 },
      { name: "TypeScript",      level: 82 },
    ],
  },
  {
    title: "Graphic Design",
    color: "from-cyan-500 to-blue-400",
    solidColor: "hsl(190 90% 50%)",
    glow: "hsl(190 90% 50% / 0.35)",
    borderAccent: "border-cyan-500/25",
    textAccent: "text-cyan-400",
    bgAccent: "bg-cyan-500/8",
    skills: [
      { name: "Photoshop",   level: 92 },
      { name: "Blender 3D",  level: 80 },
      { name: "UI/UX Design",level: 78 },
      { name: "Animation",   level: 75 },
    ],
  },
  {
    title: "Fine Art",
    color: "from-rose-500 to-pink-400",
    solidColor: "hsl(350 80% 55%)",
    glow: "hsl(350 80% 55% / 0.35)",
    borderAccent: "border-rose-500/25",
    textAccent: "text-rose-400",
    bgAccent: "bg-rose-500/8",
    skills: [
      { name: "Ballpoint Art",  level: 95 },
      { name: "Pencil Drawing", level: 93 },
      { name: "Painting",       level: 85 },
      { name: "Portraiture",    level: 90 },
    ],
  },
  {
    title: "Training & Education",
    color: "from-emerald-500 to-green-400",
    solidColor: "hsl(150 70% 45%)",
    glow: "hsl(150 70% 45% / 0.35)",
    borderAccent: "border-emerald-500/25",
    textAccent: "text-emerald-400",
    bgAccent: "bg-emerald-500/8",
    skills: [
      { name: "Curriculum Design",      level: 88 },
      { name: "Technical Instruction",  level: 90 },
      { name: "Mentorship",             level: 85 },
      { name: "Workshop Facilitation",  level: 82 },
    ],
  },
];

const tools = [
  { name: "Python",       category: "dev"    },
  { name: "Java",         category: "dev"    },
  { name: "Next.js",      category: "dev"    },
  { name: "React",        category: "dev"    },
  { name: "TypeScript",   category: "dev"    },
  { name: "Photoshop",    category: "design" },
  { name: "Blender",      category: "design" },
  { name: "Figma",        category: "design" },
  { name: "Git",          category: "dev"    },
  { name: "PostgreSQL",   category: "dev"    },
  { name: "Docker",       category: "dev"    },
  { name: "Tailwind CSS", category: "dev"    },
  { name: "Ballpoint",    category: "art"    },
  { name: "Graphite",     category: "art"    },
  { name: "Oil Paint",    category: "art"    },
  { name: "Prisma",       category: "dev"    },
];

const toolColors: Record<string, string> = {
  dev:    "border-amber-500/25 text-amber-300 bg-amber-500/8",
  design: "border-cyan-500/25 text-cyan-300 bg-cyan-500/8",
  art:    "border-rose-500/25 text-rose-300 bg-rose-500/8",
};

/* ── ANIMATED SKILL BAR ── */
const SkillBar = ({
  skill,
  cat,
  delay,
}: {
  skill: { name: string; level: number };
  cat: (typeof skillCategories)[0];
  delay: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-foreground text-sm font-medium">{skill.name}</span>
        <motion.span
          className={`font-mono text-xs ${cat.textAccent}`}
          animate={{ opacity: hovered ? 1 : 0.6 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
          style={{ boxShadow: hovered ? `0 0 10px ${cat.glow}` : "none" }}
        />
        {hovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 0.8 }}
          />
        )}
      </div>
    </div>
  );
};

/* ── SKILL CATEGORY CARD ── */
const SkillCard = ({
  cat,
  i,
}: {
  cat: (typeof skillCategories)[0];
  i: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`p-5 rounded-2xl bg-card border ${cat.borderAccent} transition-all duration-300 relative overflow-hidden`}
      style={{
        boxShadow: hovered ? `0 10px 36px ${cat.glow}` : "none",
        transition: "box-shadow 0.35s ease",
      }}
    >
      {/* Corner glow */}
      <motion.div
        className="absolute top-0 right-0 w-28 h-28 rounded-bl-full"
        style={{ background: `radial-gradient(circle at top right, ${cat.glow}, transparent 70%)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-1.5 h-7 rounded-full bg-gradient-to-b ${cat.color}`} />
        <h3 className={`font-mono text-[11px] uppercase tracking-[0.2em] ${cat.textAccent}`}>
          {cat.title}
        </h3>
      </div>

      <div className="space-y-4">
        {cat.skills.map((skill, si) => (
          <SkillBar key={skill.name} skill={skill} cat={cat} delay={0.25 + si * 0.08} />
        ))}
      </div>

      {/* Average score */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 + i * 0.1 }}
        className={`mt-5 pt-3.5 border-t ${cat.borderAccent} flex items-center justify-between`}
      >
        <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
          Avg Proficiency
        </span>
        <span className={`font-mono font-bold text-sm ${cat.textAccent}`}>
          {Math.round(cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length)}%
        </span>
      </motion.div>
    </motion.div>
  );
};

/* ── PAGE ── */
const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div>
      <PageHeader
        section="Skills"
        sectionNumber="02"
        title="Skills & Abilities"
        subtitle="A deep dive into the tools, technologies, and techniques I've mastered across multiple disciplines."
      />

      {/* ── SKILL CARDS ── */}
      <section className="py-16 relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-px opacity-20"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(38 95% 58%), transparent)" }}
        />

        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-muted-foreground font-mono text-[9px] tracking-widest uppercase">
              My Expertise
            </span>
            <div
              className="w-14 h-0.5 mx-auto mt-2.5 mb-0 rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(38 95% 58%), hsl(16 88% 60%))" }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {skillCategories.map((cat, i) => (
              <SkillCard key={cat.title} cat={cat} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RADIAL CHART ── */}
      <section className="py-16 bg-card/20 relative overflow-hidden" ref={sectionRef}>
        <motion.div style={{ opacity }} className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-muted-foreground font-mono text-[9px] tracking-widest uppercase">
              Skill Balance
            </span>
            <div
              className="w-14 h-0.5 mx-auto mt-2.5 mb-6 rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(38 95% 58%), hsl(16 88% 60%))" }}
            />
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight">
              Multidisciplinary <span className="text-gradient">Mastery</span>
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-64">
              {/* Animated rings */}
              {[1, 0.75, 0.5, 0.25].map((scale, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/10"
                  style={{ transform: `scale(${scale})` }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
                />
              ))}

              {/* Discipline dots */}
              {skillCategories.map((cat, i) => {
                const angle = (i / skillCategories.length) * Math.PI * 2 - Math.PI / 2;
                const r = 96;
                const x = 128 + r * Math.cos(angle);
                const y = 128 + r * Math.sin(angle);
                return (
                  <motion.div
                    key={cat.title}
                    className="absolute flex flex-col items-center gap-1"
                    style={{ left: x - 20, top: y - 20, width: 40 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 200 }}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${cat.bgAccent} border ${cat.borderAccent} flex items-center justify-center`}
                    >
                      <span className={`font-mono text-[10px] font-bold ${cat.textAccent}`}>
                        {Math.round(cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Center */}
              <motion.div
                className="absolute w-14 h-14 rounded-full bg-gradient-amber flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
              >
                <span className="font-display font-bold text-primary-foreground text-sm">KB</span>
              </motion.div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {skillCategories.map((cat) => (
              <div key={cat.title} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cat.color}`} />
                <span className="font-mono text-[10px] text-muted-foreground">{cat.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── TOOLS ── */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-muted-foreground font-mono text-[9px] tracking-widest uppercase">
              Tools & Technologies
            </span>
            <div
              className="w-14 h-0.5 mx-auto mt-2.5 mb-10 rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(38 95% 58%), hsl(16 88% 60%))" }}
            />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {tools.map((tool, i) => (
              <motion.span
                key={tool.name}
                initial={{ opacity: 0, scale: 0.7, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className={`px-3.5 py-1.5 rounded-full border font-mono text-xs cursor-default transition-all ${toolColors[tool.category]}`}
              >
                {tool.name}
              </motion.span>
            ))}
          </div>

          {/* Filter legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center gap-5 mt-7"
          >
            {[
              { label: "Development", cls: "text-amber-400" },
              { label: "Design",      cls: "text-cyan-400"  },
              { label: "Art",         cls: "text-rose-400"  },
            ].map((f) => (
              <span key={f.label} className={`font-mono text-[10px] ${f.cls} flex items-center gap-1.5`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {f.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Skills;