'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trash2, Edit, Plus, Eye, EyeOff } from 'lucide-react'
import { deleteDestinationAction, toggleDestinationPublish } from '@/app/actions/destinations'
import { supabase } from '@/lib/supabase'

interface Destination {
  id: string
  name: string
  slug: string
  is_published: boolean
  featured_image: string | null
  created_at: string
  updated_at: string
}

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDestinations()
  }, [])

  async function loadDestinations() {
    try {
      setLoading(true)
      setError(null)

      const { data, error: err } = await supabase
        .from('destinations')
        .select('*')
        .is('deleted_at', null)
        .order('order', { ascending: true })

      console.log('Fetch destinations - Data:', data)
      console.log('Fetch destinations - Error:', err)

      if (err) throw err

      if (!data || data.length === 0) {
        console.log('No destinations found')
        setDestinations([])
        return
      }

      // Count tours for each destination
      const withTourCount = await Promise.all(
        (data || []).map(async (dest) => {
          const { count } = await supabase
            .from('tours')
            .select('*', { count: 'exact', head: true })
            .eq('destination_id', dest.id)
            .eq('is_published', true)
            .is('deleted_at', null)

          return {
            ...dest,
            tour_count: count || 0,
          }
        })
      )

      console.log('Destinations with tours:', withTourCount)
      setDestinations(withTourCount)
    } catch (err) {
      console.error('Load destinations error:', err)
      setError(err instanceof Error ? err.message : 'Error al cargar destinos')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string, slug: string, name: string) {
    if (!confirm(`¿Eliminar "${name}"?`)) return

    try {
      const result = await deleteDestinationAction(id, slug)
      if (result.success) {
        setDestinations(destinations.filter((d) => d.id !== id))
      } else {
        alert('Error: ' + result.message)
      }
    } catch (err) {
      alert('Error al eliminar')
    }
  }

  async function handleTogglePublish(id: string, isPublished: boolean, slug: string) {
    try {
      const result = await toggleDestinationPublish(id, isPublished, slug)
      if (result.success) {
        setDestinations(
          destinations.map((d) => (d.id === id ? { ...d, is_published: result.data.is_published } : d))
        )
      }
    } catch (err) {
      alert('Error al cambiar estado')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Cargando destinos...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de Destinos</h1>
        <Link
          href="/admin/destinos/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
        >
          <Plus size={18} />
          Nuevo Destino
        </Link>
      </div>

      {error && <div className="bg-red-50 border border-red-200 p-4 rounded mb-6 text-red-700">{error}</div>}

      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        {destinations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No hay destinos aún. Crea uno para comenzar.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-sm">Nombre</th>
                <th className="text-left px-6 py-3 font-semibold text-sm">Tours</th>
                <th className="text-left px-6 py-3 font-semibold text-sm">Estado</th>
                <th className="text-left px-6 py-3 font-semibold text-sm">Actualizado</th>
                <th className="text-left px-6 py-3 font-semibold text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((dest) => (
                <tr key={dest.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {dest.featured_image && (
                        <img
                          src={dest.featured_image}
                          alt={dest.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{dest.name}</p>
                        <p className="text-xs text-gray-500">{dest.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold">{dest.tour_count}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        dest.is_published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {dest.is_published ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(dest.updated_at).toLocaleDateString('es-CO')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleTogglePublish(dest.id, dest.is_published, dest.slug)}
                        className={`p-2 rounded transition-colors ${
                          dest.is_published
                            ? 'hover:bg-yellow-100 text-yellow-600'
                            : 'hover:bg-blue-100 text-blue-600'
                        }`}
                        title={dest.is_published ? 'Despublicar' : 'Publicar'}
                      >
                        {dest.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <Link
                        href={`/admin/destinos/${dest.id}`}
                        className="p-2 hover:bg-blue-100 text-blue-600 rounded"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(dest.id, dest.slug, dest.name)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
