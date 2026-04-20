'use client'

import { XCircle } from 'lucide-react'

interface ExcludesSectionProps {
  excludes?: string[] | null
}

export function ExcludesSection({ excludes }: ExcludesSectionProps) {
  if (!excludes || excludes.length === 0) {
    return null
  }

  // Ensure excludes is an array
  const items = Array.isArray(excludes) ? excludes : []
  if (items.length === 0) return null

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-black text-neutral-dark border-l-4 border-red-600 pl-4">
        ✗ Qué NO incluye
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-red-50 p-4 rounded-lg border-l-4 border-red-600 hover:shadow-md transition-shadow"
          >
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-800 leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
