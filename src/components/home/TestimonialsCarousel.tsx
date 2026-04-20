'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Diego Martínez',
    tour: 'Paragliding Medellín',
    text: '¡Experiencia increíble! El paragliding fue una de las mejores cosas que he hecho en mi vida. Los guías son profesionales y hacen que todo sea seguro.',
    rating: 5,
    origin: 'Bogotá, Colombia',
  },
  {
    name: 'María López',
    tour: 'Tour Guatapé Full Day',
    text: 'Excelente guía, muy profesional. Toda la familia disfrutó del tour en Guatapé. Lo recomiendo 100%, una experiencia que no olvidaremos.',
    rating: 5,
    origin: 'Buenos Aires, Argentina',
  },
  {
    name: 'Carlos Rodríguez',
    tour: 'Tour Guatapé Acuático',
    text: 'Seguro, confiable y memorable. El wakeboard fue espectacular. Lo recomiendo a todos mis amigos y definitivamente vuelvo a reservar.',
    rating: 5,
    origin: 'Madrid, España',
  },
  {
    name: 'Sofía Herrera',
    tour: 'Tour Guatapé + Helicóptero',
    text: 'Ver Guatapé desde el aire fue algo que no tenía en mis planes y resultó ser lo mejor del viaje. Turtle Bus superó todas mis expectativas.',
    rating: 5,
    origin: 'Ciudad de México, México',
  },
  {
    name: 'James Wilson',
    tour: 'Paragliding Medellín',
    text: 'Best experience in Colombia! The guides were super professional and the views were absolutely breathtaking. Already planning my next trip.',
    rating: 5,
    origin: 'New York, USA',
  },
  {
    name: 'Valentina Torres',
    tour: 'Tour Guatapé + Cuatrimoto',
    text: 'La combinación del tour a Guatapé con la cuatrimoto fue perfecta. Mucha adrenalina y paisajes hermosos. El equipo de Turtle Bus es fantástico.',
    rating: 5,
    origin: 'Cali, Colombia',
  },
  {
    name: 'Andrés Castillo',
    tour: 'Tour Guatapé + Parapente',
    text: 'Volar en parapente sobre la represa de Guatapé es algo que no se puede describir con palabras. Sensación única, 100% recomendado.',
    rating: 5,
    origin: 'Barranquilla, Colombia',
  },
  {
    name: 'Camille Dubois',
    tour: 'Tour Guatapé Express',
    text: 'Parfait ! Organisation impeccable, guide très sympathique et professionnel. Guatapé est magnifique et Turtle Bus sait comment le montrer.',
    rating: 5,
    origin: 'París, Francia',
  },
  {
    name: 'Laura Gómez',
    tour: 'Tour Guatapé + Jet Ski',
    text: 'El jet ski en la represa fue una experiencia única. Aguas cristalinas y paisajes de película. El servicio de Turtle Bus es de primera.',
    rating: 5,
    origin: 'Medellín, Colombia',
  },
  {
    name: 'Pedro Alves',
    tour: 'Tour Guatapé Full Day',
    text: 'Incrível experiência! A subida à Pedra do Peñol valeu cada degrau. Guia excelente, transporte confortável. Voltarei com certeza.',
    rating: 5,
    origin: 'São Paulo, Brasil',
  },
  {
    name: 'Ana Mejía',
    tour: 'Tour Guatapé + Cabalgata',
    text: 'Recorrer las montañas a caballo fue mágico. Naturaleza pura y guías muy atentos. Turtle Bus hace que cada detalle del viaje sea especial.',
    rating: 5,
    origin: 'Pereira, Colombia',
  },
]

const CARDS_PER_PAGE = 3
const TOTAL_PAGES = Math.ceil(testimonials.length / CARDS_PER_PAGE)
const AUTOPLAY_INTERVAL = 5000

export function TestimonialsCarousel() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const go = useCallback(
    (dir: number) => {
      setDirection(dir)
      setPage((prev) => (prev + dir + TOTAL_PAGES) % TOTAL_PAGES)
    },
    []
  )

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => go(1), AUTOPLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [paused, go])

  const visibleTestimonials = testimonials.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  )

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Cards */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {visibleTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 bg-gradient-to-br from-neutral-light to-gray-50 rounded-2xl border-2 border-gray-200 hover:border-primary-600 hover:shadow-xl transition-all flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-xl">⭐</span>
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-700 mb-6 italic text-lg leading-relaxed flex-1">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-black text-lg shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-neutral-dark">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.origin}</p>
                    <p className="text-xs text-primary-600 font-semibold mt-0.5">{testimonial.tour}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-10">
        {/* Prev */}
        <button
          onClick={() => go(-1)}
          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary-600 hover:text-primary-600 transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > page ? 1 : -1); setPage(i) }}
              className={`rounded-full transition-all duration-300 ${
                i === page
                  ? 'w-6 h-3 bg-primary-600'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Página ${i + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => go(1)}
          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary-600 hover:text-primary-600 transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </div>

    </div>
  )
}
