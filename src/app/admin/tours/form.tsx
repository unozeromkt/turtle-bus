'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { GalleryUpload } from '@/components/admin/GalleryUpload'

interface TourFormProps {
  initialData?: any
  tourId?: string
  isEditing?: boolean
}

export default function TourForm({
  initialData,
  tourId,
  isEditing = false,
}: TourFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [destinations, setDestinations] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loadingOptions, setLoadingOptions] = useState(true)
  const [featuredImage, setFeaturedImage] = useState<string | null | undefined>(
    initialData?.featured_image || undefined
  )
  const [galleryImages, setGalleryImages] = useState<string[]>(
    initialData?.gallery_images || []
  )

  useEffect(() => {
    loadOptions()
  }, [])

  async function loadOptions() {
    try {
      // Cargar destinos y categorías
      const { supabase } = await import('@/lib/supabase')
      
      const [destData, catData] = await Promise.all([
        supabase.from('destinations').select('id, name').eq('is_published', true),
        supabase.from('categories').select('id, name'),
      ])

      setDestinations(destData.data || [])
      setCategories(catData.data || [])
    } catch (error) {
      console.error('Error loading options:', error)
    } finally {
      setLoadingOptions(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const formData = new FormData(e.currentTarget)
      
      // Agregar imágenes al formData
      formData.append('featuredImage', featuredImage || '')
      formData.append('galleryImages', JSON.stringify(galleryImages))
      
      const action = isEditing ? 'updateTourAction' : 'createTourAction'

      const { createTourAction, updateTourAction } = await import(
        '@/app/actions/tours'
      )
      const actionFn = action === 'updateTourAction' ? updateTourAction : createTourAction

      const result = isEditing
        ? await updateTourAction(tourId!, formData)
        : await createTourAction(formData)

      if (result.success) {
        setMessage(result.message)
        if (!isEditing) {
          ;(e.target as HTMLFormElement).reset()
          setTimeout(() => {
            router.push('/admin/tours')
          }, 500)
        }
      } else {
        setMessage(result.message || 'Error al guardar')
      }
    } catch (error) {
      setMessage('Error al guardar el tour')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loadingOptions) {
    return <div className="p-6">Cargando opciones...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Messages */}
      {message && (
        <div
          className={`p-4 rounded ${
            message.includes('Error')
              ? 'bg-red-100 text-red-700 border border-red-400'
              : 'bg-green-100 text-green-700 border border-green-400'
          }`}
        >
          {message}
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Título *
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={initialData?.title || ''}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ej: Piedra del Peñol"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              name="slug"
              required
              defaultValue={initialData?.slug || ''}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="ej-piedra-del-penol"
            />
            <p className="text-xs text-gray-500 mt-1">
              Sin espacios, solo letras, números y guiones
            </p>
          </div>

          {/* Destino */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Destino *
            </label>
            <select
              name="destinationId"
              required
              defaultValue={initialData?.destination_id || ''}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selecciona un destino</option>
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.name}
                </option>
              ))}
            </select>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Categoría *
            </label>
            <select
              name="categoryId"
              required
              defaultValue={initialData?.category_id || ''}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Precio Adulto */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Precio por Adulto ($) *
            </label>
            <input
              type="number"
              name="priceAdult"
              step="1000"
              min="0"
              required
              defaultValue={initialData?.price_adult || ''}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="45000"
            />
          </div>

          {/* Precio Niño */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Precio por Niño ($) (Opcional)
            </label>
            <input
              type="number"
              name="priceChild"
              step="1000"
              min="0"
              defaultValue={initialData?.price_child || ''}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="25000"
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {/* Duración */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Duración *
            </label>
            <input
              type="text"
              name="duration"
              required
              defaultValue={initialData?.duration || ''}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ej: 5 horas, Full day"
            />
          </div>

          {/* Punto de encuentro */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Punto de Encuentro
            </label>
            <input
              type="text"
              name="meetingPoint"
              defaultValue={initialData?.meeting_point || ''}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ej: Terminal de Guatapé"
            />
          </div>

          {/* Participantes máximo */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Participantes Máximo
            </label>
            <input
              type="number"
              name="maxParticipants"
              min="1"
              defaultValue={initialData?.max_participants || ''}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="20"
            />
          </div>

          {/* Edad mínima */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Edad Mínima
            </label>
            <input
              type="number"
              name="minAge"
              min="0"
              defaultValue={initialData?.min_age || ''}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="6"
            />
          </div>

          {/* Edad máxima */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Edad Máxima
            </label>
            <input
              type="number"
              name="maxAge"
              min="0"
              defaultValue={initialData?.max_age || ''}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="65"
            />
          </div>

          {/* Imagen destacada - REMOVED, moved to full width */}

          {/* Video URL */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              URL Video (YouTube/Vimeo)
            </label>
            <input
              type="url"
              name="videoUrl"
              defaultValue={initialData?.video_url || ''}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>
      </div>

      {/* Full Width Fields - Images */}
      <div className="space-y-6">
        {/* Imagen Destacada */}
        <ImageUpload
          value={featuredImage}
          onChange={setFeaturedImage}
          label="Imagen Destacada del Tour"
          placeholder="Sube la imagen principal del tour"
        />

        {/* Galería de Imágenes */}
        <GalleryUpload
          value={galleryImages}
          onChange={setGalleryImages}
          maxImages={10}
          label="Galería de Imágenes"
        />
      </div>

      {/* Full Width Fields - Content */}
      <div className="space-y-6">
        {/* Descripción corta */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Descripción Corta (para listados)
          </label>
          <textarea
            name="description"
            rows={2}
            defaultValue={initialData?.description || ''}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Breve descripción que aparecerá en listados"
          />
        </div>

        {/* Descripción larga */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Descripción Larga (para detalle)
          </label>
          <textarea
            name="longDescription"
            rows={4}
            defaultValue={initialData?.long_description || ''}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Descripción completa del tour"
          />
        </div>
      </div>

      {/* Checkboxes */}
      <div className="space-y-3 border-t pt-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isPublished"
            value="true"
            defaultChecked={initialData?.is_published ?? false}
            className="w-4 h-4 rounded"
          />
          <span className="font-medium">
            ✓ Publicado (visible al público)
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isFeatured"
            value="true"
            defaultChecked={initialData?.is_featured ?? false}
            className="w-4 h-4 rounded"
          />
          <span className="font-medium">⭐ Destacado (mostrar en home)</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-2 rounded"
        >
          {loading ? 'Guardando...' : isEditing ? 'Actualizar Tour' : 'Crear Tour'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
