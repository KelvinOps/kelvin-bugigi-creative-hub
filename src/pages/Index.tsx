//src/pages/Index.tsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Palette, PenTool, GraduationCap, ChevronDown } from "lucide-react";
import TypewriterEffect from "@/components/TypewriterEffect";
import StatCounter from "@/components/StatCounter";
import heroPortrait from "@/assets/kelvin-portrait.jpg";

const disciplines = [
  { icon: Code, title: "Software Development", desc: "Full-stack web apps with Python, Java & Next.js" },
  { icon: Palette, title: "Graphic Design", desc: "Brand identities, UI/UX & marketing materials" },
  { icon: PenTool, title: "Fine Art", desc: "Hyperrealistic ballpoint pen art & portraiture" },
  { icon: GraduationCap, title: "Vocational Training", desc: "Empowering the next generation of creatives" },
];

const Index = () => {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "linear-gradient(hsl(36 90% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(36 90% 55%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Ambient orbs */}
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-primary/5 blur-[120px] floating" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/4 blur-[140px] floating" style={{ animationDelay: "3s" }} />

        {/* Ghosted KB initials */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[300px] md:text-[400px] text-primary/[0.03] select-none pointer-events-none leading-none">
          K
        </div>

        <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              {/* Available badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-mono text-xs tracking-wider">Available for freelance work</span>
              </div>

              <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-2 pb-1">
                Hello, I'm Kelvin
              </h1>
              <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-gradient leading-[1.1] mb-4 pb-2">
                Bugigi
              </h1>

              <div className="h-8 mb-6">
                <TypewriterEffect />
              </div>

              <p className="text-muted-foreground font-body text-xl max-w-lg leading-relaxed mb-8">
                A multidisciplinary creative — crafting code, designing visuals, and creating art that bridges technology and human expression.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-amber font-display font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  View My Work <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground font-display font-semibold text-sm hover:bg-secondary transition-colors"
                >
                  Get In Touch
                </Link>
              </div>

              {/* Stats with count-up */}
              <div className="grid grid-cols-4 gap-6">
                <StatCounter end={4} label="Disciplines" />
                <StatCounter end={50} label="Projects" />
                <StatCounter end={5} label="Years" />
                <StatCounter end={100} label="Students" />
              </div>
            </motion.div>

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="relative hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-primary/30 rounded-br-2xl" />
                <div className="w-[400px] h-[480px] rounded-2xl overflow-hidden pulse-glow">
                  <img src={heroPortrait} alt="Kelvin Bugigi" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-muted-foreground font-mono text-xs tracking-wider">Scroll</span>
            <ChevronDown size={16} className="text-primary animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">01 · About Me</span>
            <div className="w-12 h-0.5 bg-gradient-amber mx-auto mt-3 mb-6" />
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Crafting at the intersection of <span className="text-gradient">code & canvas</span>
            </h2>
            <p className="text-muted-foreground font-body text-xl max-w-2xl mx-auto leading-relaxed">
              I'm Kelvin Bugigi — a multidisciplinary creative based in Eldoret, Kenya. I build full-stack applications, design compelling visuals, and create fine art that bridges technology and human expression.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 mt-6 text-primary hover:underline font-mono text-sm">
              More About Me <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="py-24 relative bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">What I Do</span>
            <div className="w-12 h-0.5 bg-gradient-amber mx-auto mt-3 mb-6" />
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
              Four Disciplines, <span className="text-gradient">One Vision</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {disciplines.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 glow-border"
              >
                <d.icon size={32} className="text-primary mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">{d.title}</h3>
                <p className="text-muted-foreground font-body text-lg leading-relaxed mb-4">{d.desc}</p>
                <Link to="/services" className="text-primary font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                  Learn more <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-amber-subtle" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Let's Create <span className="text-gradient">Together</span>
            </h2>
            <p className="text-muted-foreground font-body text-xl max-w-lg mx-auto mb-8">
              Whether it's code, design, or canvas — I bring ideas to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/portfolio" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-amber font-display font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity">
                View Portfolio
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground font-display font-semibold text-sm hover:bg-secondary transition-colors">
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
