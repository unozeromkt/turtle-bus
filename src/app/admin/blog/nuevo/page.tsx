import BlogForm from '@/app/admin/blog/form'

export default function AdminNewBlogPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Nuevo blog</h1>
        <p className="mt-2 text-sm text-gray-600">
          Crea un artículo y decide si queda como borrador o publicado.
        </p>
      </div>

      <BlogForm />
    </div>
  )
}
