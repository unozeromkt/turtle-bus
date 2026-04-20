# 07. Database Schema

## Objetivo

Definir modelo de datos escalable para turismo. Diseño normalizadopero flexible para soportar: tours, destinos, categorías, operadores, leads, blog, admin, SEO y futuras extensiones (booking, pagos, IA).

**Base de Datos**: PostgreSQL
**ORM**: Prisma
**Filosofía**: Normalized core + JSON flexibility para future extensibility

---

## Entidades Principales

### 1. Users (Usuarios del Admin)

```sql
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       VARCHAR(255) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,  -- bcrypt hashed
  firstName   VARCHAR(100),
  lastName    VARCHAR(100),
  phone       VARCHAR(20),
  role        enum ('owner', 'admin', 'editor', 'support') DEFAULT 'support',
  isActive    BOOLEAN DEFAULT TRUE,
  lastLogin   TIMESTAMP,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt   TIMESTAMP NULL  -- soft delete
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

---

### 2. Operators (Operadores Turísticos)

```sql
CREATE TABLE operators (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  slug        VARCHAR(255) NOT NULL UNIQUE,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(20),
  whatsapp    VARCHAR(20),
  website     VARCHAR(255),
  description TEXT,
  location    VARCHAR(255),  -- City, address

  -- Branding
  logo        VARCHAR(255),  -- URL to S3/Cloudinary
  photo       VARCHAR(255),

  -- Contact
  address     VARCHAR(255),
  city        VARCHAR(100),
  country     VARCHAR(100) DEFAULT 'Colombia',

  -- Verification
  isVerified  BOOLEAN DEFAULT FALSE,
  certifications TEXT,  -- JSON array of certifications
  rating      DECIMAL(3, 2),  -- 0.00 - 5.00
  totalReviews INT DEFAULT 0,

  -- Admin
  isActive    BOOLEAN DEFAULT TRUE,
  adminUserId UUID REFERENCES users(id) ON DELETE SET NULL,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt   TIMESTAMP NULL
);

CREATE INDEX idx_operators_slug ON operators(slug);
CREATE INDEX idx_operators_verified ON operators(isVerified);
```

---

### 3. Categories (Categorías de Actividades)

```sql
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL UNIQUE,
  slug        VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon        VARCHAR(100),  -- e.g., "hiking", "paragliding"
  color       VARCHAR(7),    -- e.g., "#5A7332"
  order       INT DEFAULT 0, -- for sorting

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_slug ON categories(slug);
```

---

### 4. Destinations (Destinos)

```sql
CREATE TABLE destinations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL UNIQUE,
  slug        VARCHAR(255) NOT NULL UNIQUE,

  -- Content
  description TEXT,           -- Long description
  shortDescription VARCHAR(500),

  -- Media
  featuredImage VARCHAR(255), -- URL to S3
  galleryImages TEXT,         -- JSON array of image URLs

  -- Location
  latitude    DECIMAL(10, 8),
  longitude   DECIMAL(11, 8),
  city        VARCHAR(100),
  region      VARCHAR(100),   -- Antioquia, etc.
  country     VARCHAR(100) DEFAULT 'Colombia',
  distanceFromMedellin INT,   -- km

  -- SEO
  metaTitle   VARCHAR(255),
  metaDescription VARCHAR(500),
  keywords    TEXT,           -- JSON array

  -- Admin
  isPublished BOOLEAN DEFAULT TRUE,
  order       INT DEFAULT 0,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt   TIMESTAMP NULL
);

CREATE INDEX idx_destinations_slug ON destinations(slug);
CREATE INDEX idx_destinations_published ON destinations(isPublished);
```

---

### 5. Tours (Tours Principales)

```sql
CREATE TABLE tours (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  slug        VARCHAR(255) NOT NULL UNIQUE,

  -- Categorization
  destinationId UUID NOT NULL REFERENCES destinations(id),
  operatorId  UUID NOT NULL REFERENCES operators(id),

  -- Content
  shortDescription VARCHAR(500) NOT NULL,
  fullDescription TEXT,

  -- Duration & Logistics
  durationInHours INT NOT NULL,
  durationDisplay VARCHAR(50), -- e.g., "3 hours", "Full Day", "2 Days"
  startTime   TIME,             -- e.g., 09:00 AM
  endTime     TIME,

  -- Pricing
  priceFrom   DECIMAL(10, 2) NOT NULL,
  priceTo     DECIMAL(10, 2),
  currency    VARCHAR(3) DEFAULT 'USD',
  pricing     JSONB,            -- For complex pricing (by date, season, etc.)

  -- Difficulty & Audience
  difficultyLevel INT DEFAULT 1, -- 1=Easy, 2=Moderate, 3=Difficult, 4=Expert
  minAge      INT,
  maxAge      INT,
  audienceType TEXT,            -- JSON array: "individual", "couples", "families"

  -- Media
  featuredImage VARCHAR(255),
  galleryImages TEXT,           -- JSON array of image URLs
  videoUrl    VARCHAR(255),     -- YouTube/Vimeo URL

  -- Practical Info
  equipmentRequired TEXT,       -- JSON array
  meetingPoint VARCHAR(255),
  cancellationPolicy VARCHAR(255),
  restrictions TEXT,

  -- SEO
  metaTitle   VARCHAR(255),
  metaDescription VARCHAR(500),
  keywords    TEXT,             -- JSON array
  canonical   VARCHAR(255),

  -- Status
  isPublished BOOLEAN DEFAULT FALSE,
  isDraft     BOOLEAN DEFAULT TRUE,
  isFeatured  BOOLEAN DEFAULT FALSE,
  isArchived  BOOLEAN DEFAULT FALSE,
  viewOrder   INT DEFAULT 0,    -- Manual ordering

  -- Stats
  viewCount   INT DEFAULT 0,
  leadCount   INT DEFAULT 0,
  rating      DECIMAL(3, 2),    -- 0.00 - 5.00
  totalReviews INT DEFAULT 0,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt   TIMESTAMP NULL
);

CREATE INDEX idx_tours_slug ON tours(slug);
CREATE INDEX idx_tours_destination ON tours(destinationId);
CREATE INDEX idx_tours_operator ON tours(operatorId);
CREATE INDEX idx_tours_published ON tours(isPublished);
CREATE INDEX idx_tours_featured ON tours(isFeatured);
CREATE UNIQUE INDEX idx_tours_published_slug ON tours(slug, isPublished);
```

---

### 6. TourCategories (Junction: Tours ←→ Categories)

```sql
CREATE TABLE tourCategories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tourId      UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  categoryId  UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  order       INT DEFAULT 0,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_tour_category_unique ON tourCategories(tourId, categoryId);
CREATE INDEX idx_tour_categories_tour ON tourCategories(tourId);
CREATE INDEX idx_tour_categories_category ON tourCategories(categoryId);
```

---

### 7. TourItineraryItems (Itinerario de Tours)

```sql
CREATE TABLE tourItineraryItems (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tourId      UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,

  stepNumber  INT NOT NULL,
  time        TIME,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  order       INT DEFAULT stepNumber,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_itinerary_tour ON tourItineraryItems(tourId);
CREATE INDEX idx_itinerary_step ON tourItineraryItems(tourId, stepNumber);
```

---

### 8. TourInclusions & TourExclusions

```sql
CREATE TABLE tourInclusions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tourId      UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  item        VARCHAR(255) NOT NULL,
  order       INT DEFAULT 0,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inclusions_tour ON tourInclusions(tourId);

CREATE TABLE tourExclusions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tourId      UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  item        VARCHAR(255) NOT NULL,
  order       INT DEFAULT 0,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exclusions_tour ON tourExclusions(tourId);
```

---

### 9. TourFAQs

```sql
CREATE TABLE tourFAQs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tourId      UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,

  question    VARCHAR(500) NOT NULL,
  answer      TEXT NOT NULL,
  order       INT DEFAULT 0,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_faqs_tour ON tourFAQs(tourId);
```

---

### 10. Testimonials (Reviews)

```sql
CREATE TABLE testimonials (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tourId      UUID NOT NULL REFERENCES tours(id) ON DELETE SET NULL,

  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255),
  photo       VARCHAR(255),

  rating      INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text        TEXT NOT NULL,

  isFeatured  BOOLEAN DEFAULT FALSE,
  isApproved  BOOLEAN DEFAULT FALSE,
  isPending   BOOLEAN DEFAULT TRUE,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt   TIMESTAMP NULL
);

CREATE INDEX idx_testimonials_tour ON testimonials(tourId);
CREATE INDEX idx_testimonials_approved ON testimonials(isApproved);
CREATE INDEX idx_testimonials_featured ON testimonials(isFeatured);
```

---

### 11. BlogPosts

```sql
CREATE TABLE blogPosts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       VARCHAR(255) NOT NULL,
  slug        VARCHAR(255) NOT NULL UNIQUE,

  excerpt     VARCHAR(500),
  content     TEXT NOT NULL,           -- Rich text (Markdown/HTML)

  featuredImage VARCHAR(255),

  authorId    UUID REFERENCES users(id),
  authorName  VARCHAR(255),

  -- SEO
  metaTitle   VARCHAR(255),
  metaDescription VARCHAR(500),
  keywords    TEXT,                    -- JSON array
  canonical   VARCHAR(255),

  -- Content Org
  isPublished BOOLEAN DEFAULT FALSE,
  publishedAt TIMESTAMP,

  viewCount   INT DEFAULT 0,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt   TIMESTAMP NULL
);

CREATE INDEX idx_blog_slug ON blogPosts(slug);
CREATE INDEX idx_blog_published ON blogPosts(isPublished);
CREATE INDEX idx_blog_author ON blogPosts(authorId);
```

---

### 12. BlogCategories & BlogTags

```sql
CREATE TABLE blogCategories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL UNIQUE,
  slug        VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blogTags (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL UNIQUE,
  slug        VARCHAR(100) NOT NULL UNIQUE,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blogPostCategories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  postId      UUID NOT NULL REFERENCES blogPosts(id) ON DELETE CASCADE,
  categoryId  UUID NOT NULL REFERENCES blogCategories(id) ON DELETE CASCADE,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blogPostTags (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  postId      UUID NOT NULL REFERENCES blogPosts(id) ON DELETE CASCADE,
  tagId       UUID NOT NULL REFERENCES blogTags(id) ON DELETE CASCADE,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 13. Leads / Inquiry Contacts

```sql
CREATE TABLE leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  firstName   VARCHAR(255) NOT NULL,
  lastName    VARCHAR(255),
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(20),
  whatsapp    VARCHAR(20),

  tourId      UUID REFERENCES tours(id) ON DELETE SET NULL,

  message     TEXT,

  -- Lead Info
  source      enum ('web_form', 'whatsapp', 'email', 'direct', 'other') DEFAULT 'web_form',
  status      enum ('new', 'contacted', 'converted', 'spam', 'archived') DEFAULT 'new',

  -- Internal notes
  internalNotes TEXT,
  respondedAt TIMESTAMP,
  respondedBy UUID REFERENCES users(id),

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt   TIMESTAMP NULL
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_tour ON leads(tourId);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created ON leads(createdAt DESC);
```

---

### 14. FAQ Global

```sql
CREATE TABLE globalFAQs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question    VARCHAR(500) NOT NULL,
  answer      TEXT NOT NULL,
  category    VARCHAR(100),  -- e.g., "Safety", "Booking", "Cancellation"
  order       INT DEFAULT 0,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_faq_category ON globalFAQs(category);
```

---

### 15. Pages (Contenido Estático)

```sql
CREATE TABLE pages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        VARCHAR(255) NOT NULL UNIQUE,
  title       VARCHAR(255) NOT NULL,
  content     TEXT,

  metaTitle   VARCHAR(255),
  metaDescription VARCHAR(500),

  isPublished BOOLEAN DEFAULT TRUE,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pages_slug ON pages(slug);
```

---

### 16. SiteSettings (Configuración Global)

```sql
CREATE TABLE siteSettings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key         VARCHAR(255) NOT NULL UNIQUE,
  value       TEXT,
  type        enum ('string', 'number', 'boolean', 'json') DEFAULT 'string',

  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Examples:
-- key: 'site_title', value: 'Turtle Bus - Tours Medellín'
-- key: 'brand_primary_color', value: '#5A7332'
-- key: 'google_analytics_id', value: 'G-XXXXX'
-- key: 'meta_pixel_id', value: '123456789'
```

---

### 17. Redirects (SEO)

```sql
CREATE TABLE redirects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fromUrl     VARCHAR(255) NOT NULL UNIQUE,
  toUrl       VARCHAR(255) NOT NULL,
  statusCode  INT DEFAULT 301,  -- 301 (permanent), 302 (temporary)
  isActive    BOOLEAN DEFAULT TRUE,

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_redirects_from ON redirects(fromUrl);
```

---

### 18. SEOMetadata (Dynamic SEO per Tour/Dest)

```sql
CREATE TABLE seoMetadata (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entityType  enum ('tour', 'destination', 'blog_post', 'category') NOT NULL,
  entityId    UUID NOT NULL,

  metaTitle   VARCHAR(255),
  metaDescription VARCHAR(500),
  ogTitle     VARCHAR(255),
  ogDescription VARCHAR(500),
  ogImage     VARCHAR(255),

  canonical   VARCHAR(255),

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_seo_metadata_entity ON seoMetadata(entityType, entityId);
```

---

### 19. MediaAssets (Media Registry)

```sql
CREATE TABLE mediaAssets (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  fileName    VARCHAR(255) NOT NULL,
  fileUrl     VARCHAR(255) NOT NULL,
  fileType    VARCHAR(50),  -- image, video
  fileSize    INT,          -- bytes

  uploadedBy  UUID REFERENCES users(id),

  -- Link to entities
  tourId      UUID REFERENCES tours(id),
  destinationId UUID REFERENCES destinations(id),
  postId      UUID REFERENCES blogPosts(id),

  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_media_tour ON mediaAssets(tourId);
CREATE INDEX idx_media_destination ON mediaAssets(destinationId);
CREATE INDEX idx_media_post ON mediaAssets(postId);
```

---

## Relationships Diagram (Conceptual)

```
Users (1) ←→ (M) Operators
              ↓
        → Tours ←→ (M) Categories
              ↓
        → TourItineraryItems
        → TourInclusions/Exclusions
        → TourFAQs
        → Testimonials
              ↓
Destinations ←→ (M) Tours

BlogPosts ←→ BlogCategories
         ←→ BlogTags

Leads → Tours (optional)
     → Users (respondedBy)

SiteSettings (global)
Redirects (global)
Pages (global)
GlobalFAQs (global)
```

---

## Indexes Strategy

### Query Performance
- **Tours Listing**: `(destinationId, isPublished, isFeatured, createdAt)`
- **Lead Reporting**: `(status, createdAt, tourId)`
- **Blog Search**: `(isPublished, createdAt, slug)`

### Full-Text Search (Optional - V2)
```sql
ALTER TABLE tours ADD COLUMN searchVector tsvector;

CREATE INDEX idx_tours_search ON tours USING gin(searchVector);

-- Update trigger on tours INSERT/UPDATE to maintain searchVector
```

---

## Soft Deletes Strategy

Entidades con `deletedAt`:
- `users`, `tours`, `destinations`, `pages`, `leads`, `testimonials`

Queries siempre filtran: `WHERE deletedAt IS NULL`

Reasoning: Audit trail, recovery, GDPR compliance partial.

---

## Scalability Considerations

### Partitioning (Future - V2+)
- `leads` tabla puede particionarse por `createdAt` (monthly)
- `tourItineraryItems` si tours escalan mucho

### Denormalization (Future)
- `tours.viewCount`, `tours.leadCount` → cache updates
- `operators.rating` → rolled up from testimonials

### Caching Layer (Future)
- Redis cache for: Popular tours, Destinations, Categories
- TTL: 1 hour for dynamic data

---

## Data Integrity Constraints

```sql
-- Tours must have valid destination
ALTER TABLE tours
ADD CONSTRAINT fk_tours_destination
FOREIGN KEY (destinationId) REFERENCES destinations(id);

-- Rating constraints
ALTER TABLE tours
ADD CONSTRAINT check_tour_rating
CHECK (rating IS NULL OR (rating >= 0 AND rating <= 5));

ALTER TABLE testimonials
ADD CONSTRAINT check_testimonial_rating
CHECK (rating >= 1 AND rating <= 5);

-- Lead status transition rules (optional, can be in app logic)
-- Only "new" → "contacted" → "converted" or "spam"
```

---

## Sample Seeding Data (V1)

Essential initial data:
- 3 Categories: Aventura, Naturaleza, Cultura
- 4 Destinations: Medellín, Guatapé, Guarne, San Rafael
- 1 "Demo" Operator
- 5 Sample Tours (1-2 per destination)
- Site settings (nav, contact info)

---

## Migration Strategy

Using **Prisma Migrations**:
```
prisma migrate dev --name initial_schema
prisma migrate deploy (production)
```

Zero-downtime migrations:
- Adding columns: safe (with defaults)
- Removing columns: 2-step (hide in app → migrate → confirm)
- Renaming: manual step needed

---

**Última actualización**: Abril 2026
