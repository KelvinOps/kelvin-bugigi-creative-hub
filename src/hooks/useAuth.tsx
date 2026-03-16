// src/hooks/useAuth.tsx
import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";

export type { AuthContextType };
export { AuthProvider } from "@/contexts/AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}