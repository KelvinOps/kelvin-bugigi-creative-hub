// src/pages/Contact.tsx — UPGRADED with animations & visual redesign

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, ArrowRight, Sparkles } from "lucide-react";
import emailjs from "@emailjs/browser";
import PageHeader from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "kbugigi@gmail.com",
    href: "mailto:kbugigi@gmail.com",
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+254 729 114 157",
    href: "tel:+254729114157",
    accent: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Eldoret, Kenya",
    href: null,
    accent: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
];

const projectTypes = [
  "Web Development",
  "Graphic Design",
  "Fine Art Commission",
  "3D / Animation",
  "UI/UX Design",
  "Training / Workshop",
  "Other",
];

// Animated input field
const AnimatedInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <motion.label
        animate={{
          color: focused ? "hsl(38 95% 62%)" : "hsl(224 14% 56%)",
          y: 0,
        }}
        className="block font-mono text-[10px] uppercase tracking-widest mb-1.5 transition-colors"
      >
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </motion.label>
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: focused
              ? "0 0 0 1px hsl(38 95% 58% / 0.3), 0 4px 16px hsl(38 95% 58% / 0.08)"
              : "0 0 0 0px transparent",
          }}
          transition={{ duration: 0.2 }}
        />
        <input
          type={type}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-colors"
        />
      </div>
    </div>
  );
};

const AnimatedTextarea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rows?: number;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <motion.label
        animate={{ color: focused ? "hsl(38 95% 62%)" : "hsl(224 14% 56%)" }}
        className="block font-mono text-[10px] uppercase tracking-widest mb-1.5 transition-colors"
      >
        {label} <span className="text-primary">*</span>
      </motion.label>
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: focused
              ? "0 0 0 1px hsl(38 95% 58% / 0.3), 0 4px 16px hsl(38 95% 58% / 0.08)"
              : "0 0 0 0px transparent",
          }}
          transition={{ duration: 0.2 }}
        />
        <textarea
          value={value}
          required
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-colors resize-none"
        />
        {/* Character count */}
        <span className="absolute bottom-2 right-3 font-mono text-[10px] text-muted-foreground/40">
          {value.length}
        </span>
      </div>
    </div>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    projectType: "",
    message: "",
  });
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      from_name:    form.name,
      from_email:   form.email,
      subject:      form.subject,
      message:      form.message,
      project_type: form.projectType,
      reply_to:     form.email,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setSuccess(true);
      toast({
        title: "Message sent! ✅",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setTimeout(() => {
        setSuccess(false);
        setForm({ name: "", email: "", subject: "", projectType: "", message: "" });
      }, 4000);
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Failed to send ❌",
        description: "Something went wrong. Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        section="Contact"
        sectionNumber="06"
        title="Contact Me"
        subtitle="Have a project in mind or want to collaborate? Let's connect."
      />

      {/* ↓ py-24 → py-10, px-6 → px-4 */}
      <section className="py-10 relative overflow-hidden">
        {/* Background glows */}
        <div
          className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(38 95% 58% / 0.04), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(16 88% 60% / 0.04), transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-6">

            {/* ── Left: contact info ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 space-y-4"
            >
              <div>
                <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase block mb-2">
                  Get In Touch
                </span>
                <h2 className="font-display font-bold text-xl text-foreground mb-2">
                  Let's Create Something <span className="text-gradient">Amazing</span>
                </h2>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  Whether you need a web application, graphic design, a commissioned artwork,
                  or technical training — I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        className={`flex items-center gap-3 p-3 rounded-xl bg-card border ${info.border} hover:border-opacity-60 transition-all group`}
                      >
                        <div className={`w-9 h-9 rounded-lg ${info.bg} flex items-center justify-center flex-shrink-0`}>
                          <info.icon size={15} className={info.accent} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-muted-foreground font-mono text-[10px] uppercase tracking-wider block">
                            {info.label}
                          </span>
                          <span className={`${info.accent} font-display text-sm font-medium truncate block`}>
                            {info.value}
                          </span>
                        </div>
                        <ArrowRight
                          size={13}
                          className={`ml-auto ${info.accent} opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0`}
                        />
                      </a>
                    ) : (
                      <div className={`flex items-center gap-3 p-3 rounded-xl bg-card border ${info.border}`}>
                        <div className={`w-9 h-9 rounded-lg ${info.bg} flex items-center justify-center flex-shrink-0`}>
                          <info.icon size={15} className={info.accent} />
                        </div>
                        <div>
                          <span className="text-muted-foreground font-mono text-[10px] uppercase tracking-wider block">
                            {info.label}
                          </span>
                          <span className="text-foreground font-display text-sm font-medium">
                            {info.value}
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Availability indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20"
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </div>
                <span className="text-emerald-400 font-mono text-xs">
                  Currently available for new projects
                </span>
              </motion.div>
            </motion.div>

            {/* ── Right: form ── */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 relative"
            >
              {/* ↓ p-7 → p-5 */}
              <div className="p-5 rounded-2xl bg-card border border-border relative overflow-hidden">
                {/* Subtle top gradient */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(38 95% 58% / 0.5), transparent)",
                  }}
                />

                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4"
                      >
                        <CheckCircle2 size={30} className="text-emerald-400" />
                      </motion.div>
                      <h3 className="font-display font-bold text-lg text-foreground mb-1.5">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground font-body text-sm">
                        Thank you for reaching out. I'll get back to you within 24 hours.
                      </p>
                      <div className="flex items-center gap-2 mt-4">
                        <Sparkles size={13} className="text-primary" />
                        <span className="font-mono text-xs text-muted-foreground">
                          Resetting form…
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <AnimatedInput
                          label="Your Name"
                          value={form.name}
                          onChange={(v) => setForm({ ...form, name: v })}
                          placeholder="Kelvin Bugigi"
                          required
                        />
                        <AnimatedInput
                          label="Email Address"
                          type="email"
                          value={form.email}
                          onChange={(v) => setForm({ ...form, email: v })}
                          placeholder="you@example.com"
                          required
                        />
                      </div>

                      <AnimatedInput
                        label="Subject"
                        value={form.subject}
                        onChange={(v) => setForm({ ...form, subject: v })}
                        placeholder="Project collaboration, artwork commission…"
                        required
                      />

                      {/* Project type selector */}
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest mb-1.5 text-muted-foreground">
                          Project Type
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {projectTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setForm({ ...form, projectType: type })}
                              className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider border transition-all ${
                                form.projectType === type
                                  ? "bg-primary/10 text-primary border-primary/40"
                                  : "bg-secondary text-muted-foreground border-border hover:border-primary/20 hover:text-foreground"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <AnimatedTextarea
                        label="Message"
                        value={form.message}
                        onChange={(v) => setForm({ ...form, message: v })}
                        placeholder="Tell me about your project, timeline, and budget…"
                        rows={4}
                      />

                      {/* ↓ py-4 → py-2.5 */}
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2.5 rounded-full font-display font-semibold text-sm text-primary-foreground flex items-center justify-center gap-2 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background: "linear-gradient(135deg, hsl(38 95% 58%), hsl(16 88% 55%))",
                          boxShadow: "0 8px 24px hsl(38 95% 58% / 0.3)",
                        }}
                      >
                        {loading ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={13} />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;