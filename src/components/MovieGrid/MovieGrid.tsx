import { Movie } from '@models'
import { MovieCard } from '@components/MovieCard'
import styles from './MovieGrid.module.css'

interface MovieGridProps {
  movies: Movie[] | undefined
}

export const MovieGrid: React.FC<MovieGridProps> = async ({
  movies
}) => {
  return (
    <div className={styles.container}>
      {
        movies?.map(movie => {
          const { id, poster_path, title, release_date, overview } = movie

          return (
            <MovieCard
              key={id}
              id={id}
              posterPath={poster_path}
              title={title}
              releaseDate={release_date}
              overview={overview}
            />
          )
        })
      }
    </div>
  )
}
