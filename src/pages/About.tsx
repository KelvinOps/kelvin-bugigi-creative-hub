// src/pages/About.tsx — UPGRADED with advanced animations & visual redesign

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, GraduationCap, Briefcase, Heart, BookOpen,
  Sparkles, Code, Palette, PenTool,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatCounter from "@/components/StatCounter";
import heroPortrait from "@/assets/kelvin-portrait.jpg";

const journey = [
  {
    icon: GraduationCap,
    title: "Education",
    subtitle: "Technical & Vocational Training",
    desc: "Completed advanced training in software development, graphic design, and fine arts with certifications in multiple disciplines.",
    year: "2018 – 2020",
    color: "amber",
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
  },
  {
    icon: Briefcase,
    title: "Career",
    subtitle: "Full-Stack Developer & Designer",
    desc: "Built web applications using Python, Java, and Next.js for clients across multiple industries. Created brand identities and marketing materials.",
    year: "2020 – Present",
    color: "cyan",
    accent: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    dot: "bg-cyan-400",
  },
  {
    icon: Heart,
    title: "Passion",
    subtitle: "Fine Art & Portraiture",
    desc: "Developed expertise in hyperrealistic ballpoint pen art, pencil drawings, and oil paintings. Exhibited work in local galleries.",
    year: "2019 – Present",
    color: "rose",
    accent: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    dot: "bg-rose-400",
  },
  {
    icon: BookOpen,
    title: "Teaching",
    subtitle: "Vocational College Trainer",
    desc: "Currently training the next generation in software development, creative design, and professional skills at a technical college.",
    year: "2022 – Present",
    color: "emerald",
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
];

const JourneyCard = ({
  item,
  i,
  isLast,
}: {
  item: (typeof journey)[0];
  i: number;
  isLast: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-5 pb-10 last:pb-0"
    >
      {/* Animated connecting line */}
      {!isLast && (
        <div className="absolute left-5 top-11 w-0.5 h-full bg-border/30 overflow-hidden">
          <motion.div
            style={{ height: lineHeight }}
            className={`w-full ${item.dot}`}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      {/* Icon dot */}
      <div className="flex-shrink-0 relative">
        <motion.div
          className={`w-10 h-10 rounded-full ${item.bg} border ${item.border} flex items-center justify-center`}
          whileHover={{ scale: 1.15 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          <item.icon size={17} className={item.accent} />
        </motion.div>
        {hovered && (
          <motion.div
            className={`absolute inset-0 rounded-full ${item.border.replace("border-", "border-2 border-")}`}
            initial={{ scale: 1 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        className={`flex-1 p-4 rounded-xl bg-card border ${item.border} hover:border-opacity-60 transition-all duration-300`}
        whileHover={{ y: -2 }}
        style={{
          boxShadow: hovered
            ? `0 8px 28px hsl(${
                item.color === "amber" ? "38 95% 58%" :
                item.color === "cyan"  ? "190 90% 50%" :
                item.color === "rose"  ? "350 80% 55%" :
                                         "150 70% 45%"
              } / 0.1)`
            : "none",
        }}
      >
        <div className="flex items-start justify-between mb-1.5 flex-wrap gap-2">
          <div>
            <span className={`${item.accent} font-mono text-[9px] uppercase tracking-widest`}>
              {item.title}
            </span>
            <h3 className="font-semibold text-foreground text-sm mt-0.5 tracking-tight">
              {item.subtitle}
            </h3>
          </div>
          <span className="font-mono text-[9px] text-muted-foreground bg-secondary px-2 py-1 rounded-full">
            {item.year}
          </span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const springY = useSpring(portraitY, { stiffness: 80, damping: 15 });

  return (
    <div>
      <PageHeader
        section="Get To Know Me"
        title="About Me"
        subtitle="A multidisciplinary creative bridging technology, design, and art."
      />

      {/* ── INTRO SECTION ── */}
      <section className="py-16 relative overflow-hidden">
        {/* Background orb */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(38 95% 58% / 0.04), transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Portrait */}
            <motion.div
              ref={portraitRef}
              style={{ y: springY }}
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative max-w-md mx-auto">
                {/* Glow blob */}
                <motion.div
                  className="absolute -inset-6 rounded-full opacity-25"
                  style={{
                    background: "radial-gradient(circle, hsl(38 95% 58% / 0.18), transparent 70%)",
                    filter: "blur(40px)",
                  }}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />

                {/* Corner accents */}
                <motion.div
                  className="absolute -top-2.5 -left-2.5 w-12 h-12 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-2.5 -right-2.5 w-12 h-12 border-b-2 border-r-2 border-primary/30 rounded-br-2xl"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, delay: 1, repeat: Infinity }}
                />

                {/* Portrait image */}
                <div className="rounded-2xl overflow-hidden pulse-glow relative">
                  <img
                    src={heroPortrait}
                    alt="Kelvin Bugigi"
                    className="w-full h-auto object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(38 95% 58% / 0.07) 0%, transparent 50%, hsl(16 88% 60% / 0.04) 100%)",
                    }}
                  />
                </div>


              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-muted-foreground font-mono text-[9px] tracking-widest uppercase block mb-2">
                Kelvin Bugigi
              </span>
              <h2 className="font-display font-bold text-2xl text-foreground mb-4 tracking-tight">
                I'm <span className="text-gradient">Kelvin Bugigi</span>
              </h2>

              {[
                "I'm a software developer, graphic designer, fine artist, and trained vocational educator based in Eldoret, Kenya. I build full-stack applications with Python, Java, and Next.js while bringing visual stories to life through Photoshop and Blender.",
                "My artistic practice spans ballpoint pen portraiture, pencil drawings, and paintings. Each medium offers a unique way to capture human expression and the beauty of the world around us.",
                "As a trainer at a technical and vocational college, I'm passionate about equipping the next generation with practical creative and technical skills that prepare them for the modern workforce.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="text-muted-foreground text-base leading-relaxed mb-3"
                >
                  {text}
                </motion.p>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-4 gap-3 mb-7 py-5 border-y border-border"
              >
                <StatCounter end={4} label="Disciplines" />
                <StatCounter end={50} label="Projects" />
                <StatCounter end={5} label="Years Exp." />
                <StatCounter end={100} label="Students" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, hsl(38 95% 58%), hsl(16 88% 55%))",
                    boxShadow: "0 6px 20px hsl(38 95% 58% / 0.28)",
                  }}
                >
                  Get In Touch
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight size={13} />
                  </motion.span>
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold text-sm hover:border-primary/35 hover:bg-primary/5 transition-all">
                  <Download size={13} /> Download CV
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section className="py-16 bg-card/20 relative overflow-hidden">
        {/* Ambient vertical lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[20, 40, 60, 80].map((x) => (
            <motion.div
              key={x}
              className="absolute top-0 bottom-0 w-px opacity-[0.025]"
              style={{
                left: `${x}%`,
                background: "linear-gradient(to bottom, transparent, hsl(38 95% 58%), transparent)",
              }}
              animate={{ opacity: [0.015, 0.04, 0.015] }}
              transition={{ duration: 4 + x / 20, repeat: Infinity }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-muted-foreground font-mono text-[9px] tracking-widest uppercase">
              My Journey
            </span>
            <div
              className="w-14 h-0.5 mx-auto mt-2.5 mb-6 rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(38 95% 58%), hsl(16 88% 60%))" }}
            />
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight">
              How I Got <span className="text-gradient">Here</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {journey.map((item, i) => (
              <JourneyCard
                key={item.title}
                item={item}
                i={i}
                isLast={i === journey.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES / PHILOSOPHY ── */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-muted-foreground font-mono text-[9px] tracking-widest uppercase">
              My Philosophy
            </span>
            <div
              className="w-14 h-0.5 mx-auto mt-2.5 mb-6 rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(38 95% 58%), hsl(16 88% 60%))" }}
            />
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight">
              Principles That <span className="text-gradient">Guide My Work</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "Craftsmanship",
                desc: "Every pixel, every line of code, every brushstroke — attention to detail is what separates good from extraordinary.",
                accent: "text-amber-400",
                bg: "bg-amber-500/8",
              },
              {
                icon: Code,
                title: "Innovation",
                desc: "I embrace new technologies and techniques, constantly evolving to bring fresh perspectives to every project.",
                accent: "text-cyan-400",
                bg: "bg-cyan-500/8",
              },
              {
                icon: Heart,
                title: "Empathy",
                desc: "Great design and code always starts with understanding people — their needs, emotions, and aspirations.",
                accent: "text-rose-400",
                bg: "bg-rose-500/8",
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                whileHover={{ y: -4 }}
                className={`p-5 rounded-2xl ${v.bg} border border-border text-center transition-all duration-300`}
              >
                <motion.div
                  className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center mx-auto mb-3"
                  whileHover={{ rotate: 15 }}
                >
                  <v.icon size={20} className={v.accent} />
                </motion.div>
                <h3 className="font-semibold text-foreground mb-1.5 text-sm tracking-tight">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;