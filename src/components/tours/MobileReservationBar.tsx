'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useCurrency } from '@/components/currency/CurrencyProvider'
import { TourReservationSidebar } from '@/components/tours/TourReservationSidebar'

interface MobileReservationBarProps {
  tourTitle: string
  priceAdult: number
  priceChild?: number | null
}

export function MobileReservationBar({
  tourTitle,
  priceAdult,
  priceChild,
}: MobileReservationBarProps) {
  const { formatPrice } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div
        className={`border-t border-black/10 bg-white/96 backdrop-blur-xl shadow-[0_-12px_30px_rgba(15,23,42,0.16)] transition-all duration-300 ${
          isOpen ? 'rounded-t-[28px]' : ''
        }`}
      >
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
            isOpen ? 'max-h-[78vh]' : 'max-h-0'
          }`}
          id="mobile-reservation-panel"
        >
          <div className="max-h-[calc(78vh-88px)] overflow-y-auto px-4 pb-4 pt-4">
            <TourReservationSidebar
              tourTitle={tourTitle}
              priceAdult={priceAdult}
              priceChild={priceChild ?? undefined}
              className="block space-y-6 rounded-[24px] border border-gray-100 bg-white p-5 shadow-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-500">Desde</p>
            <div className="flex items-baseline gap-2">
              <span className="truncate text-2xl font-black text-neutral-dark">{formatPrice(priceAdult)}</span>
              <span className="text-sm text-gray-600">p/p</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex items-center gap-2 rounded-2xl bg-accent-orange px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg transition-colors hover:bg-orange-600"
            aria-expanded={isOpen}
            aria-controls="mobile-reservation-panel"
          >
            {isOpen ? 'Cerrar reserva' : 'Reservar'}
            {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
      </div>
    </div>
  )
}