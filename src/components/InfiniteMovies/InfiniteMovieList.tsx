'use client'

import { Movie } from '~/models'
import { MovieListType } from '~/types'
import { useFetchMovies } from '~/hooks/use-fetch-movies'
import { InfiniteMovieGrid } from '~/components/InfiniteMovieGrid'
import { getMovieList } from '~/actions/movies-actions'

interface InfiniteMovieListProps {
  initMovies: Movie[]
  totalPages: number
  movieListType: MovieListType
}

export const InfiniteMovieList: React.FC<InfiniteMovieListProps> = ({
  initMovies,
  totalPages,
  movieListType,
}) => {
  const { observerTargetRef, movies, dataInfo } = useFetchMovies({
    initMovies,
    totalPages,
    fetchMovies: (page) => getMovieList(movieListType, page)
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
