'use client'

import { Movie } from '@models'
import { getMoviesByGenre } from '@actions/movies-actions'
import { useFetchMovies } from '@hooks/use-fetch-movies'
import { InfiniteMovieGrid } from '@components/InfiniteMovieGrid'

interface InfiniteMoviesByGenreProps {
  initMovies: Movie[] | null
  genre: number
}

export const InfiniteMoviesByGenre: React.FC<InfiniteMoviesByGenreProps> = ({
  initMovies,
  genre
}) => {
  const { observerTargetRef, movies, dataInfo } = useFetchMovies(
    initMovies || [],
    (page) => getMoviesByGenre(genre, page)
  )
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
