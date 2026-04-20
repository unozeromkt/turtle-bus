'use server'

import { supabaseAdmin } from '@/lib/supabase'

// ★ Tour FAQs ★

export async function getTourFAQs(tourId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tour_faqs')
      .select('*')
      .eq('tour_id', tourId)
      .order('order', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    throw error
  }
}

export async function createFAQ(tourId: string, faqData: { question: string; answer: string; order?: number }) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tour_faqs')
      .insert([
        {
          tour_id: tourId,
          question: faqData.question,
          answer: faqData.answer,
          order: faqData.order || 0,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating FAQ:', error)
    throw error
  }
}

export async function updateFAQ(faqId: string, faqData: Partial<{ question: string; answer: string; order: number }>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tour_faqs')
      .update(faqData)
      .eq('id', faqId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating FAQ:', error)
    throw error
  }
}

export async function deleteFAQ(faqId: string) {
  try {
    const { error } = await supabaseAdmin
      .from('tour_faqs')
      .delete()
      .eq('id', faqId)

    if (error) throw error
  } catch (error) {
    console.error('Error deleting FAQ:', error)
    throw error
  }
}

// ★ Tour Availabilities ★

export async function getTourAvailabilities(tourId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tour_availabilities')
      .select('*')
      .eq('tour_id', tourId)
      .order('date', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching availabilities:', error)
    throw error
  }
}

export async function createAvailability(
  tourId: string,
  availData: { date: string; slots_available: number; status?: string }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tour_availabilities')
      .insert([
        {
          tour_id: tourId,
          date: availData.date,
          slots_available: availData.slots_available,
          status: availData.status || 'available',
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating availability:', error)
    throw error
  }
}

export async function updateAvailability(
  availId: string,
  availData: Partial<{ date: string; slots_available: number; status: string }>
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tour_availabilities')
      .update(availData)
      .eq('id', availId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating availability:', error)
    throw error
  }
}

export async function deleteAvailability(availId: string) {
  try {
    const { error } = await supabaseAdmin
      .from('tour_availabilities')
      .delete()
      .eq('id', availId)

    if (error) throw error
  } catch (error) {
    console.error('Error deleting availability:', error)
    throw error
  }
}

// ★ Tour Testimonials ★

export async function getTourTestimonials(tourId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .eq('tour_id', tourId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    throw error
  }
}

export async function createTestimonial(tourId: string, testimonialData: { author: string; content: string; rating: number; featured?: boolean }) {
  try {
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .insert([
        {
          tour_id: tourId,
          author: testimonialData.author,
          content: testimonialData.content,
          rating: testimonialData.rating,
          featured: testimonialData.featured || false,
        },
      ])
      .select()

    if (error) throw error
    return data?.[0] || null
  } catch (error) {
    console.error('Error creating testimonial:', error)
    throw error
  }
}

export async function updateTestimonial(testimonialId: string, testimonialData: { author?: string; content?: string; rating?: number; featured?: boolean }) {
  try {
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .update(testimonialData)
      .eq('id', testimonialId)
      .select()

    if (error) throw error
    return data?.[0] || null
  } catch (error) {
    console.error('Error updating testimonial:', error)
    throw error
  }
}

export async function deleteTestimonial(testimonialId: string) {
  try {
    const { error } = await supabaseAdmin
      .from('testimonials')
      .delete()
      .eq('id', testimonialId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    throw error
  }
}

// ★ Tour Itinerary ★

export async function updateTourItinerary(tourId: string, itinerary: Array<{ time: string; title: string; description: string }>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tours')
      .update({ itinerary })
      .eq('id', tourId)
      .select()

    if (error) throw error
    return data?.[0] || null
  } catch (error) {
    console.error('Error updating itinerary:', error)
    throw error
  }
}

// ★ Tour Includes/Excludes ★

export async function updateTourIncludes(tourId: string, includes: string[]) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tours')
      .update({ includes })
      .eq('id', tourId)
      .select()

    if (error) throw error
    return data?.[0] || null
  } catch (error) {
    console.error('Error updating includes:', error)
    throw error
  }
}

export async function updateTourExcludes(tourId: string, excludes: string[] | null) {
  try {
    const { data, error } = await supabaseAdmin
      .from('tours')
      .update({ excludes })
      .eq('id', tourId)
      .select()

    if (error) throw error
    return data?.[0] || null
  } catch (error) {
    console.error('Error updating excludes:', error)
    throw error
  }
}
