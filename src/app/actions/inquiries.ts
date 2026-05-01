'use server'

import { revalidatePath } from 'next/cache'
import {
  createInquiry,
  updateInquiryStatus,
  type Inquiry,
} from '@/lib/db/inquiries'

export type InquiryActionState = {
  success: boolean
  message: string
  error?: string
}

const initialInquiryActionState: InquiryActionState = {
  success: false,
  message: '',
}

// ➕ Crear inquietud (desde formulario público)
export async function createInquiryAction(
  _prevState: InquiryActionState = initialInquiryActionState,
  formData: FormData
) {
  try {
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const message = String(formData.get('message') || '').trim()
    const tourId = String(formData.get('tourId') || '').trim()
    const source = String(formData.get('source') || 'web').trim()

    if (!name || !email || !message) {
      return {
        success: false,
        message: 'Completa nombre, email y mensaje para enviar tu consulta.',
        error: 'missing_required_fields',
      }
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      return {
        success: false,
        message: 'Ingresa un email valido para poder contactarte.',
        error: 'invalid_email',
      }
    }

    const inquiryData: Partial<Inquiry> = {
      name,
      email,
      phone: phone || null,
      message,
      tour_id: tourId || null,
      source: source || 'web',
    }

    const createdInquiry = await createInquiry(inquiryData)
    
    revalidatePath('/admin/mensajes')

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
    
    revalidatePath('/admin/mensajes')

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
