import { useState, useCallback } from 'react'
import { uploadFile, uploadMultipleFiles, deleteFile } from '@/lib/storage'
import type { UploadOptions } from '@/lib/storage'

interface UseFileUploadOptions extends UploadOptions {
  onSuccess?: (url: string | string[]) => void
  onError?: (error: Error) => void
}

export function useFileUpload(options: UseFileUploadOptions) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const uploadSingleFile = useCallback(
    async (file: File) => {
      setUploading(true)
      setError(null)
      setProgress(0)

      try {
        // Simular progreso
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) clearInterval(progressInterval)
            return prev + Math.random() * 30
          })
        }, 200)

        const url = await uploadFile(file, {
          bucket: options.bucket,
          folder: options.folder,
        })

        clearInterval(progressInterval)
        setProgress(100)

        options.onSuccess?.(url)
        return url
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Error desconocido')
        setError(error.message)
        options.onError?.(error)
        throw error
      } finally {
        setUploading(false)
        setTimeout(() => setProgress(0), 500)
      }
    },
    [options]
  )

  const uploadMultiple = useCallback(
    async (files: File[]) => {
      setUploading(true)
      setError(null)
      setProgress(0)

      try {
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) clearInterval(progressInterval)
            return prev + Math.random() * 20
          })
        }, 200)

        const urls = await uploadMultipleFiles(files, {
          bucket: options.bucket,
          folder: options.folder,
        })

        clearInterval(progressInterval)
        setProgress(100)

        options.onSuccess?.(urls)
        return urls
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Error desconocido')
        setError(error.message)
        options.onError?.(error)
        throw error
      } finally {
        setUploading(false)
        setTimeout(() => setProgress(0), 500)
      }
    },
    [options]
  )

  const removeFile = useCallback(
    async (url: string) => {
      try {
        await deleteFile(options.bucket, url)
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Error desconocido')
        setError(error.message)
        options.onError?.(error)
        throw error
      }
    },
    [options]
  )

  return {
    uploading,
    error,
    progress,
    uploadSingleFile,
    uploadMultiple,
    removeFile,
    clearError: () => setError(null),
  }
}
