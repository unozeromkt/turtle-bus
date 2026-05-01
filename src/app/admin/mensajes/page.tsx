import Link from 'next/link'
import { Mail, MessageSquare, Phone, CheckCircle2, Clock3 } from 'lucide-react'
import { getAllInquiries, getLeadStats } from '@/lib/db/inquiries'

const statusLabel: Record<string, string> = {
  new: 'Nuevo',
  responded: 'Respondido',
  converted: 'Convertido',
  abandoned: 'Descartado',
}

const statusClassName: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  responded: 'bg-amber-100 text-amber-700',
  converted: 'bg-green-100 text-green-700',
  abandoned: 'bg-gray-200 text-gray-700',
}

export default async function AdminMensajesPage() {
  const [stats, messages] = await Promise.all([
    getLeadStats().catch(() => ({ total: 0, new: 0, converted: 0, conversionRate: '0%' })),
    getAllInquiries().catch(() => []),
  ])

  const respondedCount = messages.filter((message) => message.status === 'responded').length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mensajes</h1>
          <p className="mt-2 text-sm text-gray-600">
            Correos enviados desde el formulario de contacto del sitio.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm text-gray-500">Total mensajes</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm text-gray-500">Sin revisar</p>
          <p className="mt-3 text-3xl font-bold text-blue-700">{stats.new}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm text-gray-500">Respondidos</p>
          <p className="mt-3 text-3xl font-bold text-amber-700">{respondedCount}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <p className="text-sm text-gray-500">Convertidos</p>
          <p className="mt-3 text-3xl font-bold text-green-700">{stats.converted}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center text-gray-500">
            <MessageSquare className="h-10 w-10 text-gray-300" />
            <p className="text-lg font-semibold text-gray-700">Aún no hay mensajes</p>
            <p className="max-w-xl text-sm">
              Cuando alguien escriba desde la página de contacto, aparecerá aquí.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {messages.map((message) => {
              const tour = Array.isArray(message.tours) ? message.tours[0] : message.tours
              const status = message.status || 'new'
              const source = message.source || 'contact-page'

              return (
                <div key={message.id} className="grid gap-6 px-6 py-5 lg:grid-cols-[1.2fr_2fr_auto]">
                  <div className="space-y-3">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{message.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(message.created_at).toLocaleString('es-CO')}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                      <a href={`mailto:${message.email}`} className="flex items-center gap-2 hover:text-primary-600">
                        <Mail size={16} />
                        <span>{message.email}</span>
                      </a>
                      {message.phone ? (
                        <a href={`tel:${message.phone}`} className="flex items-center gap-2 hover:text-primary-600">
                          <Phone size={16} />
                          <span>{message.phone}</span>
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClassName[status] || statusClassName.new}`}>
                        {statusLabel[status] || 'Nuevo'}
                      </span>
                      <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                        Origen: {source}
                      </span>
                      {tour?.title ? (
                        <Link
                          href={`/tours/${tour.slug}`}
                          className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 hover:bg-primary-100"
                        >
                          Tour: {tour.title}
                        </Link>
                      ) : null}
                    </div>

                    <p className="text-sm leading-6 text-gray-700 whitespace-pre-line">
                      {message.message || 'Sin mensaje adicional.'}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-gray-500 lg:items-end">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                      <Clock3 size={14} />
                      <span>{status === 'new' ? 'Pendiente' : statusLabel[status] || 'Nuevo'}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-green-700">
                      <CheckCircle2 size={14} />
                      <span>Guardado en base de datos</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}