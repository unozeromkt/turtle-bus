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
      className="relative flex min-h-[24rem] w-full items-center justify-center bg-black px-4 pt-28 md:min-h-[28rem] md:pt-32"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-2xl text-center text-white">
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
