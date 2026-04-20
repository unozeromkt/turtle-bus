# 03. Information Architecture

## Objetivo

Definir la estructura lógica, navegación, taxonomías y relaciones de contenido del sitio. Este documento guía tanto al diseño como al desarrollo de la arquitectura del CMS y base de datos.

---

## Mapa del Sitio (Sitemap)

```
Turtle Bus - Plataforma Turística
│
├── (/home) Home / Homepage
│   └── Hero + Categorías + Tours Destacados + Blog Preview + CTA
│
├── (/tours) Tours - Listado
│   ├── Filtros (Destino, Categoría, Precio, Duración, Dificultad)
│   └── Grid de Tours + Sort
│
├── (/tours/:slug) Tour - Ficha Detallada
│   └── Galería, Itinerario, FAQ, Reviews, CTA
│
├── (/destinos) Destinos - Listado
│   └── Cards de destinos con tours destacados
│
├── (/destinos/:slug) Destino - Hub Editorial
│   ├── Descripción + Galería
│   ├── Tours en ese destino
│   ├── Blog posts relacionados
│   └── FAQ destino-específicas
│
├── (/actividades) Actividades / Categorías
│   └── Listado de tipos de experiencia
│
├── (/actividades/:slug) Actividad - Página de Categoría
│   ├── Descripción de tipo de experiencia
│   ├── Tours de esta categoría
│   ├── Blog articles sobre la actividad
│   └── Recursos relacionados
│
├── (/blog) Blog - Artículos
│   ├── Listado con filter por categoría
│   └── Pagination / Infinite scroll
│
├── (/blog/:slug) Blog Post - Artículo Individual
│   ├── Content, autor, fecha, compartir
│   └── Related posts + Tour recommendations
│
├── (/sobre-nosotros) About Us
│   ├── Misión y valores
│   ├── Equipo
│   └── Certificaciones
│
├── (/contacto) Contact / Formulario General
│   ├── Formulario
│   ├── Mapa
│   └── Links a redes / WhatsApp
│
├── (/testimonios) Testimonios (Opcional - puede ser modal)
│   └── Wall de testimonios con filtro
│
├── (/faq) FAQs Globales
│   └── Accordion de preguntas comunes
│
├── (/politicas) Legal - Accordion
│   ├── Términos y condiciones
│   ├── Política de privacidad
│   ├── Política de cancelación
│   └── Garantía de viajero
│
├── (/aliados) Aliados / Partners (Opcional)
│   └── Logos de marcas asociadas
│
├── (/admin) ADMIN PANEL - Protegido con Auth
│   ├── Dashboard
│   ├── Gestión de Tours
│   ├── Gestión de Destinos
│   ├── Gestión de Categorías
│   ├── Blog / Contenido
│   ├── Testimonios
│   ├── Leads y Contactos
│   ├── Configuración SEO
│   └── Usuarios y Permisos
│
└── (404, 500) Páginas de error
    └── Con sugerencias / home link
```

---

## Navegación Primaria (Main Nav)

Visible siempre (sticky header en desktop, hamburger en mobile):

```
[Logo] [Buscar] [Nav Items]                [WhatsApp CTA] [Login Admin]

Nav Items:
├── Tours
├── Destinos
├── Blog
├── Sobre Nosotros
└── Contacto
```

**Mobile**: Hamburger menu con mismo contenido, plus:
- Newsletter opt-in
- Social links
- Language toggle (si multilingual futura)

---

## Navegación Secundaria (Context-based)

### En página de Tours
```
Tours / [Categoría] / [Destino]
```
(Breadcrumb semántico)

### En página de Tour específico
```
Tours / [Categoría] / [Destino] / [Tour Name]
```

### En página de Destino
```
Destinos / [Destino Name]
```

### En página de Actividad
```
Actividades / [Actividad Name]
```

### En página de Blog
```
Blog / [Categoría de Blog] / [Post Name]
```

---

## Navegación en Footer

```
FOOTER
├── Col 1: Destinos
│   ├── Medellín
│   ├── Guatapé
│   ├── Guarne
│   └── San Rafael
│
├── Col 2: Actividades
│   ├── Aventura
│   ├── Naturaleza
│   ├── Cultura
│   └── Familia
│
├── Col 3: Compañía
│   ├── Sobre Nosotros
│   ├── Blog
│   ├── Contacto
│   ├── Aliados
│   └── Trabaja con Nosotros (opcional)
│
├── Col 4: Legal
│   ├── Términos y Condiciones
│   ├── Política de Privacidad
│   ├── Política de Cancelación
│   └── Cookies
│
├── Col 5: Comunidad
│   ├── ✉️ Newsletter
│   ├── 📱 Social Links
│   │   ├── Instagram
│   │   ├── Facebook
│   │   ├── TikTok
│   │   └── YouTube
│   └── 💬 Síguenos
│
└── Bottom: Copyright + Made with ❤️
```

---

## Taxonomía Principal: Tours

Cualquier tour es intersección de:

### 1. **Destino** (Location)
- Medellín (City center + hills)
- Guatapé / Peñol (Lake region)
- Guarne (Flower region)
- San Rafael (Waterfalls)
- Montaña (Highlands)
- Otros Destinos...

**Relación**: 1 tour → 1 destino principal (+ opcionalmente 2-3 destinos visitados)

### 2. **Categoría / Tipo Experiencia** (Activity Type)
- **Aventura**: Paragliding, ATV, Canopy, Rappel, Mountain Biking
- **Naturaleza**: Senderismo, Waterfalls, Avistamiento de Aves, Kayaking
- **Cultura**: Comuna 13, Free Tours, Street Art, Historias
- **Gastronomía**: Café Tours, Farm to Table, Local Food
- **Familia**: Parques, Animales, Educativo
- **Escapadas**: Fin de semana, Relaxing
- **Lujo**: Helicóptero, Private, VIP

**Relación**: 1 tour → 1-3 categorías

### 3. **Duración** (Preclassified für Search)
- Half Day (2-4 horas)
- Full Day (6-8 horas)
- Multi-Day (2-5 días)
- Evening (2-3 horas después de 4pm)

### 4. **Nivel de Dificultad** (Physical Level)
- ⭐ Fácil (sedentario, apto para cualquier edad)
- ⭐⭐ Moderado (cierta actividad, básica forma física)
- ⭐⭐⭐ Difícil (mucha actividad, buen estado físico)
- ⭐⭐⭐⭐ Experto (muy exigente, experiencia requerida)

### 5. **Precio** (Range)
- Budget: $0-50USD
- Mid: $50-150USD
- Premium: $150-300USD
- Luxury: $300+USD

**Relación**: Rango "from" a "to" por tour

### 6. **Grupo / Tamaño** (Audience)
- Individual
- Pareja
- Pequeño Grupo (2-6 pers)
- Grupo Grande (7-20 pers)
- Corporativo

---

## Relaciones de Contenido (Conceptual)

### Tour ↔ Destino
```
1 Tour → 1 Destino Principal
                ↓
         (Browse similar tours destino)
```

### Tour ↔ Categoría
```
1 Tour → 1-3 Categorías
                ↓
         (Browse similar tours categoria)
```

### Tour ↔ Blog
```
M Tours ← → M Blog Posts
(cada blog post puede mencionar varios tours)
(cada tour muestra blog posts related)
```

### Destino ↔ Blog
```
M Destinos ← → M Blog Posts
("Cosas que hacer en Guatapé" ← blogs sobre Guatapé)
```

### Tour ↔ Testimonios
```
1 Tour ← M Testimonios
(cada tour muestra reviews de ese tour)
```

### Operador → Tours
```
1 Operador → M Tours
(multi-operator: cada tour asignado a operador)
```

---

## Taxonomía Secundaria: Blog

### Blog Categories
- Guías de Destino (e.g., "Guía definitiva de Guatapé")
- Consejos y Tips (e.g., "Cómo prepararse para paragliding")
- Historias de Viajeros (e.g., "Mi primer paragliding")
- Tendencias Turísticas (e.g., "Aventura sostenible 2026")
- Seguridad y Políticas (e.g., "Viajar seguro a Medellín")
- Detrás de Escenas (e.g., "Conoce a nuestros guías")

### Blog Tags (Flexible)
- Medellín
- Guatapé
- Aventura
- Familia
- Budget Travel
- Lujo
- etc.

---

## Contenido Transversal

### Global Pages (Singleton)
- **Home**: Página principal comercial
- **Over Us**: Misión, equipo, historia
- **General Contact**: Formulario global
- **Testimonials Wall**: Page con todos los testimonios (opcional)
- **FAQ Global**: Preguntas sobre viaje a Medellín, seguridad, etc.

### SEO Landing Pages (Producidas)
- "Tours en Medellín" (cluster keyword)
- "Mejor Tours Guatapé" (keyword targeting)
- "Aventura en Antioquia" (broad)
- "Tours Paragliding Colombia" (vertical)

---

## Rutas URL (URL Strategy)

### Convención: Semantic URLs + Slug

#### Tours
```
/tours                                  (listado)
/tours/paragliding-medellin              (ficha individual)
/tours?category=aventura                 (filtro)
/tours?destination=guatape               (filtro)
/tours?destination=guatape&category=naturaleza
```

#### Destinos
```
/destinos                               (listado)
/destinos/medellin                      (hub de destino)
/destinos/guatape
/destinos/guarne
```

#### Actividades / Categorías
```
/actividades                            (listado)
/actividades/paragliding                (hub de actividad)
/actividades/senderismo
/actividades/cultura
```

#### Blog
```
/blog                                   (listado)
/blog/guia-definitiva-guatape           (post individual)
/blog?category=guias-destino             (filtro)
/blog?tag=medellin                       (filtro)
```

#### Otros
```
/                                       (home)
/sobre-nosotros                         (about)
/contacto                               (contact)
/faq                                    (faqs)
/admin                                  (admin login)
/admin/dashboard                        (admin dashboard)
/admin/tours                            (admin tours management)
```

---

## SEO Hierarchy & Canonical

### Hierarchy (Para SEO clustering)
```
Tier 1 (Pillar): /tours
Tier 2 (Secondary): /tours/[type], /destinos/[name], /actividades/[type]
Tier 3 (Content): /tours/[specific-tour], /blog/[article]
```

### Canonical Structure
- Cada página tiene canonical único
- `/tours?category=aventura` → NO indexable (param), canonical a `/tours` si es irrelevante
- `/blog/[slug]` → Self-canonical
- Destinos categorizables → Self-canonical

---

## Mobile vs Desktop Navigation

### Desktop (3+ viewport)
- Horizontal nav
- Sidebar filters en listados
- 3-4 col grid para tours
- Desktop-first modals

### Tablet (768px+)
- Hamburger or horizontal nav (depends)
- 2-3 col grid
- Slide-out filters o touch-friendly buttons

### Mobile (<768px)
- Hamburger nav
- Bottom sheet filters
- 1-col stack
- Sticky CTA (WhatsApp, search)
- Tap targets 48px+

---

## Accessibility (WCAG AA)

### Navigation Accessibility
- Skip link to main content
- Semantic HTML: `<nav>`, `<main>`, `<footer>`
- Keyboard navigation completa (Tab order logical)
- ARIA labels donde aplique

### Mobile/Tablet
- Touch targets ≥ 48px × 48px
- Gestures simples (tap, swipe, long-press)
- No hover-only content

---

## Prioridad de Desarrollo

### Fase 1 (MVP)
```
✅ Home
✅ Tours - Listado + Filtros básicos
✅ Tour - Ficha individual
✅ Destinos Hub (opcional - puede ser card en home)
✅ Blog (opcional - puede ser minimal)
✅ Contacto / WhatsApp
✅ Admin - Dashboard + Tours management
```

### Fase 2
```
✅ Destinos - Páginas completas
✅ Actividades - Hub pages
✅ Blog - Articleos estratégicos
✅ Testimonios Wall
✅ Advanced Filters
✅ Analytics
```

### Fase 3+
```
✅ Booking calendar
✅ Personalización
✅ Marketplace multi-operador UI
✅ Newsletter
✅ Partner integrations
```

---

**Última actualización**: Abril 2026
