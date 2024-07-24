"use server"

import type { MovieListResponse } from "~/interfaces/MovieListResponse"
import type { MovieVideosResponse } from "~/interfaces/MovieVideosResponse"
import type { MovieCreditsResponse } from "~/interfaces/MovieCreditsResponse"
import type { Cast } from "~/interfaces/Cast"
import type { GenresResponse } from "~/interfaces/GenresResponse"
import type { Movie, MovieDetails } from "~/interfaces/Movie"
import type { Genre } from "~/interfaces/Genre"
import type { MovieTitle } from "~/interfaces/MovieTitle"
import type { MovieListType } from "~/types"
import { API_LANGUAGE, API_HEADERS } from "~/constants"
import { createAPIMethod } from "~/utils/create-api-method"

interface GetMovieListProps {
	movieListType: MovieListType
	page?: string
}

export const getMovieList = async ({ movieListType, page = "1" }: GetMovieListProps) => {
	const fetchMovieList = createAPIMethod<
		{
			page: string
			language: string
		},
		MovieListResponse
	>({
		url: `${process.env.API_BASE_URL}/movie/${movieListType}`,
		init: {
			...API_HEADERS,
			next: { revalidate: 60 * 60 * 24 * 7 },
		},
	})

	const movieListResponse = await fetchMovieList({
		page,
		language: API_LANGUAGE,
	})

	const moviesWithTrailerKey = await setTrailerKeyToMovies(movieListResponse.results)

	return {
		...movieListResponse,
		results: moviesWithTrailerKey,
	}
}

export const getMovieDetails = async (movieId: string) => {
	const fetchMovieDetails = createAPIMethod<
		{
			language: string
		},
		MovieDetails
	>({
		url: `${process.env.API_BASE_URL}/movie/${movieId}`,
		init: API_HEADERS,
	})

	return fetchMovieDetails({
		language: API_LANGUAGE,
	})
}

export const getSimilarMovies = async (movieId: string, page = "1") => {
	const fetchSimilarMovies = createAPIMethod<
		{
			page: string
			language: string
		},
		MovieListResponse
	>({
		url: `${process.env.API_BASE_URL}/movie/${movieId}/similar`,
		init: API_HEADERS,
	})

	const movieListResponse = await fetchSimilarMovies({
		page,
		language: API_LANGUAGE,
	})

	const moviesWithTrailerKey = await setTrailerKeyToMovies(movieListResponse.results)

	return {
		...movieListResponse,
		results: moviesWithTrailerKey,
	}
}

export const getMovieMainCast = async (movieId: string): Promise<Cast[]> => {
	const fetchMovieCredits = createAPIMethod<
		{
			language: string
		},
		MovieCreditsResponse
	>({
		url: `${process.env.API_BASE_URL}/movie/${movieId}/credits`,
		init: API_HEADERS,
	})

	const { cast } = await fetchMovieCredits({
		language: API_LANGUAGE,
	})

	const mainCast = cast
		.filter((actor) => actor.known_for_department === "Acting")
		.sort((a, b) => a.order - b.order)
		.slice(0, 20)

	return mainCast
}

export const getMovieTrailerKey = async (movieId: string) => {
	const fetchMovieVideos = createAPIMethod<
		{
			language: string
		},
		MovieVideosResponse
	>({
		url: `${process.env.API_BASE_URL}/movie/${movieId}/videos`,
		init: API_HEADERS,
	})

	const { results: videos } = await fetchMovieVideos({
		language: API_LANGUAGE,
	})

	for (const { site, type, key } of videos) {
		if (type === "Trailer" && site === "YouTube") {
			return key
		}
	}
}

export const getMovieListGenres = async (): Promise<Genre[]> => {
	const fetchMovieListGenres = createAPIMethod<
		{
			language: string
		},
		GenresResponse
	>({
		url: `${process.env.API_BASE_URL}/genre/movie/list`,
		init: API_HEADERS,
	})

	const { genres } = await fetchMovieListGenres({
		language: API_LANGUAGE,
	})

	return genres
}

export const getMovieListGenreByName = async (name: string): Promise<Genre | undefined> => {
	try {
		const movieListGenres = await getMovieListGenres()

		const genre = movieListGenres.find((genre) => genre.name.toLowerCase() === name)

		return genre
	} catch (error) {
		throw error
	}
}

export const getMoviesByGenre = async (genre: string, page = "1") => {
	const fetchMovieByGenre = createAPIMethod<
		{
			page: string
			include_adult: string
			include_video: string
			sort_by: string
			with_genres: string
			language: string
		},
		MovieListResponse
	>({
		url: `${process.env.API_BASE_URL}/discover/movie`,
		init: API_HEADERS,
	})

	const movieListResponse = await fetchMovieByGenre({
		page,
		include_adult: "false",
		include_video: "false",
		sort_by: "popularity.desc",
		with_genres: genre,
		language: API_LANGUAGE,
	})

	const moviesWithTrailerKey = await setTrailerKeyToMovies(movieListResponse.results)

	return {
		...movieListResponse,
		results: moviesWithTrailerKey,
	}
}

interface GetMoviesByTitleProps {
	title: string
	page?: string
	fetchOptions?: RequestInit
	withTrailerKey?: boolean
}

export const getMoviesByTitle = async ({ page = "1", title }: GetMoviesByTitleProps) => {
	const fetchMoviesByTitle = createAPIMethod<
		{
			page: string
			query: string
			include_adult: string
			language: string
		},
		MovieListResponse
	>({
		url: `${process.env.API_BASE_URL}/search/movie`,
		init: API_HEADERS,
	})

	const movieListResponse = await fetchMoviesByTitle({
		page,
		query: title,
		include_adult: "false",
		language: API_LANGUAGE,
	})

	const moviesWithTrailerKey = await setTrailerKeyToMovies(movieListResponse.results)

	return {
		...movieListResponse,
		results: moviesWithTrailerKey,
	}
}

export const getMovieTitles = async (title: string) => {
	const fetchMoviesByTitleNoCache = createAPIMethod<
		{
			page: string
			query: string
			include_adult: string
			language: string
		},
		MovieListResponse
	>({
		url: `${process.env.API_BASE_URL}/search/movie`,
		init: {
			...API_HEADERS,
			cache: "no-store",
		},
	})

	const { results: movies } = await fetchMoviesByTitleNoCache({
		page: "1",
		query: title,
		include_adult: "false",
		language: API_LANGUAGE,
	})

	const uniqueMovieTitles: MovieTitle[] = []
	const uniqueNames = new Set<string>()

	for (const { id, title } of movies) {
		const lowerCaseTitle = title.toLowerCase()
		if (!uniqueNames.has(lowerCaseTitle)) {
			uniqueNames.add(lowerCaseTitle)
			uniqueMovieTitles.push({ id, title: lowerCaseTitle })
		}
	}

	return uniqueMovieTitles.slice(0, 10)
}

export const setTrailerKeyToMovies = async (movies: Movie[]) => {
	const setTrailerKey = async (movie: Movie) => {
		try {
			const trailerKey = await getMovieTrailerKey(movie.id.toString())
			return {
				...movie,
				trailerKey,
			}
		} catch (error) {
			return movie
		}
	}

	const moviesWithTrailerKey = await Promise.all(movies.map(setTrailerKey))

	return moviesWithTrailerKey
}
