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

interface GetMovieListProps {
  movieListType: MovieListType,
  page?: number
}

export const getMovieList = async ({
  movieListType,
  page = 1,
}: GetMovieListProps): Promise<MovieListResponse | null> => {
  try {
    const endpoint = `/movie/${movieListType}`
    const queryParams = [
      `page=${page}`,
      `language=${API_LANGUAGE}`,
    ]
    const url = `${API_BASE_URL}${endpoint}?${queryParams.join('&')}`

    const result = await fetch(url, {
      ...COMMON_GET_OPTIONS,
      next: { revalidate: 21600 }
    })

    if (result.status === 200) {
      const movieListResponse = await result.json() as MovieListResponse
      movieListResponse.results = await setTrailerKeyToMovies(movieListResponse.results)
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
    const endpoint = `/movie/${movieId}`
    const queryParams = [
      `language=${API_LANGUAGE}`,
    ]
    const url = `${API_BASE_URL}${endpoint}?${queryParams.join('&')}`

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
    const endpoint = `/movie/${movieId}/similar`
    const queryParams = [
      `page=${page}`,
      `language=${API_LANGUAGE}`,
    ]
    const url = `${API_BASE_URL}${endpoint}?${queryParams.join('&')}`

    const result = await fetch(url, COMMON_GET_OPTIONS)

    if (result.status === 200) {
      const movieListResponse = await result.json() as MovieListResponse
      movieListResponse.results = await setTrailerKeyToMovies(movieListResponse.results)
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
    const endpoint = `/movie/${movieId}/credits`
    const queryParams = [
      `language=${API_LANGUAGE}`,
    ]
    const url = `${API_BASE_URL}${endpoint}?${queryParams.join('&')}`

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
    const endpoint = `/movie/${movieId}/videos`
    const queryParams = [
      `language=${API_LANGUAGE}`,
    ]
    const url = `${API_BASE_URL}${endpoint}?${queryParams.join('&')}`

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
    const endpoint = '/genre/movie/list'
    const queryParams = [
      `language=${API_LANGUAGE}`,
    ]
    const url = `${API_BASE_URL}${endpoint}?${queryParams.join('&')}`

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
      genre.name.toLowerCase() === name
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
    const endpoint = '/discover/movie'
    const queryParams = [
      `page=${page}`,
      'include_adult=false',
      'include_video=false',
      'sort_by=popularity.desc',
      `language=${API_LANGUAGE}`,
      `with_genres=${genre}`,
    ]
    const url = `${API_BASE_URL}${endpoint}?${queryParams.join('&')}`

    const result = await fetch(url, COMMON_GET_OPTIONS)

    if (result.status === 200) {
      const movieListResponse = (await result.json()) as MovieListResponse
      movieListResponse.results = await setTrailerKeyToMovies(
        movieListResponse.results
      )
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
    const movieListResponse = await getMoviesByTitle({
      title,
      fetchOptions: { cache: 'no-store' }
    })

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

interface GetMoviesByTitleProps {
  title: string
  page?: number
  fetchOptions?: RequestInit
}

export const getMoviesByTitle = async ({
  title,
  page = 1,
  fetchOptions,
}: GetMoviesByTitleProps): Promise<MovieListResponse | null> => {
  try {
    const endpoint = '/search/movie'
    const queryParams = [
      `page=${page}`,
      `query=${title}`,
      'include_adult=false',
      `language=${API_LANGUAGE}`,
    ]
    const url = `${API_BASE_URL}${endpoint}?${queryParams.join('&')}`

    const result = await fetch(url, {
      ...COMMON_GET_OPTIONS,
      ...fetchOptions
    })

    if (result.status === 200) {
      const movieListResponse = await result.json() as MovieListResponse
      movieListResponse.results = await setTrailerKeyToMovies(movieListResponse.results)
      return movieListResponse
    }

    return null
  } catch (error) {
    console.error('Error in getMovieList:', error)
    throw new Error('Error fetching movie list')
  }
}

export const setTrailerKeyToMovies = async (
  movies: Movie[]
): Promise<Movie[]> => {
  const moviesWithTrailerKey = await Promise.all(
    movies.map(async movie => {
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
