// src/types/project.ts
export type Category = "Web Dev" | "Design" | "Fine Art";
export type LinkType = "live" | "repo" | "shop" | "demo" | "other";

export interface ProjectFormData {
  title: string;
  category: Category;
  description: string;
  tags: string[];
  displayOrder: number;
  featured: boolean;
  images: { imageUrl: string; altText: string }[];
  links: { label: string; url: string; linkType: LinkType }[];
  softwareMeta?: {
    techStack: string[];
    liveUrl?: string;
    repoUrl?: string;
    lighthouseScore?: number;
    pageLoadMs?: number;
    monthlyVisitors?: number;
    uptime?: number;
    analyticsNote?: string;
  };
  artMeta?: {
    medium: string;
    dimensions?: string;
    year?: number;
    isAvailable: boolean;
    price?: number;
    shopUrl?: string;
  };
  designMeta?: {
    software: string[];
    clientName?: string;
    year?: number;
    behanceUrl?: string;
  };
}

export interface Project extends ProjectFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}