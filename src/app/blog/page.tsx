import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroBanner } from '@/components/hero/HeroBanner'
import { Clock, User } from 'lucide-react'
import { getBlogPostReadTime, getPublishedBlogPosts } from '@/lib/db/blog-posts'

const fallbackImage = '/images/destinos-antioquia.jpg'

export async function generateMetadata(): Promise<Metadata> {
  const blogPosts = await getPublishedBlogPosts(1).catch(() => [])
  const featuredPost = blogPosts[0]

  const title = featuredPost?.meta_title || 'Blog Turtle Bus | Guías, consejos y experiencias en Antioquia'
  const description = featuredPost?.meta_description || featuredPost?.excerpt || 'Descubre historias, consejos de viaje y guías locales para vivir Antioquia con Turtle Bus.'
  const image = featuredPost?.featured_image || fallbackImage

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export default async function BlogPage() {
  const blogPosts = await getPublishedBlogPosts().catch(() => [])
  const featuredPost = blogPosts[0]

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <HeroBanner
        title="Blog"
        subtitle="Historias, consejos y experiencias de viaje"
      />

      <section className="py-16 bg-neutral-light flex-1">
        <div className="max-w-7xl mx-auto px-4">
          {featuredPost ? (
            <>
              <div className="mb-16 group">
                <Link href={`/blog/${featuredPost.slug}`} className="block">
                  <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg md:grid-cols-2">
                    <div
                      className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105 md:h-auto"
                      style={{ backgroundImage: `url('${featuredPost.featured_image || fallbackImage}')` }}
                    />
                    <div className="flex flex-col justify-center p-8">
                      <span className="mb-3 text-sm font-bold text-primary-600">Artículo destacado</span>
                      <h2 className="title-cabin mb-4 text-4xl font-black">{featuredPost.title}</h2>
                      <p className="mb-6 text-lg text-gray-600">
                        {featuredPost.excerpt || 'Explora este artículo y conecta con nuevas ideas de viaje en Antioquia.'}
                      </p>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          {featuredPost.author || 'Turtle Bus'}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          {getBlogPostReadTime(featuredPost.content)}
                        </div>
                        <span>
                          {new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString('es-CO')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.slice(1).map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg">
                      <div
                        className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url('${post.featured_image || fallbackImage}')` }}
                      />
                      <div className="flex flex-1 flex-col p-6">
                        <span className="mb-2 text-xs font-bold text-primary-600">Blog Turtle Bus</span>
                        <h3 className="mb-3 line-clamp-2 text-xl font-bold">{post.title}</h3>
                        <p className="mb-4 flex-1 text-sm text-gray-600">
                          {post.excerpt || 'Lee el artículo completo para descubrir el contenido.'}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 border-t pt-4 text-xs text-gray-500">
                          <span>{post.author || 'Turtle Bus'}</span>
                          <span>{getBlogPostReadTime(post.content)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-600 shadow-sm">
              Aún no hay artículos publicados.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
