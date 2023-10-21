import { HeroCarousel } from '@components/HeroCarousel'
import { MoviesSection } from '@components/MoviesSection'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <div className={styles.gradient}></div>
      <HeroCarousel />

      <MoviesSection title='Popular' />
      <MoviesSection title='En cartelera hoy' />
      <MoviesSection title='Próximamente' />
      <MoviesSection title='Mejor valoradas' />
    </>
  )
}
