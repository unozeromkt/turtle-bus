'use client'

import Link from 'next/link'
import { Trash2, Eye, Download, Filter } from 'lucide-react'
import { useState } from 'react'

const leadsData = [
  {
    id: '1',
    name: 'Juan García',
    email: 'juan@example.com',
    phone: '+57 300 123 4567',
    subject: 'Tour a Guatapé',
    message: 'Hola, quiero reservar el tour a la Piedra del Peñol...',
    date: '2024-03-15',
    status: 'nuevo',
  },
  {
    id: '2',
    name: 'María López',
    email: 'maria@example.com',
    phone: '+57 310 987 6543',
    subject: 'Consulta sobre grupo',
    message: 'Tengo un grupo de 10 personas interesadas en aventura...',
    date: '2024-03-14',
    status: 'contactado',
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    phone: '+57 320 555 2222',
    subject: 'Tours para empresa',
    message: 'Buscamos hacer un team building con tours...',
    date: '2024-03-13',
    status: 'convertido',
  },
  {
    id: '4',
    name: 'Ana Torres',
    email: 'ana@example.com',
    phone: '+57 315 888 9999',
    subject: 'Información de precios',
    message: '¿Cuál es el precio para familias de 5 personas?',
    date: '2024-03-12',
    status: 'nuevo',
  },
  {
    id: '5',
    name: 'Fede Martínez',
    email: 'fede@example.com',
    phone: '+57 305 444 1111',
    subject: 'Consulta viajes',
    message: 'Interesado en todos los tours disponibles',
    date: '2024-03-11',
    status: 'contactado',
  },
]

export default function AdminLeadsPage() {
  const [selectedStatus, setSelectedStatus] = useState('todos')

  const filteredLeads = selectedStatus === 'todos'
    ? leadsData
    : leadsData.filter((lead) => lead.status === selectedStatus)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de Leads</h1>
        <button className="btn btn-secondary flex items-center gap-2">
          <Download size={18} />
          Exportar CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm mb-1">Total Leads</p>
          <p className="text-3xl font-bold">{leadsData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm mb-1">Nuevos</p>
          <p className="text-3xl font-bold">
            {leadsData.filter((l) => l.status === 'nuevo').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm mb-1">Contactados</p>
          <p className="text-3xl font-bold">
            {leadsData.filter((l) => l.status === 'contactado').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
          <p className="text-gray-600 text-sm mb-1">Conversiones</p>
          <p className="text-3xl font-bold">
            {leadsData.filter((l) => l.status === 'convertido').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {['todos', 'nuevo', 'contactado', 'convertido'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
              selectedStatus === status
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 border'
            }`}
          >
            {status === 'todos' && 'Todos'}
            {status === 'nuevo' && 'Nuevos'}
            {status === 'contactado' && 'Contactados'}
            {status === 'convertido' && 'Conversiones'}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-sm">Nombre</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Email</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Teléfono</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Asunto</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Estado</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Fecha</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-semibold">{lead.name}</p>
                </td>
                <td className="px-6 py-4">
                  <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline text-sm">
                    {lead.email}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline text-sm">
                    {lead.phone}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm line-clamp-1">{lead.subject}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    lead.status === 'nuevo'
                      ? 'bg-blue-100 text-blue-800'
                      : lead.status === 'contactado'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {lead.status === 'nuevo' && 'Nuevo'}
                    {lead.status === 'contactado' && 'Contactado'}
                    {lead.status === 'convertido' && 'Conversion'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(lead.date).toLocaleDateString('es-CO')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-blue-100 text-blue-600 rounded" title="Ver detalle">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-100 text-red-600 rounded" title="Eliminar">
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
