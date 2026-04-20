-- ===================================
-- TURTLE BUS - SEED DATA
-- ===================================
-- Ejecuta este SQL DESPUÉS de crear el schema

-- 1️⃣ Insertar Categorías
INSERT INTO categories (name, slug, description, icon, color, "order") VALUES
('Aventura', 'aventura', 'Tours llenos de adrenalina y emoción', '🪂', '#F2790F', 1),
('Naturaleza', 'naturaleza', 'Tours enfocados en paisajes naturales', '🌲', '#5A7332', 2),
('Cultural', 'cultural', 'Experiencias culturales e históricas', '🏛️', '#F2A81D', 3),
('Gastronomía', 'gastronomia', 'Tours culinarios y degustaciones', '🍴', '#FF6B6B', 4)
ON CONFLICT DO NOTHING;

-- 2️⃣ Insertar Destinos
INSERT INTO destinations (name, slug, description, short_description, city, region, latitude, longitude, is_published, "order") VALUES
(
  'Medellín',
  'medellin',
  'La ciudad de la eterna primavera. Descubre la transformación urbana, la Comuna 13, las flores y la biodiversidad del valle de Aburrá.',
  'La ciudad de la eterna primavera',
  'Medellín',
  'Antioquia',
  6.2442,
  -75.5812,
  true,
  1
),
(
  'Guatapé',
  'guatape',
  'Pueblo pintoresco del oriente antioqueño famoso por sus fachadas coloridas, la Piedra del Peñol y sus lagos cristalinos.',
  'Pueblo de fachadas coloridas y aventuras', 
  'Guatapé',
  'Antioquia',
  6.2286,
  -75.1693,
  true,
  2
),
(
  'Santa Fe de Antioquia',
  'santa-fe-antioquia',
  'Pueblo colonial con arquitectura histórica, iglesias ancestrales y una atmósfera de otro tiempo.',
  'Pueblo colonial histórico',
  'Santa Fe de Antioquia',
  'Antioquia', 
  6.5608,
  -75.8047,
  true,
  3
)
ON CONFLICT DO NOTHING;

-- 3️⃣ Insertar Tours
INSERT INTO tours (
  slug, title, description, long_description,
  price_adult, price_child, duration,
  destination_id, category_id,
  is_published, is_featured, "order",
  meeting_point, max_participants, min_age
) VALUES
(
  'piedra-penol-guatape',
  'La Piedra del Peñol',
  'Sube los 740 escalones de la Piedra del Peñol con vistas espectaculares del embalse.',
  'Una experiencia única subiendo la mágica Piedra del Peñol. Desde la cima podrás ver el embalse del Peñol y los pueblos cercanos. Incluye tiempo en el pueblo de Guatapé.',
  45000, 25000, '5 horas',
  (SELECT id FROM destinations WHERE slug = 'guatape' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'aventura' LIMIT 1),
  true, true, 1,
  'Terminal de Guatapé', 20, 6
),
(
  'Comuna-13-medellin',
  'Comuna 13 Tour',
  'Recorre las calles artísticas de la Comuna 13 con guías locales que conocen su historia de transformación.',
  'Conoce la transformación urbana de la Comuna 13. Graffitis artísticos, escaleras coloridas, tirolesa y la historia de cómo esta comunidad cambió su futuro.',
  50000, 30000, '4 horas',
  (SELECT id FROM destinations WHERE slug = 'medellin' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'cultural' LIMIT 1),
  true, true, 2,
  'Entrada Comuna 13', 15, 8
),
(
  'caida-agua-el-retiro',
  'Cascada El Retiro',
  'Caminata a una hermosa cascada en el corazón del bosque tropical antioqueño.',
  'Camina a través de frondosos bosques para llegar a la espectacular cascada El Retiro. Ideal para fotografía de naturaleza y relajación en piscinas naturales.',
  35000, 20000, '6 horas',
  (SELECT id FROM destinations WHERE slug = 'guatape' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1),
  true, false, 3,
  'Centro Guatapé', 25, 5
),
(
  'recorrido-colonial-santa-fe',
  'Recorrido Colonial Completo',
  'Visita a iglesias, plazas históricas y museos del pueblo colonial de Santa Fe de Antioquia.',
  'Un viaje en el tiempo explorando la arquitectura colonial, las iglesias ancestrales y la historia de Santa Fe de Antioquia. Incluye almuerzo típico.',
  40000, 25000, '5 horas',
  (SELECT id FROM destinations WHERE slug = 'santa-fe-antioquia' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'cultural' LIMIT 1),
  true, false, 4,
  'Parque Bolívar', 20, 10
)
ON CONFLICT DO NOTHING;

-- 4️⃣ Insertar FAQs para el primer tour
INSERT INTO tour_faqs (tour_id, question, answer, "order") 
SELECT 
  id,
  'question'::TEXT,
  'answer'::TEXT,
  row_number() OVER () as order_num
FROM (
  SELECT id FROM tours WHERE slug = 'piedra-penol-guatape' LIMIT 1
) tours
CROSS JOIN (
  SELECT 
    '¿Cuál es el nivel de dificultad?' as question,
    'Es una caminata moderada. Requiere buen estado físico. La mayoría de personas la completan sin problemas.' as answer
  UNION ALL
  SELECT
    '¿Qué llevar?',
    'Lleva agua, protector solar, repelente, ropa cómoda y zapatos deportivos. Recomendamos mochila pequeña.'
  UNION ALL
  SELECT
    '¿Hay tiempo libre en Guatapé?',
    'Sí, incluimos 1.5 horas libres para explorar el pueblo, comer y descansar.'
) faqs
ON CONFLICT DO NOTHING;

-- 5️⃣ Insertar Testimonios
INSERT INTO testimonials (tour_id, author, email, content, rating, featured, is_published) 
SELECT 
  id,
  'Juan Pérez',
  'juan@example.com',
  '¡La mejor experiencia en Antioquia! Las vistas desde la Piedra del Peñol son alucinantes. El guía fue muy profesional.',
  5,
  true,
  true
FROM tours WHERE slug = 'piedra-penol-guatape'
UNION ALL
SELECT
  id,
  'María García',
  'maria@example.com',
  'Comuna 13 es imprescindible. Ver la transformación fue emocionante. Altamente recomendado.',
  5,
  true,
  true
FROM tours WHERE slug = 'Comuna-13-medellin'
UNION ALL
SELECT
  id,
  'Carlos López',
  'carlos@example.com',
  'La cascada El Retiro fue muy hermosa. Perfecto para desconectarse de la ciudad.',
  4,
  false,
  true
FROM tours WHERE slug = 'caida-agua-el-retiro'
ON CONFLICT DO NOTHING;

-- 6️⃣ Insertar Disponibilidades (próximas 2 semanas)
INSERT INTO tour_availabilities (tour_id, date, time_start, time_end, slots_available, status)
SELECT 
  t.id,
  CURRENT_DATE + (n || ' days')::INTERVAL as date,
  '08:00'::TEXT,
  '13:00'::TEXT,
  (RANDOM() * 10 + 5)::INTEGER,
  'available'
FROM tours t,
GENERATE_SERIES(0, 14) AS n
WHERE t.slug IN ('piedra-penol-guatape', 'Comuna-13-medellin', 'caida-agua-el-retiro', 'recorrido-colonial-santa-fe')
  AND (CURRENT_DATE + (n || ' days')::INTERVAL)::DATE >= CURRENT_DATE
ON CONFLICT DO NOTHING;

-- ✅ Verificar que todo se insertó
SELECT 'Categorías:' as tipo, COUNT(*) FROM categories
UNION ALL
SELECT 'Destinos:', COUNT(*) FROM destinations
UNION ALL
SELECT 'Tours:', COUNT(*) FROM tours
UNION ALL
SELECT 'FAQs:', COUNT(*) FROM tour_faqs
UNION ALL
SELECT 'Testimonios:', COUNT(*) FROM testimonials
UNION ALL
SELECT 'Disponibilidades:', COUNT(*) FROM tour_availabilities;
