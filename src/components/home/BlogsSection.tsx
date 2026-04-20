'use client'

import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { AnimateOnScroll, StaggerOnScroll, StaggerItem } from '@/components/ui/AnimateOnScroll'

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  readTime: string
  category: string
}

const blogPosts: BlogPost[] = [
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
]

export function BlogsSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative ornament - top left */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-accent-orange/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative ornament - bottom right */}
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section Header */}
        <AnimateOnScroll variant="fadeUp" className="text-center mb-16">
          <span className="inline-block text-accent-orange font-black uppercase tracking-widest text-sm mb-4">
            Historias e Inspiración
          </span>
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-neutral-dark title-cabin">
            Antioquia es Aventura
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre historias de viajeros reales, tips de aventureros certificados y secretos de esta región mágica
          </p>
        </AnimateOnScroll>

        {/* Blog Cards */}
        <StaggerOnScroll className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden bg-gray-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent-orange text-white text-xs font-black px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-neutral-dark mb-3 line-clamp-2 group-hover:text-accent-orange transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta info */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="p-6 pt-0 flex items-center justify-between text-accent-orange text-sm font-black group-hover:gap-3 transition-all">
                    <span>Leer Artículo</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerOnScroll>

        {/* CTA to Blog */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 bg-neutral-dark text-white font-black py-4 px-8 rounded-xl text-lg hover:bg-neutral-dark/90 transition-all transform hover:scale-105 shadow-lg"
          >
            Explorar Todos los Artículos
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
