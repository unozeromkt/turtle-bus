import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ToursGrid } from '@/components/tours/ToursGrid'
import { getAllPublishedTours } from '@/lib/db/tours'

export const metadata = {
  title: 'Todos los Tours | Turtle Bus',
  description: 'Explora toda nuestra oferta de tours de aventura, naturaleza y cultura en Medellín, Guatapé y Antioquia.',
}

export default async function ToursPage() {
  let tours: any[] = []

  try {
    tours = await getAllPublishedTours()
  } catch (error) {
    console.error('Error loading tours:', error)
  }

  // Construye listas únicas de destinos y categorías para los filtros
  const destinations = Array.from(
    new Map(
      tours
        .filter(t => t.destinations)
        .map(t => [t.destinations.slug, t.destinations.name])
    ).entries()
  ).map(([slug, name]) => ({ slug, name: name as string }))

  const categories = Array.from(
    new Map(
      tours
        .filter(t => t.categories)
        .map(t => [t.categories.slug, { name: t.categories.name, icon: t.categories.icon }])
    ).entries()
  ).map(([slug, val]) => ({ slug, ...(val as { name: string; icon: string }) }))

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero compacto aventurero */}
      <div
        className="relative w-full flex items-end justify-start overflow-hidden mt-0"
        style={{ height: '340px' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=600&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800/80 via-primary-600/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Diagonal cut at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-neutral-light"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          <p className="text-gold-500 font-black uppercase tracking-widest text-sm mb-2">
            Turtle Bus · Antioquia
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-xl title-cabin">
            Todos los Tours
          </h1>
          <p className="text-gray-200 text-lg mt-2 font-medium">
            {tours.length} experiencias disponibles
          </p>
        </div>
      </div>

      {/* Tours con filtros */}
      <section className="flex-1 bg-neutral-light py-12">
        <div className="max-w-7xl mx-auto px-4">
          <ToursGrid
            tours={tours}
            destinations={destinations}
            categories={categories}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}

