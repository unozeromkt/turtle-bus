import { notFound } from 'next/navigation'
import BlogForm from '@/app/admin/blog/form'
import { getBlogPostById } from '@/lib/db/blog-posts'

export default async function AdminEditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  try {
    const blogPost = await getBlogPostById(id)

    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Editar blog</h1>
          <p className="mt-2 text-sm text-gray-600">
            Actualiza el contenido, portada y estado de publicación del artículo.
          </p>
        </div>

        <BlogForm initialData={blogPost} blogPostId={blogPost.id} isEditing />
      </div>
    )
  } catch (error) {
    notFound()
  }
}
