'use client'

import { useState, useEffect } from 'react'
import { getTestimonialsAction, createTestimonialAction, updateTestimonialAction, deleteTestimonialAction } from '@/app/actions/tour-details'
import { X, Plus, Edit2, Trash2, Star } from 'lucide-react'

interface TestimonialsTabProps {
  tourId: string
  tourTitle: string
}

export function TestimonialsTab({ tourId, tourTitle }: TestimonialsTabProps) {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    author: '',
    content: '',
    rating: 5,
    featured: false,
  })

  useEffect(() => {
    loadTestimonials()
  }, [tourId])

  async function loadTestimonials() {
    try {
      setLoading(true)
      setError(null)
      const result = await getTestimonialsAction(tourId)
      if (result.success) {
        setTestimonials(result.data)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando testimonios')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!formData.author.trim() || !formData.content.trim()) {
      setError('Completa los campos requeridos')
      return
    }

    setSaving(true)
    setError(null)

    try {
      const fData = new FormData()
      fData.append('author', formData.author)
      fData.append('content', formData.content)
      fData.append('rating', formData.rating.toString())
      fData.append('featured', formData.featured.toString())

      let result
      if (editingId) {
        result = await updateTestimonialAction(editingId, {
          author: formData.author,
          content: formData.content,
          rating: formData.rating,
          featured: formData.featured,
        })
      } else {
        result = await createTestimonialAction(tourId, fData)
      }

      if (result.success) {
        setFormData({ author: '', content: '', rating: 5, featured: false })
        setEditingId(null)
        setShowForm(false)
        await loadTestimonials()
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
      console.error('Error:', err)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este testimonial?')) return

    try {
      const result = await deleteTestimonialAction(id)
      if (result.success) {
        await loadTestimonials()
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar')
      console.error('Error:', err)
    }
  }

  function handleEdit(testimonial: any) {
    setFormData({
      author: testimonial.author,
      content: testimonial.content,
      rating: testimonial.rating,
      featured: testimonial.featured || false,
    })
    setEditingId(testimonial.id)
    setShowForm(true)
  }

  function handleCancel() {
    setFormData({ author: '', content: '', rating: 5, featured: false })
    setEditingId(null)
    setShowForm(false)
    setError(null)
  }

  if (loading) {
    return <div className="text-center py-8">Cargando testimonios...</div>
  }

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded text-red-700">
          {error}
        </div>
      )}

      {/* Create Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition"
        >
          <Plus size={20} />
          Nuevo Testimonial
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
          <h3 className="font-bold text-lg">
            {editingId ? 'Editar Testimonial' : 'Nuevo Testimonial'}
          </h3>

          <div>
            <label className="block text-sm font-medium mb-1">Autor</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Nombre completo"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Testimonial</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="¿Qué le pareció el tour?"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Calificación</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="1">⭐ 1 estrella</option>
                <option value="2">⭐⭐ 2 estrellas</option>
                <option value="3">⭐⭐⭐ 3 estrellas</option>
                <option value="4">⭐⭐⭐⭐ 4 estrellas</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 estrellas</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 mt-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Destacado en página</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition disabled:opacity-50"
            >
              {saving ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      <div className="space-y-4">
        {testimonials.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay testimonios aún</p>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold">{testimonial.author}</h4>
                  <div className="flex items-center gap-2 my-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < testimonial.rating ? 'fill-gold-500 text-gold-500' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    {testimonial.featured && (
                      <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded">
                        Destacado
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="text-primary-600 hover:text-primary-700 p-1"
                    title="Editar"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
