// api/projects/index.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { pool } from "../../lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      const { rows: projects } = await pool.query(`SELECT * FROM projects ORDER BY display_order ASC`);

      // Pull related rows for each project — for a small portfolio this is fine;
      // for larger datasets you'd batch these with a single JOIN or json_agg query.
      const full = await Promise.all(
        projects.map(async (p) => {
          const [images, links, videos, softwareMeta, artMeta, designMeta] = await Promise.all([
            pool.query(`SELECT * FROM project_images WHERE project_id = $1 ORDER BY display_order ASC`, [p.id]),
            pool.query(`SELECT * FROM project_links WHERE project_id = $1 ORDER BY display_order ASC`, [p.id]),
            pool.query(`SELECT * FROM project_videos WHERE project_id = $1 ORDER BY display_order ASC`, [p.id]),
            pool.query(`SELECT * FROM software_meta WHERE project_id = $1`, [p.id]),
            pool.query(`SELECT * FROM art_meta WHERE project_id = $1`, [p.id]),
            pool.query(`SELECT * FROM design_meta WHERE project_id = $1`, [p.id]),
          ]);
          return {
            ...p,
            images: images.rows,
            links: links.rows,
            videos: videos.rows,
            softwareMeta: softwareMeta.rows[0] ?? null,
            artMeta: artMeta.rows[0] ?? null,
            designMeta: designMeta.rows[0] ?? null,
          };
        })
      );

      res.status(200).json(full);
    } catch (err) {
      console.error("GET /api/projects error:", err);
      res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
    }
    return;
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).json({ error: "Method not allowed" });
}