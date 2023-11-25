import { Movie } from '@models'
import { CarouselSection } from '@components/CarouselSection'
import { MovieCard } from '@components/MovieCard'
import styles from './SimilarMovies.module.css'

interface SimilarMoviesProps {
  similarMovies: Movie[] | null
}

export const SimilarMovies: React.FC<SimilarMoviesProps> = ({
  similarMovies
}) => {

  if (!similarMovies?.length) return (
    <p className={styles.notFoundMessage}>
      No se encontraron películas similares
    </p>
  )

  return (
    <>
      <CarouselSection title='Películas similares'>
        {
          similarMovies.map(similarMovie => {
            const { id, poster_path, title, release_date, overview, trailerKey } = similarMovie

            return (
              <MovieCard
                key={id}
                className='carouselMovieCardWidth'
                id={id}
                posterPath={poster_path}
                title={title}
                releaseDate={release_date}
                overview={overview}
                trailerKey={trailerKey}
              />
            )
          })
        }
      </CarouselSection>
    </>
  )
}
