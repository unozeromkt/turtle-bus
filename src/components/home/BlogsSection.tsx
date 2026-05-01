import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { AnimateOnScroll, StaggerOnScroll, StaggerItem } from '@/components/ui/AnimateOnScroll'
import { getBlogPostReadTime, getPublishedBlogPosts } from '@/lib/db/blog-posts'

const fallbackImage = '/images/destinos-antioquia.jpg'

export async function BlogsSection() {
  const blogPosts = await getPublishedBlogPosts(3).catch(() => [])

  if (blogPosts.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-40 h-40 bg-accent-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <AnimateOnScroll variant="fadeUp" className="text-center mb-16">
          <span className="inline-block text-accent-orange font-black uppercase tracking-widest text-sm mb-4">
            Historias e Inspiración
          </span>
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-neutral-dark title-cabin">
            Antioquia es Aventura
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre historias de viajeros reales, tips de aventureros certificados y secretos de esta región mágica
          </p>
        </AnimateOnScroll>

        <StaggerOnScroll className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-56 overflow-hidden bg-gray-200">
                    <img
                      src={post.featured_image || fallbackImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent-orange text-white text-xs font-black px-3 py-1 rounded-full">
                        Blog
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-neutral-dark mb-3 line-clamp-2 group-hover:text-accent-orange transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                      {post.excerpt || 'Explora este artículo completo en nuestro blog.'}
                    </p>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Clock size={14} />
                        <span>{getBlogPostReadTime(post.content)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between text-accent-orange text-sm font-black group-hover:gap-3 transition-all">
                    <span>Leer Artículo</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerOnScroll>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 bg-neutral-dark text-white font-black py-4 px-8 rounded-xl text-lg hover:bg-neutral-dark/90 transition-all transform hover:scale-105 shadow-lg"
          >
            Explorar Todos los Artículos
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogsSection
