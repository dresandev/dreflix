import { useState, useEffect } from "react"
import type { MovieListResponse } from "~/interfaces/MovieListResponse"
import type { Movie } from "~/interfaces/Movie"
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

		setMoviesData((prev) => ({ ...prev, isLoading: true }))

		const loadMovies = async () => {
			try {
				const { results: newMovies } = await fetchMovies(moviesData.page.toString())
				setMoviesData((prev) => ({
					...prev,
					movies: [...prev.movies, ...newMovies],
					page: prev.page + 1,
					hasError: false,
				}))
			} catch (error) {
				console.error("Error fetching movies:", error)
				setMoviesData((prev) => ({ ...prev, hasError: true }))
			} finally {
				setMoviesData((prev) => ({ ...prev, isLoading: false }))
			}
		}

		loadMovies()
	}, [isInView, moviesData.page, moviesData.isLoading, totalPages, fetchMovies])

	return { observerTargetRef, ...moviesData }
}
