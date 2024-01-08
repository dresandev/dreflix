'use client'

import { Movie } from '~/models'
import { getMoviesByTitle } from '~/actions/movies-actions'
import { useFetchMovies } from '~/hooks/use-fetch-movies'
import { InfiniteMovieGrid } from '~/components/InfiniteMovieGrid'

interface InfiniteMovieResultsProps {
  initMovies: Movie[]
  totalPages: number
  keyword: string
}

export const InfiniteMovieResults: React.FC<InfiniteMovieResultsProps> = ({
  initMovies,
  totalPages,
  keyword
}) => {
  const { observerTargetRef, movies, dataInfo } = useFetchMovies({
    initMovies,
    totalPages,
    fetchMovies: (page) => {
      return getMoviesByTitle({ title: keyword, page })
    }
  })

  const { isLoading, hasError } = dataInfo

  return (
    <InfiniteMovieGrid
      observerTargetRef={observerTargetRef}
      movies={movies}
      isLoading={isLoading}
      hasError={hasError}
    />
  )
}
