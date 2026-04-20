'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'

const marqueeImages = [
  '/images/home-carrousel/10compress.jpg',
  '/images/home-carrousel/14compress.jpg',
  '/images/home-carrousel/15compress.jpg',
  '/images/home-carrousel/19compress.jpg',
  '/images/home-carrousel/22compress.jpg',
  '/images/home-carrousel/24compress.jpg',
  '/images/home-carrousel/28compress.jpg',
  '/images/home-carrousel/30compress.jpg',
  '/images/home-carrousel/32compress.jpg',
  '/images/home-carrousel/34compress.jpg',
  '/images/home-carrousel/48compress.jpg',
  '/images/home-carrousel/56compress.jpg',
  '/images/home-carrousel/70compress.jpg',
  '/images/home-carrousel/71compress.jpg',
  '/images/home-carrousel/72compress.jpg',
  '/images/home-carrousel/87compress.jpg',
  '/images/home-carrousel/90compress.jpg',
  '/images/home-carrousel/99compress.jpg',
]

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' as const } },
}

export function HomeHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <div
      ref={heroRef}
      className="relative w-full h-[120vh] overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 w-full"
        style={{ y: imageY, height: '130%', top: '-15%' }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/hero-bg.jpg')`,
          }}
        />
      </motion.div>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800/70 via-primary-600/40 to-accent-orange/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

      {/* Diagonal adventure texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 12px)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto -mt-10"
        style={{ opacity: contentOpacity }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Eyebrow tag */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2">
            <Sparkles size={18} className="text-gold-500" />
            <span className="text-gold-500 font-black text-lg tracking-wide uppercase">
              Descubre experiencias únicas
            </span>
            <Sparkles size={18} className="text-gold-500" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl font-black leading-none text-white drop-shadow-2xl title-cabin"
          >
            Vive{' '}
            <span className="text-gold-500">
              aventuras
            </span>{' '}
            increíbles
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl text-gray-100 drop-shadow-md font-semibold max-w-2xl mx-auto"
          >
            Tours de paragliding, naturaleza y cultura en Medellín y Guatapé
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/tours"
                className="inline-flex items-center justify-center gap-2 bg-accent-orange text-white font-black py-4 px-8 rounded-xl text-lg shadow-2xl hover:bg-orange-600 transition-colors"
              >
                Explorar Tours
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Image Marquee Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden z-10">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black/70 to-transparent z-10 pointer-events-none" />
        {/* Framer Motion track — moves left infinitely */}
        <motion.div
          className="flex gap-4 absolute top-0 left-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        >
          {[...marqueeImages, ...marqueeImages].map((src, i) => (
            <div
              key={i}
              className="relative h-64 w-48 shrink-0 rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={src}
                fill
                alt=""
                className="object-cover"
                sizes="192px"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom diagonal cut */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-white"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 50%, 0 100%)' }}
      />
    </div>
  )
}
