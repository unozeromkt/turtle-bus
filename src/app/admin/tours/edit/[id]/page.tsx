import { supabaseAdmin } from '@/lib/supabase'
import { EditTourTabs } from '@/components/admin/EditTourTabs'
import { notFound } from 'next/navigation'

export default async function EditTourPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Obtener el tour
  const { id } = await params
  const { data: tour, error } = await supabaseAdmin
    .from('tours')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !tour) {
    notFound()
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Editar Tour: {tour.title}</h1>
      <EditTourTabs initialData={tour} />
    </div>
  )
}
