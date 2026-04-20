import { Star } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  id: string
  name: string
  content: string
  rating: number
  image?: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string
}

export function TestimonialsSection({ testimonials, title = 'Lo que dicen nuestros viajeros' }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">⭐ {title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Rating Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  size={18}
                  className={idx < testimonial.rating ? 'fill-gold-500 text-gold-500' : 'text-gray-300'}
                />
              ))}
            </div>

            {/* Testimonial Content */}
            <p className="text-gray-700 mb-6 leading-relaxed italic">
              "{testimonial.content}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t">
              {testimonial.image && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Testimonials CTA */}
      {testimonials.length > 0 && (
        <div className="text-center mt-8">
          <a
            href="#testimonials"
            className="text-primary-600 font-semibold hover:text-primary-700"
          >
            Ver todos los testimonios →
          </a>
        </div>
      )}
    </section>
  )
}
