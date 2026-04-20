# 📋 Checklist de Implementación Supabase

## ✅ Archivos Creados

### Core Supabase
- [x] `src/lib/supabase.ts` - Cliente Supabase (público + admin)
- [x] `src/lib/db/tours.ts` - Todas las queries para tours
- [x] `src/lib/db/inquiries.ts` - Queries para leads/consultas

### Server Actions
- [x] `src/app/actions/tours.ts` - Acciones para crear/editar/eliminar tours
- [x] `src/app/actions/inquiries.ts` - Acciones para crear/actualizar leads

### Configuración
- [x] `.env.local` - Variables de Supabase (actualizado)
- [x] `database/SUPABASE_SCHEMA.sql` - Schema completo de BD

### Documentación
- [x] `SUPABASE_SETUP.md` - Guía de configuración
- [x] `SUPABASE_EXAMPLES.md` - Ejemplos en componentes
- [x] `SUPABASE_CHECKLIST.md` - Este archivo

### Dependencias
- [x] `npm install @supabase/supabase-js`

---

## 📌 Pasos Inmediatos (HOY)

### 1. Configurar Supabase
```bash
# Ir a https://supabase.com
# 1. Crear proyecto nuevo
# 2. Copiar credenciales
# 3. Pegar en .env.local:
```

```env
NEXT_PUBLIC_SUPABASE_URL="https://tu-proyecto.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."
```

### 2. Crear Tablas
```bash
# En Supabase Dashboard → SQL Editor
# Copiar y ejecutar contenido de: database/SUPABASE_SCHEMA.sql
```

### 3. Verificar Conexión
```bash
npm run dev
# Si no hay errores → ¡funcionando!
```

---

## 🚀 Próximas Implementaciones

### Semana 1 - Admin Panel
- [ ] Crear página: `src/app/admin/tours/new` (formulario crear)
- [ ] Crear página: `src/app/admin/tours/[id]` (formulario editar)
- [ ] Conectar tabla admin tours a `createTourAction`
- [ ] Agregar confirmación de eliminación

### Semana 2 - Páginas Públicas
- [ ] Actualizar `src/app/tours/page.tsx` con queries
- [ ] Actualizar `src/app/tours/[slug]/page.tsx` con query individual
- [ ] Actualizar `src/app/destinos/page.tsx` con queries
- [ ] Agregar búsqueda y filtros

### Semana 3 - Leads & Contacto
- [ ] Conectar formulario contacto a `createInquiryAction`
- [ ] Crear página admin: `src/app/admin/leads/page.tsx`
- [ ] Agregar filtro por estado (new, responded, converted)
- [ ] Agregar botón para marcar como "respondido"

### Semana 4 - Optimizaciones
- [ ] Agregar Row Level Security (RLS) policies
- [ ] Implementar seed data (datos iniciales)
- [ ] Agregar paginación en listados
- [ ] Agregar validación con Zod

---

## 🔍 Funciones Disponibles Hoy

### Tours
✅ `getAllPublishedTours()` - Obtener todos los tours publicados  
✅ `getTourBySlug(slug)` - Obtener tour por slug  
✅ `getToursByDestination(id)` - Obtener tours por destino  
✅ `getFeaturedTours(limit)` - Tours destacados  
✅ `getToursForAdmin(page, limit)` - Tours con paginación (admin)  
✅ `createTour(data)` - Crear tour  
✅ `updateTour(id, data)` - Actualizar tour  
✅ `deleteTour(id)` - Eliminar tour (soft delete)  
✅ `getTourStats(id)` - Estadísticas por tour  
✅ `searchTours(query)` - Buscar tours  

### Leads/Inquiries
✅ `createInquiry(data)` - Crear consulta  
✅ `getRecentInquiries(limit)` - Leads recientes  
✅ `getInquiriesByTour(id)` - Leads por tour  
✅ `updateInquiryStatus(id, status, notes)` - Cambiar estado  
✅ `getLeadStats()` - Estadísticas de conversion  

### Server Actions
✅ `createTourAction(formData)` - Crear desde formulario  
✅ `updateTourAction(id, formData)` - Editar desde formulario  
✅ `deleteTourAction(id, slug)` - Eliminar tour  
✅ `toggleTourPublish(id, status, slug)` - Publicar/despublicar  
✅ `createInquiryAction(formData)` - Crear inquietud desde formulario  
✅ `updateInquiryStatusAction(id, status, notes)` - Cambiar estado lead  

---

## 📂 Estructura Final

```
src/
├── lib/
│   ├── supabase.ts          ✅ Cliente
│   └── db/
│       ├── tours.ts         ✅ Queries tours
│       └── inquiries.ts     ✅ Queries leads
├── app/
│   ├── actions/
│   │   ├── tours.ts         ✅ Server actions tours
│   │   └── inquiries.ts     ✅ Server actions leads
│   ├── tours/
│   │   ├── page.tsx         ⏳ Usar getAllPublishedTours()
│   │   └── [slug]/page.tsx  ⏳ Usar getTourBySlug()
│   ├── admin/
│   │   ├── tours/
│   │   │   ├── page.tsx     ⏳ Usar getToursForAdmin()
│   │   │   └── [id]/page.tsx ⏳ Usar updateTourAction()
│   │   └── leads/           ⏳ CREAR - Usar getRecentInquiries()
│   └── contacto/page.tsx    ⏳ Conectar createInquiryAction()
```

---

## 🧪 Testing Rápido

```typescript
// En src/app/test/page.tsx (temporal)
import { getAllPublishedTours } from '@/lib/db/tours'

export default async function TestPage() {
  const tours = await getAllPublishedTours()
  return <pre>{JSON.stringify(tours, null, 2)}</pre>
}
```

---

## 🔒 Seguridad

### RLS Policies recomendadas:
- Tours: Lectura pública de publicados ✅
- Inquiries: Creación pública, lectura admin ✅
- Users: Solo admin acceso ✅

### Próximo: Implementar en Supabase Dashboard

---

## 📞 Soporte Rápido

### Error: "Connection refused"
→ Verificar que `.env.local` tenga las credenciales correctas

### Error: "Table does not exist"
→ Ejecutar SQL de `SUPABASE_SCHEMA.sql` en Supabase Dashboard

### Error: "Missing FormData field"
→ Verificar que el formulario tenga todos los campos requeridos

---

## ✨ Siguiente Sprint

- Crear páginas admin funcionales
- Conectar todos los formularios
- Agregar validaciones
- Implementar RLS completo
- Seed data inicial

**¡Listo para comenzar! 🚀**
