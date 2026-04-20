import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ChevronRight, Clock, User, Share2 } from 'lucide-react'

const blogPosts: { [key: string]: any } = {
  'paragliding-medellin-aventura': {
    title: 'Parapente en Medellín: Vuela sobre la ciudad de la eterna primavera',
    date: '2024-04-10',
    author: 'Carlos Mendez',
    readTime: '6 min',
    category: 'Aventura',
    image: 'https://images.unsplash.com/photo-1540575467063-178f50002c4b?w=1200&h=600&fit=crop',
    content: `
      <h2>La experiencia de volar sobre Medellín</h2>
      <p>No hay nada comparado a la sensación de flotar en el aire, observando la ciudad que se extiende bajo tus pies. El parapente en Medellín es una experiencia transformadora que combina adrenalina, belleza natural y vistas panorámicas inolvidables.</p>

      <h3>¿Por qué Medellín es perfecta para parapente?</h3>
      <p>Medellín está ubicada en un valle rodeado de montañas que crean condiciones ideales para el vuelo. Los vientos térmicos son consistentes, y la geografía permite que pilotos de todos los niveles puedan disfrutar de la experiencia.</p>
      <ul>
        <li>Altitud: Entre 1,500 y 2,000 metros de altura</li>
        <li>Condiciones: Vientos térmicos consistentes todo el año</li>
        <li>Seguridad: Pilotos certificados internacionalmente</li>
        <li>Duración: 30-60 minutos de vuelo</li>
      </ul>

      <h3>Antes del vuelo</h3>
      <p>No necesitas experiencia previa. Los pilotos certificados te instruirán completamente. Lo esencial es estar en buena forma física y ser mayor de 5 años.</p>
      <ul>
        <li>Reunión informativa: 30 minutos antes del vuelo</li>
        <li>Instrucciones de seguridad y procedimientos</li>
        <li>Equipo de protección completo proporcionado</li>
        <li>Verificación de salud y aptitud</li>
      </ul>

      <h3>Durante el vuelo</h3>
      <p>Una vez en el aire, la realidad se transforma. La sensación de libertad es indescriptible. Podrás ver la ciudad desde una perspectiva completamente nueva: los barrios, las montañas, los valles y en días claros, el horizonte lejano.</p>
      <p>Tu piloto experimentado se encargará de todo mientras tú disfrutas de la experiencia. Muchos turistas dicen que es el punto culminante de su viaje a Medellín.</p>

      <h3>Consejos Prácticos</h3>
      <ul>
        <li>Lleva ropa abrigada: Hace frío a mayor altitud</li>
        <li>Trae cámara o smartphone para fotos aéreas</li>
        <li>Evita desayunar pesado</li>
        <li>Mejor en mañanas con cielos claros</li>
      </ul>

      <h3>Seguridad</h3>
      <p>El parapente en Medellín es completamente seguro. Todos nuestros pilotos están certificados internacionalmente y han realizado miles de vuelos seguros. El equipo es revisado regularmente y se siguen los más altos estándares de seguridad.</p>
    `,
  },
  'guatape-piedra-penol-guia-completa': {
    title: 'La Piedra del Peñol: Guatapé y sus gemas ocultas',
    date: '2024-04-05',
    author: 'María Rodríguez',
    readTime: '8 min',
    category: 'Naturaleza',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop',
    content: `
      <h2>Guatapé: Mucho más que la Piedra del Peñol</h2>
      <p>Aunque la Piedra del Peñol es el atractivo principal, Guatapé es un destino completo que ofrece naturaleza, cultura, adrenalina y gastronomía auténtica.</p>

      <h3>La Piedra del Peñol</h3>
      <p>Este monolito de 220 metros de altura es uno de los sitios más visitados de Colombia. Con sus 2,500 escalones pintados de colores, representa no solo un desafío físico sino también un logro emocional.</p>
      <ul>
        <li>Altura: 220 metros desde la base</li>
        <li>Escalones: 2,500 escalones pintados de forma colorida</li>
        <li>Tiempo de ascenso: 45-60 minutos</li>
        <li>Vistas: 360 grados del embalse y pueblos circundantes</li>
      </ul>

      <h3>Antes de la subida</h3>
      <p>La preparación es fundamental para disfrutar plenamente de la experiencia:</p>
      <ul>
        <li>Comienza a primera hora para evitar multitudes y calor intenso</li>
        <li>Usa zapatos con buen agarre, no chanclas</li>
        <li>Aplicar protector solar generosamente</li>
        <li>Lleva al menos 2 litros de agua</li>
        <li>Una pequeña toalla para secar el sudor</li>
      </ul>

      <h3>Durante la ascensión</h3>
      <p>A mitad de camino encontrarás un área de descanso con pequeños comercios. La vista se vuelve más espectacular con cada paso. A aproximadamente 80% de altura, podrás ver el Río Grande y el Embalse del Peñol en toda su extensión.</p>

      <h3>En la cima</h3>
      <p>El logro de llegar a la cima es transformador. La vista de 360 grados te muestra el Embalse del Peñol, los pueblos de Guatapé y Peñol, las montañas de Antioquia y en días claros, el Valle de Aburrá con Medellín a lo lejos.</p>

      <h3>Más allá de la piedra: Guatapé pueblo</h3>
      <p>El pueblo de Guatapé es famoso por sus zócalos coloridos. Cada casa está decorada con estos relieves decorativos que representan la profesión o intereses de sus dueños. Es un pueblo vibrante con:</p>
      <ul>
        <li>Restaurantes con comida típica antioqueña</li>
        <li>Tiendas de artesanía local</li>
        <li>Iglesia colorida en el parque central</li>
        <li>Tours en lancha por el embalse</li>
      </ul>

      <h3>El Embalse del Peñol</h3>
      <p>Este reservorio artificial es uno de los paisajes más bellos de Antioquia. Puedes hacer tours en lancha, jet ski, kayaking o simplemente disfrutar de las vistas desde tierra.</p>
    `,
  },
  'comarca-aventura-tubing-rappel': {
    title: 'Comarca: El destino secreto para aventureros',
    date: '2024-03-28',
    author: 'Juan Martinez',
    readTime: '7 min',
    category: 'Aventura Extrema',
    image: 'https://images.unsplash.com/photo-1527004013197-933b4cb48ea1?w=1200&h=600&fit=crop',
    content: `
      <h2>Comarca: La joya escondida de Antioquia</h2>
      <p>Si buscas aventura sin multitudes, Comarca es tu destino. Ubicada en el nordeste de Antioquia, esta región ofrece algunos de los paisajes más salvajes y menos explorados de Colombia.</p>

      <h3>Tubing en ríos cristalinos</h3>
      <p>Flotar en una cámara a través de ríos cristalinos de montaña es una de las experiencias más relajantes y emocionantes a la vez. El Río Claro es el escenario perfecto para esta aventura.</p>
      <ul>
        <li>Distancia: 6-10 km según el tour</li>
        <li>Duración: 2-3 horas</li>
        <li>Dificultad: Principiante a intermedia</li>
        <li>Agua: Cristalina y refrescante todo el año</li>
      </ul>

      <h3>Rappel en cascadas</h3>
      <p>Descender por una cascada usando técnicas de rappel es emocionante y perfectamente seguro con instructores certificados. El descenso reveña la belleza bruta de la naturaleza desde una perspectiva única.</p>
      <ul>
        <li>Alturas: 15-50 metros según la cascada</li>
        <li>Equipo: Arnés, casco y equipo profesional</li>
        <li>Experiencia requerida: Ninguna</li>
        <li>Mejor época: Verano (menos agua)</li>
      </ul>

      <h3>Cavernas y cuevas</h3>
      <p>Comarca es famosa por sus sistemas de cuevas. Explorar las cavernas te lleva a través de formaciones de estalactitas y estalagmitas creadas durante millones de años.</p>
      <ul>
        <li>Cueva del Indio: La más accesible</li>
        <li>Cueva del Agua: Más adventurera y húmeda</li>
        <li>Duración: 1-2 horas por cueva</li>
        <li>Dificultad: Moderada</li>
      </ul>

      <h3>Natación en piscinas naturales</h3>
      <p>Pequeñas piscinas creadas naturalmente en el río ofrecen lugares perfectos para sumergirse y refrescarse. El agua es cálida y segura.</p>

      <h3>Flora y Fauna</h3>
      <p>Comarca es un tesoro de biodiversidad. Durante tu aventura verás:</p>
      <ul>
        <li>Aves tropicales de colores vibrantes</li>
        <li>Mariposas gigantes</li>
        <li>Reptiles como iguanas y serpientes inofensivas</li>
        <li>Vegetación exuberante de selva tropical</li>
      </ul>

      <h3>Recomendaciones</h3>
      <ul>
        <li>Contrata tours solo con operadores certificados</li>
        <li>Usa repelente de insectos</li>
        <li>Lleva ropa que seque rápido</li>
        <li>Trae protector solar waterproof</li>
        <li>Cámara hermética para fotos bajo el agua</li>
      </ul>
    `,
  },
  'guia-completa-medellin': {
    title: '48 Horas en Medellín: Guía Completa para Tu Primer Viaje',
    date: '2024-03-15',
    author: 'María García',
    readTime: '8 min',
    category: 'Destinos',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    content: `
      <h2>Bienvenido a Medellín</h2>
      <p>Medellín, la ciudad de la eterna primavera, ha experimentado una transformación extraordinaria en los últimos años. Lo que una vez fue conocido como un destino peligroso se ha convertido en un destino vibrante, seguro e innovador que atrae a viajeros de todo el mundo.</p>

      <h3>Día 1: Transformación Social y Arte</h3>
      <p>Comienza tu viaje en la Comuna 13, a menudo considerada el corazón cultural de Medellín. Este barrio, que una vez fue conocido por la violencia, ahora es un laboratorio de transformación social y arte urbano. Las calles están cubiertas de murales coloridos que cuentan historias de resiliencia y esperanza.</p>
      <ul>
        <li>Tour con guía local: 10:00 AM - 1:00 PM</li>
        <li>Almuerzo en restaurante local: Arepa con queso y guacamole</li>
        <li>Tarde en el Pueblito Paisa: Arquitectura tradicional antioqueña</li>
      </ul>

      <h3>Día 2: Naturaleza y Panorámica</h3>
      <p>El segundo día te llevará a través del sistema de cables de Medellín, una experiencia única donde residentes y turistas comparten el transporte mientras disfrutan de vistas indescriptibles de la ciudad.</p>
      <ul>
        <li>Teleférico de Arví: Naturaleza a 2,000 metros</li>
        <li>Almuerzo con vistas: Mirador panorámico</li>
        <li>Atardecer en el Parque Bolívar</li>
      </ul>

      <h3>Consejos Prácticos</h3>
      <ul>
        <li>Moneda: Peso colombiano (COP)</li>
        <li>Transporte: Metro oficial, App Didi para taxis</li>
        <li>Dinero: Cajeros automáticos en toda la ciudad</li>
        <li>Idioma: Español, algunos hablan inglés en zonas turísticas</li>
      </ul>
    `,
  },
  'gastronomia-antioquia': {
    title: 'Sabores Auténticos: Gastronomía Tradicional Antioqueña',
    date: '2024-03-08',
    author: 'Juan Pérez',
    readTime: '7 min',
    category: 'Gastronomía',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    content: `
      <h2>La Cocina Antioqueña: Tradición y Sabor</h2>
      <p>La gastronomía antioqueña es un reflejo de la historia, la geografía y la generosidad del pueblo antioqueño.</p>

      <h3>Platos Imprescindibles</h3>
      <ul>
        <li><strong>Bandeja Paisa</strong>: El plato más famoso, con arroz, frijoles, carne, huevo y más</li>
        <li><strong>Ajiaco Antioqueño</strong>: Sopa tradicional con papas y verduras</li>
        <li><strong>Arepa Antioqueña</strong>: Harina de maíz con queso fundido</li>
        <li><strong>Sancocho</strong>: Guiso nutritivo con carnes y verduras</li>
      </ul>

      <h3>Mercados Locales</h3>
      <p>Visita el Centro Comercial para experimentar la compra local. Aquí encontrarás productos frescos, frutas exóticas y el espíritu de la ciudad.</p>
    `,
  },
  'viajes-familia': {
    title: 'Viajes en Familia: Tours Seguros y Divertidos para Todos',
    date: '2024-03-05',
    author: 'Laura Martínez',
    readTime: '5 min',
    category: 'Familia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    content: `
      <h2>Viajes Familiares: Placer para Todos</h2>
      <p>Viajar en familia requiere planificación, pero los recuerdos valen cada minuto de preparación.</p>

      <h3>Selecciona Actividades Apropiadas</h3>
      <p>Considera la edad de los niños. Tours de corta duración, pausas frecuentes y actividades interactivas son clave.</p>

      <h3>Seguridad Primero</h3>
      <ul>
        <li>Contrata guías certificados</li>
        <li>Usa equipo de seguridad adecuado</li>
        <li>Establece reglas claras</li>
        <li>Mantén los niños hidratados</li>
      </ul>

      <h3>Crea Momentos Especiales</h3>
      <p>Los viajes en familia crean lazos indelebles. Captura momentos, ríe, aprende juntos.</p>
    `,
  },
  'natura-antioquia': {
    title: 'Conservación de Antioquia: Nuestro Compromiso Ambiental',
    date: '2024-03-01',
    author: 'Eco Team',
    readTime: '9 min',
    category: 'Sostenibilidad',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    content: `
      <h2>Turismo Sostenible en Antioquia</h2>
      <p>Creemos que es posible mostrar la belleza de Antioquia sin comprometer su futuro.</p>

      <h3>Nuestro Compromiso</h3>
      <ul>
        <li>Limpieza de senderos después de cada tour</li>
        <li>Educación ambiental para turistas</li>
        <li>Apoyo a comunidades locales</li>
        <li>Reducción de huella de carbono</li>
      </ul>

      <h3>Tú Puedes Ayudar</h3>
      <p>Cada viajero juega un papel. Sigue estas prácticas:</p>
      <ul>
        <li>Deja solo huellas, lleva solo recuerdos</li>
        <li>Respeta la vida silvestre</li>
        <li>Usa protector solar seguro para arrecifes</li>
        <li>Apoya comercios locales</li>
      </ul>
    `,
  },
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post no encontrado</h1>
            <Link href="/blog" className="btn btn-primary">
              Volver al Blog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url('${post.image}')` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 pb-8 text-white max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <ChevronRight size={16} />
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              <ChevronRight size={16} />
              <span>{post.category}</span>
            </div>
            <h1 className="text-5xl font-black mb-2 title-cabin">{post.title}</h1>
          </div>
        </div>
      </div>

      <section className="py-16 bg-neutral-light flex-1">
        <div className="max-w-3xl mx-auto px-4">
          {/* Meta */}
          <div className="mb-12 flex flex-wrap items-center gap-6 text-sm text-gray-600 pb-8 border-b">
            <div className="flex items-center gap-2">
              <User size={16} />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {post.readTime}
            </div>
            <span>{new Date(post.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <button className="flex items-center gap-2 hover:text-primary-600 ml-auto">
              <Share2 size={16} />
              Compartir
            </button>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-16">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/<h2>/g, '<h2 class="text-3xl font-black mt-8 mb-4">')
                  .replace(/<h3>/g, '<h3 class="text-2xl font-bold mt-6 mb-3">')
                  .replace(/<p>/g, '<p class="text-gray-700 mb-4 leading-relaxed">')
                  .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 mb-4 text-gray-700">')
                  .replace(/<li>/g, '<li class="ml-2">')
                  .replace(/<strong>/g, '<strong class="font-bold">')
              }}
            />
          </div>

          {/* CTA */}
          <div className="bg-primary-600 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">¿Listo para tu próxima aventura?</h3>
            <p className="mb-4">Descubre nuestros tours en Antioquia y vive estas experiencias en persona.</p>
            <Link href="/tours" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Explorar Tours
            </Link>
          </div>

          {/* Recent Posts */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">Otros artículos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(blogPosts)
                .slice(0, 3)
                .map(([postSlug, otherPost]: any) => (
                  <Link key={postSlug} href={`/blog/${postSlug}`} className="group block">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                      <div
                        className="h-32 bg-cover bg-center group-hover:scale-105 transition-transform"
                        style={{ backgroundImage: `url('${otherPost.image}')` }}
                      />
                      <div className="p-4">
                        <p className="text-xs text-primary-600 font-bold mb-1">{otherPost.category}</p>
                        <h4 className="font-bold text-sm line-clamp-2">{otherPost.title}</h4>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
