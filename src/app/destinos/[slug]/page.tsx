import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TourCard } from '@/components/tours/TourCard'
import { ChevronRight } from 'lucide-react'
import { getDestinationBySlug } from '@/lib/db/destinations'
import { getToursByDestination } from '@/lib/db/tours'
import { notFound } from 'next/navigation'

const fallbackImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop'

export default async function DestinationDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let destination
  let tours: any[] = []

  try {
    destination = await getDestinationBySlug(slug)

    if (!destination.is_published) {
      notFound()
    }

    tours = await getToursByDestination(destination.id)
  } catch (error) {
    notFound()
  }

  if (!destination) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url('${destination.featured_image || fallbackImage}')` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 pb-8 text-white max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <ChevronRight size={16} />
              <Link href="/destinos" className="hover:underline">
                Destinos
              </Link>
              <ChevronRight size={16} />
              <span>{destination.name}</span>
            </div>
            <h1 className="text-5xl font-black mb-2 title-cabin">{destination.name}</h1>
            {(destination.city || destination.region) && (
              <p className="text-white/85 text-lg">
                {[destination.city, destination.region].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="py-16 bg-neutral-light flex-1">
        <div className="max-w-7xl mx-auto px-4">
          {/* Description */}
          <div className="mb-16">
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
              {destination.description}
            </p>
          </div>

          {/* Tours */}
          <div>
            <h2 className="text-3xl font-black mb-8 title-cabin">Tours en {destination.name}</h2>
            {tours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tours.map((tour: any) => (
                  <TourCard
                    key={tour.id}
                    id={tour.id}
                    title={tour.title}
                    slug={tour.slug}
                    priceAdult={tour.price_adult}
                    duration={tour.duration}
                    destination={destination.name}
                    featuredImage={tour.featured_image || fallbackImage}
                    isFeatured={tour.is_featured}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-600">
                Aún no hay tours publicados para este destino.
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
