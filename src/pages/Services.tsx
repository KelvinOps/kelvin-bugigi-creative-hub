//src/pages/Services.tsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Palette, Box, PenTool, Layout, GraduationCap } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const services = [
  { icon: Code, number: "01", title: "Web Development", desc: "Building responsive, scalable web applications using Python, Java, and Next.js with modern best practices.", items: ["Full-stack apps", "REST APIs", "Database design", "Deployment"] },
  { icon: Palette, number: "02", title: "Graphic Design", desc: "Creating stunning visuals, brand identities, and marketing materials using Photoshop and modern design tools.", items: ["Brand identity", "Social media", "Print design", "Packaging"] },
  { icon: Box, number: "03", title: "3D & Animation", desc: "Crafting 3D models, characters, and animations in Blender for games, ads, and creative projects.", items: ["3D modeling", "Character design", "Motion graphics", "Rendering"] },
  { icon: PenTool, number: "04", title: "Fine Art Commissions", desc: "Hyperrealistic ballpoint, pencil portraits, and custom paintings — each piece a one-of-a-kind creation.", items: ["Portraits", "Landscapes", "Custom pieces", "Gallery work"] },
  { icon: Layout, number: "05", title: "UI/UX Design", desc: "Designing intuitive, beautiful user interfaces that balance aesthetics with seamless user experience.", items: ["Wireframes", "Prototypes", "User research", "Design systems"] },
  { icon: GraduationCap, number: "06", title: "Training & Workshops", desc: "Technical and vocational training in software development, design tools, and creative arts.", items: ["Curriculum", "Hands-on labs", "Mentoring", "Certification prep"] },
];

const Services = () => {
  return (
    <div>
      <PageHeader section="Services" sectionNumber="04" title="Services" subtitle="Professional services across software development, design, art, and education." />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">What I Offer</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 glow-border overflow-hidden"
              >
                <span className="absolute top-4 right-4 font-display font-bold text-6xl text-foreground/[0.03] select-none">{s.number}</span>
                <s.icon size={28} className="text-primary mb-4" />
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground font-body text-lg leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1.5 mb-4">
                  {s.items.map((item) => (
                    <li key={item} className="text-muted-foreground font-mono text-xs flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary" />{item}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="text-primary font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                  Learn more <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-amber-subtle" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display font-bold text-3xl text-foreground mb-4">Interested in working together?</h2>
            <p className="text-muted-foreground font-body text-xl mb-8">Let's turn your ideas into reality.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-amber font-display font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity">
              Start a Conversation <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
