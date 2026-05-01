import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroBanner } from '@/components/hero/HeroBanner'
import { ContactForm } from '@/components/forms/ContactForm'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <HeroBanner
        title="Contacto"
        subtitle="¿Preguntas? Estamos aquí para ayudarte"
        backgroundImage="/images/banner-contactocompress.jpg"
      />

      <section className="py-16 bg-neutral-light flex-1">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Ponte en contacto</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Mail className="text-primary-600 flex-shrink-0" size={28} />
                  <div>
                    <p className="font-bold">Email</p>
                    <a href="mailto:info@turtlebus.co" className="text-primary-600 hover:underline">
                      info@turtlebus.co
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-primary-600 flex-shrink-0" size={28} />
                  <div>
                    <p className="font-bold">Teléfono</p>
                    <a href="tel:+573001234567" className="text-primary-600 hover:underline">
                      +57 300 123 4567
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin className="text-primary-600 flex-shrink-0" size={28} />
                  <div>
                    <p className="font-bold">Ubicación</p>
                    <p>Medellín, Antioquia, Colombia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
