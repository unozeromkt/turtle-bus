# 05. SEO Strategy

## Propósito

Definir arquitectura SEO escalable, estrategia de contenido, keywords, schema markup y ejecución técnica para dominar búsqueda orgánica en turismo Medellín/Guatapé.

---

## Visión SEO

"Ser la referencia #1 en Google para tours, aventura y experiencias en Medellín, Guatapé y Antioquia"

**Indicadores de éxito**:
- 1000+ visitas mensuales orgánicas en V1 (primer trimestre)
- Top 3 posición para 10+ keywords principals
- Top 20 para 50+ keywords secundarias
- 40%+ de todo tráfico desde orgánico en año 1

---

## Keyword Research & Clusters

### Cluster 1: "Tours Medellín" (Alto volumen, media dificultad)

**Pillar Keyword**: `tours medellín`

| Keyword | Vol. Aprox | Dificultad | Intent | URL Destino |
|---------|-----------|-----------|--------|------------|
| tours medellín | 2.9k | M | Commercial | /tours o landing page |
| cosas que hacer en medellín | 1.8k | M | Informativo | /blog/guia-medellin + listing |
| tours medellín adventure | 800 | M | Commercial | /tours + /actividades/aventura |
| medellín viaje turismo | 600 | M | Informativo | /blog |
| best tours medellín | 500 | M | Commercial | /tours page |
| free walking tours medellín | 400 | A | Commercial | /tours?category=cultura |
| medellín paragliding tours | 300 | M | Commercial | /actividades/paragliding |
| medellín atvs adventure | 250 | M | Commercial | /actividades/atv |
| day trips from medellín | 700 | M | Commercial | /destinos |

**Content Strategy**:
- Pillar: `/guia-completa-tours-medellin` (3000 words) + `/tours` listing
- Clusters:
  - `/blog/paragliding-medellin-principiantes`
  - `/blog/mejores-cosas-que-hacer-medellin`
  - `/blog/tours-familia-medellin`
  - `/blog/aventura-adrenalina-medellin-atv-rappel-canopy`

---

### Cluster 2: "Guatapé" (Muy alto volumen, oportunidad grande)

**Pillar Keyword**: `guatapé tours` / `cosas que hacer en guatapé`

| Keyword | Vol. Aprox | Dificultad | Intent | URL Destino |
|---------|-----------|-----------|--------|------------|
| guatapé tours | 1.2k | M | Commercial | /destinos/guatape + /tours?dest=guatape |
| que hacer en guatapé | 1.5k | M | Informativo | /blog/guia-guatape + /destinos/guatape |
| peñol guatapé colombia | 900 | M | Informativo | /destinos/guatape |
| guatapé 1 día itinerario | 600 | M | Informativo | /blog/guatape-1-dia |
| para qué ir a guatapé | 400 | M | Informativo | /destinos/guatape |
| guatapé embalse tours | 300 | M | Commercial | /tours?category=naturaleza |

**Content Strategy**:
- Pillar: `/destinos/guatape` (hub completo)
- `/blog/guatape-en-un-dia-itinerario-completo` (long-form)
- `/blog/por-que-visitar-guatape`
- `/blog/mejor-epoca-visitar-guatape`

---

### Cluster 3: "Aventura / Actividades" (Med-Alto volumen)

**Pillar Keywords**: `paragliding colombia`, `atv tours medellín`, `rappel kandy medellín`

| Keyword | Vol. Aprox | Dificultad | Intent | URL |
|---------|-----------|-----------|--------|-----|
| paragliding medellín | 600 | M | Commercial | /actividades/paragliding + /tours?cat=paragliding |
| paragliding colombia | 1.2k | M | Commercial | /actividades/paragliding + /tours |
| atv tours medellín | 500 | M | Commercial | /actividades/atv |
| rappel medellín | 400 | M | Commercial | /actividades/rappel |
| canopy medellín | 350 | M | Commercial | /actividades/canopy |
| senderismo medellín | 800 | M | Commercial | /actividades/senderismo |
| waterfalls medellín | 500 | M | Commercial | /tours (filter) |

**Content Strategy**:
- `/actividades/paragliding` hub page
- `/actividades/atv` hub page
- `/blog/paragliding-principiantes-guia-seguridad`
- `/blog/aventura-colombia-top-experiencias`

---

### Cluster 4: "Destinos Secundarios"

| Cluster | Keywords | URL Destino |
|---------|----------|------------|
| Guarne | guarne colombian flowers, café tours guarne | /destinos/guarne |
| San Rafael | san rafael waterfalls, cascadas san rafael | /destinos/san-rafael |
| Montaña | trekking antioquia, camping medellín | /actividades/senderismo |
| Medellín | medellín travel guide, commune 13, barrio tours | /blog + /actividades/cultura |

---

### Cluster 5: "Búsquedas Transaccionales" (Highest Convert)

| Keyword | Intent | URL |
|---------|--------|-----|
| book tours medellín | Transaccional | /tours + CTA |
| medellín tour booking | Transaccional | /tours + CTA |
| reserve paragliding now | Transaccional | /tours/paragliding-spec + CTA |
| cheap tours medellín | Comercial | /tours?sort=price_asc |
| luxury medellín experience | Comercial | /tours?category=lujo |

**Estrategia**: Estas URLs deben tener CTA extremadamente clara, testimonios, precio visible.

---

## Estrategia de URL Semántica

### Tours
```
/tours                              (Main listing)
/tours/[tipo]-[destino]            (Specific e.g., /tours/paragliding-medellin)
/tours?category=aventura            (Filtered - NO INDEX, canonical to main)
```

**Razón**: Google entiende semánticamente qué es el tour, es en qué destino, qué categoría.

### Destinos
```
/destinos/[nombre]                 (e.g., /destinos/guatape)
```

### Actividades
```
/actividades/[nombre]              (e.g., /actividades/paragliding)
```

### Blog / Contenido
```
/blog/[tema]-[keywords]            (e.g., /blog/guia-paragliding-medellin-principiantes)
/blog/[tema]                       (e.g., /blog/medellín-guía-viajero)
```

---

## Schema Markup (Structured Data)

### Tour Schema
```json
{
  "@context": "https://schema.org",
  "@type": "ExperienceEvent",
  "name": "Paragliding en Medellín",
  "description": "Vuela sobre la ciudad...",
  "image": "tour-image.jpg",
  "startDate": "2026-04-15T09:00:00",
  "duration": "PT3H",
  "priceCurrency": "USD",
  "price": "99",
  "priceValidUntil": "2026-12-31",
  "location": {
    "@type": "Place",
    "name": "Medellín, Colombia",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CO"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": 45
  },
  "offers": {
    "@type": "Offer",
    "url": "https://turtlebus.co/tours/paragliding",
    "priceCurrency": "USD",
    "price": "99",
    "availability": "InStock",
    "validFrom": "2026-04-01"
  }
}
```

### Destination Schema
```json
{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Guatapé",
  "image": "guatape.jpg",
  "description": "Destino turístico en Antioquia...",
  "url": "https://turtlebus.co/destinos/guatape",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CO",
    "addressRegion": "Antioquia"
  }
}
```

### Review/Rating Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": "Diego Pérez"
  },
  "datePublished": "2026-03-20",
  "description": "Experiencia increíble, recomendado 100%",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "itemReviewed": {
    "@type": "ExperienceEvent",
    "name": "Paragliding en Medellín"
  }
}
```

### FAQPage Schema (Homepage FAQ)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Es seguro viajar a Medellín?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, Medellín es seguro..."
      }
    }
  ]
}
```

---

## Technical SEO Implementation

### Meta Tags (Every Page)
```html
<meta name="title" content="Paragliding Medellín | Tours de Aventura" />
<meta name="description" content="Vuela sobre Medellín con nuestro paragliding tour certificado. Experiencia segura, con guías expertos. Desde $99." />
<meta name="robots" content="index, follow" />
<meta name="language" content="Spanish" />
```

### Open Graph (Social)
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://turtlebus.co/tours/paragliding-medellin" />
<meta property="og:title" content="Paragliding en Medellín" />
<meta property="og:description" content="Vuela sobre la ciudad..." />
<meta property="og:image" content="og-image.jpg" />
```

### sitemap.xml
- Generar sitemap dinámico (tours, destinos, blog)
- Actualizar cada 24h
- SubmARIT a Google Search Console

### robots.txt
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /?*

Sitemap: https://turtlebus.co/sitemap.xml
```

### Canonical Tags
```html
<!-- Tour page -->
<link rel="canonical" href="https://turtlebus.co/tours/paragliding-medellin" />

<!-- Filtered page - canonical to main listing -->
<link rel="canonical" href="https://turtlebus.co/tours" /> <!-- on /tours?category=aventura -->
```

### Mobile Optimization
- Responsive design
- Mobile-friendly testing (Google Mobile Friendly Test)
- Core Web Vitals:
  - LCP: < 2.5s
  - CLS: < 0.1
  - FID: < 100ms

### Image Optimization
- Next-gen formats: WebP + fallback
- Lazy loading
- Alt text: descriptive, include keywords (not keyword stuffing)
- File size: < 100KB para Web

---

## Blog Content Strategy

### Pillar Pages (3-5 por cluster)
- 3000-5000 palabras
- Comprehensive guide
- Links a subpáginas relacionadas
- Updated evergreen

**Ejemplos**:
1. "/blog/guia-definitiva-tours-medellin" → Links a todos nuestros tours
2. "/blog/guatape-todo-lo-que-necesitas-saber" → Hub para Guatapé
3. "/blog/aventura-en-colombia-paragliding-rappel-atv" → Aventura general

### Supporting Content (2-3 por pillar)
- 1000-1500 palabras
- Specific/niche keywords
- Cross-links a pillar y otras supporting

**Ejemplos**:
1. "/blog/paragliding-medellin-principiantes-guia"
2. "/blog/medidas-seguridad-tours-aventura"
3. "/blog/mejor-epoca-visitar-guatape"

### Editorial Calendar (12 meses)
- **Mes 1-2**: Pillar pages (5)
- **Mes 3-6**: Supporting content (15)
- **Mes 7-12**: Seasonal + user-generated + partnerships

---

## Link Building Strategy

### Internal Linking
- Relevant: "/tours/paragliding" links to "/blog/paragliding-guia"
- Anchor text natural: "Paragliding certificado en Medellín" (not "click here")
- Hierarchy: Home → Pillar → Sub → Content

### External Link Acquisition
1. **Partnerships**: Alianzas con blogs de viaje, turismo Colombia
2. **Guest posting**: Escribir en travel blogs acerca de Medellín
3. **Directories**: Listar en directorios turísticos (TripAdvisor, Google My Business)
4. **Press release**: Anunciar novedades turísticas
5. **Local listings**: Asegurar NAP (Name, Address, Phone) consistente

### Backlink Target
- 50+ quality backlinks en primer año
- Domain authority > 20

---

## Local SEO (Google My Business)

### Setup Requerido (V1)
- Google My Business profile
- Nombre: "Turtle Bus - Tours Medellín"
- Categoría: "Tour Operator"
- Descripción: Descriptiva + keywords
- Foto: Professional
- NAP: Consistente en todo el web
- Horarios

### Reviews Management
- Encourage 1-2 reviews/semana
- Respond a todos los reviews (positive + negative)
- Use review schema

---

## Performance Metrics & Monitoring

### Tools to Implement
1. **Google Analytics 4**: Tráfico, comportamiento, conversions
2. **Google Search Console**: Keywords, indexación, errors
3. **Google Page Speed Insights**: Performance, Core Web Vitals
4. **Ahrefs/SEMrush**: Competitor analysis, keyword tracking (optional)
5. **Heat maps**: User behavior (Hotjar/Microsoft Clarity)

### KPIs to Track (Monthly)
- Organic traffic (sessions)
- Keywords ranking (top 3 / top 10)
- CTR from SERPs
- Conversions from organic
- Pages indexed
- Crawl errors

### Targets (First Year)
- Month 1-3: 100-300 organic sessions/mes
- Month 4-6: 500-1000 sessions/mes
- Month 7-12: 1000+ sessions/mes

---

## SEO Roadmap

### Phase 1 (Weeks 1-4)
- ✅ Keyword research + clusters definition
- ✅ Site structure setup (URLs, navigation)
- ✅ Schema markup implementation
- ✅ robots.txt + sitemap
- ✅ Core Web Vitals optimization

### Phase 2 (Weeks 5-12)
- ✅ Pillar page blog content (5 articles)
- ✅ Meta tags for all pages
- ✅ Internal linking structure
- ✅ Google Search Console setup
- ✅ Google My Business optimization

### Phase 3 (Weeks 13-26)
- ✅ Supporting blog content (10+ articles)
- ✅ Link building outreach
- ✅ Local SEO optimization
- ✅ Review generation campaign
- ✅ Analytics dashboard setup

### Phase 4 (Month 7-12)
- ✅ Seasonal content updates
- ✅ New destination/activity pages
- ✅ Competitor analysis + adjustments
- ✅ User behavior optimization
- ✅ Rankings + traffic optimization

---

## Anti-patterns to Avoid

❌ **Keyword stuffing**: "Tours medellín medellín tours medellín..."
❌ **Thin content**: Páginas <300 words sin valor
❌ **Duplicate content**: Misma descripción para todos los tours
❌ **Hidden text**: Keywords ocultos o muy pequeños
❌ **Cloaking**: Contenido diferente para Google vs usuarios
❌ **Private link networks**: Comprar backlinks
❌ **Slow mobile**: Core Web Vitals > threshold
❌ **Broken links**: Links que llevan a 404

---

## Competitive Analysis

### Top Competitors (Estimated)
1. **Guatape.travel**: Authority alta, buenos rankings
2. **Viator**: Massive, aggregator, hard to beat directly
3. **Booking.com experiences**: Integración con hospedaje
4. **Local operators**: Sin web strong, es oportunidad

### Our SEO Advantage
- Local expertise + passion
- Niche focus (not general travel)
- Regular blog + content
- Mobile-optimized
- IA-ready architecture future

---

**Última actualización**: Abril 2026
