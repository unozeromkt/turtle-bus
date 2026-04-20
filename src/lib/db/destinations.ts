import { supabaseAdmin } from '../supabase'

export type Destination = {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  featured_image: string | null
  gallery_images: string[] | null
  latitude: number | null
  longitude: number | null
  city: string | null
  region: string | null
  meta_title: string | null
  meta_description: string | null
  keywords: string[] | null
  is_published: boolean
  order: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

// 🔍 Obtener todos los destinos
export async function getAllDestinations() {
  try {
    const { data, error } = await supabaseAdmin
      .from('destinations')
      .select('*')
      .is('deleted_at', null)
      .order('order', { ascending: true })

    if (error) throw error
    return data as Destination[]
  } catch (error) {
    console.error('Error fetching destinations:', error)
    throw error
  }
}

// 🔍 Obtener un destino por slug
export async function getDestinationBySlug(slug: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('destinations')
      .select('*')
      .eq('slug', slug)
      .is('deleted_at', null)
      .single()

    if (error) throw error
    return data as Destination
  } catch (error) {
    console.error(`Error fetching destination ${slug}:`, error)
    throw error
  }
}

// ➕ Crear destino
export async function createDestination(destinationData: Partial<Destination>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('destinations')
      .insert([
        {
          ...destinationData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data as Destination
  } catch (error) {
    console.error('Error creating destination:', error)
    throw error
  }
}

// ✏️ Actualizar destino
export async function updateDestination(destinationId: string, destinationData: Partial<Destination>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('destinations')
      .update({
        ...destinationData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', destinationId)
      .is('deleted_at', null)
      .select()
      .single()

    if (error) throw error
    return data as Destination
  } catch (error) {
    console.error('Error updating destination:', error)
    throw error
  }
}

// 🗑️ Eliminar destino (soft delete)
export async function deleteDestination(destinationId: string) {
  try {
    const { error } = await supabaseAdmin
      .from('destinations')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', destinationId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting destination:', error)
    throw error
  }
}

// 📊 Obtener destinos publicados
export async function getPublishedDestinations() {
  try {
    const { data, error } = await supabaseAdmin
      .from('destinations')
      .select('*')
      .eq('is_published', true)
      .is('deleted_at', null)
      .order('order', { ascending: true })

    if (error) throw error
    return data as Destination[]
  } catch (error) {
    console.error('Error fetching published destinations:', error)
    throw error
  }
}

// 📊 Contar tours por destino
export async function getDestinationWithTourCount(destinationId: string) {
  try {
    const { data: destination, error: destError } = await supabaseAdmin
      .from('destinations')
      .select('*')
      .eq('id', destinationId)
      .single()

    if (destError) throw destError

    const { count, error: countError } = await supabaseAdmin
      .from('tours')
      .select('*', { count: 'exact', head: true })
      .eq('destination_id', destinationId)
      .eq('is_published', true)
      .is('deleted_at', null)

    if (countError) throw countError

    return { ...destination, tour_count: count || 0 }
  } catch (error) {
    console.error('Error fetching destination with count:', error)
    throw error
  }
}
