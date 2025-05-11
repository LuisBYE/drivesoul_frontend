import { Inter } from 'next/font/google'
import './globals.css'
import { metadata } from './metadata'
import ClientProviders from './client-providers'

// Configuración de la fuente Inter para toda la aplicación
const inter = Inter({ subsets: ['latin'] })

// Exportar los metadatos para que Next.js los use
export { metadata }

/**
 * Componente principal de layout que envuelve toda la aplicación
 * Proporciona la estructura HTML básica y los proveedores de contexto
 */
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
