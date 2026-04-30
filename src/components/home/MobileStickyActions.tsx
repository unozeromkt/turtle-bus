import Link from 'next/link'
import { Compass, MessageCircle } from 'lucide-react'

export function MobileStickyActions() {
  return (
    <div className="fixed inset-x-0 bottom-3 z-50 px-4 md:hidden pointer-events-none">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-md pointer-events-auto">
        <a
          href="https://wa.me/573001234567?text=Hola%20Turtle%20Bus%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20tours"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent-orange px-4 py-3 text-sm font-black text-white transition-colors hover:bg-orange-600"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <Link
          href="/tours"
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary-600 bg-white px-4 py-3 text-sm font-black text-primary-700 transition-colors hover:bg-primary-50"
        >
          <Compass size={18} />
          Ver tours
        </Link>
      </div>
    </div>
  )
}