'use client'

import { useState, useEffect } from 'react'
import { getFAQsAction, createFAQAction, updateFAQAction, deleteFAQAction } from '@/app/actions/tour-details'
import { X, Plus, Edit2, Trash2 } from 'lucide-react'

interface FAQsTabProps {
  tourId: string
  tourTitle: string
}

export function FAQsTab({ tourId, tourTitle }: FAQsTabProps) {
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({ question: '', answer: '' })

  useEffect(() => {
    loadFAQs()
  }, [tourId])

  async function loadFAQs() {
    try {
      setLoading(true)
      setError(null)
      const result = await getFAQsAction(tourId)
      if (result.success) {
        setFaqs(result.data)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando FAQs')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!formData.question.trim() || !formData.answer.trim()) {
      setError('Completa los campos requeridos')
      return
    }

    setSaving(true)
    setError(null)

    try {
      const fData = new FormData()
      fData.append('question', formData.question)
      fData.append('answer', formData.answer)

      let result
      if (editingId) {
        result = await updateFAQAction(editingId, formData)
      } else {
        result = await createFAQAction(tourId, fData)
      }

      if (result.success) {
        setFormData({ question: '', answer: '' })
        setEditingId(null)
        setShowForm(false)
        await loadFAQs()
      } else {
        setError(result.message || 'Error al guardar')
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Error desconocido'
      setError(errMsg)
      console.error('Error:', err)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(faqId: string) {
    if (!confirm('¿Eliminar esta FAQ?')) return
    setSaving(true)
    setError(null)
    try {
      const result = await deleteFAQAction(faqId)
      if (result.success) {
        await loadFAQs()
      } else {
        setError(result.message || 'Error al eliminar')
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Error desconocido'
      setError(errMsg)
    } finally {
      setSaving(false)
    }
  }

  function handleEdit(faq: any) {
    setFormData({ question: faq.question, answer: faq.answer })
    setEditingId(faq.id)
    setShowForm(true)
  }

  if (loading) return <div className="p-6 text-center text-gray-500">Cargando FAQs...</div>

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} /> Nueva FAQ
        </button>
      ) : (
        <div className="bg-gray-50 border rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{editingId ? 'Editar' : 'Nueva'} FAQ</h3>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
                setFormData({ question: '', answer: '' })
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Pregunta *</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="¿Es seguro el paragliding?"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Respuesta *</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              rows={4}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Sí, tenemos los más altos estándares de seguridad..."
              disabled={saving}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded"
            >
              {saving ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
            </button>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
                setFormData({ question: '', answer: '' })
              }}
              disabled={saving}
              className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de FAQs */}
      {faqs.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded text-center text-gray-500">
          No hay FAQs todavía
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{faq.question}</p>
                  <p className="text-gray-600 text-sm mt-2">{faq.answer}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(faq)}
                    disabled={saving}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded disabled:opacity-50"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    disabled={saving}
                    className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
