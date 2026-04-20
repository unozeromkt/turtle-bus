import { supabase } from './supabase'

const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`

export interface UploadOptions {
  bucket: 'tour-featured' | 'tour-gallery'
  folder: string
  maxSize?: number // en bytes
}

type MimeType = 'image/jpeg' | 'image/png' | 'image/webp'
const ALLOWED_MIME_TYPES: MimeType[] = ['image/jpeg', 'image/png', 'image/webp']

/**
 * Validar archivo antes de subir
 */
export function validateFile(file: File, maxSize: number = 5 * 1024 * 1024) {
  if (!ALLOWED_MIME_TYPES.includes(file.type as MimeType)) {
    throw new Error(
      'Formato no permitido. Solo JPG, PNG y WebP están permitidos.'
    )
  }

  if (file.size > maxSize) {
    const maxMB = Math.round(maxSize / 1024 / 1024)
    throw new Error(`Archivo muy grande. Máximo ${maxMB}MB.`)
  }
}

/**
 * Subir un archivo a Supabase Storage
 */
export async function uploadFile(
  file: File,
  options: UploadOptions
): Promise<string> {
  // Validar
  const maxSize = options.bucket === 'tour-featured' ? 10 * 1024 * 1024 : 5 * 1024 * 1024
  validateFile(file, maxSize)

  // Generar nombre único con caracteres seguros
  const ext = file.name.split('.').pop()?.toLowerCase()
  // Usar solo números y letras para evitar problemas de encoding
  const randomStr = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  const fileName = `${Date.now()}-${randomStr.replace(/[^a-z0-9]/g, '')}.${ext}`
  const path = `${options.folder}/${fileName}`

  try {
    // Realizar upload
    const { error } = await supabase.storage
      .from(options.bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw error

    // Retornar URL pública
    return `${STORAGE_URL}/${options.bucket}/${path}`
  } catch (error: any) {
    console.error('Error uploading file:', error)
    throw new Error(error.message || 'Error al subir la imagen')
  }
}

/**
 * Subir múltiples archivos (galería)
 */
export async function uploadMultipleFiles(
  files: File[],
  options: UploadOptions
): Promise<string[]> {
  if (files.length === 0) throw new Error('No hay archivos para subir')
  if (files.length > 10) throw new Error('Máximo 10 imágenes permitidas')

  try {
    const urls = await Promise.all(
      files.map(file => uploadFile(file, options))
    )
    return urls
  } catch (error: any) {
    console.error('Error uploading multiple files:', error)
    throw error
  }
}

/**
 * Eliminar un archivo de Storage
 */
export async function deleteFile(bucket: string, fileUrl: string): Promise<void> {
  try {
    // Extraer path de la URL
    const urlParts = fileUrl.split(`/${bucket}/`)
    if (!urlParts[1]) throw new Error('URL inválida')
    const path = urlParts[1]

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) throw error
  } catch (error: any) {
    console.error('Error deleting file:', error)
    throw new Error(error.message || 'Error al eliminar la imagen')
  }
}

/**
 * Eliminar múltiples archivos
 */
export async function deleteMultipleFiles(
  bucket: string,
  urls: string[]
): Promise<void> {
  try {
    await Promise.all(urls.map(url => deleteFile(bucket, url)))
  } catch (error: any) {
    console.error('Error deleting multiple files:', error)
    throw error
  }
}

/**
 * Obtener URL pública de un archivo
 */
export function getPublicUrl(bucket: string, path: string): string {
  return `${STORAGE_URL}/${bucket}/${path}`
}
