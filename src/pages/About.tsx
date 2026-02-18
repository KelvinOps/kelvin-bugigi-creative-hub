//src/pages/About.tsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download, GraduationCap, Briefcase, Heart, BookOpen } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatCounter from "@/components/StatCounter";
import heroPortrait from "@/assets/kelvin-portrait.jpg";

const journey = [
  { icon: GraduationCap, title: "Education", subtitle: "Technical & Vocational Training", desc: "Completed advanced training in software development, graphic design, and fine arts with certifications in multiple disciplines." },
  { icon: Briefcase, title: "Career", subtitle: "Full-Stack Developer & Designer", desc: "Built web applications using Python, Java, and Next.js for clients across multiple industries. Created brand identities and marketing materials." },
  { icon: Heart, title: "Passion", subtitle: "Fine Art & Portraiture", desc: "Developed expertise in hyperrealistic ballpoint pen art, pencil drawings, and oil paintings. Exhibited work in local galleries." },
  { icon: BookOpen, title: "Teaching", subtitle: "Vocational College Trainer", desc: "Currently training the next generation in software development, creative design, and professional skills at a technical college." },
];

const About = () => {
  return (
    <div>
      <PageHeader section="Get To Know Me" title="About Me" subtitle="A multidisciplinary creative bridging technology, design, and art." />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="relative">
                <div className="absolute -top-3 -left-3 w-14 h-14 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl" />
                <div className="absolute -bottom-3 -right-3 w-14 h-14 border-b-2 border-r-2 border-primary/30 rounded-br-2xl" />
                <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden pulse-glow">
                  <img src={heroPortrait} alt="Kelvin Bugigi" className="w-full h-auto object-cover" />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase block mb-4">Kelvin Bugigi</span>
              <h2 className="font-display font-bold text-3xl text-foreground mb-2">I'm <span className="text-gradient">Kelvin Bugigi</span></h2>
              <p className="text-muted-foreground font-body text-xl leading-relaxed mb-4">
                I'm a software developer, graphic designer, fine artist, and trained vocational educator based in Eldoret, Kenya. I build full-stack applications with Python, Java, and Next.js while bringing visual stories to life through Photoshop and Blender.
              </p>
              <p className="text-muted-foreground font-body text-xl leading-relaxed mb-4">
                My artistic practice spans ballpoint pen portraiture, pencil drawings, and paintings. Each medium offers a unique way to capture human expression and the beauty of the world around us.
              </p>
              <p className="text-muted-foreground font-body text-xl leading-relaxed mb-8">
                As a trainer at a technical and vocational college, I'm passionate about equipping the next generation with practical creative and technical skills that prepare them for the modern workforce.
              </p>

              <div className="grid grid-cols-4 gap-4 mb-8">
                <StatCounter end={4} label="Disciplines" />
                <StatCounter end={50} label="Projects" />
                <StatCounter end={5} label="Years Exp." />
                <StatCounter end={100} label="Students" />
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-amber font-display font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity">
                  Get In Touch <ArrowRight size={14} />
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-display font-semibold text-sm hover:bg-secondary transition-colors">
                  <Download size={14} /> Download CV
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">My Journey</span>
            <div className="w-12 h-0.5 bg-gradient-amber mx-auto mt-3 mb-6" />
            <h2 className="font-display font-bold text-3xl text-foreground">How I Got Here</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-0">
            {journey.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {i < journey.length - 1 && (
                  <div className="absolute left-5 top-12 w-px h-full bg-gradient-to-b from-primary/30 to-transparent" />
                )}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-amber flex items-center justify-center">
                  <item.icon size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <span className="text-primary font-mono text-xs uppercase tracking-wider">{item.title}</span>
                  <h3 className="font-display font-semibold text-foreground mt-1">{item.subtitle}</h3>
                  <p className="text-muted-foreground font-body text-lg leading-relaxed mt-2">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
