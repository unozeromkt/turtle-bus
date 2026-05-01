import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroBanner } from '@/components/hero/HeroBanner'
import { getPublishedDestinations, getDestinationWithTourCount } from '@/lib/db/destinations'

const fallbackImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop'

export default async function DestinationsPage() {
  let destinations: Array<any> = []

  try {
    const publishedDestinations = await getPublishedDestinations()
    destinations = await Promise.all(
      publishedDestinations.map((destination) => getDestinationWithTourCount(destination.id))
    )
  } catch (error) {
    console.error('Error loading destinations page:', error)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <HeroBanner
        title="Destinos de Antioquia"
        subtitle="Explora los mejores lugares en Antioquia"
        backgroundImage="/images/destinos-antioquia.jpg"
      />

      <section className="py-16 bg-neutral-light flex-1">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Link key={dest.slug} href={`/destinos/${dest.slug}`}>
                <div className="group cursor-pointer">
                  <div
                    className="w-full h-48 rounded-lg bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url('${dest.featured_image || fallbackImage}')` }}
                  />
                  <h3 className="text-xl font-bold mt-4">{dest.name}</h3>
                  <p className="text-gray-600 mb-3">{dest.short_description || dest.description || 'Descubre este destino con Turtle Bus'}</p>
                  <p className="text-sm text-primary-600 font-semibold">{dest.tour_count || 0} tours →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
