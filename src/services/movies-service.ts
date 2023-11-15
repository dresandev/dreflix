import { API_BASE_URL, API_LANGUAGE, Authorization } from '@constants'
import { MainMovieListResponse, MovieListResponse, MovieDetails } from '@models'
import { MovieCreditsResponse } from '@models/MovieCreditsResponse'

type MovieListType = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'

const commonGetOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization
  }
}

const movieListTitle: { [key in MovieListType]: string } = {
  now_playing: 'En cartelera hoy',
  popular: 'Popular',
  top_rated: 'Mejor valoradas',
  upcoming: 'Próximamente'
}

export const getMovieList = async (
  movieListType: MovieListType,
  page = 1
): Promise<MainMovieListResponse | null> => {
  try {
    const url = `${API_BASE_URL}/movie/${movieListType}?language=${API_LANGUAGE}&${page}`

    const result = await fetch(url, commonGetOptions)

    if (result.status === 200) {
      const data = await result.json()
      return {
        listTitle: movieListTitle[movieListType],
        ...data
      }
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

    const result = await fetch(url, commonGetOptions)

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

    const result = await fetch(url, commonGetOptions)

    if (result.status === 200) {
      const data = await result.json()
      return data
    }

    return null
  } catch (error) {
    console.error('Error in getMovieRecomendations:', error)
    throw new Error('Error fetching movie recomendations')
  }
}

export const getMovieCredits = async (
  movieId: string | number,
): Promise<MovieCreditsResponse | null> => {
  try {
    const url = `${API_BASE_URL}/movie/${movieId}/credits?language=${API_LANGUAGE}`

    const result = await fetch(url, commonGetOptions)

    if (result.status === 200) {
      const data = await result.json()
      return data
    }

    return null
  } catch (error) {
    console.error('Error in getMovieCredits:', error)
    throw new Error('Error fetching movie credits')
  }
}
