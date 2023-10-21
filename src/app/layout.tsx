import type { Metadata } from 'next'
import { Body } from '@components/Body'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import '@styles/reset.css'
import '@styles/globals.css'

export const metadata: Metadata = {
  title: 'Dreflix: Explora y encuentra la película  indicada',
  description: 'Explora a través de un gran catálogo de películas y encuentra la indicada',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: false
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='es'>
      <Body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </Body>
    </html>
  )
}
