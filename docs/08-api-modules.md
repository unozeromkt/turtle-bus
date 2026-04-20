# 08. API Modules & Endpoints

## Objetivo

Definir arquitectura backend, módulos API, endpoints conceptuales y servicios comunes. **No es implementación** - es especificación de qué debe existir.

**Arquitectura**: Next.js API Routes + Middleware + Services Layer
**Base URL**: `https://api.turtle-bus.co/` (o `/api` en mismo dominio)

---

## Capas Arquitectónicas

```
┌─────────────────────────────┐
│   Frontend / Client Apps    │
└────────────┬────────────────┘
             │
┌────────────▼────────────────┐
│   API Routes (Next.js)      │  ← Auth, validation, response
├─────────────────────────────┤
│   Middleware Layer          │  ← CORS, logging, error handling
├─────────────────────────────┤
│   Service Layer             │  ← Business logic, external APIs
├─────────────────────────────┤
│   ORM Layer (Prisma)        │  ← Database query abstraction
├─────────────────────────────┤
│   PostgreSQL Database       │
└─────────────────────────────┘

Utils:
├─ Auth (NextAuth.js)
├─ Email (Resend)
├─ Storage (Cloudinary)
├─ Maps (Google Maps API)
└─ Analytics (GA4, Meta Pixel)
```

---

## Módulos Principales

### Módulo 1: Autenticación (Auth)

**Responsabilidad**: Login, logout, sessions, roles, permisos

**Endpoints**:
```
POST   /api/auth/login              (email, password)
POST   /api/auth/logout             (no params)
POST   /api/auth/refresh-token      (refresh_token)
POST   /api/auth/forgot-password    (email)
POST   /api/auth/reset-password     (token, newPassword)
GET    /api/auth/me                 (protected) → Current user profile
PATCH  /api/auth/me                 (protected) → Update profile
POST   /api/auth/change-password    (protected) → oldPassword, newPassword
```

**Service**: AuthService
- `login(email, password)` → returns JWT token + user
- `validateSession(token)` → returns user or null
- `generateRefreshToken()` → long-lived token
- `hashPassword()`, `verifyPassword()` → bcrypt
- `setRole(userId, role)` → admin action

**Middleware**:
```typescript
const authenticate = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  const user = validateSession(token);
  if (!user) throw UnauthorizedError();
  req.user = user;
};
```

---

### Módulo 2: Tours

**Responsabilidad**: CRUD tours, listado con filtros, búsqueda

**Endpoints**:
```
GET    /api/tours                  (filter, sort, pagination)
GET    /api/tours/:id              (tour detail)
GET    /api/tours/:slug            (by slug - public)
POST   /api/tours                  (protected, admin) → Create
PATCH  /api/tours/:id              (protected, admin) → Update
DELETE /api/tours/:id              (protected, admin) → Delete

GET    /api/tours/:id/reviews      → Get reviews
POST   /api/tours/:id/reviews      → Submit review (no auth required)
GET    /api/tours/:id/related      → Related tours (similar category/dest)
```

**Query Parameters (for GET list)**:
```
?destination=guatape
?category=aventura
?priceMax=200
?difficulty=2
?duration=full-day
?sort=popular|newest|price_asc|price_desc
?page=1&limit=20
```

**Response Format**:
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Paragliding Medellín",
      "slug": "paragliding-medellin",
      "destination": { "id", "name", "slug" },
      "categories": [{ "id", "name", "icon" }],
      "priceFrom": 99,
      "priceTo": 199,
      "duration": "3 hours",
      "difficulty": 2,
      "rating": 4.8,
      "reviews": 45,
      "featured": true,
      "image": "url...",
      "operator": { "id", "name", "rating" }
    }
  ],
  "meta": {
    "total": 234,
    "page": 1,
    "limit": 20,
    "pages": 12
  }
}
```

**Service**: TourService
- `getTours(filters)` → paginated list
- `getTourById(id)` → single tour with relations
- `getTourBySlug(slug)` → public lookup
- `createTour(data)` → CMS create
- `updateTour(id, data)` → CMS update
- `deleteTour(id)` → soft delete
- `getRelatedTours(tourId)` → recommendations

---

### Módulo 3: Destinations

**Endpoints**:
```
GET    /api/destinations               (list)
GET    /api/destinations/:id           (detail)
GET    /api/destinations/:slug         (by slug)
GET    /api/destinations/:id/tours     (tours in destination)
PATCH  /api/destinations/:id           (protected, admin)
```

**Service**: DestinationService
- `getDestinations()` → all
- `getDestinationBySlug(slug)` → single
- `getToursInDestination(destId)` → filtered tours

---

### Módulo 4: Leads / Inquiries

**Endpoints**:
```
POST   /api/leads                  (public) → Submit inquiry
GET    /api/leads                  (protected, admin) → List all
GET    /api/leads/:id              (protected, admin) → Detail
PATCH  /api/leads/:id              (protected, admin) → Update status
DELETE /api/leads/:id              (protected, admin) → Delete
GET    /api/leads/export/csv       (protected, admin) → Export
```

**Request Body** (POST /api/leads):
```json
{
  "firstName": "Diego",
  "lastName": "Pérez",
  "email": "diego@email.com",
  "phone": "+573001234567",
  "tourId": "tour-uuid",
  "message": "Quiero información sobre...",
  "source": "web_form"
}
```

**Service**: LeadService
- `createLead(data)` → new inquiry
- `getLeads(filters)` → admin list
- `updateLeadStatus(id, status)` → new→contacted→converted
- `sendAutoReply(leadId)` → Email + WhatsApp
- `exportToCSV()` → CSV generation

---

### Módulo 5: Blog Posts

**Endpoints**:
```
GET    /api/blog                  (list, paginated)
GET    /api/blog/:id              (detail)
GET    /api/blog/:slug            (by slug)
GET    /api/blog/category/:cat    (by category)
POST   /api/blog                  (protected, admin)
PATCH  /api/blog/:id              (protected, admin)
DELETE /api/blog/:id              (protected, admin)
```

**Service**: BlogService
- `getBlogPosts(filters)` → paginated
- `getBlogPostBySlug(slug)` → single
- `createPost(data)` → CMS
- `updatePost(id, data)` → CMS

---

### Módulo 6: Testimonials / Reviews

**Endpoints**:
```
GET    /api/testimonials           (list, published only)
GET    /api/testimonials/:tourId   (by tour)
POST   /api/testimonials           (public) → Submit review
GET    /api/testimonials/pending   (protected, admin)
PATCH  /api/testimonials/:id       (protected, admin) → Approve/Reject
```

**Service**: TestimonialService
- `getTestimonials(filters)` → public
- `submitTestimonial(data)` → public submit
- `approveTestimonial(id)` → admin action
- `updateRating(tourId)` → recalculate aggregate

---

### Módulo 7: Admin Management

**Usuarios**:
```
GET    /api/admin/users            (protected, owner)
POST   /api/admin/users            (protected, owner) → Invite
PATCH  /api/admin/users/:id        (protected, owner) → Change role
DELETE /api/admin/users/:id        (protected, owner) → Deactivate
```

**Configuración del Sitio**:
```
GET    /api/admin/settings         (protected, admin)
PATCH  /api/admin/settings         (protected, owner) → Update settings
```

**Servicios**: UserService, SettingsService

---

### Módulo 8: Upload Media

**Endpoints**:
```
POST   /api/media/upload           (protected) → Upload image/video
DELETE /api/media/:id              (protected) → Delete file
GET    /api/media/:id              (public) → Serve file
```

**Service**: MediaService (Cloudinary integration)
- `uploadImage(file)` → returns URL
- `deleteImage(url)` → cleanup
- `transformImage(url, params)` → resize, optimize

---

### Módulo 9: Search & Filter

**Endpoints**:
```
GET    /api/search                 (q="paragliding", type=tours|blog|all)
GET    /api/filters/available      (get available filter options)
```

**Service**: SearchService
- `search(query, type)` → across tours, blog
- `autocomplete(query)` → for search input
- `getAvailableFilters()` → categories, destinations, price ranges

---

### Módulo 10: Analytics / Stats (V2)

**Endpoints**:
```
GET    /api/analytics/dashboard    (protected, admin)
GET    /api/analytics/tours        (protected, admin)
GET    /api/analytics/leads        (protected, admin)
GET    /api/analytics/traffic      (protected, admin)
```

**Service**: AnalyticsService
- Track: page views, CTA clicks, conversions
- Report: KPIs, trends, comparisons

---

### Módulo 11: SEO

**Endpoints**:
```
GET    /.well-known/sitemap.xml    (public)
GET    /robots.txt                 (public)
GET    /api/seo/metadata/:type/:id (public) → Get structured data
```

**Service**: SEOService
- `generateSitemap()` → XML
- `generateRobots()` → robots.txt
- `generateSchema(entity)` → JSON-LD

---

### Módulo 12: Email Notifications

**Service**: EmailService (Resend)
- `sendLeadConfirmation(lead)` → To lead
- `sendLeadAlert(lead)` → To admin
- `sendNewsletter(content)` → Batch
- `sendAutoReply(lead)` → Template-based

---

### Módulo 13: WhatsApp Integration (V2)

**Service**: WhatsAppService
- `sendMessage(phone, message)` → via Meta API
- `getStatus(messageId)` → delivery status
- `handleIncomingWebhook(payload)` → process replies

---

## Error Handling & Responses

**Standard Response Format**:
```json
{
  "success": true,
  "data": [...],
  "error": null
}
```

**Error Response**:
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": { "field": "email" }
  }
}
```

**HTTP Status Codes**:
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

---

## Rate Limiting

```
- Public endpoints: 100 requests/hour per IP
- Authenticated: 1000 requests/hour per user
- Admin: unlimited (optional)
```

---

## Versioning Strategy

Future compatibility:
```
/api/v1/tours
/api/v2/tours     (new logic, schema)
```

---

## Documentation

Auto-generated OpenAPI/Swagger docs at `/api-docs`

---

**Última actualización**: Abril 2026
