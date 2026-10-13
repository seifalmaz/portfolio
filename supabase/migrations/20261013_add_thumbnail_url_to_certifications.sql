-- Migration: Add thumbnail_url to certifications table
-- Allows storing pre-rendered image thumbnails for PDF certificates

ALTER TABLE certifications 
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

COMMENT ON COLUMN certifications.thumbnail_url IS 'Public URL of pre-rendered image thumbnail (WebP/JPEG) for PDF certificates';
