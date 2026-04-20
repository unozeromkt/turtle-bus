import { supabaseAdmin } from '@/lib/supabase'
import DestinationForm from '@/app/admin/destinos/form'
import { notFound } from 'next/navigation'

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: destination, error } = await supabaseAdmin
    .from('destinations')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .single()

  if (error || !destination) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Editar Destino</h1>
        <p className="text-gray-600">Actualiza los detalles del destino: {destination.name}</p>
      </div>
      <DestinationForm initialData={destination} destinationId={id} isEditing={true} />
    </div>
  )
}
