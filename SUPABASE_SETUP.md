# Configuración Supabase - Guía Rápida

## 📋 Creación de Credenciales

### Pasos en Supabase Dashboard:

1. **Crear proyecto en [supabase.com](https://supabase.com)**
   - Organization → New Project
   - Elige nombre: `turtle-bus`
   - Password: guarda en lugar seguro (contraseña de DB)
   - Region: `South America (São Paulo)` o cercana

2. **Obtener credenciales (Nuevas keys - 2025+):**
   - Ve a **Settings → API Keys** en el dashboard
   - Busca sección "Project API keys" con las nuevas claves
   - Copia:
     - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
     - `Publishable Key (sb_publishable_...)` → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
     - `Secret Key (sb_secret_...)` → `SUPABASE_SECRET_KEY`

   **Si tu proyecto es antiguo (pre-Junio 2025):**
   - Usa las legacy keys `anon` y `service_role`
   - Nuestro código tiene compatibilidad hacia atrás

3. **Actualizar `.env.local`:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
   SUPABASE_SECRET_KEY="sb_secret_..."
   ```

   **O con legacy keys (si aplica):**
   ```bash
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
   SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."
   ```

---

## 🗄️ Crear Tablas

1. **Ve a Supabase Dashboard → SQL Editor**
2. **Copia el contenido de `database/SUPABASE_SCHEMA.sql`**
3. **Ejecuta el SQL completo** (botón "Run")
4. **Verifica que las tablas se crearon** en la sección "Tables"

---

## 📂 Estructura de Archivos Creada

```
src/
├── lib/
│   ├── supabase.ts              # Cliente Supabase (soporta ambas keys)
│   └── db/
│       ├── tours.ts             # Queries para tours
│       └── inquiries.ts         # Queries para leads/inquiries
├── app/
│   └── actions/
│       ├── tours.ts             # Server actions para tours
│       └── inquiries.ts         # Server actions para leads
└── .env.local                   # Variables actualizadas (nuevas + legacy)
```

---

## 🚀 Primeros Pasos para Usar

### 1. Obtener todos los tours publicados
```typescript
import { getAllPublishedTours } from '@/lib/db/tours'

// En un Server Component o Server Action
const tours = await getAllPublishedTours()
```

### 2. Obtener tour por slug
```typescript
import { getTourBySlug } from '@/lib/db/tours'

const tour = await getTourBySlug('tour-slug')
```

### 3. Obtener tours destacados
```typescript
import { getFeaturedTours } from '@/lib/db/tours'

const featured = await getFeaturedTours(4)
```

### 4. Crear un tour (desde admin)
```typescript
import { createTourAction } from '@/app/actions/tours'

// En un formulario
const formData = new FormData()
formData.append('title', 'Mi Tour')
formData.append('slug', 'mi-tour')
// ... más campos

const result = await createTourAction(formData)
```

### 5. Crear una inquietud (desde formulario de contacto)
```typescript
import { createInquiryAction } from '@/app/actions/inquiries'

const formData = new FormData()
formData.append('name', 'Juan')
formData.append('email', 'juan@example.com')
formData.append('message', 'Quiero información...')

const result = await createInquiryAction(formData)
```

---

## 🔐 Row Level Security (RLS)

### Política para Tours (lectura pública de publicados)
```sql
-- Habilitar RLS en tabla tours
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

-- Permitir lectura de tours publicados a cualquiera
CREATE POLICY "Allow public to read published tours" ON tours
  FOR SELECT
  USING (is_published = true AND deleted_at IS NULL);

-- Solo admin puede crear/editar/eliminar (usar service role / secret key)
```

### Política para Inquiries (creación pública, lectura admin)
```sql
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous to create inquiries" ON inquiries
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow service role to read all inquiries" ON inquiries
  FOR SELECT
  USING (auth.role() = 'service_role');
```

---

## 💡 Funciones Disponibles

### Tours (`src/lib/db/tours.ts`)
- `getAllPublishedTours()` - Todos los tours publicados
- `getTourBySlug(slug)` - Tour individual
- `getToursByDestination(id)` - Tours por destino
- `getFeaturedTours(limit)` - Tours destacados
- `getToursForAdmin(page, limit)` - Tours para admin con paginación
- `createTour(data)` - Crear tour
- `updateTour(id, data)` - Actualizar tour
- `deleteTour(id)` - Eliminar (soft delete)
- `getTourStats(id)` - Estadísticas

### Inquiries (`src/lib/db/inquiries.ts`)
- `createInquiry(data)` - Crear consulta/lead
- `getRecentInquiries(limit)` - Leads recientes
- `getInquiriesByTour(id)` - Consultas por tour
- `updateInquiryStatus(id, status, notes)` - Cambiar estado
- `getLeadStats()` - Estadísticas de leads

### Server Actions (`src/app/actions/`)
- `createTourAction()` - Crear tour desde formulario
- `updateTourAction()` - Actualizar tour
- `deleteTourAction()` - Eliminar tour
- `toggleTourPublish()` - Publicar/despublicar
- `createInquiryAction()` - Crear inquietud
- `updateInquiryStatusAction()` - Actualizar estado

---

## 🐛 Troubleshooting

### Error: "NEXT_PUBLIC_SUPABASE_URL is missing"
- Verifica que `.env.local` tenga las variables correctas
- Reinicia el servidor dev: `npm run dev`

### Error: "Missing Supabase credentials"
- Genera nuevas claves en Supabase Dashboard → Settings → API Keys
- Reemplaza en `.env.local` (preferiblemente nuevas keys con formato `sb_publishable_...`)

### Las tablas no aparecen
- Abre Supabase Dashboard → SQL Editor
- Ve a "Tables" en la izquierda y recarga la página

### Error con Legacy Keys
- Nuestro código soporta ambos formatos
- Si usas `NEXT_PUBLIC_SUPABASE_ANON_KEY`, funcionará como fallback
- Se recomienda migrar a las nuevas keys para mejor seguridad

---

## 📌 Próximos Pasos

1. ✅ Crear tablas (ejecutar SQL)
2. ✅ Agregar credenciales acorrecto `.env.local`
3. ✅ Implementar compatibilidad con nuevas keys (HECHO)
4. ⏳ Implementar seed data (datos iniciales)
5. ⏳ Conectar formularios del admin a estas funciones
6. ⏳ Agregar validación de seguridad (RLS policies)
7. ⏳ Implementar búsqueda y filtros

---

## 🔗 Referencias

- [SUPABASE_API_KEYS.md](./SUPABASE_API_KEYS.md) - Guía completa sobre las nuevas API keys
- [SUPABASE_EXAMPLES.md](./SUPABASE_EXAMPLES.md) - Ejemplos prácticos en componentes
- [SUPABASE_CHECKLIST.md](./SUPABASE_CHECKLIST.md) - Checklist de implementación


---

## 🗄️ Crear Tablas

1. **Ve a Supabase Dashboard → SQL Editor**
2. **Copia el contenido de `database/SUPABASE_SCHEMA.sql`**
3. **Ejecuta el SQL completo** (botón "Run")
4. **Verifica que las tablas se crearon** en la sección "Tables"

---

## 📂 Estructura de Archivos Creada

```
src/
├── lib/
│   ├── supabase.ts              # Cliente Supabase
│   └── db/
│       ├── tours.ts             # Queries para tours
│       └── inquiries.ts         # Queries para leads/inquiries
├── app/
│   └── actions/
│       ├── tours.ts             # Server actions para tours
│       └── inquiries.ts         # Server actions para leads
└── .env.local                   # Variables (actualizado)
```

---

## 🚀 Primeros Pasos para Usar

### 1. Obtener todos los tours publicados
```typescript
import { getAllPublishedTours } from '@/lib/db/tours'

// En un Server Component o Server Action
const tours = await getAllPublishedTours()
```

### 2. Obtener tour por slug
```typescript
import { getTourBySlug } from '@/lib/db/tours'

const tour = await getTourBySlug('tour-slug')
```

### 3. Obtener tours destacados
```typescript
import { getFeaturedTours } from '@/lib/db/tours'

const featured = await getFeaturedTours(4)
```

### 4. Crear un tour (desde admin)
```typescript
import { createTourAction } from '@/app/actions/tours'

// En un formulario
const formData = new FormData()
formData.append('title', 'Mi Tour')
formData.append('slug', 'mi-tour')
// ... más campos

const result = await createTourAction(formData)
```

### 5. Crear una inquietud (desde formulario de contacto)
```typescript
import { createInquiryAction } from '@/app/actions/inquiries'

const formData = new FormData()
formData.append('name', 'Juan')
formData.append('email', 'juan@example.com')
formData.append('message', 'Quiero información...')

const result = await createInquiryAction(formData)
```

---

## 🔐 Row Level Security (RLS)

### Política para Tours (lectura pública de publicados)
```sql
-- Habilitar RLS en tabla tours
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

-- Permitir lectura de tours publicados a cualquiera
CREATE POLICY "Allow public to read published tours" ON tours
  FOR SELECT
  USING (is_published = true AND deleted_at IS NULL);

-- Solo admin puede crear/editar/eliminar (usar service role)
```

### Política para Inquiries (creación pública, lectura admin)
```sql
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous to create inquiries" ON inquiries
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow service role to read all inquiries" ON inquiries
  FOR SELECT
  USING (auth.role() = 'service_role');
```

---

## 💡 Funciones Disponibles

### Tours (`src/lib/db/tours.ts`)
- `getAllPublishedTours()` - Todos los tours publicados
- `getTourBySlug(slug)` - Tour individual
- `getToursByDestination(id)` - Tours por destino
- `getFeaturedTours(limit)` - Tours destacados
- `getToursForAdmin(page, limit)` - Tours para admin con paginación
- `createTour(data)` - Crear tour
- `updateTour(id, data)` - Actualizar tour
- `deleteTour(id)` - Eliminar (soft delete)
- `getTourStats(id)` - Estadísticas

### Inquiries (`src/lib/db/inquiries.ts`)
- `createInquiry(data)` - Crear consulta/lead
- `getRecentInquiries(limit)` - Leads recientes
- `getInquiriesByTour(id)` - Consultas por tour
- `updateInquiryStatus(id, status, notes)` - Cambiar estado
- `getLeadStats()` - Estadísticas de leads

### Server Actions (`src/app/actions/`)
- `createTourAction()` - Crear tour desde formulario
- `updateTourAction()` - Actualizar tour
- `deleteTourAction()` - Eliminar tour
- `toggleTourPublish()` - Publicar/despublicar
- `createInquiryAction()` - Crear inquietud
- `updateInquiryStatusAction()` - Actualizar estado

---

## 🐛 Troubleshooting

### Error: "NEXT_PUBLIC_SUPABASE_URL is missing"
- Verifica que `.env.local` tenga las variables correctas
- Reinicia el servidor dev: `npm run dev`

### Error: "Missing Supabase credentials"
- Genera nuevas claves en Supabase Dashboard → Settings → API
- Reemplaza en `.env.local`

### Las tablas no aparecen
- Abre Supabase Dashboard → SQL Editor
- Ve a "Tables" en la izquierda y recarga la página

---

## 📌 Próximos Pasos

1. ✅ Crear tablas (ejecutar SQL)
2. ✅ Agregar credenciales acorrecto `.env.local`
3. ⏳ Implementar seed data (datos iniciales)
4. ⏳ Conectar formularios del admin a estas funciones
5. ⏳ Agregar validación de seguridad (RLS policies)
6. ⏳ Implementar búsqueda y filtros

