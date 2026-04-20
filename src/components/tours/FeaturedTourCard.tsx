'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

interface FeaturedTourCardProps {
  id: string
  title: string
  slug: string
  priceAdult: number
  duration: string
  destination: string
  featuredImage: string
  rating?: number
  isFeatured?: boolean
}

export function FeaturedTourCard({
  id,
  title,
  slug,
  priceAdult,
  duration,
  destination,
  featuredImage,
  rating = 4.8,
  isFeatured = false,
}: FeaturedTourCardProps) {
  return (
    <Link href={`/tours/${slug}`}>
      <motion.div
        className="group cursor-pointer h-full rounded-3xl shadow-lg"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-full h-auto overflow-hidden rounded-3xl flex flex-col bg-[#eae7df]">
          {/* Header Section */}
          <div className="flex flex-col justify-between px-6 py-6">
            {/* Destination - Top */}
            <p className="text-sm font-bold text-neutral-700 mb-4">
              📍 {destination}
            </p>
            
            {/* Title and Destination */}
            <div className="mb-4">
              <h3 className="font-black text-xl leading-tight text-neutral-900 mb-2">
                {title}
              </h3>
            </div>
            
            {/* Badges Row: Duration and Rating */}
            <div className="flex items-center gap-2">
              <div className="bg-white/90 backdrop-blur-sm px-3.5 py-2 rounded-full text-xs font-bold shadow-md text-neutral-900 flex items-center gap-1.5">
                <Clock size={14} />
                {duration}
              </div>
              <div className="bg-white/90 backdrop-blur-sm px-3.5 py-2 rounded-full text-xs font-bold shadow-md text-neutral-900 flex items-center gap-1">
                <span className="text-gold-500">⭐</span>
                {rating}
              </div>
            </div>
          </div>

          {/* Image Container with Overlay */}
          <div className="relative aspect-square overflow-hidden">
            {featuredImage ? (
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-full object-cover rounded-t-3xl transition-transform duration-500 ease-out"
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
                className="w-full h-full object-cover rounded-t-3xl"
              />
            )}

            {/* Gradient Overlay - More prominent at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-all duration-500" />

            {/* Clear Overlay on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-500" />

            {/* Price - Bottom Left */}
            <div className="absolute bottom-4 left-4 bg-accent-orange/85 text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-lg">
              ${priceAdult.toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
