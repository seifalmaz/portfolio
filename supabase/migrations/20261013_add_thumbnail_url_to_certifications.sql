-- Migration: Add thumbnail_url and category to certifications table
-- Allows storing pre-rendered image thumbnails for PDF certificates and category tags

ALTER TABLE public.certifications 
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

ALTER TABLE public.certifications 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Specialized';

COMMENT ON COLUMN public.certifications.thumbnail_url IS 'Public URL of pre-rendered image thumbnail (WebP/JPEG) for PDF certificates';
COMMENT ON COLUMN public.certifications.category IS 'Certificate categorization filter (e.g. AI & Machine Learning, Data Analytics)';

-- Notify PostgREST to immediately reload schema cache
NOTIFY pgrst, 'reload schema';
