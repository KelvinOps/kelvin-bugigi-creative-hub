import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight, Github, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home",      path: "/" },
  { label: "About",     path: "/about" },
  { label: "Skills",    path: "/skills" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Services",  path: "/services" },
  { label: "Contact",   path: "/contact" },
];

const socialLinks = [
  { icon: Github,   href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter,  href: "#", label: "Twitter/X" },
];

const contactItems = [
  { icon: Mail,   value: "kbugigi@gmail.com",  href: "mailto:kbugigi@gmail.com", color: "hsl(38 95% 58%)" },
  { icon: Phone,  value: "+254 729 114 157",   href: "tel:+254729114157",        color: "hsl(16 88% 60%)" },
  { icon: MapPin, value: "Eldoret, Kenya",      href: null,                       color: "hsl(200 80% 60%)" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden" style={{ background: "hsl(222 28% 6%)" }}>

      {/* ── Decorative top border with animated shimmer ── */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, transparent 0%, hsl(38 95% 58% / 0.7) 40%, hsl(16 88% 60% / 0.5) 60%, transparent 100%)" }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, hsl(38 95% 58% / 0.25), transparent)" }} />
      </div>

      {/* ── Ambient glows ── */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(38 80% 45% / 0.05), transparent 70%)", filter: "blur(60px)" }}
      />
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(16 88% 55% / 0.04), transparent 70%)", filter: "blur(80px)" }}
      />

      {/* ── Subtle dot grid ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(hsl(38 95% 58% / 0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container mx-auto px-6 pt-12 pb-6 relative z-10">

        {/* ── CTA Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 p-6 rounded-2xl border relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            background: "linear-gradient(135deg, hsl(38 95% 58% / 0.06), hsl(16 88% 55% / 0.04))",
            borderColor: "hsl(38 95% 58% / 0.18)",
          }}
        >
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
            style={{ background: "radial-gradient(circle at top right, hsl(38 95% 58% / 0.1), transparent 70%)" }}
          />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400/70 mb-1">Open for work</p>
            <h3 className="font-display font-bold text-lg text-foreground">
              Have a project in mind?{" "}
              <span style={{ background: "linear-gradient(90deg, hsl(38 95% 62%), hsl(16 88% 60%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Let's talk.
              </span>
            </h3>
          </div>
          <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 400 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-bold text-xs text-black flex-shrink-0 hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(135deg, hsl(38,95%,58%), hsl(16,88%,55%))",
                boxShadow: "0 4px 20px hsl(38 95% 58% / 0.35)",
              }}
            >
              Start a Project <ArrowUpRight size={12} />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="md:col-span-5"
          >
            <Link to="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-black text-lg"
                style={{
                  background: "linear-gradient(135deg, hsl(38,95%,58%), hsl(16,88%,55%))",
                  boxShadow: "0 4px 14px hsl(38 95% 58% / 0.3)",
                }}
                whileHover={{ scale: 1.08, rotate: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                K
              </motion.div>
              <div>
                <span className="font-display font-bold text-lg text-foreground group-hover:text-amber-400 transition-colors leading-none block">
                  BUGIGI
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/50 leading-none">
                  Creative Studio
                </span>
              </div>
            </Link>

            <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-[280px] mb-5">
              Software Developer · Graphic Designer · Fine Artist · Vocational Trainer. Based in Eldoret, Kenya. Crafting digital experiences at the intersection of code and canvas.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2 mb-5">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg border border-border/40 flex items-center justify-center text-muted-foreground/60 hover:text-amber-400 hover:border-amber-400/30 hover:bg-amber-400/5 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <social.icon size={13} />
                </motion.a>
              ))}
            </div>

            {/* Availability pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{ background: "hsl(150 60% 40% / 0.06)", borderColor: "hsl(150 60% 40% / 0.2)" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="font-mono text-[10px] text-emerald-400/80 uppercase tracking-wider">Available for projects</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3"
          >
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4 text-amber-400/70">
              Navigation
            </h4>
            <div className="space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-muted-foreground/70 font-body text-sm hover:text-amber-400 transition-colors duration-200 py-0.5"
                  >
                    <span
                      className="w-3 h-px transition-all duration-300 origin-left group-hover:w-5"
                      style={{ background: "hsl(38 95% 58% / 0.5)" }}
                    />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="md:col-span-4"
          >
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4 text-amber-400/70">
              Get In Touch
            </h4>
            <div className="space-y-2.5">
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.value}
                  className="flex items-center gap-3 group"
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.17 + i * 0.07 }}
                  whileHover={{ x: 2 }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: item.color.replace(")", " / 0.08)").replace("hsl", "hsl"),
                      border: `1px solid ${item.color.replace(")", " / 0.18)").replace("hsl", "hsl")}`,
                    }}
                  >
                    <item.icon size={12} style={{ color: item.color }} />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-muted-foreground/70 font-body text-sm hover:text-amber-400 transition-colors truncate"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-muted-foreground/70 font-body text-sm">{item.value}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Services mini-list */}
            <div className="mt-5 pt-4" style={{ borderTop: "1px solid hsl(224 18% 14%)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 mb-2">Specialisms</p>
              <div className="flex flex-wrap gap-1.5">
                {["Web Dev", "Design", "Fine Art", "3D / Anim", "UI/UX", "Training"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full font-mono text-[10px]"
                    style={{
                      background: "hsl(38 95% 58% / 0.06)",
                      border: "1px solid hsl(38 95% 58% / 0.14)",
                      color: "hsl(38 95% 62% / 0.7)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid hsl(224 18% 12%)" }}
        >
          <p className="text-muted-foreground/35 font-mono text-[10px] tracking-wider">
            © 2026 Kelvin Bugigi · All rights reserved
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-wider" style={{ color: "hsl(38 95% 58% / 0.35)" }}>
              Designed &amp; built in Eldoret, Kenya ♥
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;