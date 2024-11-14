"use client"

import { Movie } from "~/interfaces/Movie"
import { getFavoriteMovies } from "~/actions/movies-actions"
import { useFetchMovies } from "~/hooks/use-fetch-movies"
import { InfiniteMovieGrid } from "~/components/InfiniteMovieGrid"

interface Props {
  sessionId: string
  initMovies: Movie[]
  totalPages: number
}

export const InfiniteFavoriteMovies: React.FC<Props> = ({
  sessionId,
  initMovies,
  totalPages,
}) => {
  const {
    observerTargetRef,
    movies,
    isLoading,
    hasError,
  } = useFetchMovies({
    initMovies,
    totalPages,
    fetchMovies: (page) => getFavoriteMovies({ sessionId, page }),
  })

  return (
    <InfiniteMovieGrid
      observerTargetRef={observerTargetRef}
      movies={movies}
      isLoading={isLoading}
      hasError={hasError}
    />
  )
}
