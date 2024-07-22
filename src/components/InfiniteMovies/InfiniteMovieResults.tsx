"use client"

import { Movie } from "~/interfaces"
import { getMoviesByTitle } from "~/actions/movies-actions"
import { useFetchMovies } from "~/hooks/use-fetch-movies"
import { InfiniteMovieGrid } from "~/components/InfiniteMovieGrid"

interface InfiniteMovieResultsProps {
	initMovies: Movie[]
	totalPages: number
	keyword: string
}

export const InfiniteMovieResults: React.FC<InfiniteMovieResultsProps> = ({
	initMovies,
	totalPages,
	keyword,
}) => {
	const { observerTargetRef, movies, isLoading, hasError } = useFetchMovies({
		initMovies,
		totalPages,
		fetchMovies: (page) => getMoviesByTitle({ title: keyword, page }),
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
