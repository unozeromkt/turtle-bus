'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const galleryImages = [
  '/images/home-carrousel/10compress.jpg',
  '/images/home-carrousel/14compress.jpg',
  '/images/home-carrousel/19compress.jpg',
  '/images/home-carrousel/22compress.jpg',
  '/images/home-carrousel/28compress.jpg',
  '/images/home-carrousel/30compress.jpg',
  '/images/home-carrousel/34compress.jpg',
  '/images/home-carrousel/48compress.jpg',
  '/images/home-carrousel/56compress.jpg',
  '/images/home-carrousel/70compress.jpg',
  '/images/home-carrousel/87compress.jpg',
  '/images/home-carrousel/99compress.jpg',
]

export function AdventureGallery() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-[0.18em] uppercase text-neutral-dark title-cabin">
          Adventure Gallery
        </h2>
      </div>

      {/* Infinite scroll strip */}
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {[...galleryImages, ...galleryImages].map((src, i) => (
            <div
              key={i}
              className="relative h-52 w-52 shrink-0 rounded-2xl overflow-hidden shadow-md"
            >
              <Image
                src={src}
                alt="Turtle Bus adventure"
                fill
                sizes="208px"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
