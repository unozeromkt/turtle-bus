-- Migración: Agregar soporte para imágenes en Supabase Storage
-- Fecha: 2026-04-11

-- 1. Verificar y agregar columnas a la tabla tours si no existen
ALTER TABLE tours
ADD COLUMN IF NOT EXISTS featured_image TEXT,
ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb;

-- 2. Verificar y agregar columnas a la tabla destinations si no existen
ALTER TABLE destinations
ADD COLUMN IF NOT EXISTS featured_image TEXT,
ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb;

-- 3. Crear índices para queries rápidas
CREATE INDEX IF NOT EXISTS idx_tours_featured_image ON tours(featured_image) WHERE featured_image IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_destinations_featured_image ON destinations(featured_image) WHERE featured_image IS NOT NULL;

-- 4. Comentarios en columnas para documentación
COMMENT ON COLUMN tours.featured_image IS 'URL pública de la imagen destacada en Supabase Storage (formato: https://...)';
COMMENT ON COLUMN tours.gallery_images IS 'Array JSON de URLs públicas de imágenes en Supabase Storage';
COMMENT ON COLUMN destinations.featured_image IS 'URL pública de la imagen destacada en Supabase Storage';
COMMENT ON COLUMN destinations.gallery_images IS 'Array JSON de URLs públicas de imágenes en Supabase Storage';

-- Verificación: mostrar estructura de las tablas
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'tours' AND (column_name = 'featured_image' OR column_name = 'gallery_images');
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'destinations' AND (column_name = 'featured_image' OR column_name = 'gallery_images');
