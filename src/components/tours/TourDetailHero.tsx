'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Star, MapPin, Clock, ChevronDown } from 'lucide-react'

interface TourDetailHeroProps {
  title: string
  featuredImage: string | null
  category: string
  destination: string
  duration: string
  rating?: number
  reviewCount?: number
}

export function TourDetailHero({
  title,
  featuredImage,
  category,
  destination,
  duration,
  rating = 4.8,
  reviewCount = 15,
}: TourDetailHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: image moves up slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  // Fade out content as user scrolls down
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-20%'])

  const fallbackImage =
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'

  return (
    <div
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ height: 'min(90vh, 680px)' }}
    >
      {/* Parallax image */}
      <motion.div
        className="absolute inset-0 w-full"
        style={{ y: imageY, height: '130%', top: '-15%' }}
      >
        <img
          src={featuredImage || fallbackImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Adventure texture overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px)',
        }}
      />

      {/* Hero Content */}
      <motion.div
        className="relative h-full flex flex-col justify-end pb-12 px-6 md:px-12 max-w-6xl mx-auto"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Category badge */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 bg-accent-orange text-white px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider shadow-lg">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-xl title-cabin"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>

        {/* Meta info row */}
        <motion.div
          className="flex flex-wrap gap-4 items-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Rating */}
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < Math.floor(rating) ? 'fill-gold-500 text-gold-500' : 'text-white/40'}
                />
              ))}
            </div>
            <span className="text-white font-bold text-sm">{rating}</span>
            <span className="text-white/70 text-sm">({reviewCount}+ reviews)</span>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <MapPin size={14} className="text-gold-500" />
            <span className="text-white text-sm font-semibold">{destination}</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <Clock size={14} className="text-gold-500" />
            <span className="text-white text-sm font-semibold">{duration}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ opacity: contentOpacity }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>

      {/* Bottom diagonal cut for adventure aesthetic */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: 'white',
          clipPath: 'polygon(0 100%, 100% 100%, 100% 60%, 0 100%)',
        }}
      />
    </div>
  )
}
