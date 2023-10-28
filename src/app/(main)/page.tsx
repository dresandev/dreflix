import { HeroCarousel } from '@components/HeroCarousel'
import { CarouselSection } from '@components/CarouselSection'
import { MovieCard } from '@components/MovieCard'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>Bienvenido</h1>
      <HeroCarousel />

      <CarouselSection title='Popular' >
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
      </CarouselSection>
      <CarouselSection title='En cartelera hoy' >
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
      </CarouselSection>
      <CarouselSection title='Próximamente' >
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
      </CarouselSection>
      <CarouselSection title='Mejor valoradas' >
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
      </CarouselSection>
    </>
  )
}
