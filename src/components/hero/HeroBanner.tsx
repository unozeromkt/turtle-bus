'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface HeroBannerProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  cta?: {
    text: string
    href: string
  }
}

export function HeroBanner({
  title,
  subtitle,
  backgroundImage = 'images/banner-turtle.jpg',
  cta,
}: HeroBannerProps) {
  return (
    <div
      className="relative w-full h-96 flex items-center justify-center mt-16 bg-black"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))`,
      }}
    >
      <div className="text-center text-white px-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 title-cabin">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-gray-100 mb-6">{subtitle}</p>}
        {cta && (
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 btn btn-secondary"
          >
            {cta.text}
            <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </div>
  )
}
