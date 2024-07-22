import { useState, useEffect } from "react"
import { Movie, MovieListResponse } from "~/interfaces"
import { useIsInView } from "./use-is-in-view"

interface UseFetchMoviesProps {
	initMovies: Movie[]
	totalPages: number
	fetchMovies: (page: string) => Promise<MovieListResponse>
}

export const useFetchMovies = ({ initMovies, totalPages, fetchMovies }: UseFetchMoviesProps) => {
	const [moviesData, setMoviesData] = useState({
		movies: initMovies,
		page: 1,
		isLoading: false,
		hasError: false,
	})

	const { observerTargetRef, isInView } = useIsInView<HTMLDivElement>({
		rootMargin: "0px 0px 100% 0px",
	})

	useEffect(() => {
		const loadMovies = async () => {
			if (!isInView || moviesData.isLoading || moviesData.page > totalPages) return

			setMoviesData((prev) => ({ ...prev, isLoading: true }))

			try {
				const { results: newMovies } = await fetchMovies(moviesData.page.toString())
				setMoviesData((prev) => ({
					...prev,
					movies: [...prev.movies, ...newMovies],
					page: prev.page + 1,
					hasError: false,
					isLoading: false,
				}))
			} catch (error) {
				console.error("Error fetching movies:", error)
				setMoviesData((prev) => ({ ...prev, hasError: true, isLoading: false }))
			}
		}

		loadMovies()
	}, [isInView, moviesData.page, moviesData.isLoading, totalPages, fetchMovies])

	return { observerTargetRef, ...moviesData }
}
