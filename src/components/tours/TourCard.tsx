'use client'

import Link from 'next/link'
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface TourCardProps {
  id: string
  title: string
  slug: string
  priceAdult: number
  duration: string
  destination: string
  featuredImage: string
  rating?: number
  reviewCount?: number
  isFeatured?: boolean
}

export function TourCard({
  id,
  title,
  slug,
  priceAdult,
  duration,
  destination,
  featuredImage,
  rating = 4.8,
  reviewCount = 128,
  isFeatured = false,
}: TourCardProps) {
  return (
    <Link href={`/tours/${slug}`}>
      <motion.div
        className="group cursor-pointer h-full rounded-xl overflow-hidden shadow-md"
        whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.18)' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Image Container with Overlay */}
        <div className="relative w-full h-64 overflow-hidden rounded-xl">
          {featuredImage ? (
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              onError={(e) => {
                console.warn('❌ Error cargando imagen:', featuredImage)
                e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop'
              }}
              onLoad={() => console.log('✅ Imagen cargada:', slug)}
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop"
              alt={title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {isFeatured && (
              <div className="bg-accent-orange text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg tracking-wider uppercase">
                Premium
              </div>
            )}
          </div>

          {/* Rating Badge - Bottom Left */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(rating) ? 'fill-gold-500 text-gold-500' : 'text-gray-300'} />
              ))}
            </div>
            <span className="text-sm font-bold text-neutral-dark">{rating}</span>
          </div>

          {/* Price - Bottom Right */}
          <div className="absolute bottom-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
            ${priceAdult.toLocaleString()}
          </div>
        </div>

        {/* Content - Below Image */}
        <div className="p-4 bg-white">
          {/* Title */}
          <h3 className="font-black text-lg mb-3 line-clamp-2 text-neutral-dark group-hover:text-primary-600 transition">
            {title}
          </h3>

          {/* Info Row */}
          <div className="space-y-2 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary-600 flex-shrink-0" />
              <span className="font-semibold text-neutral-dark">{destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary-600 flex-shrink-0" />
              <span>{duration}</span>
            </div>
          </div>

          {/* Reviews Count */}
          <p className="text-xs text-gray-500 mb-4">{reviewCount} reseñas verificadas</p>

          {/* CTA Button */}
          <motion.button
            className="w-full bg-accent-orange text-white text-sm font-black py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors duration-300 tracking-wider uppercase"
            whileTap={{ scale: 0.97 }}
          >
            Ver Experiencia
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </Link>
  )
}
