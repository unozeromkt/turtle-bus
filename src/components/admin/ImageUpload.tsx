'use client'

import { useState, useRef } from 'react'
import { useFileUpload } from '@/hooks/useFileUpload'
import { X, Upload, Loader2 } from 'lucide-react'

interface ImageUploadProps {
  value?: string | null
  onChange: (url: string | null | undefined) => void
  label?: string
  placeholder?: string
  className?: string
}

export function ImageUpload({
  value,
  onChange,
  label = 'Imagen Destacada',
  placeholder = 'Haz clic para subir o arrastra una imagen',
  className = '',
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const { uploading, error, progress, uploadSingleFile, removeFile } = useFileUpload({
    bucket: 'tour-featured',
    folder: 'featured-images',
    onSuccess: (url) => {
      if (typeof url === 'string') onChange(url)
    },
  })

  const handleFileSelect = async (file: File) => {
    try {
      console.log('📸 Iniciando upload de imagen:', file.name, file.size)
      const url = await uploadSingleFile(file)
      console.log('✅ Imagen subida exitosamente:', url)
      // onChange ya se llama en onSuccess
    } catch (err) {
      console.error('❌ Error:', err)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
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

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file)
    }
  }

  const handleRemove = async () => {
    if (value) {
      setIsRemoving(true)
      try {
        // Verificar si es una URL de Supabase Storage
        const isSupabaseUrl = value.includes('supabase.co')
        
        if (isSupabaseUrl) {
          // Si es de Supabase, intentar eliminar del storage
          await removeFile(value)
        }
        // Sea de Supabase o URL externa, limpiar el estado
        onChange(null)
      } catch (err) {
        console.error('Error:', err)
        // Aún así limpiar el estado aunque falle la eliminación
        onChange(null)
      } finally {
        setIsRemoving(false)
      }
    }
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-300">
          <img
            src={value}
            alt="Featured"
            className="w-full h-full object-cover"
          />

          <button
            type="button"
            onClick={handleRemove}
            disabled={isRemoving}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white p-2 rounded-full transition"
          >
            {isRemoving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>

          {progress > 0 && progress < 100 && (
            <div className="absolute inset-0 bg-black/50 flex items-end justify-center">
              <div className="w-3/4 h-1 bg-gray-700 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-blue-500 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            w-full h-64 rounded-lg border-2 border-dashed cursor-pointer
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
          <div className="text-center">
            {uploading ? (
              <>
                <Loader2 className="w-12 h-12 text-blue-500 mx-auto mb-2 animate-spin" />
                <p className="text-sm text-gray-600">{Math.round(progress)}%</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">{placeholder}</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG o WebP (máx. 10MB)</p>
              </>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleInputChange}
            disabled={uploading}
            className="hidden"
            aria-label="Upload image"
          />
        </div>
      )}

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  )
}
