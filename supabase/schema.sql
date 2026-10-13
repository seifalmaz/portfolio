-- ==============================================================================
-- COMPLETE SUPABASE CMS SCHEMA FOR PORTFOLIO
-- Paste this entire script into your Supabase Dashboard -> "SQL Editor" -> "Run"
-- ==============================================================================

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  timeline TEXT,
  role TEXT,
  team TEXT,
  thumbnail TEXT,
  tagline TEXT,
  business_problem TEXT,
  objectives JSONB DEFAULT '[]'::jsonb,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  architecture TEXT,
  pipeline JSONB DEFAULT '[]'::jsonb,
  dataset_description TEXT,
  key_metrics JSONB DEFAULT '[]'::jsonb,
  metrics_deep_dive JSONB DEFAULT '[]'::jsonb,
  benchmark_table JSONB DEFAULT '[]'::jsonb,
  code_snippets JSONB DEFAULT '[]'::jsonb,
  methodology TEXT,
  key_features JSONB DEFAULT '[]'::jsonb,
  challenges_and_solutions JSONB DEFAULT '[]'::jsonb,
  business_insights JSONB DEFAULT '[]'::jsonb,
  results_and_impact JSONB DEFAULT '[]'::jsonb,
  lessons_learned JSONB DEFAULT '[]'::jsonb,
  future_improvements JSONB DEFAULT '[]'::jsonb,
  github_url TEXT,
  live_demo_url TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SKILL CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.skill_categories (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT DEFAULT 'Advanced', -- e.g. 'Advanced', 'Intermediate', 'Beginner'
  icon TEXT,
  years_of_experience NUMERIC DEFAULT 1,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  type TEXT DEFAULT 'Professional Program', -- 'Internship', 'Mentorship', 'Full-time', etc.
  period TEXT NOT NULL,
  location TEXT,
  description TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  technologies JSONB DEFAULT '[]'::jsonb,
  logo_url TEXT,
  certificate_title TEXT,
  certificate_issuer TEXT,
  certificate_image TEXT,
  is_current BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT,
  expiry_date TEXT,
  credential_id TEXT,
  verify_url TEXT,
  image_url TEXT,
  thumbnail_url TEXT,
  skills JSONB DEFAULT '[]'::jsonb,
  category TEXT DEFAULT 'Specialized',
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
  id TEXT PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  period TEXT,
  start_date TEXT,
  end_date TEXT,
  is_current BOOLEAN DEFAULT false,
  gpa TEXT,
  description TEXT,
  achievements JSONB DEFAULT '[]'::jsonb,
  logo_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PORTFOLIO PROFILE TABLE (Personal Info, Hero, About, Contact)
CREATE TABLE IF NOT EXISTS public.portfolio_profile (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  roles JSONB DEFAULT '[]'::jsonb,
  tagline TEXT,
  location TEXT,
  university TEXT,
  degree TEXT,
  email TEXT,
  socials JSONB DEFAULT '{}'::jsonb,
  resume_url TEXT,
  resume_filename TEXT DEFAULT 'Seif_Almaz_CV.pdf',
  profile_image TEXT,
  bio_headline TEXT,
  bio_paragraphs JSONB DEFAULT '[]'::jsonb,
  stats JSONB DEFAULT '[]'::jsonb,
  availability_status TEXT DEFAULT 'Open for Full-Time Roles, Internships & Projects',
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PORTFOLIO SETTINGS TABLE (Section Visibility, SEO, Theme)
CREATE TABLE IF NOT EXISTS public.portfolio_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  section_visibility JSONB DEFAULT '{
    "hero": true,
    "about": true,
    "skills": true,
    "projects": true,
    "experience": true,
    "certifications": true,
    "contact": true
  }'::jsonb,
  section_order JSONB DEFAULT '["hero", "about", "skills", "projects", "experience", "certifications", "contact"]'::jsonb,
  show_resume_button BOOLEAN DEFAULT true,
  site_title TEXT DEFAULT 'Seif Ahmed Almaz | Data Analytics & AI Engineer',
  site_description TEXT DEFAULT 'Personal Portfolio & Case Studies for Data Analytics, Machine Learning, and Business Intelligence.',
  accent_color TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- ==============================================================================
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_settings ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- RLS POLICIES: PUBLIC READ ACCESS (Visitors can view)
-- ==============================================================================
DO $$ 
BEGIN
  -- Projects
  DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
  CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);

  -- Skill Categories
  DROP POLICY IF EXISTS "Public can view skill_categories" ON public.skill_categories;
  CREATE POLICY "Public can view skill_categories" ON public.skill_categories FOR SELECT USING (true);

  -- Skills
  DROP POLICY IF EXISTS "Public can view skills" ON public.skills;
  CREATE POLICY "Public can view skills" ON public.skills FOR SELECT USING (true);

  -- Experiences
  DROP POLICY IF EXISTS "Public can view experiences" ON public.experiences;
  CREATE POLICY "Public can view experiences" ON public.experiences FOR SELECT USING (true);

  -- Certifications
  DROP POLICY IF EXISTS "Public can view certifications" ON public.certifications;
  CREATE POLICY "Public can view certifications" ON public.certifications FOR SELECT USING (true);

  -- Education
  DROP POLICY IF EXISTS "Public can view education" ON public.education;
  CREATE POLICY "Public can view education" ON public.education FOR SELECT USING (true);

  -- Profile
  DROP POLICY IF EXISTS "Public can view portfolio_profile" ON public.portfolio_profile;
  CREATE POLICY "Public can view portfolio_profile" ON public.portfolio_profile FOR SELECT USING (true);

  -- Settings
  DROP POLICY IF EXISTS "Public can view portfolio_settings" ON public.portfolio_settings;
  CREATE POLICY "Public can view portfolio_settings" ON public.portfolio_settings FOR SELECT USING (true);
END $$;

-- ==============================================================================
-- RLS POLICIES: AUTHENTICATED ADMIN ACCESS (Only logged in admin can edit)
-- ==============================================================================
DO $$ 
BEGIN
  -- Projects
  DROP POLICY IF EXISTS "Admin manage projects" ON public.projects;
  CREATE POLICY "Admin manage projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Skill Categories
  DROP POLICY IF EXISTS "Admin manage skill_categories" ON public.skill_categories;
  CREATE POLICY "Admin manage skill_categories" ON public.skill_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Skills
  DROP POLICY IF EXISTS "Admin manage skills" ON public.skills;
  CREATE POLICY "Admin manage skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Experiences
  DROP POLICY IF EXISTS "Admin manage experiences" ON public.experiences;
  CREATE POLICY "Admin manage experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Certifications
  DROP POLICY IF EXISTS "Admin manage certifications" ON public.certifications;
  CREATE POLICY "Admin manage certifications" ON public.certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Education
  DROP POLICY IF EXISTS "Admin manage education" ON public.education;
  CREATE POLICY "Admin manage education" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Profile
  DROP POLICY IF EXISTS "Admin manage portfolio_profile" ON public.portfolio_profile;
  CREATE POLICY "Admin manage portfolio_profile" ON public.portfolio_profile FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Settings
  DROP POLICY IF EXISTS "Admin manage portfolio_settings" ON public.portfolio_settings;
  CREATE POLICY "Admin manage portfolio_settings" ON public.portfolio_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
END $$;

-- ==============================================================================
-- STORAGE BUCKETS FOR MEDIA UPLOADS
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'portfolio-assets' bucket
DROP POLICY IF EXISTS "Public can view assets" ON storage.objects;
CREATE POLICY "Public can view assets" ON storage.objects FOR SELECT USING (bucket_id IN ('project-images', 'portfolio-assets'));

DROP POLICY IF EXISTS "Admin can upload assets" ON storage.objects;
CREATE POLICY "Admin can upload assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('project-images', 'portfolio-assets'));

DROP POLICY IF EXISTS "Admin can update assets" ON storage.objects;
CREATE POLICY "Admin can update assets" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id IN ('project-images', 'portfolio-assets'));

DROP POLICY IF EXISTS "Admin can delete assets" ON storage.objects;
CREATE POLICY "Admin can delete assets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('project-images', 'portfolio-assets'));
