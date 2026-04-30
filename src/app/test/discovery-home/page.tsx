import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Compass,
  MapPin,
  Mountain,
  ShieldCheck,
  Star,
  Ticket,
  Timer,
  Users,
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getAllPublishedTours, getFeaturedTours } from '@/lib/db/tours'

const fallbackImage =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop'

const editorialCollections = [
  {
    title: 'Escapadas que se venden solas',
    description: 'Planes listos para reservar si quieres decidir en menos de 2 minutos.',
    href: '/tours',
    accent: 'from-[#1d4d41] to-[#2f7a62]',
  },
  {
    title: 'Aventura con logística resuelta',
    description: 'Experiencias con transporte, coordinación y guías para que no tengas que improvisar.',
    href: '/tours?category=aventura',
    accent: 'from-[#8b4a16] to-[#d17c2a]',
  },
  {
    title: 'Favoritos para viajeros primerizos',
    description: 'Una selección simple para quien quiere conocer Medellín y Guatapé sin complicarse.',
    href: '/tours',
    accent: 'from-[#334155] to-[#64748b]',
  },
]

function formatPrice(value: number | null | undefined) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value || 0)
}

export default async function DiscoveryHomePage() {
  let featuredTours: any[] = []
  let allTours: any[] = []

  try {
    ;[featuredTours, allTours] = await Promise.all([getFeaturedTours(6), getAllPublishedTours()])
  } catch (error) {
    console.error('Error loading discovery home data:', error)
  }

  const highlightedTours = featuredTours.slice(0, 4)
  const featuredMosaic = featuredTours.slice(0, 3)

  const categories = Array.from(
    new Map(
      allTours
        .filter((tour) => tour?.categories?.slug)
        .map((tour) => [
          tour.categories.slug,
          {
            name: tour.categories.name,
            slug: tour.categories.slug,
            count: allTours.filter((item) => item?.categories?.slug === tour.categories.slug).length,
          },
        ])
    ).values()
  ).slice(0, 6)

  const destinations = Array.from(
    new Map(
      allTours
        .filter((tour) => tour?.destinations?.slug)
        .map((tour) => [
          tour.destinations.slug,
          {
            name: tour.destinations.name,
            slug: tour.destinations.slug,
            image: tour.featured_image || fallbackImage,
            count: allTours.filter((item) => item?.destinations?.slug === tour.destinations.slug).length,
          },
        ])
    ).values()
  ).slice(0, 3)

  return (
    <main className="min-h-screen bg-[#f6f4ee] text-slate-900">
      <Header />

      <section className="relative overflow-hidden border-b border-black/5 bg-[radial-gradient(circle_at_top_left,_rgba(209,124,42,0.18),_transparent_32%),linear-gradient(180deg,#fffdf8_0%,#f6f4ee_100%)] pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)', backgroundSize: '26px 26px' }} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8d3c8] bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#8b4a16]">
              <Compass size={14} />
              Experimento de home discovery
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.94] text-slate-950 md:text-7xl title-cabin">
              Descubre tours con una navegación más directa y exploratoria.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              Esta versión prueba una home más cercana a un marketplace editorial: decisión rápida, bloques curados y acceso inmediato a experiencias populares.
            </p>

            <div className="mt-8 rounded-[28px] border border-[#ddd6c8] bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-5">
              <div className="grid gap-3 md:grid-cols-[1.2fr_auto]">
                <div className="rounded-2xl border border-[#e7e0d5] bg-[#faf7f1] px-4 py-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Explorar rápido</p>
                  <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                    Empieza por destino o por tipo de experiencia.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href="/tours" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800">
                      Ver todos los tours
                    </Link>
                    <Link href="/tours?category=aventura" className="rounded-full border border-[#d7cfbf] bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-[#8b4a16] hover:text-[#8b4a16]">
                      Aventura
                    </Link>
                    <Link href="/destinos" className="rounded-full border border-[#d7cfbf] bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-[#8b4a16] hover:text-[#8b4a16]">
                      Destinos
                    </Link>
                  </div>
                </div>
                <div className="flex min-h-40 flex-col justify-between rounded-2xl bg-[#1f4c43] p-5 text-white">
                  <div>
                    <p className="text-sm font-bold text-white/70">Reserva con contexto</p>
                    <p className="mt-2 text-2xl font-black">{allTours.length || 12}+ tours publicados</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
                    <BadgeCheck size={16} />
                    Selecciones curadas para comparar más fácil
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d8d3c8] bg-white px-4 py-2 font-semibold">
                <Star size={16} className="text-[#d17c2a]" />
                Valoraciones visibles desde arriba
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d8d3c8] bg-white px-4 py-2 font-semibold">
                <ShieldCheck size={16} className="text-[#1f4c43]" />
                Más claridad antes de entrar al detalle
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden rounded-[32px] bg-slate-900 p-5 text-white shadow-[0_28px_90px_rgba(15,23,42,0.22)] sm:row-span-2">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <img
                src={featuredMosaic[0]?.featured_image || fallbackImage}
                alt={featuredMosaic[0]?.title || 'Tour destacado'}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="relative flex h-full min-h-80 flex-col justify-end">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-white/70">Recomendación editorial</p>
                <h2 className="text-3xl font-black leading-tight title-cabin">
                  {featuredMosaic[0]?.title || 'Experiencias con más intención de compra'}
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
                  {featuredMosaic[0]?.description || 'Un bloque protagonista con contexto corto, visual fuerte y salida directa al tour.'}
                </p>
                <Link href={featuredMosaic[0] ? `/tours/${featuredMosaic[0].slug}` : '/tours'} className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-900 transition hover:bg-[#f1eadd]">
                  Abrir tour
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {featuredMosaic.slice(1, 3).map((tour, index) => (
              <Link
                key={tour?.id || index}
                href={tour ? `/tours/${tour.slug}` : '/tours'}
                className="group relative overflow-hidden rounded-[28px] border border-[#e4ddd0] bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
              >
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={tour?.featured_image || fallbackImage}
                    alt={tour?.title || 'Tour'}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Selección rápida</p>
                <h3 className="mt-2 text-xl font-black leading-snug text-slate-900">{tour?.title || 'Tour recomendado'}</h3>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1"><MapPin size={15} /> {tour?.destinations?.name || 'Medellín'}</span>
                  <span className="font-black text-[#8b4a16]">{formatPrice(tour?.price_adult)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-white py-6">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 pb-1">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/tours?category=${category.slug}`}
              className="shrink-0 rounded-full border border-[#ddd6c8] bg-[#faf7f1] px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-[#8b4a16] hover:text-[#8b4a16]"
            >
              {category.name} · {category.count}
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8b4a16]">Tours recomendados</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950 title-cabin">Tarjetas más informativas desde la home</h2>
            </div>
            <Link href="/tours" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-slate-700 transition hover:text-[#8b4a16]">
              Explorar catálogo completo
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {highlightedTours.map((tour) => (
              <Link
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="group overflow-hidden rounded-[28px] border border-[#e3dccf] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <img
                    src={tour.featured_image || fallbackImage}
                    alt={tour.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">Desde</p>
                      <p className="text-lg font-black">{formatPrice(tour.price_adult)}</p>
                    </div>
                    <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                      {tour.categories?.name || 'Tour'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div>
                    <h3 className="text-xl font-black leading-snug text-slate-950">{tour.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                      {tour.description || 'Resumen corto para decidir rápido si vale la pena abrir el detalle.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#f6f4ee] px-3 py-2 font-semibold">
                      <MapPin size={15} className="text-[#1f4c43]" />
                      {tour.destinations?.name || 'Destino'}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#f6f4ee] px-3 py-2 font-semibold">
                      <Timer size={15} className="text-[#8b4a16]" />
                      {tour.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#ece5d8] pt-4">
                    <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-700">
                      <Star size={16} className="fill-[#f3b316] text-[#f3b316]" />
                      4.8 promedio
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-black text-[#8b4a16]">
                      Ver tour
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#12352d] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 md:mb-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f0b44e]">Explora por destino</p>
            <h2 className="mt-2 text-4xl font-black title-cabin">Bloques de descubrimiento más visuales</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {destinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinos/${destination.slug}`}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative flex min-h-72 flex-col justify-end">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">{destination.count} experiencias activas</p>
                  <h3 className="mt-2 text-3xl font-black title-cabin">{destination.name}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/80">
                    Punto de entrada rápido para quien piensa primero en el lugar y luego en la actividad.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 md:mb-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8b4a16]">Colecciones</p>
            <h2 className="mt-2 text-4xl font-black text-slate-950 title-cabin">Agrupar mejor para decidir más rápido</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {editorialCollections.map((collection) => (
              <Link
                key={collection.title}
                href={collection.href}
                className={`rounded-[30px] bg-gradient-to-br ${collection.accent} p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.14)] transition hover:-translate-y-1`}
              >
                <div className="flex h-full min-h-64 flex-col justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">Curaduría temática</p>
                    <h3 className="mt-3 text-3xl font-black leading-tight title-cabin">{collection.title}</h3>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">{collection.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em]">
                    Explorar bloque
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-3">
          {[
            {
              icon: Ticket,
              title: 'Más contexto antes del clic',
              text: 'La home enseña precio, destino y duración sin obligar al usuario a abrir cada ficha.',
            },
            {
              icon: Users,
              title: 'Decisión más guiada',
              text: 'Secciones por intención de compra, no solo por storytelling de marca.',
            },
            {
              icon: Mountain,
              title: 'Exploración más modular',
              text: 'Categorías, destinos y colecciones conviven como atajos reales de navegación.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] border border-[#e3dccf] bg-[#faf7f1] p-6">
              <item.icon size={22} className="text-[#8b4a16]" />
              <h3 className="mt-4 text-xl font-black text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}