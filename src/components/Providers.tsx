'use client'

import { ReactNode } from 'react'
import { CurrencyProvider } from '@/components/currency/CurrencyProvider'

interface ProvidersProps {
  children: ReactNode
}

// Deprecated - we use Supabase Auth now, not NextAuth
export function Providers({ children }: ProvidersProps) {
  return <CurrencyProvider>{children}</CurrencyProvider>
}
