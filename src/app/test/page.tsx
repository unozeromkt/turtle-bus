'use client'

import { useEffect, useState } from 'react'
import {
  getAllPublishedTours,
  getFeaturedTours,
  getTourStats,
} from '@/lib/db/tours'
import {
  getLeadStats,
  getRecentInquiries,
} from '@/lib/db/inquiries'

export default function TestPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)

        // Cargar datos de prueba
        const [tours, featured, leadStats, recentInquiries] = await Promise.all([
          getAllPublishedTours(),
          getFeaturedTours(4),
          getLeadStats().catch(() => ({ total: 0, new: 0, converted: 0 })),
          getRecentInquiries(3).catch(() => []),
        ])

        setData({
          tours: {
            total: tours?.length || 0,
            list: tours?.slice(0, 3),
          },
          featured: {
            total: featured?.length || 0,
            list: featured,
          },
          leads: leadStats,
          recentInquiries,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
        console.error('Error loading test data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading)
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">🧪 Página de Prueba Supabase</h1>
        <p className="text-gray-500">Cargando datos...</p>
      </div>
    )

  if (error)
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">🧪 Página de Prueba Supabase</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">❌ Error de Conexión:</p>
          <p>{error}</p>
          <p className="text-sm mt-2">
            Verifica que:
          </p>
          <ul className="list-disc ml-5 text-sm">
            <li>.env.local tenga NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</li>
            <li>El proyecto en Supabase esté activo</li>
            <li>El SQL schema se haya ejecutado correctamente</li>
          </ul>
        </div>
      </div>
    )

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">🧪 Página de Prueba Supabase</h1>

      {/* Connection Status */}
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
        <p className="font-bold">✅ Conexión Exitosa</p>
        <p className="text-sm">Supabase está conectado y funcionando correctamente</p>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card title="Tours Totales" value={data?.tours?.total || 0} />
        <Card title="Tours Destacados" value={data?.featured?.total || 0} />
        <Card title="Leads Nuevos" value={data?.leads?.new || 0} />
        <Card title="Conversiones" value={data?.leads?.converted || 0} />
      </div>

      {/* Tours */}
      {data?.tours?.list && data.tours.list.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tours Publicados</h2>
          <div className="space-y-3 bg-gray-50 p-4 rounded">
            {data.tours.list.map((tour: any) => (
              <div key={tour.id} className="bg-white p-3 rounded border">
                <p className="font-bold">{tour.title}</p>
                <p className="text-sm text-gray-600">Slug: {tour.slug}</p>
                <p className="text-sm">Precio: ${tour.price_adult}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Tours */}
      {data?.featured?.list && data.featured.list.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tours Destacados</h2>
          <div className="space-y-3 bg-gray-50 p-4 rounded">
            {data.featured.list.map((tour: any) => (
              <div key={tour.id} className="bg-white p-3 rounded border">
                <p className="font-bold">{tour.title}</p>
                <p className="text-sm text-gray-600">{tour.description}</p>
                <p className="text-sm font-bold mt-1">💰 ${tour.price_adult}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Inquiries */}
      {data?.recentInquiries && data.recentInquiries.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Consultas Recientes</h2>
          <table className="w-full border-collapse border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2 text-left">Nombre</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {data.recentInquiries.map((inq: any) => (
                <tr key={inq.id}>
                  <td className="border p-2">{inq.name}</td>
                  <td className="border p-2">{inq.email}</td>
                  <td className="border p-2">
                    <span className="px-2 py-1 rounded text-white bg-blue-500 text-sm">
                      {inq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Instructions */}
      <section className="bg-blue-50 border border-blue-200 p-4 rounded">
        <h3 className="font-bold mb-2">📌 Próximos Pasos:</h3>
        <ol className="list-decimal ml-5 space-y-1 text-sm">
          <li>
            Ejecuta el SQL de seed data:{' '}
            <code className="bg-gray-200 px-1">database/SEED_DATA.sql</code>
          </li>
          <li>
            Elimina esta página temporal: <code className="bg-gray-200 px-1">src/app/test/page.tsx</code>
          </li>
          <li>
            Conecta las páginas públicas a las queries (tours, destinos)
          </li>
          <li>
            Conecta el admin panel al CRUD de tours
          </li>
          <li>
            Conecta formularios de contacto y reserva
          </li>
        </ol>
      </section>
    </div>
  )
}

function Card({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-3xl font-bold text-primary">{value}</p>
    </div>
  )
}
