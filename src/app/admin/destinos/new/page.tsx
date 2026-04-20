import DestinationForm from '@/app/admin/destinos/form'

export default function NewDestinationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Crear Nuevo Destino</h1>
        <p className="text-gray-600">Completa los detalles para crear un nuevo destino turístico</p>
      </div>
      <DestinationForm />
    </div>
  )
}
