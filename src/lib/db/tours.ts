import { supabaseAdmin } from '../supabase'

export type Tour = {
  id: string
  slug: string
  title: string
  description: string | null
  long_description: string | null
  price_adult: number
  price_child: number | null
  duration: string
  featured_image: string | null
  gallery_images: string[] | null
  video_url: string | null
  latitude: number | null
  longitude: number | null
  meeting_point: string | null
  itinerary: any[] | null
  includes: string[] | null
  excludes: string[] | null
  requirements: string | null
  max_participants: number | null
  min_age: number | null
  max_age: number | null
  destination_id: string
  category_id: string
  meta_title: string | null
  meta_description: string | null
  is_published: boolean
  is_featured: boolean
  order: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

// 🔍 Obtener todos los tours publicados
export async function getAllPublishedTours() {
  try {
    const { data, error } = await supabaseAdmin
      .from('tours')
      .select(
        `
        id,
        slug,
        title,
        description,
        price_adult,
        price_child,
        duration,
        featured_image,
        destination_id,
        category_id,
        is_featured,
        destinations:destination_id (name, slug),
        categories:category_id (name, slug, icon),
        created_at
      `
      )
      .eq('is_published', true)
      .is('deleted_at', null)
      .order('order', { ascending: true })

    if (error) throw error
    return data as any[]
  } catch (error) {
    console.error('Error fetching published tours:', error)
    throw error
  }
}

// 🔍 Obtener un tour por slug con todos los detalles
export async function getTourBySlug(slug: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tours')
      .select(
        `
        *,
        destinations:destination_id (*),
        categories:category_id (*),
        tour_faqs (id, question, answer, order),
        tour_availabilities (id, date, slots_available, status),
        testimonials (id, author, content, rating, featured)
      `
      )
      .eq('slug', slug)
      .eq('is_published', true)
      .is('deleted_at', null)
      .single()

    if (error) throw error
    console.log('Tour data fetched:', { slug, tour_faqs: data.tour_faqs })
    return data as any
  } catch (error) {
    console.error(`Error fetching tour ${slug}:`, error)
    throw error
  }
}

// 📊 Obtener tours por destino
export async function getToursByDestination(destinationId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tours')
      .select('*')
      .eq('destination_id', destinationId)
      .eq('is_published', true)
      .is('deleted_at', null)
      .order('order', { ascending: true })

    if (error) throw error
    return data as Tour[]
  } catch (error) {
    console.error(`Error fetching tours for destination ${destinationId}:`, error)
    throw error
  }
}

// 📊 Obtener tours destacados
export async function getFeaturedTours(limit: number = 4) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tours')
      .select(
        `
        *,
        destinations:destination_id (name, slug),
        categories:category_id (name, slug, icon)
      `
      )
      .eq('is_published', true)
      .eq('is_featured', true)
      .is('deleted_at', null)
      .limit(limit)

    if (error) throw error
    return data as any[]
  } catch (error) {
    console.error('Error fetching featured tours:', error)
    throw error
  }
}

// 🔗 Obtener tours relacionados (del mismo destino, excluyendo el actual)
export async function getRelatedTours(destinationId: string, currentTourId: string, limit: number = 6) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tours')
      .select(
        `
        id,
        slug,
        title,
        description,
        price_adult,
        price_child,
        duration,
        featured_image,
        destination_id,
        category_id,
        is_featured,
        destinations:destination_id (name, slug),
        categories:category_id (name, slug, icon)
      `
      )
      .eq('destination_id', destinationId)
      .eq('is_published', true)
      .neq('id', currentTourId)
      .is('deleted_at', null)
      .order('is_featured', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as any[]
  } catch (error) {
    console.error('Error fetching related tours:', error)
    throw error
  }
}

// ➕ Crear nuevo tour
export async function createTour(tourData: Partial<Tour>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tours')
      .insert([
        {
          ...tourData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data as Tour
  } catch (error) {
    console.error('Error creating tour:', error)
    throw error
  }
}

// ✏️ Actualizar tour
export async function updateTour(tourId: string, tourData: Partial<Tour>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tours')
      .update({
        ...tourData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', tourId)
      .is('deleted_at', null)
      .select()
      .single()

    if (error) throw error
    return data as Tour
  } catch (error) {
    console.error('Error updating tour:', error)
    throw error
  }
}

// 🗑️ Eliminar tour (soft delete)
export async function deleteTour(tourId: string) {
  try {
    const { error } = await supabaseAdmin
      .from('tours')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', tourId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting tour:', error)
    throw error
  }
}

// 📈 Obtener tours para admin con paginación
export async function getToursForAdmin(page: number = 1, limit: number = 10) {
  try {
    const offset = (page - 1) * limit

    const { data: tours, error: toursError, count } = await supabaseAdmin
      .from('tours')
      .select(
        `
        id,
        slug,
        title,
        price_adult,
        is_published,
        is_featured,
        created_at,
        destinations:destination_id (name),
        categories:category_id (name)
      `,
        { count: 'exact' }
      )
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (toursError) throw toursError

    return {
      tours: tours as any[],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    }
  } catch (error) {
    console.error('Error fetching admin tours:', error)
    throw error
  }
}

// 📊 Obtener estadísticas de un tour
export async function getTourStats(tourId: string) {
  try {
    const { count: inquiriesCount, error: err1 } = await supabaseAdmin
      .from('inquiries')
      .select('id', { count: 'exact', head: true })
      .eq('tour_id', tourId)

    const { count: reviewsCount, error: err2 } = await supabaseAdmin
      .from('testimonials')
      .select('id', { count: 'exact', head: true })
      .eq('tour_id', tourId)
      .eq('featured', true)

    const { count: reservationsCount, error: err3 } = await supabaseAdmin
      .from('reservations')
      .select('id', { count: 'exact', head: true })
      .eq('tour_id', tourId)

    if (err1 || err2 || err3) throw err1 || err2 || err3

    return {
      inquiries: inquiriesCount || 0,
      reviews: reviewsCount || 0,
      reservations: reservationsCount || 0,
    }
  } catch (error) {
    console.error('Error fetching tour stats:', error)
    throw error
  }
}

// 🔍 Buscar tours
export async function searchTours(query: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tours')
      .select(
        `
        id,
        slug,
        title,
        description,
        featured_image,
        destinations:destination_id (name),
        categories:category_id (name)
      `
      )
      .eq('is_published', true)
      .is('deleted_at', null)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(10)

    if (error) throw error
    return data as any[]
  } catch (error) {
    console.error('Error searching tours:', error)
    throw error
  }
}
