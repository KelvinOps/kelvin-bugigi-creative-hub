// src/hooks/useProjects.ts
import { useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { ProjectFormData, Project } from "@/types/project";

// Use Vite env variable (not Next.js process.env)
const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export type { ProjectFormData };

export function useProjects() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = useCallback((): HeadersInit => {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (session?.access_token) {
      (headers as Record<string, string>).Authorization = `Bearer ${session.access_token}`;
    }
    return headers;
  }, [session]);

  const fetchProjects = useCallback(async (category?: string): Promise<Project[]> => {
    setLoading(true);
    setError(null);
    try {
      const url = category
        ? `${API}/projects?category=${encodeURIComponent(category)}`
        : `${API}/projects`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return await res.json();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProjectById = useCallback(async (id: string): Promise<Project | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/projects/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (data: ProjectFormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/projects`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create project");
      }
      return { data: await res.json() as Project, error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      return { data: null, error: msg };
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  const updateProject = useCallback(async (id: string, data: ProjectFormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/projects/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update project");
      }
      return { data: await res.json() as Project, error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      return { data: null, error: msg };
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  const deleteProject = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/projects/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete project");
      return { error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  return { fetchProjects, fetchProjectById, createProject, updateProject, deleteProject, loading, error };
}