// src/contexts/AuthContext.tsx

import { createContext, useEffect, useState, useRef, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// ── Constants ─────────────────────────────────────────────────────────────────
const ADMIN_EMAIL = "kbugigi@gmail.com"; // normalised to lowercase
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
const SESSION_TIMEOUT_MS = 8 * 60 * 60 * 1000; // 8 hours idle logout

// ── Rate-limit store (in-memory; resets on page reload) ──────────────────────
interface AttemptRecord { count: number; lockedUntil: number | null }
const attemptStore: Record<string, AttemptRecord> = {};

function checkRateLimit(email: string): { allowed: boolean; remainingMs: number } {
  const key = email.toLowerCase();
  const now = Date.now();
  const rec = attemptStore[key] ?? { count: 0, lockedUntil: null };

  if (rec.lockedUntil && now < rec.lockedUntil) {
    return { allowed: false, remainingMs: rec.lockedUntil - now };
  }
  if (rec.lockedUntil && now >= rec.lockedUntil) {
    attemptStore[key] = { count: 0, lockedUntil: null };
  }
  return { allowed: true, remainingMs: 0 };
}

function recordFailedAttempt(email: string): number {
  const key = email.toLowerCase();
  const rec = attemptStore[key] ?? { count: 0, lockedUntil: null };
  const newCount = rec.count + 1;
  attemptStore[key] = {
    count: newCount,
    lockedUntil: newCount >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_MS : null,
  };
  return MAX_ATTEMPTS - newCount;
}

function clearAttempts(email: string) {
  delete attemptStore[email.toLowerCase()];
}

// ── Context type ─────────────────────────────────────────────────────────────
export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null; remainingAttempts?: number; lockedMs?: number }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Resolve admin status ───────────────────────────────────────────────────
  const resolveAdmin = async (u: User | null) => {
    if (!u) { setIsAdmin(false); return; }
    // Primary check: exact email match (case-insensitive)
    if (u.email?.toLowerCase() === ADMIN_EMAIL) {
      setIsAdmin(true);
      return;
    }
    // Fallback: DB role
    try {
      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("id", u.id)
        .single();
      const row = data as unknown as { role: string } | null;
      setIsAdmin(row?.role === "ADMIN");
    } catch {
      setIsAdmin(false);
    }
  };

  // ── Idle timeout: auto sign-out after 8 h of inactivity ───────────────────
  const resetIdleTimer = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      supabase.auth.signOut();
    }, SESSION_TIMEOUT_MS);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    const handler = () => { if (user) resetIdleTimer(); };
    events.forEach(e => window.addEventListener(e, handler, { passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, handler));
  }, [user]);

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      resolveAdmin(session?.user ?? null).finally(() => setLoading(false));
      if (session?.user) resetIdleTimer();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        await resolveAdmin(session?.user ?? null);
        setLoading(false);
        if (session?.user) resetIdleTimer();
      }
    );

    return () => {
      subscription.unsubscribe();
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  // ── signIn — admin-only + rate limiting ───────────────────────────────────
  const signIn = async (email: string, password: string) => {
    const normEmail = email.trim().toLowerCase();

    // Block non-admin emails immediately (don't reveal to attacker)
    if (normEmail !== ADMIN_EMAIL) {
      return { error: new Error("Invalid credentials.") };
    }

    // Rate limit
    const { allowed, remainingMs } = checkRateLimit(normEmail);
    if (!allowed) {
      return {
        error: new Error(
          `Too many failed attempts. Try again in ${Math.ceil(remainingMs / 60000)} minute(s).`
        ),
        lockedMs: remainingMs,
      };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: normEmail,
      password,
    });

    if (error) {
      const remaining = recordFailedAttempt(normEmail);
      if (remaining <= 0) {
        return {
          error: new Error(
            `Account locked for 15 minutes due to too many failed attempts.`
          ),
          lockedMs: LOCKOUT_MS,
        };
      }
      return {
        error: new Error(`Invalid credentials. ${remaining} attempt(s) remaining.`),
        remainingAttempts: remaining,
      };
    }

    clearAttempts(normEmail);
    return { error: null };
  };

  // ── signOut ───────────────────────────────────────────────────────────────
  const signOut = async () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}