import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Copy, Check, Mail } from "lucide-react";
import { API_BASE, safeJson } from "@/lib/apiClient";

interface Advice {
  summary: string;
  recommendations: { service: string; reason: string }[];
  inquiry_subject: string;
  inquiry_message: string;
}

const CONTACT_EMAIL = "kbugigi@gmail.com";

export const ProjectAdvisor = () => {
  const [name, setName] = useState("");
  const [needs, setNeeds] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    setAdvice(null);
    try {
      const res = await fetch(`${API_BASE}/advisor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, needs }),
      });
      const data = await safeJson<Advice & { error?: string }>(res);
      if (!res.ok || !data || data.error) throw new Error(data?.error || "Something went wrong. Please try again.");
      setAdvice(data);
      setMessage(data.inquiry_message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const mailto = advice
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(advice.inquiry_subject)}&body=${encodeURIComponent(message)}`
    : "#";

  return (
    <section className="py-10 sm:py-12 relative" id="advisor">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card/60 backdrop-blur p-5 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-primary" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">Project Advisor</span>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight mb-2">
            Not sure what you need? <span className="text-gradient">Describe it.</span>
          </h2>
          <p className="text-muted-foreground text-base mb-5">
            Tell me about your project and get matching services plus a ready-to-send inquiry.
          </p>

          <form onSubmit={submit} className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              maxLength={80}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <textarea
              value={needs}
              onChange={(e) => setNeeds(e.target.value)}
              placeholder="e.g. I run a small coffee shop and need a logo, a simple website with a menu, and a portrait for the wall…"
              rows={4}
              maxLength={2000}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
            />
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="font-mono text-[10px] text-muted-foreground">{needs.length}/2000</span>
              <button
                type="submit"
                disabled={loading || needs.trim().length < 15}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {loading ? "Thinking…" : "Get recommendations"}
              </button>
            </div>
          </form>

          {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}

          <AnimatePresence>
            {advice && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 space-y-5"
              >
                <p className="text-foreground text-base italic">{advice.summary}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {advice.recommendations.map((r) => (
                    <div key={r.service} className="rounded-xl border border-primary/25 bg-primary/5 p-4">
                      <h3 className="font-semibold text-sm text-foreground mb-1">{r.service}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{r.reason}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">
                    Your inquiry — {advice.inquiry_subject}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={8}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <div className="flex flex-wrap gap-3 mt-3">
                    <a
                      href={mailto}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90"
                    >
                      <Mail size={14} /> Send via email
                    </a>
                    <button
                      type="button"
                      onClick={copy}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground font-semibold text-sm hover:border-primary/40"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectAdvisor;
