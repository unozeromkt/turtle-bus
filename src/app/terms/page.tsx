import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroBanner } from '@/components/hero/HeroBanner'

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <HeroBanner
        title="Términos y Condiciones"
        subtitle="Por favor lee cuidadosamente"
      />

      <section className="py-16 bg-neutral-light flex-1">
        <div className="max-w-4xl mx-auto px-4 prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-6 title-cabin">Términos y Condiciones de Uso</h2>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mt-8 mb-4">1. Aceptación de Términos</h3>
            <p>
              Al acceder y utilizar el sitio web de Turtle Bus, aceptas estar vinculado por estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no puedes usar nuestro servicio.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">2. Descripción del Servicio</h3>
            <p>
              Turtle Bus proporciona servicios de tours y experiencias de viaje en Antioquia, Colombia. Todos los tours incluyen guía profesional, transporte (según especificación del tour) y acceso a atracciones turísticas.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">3. Cancelación y Reembolsos</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Cancelación 7+ días antes: Reembolso 100%</li>
              <li>Cancelación 3-7 días antes: Reembolso 50%</li>
              <li>Cancelación menos de 3 días: Sin reembolso</li>
              <li>Cambios de fecha sujetos a disponibilidad</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">4. Responsabilidad y Seguridad</h3>
            <p>
              Turtle Bus se compromete a mantener los más altos estándares de seguridad. Sin embargo, todas las actividades de aventura implican riegos. Los participantes asumen responsabilidad por lesiones o pérdidas, excepto por negligencia directa de Turtle Bus.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">5. Requisitos Médicos</h3>
            <p>
              Algunos tours pueden no ser apropiados para personas con condiciones médicas específicas. Te recomendamos consultar con tu médico antes de participar. Debes informar a Turtle Bus de cualquier condición que pueda afectar tu participación.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">6. Edad Mínima</h3>
            <p>
              Algunos tours requieren edad mínima. Los menores deben estar acompañados por un adulto responsable.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">7. Conducta</h3>
            <p>
              Se espera que todos los participantes se comporten de manera respetuosa. Turtle Bus se reserva el derecho de remover participantes que sean disruptivos, bajo la influencia de sustancias o que no cumplan normas de seguridad.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">8. Propiedad Intelectual</h3>
            <p>
              Todo contenido en el sitio web de Turtle Bus (texto, imágenes, videos) es propiedad intelectual de Turtle Bus y está protegido por derechos de autor.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">9. Cambios a los Términos</h3>
            <p>
              Turtle Bus se reserva el derecho de modificar estos términos en cualquier momento. Tu uso continuado del servicio implica aceptación de cambios.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">10. Ley Aplicable</h3>
            <p>
              Estos términos están gobernados por las leyes de Colombia. Cualquier disputa será resuelta en los tribunales de Medellín.
            </p>

            <p className="mt-8 text-gray-600 italic">
              Última actualización: Marzo 2024
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
