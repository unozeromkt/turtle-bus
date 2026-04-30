'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { formatPriceFromCop, type SupportedCurrency } from '@/lib/currency'

type CurrencyContextValue = {
  currency: SupportedCurrency
  setCurrency: (currency: SupportedCurrency) => void
  trm: number | null
  formatPrice: (priceCop: number) => string
  canUseUsd: boolean
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>('COP')
  const [trm, setTrm] = useState<number | null>(null)

  useEffect(() => {
    const savedCurrency = window.localStorage.getItem('preferred-currency') as SupportedCurrency | null
    if (savedCurrency === 'COP' || savedCurrency === 'USD') {
      setCurrencyState(savedCurrency)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadExchangeRate() {
      try {
        const response = await fetch('/api/exchange-rate')
        const data = (await response.json()) as { trm: number | null }

        if (!cancelled && data.trm) {
          setTrm(data.trm)
        }
      } catch (error) {
        console.error('Error loading exchange rate:', error)
      }
    }

    loadExchangeRate()

    return () => {
      cancelled = true
    }
  }, [])

  const canUseUsd = trm !== null

  const setCurrency = (nextCurrency: SupportedCurrency) => {
    if (nextCurrency === 'USD' && !canUseUsd) {
      return
    }

    setCurrencyState(nextCurrency)
    window.localStorage.setItem('preferred-currency', nextCurrency)
  }

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      trm,
      formatPrice: (priceCop: number) => formatPriceFromCop(priceCop, currency, trm),
      canUseUsd,
    }),
    [currency, trm, canUseUsd]
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const context = useContext(CurrencyContext)

  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider')
  }

  return context
}