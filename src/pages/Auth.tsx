// src/pages/Auth.tsx


import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, LogIn, Lock, Mail, AlertCircle,
  ShieldCheck, Clock, Fingerprint, UserPlus, ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

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

// ── Strength meter ────────────────────────────────────────────────────────────
function strengthScore(pw: string): 0 | 1 | 2 | 3 | 4 {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4) as 0 | 1 | 2 | 3 | 4;
}

const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"] as const;
const strengthColor = ["", "bg-destructive", "bg-amber-500", "bg-yellow-400", "bg-emerald-500"] as const;

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

// ── Setup mode — create admin account ─────────────────────────────────────────
function SetupForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const score = strengthScore(password);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (password !== confirm) { setMessage("Passwords do not match."); setStatus("error"); return; }
    if (score < 2) { setMessage("Please choose a stronger password (mix uppercase, numbers, symbols)."); setStatus("error"); return; }

    setStatus("loading");

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setStatus("error");
      setMessage(signUpError.message);
      return;
    }

    // Try to write ADMIN role — non-fatal if RLS blocks it.
    // Cast through unknown to bypass generated types that mark `users` as `never`
    // (Supabase types were not regenerated after the Prisma schema was added).
    if (data.user?.id) {
      type UpsertFn = (
        values: { id: string; email: string; role: string; updated_at: string },
        options: { onConflict: string }
      ) => Promise<unknown>;

      try {
        await (
          (supabase.from("users" as never) as unknown as { upsert: UpsertFn }).upsert
        )(
          { id: data.user.id, email, role: "ADMIN", updated_at: new Date().toISOString() },
          { onConflict: "id" }
        );
      } catch { /* continue — admin email match in AuthContext still works */ }
    }

    setStatus("success");
    setMessage(
      data.session
        ? "Account created and you are signed in! Redirecting…"
        : "Account created! If email confirmation is required, confirm it in your inbox then sign in here."
    );
  };

  return (
    <motion.div key="setup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <button onClick={onBack}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground font-mono text-xs uppercase tracking-wider mb-6 transition-colors">
        <ArrowLeft size={12} /> Back to Sign In
      </button>

      <div className="mb-6">
        <p className="font-display font-bold text-foreground text-lg">Create Admin Account</p>
        <p className="font-mono text-xs text-muted-foreground mt-1">
          Use the email you want for your admin login.
        </p>
      </div>

      {status === "success" ? (
        <div className="py-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
            <ShieldCheck size={24} className="text-emerald-400" />
          </div>
          <p className="font-display font-bold text-foreground text-base leading-snug px-2">{message}</p>
          <button onClick={onBack}
            className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-display font-bold text-sm">
            Go to Sign In
          </button>
        </div>
      ) : (
        <form onSubmit={handleSetup} className="space-y-4">
          <InputField label="Admin Email" type="email" value={email} onChange={setEmail}
            placeholder="kbugigi@gmail.com" icon={Mail} autoComplete="username" />

          <div>
            <InputField label="Password" type={showPw ? "text" : "password"} value={password}
              onChange={setPassword} placeholder="Min 8 characters" icon={Lock}
              autoComplete="new-password"
              rightEl={
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />
            {password.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= score ? strengthColor[score] : "bg-border"}`} />
                  ))}
                </div>
                <p className="font-mono text-[10px] text-muted-foreground">{score > 0 ? strengthLabel[score] : ""}</p>
              </div>
            )}
          </div>

          <InputField label="Confirm Password" type={showPw ? "text" : "password"} value={confirm}
            onChange={setConfirm} placeholder="Repeat password" icon={Lock} autoComplete="new-password" />

          {/* Critical tip about email confirmation */}
          <div className="px-3 py-2.5 rounded-xl bg-amber-500/8 border border-amber-500/20">
            <p className="font-mono text-[10px] text-amber-400/90 leading-relaxed">
              <strong>Important:</strong> If sign-in still fails after creating the account, go to your
              Supabase Dashboard → Authentication → Users, find your email and click
              <strong> "Confirm email"</strong>. Or disable "Confirm email" in Auth → Settings.
            </p>
          </div>

          {status === "error" && message && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <p>{message}</p>
            </div>
          )}

          <button type="submit" disabled={status === "loading"}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-display font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50">
            {status === "loading"
              ? <div className="w-4 h-4 border-2 border-black/20 border-t-black/80 rounded-full animate-spin" />
              : <><UserPlus size={16} /> Create Admin Account</>}
          </button>
        </form>
      )}
    </motion.div>
  );
}

// ── Sign-in form ──────────────────────────────────────────────────────────────
function SignInForm({ onSetup }: { onSetup: () => void }) {
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
        placeholder="kbugigi@gmail.com" icon={Mail} autoComplete="username" />

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

      {/* Setup link */}
      <div className="pt-3 border-t border-border/50 text-center">
        <p className="font-mono text-[11px] text-muted-foreground mb-2">First time here?</p>
        <button type="button" onClick={onSetup}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">
          <UserPlus size={12} /> Create admin account
        </button>
      </div>
    </motion.form>
  );
}

// ── Page shell ────────────────────────────────────────────────────────────────
const Auth = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "setup">("signin");

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
            {mode === "setup" ? "Admin Setup" : "Admin Portal · Authorised Access Only"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
          {mode === "signin" && (
            <div className="flex items-center gap-2 mb-7 px-3 py-2 rounded-xl bg-primary/5 border border-primary/15">
              <ShieldCheck size={14} className="text-primary flex-shrink-0" />
              <span className="font-mono text-[11px] text-primary/80">
                TLS encrypted · Session-bound JWT · Rate limited
              </span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {mode === "signin"
              ? <SignInForm key="signin" onSetup={() => setMode("setup")} />
              : <SetupForm key="setup" onBack={() => setMode("signin")} />}
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