import { API_BASE_URL, API_LANGUAGE, commonGetOptions } from '@constants'
import {
  MainMovieListResponse,
  MovieListResponse,
  MovieDetails,
  MovieVideosResponse,
  MovieCreditsResponse,
  Cast,
  GenresResponse,
} from '@models'
import { MovieListType } from '@types'

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

export const getMovieMovieMainCast = async (
  movieId: string | number,
): Promise<Cast[] | null> => {
  try {
    const url = `${API_BASE_URL}/movie/${movieId}/credits?language=${API_LANGUAGE}`

    const result = await fetch(url, commonGetOptions)

    if (result.status === 200) {
      const data = await result.json() as MovieCreditsResponse

      const mainCast = data.cast
        .filter(actor => actor.known_for_department === 'Acting')
        .sort((a, b) => a.order - b.order)

      mainCast.length = 20

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

    const result = await fetch(url, commonGetOptions)

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

export const getMovieListGenres = async (
  language?: string
): Promise<GenresResponse | null> => {
  try {
    const url = `${API_BASE_URL}/genre/movie/list?language=${language || API_LANGUAGE}`

    const result = await fetch(url, commonGetOptions)

    if (result.status === 200) {
      const data = await result.json()
      return data
    }

    return null
  } catch (error) {
    console.error('Error in getMovieListGenres:', error)
    throw new Error('Error fetching movie list genres')
  }
}
