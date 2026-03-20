// ═══════════════════════════════════════════════════════════════
// PageHeader.tsx
// ═══════════════════════════════════════════════════════════════
import { motion } from "framer-motion";

interface PageHeaderProps {
  section: string;
  sectionNumber?: string;
  title: string;
  subtitle: string;
}

export const PageHeader = ({ section, sectionNumber, title, subtitle }: PageHeaderProps) => {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, hsl(38 80% 45% / 0.08), transparent 55%),
            radial-gradient(ellipse 60% 40% at 80% 80%, hsl(16 80% 50% / 0.06), transparent 50%)
          `,
        }}
      />

      {/* Animated grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(hsl(38 95% 58% / 0.035) 1px, transparent 1px), linear-gradient(90deg, hsl(38 95% 58% / 0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute top-16 left-8 w-72 h-72 rounded-full floating-slow pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(38 95% 58% / 0.07), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 right-8 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(16 88% 60% / 0.05), transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "3s",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          {sectionNumber ? (
            <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase mb-2 block">
              {sectionNumber} · {section}
            </span>
          ) : (
            <span className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: "hsl(38 95% 62%)" }}>
              {section}
            </span>
          )}

          <div
            className="w-16 h-0.5 mx-auto mt-2 mb-8 rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(38,95%,58%), hsl(16,88%,60%))" }}
          />
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5 leading-tight">{title}</h1>
          <p className="text-muted-foreground font-body text-xl leading-relaxed">{subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;


// ═══════════════════════════════════════════════════════════════
// PageLoader.tsx
// ═══════════════════════════════════════════════════════════════
// (separate file — just copy the export)