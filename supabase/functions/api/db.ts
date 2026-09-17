// Neon (PostgreSQL) connection + schema bootstrap for the portfolio API.
import postgres from "npm:postgres@3.4.4";

const connectionString = Deno.env.get("NEON_DATABASE_URL");
if (!connectionString) throw new Error("NEON_DATABASE_URL is not set");

export const sql = postgres(connectionString, {
  ssl: "require",
  max: 3,
  idle_timeout: 20,
  connect_timeout: 15,
  prepare: false,
});

let ready: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      await sql.unsafe(`
        CREATE SCHEMA IF NOT EXISTS portfolio;

        CREATE TABLE IF NOT EXISTS portfolio.admin_users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          password_hash TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'ADMIN',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );

        CREATE TABLE IF NOT EXISTS portfolio.media (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          filename TEXT NOT NULL,
          mime_type TEXT NOT NULL,
          size_bytes INTEGER NOT NULL,
          data BYTEA NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );

        CREATE TABLE IF NOT EXISTS portfolio.projects (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          category TEXT NOT NULL,
          description TEXT NOT NULL DEFAULT '',
          tags TEXT[] NOT NULL DEFAULT '{}',
          featured BOOLEAN NOT NULL DEFAULT false,
          display_order INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );

        CREATE TABLE IF NOT EXISTS portfolio.project_images (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          project_id UUID NOT NULL REFERENCES portfolio.projects(id) ON DELETE CASCADE,
          image_url TEXT NOT NULL,
          alt_text TEXT NOT NULL DEFAULT '',
          display_order INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS portfolio.project_links (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          project_id UUID NOT NULL REFERENCES portfolio.projects(id) ON DELETE CASCADE,
          label TEXT NOT NULL,
          url TEXT NOT NULL,
          link_type TEXT NOT NULL DEFAULT 'other',
          display_order INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS portfolio.project_videos (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          project_id UUID NOT NULL REFERENCES portfolio.projects(id) ON DELETE CASCADE,
          video_url TEXT NOT NULL,
          title TEXT NOT NULL DEFAULT '',
          description TEXT NOT NULL DEFAULT '',
          display_order INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS portfolio.software_meta (
          project_id UUID PRIMARY KEY REFERENCES portfolio.projects(id) ON DELETE CASCADE,
          tech_stack TEXT[] NOT NULL DEFAULT '{}',
          live_url TEXT, repo_url TEXT,
          lighthouse_score INTEGER, page_load_ms INTEGER,
          monthly_visitors INTEGER, uptime NUMERIC, analytics_note TEXT
        );

        CREATE TABLE IF NOT EXISTS portfolio.art_meta (
          project_id UUID PRIMARY KEY REFERENCES portfolio.projects(id) ON DELETE CASCADE,
          medium TEXT, dimensions TEXT, year INTEGER,
          is_available BOOLEAN NOT NULL DEFAULT true,
          price NUMERIC, shop_url TEXT
        );

        CREATE TABLE IF NOT EXISTS portfolio.design_meta (
          project_id UUID PRIMARY KEY REFERENCES portfolio.projects(id) ON DELETE CASCADE,
          software TEXT[] NOT NULL DEFAULT '{}',
          client_name TEXT, year INTEGER, behance_url TEXT
        );
      `);
    })().catch((err) => {
      ready = null;
      throw err;
    });
  }
  return ready;
}
