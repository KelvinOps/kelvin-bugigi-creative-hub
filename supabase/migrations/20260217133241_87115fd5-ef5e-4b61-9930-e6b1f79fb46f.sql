
-- Storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Web Dev', 'Design', 'Fine Art')),
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Project images table
CREATE TABLE public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Project links table
CREATE TABLE public.project_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  link_type TEXT NOT NULL DEFAULT 'other' CHECK (link_type IN ('live', 'repo', 'shop', 'other')),
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_links ENABLE ROW LEVEL SECURITY;

-- Public read for all visitors
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Anyone can view project images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Anyone can view project links" ON public.project_links FOR SELECT USING (true);

-- Only authenticated users can manage (you'll be the only user)
CREATE POLICY "Auth users can insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update projects" ON public.projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete projects" ON public.projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert images" ON public.project_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update images" ON public.project_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete images" ON public.project_images FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert links" ON public.project_links FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update links" ON public.project_links FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete links" ON public.project_links FOR DELETE TO authenticated USING (true);

-- Storage policies for portfolio bucket
CREATE POLICY "Anyone can view portfolio images" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Auth users can upload portfolio images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');
CREATE POLICY "Auth users can update portfolio images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio');
CREATE POLICY "Auth users can delete portfolio images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio');

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
