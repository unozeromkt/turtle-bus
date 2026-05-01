import Link from 'next/link'
import { Trash2, Edit, Plus } from 'lucide-react'
import { deleteBlogPostAction } from '@/app/actions/blog-posts'
import { getAllBlogPosts } from '@/lib/db/blog-posts'

const statusClasses = {
  published: 'bg-green-100 text-green-800',
  draft: 'bg-yellow-100 text-yellow-800',
  archived: 'bg-gray-200 text-gray-700',
}

const statusLabels = {
  published: 'Publicado',
  draft: 'Borrador',
  archived: 'Archivado',
}

export default async function AdminBlogPage() {
  const blogPosts = await getAllBlogPosts().catch(() => [])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de Blog</h1>
        <Link href="/admin/blog/nuevo" className="btn btn-primary flex items-center gap-2">
          <Plus size={18} />
          Nuevo Post
        </Link>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-sm">Título</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Autor</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Estado</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Publicación</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Actualizado</th>
              <th className="text-left px-6 py-3 font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-semibold line-clamp-2">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.slug}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{post.author || 'Sin autor'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusClasses[post.status] || statusClasses.draft}`}>
                    {statusLabels[post.status] || 'Borrador'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString('es-CO')
                    : 'No publicado'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(post.updated_at).toLocaleDateString('es-CO')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/blog/${post.id}`} className="p-2 hover:bg-blue-100 text-blue-600 rounded">
                      <Edit size={16} />
                    </Link>
                    <form action={deleteBlogPostAction.bind(null, post.id, post.slug)}>
                      <button className="p-2 hover:bg-red-100 text-red-600 rounded" type="submit">
                      <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {blogPosts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  Aún no hay artículos. Crea el primero para publicarlo en el front.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
