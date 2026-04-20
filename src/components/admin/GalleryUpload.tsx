'use client'

import { useState, useRef } from 'react'
import { useFileUpload } from '@/hooks/useFileUpload'
import { X, Upload, Loader2, Plus } from 'lucide-react'

interface GalleryUploadProps {
  value?: string[]
  onChange: (urls: string[]) => void
  maxImages?: number
  label?: string
  className?: string
}

export function GalleryUpload({
  value = [],
  onChange,
  maxImages = 10,
  label = 'Galería de Imágenes',
  className = '',
}: GalleryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const { uploading, error, progress, uploadMultiple, removeFile } = useFileUpload({
    bucket: 'tour-gallery',
    folder: 'gallery-images',
    onSuccess: (urls) => {
      if (Array.isArray(urls)) {
        onChange([...value, ...urls])
      }
    },
  })

  const canAddMore = value.length < maxImages

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'))

    if (fileArray.length === 0) return

    const totalWillBe = value.length + fileArray.length
    if (totalWillBe > maxImages) {
      alert(`Máximo ${maxImages} imágenes permitidas. Ya tienes ${value.length}.`)
      return
    }

    try {
      await uploadMultiple(fileArray)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.currentTarget.files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(canAddMore)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    if (!canAddMore) return

    handleFileSelect(e.dataTransfer.files)
  }

  const handleRemoveImage = async (url: string) => {
    try {
      await removeFile(url)
      onChange(value.filter(v => v !== url))
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          <span className="ML-2 text-xs text-gray-500">
            ({value.length}/{maxImages})
          </span>
        </label>
      )}

      {/* Grid de imágenes */}
      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {value.map((url, idx) => (
          <div
            key={url}
            className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200"
          >
            <img
              src={url}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-full object-cover"
            />

            <button
              type="button"
              onClick={() => handleRemoveImage(url)}
              disabled={uploading}
              className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white p-1 rounded-full transition"
            >
              <X className="w-4 h-4" />
            </button>

            {progress > 0 && progress < 100 && idx === value.length - 1 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-sm font-medium">
                  {Math.round(progress)}%
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Botón para agregar */}
        {canAddMore && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`
              relative aspect-square rounded-lg border-2 border-dashed cursor-pointer
              transition-all duration-200 flex items-center justify-center
              ${
                uploading
                  ? 'border-blue-400 bg-blue-50'
                  : isDragOver
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
              }
            `}
          >
            {uploading ? (
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            ) : (
              <div className="text-center">
                <Plus className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Agregar</p>
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleInputChange}
              disabled={uploading || !canAddMore}
              className="hidden"
              aria-label="Upload gallery images"
            />
          </div>
        )}
      </div>

      {/* Información */}
      <div className="text-xs text-gray-500 mb-2">
        JPG, PNG o WebP • Máximo 5MB por imagen • {maxImages - value.length} espacios disponibles
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {value.length === 0 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
          📸 Agrega al menos 1 imagen a la galería
        </div>
      )}
    </div>
  )
}
