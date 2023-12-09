'use server'

import {
  API_BASE_URL,
  API_LANGUAGE,
  COMMON_GET_OPTIONS
} from '~/constants'
import {
  MovieListResponse,
  MovieDetails,
  MovieVideosResponse,
  MovieCreditsResponse,
  Cast,
  GenresResponse,
  Movie,
  Genre,
  MovieTitle,
} from '~/models'
import { MovieListType } from '~/types'

export const getMovieList = async (
  movieListType: MovieListType,
  page = 1
): Promise<MovieListResponse | null> => {
  try {
    const url = `${API_BASE_URL}/movie/${movieListType}?language=${API_LANGUAGE}&page=${page}`

    const result = await fetch(url, COMMON_GET_OPTIONS)

    if (result.status === 200) {
      const movieListResponse = await result.json() as MovieListResponse
      movieListResponse.results = await setTrailerKeyInMovies(movieListResponse.results)
      return movieListResponse
    }

    return null
  } catch (error) {
    console.error('Error in getMovieList:', error)
    throw new Error('Error fetching movie list')
  }
}

export const getMovieDetails = async (
  movieId: string | number
): Promise<MovieDetails | null> => {
  try {
    const url = `${API_BASE_URL}/movie/${movieId}?language=${API_LANGUAGE}`

    const result = await fetch(url, COMMON_GET_OPTIONS)

    if (result.status === 200) {
      const data = await result.json()
      return data
    }

    return null
  } catch (error) {
    console.error('Error in getMovieById:', error)
    throw new Error('Error fetching movie by id')
  }
}

export const getSimilarMovies = async (
  movieId: string | number,
  page = 1
): Promise<MovieListResponse | null> => {
  try {
    const url = `${API_BASE_URL}/movie/${movieId}/similar?language=${API_LANGUAGE}&page=${page}`

    const result = await fetch(url, COMMON_GET_OPTIONS)

    if (result.status === 200) {
      const movieListResponse = await result.json() as MovieListResponse
      movieListResponse.results = await setTrailerKeyInMovies(movieListResponse.results)
      return movieListResponse
    }

    return null
  } catch (error) {
    console.error('Error in getSimilarMovies:', error)
    throw new Error('Error fetching similar movies')
  }
}

export const getMovieMainCast = async (
  movieId: string | number,
): Promise<Cast[] | null> => {
  try {
    const url = `${API_BASE_URL}/movie/${movieId}/credits?language=${API_LANGUAGE}`

    const result = await fetch(url, COMMON_GET_OPTIONS)

    if (result.status === 200) {
      const data = await result.json() as MovieCreditsResponse

      const mainCast = data.cast
        .filter(actor => actor.known_for_department === 'Acting')
        .sort((a, b) => a.order - b.order)
        .slice(0, 20)

      return mainCast
    }

    return null
  } catch (error) {
    console.error('Error in getMovieMovieMainCast:', error)
    throw new Error('Error fetching movie main cast')
  }
}

export const getMovieTrailerKey = async (
  movieId: string | number,
): Promise<string | null> => {
  try {
    const url = `${API_BASE_URL}/movie/${movieId}/videos?language=${API_LANGUAGE}`

    const result = await fetch(url, COMMON_GET_OPTIONS)

    if (result.status === 200) {
      const data = await result.json() as MovieVideosResponse

      for (const video of data.results) {
        if (video.site === 'YouTube' && video.type === 'Trailer') {
          return video.key
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error in getMovieTrailerKey:', error)
    throw new Error('Error fetching movie trailer key')
  }
}

export const getMovieListGenres = async (): Promise<Genre[] | null> => {
  try {
    const url = `${API_BASE_URL}/genre/movie/list?language=${API_LANGUAGE}`

    const result = await fetch(url, COMMON_GET_OPTIONS)

    if (result.status === 200) {
      const data = await result.json() as GenresResponse
      return data.genres
    }

    return null
  } catch (error) {
    console.error('Error in getMovieListGenres:', error)
    throw new Error('Error fetching movie list genres')
  }
}

export const getGenreByName = async (
  name: string
): Promise<Genre | null> => {
  try {
    const movieListGenres = await getMovieListGenres()

    if (!movieListGenres) return null

    const genre = movieListGenres.find(genre =>
      genre.name === name
    )

    return genre ?? null
  } catch (error) {
    console.error('Error in getGenreByName:', error)
    throw new Error('Error fetching getMovieListGenres')
  }
}

export const getMoviesByGenre = async (
  genre: number,
  page = 1
): Promise<MovieListResponse | null> => {
  try {
    const url = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&page=${page}&sort_by=popularity.desc&language=${API_LANGUAGE}&with_genres=${genre}`

    const result = await fetch(url, COMMON_GET_OPTIONS)

    if (result.status === 200) {
      const movieListResponse = await result.json() as MovieListResponse
      movieListResponse.results = await setTrailerKeyInMovies(movieListResponse.results)
      return movieListResponse
    }

    return null
  } catch (error) {
    console.error('Error in getMoviesByGenre:', error)
    throw new Error('Error fetching movies by genre')
  }
}

export const getMovieTitles = async (
  title: string,
): Promise<MovieTitle[] | null> => {
  try {
    const movieListResponse = await getMoviesByTitle(title)

    if (!movieListResponse?.results.length) return null

    const uniqueMovieTitles: MovieTitle[] = []
    const uniqueNames = new Set<string>()

    for (const { id, title: name } of movieListResponse.results) {
      const lowerCaseName = name.toLowerCase()
      if (!uniqueNames.has(lowerCaseName)) {
        uniqueNames.add(lowerCaseName)
        uniqueMovieTitles.push({ id, name: lowerCaseName })
      }
    }

    return uniqueMovieTitles.slice(0, 10)
  } catch (error) {
    console.error('Error in getMovieTitles:', error)
    throw new Error('Error fetching movie titles')
  }
}

export const getMoviesByTitle = async (
  title: string,
  page = 1
): Promise<MovieListResponse | null> => {
  try {
    const url = `${API_BASE_URL}/search/movie?query=${title}&include_adult=false&language=${API_LANGUAGE}&page=${page}`

    const result = await fetch(url, COMMON_GET_OPTIONS)

    if (result.status === 200) {
      const movieListResponse = await result.json() as MovieListResponse
      movieListResponse.results = await setTrailerKeyInMovies(movieListResponse.results)
      return movieListResponse
    }

    return null
  } catch (error) {
    console.error('Error in getMovieList:', error)
    throw new Error('Error fetching movie list')
  }
}

export const setTrailerKeyInMovies = async (
  movies: Movie[]
): Promise<Movie[]> => {
  const moviesWithTrailerKey = await Promise.all(
    movies.map(async (movie) => {
      try {
        const trailerKey = await getMovieTrailerKey(movie.id)
        return {
          ...movie,
          trailerKey
        }
      } catch (trailerError) {
        return movie
      }
    })
  )

  return moviesWithTrailerKey
}
