// src/contexts/AuthContext.tsx — fixed: no-explicit-any, upsert type error, react-refresh warning
import { createContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_EMAIL = "Kbugigi@gmail.com";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Determine admin by email (primary) or DB role (fallback)
  const resolveAdmin = async (u: User | null) => {
    if (!u) { setIsAdmin(false); return; }

    // Fast check: email matches the designated admin
    if (u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      setIsAdmin(true);
      return;
    }

    // Fallback: check the `users` table role column
    try {
      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("id", u.id)
        .single();
      // Cast through unknown to avoid `no-explicit-any` — generated types mark
      // this table as `never` but the DB does have a `role` column at runtime.
      const row = data as unknown as { role: string } | null;
      setIsAdmin(row?.role === "ADMIN");
    } catch {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      resolveAdmin(session?.user ?? null).finally(() => setLoading(false));
    });

    // Auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        await resolveAdmin(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    // Fix: The Supabase generated types mark `users` as `never` because
    // the table was defined in Prisma but not regenerated in supabase types.
    // Cast through `unknown` to bypass the compile-time `never` mismatch —
    // the actual database accepts these columns at runtime.
    if (!error && data.user) {
      const role =
        data.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
          ? "ADMIN"
          : "VIEWER";

      const userRecord = {
        id: data.user.id,
        email: data.user.email!,
        role,
        updated_at: new Date().toISOString(),
      };

      // Supabase generated types infer `never` here because `src/integrations/supabase/types.ts`
      // was not regenerated after adding the `users` table. The cast below is intentional.
      type UpsertFn = (
        values: typeof userRecord,
        options: { onConflict: string }
      ) => Promise<unknown>;

      await (
        (supabase.from("users") as unknown as { upsert: UpsertFn }).upsert
      )(userRecord, { onConflict: "id" });
    }

    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Export context so useAuth (in src/hooks/useAuth.tsx) can import it.
// Keeping useAuth in a separate non-component file resolves the
// react-refresh/only-export-components ESLint warning.
export { AuthContext };
export type { AuthContextType };