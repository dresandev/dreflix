import { HeroCarousel } from '@components/HeroCarousel'
import styles from './page.module.css'
import { MoviesSection } from '@components/MoviesSection'

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <MoviesSection title='Popular' />
      <MoviesSection title='En cartelera hoy' />
      <MoviesSection title='Próximamente' />
      <MoviesSection title='Mejor valoradas' />
    </>
  )
}
