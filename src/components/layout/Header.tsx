'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X, Search, Phone, Instagram, Facebook } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Custom SVG icons for TikTok and TripAdvisor
function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  )
}

function TripAdvisorIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3.5c1.8 0 3.45.58 4.78 1.56L18 5.84A8.46 8.46 0 0 0 12 3.5a8.46 8.46 0 0 0-6 2.34l1.22 1.22A6.96 6.96 0 0 1 12 5.5zM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0zm4.5-2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
  )
}

const NAV_LINKS = ['Tours', 'Destinos', 'Blog', 'Contacto']

const SOCIAL_LINKS = [
  { href: 'https://instagram.com/turtlebus', label: 'Instagram', Icon: Instagram },
  { href: 'https://facebook.com/turtlebus', label: 'Facebook', Icon: Facebook },
  { href: 'https://tiktok.com/@turtlebus', label: 'TikTok', Icon: TikTokIcon },
  { href: 'https://tripadvisor.com', label: 'TripAdvisor', Icon: TripAdvisorIcon },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/tours?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const textColor = scrolled ? 'text-white' : 'text-white'
  const hoverColor = 'hover:text-gold-500'

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: scrolled ? 'rgba(26,46,32,0.95)' : 'rgba(0,0,0,0)',
        backdropFilter: scrolled ? 'blur(14px)' : 'blur(0px)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.25)' : 'none',
      }}
      transition={{ duration: 0.3 }}
    >
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/logo.png"
            alt="Turtle Bus Adventure Tours"
            width={280}
            height={120}
            className={`w-auto object-contain drop-shadow-md transition-all duration-300 ${
              scrolled ? 'h-12' : 'h-24'
            }`}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`font-semibold text-sm transition-colors duration-300 drop-shadow-sm ${textColor} ${hoverColor}`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right side: socials + phone + search + CTA */}
        <div className="hidden md:flex items-center gap-4">

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`transition-colors duration-200 drop-shadow-sm ${textColor} ${hoverColor} opacity-80 hover:opacity-100`}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>

          {/* Divider */}
          <span className="w-px h-5 bg-white/30" />

          {/* Phone */}
          <a
            href="tel:+573107788830"
            className={`flex items-center gap-1.5 group ${textColor}`}
          >
            <Phone size={14} className="opacity-70 group-hover:text-gold-500 transition-colors" />
            <div className="leading-tight">
              <p className="text-[10px] opacity-60 uppercase tracking-wider">Llámenos</p>
              <p className="text-xs font-bold group-hover:text-gold-500 transition-colors">(310) 778 8830</p>
            </div>
          </a>

          {/* Divider */}
          <span className="w-px h-5 bg-white/30" />

          {/* Search icon */}
          <button
            aria-label="Buscar tours"
            onClick={() => setSearchOpen(!searchOpen)}
            className={`p-1.5 rounded-lg transition-colors ${textColor} ${hoverColor} hover:bg-white/10`}
          >
            <Search size={19} />
          </button>

          {/* CTA */}
          <Link
            href="/tours"
            className="bg-accent-orange text-white font-black text-sm py-2 px-5 rounded-xl hover:bg-orange-600 transition-all hover:scale-105 shadow-lg"
          >
            Explorar Tours
          </Link>
        </div>

        {/* Mobile right: search + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            aria-label="Buscar"
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-white"
          >
            <Search size={20} />
          </button>
          <button
            className="p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Search bar dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10"
            style={{ backgroundColor: 'rgba(26,46,32,0.97)', backdropFilter: 'blur(14px)' }}
          >
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
              <Search size={18} className="text-gold-500 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar tours: paragliding, Guatapé, aventura..."
                className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm font-medium"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="text-white/50 hover:text-white">
                  <X size={16} />
                </button>
              )}
              <button
                type="submit"
                className="bg-accent-orange text-white font-black text-xs py-1.5 px-4 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Buscar
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden border-t border-white/10"
            style={{ backgroundColor: 'rgba(26,46,32,0.97)', backdropFilter: 'blur(14px)' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="font-semibold py-3 px-2 rounded-lg text-white hover:text-gold-500 hover:bg-white/5 transition"
                >
                  {item}
                </Link>
              ))}
              {/* Mobile phone */}
              <a
                href="tel:+573107788830"
                className="flex items-center gap-2 py-3 px-2 text-white/80 hover:text-gold-500 transition"
              >
                <Phone size={16} />
                <span className="text-sm font-semibold">(310) 778 8830</span>
              </a>
              {/* Mobile socials */}
              <div className="flex items-center gap-4 px-2 pt-2 pb-1 border-t border-white/10 mt-1">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-white/70 hover:text-gold-500 transition"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
