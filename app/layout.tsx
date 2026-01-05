import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ReservaFácil - Reserva en los mejores restaurantes',
  description: 'Plataforma de reservas de restaurantes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
