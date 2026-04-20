'use client'

import Link from 'next/link'
import { Trash2, Edit, Plus } from 'lucide-react'

const blogData = [
  {
    id: '1',
    title: '48 Horas en Medellín: Guía Completa para Tu Primer Viaje',
    slug: 'guia-completa-medellin',
    category: 'Destinos',
    status: 'published',
    views: 1240,
    updated: '2024-03-15',
  },
  {
    id: '2',
    title: 'Aventura en Guatapé: La Piedra del Peñol Desde Adentro',
    slug: 'aventura-guatape',
    category: 'Aventura',
    status: 'published',
    views: 856,
    updated: '2024-03-12',
  },
  {
    id: '3',
    title: 'Fotografía de Viajes: Captura la Magia de Antioquia',
    slug: 'fotografia-viajes',
    category: 'Tips',
    status: 'draft',
    views: 0,
    updated: '2024-03-10',
  },
  {
    id: '4',
    title: 'Sabores Auténticos: Gastronomía Tradicional Antioqueña',
    slug: 'gastronomia-antioquia',
    category: 'Gastronomía',
    status: 'published',
    views: 620,
    updated: '2024-03-08',
  },
]

export default function AdminBlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de Blog</h1>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={18} />
          Nuevo Post
        </button>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-sm">Título</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Categoría</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Visitas</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Estado</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Actualizado</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {blogData.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-semibold line-clamp-2">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.slug}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold">{post.views.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(post.updated).toLocaleDateString('es-CO')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-blue-100 text-blue-600 rounded">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-100 text-red-600 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
