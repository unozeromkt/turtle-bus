'use client'

import Link from 'next/link'
import { BarChart3, Users, MessageSquare, Package } from 'lucide-react'

export default function AdminDashboard() {
  // Mock data
  const stats = [
    { label: 'Tours Activos', value: 12, icon: Package },
    { label: 'Leads este mes', value: 45, icon: Users },
    { label: 'Testimonios', value: 23, icon: MessageSquare },
    { label: 'Conversiones', value: 8, icon: BarChart3 },
  ]

  const recentLeads = [
    { id: 1, name: 'Diego M.', tour: 'Paragliding', date: 'Hoy' },
    { id: 2, name: 'María López', tour: 'Guatapé', date: 'Ayer' },
    { id: 3, name: 'Carlos R.', tour: 'Comuna 13', date: 'Hace 2 días' },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bienvenido, Admin</h1>
        <p className="text-gray-600">Resumen de tu plataforma turística</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">{stat.label}</p>
                  <p className="text-3xl font-bold text-primary-600 mt-2">{stat.value}</p>
                </div>
                <Icon size={32} className="text-gray-300" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Leads Recientes</h2>
            <Link href="/admin/leads" className="text-primary-600 hover:underline text-sm">
              Ver todos →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tour</th>
                  <th>Fecha</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="font-semibold">{lead.name}</td>
                    <td>{lead.tour}</td>
                    <td className="text-gray-600">{lead.date}</td>
                    <td>
                      <button className="text-primary-600 hover:underline text-sm">
                        Responder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-6">Acciones Rápidas</h2>
          <div className="space-y-3">
            <Link
              href="/admin/tours"
              className="block p-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold"
            >
              + Nuevo Tour
            </Link>
            <Link
              href="/admin/destinos"
              className="block p-4 bg-accent-orange text-white rounded-lg hover:bg-orange-600 font-semibold"
            >
              + Nuevo Destino
            </Link>
            <Link
              href="/admin/blog"
              className="block p-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500 font-semibold"
            >
              + Nuevo Post
            </Link>
            <Link
              href="/admin/leads"
              className="block p-4 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 font-semibold"
            >
              Ver todos los Leads
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
