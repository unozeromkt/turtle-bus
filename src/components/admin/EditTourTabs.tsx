'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Eye } from 'lucide-react'
import TourForm from '@/app/admin/tours/form'
import { FAQsTab } from '@/components/admin/FAQsTab'
import { TestimonialsTab } from '@/components/admin/TestimonialsTab'
import { ItineraryTab } from '@/components/admin/ItineraryTab'
import { IncludesExcludesTab } from '@/components/admin/IncludesExcludesTab'

type TabType = 'general' | 'faqs' | 'testimonials' | 'itinerary' | 'includes' | 'availabilities' | 'media'

interface EditPageProps {
  initialData: any
}

export function EditTourTabs({ initialData }: EditPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('general')
  const tourId = initialData?.id as string
  const tourSlug = initialData?.slug as string

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'general', label: 'Información General', icon: '📋' },
    { id: 'itinerary', label: 'Itinerario', icon: '📍' },
    { id: 'includes', label: 'Incluye / Excluye', icon: '✓✗' },
    { id: 'faqs', label: 'FAQs', icon: '❓' },
    { id: 'testimonials', label: 'Testimonios', icon: '⭐' },
    { id: 'availabilities', label: 'Disponibilidades', icon: '📅' },
    { id: 'media', label: 'Imágenes y Video', icon: '📸' },
  ]

  return (
    <div className="space-y-6">
      {/* Header with Preview Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{initialData?.title}</h1>
        {tourSlug && (
          <a
            href={`/tours/${tourSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Eye size={20} />
            Previsualizar Tour
          </a>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md border-b">
        <div className="flex flex-wrap gap-0 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-3 font-medium transition-colors flex items-center gap-2 rounded
                ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'general' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Información General del Tour</h2>
            <TourForm initialData={initialData} tourId={tourId} isEditing={true} />
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Itinerario</h2>
            <ItineraryTab tourId={tourId} initialItinerary={initialData?.itinerary} />
          </div>
        )}

        {activeTab === 'includes' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Incluye / Excluye</h2>
            <IncludesExcludesTab 
              tourId={tourId} 
              initialIncludes={initialData?.includes}
              initialExcludes={initialData?.excludes}
            />
          </div>
        )}

        {activeTab === 'faqs' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h2>
            <FAQsTab tourId={tourId} tourTitle={initialData?.title || 'Tour'} />
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Testimonios de Clientes</h2>
            <TestimonialsTab tourId={tourId} tourTitle={initialData?.title || 'Tour'} />
          </div>
        )}

        {activeTab === 'availabilities' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Disponibilidades</h2>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded text-yellow-700 text-center">
              Próximamente: Gestiona las disponibilidades y horarios
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Imágenes y Video</h2>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded text-blue-700 text-center">
              Las imágenes se gestionan desde la sección "Información General"
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
