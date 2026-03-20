// src/pages/contact.tsx

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import PageHeader from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contactInfo = [
  { icon: Mail,   label: "Email",    value: "kbugigi@gmail.com",  href: "mailto:kbugigi@gmail.com" },
  { icon: Phone,  label: "Phone",    value: "+254 729 114 157",   href: "tel:+254729114157" },
  { icon: MapPin, label: "Location", value: "Eldoret, Kenya",     href: null },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // These keys MUST match the variable names in your EmailJS template
    // e.g. {{from_name}}, {{from_email}}, {{subject}}, {{message}}
    const templateParams = {
      from_name:  form.name,
      from_email: form.email,
      subject:    form.subject,
      message:    form.message,
      // reply_to lets you hit "Reply" in Gmail and it goes straight to the sender
      reply_to:   form.email,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      toast({
        title: "Message sent! ✅",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setForm({ name: "", email: "", subject: "", message: "" });
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

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">

            {/* ── Left column: contact info ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-4"
            >
              <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase block mb-2">
                Get In Touch
              </span>
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                Let's Create Something <span className="text-gradient">Amazing</span>
              </h2>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                Whether you need a web application, graphic design, a commissioned artwork,
                or technical training — I'd love to hear from you.
              </p>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <span className="text-muted-foreground font-mono text-xs uppercase tracking-wider">
                        {info.label}
                      </span>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="block text-foreground font-display text-sm font-medium hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="block text-foreground font-display text-sm font-medium">
                          {info.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Right column: form ── */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 p-6 rounded-2xl bg-card border border-border space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-foreground font-mono text-xs uppercase tracking-wider mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-foreground font-mono text-xs uppercase tracking-wider mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-foreground font-mono text-xs uppercase tracking-wider mb-2 block">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Project subject"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>

              <div>
                <label className="text-foreground font-mono text-xs uppercase tracking-wider mb-2 block">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-amber font-display font-semibold text-sm text-primary-foreground hover:opacity-90 transition-opacity w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending…" : "Send Message"}
                <Send size={14} />
              </button>
            </motion.form>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;