'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-light">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-accent-orange mb-4">⚠️</h1>
        <h2 className="text-3xl font-black text-neutral-dark mb-2 title-cabin">Algo salió mal</h2>
        <p className="text-gray-600 mb-6">
          Encontramos un error. Por favor intenta de nuevo.
        </p>
        <button
          onClick={() => reset()}
          className="btn btn-primary"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  )
}
