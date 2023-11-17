import type { Metadata, Viewport } from 'next'
import { Fira_Sans } from 'next/font/google'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'
import { TrailerModalCC } from '@components/TrailerModalCC'
import '@styles/reset.css'
import '@styles/globals.css'

export const metadata: Metadata = {
  title: 'Dreflix: Explora y encuentra la película  indicada',
  description: 'Explora a través de un gran catálogo de películas y encuentra la indicada',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false
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
        <div className='__next'>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </div>
        <div id='modal-container'>
          <TrailerModalCC />
        </div>
      </body>
    </html>
  )
}
