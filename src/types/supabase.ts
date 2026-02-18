// src/types/supabase.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'ADMIN' | 'USER'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'ADMIN' | 'USER'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'ADMIN' | 'USER'
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          category: 'Web Dev' | 'Design' | 'Fine Art'
          description: string
          tags: string[]
          display_order: number
          featured: boolean
          created_at: string
          updated_at: string
          software_meta?: Json
          art_meta?: Json
          design_meta?: Json
        }
        Insert: {
          id?: string
          title: string
          category: 'Web Dev' | 'Design' | 'Fine Art'
          description: string
          tags: string[]
          display_order: number
          featured: boolean
          created_at?: string
          updated_at?: string
          software_meta?: Json
          art_meta?: Json
          design_meta?: Json
        }
        Update: {
          id?: string
          title?: string
          category?: 'Web Dev' | 'Design' | 'Fine Art'
          description?: string
          tags?: string[]
          display_order?: number
          featured?: boolean
          created_at?: string
          updated_at?: string
          software_meta?: Json
          art_meta?: Json
          design_meta?: Json
        }
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          image_url: string
          alt_text: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          image_url: string
          alt_text: string
          display_order: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          image_url?: string
          alt_text?: string
          display_order?: number
          created_at?: string
        }
      }
      project_links: {
        Row: {
          id: string
          project_id: string
          label: string
          url: string
          link_type: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          label: string
          url: string
          link_type: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          label?: string
          url?: string
          link_type?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}