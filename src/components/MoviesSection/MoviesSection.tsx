import { Carousel } from '@components/Carousel'
import { MovieCard } from '@components/MovieCard'
import styles from './MoviesSection.module.css'

interface MoviesSectionProps {
  title: string
}

export const MoviesSection: React.FC<MoviesSectionProps> = ({
  title
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

      <Carousel itemsGap='1.2rem'>
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
      </Carousel>
    </section>
  )
}
