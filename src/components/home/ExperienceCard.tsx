'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ExperienceCardProps {
  name: string
  slug: string
  description: string
  icon: ReactNode
  backgroundImage: string
}

export function ExperienceCard({
  name,
  slug,
  description,
  icon,
  backgroundImage,
}: ExperienceCardProps) {
  return (
    <Link href={`/tours?category=${slug}`}>
      <motion.div
        className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background Image with Zoom Effect */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Overlay Gradient - Dark at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60 group-hover:from-black/40 group-hover:via-black/50 group-hover:to-black/70 transition-all duration-500" />

        {/* Content Container */}
        <div className="relative h-full flex flex-col items-center justify-between p-8">
          {/* Top Area - Icon (appears on hover) */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {icon}
          </div>

          {/* Center Area - Flexible Spacer */}
          <div className="flex-1" />

          {/* Bottom Area - Title and Description */}
          <div className="w-full text-center space-y-3">
            {/* Title - Always Visible */}
            <h3 className="text-4xl font-black text-white drop-shadow-lg title-cabin">
              {name}
            </h3>

            {/* Description - Appears on Hover */}
            <p className="text-lg font-semibold text-white/0 group-hover:text-white/100 transition-all duration-500 delay-200 drop-shadow-md line-clamp-2">
              {description}
            </p>

            {/* Underline indicator */}
            <div className="h-1 w-0 group-hover:w-16 bg-gold-500 mx-auto transition-all duration-500 delay-300 rounded-full" />
          </div>
        </div>

        {/* Hover Badge Effect */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
          <div className="bg-gold-500 text-neutral-dark font-black py-1 px-3 rounded-full text-sm">
            Explorar
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
