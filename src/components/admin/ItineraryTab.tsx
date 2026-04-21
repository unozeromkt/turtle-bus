'use client'

import { useState, useEffect } from 'react'
import { updateItineraryAction } from '@/app/actions/tour-details'
import { Plus, Trash2, Save } from 'lucide-react'

interface ItineraryItem {
  time: string
  title: string
  description: string
}

interface ItineraryTabProps {
  tourId: string
  initialItinerary?: ItineraryItem[]
}

// Helper function to ensure valid array of itinerary items
function ensureItineraryArray(data: any): ItineraryItem[] {
  if (Array.isArray(data)) return data
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

export function ItineraryTab({ tourId, initialItinerary = [] }: ItineraryTabProps) {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(ensureItineraryArray(initialItinerary))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSave() {
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const result = await updateItineraryAction(tourId, itinerary)
      if (result.success) {
        setSuccess(result.message)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  function handleAddStep() {
    setItinerary([...itinerary, { time: '09:00', title: '', description: '' }])
  }

  function handleRemoveStep(index: number) {
    setItinerary(itinerary.filter((_, i) => i !== index))
  }

  function handleChangeStep(index: number, field: keyof ItineraryItem, value: string) {
    const newItinerary = [...itinerary]
    if (newItinerary[index]) {
      newItinerary[index][field] = value
      setItinerary(newItinerary)
    }
  }

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 p-4 rounded text-green-700">
          {success}
        </div>
      )}

      {/* Add Button */}
      <button
        onClick={handleAddStep}
        className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition"
      >
        <Plus size={20} />
        Agregar Paso
      </button>

      {/* Itinerary Steps */}
      <div className="space-y-4">
        {itinerary.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay pasos en el itinerario. Agrega uno para comenzar.</p>
        ) : (
          itinerary.map((step, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Paso {index + 1}</h3>
                <button
                  onClick={() => handleRemoveStep(index)}
                  className="text-red-600 hover:text-red-700 p-1"
                  title="Eliminar paso"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Hora</label>
                  <input
                    type="time"
                    value={step.time}
                    onChange={(e) => handleChangeStep(index, 'time', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Título del Paso</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleChangeStep(index, 'title', e.target.value)}
                    placeholder="ej. Salida del hotel"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Duración</label>
                  <input
                    type="text"
                    placeholder="ej. 30 min"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  value={step.description}
                  onChange={(e) => handleChangeStep(index, 'description', e.target.value)}
                  placeholder="Describe qué sucede en este paso del tour"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 h-20"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Save Button */}
      {itinerary.length > 0 && (
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition disabled:opacity-50 w-full md:w-auto"
        >
          <Save size={20} />
          {loading ? 'Guardando...' : 'Guardar Itinerario'}
        </button>
      )}
    </div>
  )
}
