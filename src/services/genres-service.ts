import { API_BASE_URL, API_LANGUAGE, commonGetOptions } from '@constants'
import { GenresResponse } from '@models'

export const getMovieListGenres = async (
): Promise<GenresResponse | null> => {
  try {
    const url = `${API_BASE_URL}/genre/movie/list?language=${API_LANGUAGE}`

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
