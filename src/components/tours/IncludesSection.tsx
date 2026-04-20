'use client'

import { CheckCircle2 } from 'lucide-react'

interface IncludesSectionProps {
  includes?: string[] | null
}

export function IncludesSection({ includes }: IncludesSectionProps) {
  if (!includes || includes.length === 0) {
    return null
  }

  // Ensure includes is an array
  const items = Array.isArray(includes) ? includes : []
  if (items.length === 0) return null

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-black text-neutral-dark border-l-4 border-green-600 pl-4">
        ✓ Qué incluye
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border-l-4 border-green-600 hover:shadow-md transition-shadow"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-800 leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
