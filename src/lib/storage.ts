import { supabase } from './supabase'
import imageCompression from 'browser-image-compression'

const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`

export interface CompressionOptions {
  /** Calidad de salida entre 0 y 1. Default: 0.85 */
  quality?: number
  /** Tamaño máximo en MB tras comprimir. Default: 1 */
  maxSizeMB?: number
  /** Dimensión máxima (ancho o alto) en px. Default: 1920 */
  maxWidthOrHeight?: number
}

export interface UploadOptions {
  bucket: 'tour-featured' | 'tour-gallery'
  folder: string
  compression?: CompressionOptions
}

type MimeType = 'image/jpeg' | 'image/png' | 'image/webp'
const ALLOWED_MIME_TYPES: MimeType[] = ['image/jpeg', 'image/png', 'image/webp']

/**
 * Validar archivo antes de subir (solo tipo y límite duro de 50MB)
 */
export function validateFile(file: File, maxSize: number = 50 * 1024 * 1024) {
  if (!ALLOWED_MIME_TYPES.includes(file.type as MimeType)) {
    throw new Error(
      'Formato no permitido. Solo JPG, PNG y WebP están permitidos.'
    )
  }

  if (file.size > maxSize) {
    throw new Error('El archivo es demasiado grande para procesar.')
  }
}

/**
 * Comprimir imagen en el cliente antes de subir.
 * Se convierte a WebP automáticamente.
 */
async function compressImage(file: File, opts: CompressionOptions = {}): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: opts.maxSizeMB ?? 1,
    maxWidthOrHeight: opts.maxWidthOrHeight ?? 1920,
    useWebWorker: true,
    fileType: 'image/webp',
    initialQuality: opts.quality ?? 0.85,
  })
}

/**
 * Subir un archivo a Supabase Storage
 */
export async function uploadFile(
  file: File,
  options: UploadOptions
): Promise<string> {
  // Validar tipo y límite duro antes de comprimir
  validateFile(file)

  // Comprimir y convertir a WebP en el cliente
  const compressed = await compressImage(file, options.compression)

  // El nombre siempre termina en .webp tras la compresión
  const randomStr = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  const fileName = `${Date.now()}-${randomStr.replace(/[^a-z0-9]/g, '')}.webp`
  const path = `${options.folder}/${fileName}`

  try {
    // Realizar upload
    const { error } = await supabase.storage
      .from(options.bucket)
      .upload(path, compressed, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/webp',
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
