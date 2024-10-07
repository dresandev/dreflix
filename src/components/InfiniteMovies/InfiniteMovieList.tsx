"use client"

import { Movie } from "~/interfaces/Movie"
import { MovieListType } from "~/types"
import { getMovieList } from "~/actions/movies-actions"
import { useFetchMovies } from "~/hooks/use-fetch-movies"
import { InfiniteMovieGrid } from "~/components/InfiniteMovieGrid"

interface Props {
	initMovies: Movie[]
	totalPages: number
	movieListType: MovieListType
}

export const InfiniteMovieList: React.FC<Props> = ({
	initMovies,
	totalPages,
	movieListType,
}) => {
	const { observerTargetRef, movies, isLoading, hasError } = useFetchMovies({
		initMovies,
		totalPages,
		fetchMovies: (page) => getMovieList({ movieListType, page }),
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
