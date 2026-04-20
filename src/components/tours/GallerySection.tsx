'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface GallerySectionProps {
  images: string[]
  title?: string
}

export function GallerySection({ images, title = 'Galería de imágenes' }: GallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === null ? images.length - 1 : prev === 0 ? images.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : prev === images.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">📸 {title}</h2>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="relative h-40 cursor-pointer rounded-lg overflow-hidden group"
          >
            <Image
              src={image}
              alt={`Galería ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Modal Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIndex(null)
            }}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full"
          >
            <X size={28} />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            className="absolute left-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="relative w-full max-w-4xl max-h-[80vh]">
            <Image
              src={images[selectedIndex]}
              alt={`Galería ${selectedIndex + 1}`}
              width={1200}
              height={800}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="absolute right-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  )
}
