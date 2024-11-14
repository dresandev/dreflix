"use client"

import { Movie } from "~/interfaces/Movie"
import { MovieListType } from "~/types"
import { getMovieList } from "~/actions/movies-actions"
import { useFetchMovies } from "~/hooks/use-fetch-movies"
import { InfiniteMovieGrid } from "~/components/InfiniteMovieGrid"

interface Props {
	sessionId?: string
	initMovies: Movie[]
	totalPages: number
	movieListType: MovieListType
}

export const InfiniteMovieList: React.FC<Props> = ({
	sessionId,
	initMovies,
	totalPages,
	movieListType,
}) => {
	const { observerTargetRef, movies, isLoading, hasError } = useFetchMovies({
		initMovies,
		totalPages,
		fetchMovies: (page) => getMovieList({ sessionId, movieListType, page }),
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
