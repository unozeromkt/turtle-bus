# 🚀 Guía de Implementación - Próximos Pasos

## ✅ Estado Actual

- ✅ Supabase proyecto creado
- ✅ `.env.local` configurado con credenciales
- ✅ Schema SQL ejecutado
- ✅ Cliente Supabase configurado
- ✅ Funciones de BD creadas (tours, inquiries)
- ✅ Server Actions creadas
- ⏳ Datos de prueba listos para agregar
- ⏳ Componentes listos para conectar

---

## 📋 Tareas Inmediatas (Hoy)

### 1️⃣ Agregar Seed Data (5 min)

```bash
# En Supabase Dashboard → SQL Editor
# Copia y ejecuta el contenido de: database/SEED_DATA.sql
```

**Resultado esperado:**
- ✅ 4 destinos creados
- ✅ 4 categorías creadas
- ✅ 4 tours de ejemplo
- ✅ FAQs de ejemplo
- ✅ Testimonios de ejemplo
- ✅ Disponibilidades

### 2️⃣ Validar Conexión (5 min)

```bash
npm run dev
# Abre http://localhost:3000/test
```

**Deberías ver:**
- Verde: "✅ Conexión Exitosa"
- Número de tours cargados
- Lista de tours publicados
- Tarjetas con estadísticas

Si ves error → revisa `.env.local` y Supabase dashboard

### 3️⃣ Eliminar Página de Prueba

```bash
# Una vez validado
rm src/app/test/page.tsx
```

---

## 🎯 Conectar Componentes (Sprint 1)

### Tarea 1: Página Pública de Tours

**Archivo:** `src/app/tours/page.tsx`

**Cambio:**
```typescript
import { getAllPublishedTours } from '@/lib/db/tours'

export default async function ToursPage() {
  const tours = await getAllPublishedTours()

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Nuestros Tours</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              slug={tour.slug}
              title={tour.title}
              image={tour.featured_image}
              price={tour.price_adult}
              description={tour.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Tiempo:** 10 min

---

### Tarea 2: Página de Detalle Tour

**Archivo:** `src/app/tours/[slug]/page.tsx`

**Cambio:**
```typescript
import { getTourBySlug } from '@/lib/db/tours'
import { notFound } from 'next/navigation'

export default async function TourDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const tour = await getTourBySlug(params.slug)

  if (!tour) {
    notFound()
  }

  return (
    <main className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Agregar contenido con datos del tour */}
        <h1>{tour.title}</h1>
        <p>{tour.description}</p>
        {/* ... más contenido */}
      </div>
    </main>
  )
}
```

**Tiempo:** 15 min

---

### Tarea 3: Página de Destinos

**Archivo:** `src/app/destinos/page.tsx`

Similar a tours, pero mostrando destinos y sus tours relacionados.

**Tiempo:** 15 min

---

### Tarea 4: Home - Tours Destacados

**Archivo:** `src/app/page.tsx`

```typescript
import { getFeaturedTours } from '@/lib/db/tours'

// En la sección que muestra tours destacados:
const featuredTours = await getFeaturedTours(4)

{featuredTours.map(tour => (
  <TourCard key={tour.id} {...tour} />
))}
```

**Tiempo:** 5 min

---

## 🎛️ Admin Panel - Conexión (Sprint 2)

### Tarea 5: Tabla de Tours Admin

**Archivo:** `src/app/admin/tours/page.tsx`

```typescript
import { getToursForAdmin } from '@/lib/db/tours'

export default async function AdminToursPage() {
  const result = await getToursForAdmin(1, 10)

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tours</h1>
      
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Título</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {result.tours.map((tour) => (
            <tr key={tour.id}>
              <td className="border p-2">{tour.title}</td>
              <td className="border p-2">${tour.price_adult}</td>
              <td className="border p-2">
                {tour.is_published ? '✅ Publicado' : '⏳ Borrador'}
              </td>
              <td className="border p-2">
                <a href={`/admin/tours/${tour.id}`}>✏️ Editar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {result.totalPages > 1 && (
        <div className="mt-4 flex gap-2">
          {Array.from({ length: result.totalPages }).map((_, i) => (
            <a
              key={i}
              href={`?page=${i + 1}`}
              className={`px-3 py-1 rounded ${
                result.page === i + 1 ? 'bg-primary text-white' : 'border'
              }`}
            >
              {i + 1}
            </a>
          ))}
        </div>
      )}
    </main>
  )
}
```

**Tiempo:** 20 min

---

### Tarea 6: Formulario Crear/Editar Tour

**Archivo:** `src/app/admin/tours/form.tsx` (crear)

Usar las acciones `createTourAction` y `updateTourAction` que ya existen.

**Tiempo:** 30 min

---

### Tarea 7: Admin Dashboard

**Archivo:** `src/app/admin/dashboard/page.tsx`

```typescript
import { getToursForAdmin } from '@/lib/db/tours'
import { getLeadStats, getRecentInquiries } from '@/lib/db/inquiries'

export default async function Dashboard() {
  const [toursData, leads, inquiries] = await Promise.all([
    getToursForAdmin(1, 5),
    getLeadStats(),
    getRecentInquiries(5),
  ])

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card title="Tours" value={toursData.total} />
        <Card title="Leads Nuevos" value={leads.new} />
        <Card title="Conversiones" value={leads.converted} />
        <Card title="Tasa Conversión" value={leads.conversionRate} />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tours Table */}
        {/* Inquiries Table */}
      </div>
    </main>
  )
}
```

**Tiempo:** 20 min

---

## 📝 Formularios - Conexión (Sprint 2)

### Tarea 8: Formulario de Contacto

**Archivo:** `src/app/contacto/page.tsx`

```typescript
import { createInquiryAction } from '@/app/actions/inquiries'

export default function ContactPage() {
  return (
    <form action={createInquiryAction}>
      <input type="text" name="name" required />
      <input type="email" name="email" required />
      <textarea name="message" required />
      <button type="submit">Enviar</button>
    </form>
  )
}
```

**Tiempo:** 10 min

---

### Tarea 9: Formulario de Reserva (Tour Detail)

En `src/app/tours/[slug]/page.tsx`, agregar:

```typescript
<form action={createInquiryAction}>
  <input type="hidden" name="tourId" value={tour.id} />
  <input type="number" name="adults" min="1" required />
  <input type="number" name="children" min="0" />
  <button type="submit">Reservar</button>
</form>
```

**Tiempo:** 10 min

---

## 📊 Estadísticas de Tiempo

| Tarea | Tiempo |
|-------|--------|
| 1. Seed Data | 5 min |
| 2. Validación | 5 min |
| 3. Tours Página | 10 min |
| 4. Detalle Tour | 15 min |
| 5. Destinos | 15 min |
| 6. Home Destacados | 5 min |
| 7. Admin Tabla | 20 min |
| 8. Admin Form | 30 min |
| 9. Admin Dashboard | 20 min |
| 10. Contacto | 10 min |
| 11. Reserva | 10 min |
| **Total** | **~145 min ≈ 2.4 horas** |

---

## 🎯 Recomendación de Orden

### Hoy (Validación)
1. Agregar seed data
2. Abrir `/test` para validar
3. Eliminar página de test

### Mañana (Público)
1. Conectar tours página
2. Conectar detalle tour
3. Conectar destinos
4. Conectar home

### Día 3 (Admin)
1. Admin tabla tours
2. Admin form crear/editar
3. Admin dashboard
4. Formularios de contacto

---

## 📌 ¿Ya está todo listo?

**✅ Tienes:**
- Funciones de lectura (`getAllPublishedTours`, `getTourBySlug`, etc.)
- Funciones de escritura (`createTour`, `updateTour`, etc.)
- Server Actions para formularios
- Datos de prueba

**⏳ Solo falta:**
- Copiar y pegar las queries en componentes
- Conectar formularios a actions

---

## 🔗 Archivos de Referencia

- [SUPABASE_EXAMPLES.md](./SUPABASE_EXAMPLES.md) - Ejemplos completos
- [SUPABASE_API_KEYS.md](./SUPABASE_API_KEYS.md) - Info sobre API keys
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Setup inicial

---

## 💡 Tips

1. **Server Components:** Usa directamente en `.tsx` async para queries
2. **Client Components:** Usa `useEffect` + `useState` o Server Actions
3. **Validation:** Zod ya está instalado, úsalo para validar inputs
4. **Error Handling:** Cada función ya tiene try/catch

---

**¿Listo para empezar? 🚀**

Comienza por:
```bash
# 1. Ejecutar seed data en Supabase dashboard
# 2. Visitar http://localhost:3000/test
# 3. Empezar a conectar componentes
```
