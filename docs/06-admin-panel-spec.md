# 06. Admin Panel Specification

## Objetivo

Especificar detalladamente el **panel administrativo del cliente** como una verdadera consola de operación turística. Este panel es donde el dueño del negocio gestiona tours, leads, contenido y configuración.

**Principio guía**: Un operador turístico NO es developer. El admin debe ser:
- Intuitivo (no require training)
- Visual (dashboards, no tablas raw)
- Rápido (bulk operations)
- Potente (controla todo sin code)

---

## Acceso y Autenticación

### Login Flow
1. Usuario ingresa `/admin/login`
2. Ingresa email + contraseña
3. (Opcional) 2FA via email u SMS
4. Redirige a `/admin/dashboard`
5. Session válida 30 días (con "Remember me")

### Logout
- Botón en header → vuelve a `/admin/login`
- Session timeout automático: 14 días
- Clear de data sensible del localStorage

---

## Dashboard (/admin/dashboard)

### Purpose
Overview instantáneo de operación. Resumen de KPIs, alerts, y quick actions.

### Componentes

#### 1. Welcome Card
```
"Bienvenido, Carlos 👋"
Último acceso: Hace 2 horas
```

#### 2. KPI Cards (Métrica Rápida)
Grid de 4-6 cards, cada una con:
- Icon
- Número grande
- Label
- Trend (↑ +5% vs week anterior | ↓ -2%)

**Cards Recomendadas**:
- **Tours Activos**: Número de tours publicados
- **Leads Este Mes**: Total de inquiries/consultas
- **Tours Sin Reviews**: Para incentivar reseñas
- **Contenido Pendiente**: Blog posts en draft
- **Revenue (si booking)**: N/A en V1
- **Conversion Rate (si datos)**: % leads → booked

#### 3. Recent Leads (New Inquiries)
Tabla ultra-compact de últimos 5 leads:

| Nombre | Tour | Fecha | Estado | Acción |
|--------|------|-------|--------|--------|
| Diego Pérez | Paragliding | 2 horas | Nuevo | [Ver] |
| María López | Guatapé | 1 día | Respondido | [✓] |
| ... | | | | |

- Click en fila → expandir details
- CTA: "Ver todos los leads"

#### 4. Tours En Stock Bajo
Alert si algún tour tiene low availability (si booking enable)

#### 5. Quick Actions (BigButtons)
```
[+ Nuevo Tour]  [+ Nuevo Blog Post]  [Ver Todos los Leads]  [Configuración]
```

#### 6. Calendar Preview (Opcional)
Mini calendario mostrando próximos events

#### 7. Tours Trending / Popular
Gráfico: Top 5 tours por clics/leads

```
Paragliding              ████████████ 45 consultas
Guatapé Full Day       ██████████ 38 consultas
Comuna 13 Free Tour    ████████ 28 consultas
...
```

---

## Tours Management (/admin/tours)

### Tours List View (/admin/tours)

#### Layout
Left sidebar filtros → Main content: tabla/grid

#### Filters (Left Sidebar)
- **Destino**: Checkboxes (Medellín, Guatapé, Guarne, San Rafael, etc.)
- **Categoría**: Checkboxes (Aventura, Naturaleza, Cultura, Familia, Lujo)
- **Estado**: Radio (Publicado, Borrador, Archivado, Todos)
- **Destacado**: Checkbox "Solo destacados"
- [Clear filters] link

#### Tabla de Tours

| Nombre | Destino | Categoría | Precio | Rating | [#Reviews] | Leads | Estado | Actions |
|--------|---------|-----------|--------|--------|-----------|-------|--------|---------|
| Paragliding Médellín | Medellín | Aventura | $99 | ⭐4.8 | 12 | 34 | ✅ Pub | [Edit] [Preview] [Delete] |
| Guatapé 1 Día | Guatapé | Naturaleza | $89 | ⭐5.0 | 5 | 18 | ✅ Pub | [Edit] [Preview] [Delete] |
| ... | | | | | | | | |

**Ordenamiento** (dropdown arriba):
- Recientes
- Nombre (A-Z)
- Precio (bajo-alto)
- Rating
- Leads (+consultados)
- Popular

**Acciones por Fila**:
- **[Edit]**: Abre tour editor
- **[Preview]**: Ve cómo se vería en sitio (modal)
- **[Delete]**: Confirma y elimina → vuelve a lista

#### Bulk Actions
Checkboxes en cada fila + botón "Acciones" arriba

**Bulk options**:
- Publicar todos
- Archivar todos
- Marcar como destacado
- Borrar todos
- Cambiar destino (para todos)
- Cambiar categoría (para todos)

#### Crear Nuevo Tour
Botón grande [+ Nuevo Tour] arriba

---

### Tour Editor (/admin/tours/:id/edit)

#### Layout
Tabs o accordion para organizar campos

**Tabs**:
1. **Información Básica**
2. **Descripción y Contenido**
3. **Itinerario**
4. **Medios (Galería + Video)**
5. **Incluye / Excluye**
6. **Información Práctica**
7. **FAQs**
8. **SEO** (opcional)
9. **Publicación**

#### Tab 1: Información Básica

| Field | Type | Required | Details |
|-------|------|----------|---------|
| Nombre | Text | ✅ | e.g., "Paragliding en Medellín" |
| Slug | Text (auto-generated) | ✅ | Editable, for URL |
| Descripción Corta | Textarea (200 char) | ✅ | Preview/excerpt |
| Destino | Dropdown | ✅ | Seleccionar 1 |
| Categorías | Tags/Multi-select | ✅ | Seleccionar 1-3 |
| Precio Desde | Number | ✅ | USD, e.g., 99 |
| Precio Hasta | Number | ❌ | Si aplica |
| Duración | Select | ✅ | Half Day / Full Day / Multi-Day |
| Duracion (en horas) | Number | ✅ | e.g., 3 |
| Nivel Dificultad | Radio | ✅ | Fácil / Moderado / Difícil / Experto |
| Grupo/Audiencia | Tags | ❌ | Individual, Pareja, Grupo, etc. |

#### Tab 2: Descripción y Contenido

| Field | Type | Details |
|-------|------|---------|
| Descripción Larga | Rich Text Editor | Full editor: bold, italic, lists, quotes, links |
| | | Include: Emotional hooks + practical info |
| | | Character count: aim 400-800 |

#### Tab 3: Itinerario

Repeater field: "Add step"

```
[+ Agregar paso]

Paso 1:
├─ Hora: [09:00 AM]
├─ Título: [Salida desde Medellín]
└─ Descripción: [Nos encontramos en...]

Paso 2:
├─ Hora: [11:30 AM]
├─ Título: [Llegada a punto de despegue]
└─ Descripción: [...]

[+ Agregar paso]
```

#### Tab 4: Medios

**Galería**:
```
[Drag & drop files here] o [Seleccionar archivos]

Files uploaded:
├─ image1.jpg [Move 1] [Move 2] ... [Remove]
├─ image2.jpg ...
└─ ...

[Ordenar manualmente: drag & drop]
```

Max 20 archivos, max 5MB cada uno.
Accepted: JPG, PNG, WebP.

**Video** (opcional):
```
Video URL (YouTube/Vimeo): [_____URL_____]
```

Display preview.

#### Tab 5: Incluye / Excluye

Repeater field para cada uno:

```
INCLUYE:
[+ Agregar Item]
├─ Guía certificado
├─ Equipo de seguridad
├─ Transporte
└─ Almuerzo (si Full Day)

EXCLUYE:
[+ Agregar Item]
├─ Fotos profesionales
├─ Seguro de viaje
└─ Refrescos adicionales
```

#### Tab 6: Información Práctica

| Field | Details |
|-------|---------|
| Edad Mínima | Number, e.g., 16 |
| Edad Máxima | Number, e.g., 70 (optional) |
| Equipo Requerido | Textarea con lista, e.g., "Ropa cómoda, tenis,..." |
| Punto de Encuentro | Text, e.g., "Hotel Éxito, Medellín" |
| Hora de Salida | Time picker, e.g., 09:00 AM |
| Hora de Regreso | Time picker, e.g., 12:00 PM |
| Cancelación Política | Dropdown: Flexible / Moderada / Estricta |
| Cancelación Descripción | Textarea, explicar términos |

#### Tab 7: FAQs

Repeater field:

```
[+ Agregar Pregunta]
├─ Pregunta: [¿Es necesario experiencia previa?]
└─ Respuesta: [No, es apto para todos...]

[+ Agregar Pregunta]
├─ Pregunta: [...]
└─ Respuesta: [...]
```

#### Tab 8: SEO (Opcional para V1)

| Field | Default | Details |
|-------|---------|---------|
| Meta Title | Tour name | Max 60 char, for search result |
| Meta Description | Description corta | Max 160 char |
| Canonical | Auto | URL absoluta |
| Schema Type | ExperienceEvent | Auto-generated JSON-LD |
| Keywords (info) | Tags/Categorías | For reference only |

**Preview**: Show cómo se vería en Google:
```
Meta Title (60 char preview)
example.com > category

Meta Description (160 char preview)
```

#### Tab 9: Publicación

| Control | Details |
|---------|---------|
| **Estado** | Radio: Borrador / Publicado |
| **Visible** | Checkbox: Show en web (permitiría ocultar sin borrar) |
| **Destacado** | Checkbox: Mostrar en home + listado prioritario |
| **Orden Manual** | Number: 1, 2, 3... (para orden custom) |

#### Botones de Acción
```
[Guardar]  [Guardar como Borrador]  [Previsualizar]  [Borrar]  [Volver]
```

**Feedback**:
- Guardado: "✓ Tour guardado exitosamente"
- Error: "❌ Error: Por favor completa todos los campos requeridos"
- Auto-save: cada 30 seg (indicator subtle)

---

## Destinos Management (/admin/destinos)

### Destinos List

Tabla de destinos:

| Nombre | Tours | Descripción | Estado | Actions |
|--------|-------|-------------|--------|---------|
| Medellín | 23 | Montaña tropical con innovación urbana | ✅ | [Edit] [Delete] |
| Guatapé | 15 | Embalse y naturaleza cercanos a Medellín | ✅ | [Edit] [Delete] |
| ... | | | | |

**[+ Nuevo Destino]** button

---

### Destino Editor

- Nombre
- Slug
- Descripción (rich text)
- Galería (similar a tours)
- Ubicación: Map picker + coordinates
- Tours destacados: Multi-select
- Meta title / description (SEO)

---

## Categorías Management (/admin/categorias)

Simple list:

```
Aventura
├─ [Edit]  [Delete]
Naturaleza
├─ [Edit]  [Delete]
Cultura
├─ [Edit]  [Delete]
...
[+ Nueva Categoría]
```

**Destallo Edit Modal**:
- Nombre
- Icon (picker)
- Descripción (short)

---

## Leads Management (/admin/leads)

### Leads List

**Filter (left sidebar)**:
- **Estado**: Nuevo / Respondido / Convertido / Spam / Todos
- **Tour**: Dropdown (or all)
- **Fecha**: Date range
- **Fuente**: Web / WhatsApp / Email / Otro

**Tabla**:

| Nombre | Email | Teléfono | Tour | Fecha | Estado | Acciones |
|--------|-------|----------|------|-------|--------|----------|
| Diego Pérez | diego@... | +57300123 | Paragliding | 09 Apr | Nuevo | [Ver] [Responder] |
| María López | maria@... | +57310456 | Guatapé | 08 Apr | Respondido | [Ver] |
| ... | | | | | | |

**Bulk Actions**:
- Mark as "Respondido"
- Spam
- Export CSV

**[Ver] Button** → Opens detail modal/drawer:
```
┌─────────────────────────────────────┐
│ Lead Details                        │
├─────────────────────────────────────┤
│ Nombre: Diego Pérez                 │
│ Email: diego@email.com              │
│ Teléfono: +573001234567             │
│ Tour: Paragliding en Medellín       │
│ Fecha: 09 de Abril, 2026            │
│ Estado: [Dropdown: Nuevo / Resp...] │
│                                     │
│ Mensaje:                            │
│ "Hola, me gustaría saber más sobre" │
│ "el tour, horarios disponibles..."  │
│                                     │
│ Notas Internas:                     │
│ [Textarea - para notas del equipo]  │
│ "Viajero experimentado, buen lead"  │
│                                     │
│ Acciones:                           │
│ [Copiar WhatsApp Link]              │
│ [Enviar Email]                      │
│ [Cambiar Estado]                    │
│ [Eliminar]                          │
│                                     │
│ [Cerrar]                            │
└─────────────────────────────────────┘
```

### Lead Auto-Reply (Configuración)
Cuando lead se crea:
- ✅ Auto email confirmación (template configurable)
- ✅ Auto WhatsApp message (template configurable)
- ❌ (V2) CRM integration

---

## Contenido / Blog (/admin/blog)

### Blog Posts List

| Título | Autor | Categoría | Fecha | Vistas | Estado | Actions |
|--------|-------|-----------|-------|--------|--------|---------|
| Guía Paragliding Medellín | Admin | Aventura | 05 Apr | 245 | ✅ Pub | [Edit] |
| Guatapé Itinerario... | Admin | Destinos | 02 Apr | 180 | ✅ Pub | [Edit] |
| ... | | | | | | |

**[+ Nuevo Artículo]**

### Blog Post Editor

- Title
- Slug
- Excerpt
- Featured Image
- Content (Rich Text Editor con embeds)
- Category
- Tags
- Author (dropdown)
- Status (Draft / Published)
- Publish Date (scheduler)
- Related Tours (multi-select)
- Meta title / description

**Rich Text Toolbar**:
- Bold, Italic, Underline, Strikethrough
- Headings (H1, H2, H3)
- Lists (bullet, numbered)
- Blockquote
- Link
- Image
- HR
- Code block

---

## Testimonials (/admin/testimonios)

### Testimonials List

| Nombre | Tour | Rating | Texto Preview | Estado | Actions |
|--------|------|--------|----------------|--------|---------|
| Diego Pérez | Paragliding | ⭐⭐⭐⭐⭐ | "Experiencia increíble, gua..." | ✅ Pub | [Edit] |
| María López | Guatapé | ⭐⭐⭐⭐ | "Buena organización..." | ⏳ Pending | [Approve] [Reject] |

**[+ Nuevo (Manual)]**

### Testimonial Editor

- Nombre
- Email (para validación)
- Tour (si aplica)
- Rating (5 stars)
- Texto (textarea)
- Foto (upload o auto from email)
- Estado (Published / Pending / Rejected)
- Featured (checkbox)

---

## Contenido General / Pages (/admin/pages)

### Pages List

| Página | Tipo | Estado | Actions |
|--------|------|--------|---------|
| Sobre Nosotros | Corporativo | ✅ | [Edit] |
| FAQ | Support | ✅ | [Edit] |

**[Edit]** → Rich text editor para cada página

---

## Settings Configuration (/admin/settings)

### Organization Info

| Field | Example |
|-------|---------|
| Nombre Empresa | "Turtle Bus Tours" |
| Logo (upload) | [Drag image] |
| Logo Footer (upload) | [Drag image] |
| Favicon (upload) | [Drag image] |
| Descripción Corta | "Tours de aventura en Medellín y Guatapé" |
| Color Primary (opcional) | [#] Primary Green (#5A7332) |
| Color Secondary | [#] Gold (#F2A81D) |

### Contact Information

| Field | Example |
|-------|---------|
| Email Contacto | "info@turtlebus.co" |
| Teléfono | "+573001234567" |
| WhatsApp | "+573001234567" |
| Dirección | "Carrera 10 #45-67, Medellín" |

### Social Links

| Platform | URL |
|----------|-----|
| Instagram | https://instagram.com/turtlebus |
| Facebook | https://facebook.com/turtlebus |
| TikTok | https://tiktok.com/@turtlebus |
| YouTube | https://youtube.com/@turtlebus |

### SEO Global

| Field | Example |
|-------|---------|
| Site Title | "Turtle Bus - Tours en Medellín y Guatapé" |
| Site Description | "Tours de aventura, naturaleza y cultura en Medellín..." |
| Canonical URL | https://turtle-bus.co |
| Google Analytics ID | "G-XXXXXXXXXX" |
| Meta Pixel ID | "123456789" |
| Google Search Console Code | "[meta tag]" |

### Email Configuration

| Field | Example |
|-------|---------|
| Reply-to Email | "noreply@turtlebus.co" |
| Newsletter From | "Turtle Bus <newsletter@turtlebus.co>" |

### Templates (Configurable)

**Lead Confirmation Email**:
```
Hola [Nombre],

Gracias por tu consulta sobre "[Tour Name]".

Hemos recibido tu mensaje y nos pondremos en contacto pronto.

¿Preguntas? Contáctanos por WhatsApp: [Link]

Saludos,
Turtle Bus Team
```

**Lead Welcome WhatsApp**:
```
¡Hola [Nombre]! 👋

Gracias por tu interés en "[Tour Name]".

Te compartiremos disponibilidad y detalles en breve.

¿Alguna pregunta? Estamos aquí 😊
```

---

## Users & Roles (/admin/users)

### Users List

| Email | Nombre | Role | Status | Last Login | Actions |
|-------|--------|------|--------|------------|---------|
| admin@turtlebus.co | Carlos | Owner | ✅ | 2 h | [Edit] |
| editor@turtlebus.co | Ana | Editor | ✅ | 1 d | [Edit] [Deactivate] |

**[+ Invitar Usuario]**

### Roles & Permissions

**Roles Disponibles**:

1. **Owner** (Full access)
   - ✅ Todos los tours, destinos, configuración
   - ✅ Users management
   - ✅ Settings
   - ✅ Delete data
   - (Máximo 1 Owner)

2. **Admin** (Most features, no destroy)
   - ✅ Tours CRUD
   - ✅ Leads CRUD
   - ✅ Blog CRUD
   - ✅ View analytics
   - ❌ User management
   - ❌ Delete dest/category
   - ❌ Settings

3. **Editor** (Content only)
   - ✅ Tours view/read
   - ✅ Blog CRUD
   - ❌ Delete tours
   - ❌ Leads
   - ❌ Settings

4. **Support** (View-only + Leads)
   - ✅ Tours view
   - ✅ Leads CRUD (read + respond)
   - ✅ Testimonials moderation
   - ❌ Edit tours
   - ❌ Delete anything
   - ❌ Settings

### User Invite Modal

```
Invitar Usuario

Email: [_____________________]
Nombre: [_____________________]
Role:   [Dropdown: Owner/Admin/Editor/Support]
[Enviar Invitación]

"Se le enviará email de confirmación"
```

Invitado recibe email con link temporal.

---

## Analytics / Reports (/admin/analytics)

**V1**: Simple dashboard
**V2**: Advanced reporting

### V1 Simple Metrics

- Leads by source (Web, WhatsApp, Email)
- Top 5 tours por clicking
- Traffic this week
- Conversion rate (if data available)

```
┌─────────────────────────────┐
│ Leads This Week: 45         │
│ ↑ +20% (vs last week)       │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Top Tours by Interest       │
│ 1. Paragliding: 15 consultas│
│ 2. Guatapé: 12 consultas    │
│ 3. Comuna 13: 8 consultas   │
└─────────────────────────────┘
```

---

## Settings Access Control

| Feature | Owner | Admin | Editor | Support |
|---------|-------|-------|--------|---------|
| Dashboard | ✅ | ✅ | ✅ | ❌ |
| Tours List | ✅ | ✅ | ✅ (RO) | ✅ (RO) |
| Tours Edit | ✅ | ✅ | ❌ | ❌ |
| Destinos | ✅ | ✅ | ❌ | ❌ |
| Blog | ✅ | ✅ | ✅ | ❌ |
| Leads | ✅ | ✅ | ❌ | ✅ |
| Testimonios | ✅ | ✅ | ❌ | ✅ (Mod) |
| Settings | ✅ | ❌ | ❌ | ❌ |
| Users | ✅ | ❌ | ❌ | ❌ |
| Analytics | ✅ | ✅ | ❌ | ❌ |

---

## Admin Navigation (Left Sidebar)

```
ADMIN PANEL
├─ 📊 Dashboard
├─ 🎫 Tours
├─ 📍 Destinos
├─ 🎯 Categorías
├─ 📧 Blog
├─ 💬 Testimonios
├─ 👥 Leads
├─ 📄 Páginas
├─ 📈 Analytics (V2)
├─ ⚙️ Settings
├─ 👤 Usuarios
│
└─ [Tu nombre]
   ├─ Mi Perfil
   ├─ Cambiar Contraseña
   └─ Cerrar Sesión
```

---

## Mobile Admin (Responsive)

- On mobile: Stack componentes verticalmente
- Sidebar collapses to hamburger
- Tables become cards (swipeable)
- Buttons remain accessible (48px+)

---

## Admin Design System Requirements

- Clean, professional
- Dark mode optional
- Consistent icons
- Clear feedback (toasts/alerts)
- Loading states
- Error handling

---

**Última actualización**: Abril 2026
