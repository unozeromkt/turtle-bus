import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ExperienceCard } from '@/components/home/ExperienceCard'
import { AnimateOnScroll, StaggerOnScroll, StaggerItem } from '@/components/ui/AnimateOnScroll'
import { HomeHero } from '@/components/home/HomeHero'
import { FeaturedToursCarousel } from '@/components/tours/FeaturedToursCarousel'
import { ArrowRight, Mountain, Leaf, Palette, Heart, Moon, UtensilsCrossed } from 'lucide-react'
import { getFeaturedTours } from '@/lib/db/tours'
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel'
import { VideoShowcase } from '@/components/home/VideoShowcase'
import { BlogsSection } from '@/components/home/BlogsSection'
import { CTASection } from '@/components/home/CTASection'

const categories = [
  {
    name: 'Aventura',
    icon: Mountain,
    slug: 'aventura',
    description: 'Paragliding, ATV, rappel y más',
    backgroundImage: '/images/experiences/aventura.jpg',
  },
  {
    name: 'Naturaleza',
    icon: Leaf,
    slug: 'naturaleza',
    description: 'Cascadas, senderismo y trekking',
    backgroundImage: '/images/experiences/naturaleza.jpg',
  },
  {
    name: 'Cultura',
    icon: Palette,
    slug: 'cultura',
    description: 'Comuna 13, free tours y arte',
    backgroundImage: '/images/experiences/cultura.jpg',
  },
  {
    name: 'Familia',
    icon: Heart,
    slug: 'familia',
    description: 'Tours seguros y divertidos',
    backgroundImage: '/images/experiences/familia.jpg',
  },
  {
    name: 'Vida Nocturna',
    icon: Moon,
    slug: 'vida-nocturna',
    description: 'Bares, clubs y la mejor rumba',
    backgroundImage: '/images/experiences/vida-nocturna-medellin.jpg',
  },
  {
    name: 'Gastronómico',
    icon: UtensilsCrossed,
    slug: 'gastronomico',
    description: 'Sabores auténticos de Medellín',
    backgroundImage: '/images/experiences/comida-medellin.jpeg',
  },
]



export default async function Home() {
  let featuredTours = []
  
  try {
    featuredTours = await getFeaturedTours(8)
  } catch (error) {
    console.error('Error loading featured tours:', error)
  }
  return (
    <main className="min-h-screen flex flex-col bg-neutral-light">
      <Header />

      {/* Cinematic Hero - client component for motion */}
      <HomeHero />

      {/* Qué es Turtle Bus */}
      <section className="py-24 text-white relative overflow-hidden" style={{ backgroundColor: '#2C4734' }}>
        {/* Textura de fondo: cuadrícula diagonal */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #F2A81D 0, #F2A81D 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #F2A81D 0, #F2A81D 1px, transparent 0, transparent 50%)',
            backgroundSize: '30px 30px',
          }}
        />
        {/* Degradado lateral izquierdo */}
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-primary-600/20 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Columna izquierda: texto */}
            <AnimateOnScroll variant="fadeRight">
              <span className="inline-block text-gold-500 font-black uppercase tracking-widest text-sm mb-4">
                Sobre nosotros
              </span>
              <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6 title-cabin">
                Descubre Antioquia con{' '}
                <span className="text-gold-500">Turtle Bus</span>
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed mb-8">
                <p>
                  Somos una agencia de turismo de aventura basada en Medellín, especializada en
                  llevar a viajeros de todo el mundo a descubrir los rincones más increíbles de
                  Antioquia.
                </p>
                <p>
                  Desde las aguas de la represa de Guatapé hasta los cielos del parapente en
                  Medellín, diseñamos experiencias que combinan emoción, seguridad y una
                  conexión auténtica con la naturaleza y la cultura local.
                </p>
                <p>
                  Más de <span className="text-white font-bold">5.000 viajeros</span> han
                  confiado en nosotros. Ahora es tu turno.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 mb-8">
                {[
                  { value: '5.000+', label: 'Viajeros satisfechos' },
                  { value: '12+', label: 'Tours disponibles' },
                  { value: '100%', label: 'Guías certificados' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-black text-gold-500">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/573001234567?text=Hola%20Turtle%20Bus%2C%20quiero%20saber%20m%C3%A1s"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent-orange text-white font-black py-4 px-8 rounded-xl text-lg hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Conoce nuestros tours
                <ArrowRight size={20} />
              </a>
            </AnimateOnScroll>

            {/* Columna derecha: video vertical */}
            <AnimateOnScroll variant="fadeLeft">
              <VideoShowcase />
              {/* Etiqueta decorativa */}
              <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                Mira lo que te espera en tu próxima aventura
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </section>

      {/* Categorías - Grid animado */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#1a2e20' }}>
        {/* Ornamento esquina superior izquierda */}
        <svg className="absolute top-0 left-0 w-64 h-64 opacity-30 pointer-events-none" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10 Q10 100 100 100" stroke="#F2A81D" strokeWidth="1.2" fill="none"/>
          <path d="M10 10 Q10 70 70 70" stroke="#F2A81D" strokeWidth="0.8" fill="none"/>
          <path d="M10 10 Q10 130 130 130" stroke="#F2A81D" strokeWidth="0.6" fill="none"/>
          <path d="M10 10 L40 10 Q50 10 50 20 L50 50" stroke="#F2A81D" strokeWidth="1" fill="none"/>
          <circle cx="10" cy="10" r="3" fill="#F2A81D"/>
          <circle cx="100" cy="100" r="2" fill="#F2A81D" opacity="0.6"/>
          <path d="M25 10 Q25 50 65 50" stroke="#F2A81D" strokeWidth="0.5" fill="none" opacity="0.5"/>
        </svg>

        {/* Ornamento esquina superior derecha */}
        <svg className="absolute top-0 right-0 w-64 h-64 opacity-30 pointer-events-none" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
          <path d="M10 10 Q10 100 100 100" stroke="#F2A81D" strokeWidth="1.2" fill="none"/>
          <path d="M10 10 Q10 70 70 70" stroke="#F2A81D" strokeWidth="0.8" fill="none"/>
          <path d="M10 10 Q10 130 130 130" stroke="#F2A81D" strokeWidth="0.6" fill="none"/>
          <path d="M10 10 L40 10 Q50 10 50 20 L50 50" stroke="#F2A81D" strokeWidth="1" fill="none"/>
          <circle cx="10" cy="10" r="3" fill="#F2A81D"/>
          <circle cx="100" cy="100" r="2" fill="#F2A81D" opacity="0.6"/>
          <path d="M25 10 Q25 50 65 50" stroke="#F2A81D" strokeWidth="0.5" fill="none" opacity="0.5"/>
        </svg>

        {/* Ornamento esquina inferior izquierda */}
        <svg className="absolute bottom-0 left-0 w-64 h-64 opacity-30 pointer-events-none" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleY(-1)' }}>
          <path d="M10 10 Q10 100 100 100" stroke="#F2A81D" strokeWidth="1.2" fill="none"/>
          <path d="M10 10 Q10 70 70 70" stroke="#F2A81D" strokeWidth="0.8" fill="none"/>
          <path d="M10 10 Q10 130 130 130" stroke="#F2A81D" strokeWidth="0.6" fill="none"/>
          <path d="M10 10 L40 10 Q50 10 50 20 L50 50" stroke="#F2A81D" strokeWidth="1" fill="none"/>
          <circle cx="10" cy="10" r="3" fill="#F2A81D"/>
          <circle cx="100" cy="100" r="2" fill="#F2A81D" opacity="0.6"/>
        </svg>

        {/* Ornamento esquina inferior derecha */}
        <svg className="absolute bottom-0 right-0 w-64 h-64 opacity-30 pointer-events-none" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scale(-1, -1)' }}>
          <path d="M10 10 Q10 100 100 100" stroke="#F2A81D" strokeWidth="1.2" fill="none"/>
          <path d="M10 10 Q10 70 70 70" stroke="#F2A81D" strokeWidth="0.8" fill="none"/>
          <path d="M10 10 Q10 130 130 130" stroke="#F2A81D" strokeWidth="0.6" fill="none"/>
          <path d="M10 10 L40 10 Q50 10 50 20 L50 50" stroke="#F2A81D" strokeWidth="1" fill="none"/>
          <circle cx="10" cy="10" r="3" fill="#F2A81D"/>
          <circle cx="100" cy="100" r="2" fill="#F2A81D" opacity="0.6"/>
        </svg>

        <div className="max-w-7xl mx-auto px-4 relative">
          <AnimateOnScroll variant="fadeUp" className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-white title-cabin">
              Tipos de Experiencias
            </h2>
            <p className="text-xl text-white/70">Encuentra la aventura perfecta para ti</p>
          </AnimateOnScroll>

          <StaggerOnScroll className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <ExperienceCard
                  name={cat.name}
                  slug={cat.slug}
                  description={cat.description}
                  icon={<cat.icon size={56} className="text-gold-500" />}
                  backgroundImage={cat.backgroundImage}
                />
              </StaggerItem>
            ))}
          </StaggerOnScroll>
        </div>
      </section>

      {/* Tours Destacados */}
      <section className="py-20 bg-neutral-light relative">
        <div className="max-w-7xl mx-auto px-4">
          {featuredTours.length > 0 ? (
            <FeaturedToursCarousel 
              tours={featuredTours}
              title="Tours Destacados"
              description="Los tours más populares con excelentes calificaciones. ¡Todos verificados!"
            />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No hay tours disponibles por el momento</p>
            </div>
          )}

          <div className="text-center mt-16">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 bg-primary-600 text-white font-black py-4 px-8 rounded-xl text-lg hover:bg-primary-700 transition-all transform hover:scale-105"
            >
              Ver todos los tours
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonios - FEATURING */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Adventure background texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(60deg, #5A7332, #5A7332 1px, transparent 1px, transparent 40px)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 relative">
          <AnimateOnScroll variant="fadeUp" className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-neutral-dark title-cabin">
              Lo que dicen nuestros viajeros
            </h2>
            <p className="text-lg text-gray-600">Más de 5000 viajeros satisfechos</p>
          </AnimateOnScroll>

          <TestimonialsCarousel />
        </div>
      </section>

      <BlogsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
