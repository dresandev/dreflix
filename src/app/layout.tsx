import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google'
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

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: [
    '400',
    '500',
    '700',
  ]
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='es'>
      <body className={firaSans.className}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
