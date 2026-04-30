import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ExperienceCard } from '@/components/home/ExperienceCard'
import { HomeFeaturedToursGrid } from '@/components/home/HomeFeaturedToursGrid'
import { HomePromoToursGrid } from '@/components/home/HomePromoToursGrid'
import { AnimateOnScroll, StaggerOnScroll, StaggerItem } from '@/components/ui/AnimateOnScroll'
import { HomeHero } from '@/components/home/HomeHero'
import { ArrowRight, Mountain, Leaf, Palette, Heart, Moon, UtensilsCrossed } from 'lucide-react'
import { getFeaturedTours, getPromotedTours } from '@/lib/db/tours'
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

const destinationBlocks = [
  {
    name: 'Medellín',
    slug: 'medellin',
    description: 'Ciudad, cultura urbana y experiencias de aventura con salida fácil.',
    image: '/images/experiences/vida-nocturna-medellin.jpg',
  },
  {
    name: 'Guatapé',
    slug: 'guatape',
    description: 'El clásico visual de Antioquia entre embalse, piedra y actividades premium.',
    image: '/images/CTA-home.jpg',
  },
  {
    name: 'Oriente Antioqueño',
    slug: 'oriente-antioqueno',
    description: 'Escapadas verdes, pueblos con encanto y rutas más tranquilas cerca de Medellín.',
    image: '/images/experiences/naturaleza.jpg',
  },
  {
    name: 'Santa Fe de Antioquia',
    slug: 'santa-fe-antioquia',
    description: 'Historia colonial, clima cálido y un ritmo de viaje más pausado.',
    image: '/images/experiences/cultura.jpg',
  },
]

export default async function Home() {
  let featuredTours = []
  let promotedTours = []
  
  try {
    ;[featuredTours, promotedTours] = await Promise.all([getFeaturedTours(8), getPromotedTours(4)])
  } catch (error) {
    console.error('Error loading featured tours:', error)
  }
  return (
    <main className="min-h-screen flex flex-col bg-neutral-light pb-24 md:pb-0">
      <Header />

      {/* Cinematic Hero - client component for motion */}
      <HomeHero />

      {/* Qué es Turtle Bus */}
      <section className="py-14 md:py-24 text-white relative overflow-hidden" style={{ backgroundColor: '#2C4734' }}>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Columna izquierda: texto */}
            <AnimateOnScroll variant="fadeRight">
              <span className="inline-block text-gold-500 font-black uppercase tracking-widest text-sm mb-4">
                Sobre nosotros
              </span>
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-5 md:mb-6 title-cabin">
                Descubre Antioquia con{' '}
                <span className="text-gold-500">Turtle Bus</span>
              </h2>
              <div className="space-y-3 md:space-y-4 text-gray-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                <p>
                  Somos una agencia de turismo de aventura basada en Medellín, especializada en
                  llevar a viajeros de todo el mundo a descubrir los rincones más increíbles de
                  Antioquia.
                </p>
                <p className="hidden md:block">
                  Desde las aguas de la represa de Guatapé hasta los cielos del parapente en
                  Medellín, diseñamos experiencias que combinan emoción, seguridad y una
                  conexión auténtica con la naturaleza y la cultura local.
                </p>
                <p>
                  Más de <span className="text-white font-bold">5.000 viajeros</span> han
                  confiado en nosotros. Ahora es tu turno.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 md:flex md:flex-wrap md:gap-6 mb-6 md:mb-8">
                {[
                  { value: '5.000+', label: 'Viajeros satisfechos' },
                  { value: '12+', label: 'Tours disponibles' },
                  { value: '100%', label: 'Guías certificados' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/5 px-3 py-3 md:bg-transparent md:px-0 md:py-0">
                    <p className="text-2xl md:text-3xl font-black text-gold-500">{stat.value}</p>
                    <p className="text-xs md:text-sm text-gray-400 leading-snug">{stat.label}</p>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/573001234567?text=Hola%20Turtle%20Bus%2C%20quiero%20saber%20m%C3%A1s"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 bg-accent-orange text-white font-black py-4 px-8 rounded-xl text-lg hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Conoce nuestros tours
                <ArrowRight size={20} />
              </a>
            </AnimateOnScroll>

            {/* Columna derecha: video vertical */}
            <AnimateOnScroll variant="fadeLeft" className="px-2 md:px-0">
              <VideoShowcase />
              {/* Etiqueta decorativa */}
              <div className="mt-3 md:mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs md:text-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                Mira lo que te espera en tu próxima aventura
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </section>

      {/* Tours en promoción */}
      {promotedTours.length > 0 && (
        <section className="py-16 md:py-20 bg-[linear-gradient(180deg,#fff8ea_0%,#fff3dd_100%)] relative overflow-hidden border-y border-[#f2d7ab]">
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(180,83,9,0.35) 10px, rgba(180,83,9,0.35) 20px)',
            }}
          />
          <div className="max-w-7xl mx-auto px-4 relative">
            <AnimateOnScroll variant="fadeUp" className="mb-10 md:mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#b45309]">Promociones</p>
                <h2 className="text-4xl md:text-5xl font-black text-neutral-dark title-cabin mt-2">
                  Tours en promoción
                </h2>
                <p className="text-base md:text-lg text-gray-700 mt-3 max-w-2xl">
                  Una sección nueva y más llamativa para destacar ofertas activas con precio antes y precio promo.
                </p>
              </div>
            </AnimateOnScroll>

            <HomePromoToursGrid tours={promotedTours} />
          </div>
        </section>
      )}

      {/* Categorías - Grid animado */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: '#1a2e20' }}>
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
          <AnimateOnScroll variant="fadeUp" className="text-center mb-10 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-white title-cabin">
              Tipos de Experiencias
            </h2>
            <p className="text-base md:text-xl text-white/70">Encuentra la aventura perfecta para ti</p>
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

      {/* Descubrimiento por destino */}
      <section className="py-16 md:py-20 bg-[#f6f1e8] relative overflow-hidden border-y border-black/5">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.18) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 relative">
          <AnimateOnScroll variant="fadeUp" className="mb-10 md:mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b4a16]">Destinos</p>
              <h2 className="text-4xl md:text-5xl font-black text-neutral-dark title-cabin mt-2">
                Nuestros Destinos
              </h2>
              <p className="text-base md:text-lg text-gray-600 mt-3 max-w-2xl">
                Turtle Bus te lleva a conocer los principales destinos de Medellín y sus alrededores.
              </p>
            </div>
            <Link
              href="/destinos"
              className="inline-flex items-center gap-2 self-start md:self-auto bg-white text-primary-700 border-2 border-primary-600 font-black py-3 px-6 rounded-xl hover:bg-primary-50 transition-colors"
            >
              Ver todos los destinos
              <ArrowRight size={18} />
            </Link>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {destinationBlocks.map((destination, index) => (
              <AnimateOnScroll key={destination.name} variant="fadeUp" delay={index * 0.08}>
                <Link href={`/destinos/${destination.slug}`}>
                  <div className="group relative overflow-hidden rounded-[28px] min-h-[320px] md:min-h-[360px] shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                    <div className="relative h-full flex flex-col justify-end p-6 text-white">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70 mb-2">Destino recomendado</p>
                      <h3 className="text-3xl font-black leading-tight title-cabin">{destination.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-white/80">{destination.description}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-white">
                        Descubrir destino
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Favoritos */}
      <section className="py-16 md:py-20 bg-neutral-light relative">
        <div className="max-w-7xl mx-auto px-4">
          {featuredTours.length > 0 ? (
            <>
              <AnimateOnScroll variant="fadeUp" className="mb-10 md:mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b4a16]">Favoritos</p>
                  <h2 className="text-4xl md:text-5xl font-black text-neutral-dark title-cabin mt-2">
                    Tours Favoritos
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 mt-3 max-w-2xl">
                    Los tours que hoy priorizamos en home, ahora mostrados con tarjetas más informativas y visuales.
                  </p>
                </div>
              </AnimateOnScroll>

              <HomeFeaturedToursGrid tours={featuredTours} />
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No hay tours disponibles por el momento</p>
            </div>
          )}

          <div className="text-center mt-10 md:mt-16">
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
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        {/* Adventure background texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(60deg, #5A7332, #5A7332 1px, transparent 1px, transparent 40px)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 relative">
          <AnimateOnScroll variant="fadeUp" className="text-center mb-10 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-neutral-dark title-cabin">
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
