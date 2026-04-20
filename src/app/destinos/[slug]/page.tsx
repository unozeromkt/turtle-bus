import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TourCard } from '@/components/tours/TourCard'
import { ChevronRight } from 'lucide-react'

const destinations: { [key: string]: any } = {
  medellin: {
    name: 'Medellín',
    title: 'La Ciudad de la Eterna Primavera',
    description: 'Medellín, cuna de la innovación y la transformación social en Colombia. Descubre una ciudad vibrante, segura y llena de vida con barrios culturales, arte callejero, gastronomía de clase mundial y vistas panorámicas desde sus cerros tutelares.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    highlights: [
      'Comuna 13: Transformación social y arte urbano',
      'Pueblito Paisa: Arquitectura tradicional colombiana',
      'Parque Bolívar: Vistas 360° de la ciudad',
      'Gastronomía: Restaurantes con chef reconocidos',
      'Transporte cable: Experiencia única y vistas',
    ],
    climate: 'Primavera todo el año, 25°C promedio',
    bestTime: 'Todo el año',
    tours: [
      {
        id: '1',
        title: 'Medellín Día Completo: Arte y Transformación',
        destination: 'Medellín',
        duration: '8 horas',
        priceFrom: 450000,
        rating: 4.8,
        reviewCount: 156,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'medellin-dia-completo',
      },
      {
        id: '2',
        title: 'Comuna 13: Tour Artístico y Cultural',
        destination: 'Medellín',
        duration: '4 horas',
        priceFrom: 350000,
        rating: 4.9,
        reviewCount: 243,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'comuna-13-arte',
      },
      {
        id: '3',
        title: 'Teleférico Arví: Naturaleza y Vistas',
        destination: 'Medellín',
        duration: '5 horas',
        priceFrom: 320000,
        rating: 4.7,
        reviewCount: 189,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'teleferico-arvi',
      },
      {
        id: '4',
        title: 'Gastronomía Medellinense: Sabores Auténticos',
        destination: 'Medellín',
        duration: '3 horas',
        priceFrom: 280000,
        rating: 4.9,
        reviewCount: 267,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'gastronomia-medellin',
      },
    ],
  },
  guatape: {
    name: 'Guatapé',
    title: 'El Pueblito Más Colorido de Colombia',
    description: 'Guatapé es un municipio mágico ubicado a solo 80km de Medellín. Famoso por sus coloridas calles, la majestuosa Piedra del Peñol y el sereno Embalse del Peñol. Ideal para amantes de la naturaleza, fotografía y aventura.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    highlights: [
      'La Piedra del Peñol: Monolito de 220 metros',
      'Pueblito colorido: Calles con arte popular',
      'Embalse del Peñol: Actividades acuáticas',
      'Fotografía profesional: Vistas icónicas',
      'Gastronomía local: Trucha y especialidades',
    ],
    climate: 'Templado, 20°C promedio',
    bestTime: 'Noviembre a Marzo (seco)',
    tours: [
      {
        id: '5',
        title: 'Piedra del Peñol y Pueblito: Clásico de Guatapé',
        destination: 'Guatapé',
        duration: '6 horas',
        priceFrom: 380000,
        rating: 4.9,
        reviewCount: 512,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'piedra-penol-pueblito',
      },
      {
        id: '6',
        title: 'Embalse del Peñol: Kayak y Naturaleza',
        destination: 'Guatapé',
        duration: '4 horas',
        priceFrom: 400000,
        rating: 4.8,
        reviewCount: 134,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'embalse-kayak',
      },
      {
        id: '7',
        title: 'Fotografía Profesional en Guatapé',
        destination: 'Guatapé',
        duration: '5 horas',
        priceFrom: 550000,
        rating: 4.9,
        reviewCount: 89,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'fotografia-guatape',
      },
      {
        id: '8',
        title: 'Tour Gourmet: Gastronomía del Embalse',
        destination: 'Guatapé',
        duration: '5 horas',
        priceFrom: 420000,
        rating: 4.7,
        reviewCount: 178,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'gourmet-guatape',
      },
    ],
  },
  guarne: {
    name: 'Guarne',
    title: 'Naturaleza Virgen y Aventura',
    description: 'Guarne ofrece un escape hacia la naturaleza pura con cascadas cristalinas, bosques nublados y senderos de senderismo. Perfecto para aventureros y familias que buscan reconexión con la naturaleza.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    highlights: [
      'Cascada La Chorrera: 90 metros de caída',
      'Senderos de senderismo: 5 niveles de dificultad',
      'Bosque nublado: Avistamiento de aves',
      'Piscinas naturales: Baños en agua pura',
      'Camping y glamping: Experiencias en naturaleza',
    ],
    climate: 'Frío de montaña, 15-18°C',
    bestTime: 'Junio a Agosto (seco)',
    tours: [
      {
        id: '9',
        title: 'Cascada La Chorrera y Senderismo',
        destination: 'Guarne',
        duration: '6 horas',
        priceFrom: 320000,
        rating: 4.8,
        reviewCount: 267,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'cascada-chorrera',
      },
      {
        id: '10',
        title: 'Avistamiento de Aves en Bosque Nublado',
        destination: 'Guarne',
        duration: '4 horas',
        priceFrom: 350000,
        rating: 4.9,
        reviewCount: 145,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'avistamiento-aves',
      },
      {
        id: '11',
        title: 'Expedición Multi-día: Glampres en Montaña',
        destination: 'Guarne',
        duration: '2 días',
        priceFrom: 850000,
        rating: 4.9,
        reviewCount: 87,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'expedicion-glamping',
      },
      {
        id: '12',
        title: 'Familia: Piscinas Naturales y Picnic',
        destination: 'Guarne',
        duration: '5 horas',
        priceFrom: 280000,
        rating: 4.9,
        reviewCount: 203,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'piscinas-familia',
      },
    ],
  },
  'san-rafael': {
    name: 'San Rafael',
    title: 'Cascadas, Senderismo y Aventura Pura',
    description: 'San Rafael es el destino ideal para aventureros. Con sus famosas cascadas, senderos desafiantes y comunidades indígenas cercanas, ofrece una experiencia auténtica de la naturaleza colombiana.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    highlights: [
      'Cascada el Salto: La más alta de la región',
      'Canyoning: Descensos por cascadas',
      'Comunidades indígenas: Experiencias culturales',
      'Senderos salvajes: Para expertos',
      'Rafting: Aguas rápidas y adrenalina',
    ],
    climate: 'Tropical, 24°C promedio',
    bestTime: 'Septiembre a Octubre',
    tours: [
      {
        id: '13',
        title: 'Canyoning: Descenso de Cascadas',
        destination: 'San Rafael',
        duration: '7 horas',
        priceFrom: 650000,
        rating: 4.9,
        reviewCount: 56,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'canyoning-san-rafael',
      },
      {
        id: '14',
        title: 'Rafting San Rafael: Nivel Experto',
        destination: 'San Rafael',
        duration: '5 horas',
        priceFrom: 580000,
        rating: 4.7,
        reviewCount: 78,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'rafting-nivel-experto',
      },
      {
        id: '15',
        title: 'Cascada el Salto y Expedición Cultural',
        destination: 'San Rafael',
        duration: '8 horas',
        priceFrom: 700000,
        rating: 4.8,
        reviewCount: 92,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'cascada-salto-cultural',
      },
      {
        id: '16',
        title: 'Sendero Peligroso: Desafío de Montaña',
        destination: 'San Rafael',
        duration: '6 horas',
        priceFrom: 520000,
        rating: 4.9,
        reviewCount: 34,
        featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
        slug: 'sendero-peligroso',
      },
    ],
  },
}

export default async function DestinationDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const destination = destinations[slug]

  if (!destination) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Destino no encontrado</h1>
            <Link href="/destinos" className="btn btn-primary">
              Volver a Destinos
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url('${destination.image}')` }}
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
            <h1 className="text-5xl font-black mb-2 title-cabin">{destination.title}</h1>
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

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-primary-600 mb-2">CLIMA</h3>
              <p className="text-xl font-bold text-neutral-dark">{destination.climate}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-primary-600 mb-2">MEJOR ÉPOCA</h3>
              <p className="text-xl font-bold text-neutral-dark">{destination.bestTime}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-primary-600 mb-2">TOURS DISPONIBLES</h3>
              <p className="text-xl font-bold text-neutral-dark">{destination.tours.length}</p>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-16">
            <h2 className="text-3xl font-black mb-8 title-cabin">Puntos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {destination.highlights.map((highlight: string, i: number) => (
                <div key={i} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl">✓</div>
                  <p className="font-semibold text-gray-700">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tours */}
          <div>
            <h2 className="text-3xl font-black mb-8 title-cabin">Tours en {destination.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destination.tours.map((tour: any) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
