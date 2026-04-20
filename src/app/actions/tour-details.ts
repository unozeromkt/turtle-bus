'use server'

import { revalidatePath } from 'next/cache'
import { getTourFAQs, getTourTestimonials, createFAQ, updateFAQ, deleteFAQ, createAvailability, updateAvailability, deleteAvailability, createTestimonial, updateTestimonial, deleteTestimonial, updateTourItinerary, updateTourIncludes, updateTourExcludes } from '@/lib/db/tour-details'

// ★ GET Actions ★

export async function getFAQsAction(tourId: string) {
  try {
    const faqs = await getTourFAQs(tourId)
    return { success: true, data: faqs, message: '' }
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return {
      success: false,
      data: [],
      message: error instanceof Error ? error.message : 'Error al cargar FAQs',
    }
  }
}

export async function getTestimonialsAction(tourId: string) {
  try {
    const testimonials = await getTourTestimonials(tourId)
    return { success: true, data: testimonials, message: '' }
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return {
      success: false,
      data: [],
      message: error instanceof Error ? error.message : 'Error al cargar testimonios',
    }
  }
}

// ★ FAQ Actions ★

export async function createFAQAction(tourId: string, formData: FormData) {
  try {
    const question = formData.get('question') as string
    const answer = formData.get('answer') as string

    if (!question || !answer) {
      return { success: false, message: 'Campos requeridos' }
    }

    await createFAQ(tourId, { question, answer })

    revalidatePath(`/tours/`)
    revalidatePath(`/admin/tours/edit/${tourId}`)

    return { success: true, message: 'FAQ creada exitosamente' }
  } catch (error) {
    console.error('Error creating FAQ:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al crear FAQ',
    }
  }
}

export async function updateFAQAction(faqId: string, faqData: { question: string; answer: string }) {
  try {
    if (!faqData.question || !faqData.answer) {
      return { success: false, message: 'Campos requeridos' }
    }

    await updateFAQ(faqId, faqData)

    revalidatePath(`/tours/`)

    return { success: true, message: 'FAQ actualizada exitosamente' }
  } catch (error) {
    console.error('Error updating FAQ:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar FAQ',
    }
  }
}

export async function deleteFAQAction(faqId: string) {
  try {
    await deleteFAQ(faqId)

    revalidatePath(`/tours/`)

    return { success: true, message: 'FAQ eliminada exitosamente' }
  } catch (error) {
    console.error('Error deleting FAQ:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al eliminar FAQ',
    }
  }
}

// ★ Availability Actions ★

export async function createAvailabilityAction(tourId: string, formData: FormData) {
  try {
    const date = formData.get('date') as string
    const slots_available = parseInt(formData.get('slots_available') as string)
    const status = (formData.get('status') as string) || 'available'

    if (!date || !slots_available) {
      return { success: false, message: 'Campos requeridos' }
    }

    await createAvailability(tourId, { date, slots_available, status })

    revalidatePath(`/tours/`)
    revalidatePath(`/admin/tours/edit/${tourId}`)

    return { success: true, message: 'Disponibilidad creada exitosamente' }
  } catch (error) {
    console.error('Error creating availability:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al crear disponibilidad',
    }
  }
}

export async function updateAvailabilityAction(
  availId: string,
  availData: { date?: string; slots_available?: number; status?: string }
) {
  try {
    await updateAvailability(availId, availData)

    revalidatePath(`/tours/`)

    return { success: true, message: 'Disponibilidad actualizada exitosamente' }
  } catch (error) {
    console.error('Error updating availability:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar disponibilidad',
    }
  }
}

export async function deleteAvailabilityAction(availId: string) {
  try {
    await deleteAvailability(availId)

    revalidatePath(`/tours/`)

    return { success: true, message: 'Disponibilidad eliminada exitosamente' }
  } catch (error) {
    console.error('Error deleting availability:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al eliminar disponibilidad',
    }
  }
}

// ★ Testimonial Actions ★

export async function createTestimonialAction(tourId: string, formData: FormData) {
  try {
    const author = formData.get('author') as string
    const content = formData.get('content') as string
    const rating = parseInt(formData.get('rating') as string)
    const featured = formData.get('featured') === 'true'

    if (!author || !content || !rating) {
      return { success: false, message: 'Campos requeridos' }
    }

    if (rating < 1 || rating > 5) {
      return { success: false, message: 'La calificación debe estar entre 1 y 5' }
    }

    await createTestimonial(tourId, { author, content, rating, featured })

    revalidatePath(`/tours/`)
    revalidatePath(`/admin/tours/edit/${tourId}`)

    return { success: true, message: 'Testimonial creado exitosamente' }
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al crear testimonial',
    }
  }
}

export async function updateTestimonialAction(
  testimonialId: string,
  testimonialData: { author?: string; content?: string; rating?: number; featured?: boolean }
) {
  try {
    if (testimonialData.rating && (testimonialData.rating < 1 || testimonialData.rating > 5)) {
      return { success: false, message: 'La calificación debe estar entre 1 y 5' }
    }

    await updateTestimonial(testimonialId, testimonialData)

    revalidatePath(`/tours/`)

    return { success: true, message: 'Testimonial actualizado exitosamente' }
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar testimonial',
    }
  }
}

export async function deleteTestimonialAction(testimonialId: string) {
  try {
    await deleteTestimonial(testimonialId)

    revalidatePath(`/tours/`)

    return { success: true, message: 'Testimonial eliminado exitosamente' }
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al eliminar testimonial',
    }
  }
}

// ★ Itinerary Actions ★

export async function updateItineraryAction(tourId: string, itinerary: Array<{ time: string; title: string; description: string }>) {
  try {
    if (!itinerary || itinerary.length === 0) {
      return { success: false, message: 'Agrega al menos un paso al itinerario' }
    }

    // Validar que cada paso tenga los campos requeridos
    for (const item of itinerary) {
      if (!item.time || !item.title || !item.description) {
        return { success: false, message: 'Todos los pasos deben tener hora, título y descripción' }
      }
    }

    await updateTourItinerary(tourId, itinerary)

    revalidatePath(`/tours/`)
    revalidatePath(`/admin/tours/edit/${tourId}`)

    return { success: true, message: 'Itinerario actualizado exitosamente' }
  } catch (error) {
    console.error('Error updating itinerary:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar itinerario',
    }
  }
}

// ★ Includes/Excludes Actions ★

export async function updateIncludesAction(tourId: string, includes: string[]) {
  try {
    const cleanIncludes = includes.filter((item) => item.trim().length > 0)

    if (cleanIncludes.length === 0) {
      return { success: false, message: 'Agrega al menos un elemento a "Incluye"' }
    }

    await updateTourIncludes(tourId, cleanIncludes)

    revalidatePath(`/tours/`)
    revalidatePath(`/admin/tours/edit/${tourId}`)

    return { success: true, message: 'Incluye actualizado exitosamente' }
  } catch (error) {
    console.error('Error updating includes:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar incluye',
    }
  }
}

export async function updateExcludesAction(tourId: string, excludes: string[]) {
  try {
    const cleanExcludes = excludes.filter((item) => item.trim().length > 0)

    await updateTourExcludes(tourId, cleanExcludes.length > 0 ? cleanExcludes : null)

    revalidatePath(`/tours/`)
    revalidatePath(`/admin/tours/edit/${tourId}`)

    return { success: true, message: 'Excluye actualizado exitosamente' }
  } catch (error) {
    console.error('Error updating excludes:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar excluye',
    }
  }
}
