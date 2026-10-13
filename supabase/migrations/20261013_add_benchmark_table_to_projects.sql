-- ==============================================================================
-- Migration: Add benchmark_table to projects & category to certifications
-- Date: 2026-10-13
-- Description:
--   1. Adds benchmark_table JSONB column to public.projects to support candidate model evaluation benchmarks.
--   2. Adds category column to public.certifications to support category grouping.
--
-- How to apply:
--   Copy and paste this script into your Supabase Dashboard -> "SQL Editor" -> "Run".
-- ==============================================================================

-- 1. Add benchmark_table to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS benchmark_table JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.projects.benchmark_table IS 'Comparative benchmark metrics for candidate evaluation models';

-- 2. Add category to certifications table
ALTER TABLE public.certifications 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Specialized';

COMMENT ON COLUMN public.certifications.category IS 'Grouping category for credentials and certifications';

-- 3. Notify PostgREST schema cache reload
NOTIFY pgrst, 'reload schema';
