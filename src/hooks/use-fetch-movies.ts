import { useState, useEffect } from "react"
import type { Movie, MovieListResponse } from "~/interfaces"
import { asyncWrapper } from "~/utils/async-wrapper"
import { useIsInView } from "./use-is-in-view"

interface Props {
	initMovies: Movie[]
	totalPages: number
	fetchMovies: (page: string) => Promise<MovieListResponse>
}

export const useFetchMovies = ({
	initMovies,
	totalPages,
	fetchMovies,
}: Props) => {
	const [moviesData, setMoviesData] = useState({
		movies: initMovies,
		// It starts on page two, since page one is displayed by default and is sent from the server
		page: 2,
		isLoading: false,
		hasError: false,
	})

	const { observerTargetRef, isInView } = useIsInView<HTMLDivElement>({
		rootMargin: "0px 0px 100% 0px",
	})

	useEffect(() => {
		setMoviesData((prevData) => ({ ...prevData, movies: initMovies }))
	}, [initMovies])

	useEffect(() => {
		if (
			!isInView ||
			moviesData.isLoading ||
			moviesData.page > totalPages
		) return

		const loadMovies = async () => {
			setMoviesData((prev) => ({ ...prev, isLoading: true }))

			const { data, error, status } = await asyncWrapper(
				fetchMovies(moviesData.page.toString())
			)

			if (status === "error") {
				setMoviesData((prev) => ({
					...prev,
					isLoading: false,
					hasError: true,
				}))
				console.error("Error fetching movies:", error)
				return
			}

			setMoviesData((prev) => ({
				...prev,
				movies: [...prev.movies, ...data.results],
				page: prev.page + 1,
				isLoading: false,
				hasError: false,
			}))
		}

		loadMovies()
	}, [isInView, moviesData.page, moviesData.isLoading, totalPages, fetchMovies])

	return { observerTargetRef, ...moviesData }
}
