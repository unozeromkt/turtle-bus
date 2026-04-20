'use client'

import { useState } from 'react'
import { updateIncludesAction, updateExcludesAction } from '@/app/actions/tour-details'
import { Plus, Trash2, Save, Edit3 } from 'lucide-react'

interface IncludesExcludesTabProps {
  tourId: string
  initialIncludes?: string[]
  initialExcludes?: string[]
}

// Helper function to ensure valid array
function ensureArray(data: any): string[] {
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

// Parse textarea content into array of items (one per line)
function parseTextToItems(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

export function IncludesExcludesTab({
  tourId,
  initialIncludes = [],
  initialExcludes = [],
}: IncludesExcludesTabProps) {
  const [includes, setIncludes] = useState<string[]>(ensureArray(initialIncludes))
  const [excludes, setExcludes] = useState<string[]>(ensureArray(initialExcludes))
  const [bulkIncludesText, setBulkIncludesText] = useState('')
  const [bulkExcludesText, setBulkExcludesText] = useState('')
  const [bulkEditMode, setBulkEditMode] = useState<'includes' | 'excludes' | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSaveIncludes() {
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const result = await updateIncludesAction(tourId, includes)
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

  async function handleSaveExcludes() {
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const result = await updateExcludesAction(tourId, excludes)
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

  function handleRemoveInclude(index: number) {
    setIncludes(includes.filter((_, i) => i !== index))
  }

  function handleRemoveExclude(index: number) {
    setExcludes(excludes.filter((_, i) => i !== index))
  }

  function handleBulkEditIncludes() {
    setBulkIncludesText(includes.join('\n'))
    setBulkEditMode('includes')
  }

  function handleBulkEditExcludes() {
    setBulkExcludesText(excludes.join('\n'))
    setBulkEditMode('excludes')
  }

  function handleSaveBulkIncludes() {
    const items = parseTextToItems(bulkIncludesText)
    if (items.length === 0) {
      setError('Agrega al menos un elemento a "Incluye"')
      return
    }
    setIncludes(items)
    setBulkEditMode(null)
    setBulkIncludesText('')
  }

  function handleSaveBulkExcludes() {
    const items = parseTextToItems(bulkExcludesText)
    setExcludes(items)
    setBulkEditMode(null)
    setBulkExcludesText('')
  }

  return (
    <div className="space-y-8">
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

      {/* Includes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-green-700">✓ Incluye</h3>
            <p className="text-gray-600 text-sm">Agrega los elementos que están incluidos en el tour</p>
          </div>
          {bulkEditMode !== 'includes' && (
            <button
              onClick={handleBulkEditIncludes}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
            >
              <Edit3 size={16} />
              Editar en masa
            </button>
          )}
        </div>

        {/* Bulk Edit Mode */}
        {bulkEditMode === 'includes' && (
          <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              Ingresa cada elemento en una línea diferente. Puedes copiar y pegar múltiples líneas:
            </p>
            <textarea
              value={bulkIncludesText}
              onChange={(e) => setBulkIncludesText(e.target.value)}
              placeholder="Transporte desde el hotel&#10;Guía profesional&#10;Almuerzo incluido"
              className="w-full h-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveBulkIncludes}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                <Save size={16} />
                Aplicar cambios
              </button>
              <button
                onClick={() => setBulkEditMode(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Items List */}
        {bulkEditMode !== 'includes' && (
          <>
            <div className="space-y-2">
              {includes.length === 0 ? (
                <p className="text-gray-500 py-4">No hay elementos. Agrega uno o usa "Editar en masa".</p>
              ) : (
                includes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200"
                  >
                    <span className="text-gray-700">✓ {item}</span>
                    <button
                      onClick={() => handleRemoveInclude(index)}
                      className="text-red-600 hover:text-red-700"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Save Button */}
            {includes.length > 0 && (
              <button
                onClick={handleSaveIncludes}
                disabled={loading}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
              >
                <Save size={20} />
                {loading ? 'Guardando...' : 'Guardar Incluye'}
              </button>
            )}
          </>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300"></div>

      {/* Excludes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-red-700">✗ Excluye</h3>
            <p className="text-gray-600 text-sm">Agrega los elementos que NO están incluidos en el tour (opcional)</p>
          </div>
          {bulkEditMode !== 'excludes' && (
            <button
              onClick={handleBulkEditExcludes}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
            >
              <Edit3 size={16} />
              Editar en masa
            </button>
          )}
        </div>

        {/* Bulk Edit Mode */}
        {bulkEditMode === 'excludes' && (
          <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              Ingresa cada elemento en una línea diferente. Puedes copiar y pegar múltiples líneas:
            </p>
            <textarea
              value={bulkExcludesText}
              onChange={(e) => setBulkExcludesText(e.target.value)}
              placeholder="Comidas no especificadas&#10;Souvenirs&#10;Propinas opcionales"
              className="w-full h-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveBulkExcludes}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                <Save size={16} />
                Aplicar cambios
              </button>
              <button
                onClick={() => setBulkEditMode(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Items List */}
        {bulkEditMode !== 'excludes' && (
          <>
            <div className="space-y-2">
              {excludes.length === 0 ? (
                <p className="text-gray-500 py-4">No hay elementos. Agrega uno si es necesario.</p>
              ) : (
                excludes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-red-50 p-3 rounded-lg border border-red-200"
                  >
                    <span className="text-gray-700">✗ {item}</span>
                    <button
                      onClick={() => handleRemoveExclude(index)}
                      className="text-red-600 hover:text-red-700"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Save Button */}
            {excludes.length > 0 && (
              <button
                onClick={handleSaveExcludes}
                disabled={loading}
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
              >
                <Save size={20} />
                {loading ? 'Guardando...' : 'Guardar Excluye'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
