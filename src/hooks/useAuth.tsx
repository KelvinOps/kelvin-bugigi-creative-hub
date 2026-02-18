// src/hooks/useAuth.tsx
// useAuth lives here (a non-component file) so that AuthContext.tsx only
// exports the AuthProvider component — satisfying react-refresh/only-export-components.
import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";

export type { AuthContextType };
// Re-export AuthProvider so callers can import from either path
export { AuthProvider } from "@/contexts/AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}