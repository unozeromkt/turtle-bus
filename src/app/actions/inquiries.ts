'use server'

import { revalidatePath } from 'next/cache'
import {
  createInquiry,
  updateInquiryStatus,
  type Inquiry,
} from '@/lib/db/inquiries'

// ➕ Crear inquietud (desde formulario público)
export async function createInquiryAction(formData: FormData) {
  try {
    const inquiryData: Partial<Inquiry> = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || null,
      message: (formData.get('message') as string) || null,
      tour_id: (formData.get('tourId') as string) || null,
      source: (formData.get('source') as string) || 'web',
    }

    const createdInquiry = await createInquiry(inquiryData)
    
    revalidatePath('/admin/leads')

    return { 
      success: true, 
      data: createdInquiry, 
      message: '¡Gracias! Tu consulta ha sido recibida. Nos contactaremos pronto.'
    }
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error al enviar consulta',
      message: 'No se pudo enviar tu consulta. Intenta nuevamente.'
    }
  }
}

// ✏️ Actualizar estado de inquietud (admin)
export async function updateInquiryStatusAction(
  inquiryId: string,
  status: Inquiry['status'],
  notes?: string
) {
  try {
    const updatedInquiry = await updateInquiryStatus(inquiryId, status, notes)
    
    revalidatePath('/admin/leads')

    return { 
      success: true, 
      data: updatedInquiry,
      message: `Inquietud actualizada a "${status}"`
    }
  } catch (error) {
    console.error('Error updating inquiry status:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error al actualizar',
      message: 'No se pudo actualizar la inquietud'
    }
  }
}
