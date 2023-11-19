import { movieListPages } from '@constants'
import { MovieListPage } from '@types'

export const getMovieListPage = (
  slug: string
): MovieListPage | undefined => {
  return movieListPages.find(movieListType => movieListType.slug === slug)
}
