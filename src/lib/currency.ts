export type SupportedCurrency = 'COP' | 'USD'

export const USD_MARGIN_MULTIPLIER = 1.05

const copFormatter = new Intl.NumberFormat('es-CO', {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

const usdFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

export function convertCopToUsd(priceCop: number, trm: number) {
  if (!Number.isFinite(priceCop) || !Number.isFinite(trm) || trm <= 0) {
    return 0
  }

  return (priceCop / trm) * USD_MARGIN_MULTIPLIER
}

export function formatAmount(amount: number, currency: SupportedCurrency) {
  const roundedAmount = Math.round(amount)

  if (currency === 'USD') {
    return `US$${usdFormatter.format(roundedAmount)}`
  }

  return `$${copFormatter.format(roundedAmount)}`
}

export function formatPriceFromCop(priceCop: number, currency: SupportedCurrency, trm: number | null) {
  if (currency === 'USD' && trm) {
    return formatAmount(convertCopToUsd(priceCop, trm), 'USD')
  }

  return formatAmount(priceCop, 'COP')
}