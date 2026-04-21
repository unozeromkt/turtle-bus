'use client'

import { useState } from 'react'
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react'

interface Availability {
  id: string
  date: string
  startTime: string
  endTime: string
  maxSpots: number
  bookedSpots: number
}

interface AvailabilityCheckerProps {
  tourId: string
  availabilities?: Availability[]
  onAvailabilitySelect?: (availability: Availability) => void
}

// Helper function to get date string in YYYY-MM-DD format
function getDateString(daysOffset: number = 0): string {
  const date = new Date(Date.now() + 86400000 * daysOffset)
  const isoString = date.toISOString()
  const parts = isoString.split('T')
  return parts[0] || new Date().toISOString().split('T')[0] || '2024-01-01'
}

export function AvailabilityChecker({
  tourId,
  availabilities = [
    {
      id: '1',
      date: getDateString(1),
      startTime: '09:00',
      endTime: '12:00',
      maxSpots: 8,
      bookedSpots: 2,
    },
    {
      id: '2',
      date: getDateString(2),
      startTime: '14:00',
      endTime: '17:00',
      maxSpots: 8,
      bookedSpots: 5,
    },
    {
      id: '3',
      date: getDateString(3),
      startTime: '09:00',
      endTime: '12:00',
      maxSpots: 8,
      bookedSpots: 0,
    },
  ],
  onAvailabilitySelect,
}: AvailabilityCheckerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const getAvailabilityStatus = (booked: number, max: number) => {
    const available = max - booked
    if (available === 0) return { status: 'full', label: 'Lleno', color: 'bg-red-100 border-red-300' }
    if (available <= 2) return { status: 'limited', label: 'Pocas disponibles', color: 'bg-yellow-100 border-yellow-300' }
    return { status: 'available', label: 'Disponible', color: 'bg-green-100 border-green-300' }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    return new Intl.DateTimeFormat('es-CO', { weekday: 'long', month: 'long', day: 'numeric' }).format(date)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Calendar size={24} className="text-primary-600" />
        <h3 className="text-xl font-black text-neutral-dark">Fechas Disponibles</h3>
      </div>

      {availabilities.length === 0 ? (
        <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-lg flex gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
          <div>
            <p className="font-bold text-yellow-900">No hay fechas disponibles</p>
            <p className="text-yellow-800 text-sm">Por favor, contacta por WhatsApp para consultar fechas futuras.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {availabilities.map((availability) => {
            const { status, label, color } = getAvailabilityStatus(
              availability.bookedSpots,
              availability.maxSpots
            )
            const spotsLeft = availability.maxSpots - availability.bookedSpots
            const isSelectable = status !== 'full'

            return (
              <button
                key={availability.id}
                onClick={() => {
                  if (isSelectable) {
                    setSelectedId(selectedId === availability.id ? null : availability.id)
                    onAvailabilitySelect?.(availability)
                  }
                }}
                disabled={!isSelectable}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedId === availability.id
                    ? 'border-primary-600 bg-primary-50 shadow-md'
                    : color + ' hover:shadow-md'
                } ${!isSelectable && 'opacity-50 cursor-not-allowed'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left flex-1">
                    <p className="font-black text-lg text-neutral-dark capitalize">
                      {formatDate(availability.date)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {availability.startTime} - {availability.endTime}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-neutral-dark text-sm">
                        {spotsLeft} {spotsLeft === 1 ? 'lugar' : 'lugares'}
                      </p>
                      <p className="text-xs text-gray-500">de {availability.maxSpots}</p>
                    </div>

                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${'bg-' + status}`}>
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="text-xs font-bold text-gray-700">{label}</span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
