'use client'

import Link from 'next/link'
import { ArrowRight, Clock3, MapPin } from 'lucide-react'
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

export function HomeFeaturedToursGrid({ tours }: { tours: FeaturedTour[] }) {
  const { formatPrice } = useCurrency()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {tours.slice(0, 4).map((tour, index) => (
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
    </div>
  )
}