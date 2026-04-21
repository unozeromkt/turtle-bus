'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface AdminProtectedProps {
  children: React.ReactNode
}

export function AdminProtected({ children }: AdminProtectedProps) {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/admin/login')
        return
      }
      setIsReady(true)
    }

    checkAuth()

    // Escuchar cambios de sesión (logout desde otra pestaña, expiración, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/admin/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

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
