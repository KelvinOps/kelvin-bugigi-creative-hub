//src/components/PageHeader.tsx

import { motion } from "framer-motion";

interface PageHeaderProps {
  section: string;
  sectionNumber?: string;
  title: string;
  subtitle: string;
}

const PageHeader = ({ section, sectionNumber, title, subtitle }: PageHeaderProps) => {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-[100px] floating" />
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-accent/5 blur-[120px] floating" style={{ animationDelay: "3s" }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(hsl(36 90% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(36 90% 55%) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {sectionNumber && (
            <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase mb-2 block">
              {sectionNumber} · {section}
            </span>
          )}
          {!sectionNumber && (
            <span className="text-primary font-mono text-xs tracking-widest uppercase">{section}</span>
          )}
          <div className="w-16 h-0.5 bg-gradient-amber mx-auto mt-3 mb-6" />
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">{title}</h1>
          <p className="text-muted-foreground font-body text-xl leading-relaxed">{subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
