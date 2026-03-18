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
    const headers: HeadersInit = { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
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
      console.log("Fetching projects from:", url);
      const res = await fetch(url, {
        method: "GET",
        headers: getAuthHeaders(),
        mode: "cors",
        credentials: "include"
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch projects: ${res.status} ${errorText}`);
      }
      return await res.json();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      console.error("fetchProjects error:", msg);
      return [];
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  const fetchProjectById = useCallback(async (id: string): Promise<Project | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/projects/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
        mode: "cors",
        credentials: "include"
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      console.error("fetchProjectById error:", msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  const createProject = useCallback(async (data: ProjectFormData) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Creating project at:", `${API}/projects`);
      const res = await fetch(`${API}/projects`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
        mode: "cors",
        credentials: "include"
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server response:", res.status, errorText);
        let errorMessage = `Failed to create project (${res.status})`;
        try {
          const err = JSON.parse(errorText);
          errorMessage = err.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      const result = await res.json();
      return { data: result as Project, error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      console.error("createProject error:", msg);
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
        mode: "cors",
        credentials: "include"
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update project");
      }
      return { data: await res.json() as Project, error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      console.error("updateProject error:", msg);
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
        mode: "cors",
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to delete project");
      return { error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      console.error("deleteProject error:", msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  return { fetchProjects, fetchProjectById, createProject, updateProject, deleteProject, loading, error };
}