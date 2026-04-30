'use client'

import { useCurrency } from './CurrencyProvider'

export function CurrencySwitcher({ compact = false }: { compact?: boolean }) {
  const { currency, setCurrency, canUseUsd } = useCurrency()

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/20 bg-black/20 p-1 backdrop-blur-sm ${
        compact ? 'text-[11px]' : 'text-xs'
      }`}
    >
      <button
        type="button"
        onClick={() => setCurrency('COP')}
        className={`rounded-full px-3 py-1 font-black transition-colors ${
          currency === 'COP' ? 'bg-white text-neutral-dark' : 'text-white/75 hover:text-white'
        }`}
      >
        COP
      </button>
      <button
        type="button"
        onClick={() => setCurrency('USD')}
        disabled={!canUseUsd}
        className={`rounded-full px-3 py-1 font-black transition-colors ${
          currency === 'USD' ? 'bg-accent-orange text-white' : 'text-white/75 hover:text-white'
        } ${!canUseUsd ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        USD
      </button>
    </div>
  )
}