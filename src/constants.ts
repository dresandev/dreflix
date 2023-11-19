import { MovieListPage } from '@types'

export const API_BASE_URL = 'https://api.themoviedb.org/3'
export const IMAGES_BASE_URL = 'https://image.tmdb.org/t/p'
export const API_LANGUAGE = 'es-CO'
export const Authorization = `Bearer ${process.env.ACCESS_TOKEN_AUTH}`

export const commonGetOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization
  }
}

export const movieListPages: MovieListPage[] = [
  {
    slug: 'now_playing',
    title: 'En cartelera hoy',
  },
  {
    slug: 'popular',
    title: 'Popular',
  },
  {
    slug: 'top_rated',
    title: 'Mejor valoradas',
  },
  {
    slug: 'upcoming',
    title: 'Próximamente',
  }
]
