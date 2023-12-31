import type { MutableRefObject } from 'react'
import { Movie } from '~/models'
import { MovieCard } from '~/components/MovieCard'
import { Loader } from '~/components/Loader'
import styles from './InfiniteMovieGrid.module.css'

interface InfiniteMovieGridProps {
  movies: Movie[]
  observerTargetRef: MutableRefObject<HTMLDivElement | null>
  isLoading: boolean
  hasError: boolean
}

export const InfiniteMovieGrid: React.FC<InfiniteMovieGridProps> = ({
  movies,
  observerTargetRef,
  isLoading,
  hasError,
}) => {
  return (
    <>
      <div className={styles.container}>
        {
          movies.map((movie, i) => {
            const {
              id,
              poster_path,
              title,
              release_date,
              overview,
              trailerKey
            } = movie

            return (
              <MovieCard
                key={i}
                id={id}
                posterPath={poster_path}
                title={title}
                releaseDate={release_date}
                overview={overview}
                trailerKey={trailerKey}
                loading={i < 12 ? 'eager' : 'lazy'}
              />
            )
          })
        }
      </div>
      <div
        ref={observerTargetRef}
        className={styles.observerTarget}
      ></div>
      {isLoading && <Loader />}
      {hasError && <p>Error loading movies, try again later</p>}
    </>
  )
}
