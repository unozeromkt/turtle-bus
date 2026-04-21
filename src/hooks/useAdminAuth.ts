'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const initAuth = async () => {
      try {
        // Primero intenta con getSession (más rápido)
        const { data: { session } } = await supabase.auth.getSession()
        if (mounted) {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error getting session:', error)
        if (mounted) {
          // Even if there's an error, mark as ready
          setLoading(false)
        }
      }
    }

    initAuth()

    // Escuchar cambios de autenticación
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (mounted) {
          setUser(session?.user ?? null)
        }
      })

      return () => {
        mounted = false
        subscription?.unsubscribe()
      }
    } catch (error) {
      console.error('Error setting up auth listener:', error)
      mounted = false
    }
  }, [])

  return { user, loading }
}
