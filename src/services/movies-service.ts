import { MovieListResponseWithDates } from '@models/MovieListResponse'

type MovieListType = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'

const base_url = process.env.API_BASE_URL
const Authorization = `Bearer ${process.env.ACCESS_TOKEN_AUTH}`

export const getMovieList = async (
  movieListType: MovieListType,
  page = 1
): Promise<MovieListResponseWithDates> => {
  const url = `${base_url}/movie/${movieListType}?language=es-CO&${page}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization
    }
  }

  const result = await fetch(url, options)

  if (result.status === 200) {
    const data = await result.json()
    return data
  }

  return {
    dates: {
      minimum: '',
      maximum: ''
    },
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  }
}
