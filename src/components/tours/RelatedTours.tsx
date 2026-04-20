'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TourCard } from './TourCard'

interface RelatedToursProps {
  tours: any[]
}

export function RelatedTours({ tours }: RelatedToursProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!tours || tours.length === 0) {
    return null
  }

  const itemsPerPage = 3
  const totalPages = Math.ceil(tours.length / itemsPerPage)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const startIndex = currentIndex * itemsPerPage
  const visibleTours = tours.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-4xl font-black text-neutral-dark mb-2">Tours Relacionados</h2>
            <p className="text-gray-600">Explora otras experiencias en el mismo destino</p>
          </div>
          
          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary-600 hover:bg-primary-50 transition-colors"
              aria-label="Tours anteriores"
            >
              <ChevronLeft size={20} className="text-primary-600" />
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary-600 hover:bg-primary-50 transition-colors"
              aria-label="Siguiente tours"
            >
              <ChevronRight size={20} className="text-primary-600" />
            </button>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTours.map((tour) => (
            <TourCard
              key={tour.id}
              id={tour.id}
              title={tour.title}
              slug={tour.slug}
              priceAdult={tour.price_adult}
              duration={tour.duration}
              destination={tour.destinations?.name || 'Destino'}
              featuredImage={tour.featured_image}
              isFeatured={tour.is_featured}
            />
          ))}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir a página ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
