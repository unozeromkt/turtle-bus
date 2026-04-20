'use client'

import { useState } from 'react'
import { Mail, Phone, User, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import { ReservationCalculator, type ReservationData } from './ReservationCalculator'
import { AvailabilityChecker } from './AvailabilityChecker'

interface ReservationFormProps {
  tourId: string
  tourTitle: string
  priceAdult: number
  priceChild?: number
}

export function ReservationForm({
  tourId,
  tourTitle,
  priceAdult,
  priceChild,
}: ReservationFormProps) {
  const [step, setStep] = useState<'availability' | 'details' | 'confirmation'>('availability')
  const [reservationData, setReservationData] = useState<ReservationData | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleReservationChange = (data: ReservationData) => {
    setReservationData(data)
  }

  const handleContinueToDetails = () => {
    if (reservationData?.selectedDate) {
      setStep('details')
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitReservation = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // En producción, aquí iría llamada a API
      // await fetch('/api/reservations', { method: 'POST', body: JSON.stringify(...) })
      
      // Simulación
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      setSubmitStatus('success')
      setStep('confirmation')
      
      // Reset form después de 3 segundos
      setTimeout(() => {
        setStep('availability')
        setReservationData(null)
        setFormData({ fullName: '', email: '', phone: '', notes: '' })
        setSubmitStatus('idle')
      }, 3000)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-black mb-8 text-neutral-dark title-cabin">Reservar {tourTitle}</h2>

      {/* Step Indicator */}
      <div className="flex gap-4 mb-8">
        {(['availability', 'details', 'confirmation'] as const).map((s, idx) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-colors ${
                step === s
                  ? 'bg-primary-600 text-white'
                  : idx < ['availability', 'details', 'confirmation'].indexOf(step)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
              }`}
            >
              {idx < ['availability', 'details', 'confirmation'].indexOf(step) ? '✓' : idx + 1}
            </div>
            <span
              className={`text-sm font-semibold hidden sm:block ${step === s ? 'text-primary-600' : 'text-gray-500'}`}
            >
              {s === 'availability' && 'Disponibilidad'}
              {s === 'details' && 'Tus datos'}
              {s === 'confirmation' && 'Confirmación'}
            </span>
          </div>
        ))}
      </div>

      {/* Step: Availability */}
      {step === 'availability' && (
        <div className="space-y-6">
          <AvailabilityChecker tourId={tourId} />
          <ReservationCalculator
            priceAdult={priceAdult}
            priceChild={priceChild}
            onReservationChange={handleReservationChange}
          />
          <button
            onClick={handleContinueToDetails}
            disabled={!reservationData?.selectedDate}
            className="w-full bg-primary-600 text-white font-black py-4 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
          >
            Continuar con mis datos
          </button>
        </div>
      )}

      {/* Step: Details */}
      {step === 'details' && (
        <form onSubmit={handleSubmitReservation} className="space-y-6">
          {/* Reservation Summary */}
          <div className="bg-primary-50 border-2 border-primary-200 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Resumen de tu reserva:</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-xs font-semibold text-gray-500">Fecha</p>
                <p className="font-bold text-neutral-dark">
                  {reservationData?.selectedDate
                    ? new Date(reservationData.selectedDate + 'T00:00:00').toLocaleDateString('es-CO')
                    : ''}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Personas</p>
                <p className="font-bold text-neutral-dark">
                  {reservationData?.adults} adultos{reservationData?.children ? ` + ${reservationData.children} niños` : ''}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Total</p>
                <p className="font-black text-primary-600 text-lg">${reservationData?.totalPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-neutral-dark mb-2">
                <User className="inline mr-2 text-primary-600" size={18} />
                Nombre completo
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                placeholder="Juan Pérez"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-neutral-dark mb-2">
                <Mail className="inline mr-2 text-primary-600" size={18} />
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                placeholder="juan@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-neutral-dark mb-2">
                <Phone className="inline mr-2 text-primary-600" size={18} />
                Teléfono WhatsApp
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                placeholder="+57 300 1234567"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-bold text-neutral-dark mb-2">
                Notas especiales (opcional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none h-24 resize-none"
                placeholder="Alergias, limitaciones físicas, preguntas..."
              />
            </div>
          </div>

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg flex gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              <p className="text-red-800 font-semibold">
                Ocurrió un error. Por favor intenta de nuevo.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep('availability')}
              className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Atrás
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-accent-orange text-white font-black py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Procesando...
                </>
              ) : (
                'Confirmar Reserva'
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Al reservar aceptas nuestras condiciones de cancela y políticas de privacidad
          </p>
        </form>
      )}

      {/* Step: Confirmation */}
      {step === 'confirmation' && submitStatus === 'success' && (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={48} className="text-green-600" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-neutral-dark mb-2">¡Reserva Confirmada!</h3>
            <p className="text-gray-600 mb-4">
              Hemos recibido tu reserva. Te enviaremos un email de confirmación y un enlace de WhatsApp para coordinar los detalles finales.
            </p>
          </div>

          <div className="bg-primary-50 border-2 border-primary-200 p-6 rounded-lg text-left">
            <h4 className="font-bold text-neutral-dark mb-3">Detalles de tu reserva:</h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Nombre:</span>{' '}
                <span className="font-bold text-neutral-dark">{formData.fullName}</span>
              </p>
              <p>
                <span className="text-gray-600">Email:</span>{' '}
                <span className="font-bold text-neutral-dark">{formData.email}</span>
              </p>
              <p>
                <span className="text-gray-600">Fecha:</span>{' '}
                <span className="font-bold text-neutral-dark">
                  {reservationData?.selectedDate
                    ? new Date(reservationData.selectedDate + 'T00:00:00').toLocaleDateString('es-CO')
                    : ''}
                </span>
              </p>
              <p>
                <span className="text-gray-600">Total a pagar:</span>{' '}
                <span className="font-black text-primary-600 text-lg">
                  ${reservationData?.totalPrice.toLocaleString()}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setStep('availability')
              setReservationData(null)
              setFormData({ fullName: '', email: '', phone: '', notes: '' })
              setSubmitStatus('idle')
            }}
            className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Hacer otra reserva
          </button>
        </div>
      )}
    </div>
  )
}
