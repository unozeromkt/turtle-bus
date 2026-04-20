'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Eye, Search, X } from 'lucide-react'
import {
  getToursForAdmin,
  getTourStats,
} from '@/lib/db/tours'
import {
  deleteTourAction,
  toggleTourPublish,
} from '@/app/actions/tours'

interface Tour {
  id: string
  slug: string
  title: string
  price_adult: number
  is_published: boolean
  categories?: { name: string }
  destinations?: { name: string }
  created_at: string
}

export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDestination, setFilterDestination] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [destinations, setDestinations] = useState<{ id: string; name: string }[]>([])
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])

  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    loadTours()
    loadFilters()
  }, [page])

  async function loadFilters() {
    try {
      const { supabase } = await import('@/lib/supabase')
      
      const [destData, catData] = await Promise.all([
        supabase.from('destinations').select('id, name').eq('is_published', true),
        supabase.from('categories').select('id, name'),
      ])

      setDestinations(destData.data || [])
      setCategories(catData.data || [])
    } catch (err) {
      console.error('Error loading filters:', err)
    }
  }

  async function loadTours() {
    try {
      setLoading(true)
      setError(null)
      const result = await getToursForAdmin(page, ITEMS_PER_PAGE)
      setTours(result.tours as Tour[])
      setTotalPages(result.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar tours')
      console.error('Error loading tours:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(tourId: string, slug: string) {
    if (!confirm('¿Estás seguro de que quieres eliminar este tour?')) {
      return
    }

    try {
      setDeletingId(tourId)
      const result = await deleteTourAction(tourId, slug)

      if (result.success) {
        setTours(tours.filter((t) => t.id !== tourId))
      } else {
        alert(result.message || 'Error al eliminar')
      }
    } catch (err) {
      alert('Error al eliminar el tour')
      console.error('Error deleting tour:', err)
    } finally {
      setDeletingId(null)
    }
  }

  async function handleTogglePublish(tourId: string, isPublished: boolean, slug: string) {
    try {
      const result = await toggleTourPublish(tourId, isPublished, slug)

      if (result.success) {
        setTours(
          tours.map((t) =>
            t.id === tourId ? { ...t, is_published: !isPublished } : t
          )
        )
      } else {
        alert(result.message || 'Error al actualizar')
      }
    } catch (err) {
      alert('Error al cambiar estado')
      console.error('Error toggling publish:', err)
    }
  }

  // Filtrar tours solo por búsqueda
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.slug.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleClearFilters = () => {
    setSearchTerm('')
    setPage(1)
  }

  if (loading && tours.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Tours</h1>
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando tours...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tours</h1>
        <Link
          href="/admin/tours/new"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          + Nuevo Tour
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card
          title="Total de Tours"
          value={tours.length}
          subtitle="En esta página"
        />
        <Card
          title="Publicados"
          value={tours.filter((t) => t.is_published).length}
          subtitle="Visibles al público"
        />
        <Card
          title="Borradores"
          value={tours.filter((t) => !t.is_published).length}
          subtitle="No publicados"
        />
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar tour por nombre..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1) }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredTours.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">
              {tours.length === 0 ? 'No hay tours todavía' : 'No se encontraron tours con esa búsqueda'}
            </p>
            {tours.length === 0 ? (
              <Link
                href="/admin/tours/new"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Crear el primer tour →
              </Link>
            ) : searchTerm ? (
              <button
                onClick={handleClearFilters}
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Borrar búsqueda →
              </button>
            ) : null}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Destino
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Estado
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.map((tour) => (
                <tr key={tour.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{tour.title}</p>
                      <p className="text-sm text-gray-500">{tour.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">
                      {tour.destinations?.name || '—'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">
                      {tour.categories?.name || '—'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium">${tour.price_adult.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleTogglePublish(tour.id, tour.is_published, tour.slug)
                      }
                      className={`px-3 py-1 rounded text-white text-sm font-medium ${
                        tour.is_published
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gray-400 hover:bg-gray-500'
                      }`}
                    >
                      {tour.is_published ? '✓ Publicado' : '◯ Borrador'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <a
                        href={`/tours/${tour.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded flex items-center gap-1"
                        title="Previsualizar tour"
                      >
                        <Eye size={16} />
                        Ver
                      </a>
                      <Link
                        href={`/admin/tours/edit/${tour.id}`}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(tour.id, tour.slug)}
                        disabled={deletingId === tour.id}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded disabled:opacity-50"
                      >
                        {deletingId === tour.id ? 'Eliminando...' : 'Eliminar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {page > 1 && (
            <button
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              ← Anterior
            </button>
          )}

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? 'bg-primary text-white'
                  : 'border hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          {page < totalPages && (
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Siguiente →
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function Card({
  title,
  value,
  subtitle,
}: {
  title: string
  value: number
  subtitle?: string
}) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-3xl font-bold text-primary">{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  )
}
