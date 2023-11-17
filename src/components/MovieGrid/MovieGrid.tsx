import { MovieListType } from '@types'
import { getMovieList } from '@services/movies-service'
import { formatDate } from '@helpers/format-date'
import { MovieCard } from '@components/MovieCard'
import styles from './MovieGrid.module.css'

interface MovieGridProps {
  movieListType: MovieListType
}

export const MovieGrid: React.FC<MovieGridProps> = async ({
  movieListType
}) => {
  const movies = await getMovieList(movieListType)

  return (
    <div className={styles.container}>
      {
        movies?.results.map(movie => {
          const { id, poster_path, title, release_date, overview } = movie

          return (
            <MovieCard
              key={id}
              className='carouselMovieCardWidth'
              id={id}
              posterPath={poster_path}
              title={title}
              releaseDate={formatDate(release_date)}
              overview={overview}
            />
          )
        })
      }
    </div>
  )
}
