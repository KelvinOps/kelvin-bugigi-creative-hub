//src/pages/Skills.tsx

import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";

const skillCategories = [
  {
    title: "Software Development",
    color: "from-amber-500 to-yellow-400",
    glow: "hsl(36 90% 55% / 0.3)",
    borderAccent: "border-amber-500/30",
    textAccent: "text-amber-400",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 85 },
      { name: "Next.js / React", level: 88 },
      { name: "TypeScript", level: 82 },
    ],
  },
  {
    title: "Graphic Design",
    color: "from-cyan-500 to-blue-400",
    glow: "hsl(190 90% 50% / 0.3)",
    borderAccent: "border-cyan-500/30",
    textAccent: "text-cyan-400",
    skills: [
      { name: "Photoshop", level: 92 },
      { name: "Blender 3D", level: 80 },
      { name: "UI/UX Design", level: 78 },
      { name: "Animation", level: 75 },
    ],
  },
  {
    title: "Fine Art",
    color: "from-rose-500 to-pink-400",
    glow: "hsl(350 80% 55% / 0.3)",
    borderAccent: "border-rose-500/30",
    textAccent: "text-rose-400",
    skills: [
      { name: "Ballpoint Art", level: 95 },
      { name: "Pencil Drawing", level: 93 },
      { name: "Painting", level: 85 },
      { name: "Portraiture", level: 90 },
    ],
  },
  {
    title: "Training & Education",
    color: "from-emerald-500 to-green-400",
    glow: "hsl(150 70% 45% / 0.3)",
    borderAccent: "border-emerald-500/30",
    textAccent: "text-emerald-400",
    skills: [
      { name: "Curriculum Design", level: 88 },
      { name: "Technical Instruction", level: 90 },
      { name: "Mentorship", level: 85 },
      { name: "Workshop Facilitation", level: 82 },
    ],
  },
];

const tools = [
  "Python", "Java", "Next.js", "React", "TypeScript", "Photoshop",
  "Blender", "Figma", "Git", "PostgreSQL", "Docker", "Tailwind CSS",
];

const Skills = () => {
  return (
    <div>
      <PageHeader
        section="Skills"
        sectionNumber="02"
        title="Skills & Abilities"
        subtitle="A deep dive into the tools, technologies, and techniques I've mastered across multiple disciplines."
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">My Expertise</span>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
                className={`p-6 rounded-2xl bg-card border ${cat.borderAccent} hover:border-opacity-60 transition-colors`}
              >
                <h3 className={`font-mono text-xs uppercase tracking-[0.2em] ${cat.textAccent} mb-6`}>{cat.title}</h3>
                <div className="space-y-5">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-foreground font-display text-sm font-medium">{skill.name}</span>
                        <span className="text-muted-foreground font-mono text-xs">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                          style={{ boxShadow: `0 0 10px ${cat.glow}` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">Tools & Technologies</span>
            <div className="w-12 h-0.5 bg-gradient-amber mx-auto mt-3 mb-10" />
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-5 py-2.5 rounded-full bg-secondary border border-border text-foreground font-mono text-xs hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
