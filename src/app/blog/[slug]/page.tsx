import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ChevronRight, Clock, User, Share2 } from 'lucide-react'
import { getBlogPostBySlug, getBlogPostReadTime, getPublishedBlogPosts } from '@/lib/db/blog-posts'

const fallbackImage = '/images/destinos-antioquia.jpg'

function stripHtml(value: string | null) {
  return (value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  try {
    const post = await getBlogPostBySlug(slug)
    const title = post.meta_title || post.title
    const description = post.meta_description || post.excerpt || stripHtml(post.content).slice(0, 160)
    const image = post.featured_image || fallbackImage

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        images: [{ url: image }],
        publishedTime: post.published_at || post.created_at,
        authors: post.author ? [post.author] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
    }
  } catch {
    return {
      title: 'Artículo no encontrado | Turtle Bus',
      description: 'El artículo solicitado no está disponible.',
    }
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let post

  try {
    post = await getBlogPostBySlug(slug)
  } catch {
    notFound()
  }

  const recentPosts = await getPublishedBlogPosts(4).catch(() => [])
  const otherPosts = recentPosts.filter((item) => item.slug !== slug).slice(0, 3)

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url('${post.featured_image || fallbackImage}')` }}
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
              <span>Artículo</span>
            </div>
            <h1 className="text-5xl font-black mb-2 title-cabin">{post.title}</h1>
          </div>
        </div>
      </div>

      <section className="py-16 bg-neutral-light flex-1">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-12 flex flex-wrap items-center gap-6 border-b pb-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User size={16} />
              {post.author || 'Turtle Bus'}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {getBlogPostReadTime(post.content)}
            </div>
            <span>
              {new Date(post.published_at || post.created_at).toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <button className="ml-auto flex items-center gap-2 hover:text-primary-600">
              <Share2 size={16} />
              Compartir
            </button>
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <div
              dangerouslySetInnerHTML={{
                __html: (post.content || `<p>${post.excerpt || 'Contenido próximamente.'}</p>`)
                  .replace(/<h2>/g, '<h2 class="text-3xl font-black mt-8 mb-4">')
                  .replace(/<h3>/g, '<h3 class="text-2xl font-bold mt-6 mb-3">')
                  .replace(/<p>/g, '<p class="text-gray-700 mb-4 leading-relaxed">')
                  .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 mb-4 text-gray-700">')
                  .replace(/<li>/g, '<li class="ml-2">')
                  .replace(/<strong>/g, '<strong class="font-bold">')
              }}
            />
          </div>

          <div className="bg-primary-600 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">¿Listo para tu próxima aventura?</h3>
            <p className="mb-4">Descubre nuestros tours en Antioquia y vive estas experiencias en persona.</p>
            <Link href="/tours" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Explorar Tours
            </Link>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">Otros artículos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPosts.map((otherPost) => (
                <Link key={otherPost.slug} href={`/blog/${otherPost.slug}`} className="group block">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div
                      className="h-32 bg-cover bg-center group-hover:scale-105 transition-transform"
                      style={{ backgroundImage: `url('${otherPost.featured_image || fallbackImage}')` }}
                    />
                    <div className="p-4">
                      <p className="mb-1 text-xs font-bold text-primary-600">Blog Turtle Bus</p>
                      <h4 className="line-clamp-2 text-sm font-bold">{otherPost.title}</h4>
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
