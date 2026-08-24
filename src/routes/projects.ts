import express from 'express';
import { query } from '../config/database.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// ─── GET all projects ─────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// ─── GET single project ──────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// ─── CREATE project ──────────────────────────────────────────────────────────
router.post('/', upload.array('media', 10), async (req, res) => {
  const client = await getClient();
  try {
    const { title, category, description, tags, featured, links, softwareMeta, artMeta, designMeta } = req.body;
    const files = req.files as Express.Multer.File[];

    await client.query('BEGIN');

    // Insert project
    const projectResult = await client.query(
      `INSERT INTO projects (title, category, description, tags, featured)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [title, category, description, tags || [], featured || false]
    );
    const projectId = projectResult.rows[0].id;

    // Insert images
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = `/uploads/${file.filename}`;
        await client.query(
          'INSERT INTO project_images (project_id, image_url, display_order) VALUES ($1, $2, $3)',
          [projectId, imageUrl, i]
        );
      }
    }

    // Insert links
    if (links && Array.isArray(links)) {
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        await client.query(
          'INSERT INTO project_links (project_id, label, url, link_type, display_order) VALUES ($1, $2, $3, $4, $5)',
          [projectId, link.label, link.url, link.link_type, i]
        );
      }
    }

    // Insert software meta
    if (softwareMeta) {
      await client.query(
        `INSERT INTO software_meta (project_id, tech_stack, live_url, repo_url, lighthouse_score, page_load_ms, monthly_visitors, uptime, analytics_note)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          projectId,
          softwareMeta.tech_stack || [],
          softwareMeta.live_url,
          softwareMeta.repo_url,
          softwareMeta.lighthouse_score,
          softwareMeta.page_load_ms,
          softwareMeta.monthly_visitors,
          softwareMeta.uptime,
          softwareMeta.analytics_note
        ]
      );
    }

    // Insert art meta
    if (artMeta) {
      await client.query(
        `INSERT INTO art_meta (project_id, medium, dimensions, year, is_available, price, shop_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          projectId,
          artMeta.medium,
          artMeta.dimensions,
          artMeta.year,
          artMeta.is_available !== undefined ? artMeta.is_available : true,
          artMeta.price,
          artMeta.shop_url
        ]
      );
    }

    // Insert design meta
    if (designMeta) {
      await client.query(
        `INSERT INTO design_meta (project_id, software, client_name, year, behance_url)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          projectId,
          designMeta.software || [],
          designMeta.client_name,
          designMeta.year,
          designMeta.behance_url
        ]
      );
    }

    await client.query('COMMIT');

    const project = await getProjectById(projectId);
    res.status(201).json(project);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  } finally {
    client.release();
  }
});

// ─── UPDATE project ──────────────────────────────────────────────────────────
router.put('/:id', upload.array('media', 10), async (req, res) => {
  const client = await getClient();
  try {
    const { id } = req.params;
    const { title, category, description, tags, featured, links, softwareMeta, artMeta, designMeta } = req.body;
    const files = req.files as Express.Multer.File[];

    await client.query('BEGIN');

    // Update project
    await client.query(
      `UPDATE projects SET
        title = $1, category = $2, description = $3, tags = $4, featured = $5,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $6`,
      [title, category, description, tags || [], featured || false, id]
    );

    // Handle images - delete old ones and add new ones
    if (files && files.length > 0) {
      await client.query('DELETE FROM project_images WHERE project_id = $1', [id]);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = `/uploads/${file.filename}`;
        await client.query(
          'INSERT INTO project_images (project_id, image_url, display_order) VALUES ($1, $2, $3)',
          [id, imageUrl, i]
        );
      }
    }

    // Update links - delete old and insert new
    if (links && Array.isArray(links)) {
      await client.query('DELETE FROM project_links WHERE project_id = $1', [id]);
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        await client.query(
          'INSERT INTO project_links (project_id, label, url, link_type, display_order) VALUES ($1, $2, $3, $4, $5)',
          [id, link.label, link.url, link.link_type, i]
        );
      }
    }

    // Update software meta (upsert)
    if (softwareMeta) {
      await client.query(
        `INSERT INTO software_meta (project_id, tech_stack, live_url, repo_url, lighthouse_score, page_load_ms, monthly_visitors, uptime, analytics_note)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (project_id) DO UPDATE SET
           tech_stack = EXCLUDED.tech_stack,
           live_url = EXCLUDED.live_url,
           repo_url = EXCLUDED.repo_url,
           lighthouse_score = EXCLUDED.lighthouse_score,
           page_load_ms = EXCLUDED.page_load_ms,
           monthly_visitors = EXCLUDED.monthly_visitors,
           uptime = EXCLUDED.uptime,
           analytics_note = EXCLUDED.analytics_note,
           updated_at = CURRENT_TIMESTAMP`,
        [
          id,
          softwareMeta.tech_stack || [],
          softwareMeta.live_url,
          softwareMeta.repo_url,
          softwareMeta.lighthouse_score,
          softwareMeta.page_load_ms,
          softwareMeta.monthly_visitors,
          softwareMeta.uptime,
          softwareMeta.analytics_note
        ]
      );
    }

    // Update art meta (upsert)
    if (artMeta) {
      await client.query(
        `INSERT INTO art_meta (project_id, medium, dimensions, year, is_available, price, shop_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (project_id) DO UPDATE SET
           medium = EXCLUDED.medium,
           dimensions = EXCLUDED.dimensions,
           year = EXCLUDED.year,
           is_available = EXCLUDED.is_available,
           price = EXCLUDED.price,
           shop_url = EXCLUDED.shop_url,
           updated_at = CURRENT_TIMESTAMP`,
        [
          id,
          artMeta.medium,
          artMeta.dimensions,
          artMeta.year,
          artMeta.is_available !== undefined ? artMeta.is_available : true,
          artMeta.price,
          artMeta.shop_url
        ]
      );
    }

    // Update design meta (upsert)
    if (designMeta) {
      await client.query(
        `INSERT INTO design_meta (project_id, software, client_name, year, behance_url)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (project_id) DO UPDATE SET
           software = EXCLUDED.software,
           client_name = EXCLUDED.client_name,
           year = EXCLUDED.year,
           behance_url = EXCLUDED.behance_url,
           updated_at = CURRENT_TIMESTAMP`,
        [
          id,
          designMeta.software || [],
          designMeta.client_name,
          designMeta.year,
          designMeta.behance_url
        ]
      );
    }

    await client.query('COMMIT');

    const project = await getProjectById(id);
    res.json(project);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  } finally {
    client.release();
  }
});

// ─── DELETE project ──────────────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  const client = await getClient();
  try {
    const { id } = req.params;

    await client.query('BEGIN');
    await client.query('DELETE FROM projects WHERE id = $1', [id]);
    await client.query('COMMIT');

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  } finally {
    client.release();
  }
});

// ─── Helper functions ────────────────────────────────────────────────────────

async function getAllProjects() {
  const result = await query(`
    SELECT
      p.*,
      COALESCE(
        (SELECT json_agg(pi ORDER BY pi.display_order) FROM project_images pi WHERE pi.project_id = p.id),
        '[]'::json
      ) as images,
      COALESCE(
        (SELECT json_agg(pl ORDER BY pl.display_order) FROM project_links pl WHERE pl.project_id = p.id),
        '[]'::json
      ) as links,
      (SELECT row_to_json(sm) FROM software_meta sm WHERE sm.project_id = p.id) as software_meta,
      (SELECT row_to_json(am) FROM art_meta am WHERE am.project_id = p.id) as art_meta,
      (SELECT row_to_json(dm) FROM design_meta dm WHERE dm.project_id = p.id) as design_meta
    FROM projects p
    ORDER BY p.display_order
  `);

  return result.rows;
}

async function getProjectById(id: string) {
  const result = await query(`
    SELECT
      p.*,
      COALESCE(
        (SELECT json_agg(pi ORDER BY pi.display_order) FROM project_images pi WHERE pi.project_id = p.id),
        '[]'::json
      ) as images,
      COALESCE(
        (SELECT json_agg(pl ORDER BY pl.display_order) FROM project_links pl WHERE pl.project_id = p.id),
        '[]'::json
      ) as links,
      (SELECT row_to_json(sm) FROM software_meta sm WHERE sm.project_id = p.id) as software_meta,
      (SELECT row_to_json(am) FROM art_meta am WHERE am.project_id = p.id) as art_meta,
      (SELECT row_to_json(dm) FROM design_meta dm WHERE dm.project_id = p.id) as design_meta,
      (SELECT json_agg(pv ORDER BY pv.display_order) FROM project_videos pv WHERE pv.project_id = p.id) as videos
    FROM projects p
    WHERE p.id = $1
  `, [id]);

  return result.rows[0] || null;
}

export default router;