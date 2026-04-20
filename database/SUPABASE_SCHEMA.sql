-- ===================================
-- TURTLE BUS - SUPABASE SQL SCHEMA
-- ===================================

-- Tabla: users (admin panel users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT NOT NULL DEFAULT 'editor', -- owner, admin, editor, support
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Tabla: destinations (destinos turísticos)
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  featured_image TEXT,
  gallery_images JSONB, -- Array de URLs
  latitude NUMERIC,
  longitude NUMERIC,
  city TEXT,
  region TEXT,
  meta_title TEXT,
  meta_description TEXT,
  keywords JSONB, -- Array de keywords
  is_published BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_destinations_slug ON destinations(slug);
CREATE INDEX idx_destinations_is_published ON destinations(is_published);

-- Tabla: categories (categorías de tours)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);

-- Tabla: tours (tours principales)
CREATE TABLE IF NOT EXISTS tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  
  -- Pricing & Duration
  price_adult NUMERIC NOT NULL,
  price_child NUMERIC,
  duration TEXT NOT NULL,
  
  -- Media
  featured_image TEXT,
  gallery_images JSONB, -- Array de URLs
  video_url TEXT,
  
  -- Location & Map
  latitude NUMERIC,
  longitude NUMERIC,
  meeting_point TEXT,
  
  -- Details
  itinerary JSONB, -- Array de steps
  includes JSONB, -- Array
  excludes JSONB, -- Array
  requirements TEXT,
  max_participants INTEGER,
  min_age INTEGER,
  max_age INTEGER,
  
  -- Relations
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE RESTRICT,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Admin
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_tours_destination_id ON tours(destination_id);
CREATE INDEX idx_tours_category_id ON tours(category_id);
CREATE INDEX idx_tours_slug ON tours(slug);
CREATE INDEX idx_tours_is_published ON tours(is_published);
CREATE INDEX idx_tours_is_featured ON tours(is_featured);

-- Tabla: tour_faqs (preguntas frecuentes por tour)
CREATE TABLE IF NOT EXISTS tour_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tour_faqs_tour_id ON tour_faqs(tour_id);

-- Tabla: tour_availabilities (disponibilidades de tours)
CREATE TABLE IF NOT EXISTS tour_availabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time_start TEXT,
  time_end TEXT,
  slots_available INTEGER DEFAULT 10,
  status TEXT DEFAULT 'available', -- available, booked, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tour_availabilities_tour_id ON tour_availabilities(tour_id);
CREATE INDEX idx_tour_availabilities_date ON tour_availabilities(date);

-- Tabla: inquiries (consultas/leads de usuarios)
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  tour_id UUID REFERENCES tours(id) ON DELETE SET NULL,
  source TEXT DEFAULT 'web', -- web, whatsapp, email, phone
  status TEXT DEFAULT 'new', -- new, responded, converted, abandoned
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_inquiries_tour_id ON inquiries(tour_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at);

-- Tabla: reservations (reservas de tours)
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE RESTRICT,
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
  adults INTEGER NOT NULL DEFAULT 1,
  children INTEGER DEFAULT 0,
  total_price NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reservations_tour_id ON reservations(tour_id);
CREATE INDEX idx_reservations_status ON reservations(status);

-- Tabla: testimonials (testimonios/reviews)
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  email TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_testimonials_tour_id ON testimonials(tour_id);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);

-- Tabla: blog_posts (artículos del blog)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  author TEXT,
  status TEXT DEFAULT 'draft', -- draft, published, archived
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_is_published ON blog_posts(is_published);

-- Tabla: site_settings (configuración general del sitio)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_site_settings_key ON site_settings(key);

-- ===================================
-- USEFUL QUERIES FOR MANAGEMENT
-- ===================================

-- Total de tours publicados
-- SELECT COUNT(*) as total_published FROM tours WHERE is_published = true AND deleted_at IS NULL;

-- Tours destacados
-- SELECT id, title, price_adult FROM tours WHERE is_featured = true AND is_published = true ORDER BY "order";

-- Leads recientes
-- SELECT id, name, email, status, created_at FROM inquiries ORDER BY created_at DESC LIMIT 10;

-- Conversión de leads
-- SELECT 
--   CAST(COUNT(CASE WHEN status = 'converted' THEN 1 END) AS FLOAT) / COUNT(*) * 100 as conversion_rate
-- FROM inquiries;

-- Tours por destino
-- SELECT t.title, d.name as destination, t.price_adult 
-- FROM tours t 
-- JOIN destinations d ON t.destination_id = d.id 
-- WHERE is_published = true;
