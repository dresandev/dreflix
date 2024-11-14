"use client"

import { Movie } from "~/interfaces/Movie"
import { getMoviesByGenre } from "~/actions/movies-actions"
import { useFetchMovies } from "~/hooks/use-fetch-movies"
import { InfiniteMovieGrid } from "~/components/InfiniteMovieGrid"

interface Props {
	sessionId?: string
	initMovies: Movie[]
	totalPages: number
	genreId: string
}

export const InfiniteMoviesByGenre: React.FC<Props> = ({
	sessionId,
	initMovies,
	totalPages,
	genreId,
}) => {
	const { observerTargetRef, movies, isLoading, hasError } = useFetchMovies({
		initMovies,
		totalPages,
		fetchMovies: (page) => getMoviesByGenre({ sessionId, genreId, page }),
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
