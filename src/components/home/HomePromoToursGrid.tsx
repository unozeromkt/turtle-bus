'use client'

import Link from 'next/link'
import { ArrowRight, MapPin, Tag } from 'lucide-react'
import { useCurrency } from '@/components/currency/CurrencyProvider'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

interface PromotedTour {
  id: string
  slug: string
  title: string
  description?: string | null
  duration: string
  featured_image?: string | null
  promo_original_price_adult: number
  promo_price_adult: number
  destinations?: { name?: string | null }
  categories?: { name?: string | null }
}

export function HomePromoToursGrid({ tours }: { tours: PromotedTour[] }) {
  const { formatPrice } = useCurrency()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {tours.slice(0, 4).map((tour, index) => (
        <AnimateOnScroll key={tour.id} variant="fadeUp" delay={index * 0.08}>
          <Link href={`/tours/${tour.slug}`}>
            <div className="group h-full overflow-hidden rounded-[30px] border border-[#f3d7a5] bg-[linear-gradient(180deg,#fff9ef_0%,#fff2d9_100%)] shadow-[0_18px_50px_rgba(209,124,42,0.18)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(209,124,42,0.24)]">
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={tour.featured_image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop'}
                  alt={tour.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d2208]/75 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#b45309] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg">
                  <Tag size={13} />
                  Promo
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-wide text-neutral-dark shadow-md">
                  {tour.categories?.name || 'Tour'}
                </div>
              </div>

              <div className="p-5 flex flex-col">
                <h3 className="text-xl font-black leading-snug text-neutral-dark group-hover:text-[#8b4a16] transition-colors line-clamp-2">
                  {tour.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 font-semibold text-neutral-dark">
                    <MapPin size={15} className="text-primary-600" />
                    {tour.destinations?.name || 'Destino'}
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-white/85 p-4 border border-[#f1d7b2]">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b4a16]">Precio promoción</p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-sm text-gray-500 line-through">{formatPrice(tour.promo_original_price_adult)}</p>
                      <p className="text-2xl font-black text-[#b45309]">{formatPrice(tour.promo_price_adult)}</p>
                    </div>
                    <span className="rounded-full bg-[#1f4c43] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                      Oferta
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-1 flex justify-end">
                  <span className="inline-flex items-center gap-2 text-sm font-black text-[#8b4a16]">
                    Ver promoción
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