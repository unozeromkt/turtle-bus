import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-light">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-black text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-black text-neutral-dark mb-2">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">
          La página que buscas no existe o fue movida.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn btn-primary">
            Ir a Home
          </Link>
          <Link href="/tours" className="btn btn-secondary">
            Ver Tours
          </Link>
        </div>
      </div>
    </div>
  )
}
