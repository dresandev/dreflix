"use server"

import type {
	MovieListResponse,
	MovieVideosResponse,
	MovieCreditsResponse,
	Cast,
	GenresResponse,
	Movie,
	MovieDetails,
	MovieTitle,
} from "~/interfaces"
import type { MovieListType } from "~/types"
import { API_LANGUAGE } from "~/constants"
import { asyncWrapper } from "~/utils/async-wrapper"
import { api } from "~/api/api-methods"

export const getMovieList = async ({
	sessionId,
	movieListType,
	page = "1"
}: {
	sessionId?: string,
	movieListType: MovieListType
	page?: string
}) => {
	const REVALIDATE_TIME = 60 * 60 * 24 * 7
	const searchParams = new URLSearchParams({
		page: page,
		language: API_LANGUAGE
	})

	const movieListResponse = await api.get<MovieListResponse>(
		`/movie/${movieListType}?${searchParams}`,
		{ next: { revalidate: REVALIDATE_TIME } }
	)

	const movies = await setExtraDataToMovies({
		sessionId,
		movies: movieListResponse.results,
	})

	return {
		...movieListResponse,
		results: movies
	}
}

export const getMovieDetails = async ({
	sessionId,
	movieId,
}: {
	sessionId?: string,
	movieId: string,
}) => {
	const searchParams = new URLSearchParams({
		language: API_LANGUAGE
	})

	const { data: details, status } = await asyncWrapper<MovieDetails>(
		api.get(`/movie/${movieId}?${searchParams}`)
	)

	if (status === "error") {
		return null
	}

	const extraData = await getMovieExtraData({
		sessionId,
		movieId: details.id.toString()
	})

	return {
		...details,
		...extraData,
	}
}

export const getSimilarMovies = async ({
	sessionId,
	movieId,
	page = "1",
}: {
	sessionId?: string,
	movieId: string,
	page?: string
}) => {
	const searchParams = new URLSearchParams({
		page: page,
		language: API_LANGUAGE
	})

	const movieListResponse = await api.get<MovieListResponse>(
		`/movie/${movieId}/similar?${searchParams}`
	)

	const movies = await setExtraDataToMovies({
		sessionId,
		movies: movieListResponse.results,
	})

	return {
		...movieListResponse,
		results: movies
	}
}

export const getMovieMainCast = async (movieId: string): Promise<Cast[]> => {
	const CAST_DEPARTMENT = "Acting"
	const searchParams = new URLSearchParams({
		language: API_LANGUAGE
	})

	const { cast } = await api.get<MovieCreditsResponse>(
		`/movie/${movieId}/credits?${searchParams}`
	)

	const mainCast = cast
		.filter((actor) => actor.known_for_department === CAST_DEPARTMENT)
		.sort((a, b) => a.order - b.order)
		.slice(0, 20)

	return mainCast
}

export const getTrailerKey = async (movieId: string) => {
	const VIDEO_TYPE = "Trailer"
	const VIDEO_SITE = "YouTube"
	const searchParams = new URLSearchParams({
		language: API_LANGUAGE
	})

	const { results: videos } = await api.get<MovieVideosResponse>(
		`/movie/${movieId}/videos?${searchParams}`
	)

	const trailer = videos.find(
		({ site, type }) => type === VIDEO_TYPE && site === VIDEO_SITE
	)

	return trailer?.key
}

export const getMovieListGenres = async () => {
	const searchParams = new URLSearchParams({
		language: API_LANGUAGE
	})

	const { genres } = await api.get<GenresResponse>(
		`/genre/movie/list?${searchParams}`
	)

	return genres
}

export const getMovieListGenreByName = async (name: string) => {
	const genres = await getMovieListGenres()
	const genre = genres.find((genre) => genre.name.toLowerCase() === name)

	return genre
}

export const getMoviesByGenre = async ({
	sessionId,
	genreId,
	page = "1",
}: {
	sessionId?: string,
	genreId: string,
	page?: string,
}) => {
	const searchParams = new URLSearchParams({
		language: API_LANGUAGE,
		page: page,
		include_adult: "false",
		include_video: "false",
		sort_by: "popularity.desc",
		with_genres: genreId,
	})

	const movieListResponse = await api.get<MovieListResponse>(
		`/discover/movie?${searchParams}`
	)

	const movies = await setExtraDataToMovies({
		sessionId,
		movies: movieListResponse.results,
	})

	return {
		...movieListResponse,
		results: movies
	}
}

export const getMoviesByTitle = async ({
	sessionId,
	page = "1",
	title
}: {
	sessionId?: string
	title: string
	page?: string
}) => {
	const searchParams = new URLSearchParams({
		language: API_LANGUAGE,
		page: page,
		include_adult: "false",
		query: title
	})

	const movieListResponse = await api.get<MovieListResponse>(
		`/search/movie?${searchParams}`
	)
	const movies = await setExtraDataToMovies({
		sessionId,
		movies: movieListResponse.results,
	})

	return {
		...movieListResponse,
		results: movies
	}
}

export const getMovieTitles = async (title: string) => {
	const searchParams = new URLSearchParams({
		language: API_LANGUAGE,
		page: "1",
		include_adult: "false",
		query: title,
	})

	const { results: movies } = await api.get<MovieListResponse>(
		`/search/movie?${searchParams}`
	)

	const uniqueMovieTitles: MovieTitle[] = []
	const uniqueNames = new Set<string>()

	for (const { id, title } of movies) {
		const lowerCaseTitle = title.toLowerCase()
		if (uniqueNames.has(lowerCaseTitle)) continue

		uniqueNames.add(lowerCaseTitle)
		uniqueMovieTitles.push({ id, title: lowerCaseTitle })
	}

	return uniqueMovieTitles.slice(0, 10)
}

export const getFavoriteMovies = async ({
	sessionId,
	page = "1",
}: {
	sessionId: string,
	page?: string,
}) => {
	const searchParams = new URLSearchParams({
		language: API_LANGUAGE,
		page,
		session_id: sessionId
	})

	const movieResults = await api.get<MovieListResponse>(
		`/account/null/favorite/movies?${searchParams}`,
		{ next: { tags: ["favorite-movies"] } }
	)

	const moviesWithTrailerKey = await setTrailerKeyToMovies(movieResults.results)
	const movies = moviesWithTrailerKey.map((movie) => ({
		...movie,
		isFavorite: true,
	}))

	return {
		...movieResults,
		results: movies
	}
}

const setExtraDataToMovies = async ({
	sessionId,
	movies,
}: {
	sessionId?: string,
	movies: Movie[],
}) => {
	const withTrailerKey = await setTrailerKeyToMovies(movies)

	if (!sessionId) {
		return withTrailerKey
	}

	const withFavorites = await setIsFavoriteToMovies({
		sessionId,
		movies: withTrailerKey
	})

	return withFavorites
}

const getMovieExtraData = async ({
	sessionId,
	movieId,
}: {
	sessionId?: string,
	movieId: string,
}) => {
	const trailerKey = await getTrailerKey(movieId)

	if (!sessionId) return {
		trailerKey,
		isFavorite: false,
	}

	const { results: favoriteMovies } = await getFavoriteMovies({ sessionId })
	const favoritesIds = favoriteMovies.map((movie) => movie.id)

	return {
		trailerKey,
		isFavorite: favoritesIds.includes(Number(movieId)),
	}
}

export const setTrailerKeyToMovies = async (movies: Movie[]) => {
	const setTrailerKeys = movies.map(async (movie) => {
		const { data: trailerKey, status } = await asyncWrapper(
			getTrailerKey(movie.id.toString())
		)

		return (status === "success")
			? { ...movie, trailerKey }
			: movie
	})

	const moviesWithTrailerKey = await Promise.all(setTrailerKeys)

	return moviesWithTrailerKey
}

export const setIsFavoriteToMovies = async ({
	sessionId,
	movies,
}: {
	sessionId: string,
	movies: Movie[],
}) => {
	const { results: favoriteMovies } = await getFavoriteMovies({ sessionId })

	const favoritesIds = favoriteMovies.map((movie) => movie.id)

	const moviesWithFavorite = movies.map((movie) => ({
		...movie,
		isFavorite: favoritesIds.includes(movie.id)
	}))

	return moviesWithFavorite
}
