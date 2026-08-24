// src/contexts/AuthContext.tsx

import { createContext, useEffect, useState, useCallback, ReactNode } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => boolean;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Case-insensitive, and tolerant of a role stored as e.g. "Admin" / "admin"
const computeIsAdmin = (userData: User | null): boolean =>
  !!userData?.role && userData.role.toUpperCase() === "ADMIN";

// ── Create Context ────────────────────────────────────────────────────────────
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // ── Apply a user object to state (single place that keeps user/isAdmin in sync) ──
  const applyUser = useCallback((userData: User | null) => {
    setUser(userData);
    setIsAdmin(computeIsAdmin(userData));
  }, []);

  // ── Check auth from localStorage (safe to call any time, e.g. after a tab focus) ──
  const checkAuth = useCallback((): boolean => {
    try {
      const storedToken = localStorage.getItem("auth_token");
      const storedUser = localStorage.getItem("auth_user");

      if (storedToken && storedUser) {
        const userData = JSON.parse(storedUser) as User;
        setToken(storedToken);
        applyUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Auth check error:", error);
      return false;
    }
  }, [applyUser]);

  // ── Initialize auth state from localStorage on first mount only ────────────
  useEffect(() => {
    checkAuth();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Register ──────────────────────────────────────────────────────────────
  const register = async (
    email: string,
    password: string,
    name?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!email || !email.trim()) return { success: false, error: "Email is required" };
      if (!password || password.length < 6)
        return { success: false, error: "Password must be at least 6 characters" };

      const normalizedEmail = email.trim().toLowerCase();

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
          name: name || email.split("@")[0],
        }),
      });

      const data = await response.json();

      if (!response.ok) return { success: false, error: data.error || "Registration failed" };
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error instanceof Error ? error.message : "Network error" };
    }
  };

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!email || !email.trim()) return { success: false, error: "Email is required" };
      if (!password || password.length < 6)
        return { success: false, error: "Password must be at least 6 characters" };

      const normalizedEmail = email.trim().toLowerCase();

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      const data = await response.json();

      if (!response.ok) return { success: false, error: data.error || "Login failed" };
      if (!data.token || !data.user) return { success: false, error: "Invalid response from server" };

      // Persist first...
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));

      // ...then update state (single source of truth for user/isAdmin)
      setToken(data.token);
      applyUser(data.user);

      console.log("✅ Login successful:", data.user.email, "role:", data.user.role);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error instanceof Error ? error.message : "Network error" };
    }
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = async () => {
    try {
      if (token) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      setToken(null);
      applyUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    isAdmin,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}