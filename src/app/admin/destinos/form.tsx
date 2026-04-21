'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createDestinationAction, updateDestinationAction } from '@/app/actions/destinations'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { GalleryUpload } from '@/components/admin/GalleryUpload'

interface DestinationFormProps {
  initialData?: any
  destinationId?: string
  isEditing?: boolean
}

export default function DestinationForm({
  initialData,
  destinationId,
  isEditing = false,
}: DestinationFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [featuredImage, setFeaturedImage] = useState<string | null | undefined>(
    initialData?.featured_image || undefined
  )
  const [galleryImages, setGalleryImages] = useState<string[]>(
    initialData?.gallery_images || []
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set('featuredImage', featuredImage || '')
      formData.set('galleryImages', JSON.stringify(galleryImages))

      let result

      if (isEditing && destinationId) {
        result = await updateDestinationAction(destinationId, formData)
      } else {
        result = await createDestinationAction(formData)
      }

      if (result.success) {
        setMessage({ type: 'success', text: result.message || 'Guardado exitosamente' })
        setTimeout(() => router.push('/admin/destinos'), 1500)
      } else {
        setMessage({ type: 'error', text: result.message || 'Error al guardar el destino' })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error al guardar',
      })
    } finally {
      setLoading(false)
    }
  }

  // Generar slug automático
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isEditing) {
      const slug = e.target.value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

      const slugInput = document.querySelector('input[name="slug"]') as HTMLInputElement
      if (slugInput) slugInput.value = slug
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div
          className={`p-4 rounded-lg font-medium ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Información General */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-bold mb-4">Información General</h2>

        <div>
          <label className="block text-sm font-semibold mb-2">Nombre *</label>
          <input
            type="text"
            name="name"
            defaultValue={initialData?.name || ''}
            onChange={handleNameChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ej. Guatapé"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Slug *</label>
          <input
            type="text"
            name="slug"
            defaultValue={initialData?.slug || ''}
            required
            readOnly={isEditing}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            placeholder="ej. guatape"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Descripción Corta</label>
          <input
            type="text"
            name="shortDescription"
            defaultValue={initialData?.short_description || ''}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descripción breve para listados"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Descripción Completa</label>
          <textarea
            name="description"
            defaultValue={initialData?.description || ''}
            rows={5}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descripción detallada del destino"
          />
        </div>
      </div>

      {/* Ubicación */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-bold mb-4">Ubicación</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Ciudad</label>
            <input
              type="text"
              name="city"
              defaultValue={initialData?.city || ''}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ej. Guatapé"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Región</label>
            <input
              type="text"
              name="region"
              defaultValue={initialData?.region || ''}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ej. Antioquía"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Latitud</label>
            <input
              type="number"
              step="0.000001"
              name="latitude"
              defaultValue={initialData?.latitude || ''}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ej. 6.2384"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Longitud</label>
            <input
              type="number"
              step="0.000001"
              name="longitude"
              defaultValue={initialData?.longitude || ''}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ej. -75.1978"
            />
          </div>
        </div>
      </div>

      {/* Imágenes */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-bold mb-4">Imágenes</h2>

        <div>
          <label className="block text-sm font-semibold mb-2">Imagen Destacada</label>
          <ImageUpload
            value={featuredImage}
            onChange={setFeaturedImage}
            label="Imagen Destacada"
            placeholder="Haz clic para subir o arrastra una imagen"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Galería de Imágenes</label>
          <GalleryUpload
            value={galleryImages}
            onChange={setGalleryImages}
            maxImages={10}
          />
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-bold mb-4">SEO</h2>

        <div>
          <label className="block text-sm font-semibold mb-2">Meta Título</label>
          <input
            type="text"
            name="metaTitle"
            maxLength={60}
            defaultValue={initialData?.meta_title || ''}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Título para SEO (máx. 60 caracteres)"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Meta Descripción</label>
          <textarea
            name="metaDescription"
            maxLength={160}
            defaultValue={initialData?.meta_description || ''}
            rows={3}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descripción para SEO (máx. 160 caracteres)"
          />
        </div>
      </div>

      {/* Publicación */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-bold mb-4">Publicación</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Orden</label>
            <input
              type="number"
              name="order"
              defaultValue={initialData?.order || 0}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                value="true"
                defaultChecked={initialData?.is_published || false}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold">Publicado</span>
            </label>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
