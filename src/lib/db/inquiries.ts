import { supabaseAdmin } from '../supabase'

export type Inquiry = {
  id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  tour_id: string | null
  source: string
  status: 'new' | 'responded' | 'converted' | 'abandoned'
  notes: string | null
  created_at: string
  updated_at: string
}

// ➕ Crear inquietud/lead
export async function createInquiry(inquiryData: Partial<Inquiry>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .insert([
        {
          ...inquiryData,
          status: 'new',
          source: inquiryData.source || 'web',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data as Inquiry
  } catch (error) {
    console.error('Error creating inquiry:', error)
    throw error
  }
}

// 📊 Obtener leads recientes (admin)
export async function getRecentInquiries(limit: number = 10) {
  try {
    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .select(
        `
        id,
        name,
        email,
        phone,
        status,
        created_at,
        tours:tour_id (title, slug)
      `
      )
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as any[]
  } catch (error) {
    console.error('Error fetching recent inquiries:', error)
    throw error
  }
}

// 📊 Obtener inquiries por tour
export async function getInquiriesByTour(tourId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .select('*')
      .eq('tour_id', tourId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Inquiry[]
  } catch (error) {
    console.error(`Error fetching inquiries for tour ${tourId}:`, error)
    throw error
  }
}

// ✏️ Actualizar estado de inquietud
export async function updateInquiryStatus(inquiryId: string, status: Inquiry['status'], notes?: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .update({
        status,
        notes: notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', inquiryId)
      .select()
      .single()

    if (error) throw error
    return data as Inquiry
  } catch (error) {
    console.error('Error updating inquiry status:', error)
    throw error
  }
}

// 📈 Obtener estadísticas de leads
export async function getLeadStats() {
  try {
    const { count: totalCount, error: err1 } = await supabaseAdmin
      .from('inquiries')
      .select('id', { count: 'exact', head: true })

    const { count: newCount, error: err2 } = await supabaseAdmin
      .from('inquiries')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'new')

    const { count: convertedCount, error: err3 } = await supabaseAdmin
      .from('inquiries')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'converted')

    if (err1 || err2 || err3) throw err1 || err2 || err3

    return {
      total: totalCount || 0,
      new: newCount || 0,
      converted: convertedCount || 0,
      conversionRate: totalCount ? ((convertedCount || 0) / totalCount * 100).toFixed(2) + '%' : '0%',
    }
  } catch (error) {
    console.error('Error fetching lead stats:', error)
    throw error
  }
}
