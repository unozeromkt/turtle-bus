import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroBanner } from '@/components/hero/HeroBanner'
import { Heart, Target, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <HeroBanner
        title="Sobre Nosotros"
        subtitle="La historia de Turtle Bus"
      />

      <section className="py-16 bg-neutral-light flex-1">
        <div className="max-w-7xl mx-auto px-4">
          {/* Story */}
          <div className="mb-16">
            <h2 className="text-3xl font-black mb-8 title-cabin">Nuestra Historia</h2>
            <div className="prose prose-lg max-w-3xl">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Turtle Bus nació de una simple idea: mostrar la belleza real de Antioquia de una forma segura, auténtica y transformadora. En 2024, un equipo de aventureros, guías locales y amantes de la naturaleza decidió crear una plataforma diferente.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                No queremos ser una agencia más. Queremos ser el puente entre viajeros curiosos y las experiencias auténticas de Antioquia. Cada tour es diseñado con los corazones locales, cada guía es un experto en su territorio.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-2xl font-bold mb-3">Pasión</h3>
              <p className="text-gray-600">
                Amamos lo que hacemos. Cada tour es una extensión de nuestro corazón y dedicación por Antioquia.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold mb-3">Sostenibilidad</h3>
              <p className="text-gray-600">
                Protegemos la naturaleza y apoyamos a las comunidades locales. Turismo consciente es nuestro compromi­so.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold mb-3">Autenticidad</h3>
              <p className="text-gray-600">
                Sin filtros, sin copiones. Experiencias reales con gente real en lugares auténticos de Antioquia.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-black mb-8 title-cabin">Nuestro Equipo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((member) => (
                <div key={member} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="h-48 bg-gradient-to-br from-primary-600 to-accent-orange"></div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-1">Guía ${member}</h3>
                    <p className="text-primary-600 text-sm mb-3">Especialista en aventura</p>
                    <p className="text-gray-600 text-sm">
                      {member === 1 && '15 años de experiencia en naturaleza'}
                      {member === 2 && 'Fotógrafo profesional de viajes'}
                      {member === 3 && 'Historiador cultural local'}
                      {member === 4 && 'Especialista en sostenibilidad'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 bg-primary-600 text-white p-12 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-black mb-2">50+</div>
              <p className="text-sm">Tours Únicos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">1000+</div>
              <p className="text-sm">Viajeros Felices</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">4.9★</div>
              <p className="text-sm">Calificación Promedio</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">100%</div>
              <p className="text-sm">Sostenible</p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white p-12 rounded-lg shadow-sm mb-16">
            <h2 className="text-3xl font-black mb-8 title-cabin">Nuestra Misión</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Conectar viajeros del mundo con la auténtica belleza, culture y naturaleza de Antioquia, creando experiencias transformadoras que respetan el ambiente y empoderen a las comunidades locales.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Creemos que cada viaje es una oportunidad para aprender, crecer y cambiar vidas. La tuya y la de los locales que te reciben.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">¿Listo para tu próxima aventura?</h3>
            <div className="flex gap-4 justify-center">
              <Link href="/tours" className="btn btn-primary">
                Explorar Tours
              </Link>
              <Link href="/contacto" className="btn btn-secondary">
                Contactanos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
