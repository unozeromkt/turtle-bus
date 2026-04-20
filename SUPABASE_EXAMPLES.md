# Ejemplos de Uso - Supabase Integration

## 📚 Ejemplos Prácticos en Componentes

---

## 1️⃣ Página de Tours (lado público)

**Archivo: `src/app/tours/page.tsx`**

```typescript
import { getAllPublishedTours } from '@/lib/db/tours'
import TourCard from '@/components/tours/TourCard'

export default async function ToursPage() {
  try {
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
  } catch (error) {
    return <div>Error cargando tours</div>
  }
}
```

---

## 2️⃣ Página de Detalle Tour

**Archivo: `src/app/tours/[slug]/page.tsx`**

```typescript
import { getTourBySlug } from '@/lib/db/tours'
import { notFound } from 'next/navigation'

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  try {
    const tour = await getTourBySlug(params.slug)

    if (!tour) {
      notFound()
    }

    return (
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero Section */}
          {tour.featured_image && (
            <img 
              src={tour.featured_image} 
              alt={tour.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{tour.description}</p>

          {/* Precio y Duración */}
          <div className="flex gap-6 mb-8 p-4 bg-gray-100 rounded">
            <div>
              <p className="text-gray-600">Precio por adulto</p>
              <p className="text-2xl font-bold">${tour.price_adult}</p>
            </div>
            {tour.price_child && (
              <div>
                <p className="text-gray-600">Precio niño</p>
                <p className="text-2xl font-bold">${tour.price_child}</p>
              </div>
            )}
            <div>
              <p className="text-gray-600">Duración</p>
              <p className="text-2xl font-bold">{tour.duration}</p>
            </div>
          </div>

          {/* Itinerario */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Itinerario</h2>
              <ol className="space-y-4">
                {tour.itinerary.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* FAQs */}
          {tour.tour_faqs && tour.tour_faqs.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Preguntas Frecuentes</h2>
              <div className="space-y-4">
                {tour.tour_faqs.map((faq) => (
                  <details key={faq.id} className="border rounded p-4">
                    <summary className="font-bold cursor-pointer">
                      {faq.question}
                    </summary>
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <button className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-bold">
            Reservar Ahora
          </button>
        </div>
      </main>
    )
  } catch (error) {
    return <div>Error cargando tour</div>
  }
}
```

---

## 3️⃣ Dashboard Admin - Tabla de Tours

**Archivo: `src/app/admin/tours/page.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { getToursForAdmin } from '@/lib/db/tours'
import { deleteTourAction, toggleTourPublish } from '@/app/actions/tours'

export default function AdminToursPage() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadTours()
  }, [page])

  async function loadTours() {
    setLoading(true)
    try {
      const result = await getToursForAdmin(page, 10)
      setTours(result.tours)
    } catch (error) {
      console.error('Error loading tours:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(tourId: string, slug: string) {
    if (!confirm('¿Estás seguro?')) return
    const result = await deleteTourAction(tourId, slug)
    if (result.success) {
      loadTours()
    }
  }

  async function handleTogglePublish(tourId: string, isPublished: boolean, slug: string) {
    const result = await toggleTourPublish(tourId, isPublished, slug)
    if (result.success) {
      loadTours()
    }
  }

  if (loading) return <div>Cargando...</div>

  return (
    <main className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Tours</h1>
        <a href="/admin/tours/new" className="bg-primary text-white px-4 py-2 rounded">
          + Nuevo Tour
        </a>
      </div>

      <table className="w-full border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Título</th>
            <th className="border p-2 text-left">Precio</th>
            <th className="border p-2 text-left">Estado</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.id} className="hover:bg-gray-50">
              <td className="border p-2">{tour.title}</td>
              <td className="border p-2">${tour.price_adult}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleTogglePublish(tour.id, tour.is_published, tour.slug)}
                  className={`px-3 py-1 rounded text-white ${
                    tour.is_published ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                >
                  {tour.is_published ? 'Publicado' : 'Borrador'}
                </button>
              </td>
              <td className="border p-2 text-center">
                <a href={`/admin/tours/${tour.id}`} className="text-blue-500 mr-4">
                  Editar
                </a>
                <button
                  onClick={() => handleDelete(tour.id, tour.slug)}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
```

---

## 4️⃣ Formulario de Crear/Editar Tour

**Archivo: `src/app/admin/tours/form.tsx`**

```typescript
'use client'

import { createTourAction, updateTourAction } from '@/app/actions/tours'
import { useState } from 'react'

interface TourFormProps {
  initialData?: any
  tourId?: string
}

export default function TourForm({ initialData, tourId }: TourFormProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const formData = new FormData(e.currentTarget)

    try {
      const result = tourId
        ? await updateTourAction(tourId, formData)
        : await createTourAction(formData)

      if (result.success) {
        setMessage(result.message)
        if (!tourId) {
          ;(e.target as HTMLFormElement).reset()
        }
      } else {
        setMessage(result.message)
      }
    } catch (error) {
      setMessage('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {message && (
        <div className={`p-4 rounded ${message.includes('Error') ? 'bg-red-100' : 'bg-green-100'}`}>
          {message}
        </div>
      )}

      <div>
        <label className="block mb-2 font-bold">Título</label>
        <input
          type="text"
          name="title"
          required
          defaultValue={initialData?.title}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-2 font-bold">Slug</label>
        <input
          type="text"
          name="slug"
          required
          defaultValue={initialData?.slug}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-2 font-bold">Descripción Corta</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={initialData?.description}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-2 font-bold">Descripción Larga</label>
        <textarea
          name="longDescription"
          rows={5}
          defaultValue={initialData?.long_description}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-bold">Precio Adulto</label>
          <input
            type="number"
            name="priceAdult"
            step="0.01"
            required
            defaultValue={initialData?.price_adult}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold">Precio Niño (opcional)</label>
          <input
            type="number"
            name="priceChild"
            step="0.01"
            defaultValue={initialData?.price_child}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-bold">Duración</label>
        <input
          type="text"
          name="duration"
          placeholder="Ej: 4 horas, Full day"
          defaultValue={initialData?.duration}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            value="true"
            defaultChecked={initialData?.is_published}
          />
          <span>Publicado</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-6 py-2 rounded font-bold disabled:opacity-50"
      >
        {loading ? 'Guardando...' : tourId ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  )
}
```

---

## 5️⃣ Formul de Contacto Público

**Archivo: `src/components/forms/ContactForm.tsx`**

```typescript
'use client'

import { createInquiryAction } from '@/app/actions/inquiries'
import { useState } from 'react'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const formData = new FormData(e.currentTarget)
      const result = await createInquiryAction(formData)

      if (result.success) {
        setMessage(result.message)
        ;(e.target as HTMLFormElement).reset()
      } else {
        setMessage(result.message)
      }
    } catch (error) {
      setMessage('Error al enviar formulario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      {message && (
        <div className={`p-4 rounded ${message.includes('Error') ? 'bg-red-100' : 'bg-green-100'}`}>
          {message}
        </div>
      )}

      <div>
        <label className="block mb-1 font-bold">Nombre</label>
        <input
          type="text"
          name="name"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-bold">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-bold">Teléfono</label>
        <input
          type="tel"
          name="phone"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-bold">Mensaje</label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 rounded font-bold disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Enviar Consulta'}
      </button>
    </form>
  )
}
```

---

## 6️⃣ Dashboard Admin - Resumen

**Archivo: `src/app/admin/dashboard/page.tsx`**

```typescript
import { getAllPublishedTours } from '@/lib/db/tours'
import { getLeadStats, getRecentInquiries } from '@/lib/db/inquiries'

export default async function AdminDashboard() {
  try {
    const [tours, leadStats, recentInquiries] = await Promise.all([
      getAllPublishedTours(),
      getLeadStats(),
      getRecentInquiries(5),
    ])

    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card title="Tours Totales" value={tours.length} />
          <Card title="Leads Nuevos" value={leadStats.new} />
          <Card title="Conversiones" value={leadStats.converted} />
          <Card
            title="Tasa de Conversión"
            value={leadStats.conversionRate}
            isPercentage
          />
        </div>

        {/* Recent Inquiries */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Consultas Recientes</h2>
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Nombre</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Estado</th>
                <th className="border p-2 text-left">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td className="border p-2">{inquiry.name}</td>
                  <td className="border p-2">{inquiry.email}</td>
                  <td className="border p-2">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="border p-2">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    )
  } catch (error) {
    return <div>Error cargando dashboard</div>
  }
}

function Card({ title, value, isPercentage = false }) {
  return (
    <div className="bg-white border rounded p-4">
      <p className="text-gray-600 mb-2">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}
```

---

## 📝 Resumen de Imports

```typescript
// Queries
import { 
  getAllPublishedTours,
  getTourBySlug,
  getToursByDestination,
  getFeaturedTours,
  getToursForAdmin,
  createTour,
  updateTour,
  deleteTour,
  getTourStats 
} from '@/lib/db/tours'

import {
  createInquiry,
  getRecentInquiries,
  getInquiriesByTour,
  updateInquiryStatus,
  getLeadStats
} from '@/lib/db/inquiries'

// Server Actions
import {
  createTourAction,
  updateTourAction,
  deleteTourAction,
  toggleTourPublish
} from '@/app/actions/tours'

import {
  createInquiryAction,
  updateInquiryStatusAction
} from '@/app/actions/inquiries'
```
