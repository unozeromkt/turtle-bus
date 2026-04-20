'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FeaturedTourCard } from '@/components/tours/FeaturedTourCard'

interface Tour {
  id: string
  title: string
  slug: string
  price_adult: number
  duration: string
  featured_image: string | null
  is_featured: boolean
  destinations?: { name: string }
}

interface FeaturedToursCarouselProps {
  tours: Tour[]
  title?: string
  description?: string
}

const VISIBLE = 4 // cards visible at once on desktop

export function FeaturedToursCarousel({ tours, title = 'Tours Destacados', description = 'Los tours más populares con excelentes calificaciones.' }: FeaturedToursCarouselProps) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(tours.length / VISIBLE)
  const isFirst = page === 0
  const isLast  = page >= totalPages - 1

  const visibleTours = tours.slice(page * VISIBLE, page * VISIBLE + VISIBLE)

  const goNext = () => !isLast && setPage(p => p + 1)
  const goPrev = () => !isFirst && setPage(p => p - 1)

  return (
    <div className="relative">
      {/* Header con título, descripción y botones navegación */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div className="flex-1">
          <h2 className="text-5xl font-black mb-3 text-neutral-dark title-cabin">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            {description}
          </p>
        </div>

        {/* Buttons Navigation - Top Right */}
        <div className="flex gap-3 items-center">
          <motion.button
            onClick={goPrev}
            disabled={isFirst}
            whileHover={isFirst ? {} : { scale: 1.08 }}
            whileTap={isFirst ? {} : { scale: 0.95 }}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
              isFirst
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
            }`}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            onClick={goNext}
            disabled={isLast}
            whileHover={isLast ? {} : { scale: 1.08 }}
            whileTap={isLast ? {} : { scale: 0.95 }}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
              isLast
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
            }`}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>

      {/* Grid de cards con animación */}
      <div className="pt-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {visibleTours.map((tour, index) => (
              <FeaturedTourCard
                key={tour.id}
                id={tour.id}
                title={tour.title}
                slug={tour.slug}
                priceAdult={tour.price_adult}
                duration={tour.duration}
                destination={tour.destinations?.name || 'Destino'}
                featuredImage={
                  tour.featured_image ||
                  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop'
                }
                isFeatured={tour.is_featured}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles - Solo Dots */}
      <div className="flex items-center justify-center mt-12">
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`transition-all duration-300 rounded-full ${
                i === page
                  ? 'w-8 h-3 bg-accent-orange'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Página ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
