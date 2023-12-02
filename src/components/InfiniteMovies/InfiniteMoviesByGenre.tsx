'use client'

import { Movie } from '~/models'
import { getMoviesByGenre } from '~/actions/movies-actions'
import { useFetchMovies } from '~/hooks/use-fetch-movies'
import { InfiniteMovieGrid } from '~/components/InfiniteMovieGrid'

interface InfiniteMoviesByGenreProps {
  initMovies: Movie[] | null
  totalPages: number
  genreId: number
}

export const InfiniteMoviesByGenre: React.FC<InfiniteMoviesByGenreProps> = ({
  initMovies,
  totalPages,
  genreId,
}) => {
  const { observerTargetRef, movies, dataInfo } = useFetchMovies({
    initMovies,
    totalPages,
    fetchMovies: (page) => getMoviesByGenre(genreId, page)
  })

  const { isLoading, hasError } = dataInfo

  return (
    <>
      <InfiniteMovieGrid
        movies={movies}
        observerTargetRef={observerTargetRef}
        isLoading={isLoading}
        hasError={hasError}
      />
    </>
  )
}
