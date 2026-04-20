'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative text-white" style={{ backgroundColor: '#1C0A04' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="Turtle Bus"
                width={160}
                height={64}
                className="w-auto h-14 object-contain"
              />
            </Link>
            <p className="text-gray-300 text-sm">
              Tours de aventura, naturaleza y cultura en Medellín y Guatapé.
            </p>
          </div>

          {/* Tours */}
          <div>
            <h4 className="font-bold mb-4">Tours</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/tours" className="hover:text-gold-500">Todos los tours</Link></li>
              <li><Link href="/tours?category=aventura" className="hover:text-gold-500">Aventura</Link></li>
              <li><Link href="/tours?category=naturaleza" className="hover:text-gold-500">Naturaleza</Link></li>
              <li><Link href="/tours?category=cultura" className="hover:text-gold-500">Cultura</Link></li>
            </ul>
          </div>

          {/* Destinos */}
          <div>
            <h4 className="font-bold mb-4">Destinos</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/destinos" className="hover:text-gold-500">Todos</Link></li>
              <li><Link href="/blog" className="hover:text-gold-500">Blog</Link></li>
              <li><Link href="/about" className="hover:text-gold-500">Sobre Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-gold-500">Contacto</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📧 info@turtlebus.co</li>
              <li>📱 +57 300 123 4567</li>
              <li className="pt-2">
                <Link href="https://instagram.com" target="_blank" className="hover:text-gold-500">Instagram →</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Turtle Bus. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white">Privacidad</Link>
            <Link href="/terms" className="hover:text-white">Términos</Link>
            <Link href="/contacto" className="hover:text-white">Contacto</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
