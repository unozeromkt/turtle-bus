import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroBanner } from '@/components/hero/HeroBanner'
import { Clock, User } from 'lucide-react'

const blogPosts = [
  {
    id: '1',
    slug: 'paragliding-medellin-aventura',
    title: 'Parapente en Medellín: Vuela sobre la ciudad de la eterna primavera',
    excerpt: 'Descubre la experiencia única de volar sobre Medellín. Consejos de seguridad, mejores spots y emociones puras que guardarás para siempre.',
    image: 'https://images.unsplash.com/photo-1540575467063-178f50002c4b?w=600&h=400&fit=crop',
    date: '2024-04-10',
    author: 'Carlos Mendez',
    readTime: '6 min',
    category: 'Aventura',
  },
  {
    id: '2',
    slug: 'guatape-piedra-penol-guia-completa',
    title: 'La Piedra del Peñol: Guatapé y sus gemas ocultas',
    excerpt: 'Más allá de los 700 escalones. Explora los pueblos coloridos, represa, flora y fauna de esta región mágica de Antioquia.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
    date: '2024-04-05',
    author: 'María Rodríguez',
    readTime: '8 min',
    category: 'Naturaleza',
  },
  {
    id: '3',
    slug: 'comarca-aventura-tubing-rappel',
    title: 'Comarca: El destino secreto para aventureros',
    excerpt: 'Tubing en ríos cristalinos, rappel en cascadas escondidas y naturaleza virgen. El paraíso de quienes buscan adrenalina y belleza.',
    image: 'https://images.unsplash.com/photo-1527004013197-933b4cb48ea1?w=600&h=400&fit=crop',
    date: '2024-03-28',
    author: 'Juan Martinez',
    readTime: '7 min',
    category: 'Aventura Extrema',
  },
  {
    id: '4',
    slug: 'guia-completa-medellin',
    title: '48 Horas en Medellín: Guía Completa para Tu Primer Viaje',
    excerpt: 'Descubre los mejores barrios, restaurantes y experiencias que no te puedes perder en la ciudad de la eterna primavera.',
    image: 'https://images.unsplash.com/photo-1549144611-11a0be60ec32?w=600&h=400&fit=crop',
    date: '2024-03-15',
    author: 'María García',
    readTime: '8 min',
    category: 'Destinos',
  },
  {
    id: '5',
    slug: 'aventura-guatape',
    title: 'Aventura en Guatapé: La Piedra del Peñol Desde Adentro',
    excerpt: 'Todo lo que necesitas saber antes de escalar la Piedra del Peñol. Consejos, mejores horarios y testimonios de aventureros.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    date: '2024-03-12',
    author: 'Carlos López',
    readTime: '6 min',
    category: 'Aventura',
  },
  {
    id: '6',
    slug: 'fotografia-viajes',
    title: 'Fotografía de Viajes: Captura la Magia de Antioquia',
    excerpt: 'Técnicas profesionales para fotografiar tus experiencias. Historias visuales que perduran para siempre.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop',
    date: '2024-03-10',
    author: 'Alejandra Ruiz',
    readTime: '10 min',
    category: 'Tips',
  },
  {
    id: '7',
    slug: 'gastronomia-antioquia',
    title: 'Sabores Auténticos: Gastronomía Tradicional Antioqueña',
    excerpt: 'Un viaje por tus papilas gustativas. Explora restaurantes locales, mercados tradicionales y la cocina ancestral.',
    image: 'https://images.unsplash.com/photo-1495195134817-aeb325ef3c61?w=600&h=400&fit=crop',
    date: '2024-03-08',
    author: 'Juan Pérez',
    readTime: '7 min',
    category: 'Gastronomía',
  },
  {
    id: '8',
    slug: 'viajes-familia',
    title: 'Viajes en Familia: Tours Seguros y Divertidos para Todos',
    excerpt: 'Cómo planear un viaje perfecto con niños. Actividades, horarios y consejos para familias aventureras.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
    date: '2024-03-05',
    author: 'Laura Martínez',
    readTime: '5 min',
    category: 'Familia',
  },
  {
    id: '9',
    slug: 'natura-antioquia',
    title: 'Conservación de Antioquia: Nuestro Compromiso Ambiental',
    excerpt: 'Cómo nuestros tours contribuyen a la preservación de la naturaleza y comunidades locales de Antioquia.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
    date: '2024-03-01',
    author: 'Eco Team',
    readTime: '9 min',
    category: 'Sostenibilidad',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <HeroBanner
        title="Blog"
        subtitle="Historias, consejos y experiencias de viaje"
      />

      <section className="py-16 bg-neutral-light flex-1">
        <div className="max-w-7xl mx-auto px-4">
          {/* Featured Post */}
          <div className="mb-16 group">
            <Link href={`/blog/${blogPosts[0]?.slug}`} className="block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div
                  className="h-96 md:h-auto bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url('${blogPosts[0]?.image}')` }}
                />
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-primary-600 font-bold text-sm mb-3">{blogPosts[0]?.category}</span>
                  <h2 className="text-4xl font-black mb-4 title-cabin">{blogPosts[0]?.title}</h2>
                  <p className="text-gray-600 mb-6 text-lg">{blogPosts[0]?.excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      {blogPosts[0]?.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {blogPosts[0]?.readTime}
                    </div>
                    <span>{blogPosts[0]?.date ? new Date(blogPosts[0].date).toLocaleDateString('es-CO') : ''}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Other Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div
                    className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url('${post.image}')` }}
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-primary-600 font-bold text-xs mb-2">{post.category}</span>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
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
