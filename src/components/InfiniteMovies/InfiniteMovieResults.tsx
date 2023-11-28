'use client'

import { Movie } from '~/models'
import { getMoviesByKeyword } from '~/actions/movies-actions'
import { useFetchMovies } from '~/hooks/use-fetch-movies'
import { InfiniteMovieGrid } from '~/components/InfiniteMovieGrid'

interface InfiniteMovieResultsProps {
  initMovies: Movie[] | null
  keyword: string
}

export const InfiniteMovieResults: React.FC<InfiniteMovieResultsProps> = ({
  initMovies,
  keyword
}) => {
  const { observerTargetRef, movies, dataInfo } = useFetchMovies(
    initMovies || [],
    (page) => getMoviesByKeyword(keyword, page)
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
