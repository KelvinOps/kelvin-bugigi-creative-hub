// src/pages/Auth.tsx
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, LogIn, Lock, Mail, AlertCircle,
  ShieldCheck, Clock, Fingerprint,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// ── Lockout countdown ─────────────────────────────────────────────────────────
function Countdown({ ms, onDone }: { ms: number; onDone: () => void }) {
  const [left, setLeft] = useState(ms);
  useEffect(() => {
    const iv = setInterval(() => {
      setLeft(p => {
        if (p <= 1000) { clearInterval(iv); onDone(); return 0; }
        return p - 1000;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);
  const mins = String(Math.floor(left / 60000)).padStart(2, "0");
  const secs = String(Math.floor((left % 60000) / 1000)).padStart(2, "0");
  return <span className="font-mono font-bold text-destructive">{mins}:{secs}</span>;
}

// ── Reusable input ────────────────────────────────────────────────────────────
function InputField({
  label, type, value, onChange, placeholder, icon: Icon, rightEl, autoComplete,
}: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  icon: React.ElementType; rightEl?: React.ReactNode; autoComplete?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-2">
        {label}
      </label>
      <div className="relative group">
        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <input
          type={type} value={value}
          onChange={e => onChange(e.target.value)}
          required placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full pl-10 pr-10 py-3 bg-secondary/60 border border-border rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
        />
        {rightEl && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightEl}</div>}
      </div>
    </div>
  );
}

// ── Sign-in form ──────────────────────────────────────────────────────────────
function SignInForm() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [lockoutMs, setLockoutMs] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAttempts(null);
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setSubmitting(true);
    const result = await signIn(email.trim(), password);
    setSubmitting(false);

    if (result.error) {
      if (result.lockedMs) {
        setLockoutMs(result.lockedMs);
      } else {
        setError(result.error.message);
        if (result.remainingAttempts !== undefined) setAttempts(result.remainingAttempts);
      }
    } else {
      navigate("/admin", { replace: true });
    }
  };

  if (lockoutMs !== null) {
    return (
      <div className="py-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto">
          <Clock size={24} className="text-destructive" />
        </div>
        <p className="font-display font-bold text-foreground text-lg">Account Locked</p>
        <p className="text-muted-foreground text-sm">Too many failed attempts. Try again in:</p>
        <div className="text-4xl font-mono tracking-widest">
          <Countdown ms={lockoutMs} onDone={() => setLockoutMs(null)} />
        </div>
      </div>
    );
  }

  return (
    <motion.form key="signin" onSubmit={handleSubmit}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="space-y-5">
      <InputField label="Email Address" type="email" value={email}
        onChange={v => { setEmail(v); setError(null); }}
        placeholder="admin@example.com" icon={Mail} autoComplete="username" />

      <InputField label="Password" type={showPassword ? "text" : "password"} value={password}
        onChange={v => { setPassword(v); setError(null); }}
        placeholder="••••••••••••" icon={Lock} autoComplete="current-password"
        rightEl={
          <button type="button" onClick={() => setShowPassword(p => !p)}
            className="text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
      />

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-start gap-3 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <div>
              <p>{error}</p>
              {attempts !== null && attempts > 0 && (
                <p className="text-[11px] text-destructive/70 font-mono mt-0.5">
                  {attempts} attempt{attempts !== 1 ? "s" : ""} remaining before lockout
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button type="submit" disabled={submitting}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-display font-bold text-sm flex items-center justify-center gap-2 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed">
        {submitting
          ? <div className="w-4 h-4 border-2 border-black/20 border-t-black/80 rounded-full animate-spin" />
          : <><Fingerprint size={16} /> Authenticate</>}
      </button>
    </motion.form>
  );
}

// ── Page shell ────────────────────────────────────────────────────────────────
const Auth = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && isAdmin) navigate("/admin", { replace: true });
  }, [loading, user, isAdmin, navigate]);

  if (!loading && user && isAdmin) return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: "linear-gradient(hsl(36 90% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(36 90% 55%) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-48 h-48 border-l border-t border-primary/10" />
        <div className="absolute bottom-0 right-0 w-48 h-48 border-r border-b border-primary/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px] relative z-10"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 blur-2xl opacity-30 scale-150" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-2xl">
              <span className="font-display font-black text-2xl text-black/80">K</span>
            </div>
          </div>
          <p className="font-display font-black text-foreground text-2xl tracking-tight">BUGIGI</p>
          <p className="font-mono text-[10px] text-muted-foreground tracking-[0.3em] uppercase mt-0.5">
            Admin Portal · Authorised Access Only
          </p>
        </div>

        {/* Card */}
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 mb-7 px-3 py-2 rounded-xl bg-primary/5 border border-primary/15">
            <ShieldCheck size={14} className="text-primary flex-shrink-0" />
            <span className="font-mono text-[11px] text-primary/80">
              TLS encrypted · Session-bound JWT · Rate limited
            </span>
          </div>

          <AnimatePresence mode="wait">
            <SignInForm key="signin" />
          </AnimatePresence>
        </div>

        <p className="text-center text-muted-foreground/40 font-mono text-[10px] mt-6 tracking-wider">
          Unauthorised access attempts are logged and monitored.
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;