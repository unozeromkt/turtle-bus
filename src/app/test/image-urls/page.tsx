'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestImageUrlPage() {
  const [tours, setTours] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTours()
  }, [])

  async function loadTours() {
    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('tours')
        .select('id, title, featured_image, gallery_images')
        .is('deleted_at', null)
        .limit(5)

      if (err) throw err

      console.log('📊 Tours cargados:', data)
      setTours(data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
      console.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8">Cargando...</div>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🖼️ Test de URLs de Tours</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error: {error}
        </div>
      )}

      {tours.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No hay tours para mostrar
        </div>
      ) : (
        <div className="space-y-6">
          {tours.map((tour) => (
            <div key={tour.id} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <h2 className="text-xl font-bold mb-4">{tour.title}</h2>

              {/* Featured Image */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Featured Image:</h3>
                {tour.featured_image ? (
                  <>
                    <p className="text-xs bg-white p-2 rounded border border-gray-200 mb-2 break-all">
                      <code>{tour.featured_image}</code>
                    </p>
                    <div className="flex gap-4">
                      {/* Test with img tag */}
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-2">Con &lt;img&gt;:</p>
                        <img
                          src={tour.featured_image}
                          alt={tour.title}
                          className="w-full h-48 object-cover border-2 border-blue-500 rounded"
                          onError={(e) => {
                            console.error('❌ Error al cargar imagen:', tour.featured_image)
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%23999"%3EError al cargar%3C/text%3E%3C/svg%3E'
                          }}
                          onLoad={() => console.log('✅ Imagen cargada:', tour.featured_image)}
                        />
                      </div>

                      {/* Test con apertura en nueva ventana */}
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-2">Acciones:</p>
                        <div className="space-y-2">
                          <button
                            onClick={() => window.open(tour.featured_image, '_blank')}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
                          >
                            Abrir en nueva pestaña
                          </button>
                          <button
                            onClick={() => {
                              console.log('URL:', tour.featured_image)
                              navigator.clipboard.writeText(tour.featured_image)
                              alert('URL copiada al portapapeles')
                            }}
                            className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
                          >
                            Copiar URL
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 italic">No hay imagen destacada</p>
                )}
              </div>

              {/* Gallery Images */}
              <div>
                <h3 className="font-semibold mb-2">Galería ({tour.gallery_images?.length || 0} imágenes):</h3>
                {tour.gallery_images && tour.gallery_images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {tour.gallery_images.map((url: string, idx: number) => (
                      <div key={idx} className="flex flex-col gap-2">
                        <img
                          src={url}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-32 object-cover border-2 border-green-500 rounded"
                          onError={(e) => {
                            console.error('❌ Error en galería:', url)
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%23ddd" width="200" height="150"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%23999"%3EError%3C/text%3E%3C/svg%3E'
                          }}
                          onLoad={() => console.log(`✅ Imagen galería ${idx + 1} cargada`)}
                        />
                        <p className="text-xs bg-white p-1 rounded border border-gray-200 break-all">
                          <code>{url}</code>
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No hay imágenes en la galería</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Troubleshooting */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-blue-900 mb-2">📋 Troubleshooting:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ Si ves la URL pero la imagen no carga: problema de CORS o URL inválida</li>
          <li>✓ Si ves "Error al cargar": revisa permisos del bucket en Storage</li>
          <li>✓ Si la URL está vacía: no se guardó en la BD correctamente</li>
          <li>✓ Si la URL contiene caracteres especiales: encoding problem</li>
        </ul>
      </div>
    </div>
  )
}
