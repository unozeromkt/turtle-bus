'use client'

import { MapPin, Clock } from 'lucide-react'

interface ItineraryItem {
  time?: string
  title: string
  description: string
}

interface ItinerarySectionProps {
  itinerary?: ItineraryItem[] | null
}

export function ItinerarySection({ itinerary }: ItinerarySectionProps) {
  if (!itinerary || itinerary.length === 0) {
    return null
  }

  // Ensure itinerary is an array and has valid items
  const items = Array.isArray(itinerary) ? itinerary.filter(item => item && item.title) : []
  if (items.length === 0) return null

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-black text-neutral-dark border-l-4 border-accent-orange pl-4">
        📍 Itinerario del Día
      </h2>

      {/* Timeline */}
      <div className="space-y-6">
        {items.map((step, index) => (
          <div key={index} className="flex gap-6">
            {/* Timeline marker */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {index + 1}
              </div>
              {index < items.length - 1 && (
                <div className="w-1 bg-gradient-to-b from-primary-600 to-transparent h-20 mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-4">
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap gap-4 items-start justify-between mb-3">
                  <h3 className="text-xl font-black text-neutral-dark">{step.title}</h3>
                  {step.time && (
                    <div className="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-lg">
                      <Clock size={18} className="text-primary-600" />
                      <span className="text-sm font-semibold text-primary-700">{step.time}</span>
                    </div>
                  )}
                </div>
                {step.description && (
                  <p className="text-gray-700 leading-relaxed">{step.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
