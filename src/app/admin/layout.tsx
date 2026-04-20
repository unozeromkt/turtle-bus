import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-dark text-white p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-8">🐢 Admin</h1>
        <nav className="space-y-4">
          <Link href="/admin/dashboard" className="block p-3 bg-primary-600 rounded-lg font-semibold">
            📊 Dashboard
          </Link>
          <Link href="/admin/tours" className="block p-3 hover:bg-gray-700 rounded-lg">
            🎫 Tours
          </Link>
          <Link href="/admin/destinos" className="block p-3 hover:bg-gray-700 rounded-lg">
            📍 Destinos
          </Link>
          <Link href="/admin/blog" className="block p-3 hover:bg-gray-700 rounded-lg">
            ✍️ Blog
          </Link>
          <div className="block p-3 text-gray-400 rounded-lg cursor-not-allowed">
            📧 Marketing
          </div>
          <Link href="/admin/settings" className="block p-3 hover:bg-gray-700 rounded-lg">
            ⚙️ Configuración
          </Link>
          <hr className="my-4" />
          <Link href="/" className="block p-3 hover:bg-gray-700 rounded-lg text-sm">
            ← Volver al sitio
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
