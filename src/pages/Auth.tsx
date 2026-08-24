// src/pages/Auth.tsx

import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, Lock, Mail, AlertCircle,
  ShieldCheck, Fingerprint, UserPlus, LogIn, User,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// ── Reusable input ────────────────────────────────────────────────────────────
function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  rightEl,
  autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: React.ElementType;
  rightEl?: React.ReactNode;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-2">
        {label}
      </label>
      <div className="relative group">
        <Icon
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
        />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full pl-10 pr-10 py-3 bg-secondary/60 border border-border rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
        />
        {rightEl && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightEl}</div>}
      </div>
    </div>
  );
}

// ── Sign-in form ──────────────────────────────────────────────────────────────
function SignInForm({ onSuccess }: { onSuccess: () => void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    setSuccess(false);

    if (!email.trim()) {
      setError("Email is required");
      setSubmitting(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setSubmitting(false);
      return;
    }

    const result = await login(email.trim(), password);

    if (result.success) {
      setSuccess(true);
      // Call the onSuccess callback to handle navigation
      setTimeout(() => {
        onSuccess();
      }, 300);
    } else {
      setError(result.error || "Login failed. Please try again.");
    }

    setSubmitting(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <InputField
        label="Email Address"
        type="email"
        value={email}
        onChange={(v) => { setEmail(v); setError(null); }}
        placeholder="your@email.com"
        icon={Mail}
        autoComplete="username"
      />

      <InputField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(v) => { setPassword(v); setError(null); }}
        placeholder="••••••••••••"
        icon={Lock}
        autoComplete="current-password"
        rightEl={
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
      />

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-start gap-3 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
        >
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
        >
          <span>✓ Login successful! Redirecting...</span>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-display font-bold text-sm flex items-center justify-center gap-2 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <div className="w-4 h-4 border-2 border-black/20 border-t-black/80 rounded-full animate-spin" />
        ) : (
          <>
            <LogIn size={16} /> Sign In
          </>
        )}
      </button>
    </motion.form>
  );
}

// ── Register form ─────────────────────────────────────────────────────────────
function RegisterForm({ switchToLogin }: { switchToLogin: () => void }) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    setSuccess(false);

    if (!email.trim()) {
      setError("Email is required");
      setSubmitting(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setSubmitting(false);
      return;
    }

    const result = await register(email.trim(), password, name.trim() || undefined);

    if (result.success) {
      setSuccess(true);
      setEmail("");
      setPassword("");
      setName("");
      setTimeout(() => {
        setSuccess(false);
        switchToLogin();
      }, 2000);
    } else {
      setError(result.error || "Registration failed. Please try again.");
    }

    setSubmitting(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <InputField
        label="Full Name (Optional)"
        type="text"
        value={name}
        onChange={setName}
        placeholder="Your Name"
        icon={User}
        autoComplete="name"
      />

      <InputField
        label="Email Address"
        type="email"
        value={email}
        onChange={(v) => { setEmail(v); setError(null); }}
        placeholder="your@email.com"
        icon={Mail}
        autoComplete="email"
      />

      <InputField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(v) => { setPassword(v); setError(null); }}
        placeholder="Minimum 6 characters"
        icon={Lock}
        autoComplete="new-password"
        rightEl={
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
      />

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-start gap-3 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
        >
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
        >
          <span>✓ Registration successful! Redirecting to login...</span>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-display font-bold text-sm flex items-center justify-center gap-2 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <div className="w-4 h-4 border-2 border-black/20 border-t-black/80 rounded-full animate-spin" />
        ) : (
          <>
            <UserPlus size={16} /> Create Account
          </>
        )}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          onClick={switchToLogin}
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Sign In
        </button>
      </p>
    </motion.form>
  );
}

// ── Page shell ────────────────────────────────────────────────────────────────
const Auth = () => {
  const { user, isAdmin, loading, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // Check if already logged in
  useEffect(() => {
    // Check auth status
    const isAuthed = checkAuth();
    console.log("🔍 Auth check on mount:", isAuthed, "user:", user, "isAdmin:", isAdmin);
    
    if (!loading && user && isAdmin) {
      console.log("🔀 Redirecting to admin from Auth page (useEffect)");
      navigate("/admin", { replace: true });
    }
  }, [loading, user, isAdmin, navigate, checkAuth]);

  // Handle successful login
  const handleLoginSuccess = () => {
    console.log("🎯 Login success callback - navigating to admin");
    // Force a check of auth status
    checkAuth();
    // Navigate to admin
    navigate("/admin", { replace: true });
  };

  // Redirect if already logged in and is admin (for the render)
  if (!loading && user && isAdmin) {
    console.log("🔀 Redirecting to admin from Auth page (render)");
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(36 90% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(36 90% 55%) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
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
            {isLogin ? (
              <SignInForm key="login" onSuccess={handleLoginSuccess} />
            ) : (
              <RegisterForm key="register" switchToLogin={() => setIsLogin(true)} />
            )}
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