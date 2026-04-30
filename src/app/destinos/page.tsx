import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroBanner } from '@/components/hero/HeroBanner'

export default function DestinationsPage() {
  const destinations = [
    {
      name: 'Medellín',
      slug: 'medellin',
      description: 'La ciudad de la eterna primavera',
      image: '/images/experiences/vida-nocturna-medellin.jpg',
      tours: 12,
    },
    {
      name: 'Guatapé',
      slug: 'guatape',
      description: 'Peñoles, pueblito colorido y naturaleza',
      image: '/images/CTA-home.jpg',
      tours: 8,
    },
    {
      name: 'Oriente Antioqueño',
      slug: 'oriente-antioqueno',
      description: 'Escapadas verdes, pueblos con encanto y rutas cercanas a Medellín',
      image: '/images/experiences/naturaleza.jpg',
      tours: 6,
    },
    {
      name: 'Santa Fe de Antioquia',
      slug: 'santa-fe-antioquia',
      description: 'Arquitectura colonial, clima cálido y escapadas con historia',
      image: '/images/experiences/cultura.jpg',
      tours: 5,
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <HeroBanner
        title="Destinos de Antioquia"
        subtitle="Explora los mejores lugares en Antioquia"
      />

      <section className="py-16 bg-neutral-light flex-1">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Link key={dest.slug} href={`/destinos/${dest.slug}`}>
                <div className="group cursor-pointer">
                  <div
                    className="w-full h-48 rounded-lg bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url('${dest.image}')` }}
                  />
                  <h3 className="text-xl font-bold mt-4">{dest.name}</h3>
                  <p className="text-gray-600 mb-3">{dest.description}</p>
                  <p className="text-sm text-primary-600 font-semibold">{dest.tours} tours →</p>
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
