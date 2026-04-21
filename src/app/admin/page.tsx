'use client'

import Link from 'next/link'
import { BarChart3, TrendingUp, MessageSquare, Package } from 'lucide-react'

export default function AdminDashboard() {
  // Mock data
  const stats = [
    { label: 'Tours Activos', value: 12, icon: Package },
    { label: 'Tours Destacados', value: 8, icon: TrendingUp },
    { label: 'Testimonios', value: 23, icon: MessageSquare },
    { label: 'Destinos', value: 4, icon: BarChart3 },
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
        {/* Platform Status */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-6">Estado de la Plataforma</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border-l-4 border-green-500 bg-green-50">
              <div>
                <p className="font-semibold">Tours Publicados</p>
                <p className="text-sm text-gray-600">Listos para reservación</p>
              </div>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <div className="flex items-center justify-between p-4 border-l-4 border-blue-500 bg-blue-50">
              <div>
                <p className="font-semibold">Tours en Borrador</p>
                <p className="text-sm text-gray-600">Esperando publicación</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
            <div className="flex items-center justify-between p-4 border-l-4 border-purple-500 bg-purple-50">
              <div>
                <p className="font-semibold">Artículos Blog</p>
                <p className="text-sm text-gray-600">Contenido publicado</p>
              </div>
              <p className="text-2xl font-bold text-purple-600">9</p>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  )
}
