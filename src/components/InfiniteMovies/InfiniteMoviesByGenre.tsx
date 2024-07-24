"use client"

import { Movie } from "~/interfaces/Movie"
import { getMoviesByGenre } from "~/actions/movies-actions"
import { useFetchMovies } from "~/hooks/use-fetch-movies"
import { InfiniteMovieGrid } from "~/components/InfiniteMovieGrid"

interface InfiniteMoviesByGenreProps {
	initMovies: Movie[]
	totalPages: number
	genreId: string
}

export const InfiniteMoviesByGenre: React.FC<InfiniteMoviesByGenreProps> = ({
	initMovies,
	totalPages,
	genreId,
}) => {
	const { observerTargetRef, movies, isLoading, hasError } = useFetchMovies({
		initMovies,
		totalPages,
		fetchMovies: (page) => getMoviesByGenre(genreId, page),
	})

	return (
		<InfiniteMovieGrid
			movies={movies}
			observerTargetRef={observerTargetRef}
			isLoading={isLoading}
			hasError={hasError}
		/>
	)
}
