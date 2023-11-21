import { movieListPages } from '@data/movie-list-pages'
import { MovieListPage } from '@types'

export const getMovieListPage = (
  slug: string
): MovieListPage | undefined => {
  const movieListPage = movieListPages.find(movieListType => movieListType.slug === slug)
  return movieListPage
}
