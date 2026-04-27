// src/components/PageHeader.tsx — UPGRADED with advanced animations

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PageHeaderProps {
  section: string;
  sectionNumber?: string;
  title: string;
  subtitle: string;
}

export const PageHeader = ({ section, sectionNumber, title, subtitle }: PageHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative pt-36 pb-24 overflow-hidden">
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(38 95% 58% / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(38 95% 58% / 0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Radial gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 20% 20%, hsl(38 80% 45% / 0.09), transparent 55%),
            radial-gradient(ellipse 60% 50% at 80% 80%, hsl(16 80% 50% / 0.06), transparent 50%)
          `,
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-12 left-6 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(38 95% 58% / 0.08), transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-6 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(16 88% 60% / 0.06), transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, -10, 0], y: [0, 12, 0] }}
        transition={{ duration: 12, delay: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ghosted title watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-black text-[180px] md:text-[240px] text-foreground/[0.018] select-none leading-none tracking-tight"
        >
          {title.split(" ")[0].toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {sectionNumber ? (
              <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase mb-2 block">
                {sectionNumber} · {section}
              </span>
            ) : (
              <span
                className="font-mono text-xs tracking-widest uppercase block mb-2"
                style={{ color: "hsl(38 95% 62%)" }}
              >
                {section}
              </span>
            )}
          </motion.div>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-0.5 mx-auto mt-3 mb-8 rounded-full origin-left"
            style={{
              background: "linear-gradient(90deg, hsl(38,95%,58%), hsl(16,88%,60%))",
            }}
          />

          {/* Title — word-by-word reveal */}
          <div className="overflow-hidden mb-5">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight"
            >
              {title}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground font-body text-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* Decorative dots row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-1.5 mt-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full bg-primary/30"
                style={{ width: i === 2 ? 20 : 4, height: 4 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default PageHeader;