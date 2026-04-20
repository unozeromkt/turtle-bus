import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroBanner } from '@/components/hero/HeroBanner'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <HeroBanner
        title="Política de Privacidad"
        subtitle="Tu privacidad es importante para nosotros"
      />

      <section className="py-16 bg-neutral-light flex-1">
        <div className="max-w-4xl mx-auto px-4 prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-6 title-cabin">Política de Privacidad</h2>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mt-8 mb-4">1. Información que Recopilamos</h3>
            <p>
              Recopilamos información que voluntariamente proporcionas cuando:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Completas un formulario de contacto</li>
              <li>Realizas una reserva de tour</li>
              <li>Te suscribes a nuestro newsletter</li>
              <li>Dejas una reseña o testimonial</li>
            </ul>
            <p className="mt-4">
              Esta información puede incluir: nombre, email, teléfono, dirección, información de pago, preferencias de viaje.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">2. Datos Automáticamente Recopilados</h3>
            <p>
              Cuando visitas nuestro sitio web, algunos datos se recopilan automáticamente:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Dirección IP</li>
              <li>Tipo de navegador y dispositivo</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>Información referente (cómo llegaste al sitio)</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">3. Cookies</h3>
            <p>
              Usamos cookies para mejorar tu experiencia. Las cookies son archivos pequeños almacenados en tu dispositivo. Puedes desactivarlas en la configuración de tu navegador, aunque esto puede afectar la funcionalidad del sitio.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">4. Cómo Usamos Tu Información</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Procesar y confirmar tus reservas</li>
              <li>Enviarte confirmaciones y recordatorios</li>
              <li>Responder a tus consultas</li>
              <li>Mejorar nuestros servicios</li>
              <li>Enviarte ofertas y actualizaciones (con tu consentimiento)</li>
              <li>Cumplir obligaciones legales</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">5. Seguridad de Datos</h3>
            <p>
              Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tu información personal contra acceso no autorizado, alteración, divulgación, destrucción o pérdida accidental.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">6. Compartir Información</h3>
            <p>
              No vendemos tu información personal. Podemos compartirla con:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Terceros prestadores de servicios (procesamiento de pagos, email)</li>
              <li>Autoridades legales si legalmente requerido</li>
              <li>Guías y proveedores de tours para coordinar tu experiencia</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">7. Derechos</h3>
            <p>
              Tienes derecho a:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Acceder a tus datos personales</li>
              <li>Corregir información incorrecta</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Opt-out de comunicaciones de marketing</li>
              <li>Portar tus datos a otro servicio</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">8. Retención de Datos</h3>
            <p>
              Retenemos tu información personal solo mientras sea necesario para procesar reservas y mantener registros legales (típicamente 3-5 años).
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">9. Cambios a Esta Política</h3>
            <p>
              Podemos actualizar esta política ocasionalmente. Te notificaremos de cambios significativos enviándote un email.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4">10. Contacto</h3>
            <p>
              Si tienes preguntas sobre esta política o nuestras prácticas de privacidad, contáctanos en: info@turtlebus.co
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
