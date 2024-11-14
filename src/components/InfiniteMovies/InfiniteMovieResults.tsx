"use client"

import { Movie } from "~/interfaces/Movie"
import { getMoviesByTitle } from "~/actions/movies-actions"
import { useFetchMovies } from "~/hooks/use-fetch-movies"
import { InfiniteMovieGrid } from "~/components/InfiniteMovieGrid"

interface Props {
	sessionId?: string
	initMovies: Movie[]
	totalPages: number
	keyword: string
}

export const InfiniteMovieResults: React.FC<Props> = ({
	sessionId,
	initMovies,
	totalPages,
	keyword,
}) => {
	const { observerTargetRef, movies, isLoading, hasError } = useFetchMovies({
		initMovies,
		totalPages,
		fetchMovies: (page) => getMoviesByTitle({ sessionId, title: keyword, page }),
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
