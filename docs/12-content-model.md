# 12. Content Model

## Objetivo

Definir estructura de datos y metadata para cada tipo de contenido editable. Esto guía el CMS design y editorial workflows.

---

## Tour Content Model

### Campos Requeridos (Obligatorios)

| Campo | Type | Max Length | Notes |
|-------|------|-----------|-------|
| name | String | 100 | "Paragliding Medellín" |
| slug | String (slugified) | 100 | Auto-gen, editable |
| shortDescription | String | 500 | Excerpt para cards |
| fullDescription | Rich Text | 3000 | Emocional + práctico |
| destination | Reference | - | 1 destino |
| categories | Multi-reference | - | 1-3 categorías |
| priceFrom | Decimal | - | USD, e.g., 99.00 |
| duration | String | 50 | "3 hours", "Full Day" |
| durationInHours | Integer | - | Numeric, for filtering |
| difficultyLevel | Integer | - | 1-4 scale |

### Campos Opcionales

| Campo | Type | Notes |
|-------|------|-------|
| priceTo | Decimal | If range pricing |
| videoUrl | String | YouTube/Vimeo URL |
| includedItems | Array of Strings | What's included (repeater) |
| excludedItems | Array of Strings | What's NOT included |
| itinerary | Array of Objects | Time, title, description per step |
| faqs | Array of Objects | Question-answer pairs |
| practicalInfo | Object | Min age, equipment, meeting point, etc. |
| gallery | Array of URLs | 6-20 images |
| reviews | Array of References | Linked testimonials |
| seoTitle | String | 60 chars |
| seoDescription | String | 160 chars |
| featured | Boolean | Highlight in home/listings |

### Validation Rules
- name: Required, unique
- slug: Required, unique, regex: `[a-z0-9-]+`
- priceFrom: Required, > 0
- duration: Required
- destination: Required, must exist
- categories: Required, at least 1
- fullDescription: Required, min 100 chars

### Editorial Workflow
1. **Draft**: Admin crear y guardare
2. **Preview**: Ver cómo se vería en web
3. **Review**: (Optional in V2) otro admin revisa
4. **Publish**: Live en `/tours/:slug`
5. **Unpublish**: Hidden pero no deleted

---

## Destination Content Model

| Campo | Type | Notes |
|-------|------|-------|
| name | String | "Guatapé" |
| slug | String (slugified) | "guatape" |
| description | Rich Text | Long-form, 1000+ words |
| shortDescription | String | 250 chars, excerpt |
| featuredImage | URL | Hero image |
| gallery | Array of URLs | 8-12 images |
| latitude | Decimal | GPS coordinate |
| longitude | Decimal | GPS coordinate |
| city | String | "Guatapé" |
| region | String | "Antioquia" |
| country | String | "Colombia" |
| distanceFromMedellin | Integer | km |
| highlights | Array | "El Peñol", "Embalse", etc. |
| bestTimeToVisit | String | "Dec-Feb" |
| weather | Object | Avg temp, rainfall |
| currency | String | "COP" |
| language | String | "Spanish" |
| visas | String | Entry requirements |
| featured | Boolean | Featured destino |
| toursHere | Multi-reference | Tours en este destino |
| seoTitle | String | 60 chars |
| seoDescription | String | 160 chars |

---

## Blog Post Content Model

| Campo | Type | Notes |
|-------|------|-------|
| title | String | 100 chars max |
| slug | String | Auto-slugified |
| excerpt | String | 160 chars for preview |
| content | Rich Text | 1000-3000 words |
| featuredImage | URL | Hero for post |
| category | Reference | "Guías", "Tips", "Historias" |
| tags | Multi-reference | "Medellín", "Aventura", etc. |
| author | Reference | Link to user |
| publishedAt | DateTime | When live |
| status | Enum | draft \| published |
| readingTime | Integer | Auto-calc (words/200) |
| viewCount | Integer | Analytics |
| relatedTours | Multi-reference | 2-4 tours mentioned |
| seoTitle | String | 60 chars |
| seoDescription | String | 160 chars |
| canonical | URL | For republished content |

### Blog Content Guidelines
- Tone: Conversational, inspiring, informative
- Structure: Intro hook + 3-4 sections + CTA
- Word count: 1000-2000 optimal for SEO
- Images: Every 300 words
- Links: Internal (tours, other posts) + external (credible sources)
- Keywords: Target 1-3 main keywords per post

---

## Testimonial Content Model

| Campo | Type | Notes |
|-------|------|-------|
| name | String | "Diego Pérez" |
| email | String | For verification |
| photo | URL | User photo |
| tourId | Reference | Which tour (optional) |
| rating | Integer | 1-5 stars |
| text | String | 50-500 chars |
| status | Enum | pending \| approved \| rejected |
| featured | Boolean | Highlight on home |
| source | String | web_form \| email \| instagram |
| dateSubmitted | DateTime | Auto |

### Quality Requirements
- Authentic voice (no marketing speak)
- Specific details (tour name, guide name, date)
- Photos preferred over avatars
- Minimum ~30 characters

---

## Page (Static Content) Model

| Campo | Type | Notes |
|-------|------|-------|
| slug | String | "about", "privacidad", "terminos" |
| title | String | "About Us" |
| content | Rich Text | Full page content |
| section | String | about \| legal \| resources |
| published | Boolean | Live/hidden |
| seoTitle | String | 60 chars |
| seoDescription | String | 160 chars |
| updatedAt | DateTime | For "last updated" |

---

## Category Content Model

| Campo | Type | Notes |
|-------|------|-------|
| name | String | "Aventura" |
| slug | String | "aventura" |
| description | String | 200 chars |
| icon | String | "mountain", "leaf", etc. |
| color | String | "#5A7332" (hex) |
| order | Integer | Sort order |

---

## Lead/Inquiry Content Model

| Campo | Type | Notes |
|-------|------|-------|
| firstName | String | "Diego" |
| lastName | String | "Pérez" |
| email | String | "diego@..." |
| phone | String | E.164 format "+57..." |
| whatsapp | String | E.164 format |
| tourId | Reference | Which tour (optional) |
| message | String | User inquiry text |
| source | Enum | web_form \| whatsapp \| email \| direct |
| status | Enum | new \| contacted \| converted \| spam |
| internalNotes | String | Admin notes |
| tagged | Array | For organization |
| respondedAt | DateTime | When admin replied |
| respondedBy | Reference | Which admin user |
| createdAt | DateTime | Auto |

---

## Metadata & SEO Template

Each entity (Tour, Destination, BlogPost) can have:

```json
{
  "metaTitle": "Paragliding Medellín | Tours de Aventura",
  "metaDescription": "Vuela sobre Medellín con nuestro tour certificado. Experiencia segura desde $99...",
  "ogTitle": "Paragliding Medellín",
  "ogDescription": "Paragliding experience in Medellín",
  "ogImage": "tour-image.jpg",
  "canonical": "https://turtle-bus.co/tours/paragliding-medellin",
  "keywords": ["paragliding medellín", "vuelo libre", "aventura"],
  "robots": "index, follow"
}
```

---

## Content Taxonomy

### Categories/Types
- **Aventura**: Paragliding, ATV, Rappel, Canopy
- **Naturaleza**: Senderismo, Waterfalls, Birdwatching, Kayaking
- **Cultura**: Free tours, Street art, History, Comuna 13
- **Gastronomía**: Café tours, Farm to table, Local food
- **Familia**: Parks, Animals, Educational
- **Escapadas**: Weekends, Relaxation
- **Lujo**: Helicopter, Private, VIP

### Blog Categories
- **Guías de Destino**: Deep dives on locations
- **Consejos y Tips**: Practical advice
- **Historias de Viajeros**: User-generated content
- **Tendencias**: Industry insights
- **Seguridad**: Travel safety, Medellín info
- **Detrás de Escenas**: Team stories, guides, culture

### Status Workflow
```
Draft → Preview → Publish → Live
         ↓
      (Reject)
         ↓
       Draft
```

---

## Content Reuse & Relationships

### Tour → Blog linking
- Blog posts can reference tours
- Tour pages show related blog posts
- Bidirectional relationship

### Tour → Destination
- Each tour has 1 primary destination
- Destination can list 20+ tours

### Tour → Category
- Tour → 1-3 categories
- Category → 100+ tours
- Useful for filtering

### Blog Post Tags → Search
- Tags help categorization
- Supports search/filter
- User discovery

---

## Editorial Calendar Planning

### V1 (Month 1-2)
- 5 Pillar blog posts (3000 words each)
- 30-50 tours imported/created
- 4 destination hubs

### V2 (Month 3-4)
- 20 supporting content posts
- 100+ more tours
- Seasonal content calendar

### V3+ (Month 5+)
- User-generated content (reviews, photos)
- Community contributions

---

## Content Approval Workflow

### Admin (Owner) perspective
1. Review draft from editor
2. Suggest changes (comments/notes)
3. Approve or send back for revision
4. Once approved → auto-publish or manual toggle
5. Monitor performance via analytics

---

## Internationalization (i18n) - Future

Current: Spanish (es) only
Future consideration: English (en), Portuguese (pt)

Each content entity will have:
```
content_es: { title: "...", description: "..." }
content_en: { title: "...", description: "..." }
content_pt: { title: "...", description: "..." }
```

URL structure: `/tours/...` (es, default) or `/en/tours/...` (en)

---

**Última actualización**: Abril 2026
