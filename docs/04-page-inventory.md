# 04. Page Inventory - V1

## Objetivo

Inventario completo de páginas requeridas para V1 (MVP comercial). Cada página incluye:
- Objetivo de negocio
- Componentes principales
- Prioridad de desarrollo
- Estimado de complejidad

---

## Leyenda de Prioridad

- 🔴 **P0**: Crítica para lanzamiento
- 🟠 **P1**: Importante, pocas semanas después de P0
- 🟡 **P2**: Importante para V1 pero puede esperar
- 🔵 **P3**: Nice to have, considera V2

---

## Páginas Públicas (Site)

### 1. Home / Landing Page (/)

**Prioridad**: 🔴 P0
**Tipo**: Marketing + Catálogo
**Objetivo**: Inspirar, convertir leads, mostrar oferta

**Componentes**:
- Hero: Imagen full-width + headline emocional + CTA principal
- Hero CTA: "Explorar Tours" + "Consultar en WhatsApp"
- Sección: "Explora por experiencia" (3-4 cards de categorías)
- Sección: "Tours Destacados" (grid 3-4 tours con slider mobile)
- Sección: "Destinos Principales" (Medellín, Guatapé, Guarne, etc.)
- Sección: "Testimonios" (5 cards de reviews con ratings)
- Sección: "¿Por qué elegirnos?" (3-4 value props)
- Sección: "Blog Destacado" (3 artículos preview)
- Sección: "FAQ Rápidas" (4 accordion items)
- Newsletter Signup
- CTA Sticky Bottom: "Consultar Disponibilidad" (mobile)

**Wireframe Conceptual**:
```
[Hero + CTA]
[Categorías]
[Tours Destacados]
[Destinos]
[Testimonios]
[Why Us]
[Blog]
[FAQ]
[Newsletter]
[CTA Sticky]
[Footer]
```

**Complejidad**: Media (múltiples componentes, datos dinámicos)
**Dependencias**: Tours, Testimonios, Blog, Destinos

---

### 2. Tours - Listado (/tours)

**Prioridad**: 🔴 P0
**Tipo**: Catálogo
**Objetivo**: Permitir exploración y filtrado de tours

**Componentes**:
- Header: "Todos nuestros tours"
- Search Bar: Búsqueda por nombre
- Filtros (Sidebar o bottom-sheet mobile):
  - Destino (checkboxes)
  - Categoría (checkboxes)
  - Precio (range slider)
  - Duración (checkboxes)
  - Dificultad (buttons)
- Sort Dropdown: Relevancia, Precio (asc/desc), Popular, Nuevos
- Results Grid: 3 col desktop, 2 col tablet, 1 col mobile
- Tour Card (minimal): Imagen, nombre, "from" precio, duración, star rating, CTA
- Pagination o Infinite scroll
- No Results State: "No encontramos tours, intenta otros filtros" + recomendaciones

**Wireframe Conceptual**:
```
[Header + Search]
[Filtros]              [Resultados Grid]
├─ Destino            ├─ Tour Card 1
├─ Categoría          ├─ Tour Card 2
├─ Precio             ├─ Tour Card 3
├─ Duración           ├─ Tour Card 4
└─ Dificultad         └─ ...
[Pagination]
```

**Complejidad**: Media-Alta (filtros, sorting, performance con M resultados)
**Dependencias**: Tours DB, Search/Filter logic

---

### 3. Tour - Ficha Individual (/tours/:slug)

**Prioridad**: 🔴 P0
**Tipo**: Producto
**Objetivo**: Convertir visitante en lead

**Componentes**:
- Breadcrumb: Tours > [Categoría] > [Tour Name]
- Galería: Carousel de 6-12 fotos + thumbnails
- Tour Header Card:
  - Nombre
  - Star rating + número de reviews
  - "from" Precio
  - Duración
  - Ubicación / Destino
  - Nivel de dificultad
- Descripción: Headline emocional + párrafos informativos
- Sección: "Itinerario" (accordion o timeline)
- Sección: "Incluye / No Incluye" (2 listas)
- Sección: "Información Práctica"
  - Equipo necesario
  - Edad recomendada
  - Horarios
  - Punto de encuentro
  - Cancelación
- Mapa: Google Maps con ubicación
- Sección: "Preguntas Frecuentes" (accordion tour-specific + FAQs globales)
- Sección: "Reviews" (grid de testimonios)
- Sección: "Tours Relacionados" (3-4 tours similares)
- CTA Sticky: "Consultar en WhatsApp" + Formulario rápido
- Formulario de Contacto: Nombre, Email, Tel, Mensaje, WhatsApp checkbox

**Wireframe Conceptual**:
```
[Breadcrumb]
[Galería]           [Tour Header + CTA]
├─ Main Image       ├─ Nombre, Rating
├─ Thumbnails       ├─ $Precio, Duración
└─ Lightbox         ├─ Button: Consultar
                    └─ Button: Compartir
[Descripción]
[Itinerario]
[Incluye/No Incluye]
[Info Práctica]
[Mapa]
[FAQs]
[Reviews]
[Tours Relacionados]
[Formulario Contact]
[CTA Sticky]
```

**Complejidad**: Alta (múltiples componentes, galería, mapa, formulario, dinamismo)
**Dependencias**: Tour data, Reviews, Related tours logic, Maps API

---

### 4. Destinos - Listado (/destinos)

**Prioridad**: 🟠 P1
**Tipo**: Catálogo
**Objetivo**: Navegación por región

**Componentes**:
- Header: "Descubre nuestros destinos"
- Destino Cards: Imagen, nombre, "X tours", CTA "Explorar"
- Filtro (opcional): Ordenar por popularidad, A-Z
- Simple grid 3-4 columnas

**Complejidad**: Baja
**Dependencias**: Destinos DB, Tours count per destino

---

### 5. Destino - Hub (/destinos/:slug)

**Prioridad**: 🟠 P1
**Tipo**: Editorial + Catálogo
**Objetivo**: Información destino + Tours + Blog relacionado

**Componentes**:
- Hero: Imagen destino + nombre
- Descripción: "About this destination"
- Galería: 6-8 fotos destino
- Tours en Destino: Grid de tours
- Blog Posts Relacionados: 3-4 artículos
- FAQs Destino: Accordion
- Mapa: Ubicación, distancia desde Medellín
- CTA: "Ver todos los tours en [Destino]"

**Complejidad**: Media
**Dependencias**: Destino data, Tours filtered, Blog filtered

---

### 6. Actividades - Hub (/actividades/:slug)

**Prioridad**: 🟠 P1
**Tipo**: Editorial + Catálogo
**Objetivo**: Información actividad + Tours de tipo

**Componentes**:
- Hero: Icon/imagen actividad + nombre
- Descripción: "What is [Activity]", información general
- Tours de esta categoría: Grid de tours
- Blog about activity: 2-3 artículos
- Videos related (opcional)

**Complejidad**: Baja-Media
**Dependencias**: Activity data, Tours filtered by category

---

### 7. Blog - Listado (/blog)

**Prioridad**: 🟡 P2
**Tipo**: Editorial
**Objetivo**: Traffic orgánico, SEO, evergreen content

**Componentes**:
- Header: "Blog de aventura y viaje"
- Featured Post: Grande con imagen, título, excerpt
- Blog Card Grid: 3 col, autor, fecha, excerpt
- Categoría filter (opcional): dropdown o tags
- Pagination

**Complejidad**: Baja
**Dependencias**: Blog posts DB

---

### 8. Blog Post - Individual (/blog/:slug)

**Prioridad**: 🟡 P2
**Tipo**: Editorial
**Objetivo**: Conversión desde contenido

**Componentes**:
- Featured image
- Título + Meta: autor, fecha, lectura time
- Table of contents (si es long-form)
- Content (rich text con imágenes, videos, quotes)
- Related posts sidebar o bottom
- Tour recommendations: "Tours relacionados a este artículo"
- Social share buttons
- Call to Action: "¿Listo para vivir la experiencia? Consulta en WhatsApp"

**Complejidad**: Media (rich content, embeds)
**Dependencias**: Blog post schema, Tours related, Social share

---

### 9. Sobre Nosotros (/sobre-nosotros)

**Prioridad**: 🟠 P1
**Tipo**: Corporativo / Trust
**Objetivo**: Build credibility, historia, equipo

**Componentes**:
- Hero + Misión
- Historia (2-3 párrafos)
- Valores (3-4 cards)
- Team (grid de personas con foto y role)
- Certificaciones (logos)
- Testimonial destacado
- CTA: "Únete a nuestra comunidad"

**Complejidad**: Baja
**Dependencias**: Ninguno (mostly static)

---

### 10. Contacto (/contacto)

**Prioridad**: 🔴 P0
**Tipo**: Conversion
**Objetivo**: Capturar inquietudes generales

**Componentes**:
- Hero: "Estamos para ayudarte"
- Formulario: Nombre, Email, Tel, Asunto, Mensaje, Checkbox newsletter
- Información de contacto:
  - Email
  - Teléfono
  - WhatsApp link
  - Direcciones (si aplica)
- Mapa: Locación HQ
- Social links

**Complejidad**: Baja-Media (mostly form handling)
**Dependencias**: Email service, Form validation

---

### 11. FAQs Globales (/faq)

**Prioridad**: 🟡 P2
**Tipo**: Support
**Objetivo**: Reducir preguntas recurrentes

**Componentes**:
- Header
- Search FAQ
- Accordion grouped by category:
  - Sobre los tours
  - Seguridad
  - Cancelaciones
  - Equipamiento
  - ¿Qué llevar?
  - Medellín Travel Tips

**Complejidad**: Baja
**Dependencias**: FAQ data

---

### 12. Política de Privacidad (/privacidad)

**Prioridad**: 🔴 P0
**Tipo**: Legal
**Objetivo**: Compliance

**Componentes**:
- Texto legalmente revisado
- Última actualización
- Structured sections

**Complejidad**: Muy baja
**Dependencias**: Legal review

---

### 13. Términos y Condiciones (/terminos)

**Prioridad**: 🔴 P0
**Tipo**: Legal
**Objetivo**: Compliance

**Componentes**:
- Texto legalmente revisado
- Sections: Uso, Limitaciones, Garantías, Cancelación

**Complejidad**: Muy baja
**Dependencias**: Legal review

---

### 14. Política de Cancelación (/cancelacion)

**Prioridad**: 🟠 P1
**Tipo**: Legal + Info
**Objetivo**: Transparencia

**Componentes**:
- Clear cancellation terms
- Timeline visual
- Refund scenarios

**Complejidad**: Baja
**Dependencias**: Business logic

---

### 15. 404 Página de Error

**Prioridad**: 🟡 P2
**Tipo**: UX
**Objetivo**: Guide lost users

**Componentes**:
- Mensaje amable
- Suggestiones: Home, Tours, Contact
- Search box

**Complejidad**: Muy baja
**Dependencias**: Ninguno

---

### 16. 500 Página de Error

**Prioridad**: 🟡 P2
**Tipo**: UX
**Objetivo**: Transparency

**Componentes**:
- Error message
- Suggestion to contact support
- Home link

**Complejidad**: Muy baja
**Dependencias**: Error service

---

## Admin Pages (Protegidas con Auth)

### A. Admin - Login (/admin/login)

**Prioridad**: 🔴 P0
**Tipo**: Auth
**Objetivo**: Authenticate admin users

**Componentes**:
- Email field
- Password field
- "Forgot password" link
- "Remember me" checkbox
- Submit button
- Links a políticas si necesario

**Complejidad**: Baja (NextAuth.js handles)
**Dependencias**: NextAuth integration

---

### B. Admin - Dashboard (/admin/dashboard)

**Prioridad**: 🔴 P0
**Tipo**: Dashboard
**Objetivo**: Overview de operación

**Componentes**:
- Welcome message
- KPIs cards:
  - Tours activos
  - Leads hoy / mes
  - Tours sin Reviews
  - Content pending
- Quick actions:
  - [+] Nuevo Tour
  - [+] Ver Leads
  - [+] Editar Blog
- Recent activities
- Calendar de disponibilidad (si aplica)

**Complejidad**: Media
**Dependencias**: Analytics/aggregation functions

---

### C. Admin - Tours Gestión (/admin/tours)

**Prioridad**: 🔴 P0
**Tipo**: CRUD
**Objetivo**: Manage all tours

**Componentes**:
- Table / List de tours:
  - Columns: Nombre, Destino, Categoría, Precio, Estado (borrador/publicado)
  - Actions: Edit, Preview, Delete, Duplicate
- Filtros: Por destino, categoría, estado
- Sort: Por fecha, nombre, precio
- Bulk actions: Publicar, Archivar, Eliminar
- [+] Nuevo Tour button

**Complejidad**: Media (table logic, bulk ops)
**Dependencias**: Tours API

---

### D. Admin - Tour Editor (/admin/tours/:id/edit)

**Prioridad**: 🔴 P0
**Tipo**: Form
**Objetivo**: Create/Edit tour

**Componentes**:
- Form fields (tabs o sections):
  - **Básico**: Nombre, slug, descripción corta
  - **Información**: Destino, categorías, nivel dificultad, duración, precio
  - **Descripción larga**: Rich text editor + preview
  - **Itinerario**: Repeater field (add/remove items)
  - **Medios**: Upload galería, video URL
  - **Incluye/Excluye**: Repeater fields
  - **FAQs**: Repeater field (preguntas)
  - **SEO**: Meta title, description, canonical, schema (optional)
  - **Publicación**: Estado (borrador/publicado), visible/hidden, featured toggle
- Preview button: "Vista previa del tour"
- Save + Publish buttons
- Auto-save indicator

**Complejidad**: Alta (complex form, media handling, validation)
**Dependencias**: CMS/Form library (React Hook Form + Zod)

---

### E. Admin - Destinos (/admin/destinos)

**Prioridad**: 🟠 P1
**Tipo**: CRUD
**Objetivo**: Manage destinations

**Componentes**:
- Table de destinos
- [+] Nuevo botón
- Edit / Delete actions
- Similar structure to tours

**Complejidad**: Media
**Dependencias**: Destinos API

---

### F. Admin - Categorías (/admin/categorias)

**Prioridad**: 🟠 P1
**Tipo**: CRUD
**Objetivo**: Manage activity categories

**Componentes**:
- Simple list cada categoría
- [+] Nueva categoría
- Edit / Delete actions

**Complejidad**: Baja
**Dependencias**: Categories API

---

### G. Admin - Leads (/admin/leads)

**Prioridad**: 🔴 P0
**Tipo**: Dashboard
**Objetivo**: Manage inquiries / leads

**Componentes**:
- Table de leads:
  - Columns: Nombre, Email, Tour, Fecha, Estado, Fuente
  - States: Nuevo, Respondido, Convertido, Spam
  - Acciones: Mark responded, Delete, Export
- Filtros: Por tour, estado, fecha
- Detail View: Click en lead → modal con full info
- Bulk actions: Mark responded, Export
- Export to CSV button

**Complejidad**: Media
**Dependencias**: Leads DB, email service

---

### H. Admin - Blog (/admin/blog)

**Prioridad**: 🟡 P2
**Tipo**: CRUD
**Objetivo**: Manage blog posts

**Componentes**:
- Table: Título, Autor, Fecha, Estado, Actions
- [+] Nuevo artículo
- Editor: Similar a tour editor pero para blog
- Categorías / Tags

**Complejidad**: Media
**Dependencias**: Blog API, rich text editor

---

### I. Admin - Testimonios (/admin/testimonios)

**Prioridad**: 🟡 P2
**Tipo**: CRUD
**Objetivo**: Manage reviews/testimonials

**Componentes**:
- Table: Nombre, Tour, Rating, texto, Estado
- [+] Manualmente nuevo
- Edit / Delete
- Moderation: Approve/Reject pending
- Featured toggle

**Complejidad**: Baja-Media
**Dependencias**: Testimonios DB

---

### J. Admin - Configuración (/admin/settings)

**Prioridad**: 🟠 P1
**Tipo**: Config
**Objetivo**: Site-wide settings

**Componentes**:
- **Branding**:
  - Logo upload
  - Logo footer upload
  - Brand color (opcional override)
- **Contacto**:
  - Email contacto
  - Teléfono
  - Dirección
  - WhatsApp number
- **Redes sociales**:
  - Links a Instagram, Facebook, TikTok, etc.
- **SEO Global**:
  - Site title
  - Site description
  - Analytics ID (GA4)
  - Meta Pixel ID
  - Google Search Console verification
- **Email Configuration**:
  - Reply-to email
  - Newsletter from address

**Complejidad**: Media
**Dependencias**: Settings DB

---

### K. Admin - Usuarios (/admin/users)

**Prioridad**: 🟠 P1
**Tipo**: CRUD
**Objetivo**: User management

**Componentes**:
- Table: Email, Role, Status, Last login
- [+] Invitar usuario
- Edit permissions
- Deactivate user
- Roles: Admin, Editor, Support

**Complejidad**: Baja-Media (roles/perms logic)
**Dependencias**: Auth system, Users DB

---

## Resumen de Páginas por Fase

### Fase 1 (MVP - 4-6 semanas)
- Home
- Tours - Listado
- Tours - Ficha
- Contacto
- Sobre Nosotros (mín)
- Contacto
- Legal pages (3)
- Admin: Login, Dashboard, Tours (CRUD), Leads, Settings

### Fase 2 (6-10 semanas después)
- Destinos - Hub
- Actividades - Hub
- Blog - Listado y individual
- FAQs
- Admin: Destinos, Categorías, Blog, Testimonios, Usuarios

### Fase 3+ (Post-V1)
- Booking calendar
- Marketplace UI multi-operador
- Analytics reportes
- Newsletter management
- Integración con partners

---

**Última actualización**: Abril 2026
