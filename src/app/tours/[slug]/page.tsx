'use server'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { VideoSection } from '@/components/tours/VideoSection'
import { GallerySection } from '@/components/tours/GallerySection'
import { TestimonialsSection } from '@/components/tours/TestimonialsSection'
import { TourReservationSidebar } from '@/components/tours/TourReservationSidebar'
import { TourDetailHero } from '@/components/tours/TourDetailHero'
import { ItinerarySection } from '@/components/tours/ItinerarySection'
import { IncludesSection } from '@/components/tours/IncludesSection'
import { ExcludesSection } from '@/components/tours/ExcludesSection'
import { RelatedTours } from '@/components/tours/RelatedTours'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { getTourBySlug, getRelatedTours } from '@/lib/db/tours'
import { notFound } from 'next/navigation'
import { MessageCircle } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function TourDetail({ params }: Props) {
  const { slug } = await params

  let tour
  let relatedTours = []
  try {
    tour = await getTourBySlug(slug)
    // Obtener tours relacionados del mismo destino
    if (tour?.destination_id) {
      relatedTours = await getRelatedTours(tour.destination_id, tour.id, 6)
    }
  } catch (error) {
    notFound()
  }

  if (!tour) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Cinematic Hero */}
      <TourDetailHero
        title={tour.title}
        featuredImage={tour.featured_image}
        category={tour.categories?.name || 'Tour'}
        destination={tour.destinations?.name || 'Destino'}
        duration={tour.duration}
      />

      {/* Content */}
      <div className="flex-1 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-8">

              {/* Description */}
              <AnimateOnScroll variant="fadeUp">
                <div>
                  <h2 className="text-3xl font-black mb-4 text-neutral-dark border-l-4 border-accent-orange pl-4">
                    Sobre esta experiencia
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">{tour.long_description || tour.description}</p>
                </div>
              </AnimateOnScroll>

              {/* Itinerary Section */}
              {tour.itinerary && tour.itinerary.length > 0 && (
                <AnimateOnScroll variant="fadeUp">
                  <ItinerarySection itinerary={tour.itinerary} />
                </AnimateOnScroll>
              )}

              {/* Includes & Excludes Section */}
              {(tour.includes?.length > 0 || tour.excludes?.length > 0) && (
                <AnimateOnScroll variant="fadeUp">
                  <div className="space-y-8">
                    <IncludesSection includes={tour.includes} />
                    <ExcludesSection excludes={tour.excludes} />
                  </div>
                </AnimateOnScroll>
              )}

              {/* Video Section */}
              {tour.video_url && (
                <AnimateOnScroll variant="scale">
                  <VideoSection videoUrl={tour.video_url} />
                </AnimateOnScroll>
              )}

              {/* Gallery Section */}
              {tour.gallery_images && tour.gallery_images.length > 0 && (
                <AnimateOnScroll variant="fadeUp">
                  <GallerySection images={tour.gallery_images} />
                </AnimateOnScroll>
              )}

              {/* Testimonials Section */}
              {tour.testimonials && tour.testimonials.length > 0 && (
                <AnimateOnScroll variant="fadeUp">
                  <TestimonialsSection testimonials={tour.testimonials} />
                </AnimateOnScroll>
              )}

              {/* FAQs - adventure accordion */}
              {tour.tour_faqs && tour.tour_faqs.length > 0 && (
                <AnimateOnScroll variant="fadeUp">
                  <div>
                    <h2 className="text-3xl font-black mb-6 text-neutral-dark border-l-4 border-accent-orange pl-4">
                      Preguntas frecuentes
                    </h2>
                    <div className="space-y-3">
                      {tour.tour_faqs.map((faq: any) => (
                        <details
                          key={faq.id}
                          className="group border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary-600 transition-colors"
                        >
                          <summary className="font-black text-gray-900 list-none flex justify-between items-center">
                            {faq.question}
                            <span className="text-primary-600 text-xl group-open:rotate-45 transition-transform inline-block">+</span>
                          </summary>
                          <p className="text-gray-700 mt-3 leading-relaxed">{faq.answer}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              )}
            </div>

            {/* Sidebar - Sticky */}
            <div className="lg:col-span-1">
              <TourReservationSidebar
                tourTitle={tour.title}
                priceAdult={tour.price_adult}
                priceChild={tour.price_child}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related Tours */}
      {relatedTours.length > 0 && <RelatedTours tours={relatedTours} />}

      {/* CTA Section - adventure style */}
      <AnimateOnScroll variant="scale">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
          {/* Diagonal adventure texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.15) 8px, rgba(255,255,255,0.15) 16px)',
            }}
          />
          <div className="relative max-w-6xl mx-auto px-4 py-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-black mb-4 title-cabin">¿Listo para vivir esta experiencia?</h2>
            <p className="text-lg text-white/80 mb-8">Contáctanos por WhatsApp y agenda sin compromiso</p>
            <a
              href={`https://wa.me/573001234567?text=Hola%20Turtle%20Bus%2C%20quiero%20info%20sobre%20${encodeURIComponent(tour.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent-orange text-white font-black py-4 px-10 rounded-xl text-lg hover:bg-orange-600 transition-all shadow-2xl hover:scale-105 transform"
            >
              <MessageCircle size={22} />
              Chatea por WhatsApp
            </a>
          </div>
        </div>
      </AnimateOnScroll>

      <Footer />
    </main>
  )
}
