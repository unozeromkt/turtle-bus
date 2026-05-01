'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/admin/LogoutButton'
import { AdminProtected } from '@/components/admin/AdminProtected'
import AdminMessagesNavLink from '@/components/admin/AdminMessagesNavLink'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin/dashboard', label: '📊 Dashboard' },
    { href: '/admin/tours', label: '🎫 Tours' },
    { href: '/admin/destinos', label: '📍 Destinos' },
    { href: '/admin/blog', label: '✍️ Blog' },
    { href: '/admin/mensajes', label: '✉️ Mensajes' },
    { href: '/admin/settings', label: '⚙️ Configuración' },
  ]

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <AdminProtected>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-neutral-dark text-white p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-8">🐢 Admin</h1>
          <nav className="space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

              if (item.href === '/admin/mensajes') {
                return (
                  <AdminMessagesNavLink
                    key={item.href}
                    href={item.href}
                    isActive={isActive}
                  />
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg p-3 font-semibold transition-colors ${
                    isActive ? 'bg-primary-600' : 'hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="block p-3 text-gray-400 rounded-lg cursor-not-allowed">
              📧 Marketing
            </div>
            <hr className="my-4" />
            <Link href="/" className="block p-3 hover:bg-gray-700 rounded-lg text-sm">
              ← Volver al sitio
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bienvenido</p>
              <p className="text-lg font-semibold text-gray-900">Admin Panel</p>
            </div>
            <LogoutButton />
          </header>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </AdminProtected>
  )
}
