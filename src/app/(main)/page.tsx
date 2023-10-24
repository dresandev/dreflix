import { HeroCarousel } from '@components/HeroCarousel'
import { CarouselSection } from '@components/CarouselSection'
import { MovieCard } from '@components/MovieCard'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <HeroCarousel />

      <CarouselSection title='Popular' >
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
      </CarouselSection>
      <CarouselSection title='En cartelera hoy' >
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
      </CarouselSection>
      <CarouselSection title='Próximamente' >
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
      </CarouselSection>
      <CarouselSection title='Mejor valoradas' >
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
      </CarouselSection>
    </div>
  )
}
