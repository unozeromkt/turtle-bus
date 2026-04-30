'use server'

import { revalidatePath } from 'next/cache'
import {
  createTour,
  updateTour,
  deleteTour,
  type Tour,
} from '@/lib/db/tours'

function validatePromoPricing(formData: FormData) {
  const isPromoted = formData.get('isPromoted') === 'true'
  const promoOriginalRaw = formData.get('promoOriginalPriceAdult') as string
  const promoPriceRaw = formData.get('promoPriceAdult') as string

  if (!isPromoted) {
    return { success: true as const }
  }

  if (!promoOriginalRaw || !promoPriceRaw) {
    return {
      success: false as const,
      message: 'Si el tour está en promoción, debes ingresar precio antes y precio promoción',
    }
  }

  const promoOriginal = parseFloat(promoOriginalRaw)
  const promoPrice = parseFloat(promoPriceRaw)

  if (Number.isNaN(promoOriginal) || Number.isNaN(promoPrice)) {
    return {
      success: false as const,
      message: 'Los precios de promoción deben ser valores numéricos válidos',
    }
  }

  if (promoOriginal <= 0 || promoPrice <= 0) {
    return {
      success: false as const,
      message: 'Los precios de promoción deben ser mayores que cero',
    }
  }

  if (promoPrice >= promoOriginal) {
    return {
      success: false as const,
      message: 'El precio promoción debe ser menor que el precio antes',
    }
  }

  return { success: true as const }
}

// ➕ Crear tour (server action)
export async function createTourAction(formData: FormData) {
  try {
    const promoValidation = validatePromoPricing(formData)
    if (!promoValidation.success) {
      return {
        success: false,
        error: promoValidation.message,
        message: promoValidation.message,
      }
    }

    // Convertir FormData a objeto Tour
    const tourData: Partial<Tour> = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      description: (formData.get('description') as string) || null,
      long_description: (formData.get('longDescription') as string) || null,
      price_adult: parseFloat(formData.get('priceAdult') as string),
      price_child: formData.get('priceChild') ? parseFloat(formData.get('priceChild') as string) : null,
      is_promoted: formData.get('isPromoted') === 'true' || false,
      promo_original_price_adult: formData.get('promoOriginalPriceAdult')
        ? parseFloat(formData.get('promoOriginalPriceAdult') as string)
        : null,
      promo_price_adult: formData.get('promoPriceAdult')
        ? parseFloat(formData.get('promoPriceAdult') as string)
        : null,
      duration: formData.get('duration') as string,
      destination_id: formData.get('destinationId') as string,
      category_id: formData.get('categoryId') as string,
      is_published: formData.get('isPublished') === 'true',
      is_featured: formData.get('isFeatured') === 'true' || false,
      meeting_point: (formData.get('meetingPoint') as string) || null,
      max_participants: formData.get('maxParticipants')
        ? parseInt(formData.get('maxParticipants') as string)
        : null,
      min_age: formData.get('minAge') ? parseInt(formData.get('minAge') as string) : null,
      max_age: formData.get('maxAge') ? parseInt(formData.get('maxAge') as string) : null,
      featured_image: (formData.get('featuredImage') as string) || null,
      gallery_images: (() => {
        try {
          const images = formData.get('galleryImages') as string
          return images ? JSON.parse(images) : []
        } catch {
          return []
        }
      })(),
      video_url: (formData.get('videoUrl') as string) || null,
    }

    const createdTour = await createTour(tourData)
    
    revalidatePath('/admin/tours')
    revalidatePath('/tours')
    revalidatePath('/')

    return { success: true, data: createdTour, message: 'Tour creado exitosamente' }
  } catch (error) {
    console.error('Error creating tour:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error al crear el tour',
      message: 'No se pudo crear el tour'
    }
  }
}

// ✏️ Actualizar tour (server action)
export async function updateTourAction(tourId: string, formData: FormData) {
  try {
    const promoValidation = validatePromoPricing(formData)
    if (!promoValidation.success) {
      return {
        success: false,
        error: promoValidation.message,
        message: promoValidation.message,
      }
    }

    const tourData: Partial<Tour> = {
      title: formData.get('title') as string,
      description: (formData.get('description') as string) || null,
      long_description: (formData.get('longDescription') as string) || null,
      price_adult: parseFloat(formData.get('priceAdult') as string),
      price_child: formData.get('priceChild') ? parseFloat(formData.get('priceChild') as string) : null,
      is_promoted: formData.get('isPromoted') === 'true' || false,
      promo_original_price_adult: formData.get('promoOriginalPriceAdult')
        ? parseFloat(formData.get('promoOriginalPriceAdult') as string)
        : null,
      promo_price_adult: formData.get('promoPriceAdult')
        ? parseFloat(formData.get('promoPriceAdult') as string)
        : null,
      duration: formData.get('duration') as string,
      is_published: formData.get('isPublished') === 'true',
      is_featured: formData.get('isFeatured') === 'true' || false,
      meeting_point: (formData.get('meetingPoint') as string) || null,
      max_participants: formData.get('maxParticipants')
        ? parseInt(formData.get('maxParticipants') as string)
        : null,
      min_age: formData.get('minAge') ? parseInt(formData.get('minAge') as string) : null,
      max_age: formData.get('maxAge') ? parseInt(formData.get('maxAge') as string) : null,
      featured_image: (formData.get('featuredImage') as string) || null,
      gallery_images: (() => {
        try {
          const images = formData.get('galleryImages') as string
          return images ? JSON.parse(images) : []
        } catch {
          return []
        }
      })(),
      video_url: (formData.get('videoUrl') as string) || null,
    }

    const updatedTour = await updateTour(tourId, tourData)
    
    const slug = formData.get('slug') as string
    revalidatePath('/admin/tours')
    revalidatePath(`/tours/${slug}`)
    revalidatePath('/tours')
    revalidatePath('/')

    return { success: true, data: updatedTour, message: 'Tour actualizado exitosamente' }
  } catch (error) {
    console.error('Error updating tour:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error al actualizar el tour',
      message: 'No se pudo actualizar el tour'
    }
  }
}

// 🗑️ Eliminar tour (server action)
export async function deleteTourAction(tourId: string, slug: string) {
  try {
    await deleteTour(tourId)
    
    revalidatePath('/admin/tours')
    revalidatePath(`/tours/${slug}`)
    revalidatePath('/tours')
    revalidatePath('/')

    return { success: true, message: 'Tour eliminado exitosamente' }
  } catch (error) {
    console.error('Error deleting tour:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error al eliminar el tour',
      message: 'No se pudo eliminar el tour'
    }
  }
}

// Publica/despublica un tour
export async function toggleTourPublish(tourId: string, isPublished: boolean, slug: string) {
  try {
    const updatedTour = await updateTour(tourId, { is_published: !isPublished })
    
    revalidatePath('/admin/tours')
    revalidatePath(`/tours/${slug}`)
    revalidatePath('/tours')
    revalidatePath('/')

    return { 
      success: true, 
      data: updatedTour, 
      message: !isPublished ? 'Tour publicado' : 'Tour despublicado'
    }
  } catch (error) {
    console.error('Error toggling tour publish:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error al actualizar',
      message: 'No se pudo actualizar el estado del tour'
    }
  }
}
