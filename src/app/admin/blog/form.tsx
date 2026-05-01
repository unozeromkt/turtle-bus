'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  createBlogPostAction,
  updateBlogPostAction,
} from '@/app/actions/blog-posts'
import { ImageUpload } from '@/components/admin/ImageUpload'

interface BlogFormProps {
  initialData?: any
  blogPostId?: string
  isEditing?: boolean
}

export default function BlogForm({
  initialData,
  blogPostId,
  isEditing = false,
}: BlogFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [featuredImage, setFeaturedImage] = useState<string | null | undefined>(
    initialData?.featured_image || undefined
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set('featuredImage', featuredImage || '')
      formData.set('publishedAt', initialData?.published_at || '')
      formData.set('previousSlug', initialData?.slug || '')

      const result = isEditing && blogPostId
        ? await updateBlogPostAction(blogPostId, formData)
        : await createBlogPostAction(formData)

      if (result.success) {
        setMessage({ type: 'success', text: result.message || 'Guardado exitosamente' })
        setTimeout(() => router.push('/admin/blog'), 1200)
      } else {
        setMessage({ type: 'error', text: result.message || 'No se pudo guardar el blog' })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error al guardar el blog',
      })
    } finally {
      setLoading(false)
    }
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isEditing) {
      const slug = e.target.value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

      const slugInput = document.querySelector('input[name="slug"]') as HTMLInputElement | null
      if (slugInput) slugInput.value = slug
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {message && (
        <div
          className={`rounded-lg border p-4 font-medium ${
            message.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-8">
          <div className="rounded-lg bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-bold">Contenido</h2>

            <div>
              <label className="mb-2 block text-sm font-semibold">Título *</label>
              <input
                type="text"
                name="title"
                defaultValue={initialData?.title || ''}
                onChange={handleTitleChange}
                required
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Título del artículo"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Slug *</label>
              <input
                type="text"
                name="slug"
                defaultValue={initialData?.slug || ''}
                required
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="slug-del-articulo"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Extracto</label>
              <textarea
                name="excerpt"
                defaultValue={initialData?.excerpt || ''}
                rows={4}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Resumen breve para listados y home"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Contenido</label>
              <textarea
                name="content"
                defaultValue={initialData?.content || ''}
                rows={18}
                className="w-full rounded-lg border px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Puedes usar HTML básico como <h2>, <p>, <ul>, <li>..."
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-lg bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-bold">Publicación</h2>

            <div>
              <label className="mb-2 block text-sm font-semibold">Autor</label>

          <div className="rounded-lg bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-bold">SEO</h2>

            <div>
              <label className="mb-2 block text-sm font-semibold">Meta título</label>
              <input
                type="text"
                name="metaTitle"
                maxLength={60}
                defaultValue={initialData?.meta_title || ''}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Título SEO del artículo"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Meta descripción</label>
              <textarea
                name="metaDescription"
                maxLength={160}
                rows={4}
                defaultValue={initialData?.meta_description || ''}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción SEO para buscadores y redes sociales"
              />
            </div>
          </div>
              <input
                type="text"
                name="author"
                defaultValue={initialData?.author || ''}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre del autor"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Estado</label>
              <select
                name="status"
                defaultValue={initialData?.status || 'draft'}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
                <option value="archived">Archivado</option>
              </select>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-bold">Imagen destacada</h2>
            <ImageUpload
              value={featuredImage}
              onChange={setFeaturedImage}
              label=""
              placeholder="Sube la portada del artículo"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push('/admin/blog')}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-primary-600 px-4 py-3 font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Guardando...' : isEditing ? 'Actualizar blog' : 'Crear blog'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
