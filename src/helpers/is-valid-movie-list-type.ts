import { MovieListType } from '@types'

export const isValidMovieListType = (type: string): type is MovieListType => {
  const validTypes = [
    'now_playing',
    'popular',
    'top_rated',
    'upcoming',
  ]
  return validTypes.includes(type)
}
