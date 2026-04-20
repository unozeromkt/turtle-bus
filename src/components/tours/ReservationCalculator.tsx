import { useState } from 'react'
import { Calendar, Users, Baby } from 'lucide-react'

interface ReservationCalculatorProps {
  priceAdult: number
  priceChild?: number
  onReservationChange?: (data: ReservationData) => void
}

export interface ReservationData {
  selectedDate: string | null
  adults: number
  children: number
  totalPrice: number
}

export function ReservationCalculator({
  priceAdult,
  priceChild = priceAdult * 0.7, // 30% descuento para niños por defecto
  onReservationChange,
}: ReservationCalculatorProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)

  // Calcular precio total
  const totalPrice = adults * priceAdult + children * priceChild

  // Llamar callback cuando cambia algo
  const updateReservation = (newDate: string | null, newAdults: number, newChildren: number) => {
    const newTotal = newAdults * priceAdult + newChildren * priceChild
    onReservationChange?.({
      selectedDate: newDate,
      adults: newAdults,
      children: newChildren,
      totalPrice: newTotal,
    })
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setSelectedDate(newDate)
    updateReservation(newDate, adults, children)
  }

  const handleAdultsChange = (newAdults: number) => {
    if (newAdults >= 1 && newAdults <= 20) {
      setAdults(newAdults)
      updateReservation(selectedDate, newAdults, children)
    }
  }

  const handleChildrenChange = (newChildren: number) => {
    if (newChildren >= 0 && newChildren <= 20) {
      setChildren(newChildren)
      updateReservation(selectedDate, adults, newChildren)
    }
  }

  // Obtener fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <label className="block text-sm font-bold text-neutral-dark mb-2">
          <Calendar className="inline mr-2 text-primary-600" size={18} />
          Fecha del Tour
        </label>
        <input
          type="date"
          value={selectedDate || ''}
          onChange={handleDateChange}
          min={today}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none font-semibold"
          required
        />
      </div>

      {/* Participants Selection */}
      <div className="grid grid-cols-2 gap-4">
        {/* Adults */}
        <div>
          <label className="block text-sm font-bold text-neutral-dark mb-2">
            <Users className="inline mr-2 text-primary-600" size={18} />
            Adultos
          </label>
          <div className="flex items-center border-2 border-gray-300 rounded-lg">
            <button
              onClick={() => handleAdultsChange(adults - 1)}
              className="px-3 py-2 text-primary-600 font-bold hover:bg-gray-100"
            >
              −
            </button>
            <input
              type="number"
              value={adults}
              onChange={(e) => handleAdultsChange(Number(e.target.value))}
              className="flex-1 text-center py-2 font-bold border-l-2 border-r-2 border-gray-300 focus:outline-none"
              min="1"
              max="20"
            />
            <button
              onClick={() => handleAdultsChange(adults + 1)}
              className="px-3 py-2 text-primary-600 font-bold hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">${priceAdult.toLocaleString()} c/u</p>
        </div>

        {/* Children */}
        <div>
          <label className="block text-sm font-bold text-neutral-dark mb-2">
            <Baby className="inline mr-2 text-accent-orange" size={18} />
            Niños (0-12 años)
          </label>
          <div className="flex items-center border-2 border-gray-300 rounded-lg">
            <button
              onClick={() => handleChildrenChange(children - 1)}
              className="px-3 py-2 text-accent-orange font-bold hover:bg-gray-100"
            >
              −
            </button>
            <input
              type="number"
              value={children}
              onChange={(e) => handleChildrenChange(Number(e.target.value))}
              className="flex-1 text-center py-2 font-bold border-l-2 border-r-2 border-gray-300 focus:outline-none"
              min="0"
              max="20"
            />
            <button
              onClick={() => handleChildrenChange(children + 1)}
              className="px-3 py-2 text-accent-orange font-bold hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">${priceChild.toLocaleString()} c/u</p>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-4 rounded-lg border-2 border-primary-200">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Adultos: {adults} × ${priceAdult.toLocaleString()}</span>
            <span className="font-bold">${(adults * priceAdult).toLocaleString()}</span>
          </div>
          {children > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Niños: {children} × ${priceChild.toLocaleString()}</span>
              <span className="font-bold">${(children * priceChild).toLocaleString()}</span>
            </div>
          )}
          <div className="border-t-2 border-primary-300 pt-2 flex justify-between">
            <span className="font-bold text-neutral-dark">Total:</span>
            <span className="text-2xl font-black text-primary-600">${totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Reservation Button */}
      <button
        disabled={!selectedDate}
        className="w-full bg-accent-orange text-white font-black py-4 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
      >
        Continuar a Reserva
      </button>
    </div>
  )
}
