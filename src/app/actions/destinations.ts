'use server'

import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase'
import {
  createDestination,
  updateDestination,
  deleteDestination,
  type Destination,
} from '@/lib/db/destinations'

// ➕ Crear destino (server action)
export async function createDestinationAction(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const slug = formData.get('slug') as string

    if (!name || !slug) {
      return { success: false, message: 'Nombre y slug son requeridos' }
    }

    // Verificar que el nombre no exista
    const { data: existingByName } = await supabaseAdmin
      .from('destinations')
      .select('id')
      .eq('name', name)
      .is('deleted_at', null)
      .single()

    if (existingByName) {
      return {
        success: false,
        message: `Ya existe un destino con el nombre "${name}"`,
      }
    }

    // Verificar que el slug no exista
    const { data: existingBySlug } = await supabaseAdmin
      .from('destinations')
      .select('id')
      .eq('slug', slug)
      .is('deleted_at', null)
      .single()

    if (existingBySlug) {
      return {
        success: false,
        message: `Ya existe un destino con el slug "${slug}"`,
      }
    }

    const destinationData: Partial<Destination> = {
      name,
      slug,
      description: (formData.get('description') as string) || null,
      short_description: (formData.get('shortDescription') as string) || null,
      city: (formData.get('city') as string) || null,
      region: (formData.get('region') as string) || null,
      featured_image: (formData.get('featuredImage') as string) || null,
      gallery_images: (() => {
        try {
          const images = formData.get('galleryImages') as string
          return images ? JSON.parse(images) : []
        } catch {
          return []
        }
      })(),
      latitude: formData.get('latitude') ? parseFloat(formData.get('latitude') as string) : null,
      longitude: formData.get('longitude') ? parseFloat(formData.get('longitude') as string) : null,
      is_published: formData.get('isPublished') === 'true',
      order: formData.get('order') ? parseInt(formData.get('order') as string) : 0,
      meta_title: (formData.get('metaTitle') as string) || null,
      meta_description: (formData.get('metaDescription') as string) || null,
    }

    const createdDestination = await createDestination(destinationData)

    revalidatePath('/admin/destinos')
    revalidatePath('/destinos')
    revalidatePath('/')

    return { success: true, data: createdDestination, message: 'Destino creado exitosamente' }
  } catch (error) {
    console.error('Error creating destination:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al crear el destino',
      message: 'No se pudo crear el destino',
    }
  }
}

// ✏️ Actualizar destino (server action)
export async function updateDestinationAction(destinationId: string, formData: FormData) {
  try {
    const destinationData: Partial<Destination> = {
      name: formData.get('name') as string,
      description: (formData.get('description') as string) || null,
      short_description: (formData.get('shortDescription') as string) || null,
      city: (formData.get('city') as string) || null,
      region: (formData.get('region') as string) || null,
      featured_image: (formData.get('featuredImage') as string) || null,
      gallery_images: (() => {
        try {
          const images = formData.get('galleryImages') as string
          return images ? JSON.parse(images) : []
        } catch {
          return []
        }
      })(),
      latitude: formData.get('latitude') ? parseFloat(formData.get('latitude') as string) : null,
      longitude: formData.get('longitude') ? parseFloat(formData.get('longitude') as string) : null,
      is_published: formData.get('isPublished') === 'true',
      order: formData.get('order') ? parseInt(formData.get('order') as string) : 0,
      meta_title: (formData.get('metaTitle') as string) || null,
      meta_description: (formData.get('metaDescription') as string) || null,
    }

    const updatedDestination = await updateDestination(destinationId, destinationData)

    const slug = formData.get('slug') as string
    revalidatePath('/admin/destinos')
    revalidatePath(`/destinos/${slug}`)
    revalidatePath('/destinos')
    revalidatePath('/')

    return { success: true, data: updatedDestination, message: 'Destino actualizado exitosamente' }
  } catch (error) {
    console.error('Error updating destination:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al actualizar el destino',
      message: 'No se pudo actualizar el destino',
    }
  }
}

// 🗑️ Eliminar destino (server action)
export async function deleteDestinationAction(destinationId: string, slug: string) {
  try {
    await deleteDestination(destinationId)

    revalidatePath('/admin/destinos')
    revalidatePath(`/destinos/${slug}`)
    revalidatePath('/destinos')
    revalidatePath('/')

    return { success: true, message: 'Destino eliminado exitosamente' }
  } catch (error) {
    console.error('Error deleting destination:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al eliminar el destino',
      message: 'No se pudo eliminar el destino',
    }
  }
}

// Publica/despublica un destino
export async function toggleDestinationPublish(
  destinationId: string,
  isPublished: boolean,
  slug: string
) {
  try {
    const updatedDestination = await updateDestination(destinationId, { is_published: !isPublished })

    revalidatePath('/admin/destinos')
    revalidatePath(`/destinos/${slug}`)
    revalidatePath('/destinos')
    revalidatePath('/')

    return {
      success: true,
      data: updatedDestination,
      message: !isPublished ? 'Destino publicado' : 'Destino despublicado',
    }
  } catch (error) {
    console.error('Error toggling destination publish:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al actualizar',
      message: 'No se pudo actualizar el estado del destino',
    }
  }
}
