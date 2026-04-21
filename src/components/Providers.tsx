'use client'

import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

// Deprecated - we use Supabase Auth now, not NextAuth
export function Providers({ children }: ProvidersProps) {
  return <>{children}</>
}
