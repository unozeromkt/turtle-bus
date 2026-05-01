'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Clock3, MapPin } from 'lucide-react'
import { useCurrency } from '@/components/currency/CurrencyProvider'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

interface FeaturedTour {
  id: string
  slug: string
  title: string
  description?: string | null
  price_adult: number
  duration: string
  featured_image?: string | null
  destinations?: { name?: string | null }
  categories?: { name?: string | null }
}

const TOURS_PER_PAGE = 3

export function HomeFeaturedToursGrid({ tours }: { tours: FeaturedTour[] }) {
  const { formatPrice } = useCurrency()
  const [page, setPage] = useState(0)

  const visibleTours = useMemo(() => tours.slice(0, 6), [tours])
  const totalPages = Math.max(1, Math.ceil(visibleTours.length / TOURS_PER_PAGE))
  const paginatedTours = visibleTours.slice(
    page * TOURS_PER_PAGE,
    page * TOURS_PER_PAGE + TOURS_PER_PAGE
  )

  const goNext = () => setPage((current) => (current + 1) % totalPages)
  const goPrev = () => setPage((current) => (current - 1 + totalPages) % totalPages)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={goPrev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7cbb8] bg-white text-neutral-dark transition-colors hover:border-primary-600 hover:text-primary-600"
          aria-label="Tours favoritos anteriores"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7cbb8] bg-white text-neutral-dark transition-colors hover:border-primary-600 hover:text-primary-600"
          aria-label="Siguientes tours favoritos"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {paginatedTours.map((tour, index) => (
            <AnimateOnScroll key={tour.id} variant="fadeUp" delay={index * 0.08}>
              <Link href={`/tours/${tour.slug}`}>
                <div className="group h-full rounded-[28px] overflow-hidden border border-[#e5ddd0] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <img
                      src={tour.featured_image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop'}
                      alt={tour.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-wide text-neutral-dark shadow-md">
                      {tour.categories?.name || 'Tour'}
                    </div>
                    <div className="absolute bottom-4 right-4 rounded-xl bg-primary-600 px-4 py-2 text-sm font-black text-white shadow-lg">
                      {formatPrice(tour.price_adult)}
                    </div>
                  </div>

                  <div className="p-5 flex h-[calc(100%-0px)] flex-col">
                    <h3 className="text-xl font-black leading-snug text-neutral-dark group-hover:text-primary-600 transition-colors line-clamp-2">
                      {tour.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-3">
                      {tour.description || 'Experiencia destacada con logística simple, buena reputación y salida directa desde la home.'}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-sm">
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#f6f1e8] px-3 py-2 font-semibold text-neutral-dark">
                        <MapPin size={15} className="text-primary-600" />
                        {tour.destinations?.name || 'Destino'}
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#f6f1e8] px-3 py-2 font-semibold text-neutral-dark">
                        <Clock3 size={15} className="text-accent-orange" />
                        {tour.duration}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#eee5d8] flex items-center justify-end">
                      <span className="inline-flex items-center gap-2 text-sm font-black text-primary-700">
                        Ver experiencia
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index)}
              aria-label={`Ir a la página ${index + 1} de tours favoritos`}
              className={`rounded-full transition-all duration-300 ${
                index === page ? 'h-3 w-7 bg-accent-orange' : 'h-3 w-3 bg-[#d7cbb8] hover:bg-[#c7b79d]'
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}