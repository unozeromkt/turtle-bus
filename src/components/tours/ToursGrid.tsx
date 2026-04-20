'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { TourCard } from './TourCard'

interface Tour {
  id: string
  title: string
  slug: string
  price_adult: number
  duration: string
  featured_image: string | null
  is_featured: boolean
  destinations?: { name: string; slug: string }
  categories?: { name: string; slug: string; icon: string }
}

interface FilterOption {
  slug: string
  name: string
  icon?: string
}

interface ToursGridProps {
  tours: Tour[]
  destinations: FilterOption[]
  categories: FilterOption[]
}

const PRICE_RANGES = [
  { label: 'Todos los precios', min: 0, max: Infinity },
  { label: 'Hasta $100.000', min: 0, max: 100000 },
  { label: '$100.000 – $200.000', min: 100000, max: 200000 },
  { label: '$200.000 – $400.000', min: 200000, max: 400000 },
  { label: 'Más de $400.000', min: 400000, max: Infinity },
]

export function ToursGrid({ tours, destinations, categories }: ToursGridProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  const activeFiltersCount = [
    selectedCategory,
    selectedDestination,
    selectedPriceIdx !== 0 ? true : null,
  ].filter(Boolean).length

  const filtered = useMemo(() => {
    const priceRange = PRICE_RANGES[selectedPriceIdx]
    return tours.filter(t => {
      const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase())
      const matchCat = !selectedCategory || t.categories?.slug === selectedCategory
      const matchDest = !selectedDestination || t.destinations?.slug === selectedDestination
      const matchPrice = t.price_adult >= priceRange.min && t.price_adult <= priceRange.max
      return matchSearch && matchCat && matchDest && matchPrice
    })
  }, [tours, search, selectedCategory, selectedDestination, selectedPriceIdx])

  function clearFilters() {
    setSearch('')
    setSelectedCategory(null)
    setSelectedDestination(null)
    setSelectedPriceIdx(0)
  }

  return (
    <div>
      {/* Barra de búsqueda + botón filtros */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar tour..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-primary-600 focus:outline-none text-sm font-medium transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(v => !v)}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-bold text-sm transition-all ${
            showFilters || activeFiltersCount > 0
              ? 'border-primary-600 bg-primary-600 text-white'
              : 'border-gray-200 bg-white text-neutral-dark hover:border-primary-600'
          }`}
        >
          <SlidersHorizontal size={17} />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-primary-600 text-xs font-black flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Panel de filtros */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categorías */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Categoría</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-all ${
                      !selectedCategory
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'border-gray-200 text-gray-600 hover:border-primary-600'
                    }`}
                  >
                    Todas
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug === selectedCategory ? null : cat.slug)}
                      className={`px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-all ${
                        selectedCategory === cat.slug
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'border-gray-200 text-gray-600 hover:border-primary-600'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Destinos */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Destino</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedDestination(null)}
                    className={`px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-all ${
                      !selectedDestination
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'border-gray-200 text-gray-600 hover:border-primary-600'
                    }`}
                  >
                    Todos
                  </button>
                  {destinations.map(dest => (
                    <button
                      key={dest.slug}
                      onClick={() => setSelectedDestination(dest.slug === selectedDestination ? null : dest.slug)}
                      className={`px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-all ${
                        selectedDestination === dest.slug
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'border-gray-200 text-gray-600 hover:border-primary-600'
                      }`}
                    >
                      {dest.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Precio */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Precio</p>
                <div className="flex flex-col gap-2">
                  {PRICE_RANGES.map((range, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPriceIdx(i)}
                      className={`text-left px-3 py-1.5 rounded-lg text-sm font-bold border-2 transition-all ${
                        selectedPriceIdx === i
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'border-gray-200 text-gray-600 hover:border-primary-600'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resultado y limpiar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-gray-500">
          <span className="text-neutral-dark font-black text-lg">{filtered.length}</span> tour{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </p>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm font-bold text-accent-orange hover:underline flex items-center gap-1"
          >
            <X size={14} /> Limpiar filtros
          </button>
        )}
      </div>

      {/* Grid de tours */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-24 text-gray-400"
          >
            <p className="text-5xl mb-4">🗺️</p>
            <p className="font-black text-xl text-gray-500">No se encontraron tours</p>
            <p className="text-sm mt-2">Intenta con otros filtros</p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((tour, i) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <TourCard
                  id={tour.id}
                  title={tour.title}
                  slug={tour.slug}
                  priceAdult={tour.price_adult}
                  duration={tour.duration}
                  destination={tour.destinations?.name || 'Destino'}
                  featuredImage={
                    tour.featured_image ||
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop'
                  }
                  isFeatured={tour.is_featured}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
