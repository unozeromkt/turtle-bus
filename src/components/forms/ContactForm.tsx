'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import {
  createInquiryAction,
  type InquiryActionState,
} from '@/app/actions/inquiries'

const initialState: InquiryActionState = {
  success: false,
  message: '',
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Enviando...
        </>
      ) : (
        'Enviar mensaje'
      )}
    </button>
  )
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useActionState(createInquiryAction, initialState)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
      <form ref={formRef} action={formAction} className="space-y-4">
        <input type="hidden" name="source" value="contact-page" />

        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="input"
            placeholder="Tu nombre"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-2">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="input"
            placeholder="Tu teléfono"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-2">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            className="input min-h-32 resize-none"
            placeholder="Escribe tu mensaje aquí..."
            required
          />
        </div>

        {state.message ? (
          <div
            className={state.success
              ? 'flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800'
              : 'flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'}
            aria-live="polite"
          >
            {state.success ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
            <p>{state.message}</p>
          </div>
        ) : null}

        <SubmitButton />
      </form>
    </div>
  )
}
