import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Turtle Bus - Tours y Experiencias en Medellín y Guatapé',
  description: 'Descubre tours de aventura, naturaleza y cultura en Medellín, Guatapé y Antioquia. Reserva tu experiencia única hoy.',
  icons: {
    icon: '/images/favicon-turtle.png',
    shortcut: '/images/favicon-turtle.png',
    apple: '/images/favicon-turtle.png',
  },
  openGraph: {
    title: 'Turtle Bus - Tours y Experiencias Increíbles',
    description: 'Tours de aventura en Medellín y Guatapé',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-neutral-light text-neutral-dark">
        {children}
      </body>
    </html>
  )
}
