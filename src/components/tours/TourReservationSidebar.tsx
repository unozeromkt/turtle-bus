'use client'

import { useState } from 'react'
import Calendar from 'react-calendar'
import { Calendar as CalendarIcon, Users, Baby, CheckCircle2 } from 'lucide-react'
import 'react-calendar/dist/Calendar.css'

interface TourReservationSidebarProps {
  tourTitle: string
  priceAdult: number
  priceChild?: number
}

export function TourReservationSidebar({
  tourTitle,
  priceAdult,
  priceChild = priceAdult * 0.7,
}: TourReservationSidebarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [showCalendar, setShowCalendar] = useState(false)

  const totalPrice = adults * priceAdult + children * priceChild

  const handleReserve = () => {
    if (selectedDate) {
      // Construir mensaje con tour, fecha, adultos y niños
      const message = `Hola, quiero reservar ${tourTitle} para ${selectedDate.toLocaleDateString('es-CO')} con ${adults} adulto${adults > 1 ? 's' : ''}${children > 0 ? ` y ${children} niño${children > 1 ? 's' : ''}` : ''}`
      const encodedMessage = encodeURIComponent(message)
      window.location.href = `https://wa.me/573001234567?text=${encodedMessage}`
    }
  }

  const benefits = [
    { icon: true, text: 'Cancelación gratuita', subtext: 'Reembolso íntegro si cancelas con 24 horas de antelación' },
    { icon: true, text: 'Reservar ahora y pagar después', subtext: 'Planes flexibles: reserva tu plaza de inmediato, sin que se te haga el cargo hoy' },
  ]

  return (
    <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6 border border-gray-100 space-y-6 hidden lg:block">
      {/* Price Section */}
      <div>
        <p className="text-sm text-gray-500 mb-1">Desde</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-neutral-dark">${priceAdult.toLocaleString()}</span>
          <span className="text-sm text-gray-600">por persona</span>
        </div>
      </div>

      {/* Adults/Children Selection */}
      <div className="space-y-3">
        {/* Adults */}
        <div>
          <label className="text-sm font-semibold text-neutral-dark mb-2 flex items-center gap-2">
            <Users size={16} className="text-primary-600" />
            Adultos
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="px-3 py-2 text-primary-600 font-bold hover:bg-gray-100"
            >
              −
            </button>
            <span className="flex-1 text-center font-bold py-2">{adults}</span>
            <button
              onClick={() => setAdults(Math.min(20, adults + 1))}
              className="px-3 py-2 text-primary-600 font-bold hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Children */}
        <div>
          <label className="text-sm font-semibold text-neutral-dark mb-2 flex items-center gap-2">
            <Baby size={16} className="text-accent-orange" />
            Niños (0-12)
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setChildren(Math.max(0, children - 1))}
              className="px-3 py-2 text-accent-orange font-bold hover:bg-gray-100"
            >
              −
            </button>
            <span className="flex-1 text-center font-bold py-2">{children}</span>
            <button
              onClick={() => setChildren(Math.min(20, children + 1))}
              className="px-3 py-2 text-accent-orange font-bold hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between font-semibold text-left"
        >
          <span className="flex items-center gap-2">
            <CalendarIcon size={18} className="text-primary-600" />
            {selectedDate ? selectedDate.toLocaleDateString('es-CO') : 'Seleccionar fecha'}
          </span>
          <span className="text-gray-400">▼</span>
        </button>

        {/* Calendar Popup */}
        {showCalendar && (
          <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-xl p-4 z-50">
            <Calendar
              onChange={(date: any) => {
                setSelectedDate(date)
                setShowCalendar(false)
              }}
              value={selectedDate}
              minDate={new Date()}
              className="react-calendar-custom"
            />
          </div>
        )}
      </div>

      {/* Total Price */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex justify-between items-end">
          <span className="text-sm font-semibold text-gray-600">Total:</span>
          <span className="text-2xl font-black text-primary-600">${totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Reserve Button */}
      <button
        onClick={handleReserve}
        disabled={!selectedDate}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black py-3 rounded-lg transition-colors"
      >
        Ver disponibilidad
      </button>

      {/* Benefits */}
      <div className="space-y-3 border-t pt-4">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="flex gap-3">
            <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-neutral-dark">{benefit.text}</p>
              <p className="text-xs text-gray-600 mt-0.5">{benefit.subtext}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
