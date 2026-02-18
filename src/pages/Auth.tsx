// src/pages/Auth.tsx
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Lock, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const { user, isAdmin, signIn, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Redirect already-logged-in admin
  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [loading, user, isAdmin, navigate]);

  if (!loading && user && isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    const { error: signInError } = await signIn(email, password);
    setSubmitting(false);

    if (signInError) {
      setError(signInError.message || "Sign in failed. Check your credentials.");
      return;
    }

    // Auth state change will trigger redirect via useEffect
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Background ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-amber flex items-center justify-center font-display font-bold text-primary-foreground text-xl">
            K
          </div>
          <div>
            <p className="font-display font-bold text-foreground text-xl leading-none">BUGIGI</p>
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Admin Portal</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl shadow-background/50">
          <h2 className="font-display font-bold text-foreground text-xl mb-1 text-center">Admin Sign In</h2>
          <p className="text-muted-foreground font-mono text-xs text-center mb-8 tracking-wider">
            Portfolio management — authorized access only
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="Kbugigi@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-amber text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <><LogIn size={16} /> Sign In</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-muted-foreground font-mono text-xs mt-6">
          Admin access only. Unauthorized access is prohibited.
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;