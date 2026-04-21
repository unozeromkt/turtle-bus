'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface AdminProtectedProps {
  children: React.ReactNode
}

export function AdminProtected({ children }: AdminProtectedProps) {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      // Simple check: if on admin routes, we'll protect at the layout level
      // For now, just mark as ready to avoid infinite loading
      setIsReady(true)
    }

    checkAuth()
  }, [])

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-[#5A7332]" />
          <p className="text-gray-600 text-center">Cargando...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
