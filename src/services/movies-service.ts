import { MovieListResponse } from '@models/MovieListResponse'

const base_url = process.env.BASE_URL

export const getTrendingMovies = async (): Promise<MovieListResponse> => {
  const url = `${base_url}/trending/movie/day?language=es-CO`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`
    }
  }

  const result = await fetch(url, options)

  if (result.status === 200) {
    const data = await result.json()
    return data
  }

  return {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  }
}
