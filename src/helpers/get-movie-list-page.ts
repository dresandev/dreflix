import { movieListPagesInfo } from '~/data/movie-list-pages-info'
import { PageInfo } from '~/types'

export const getMovieListPageInfo = (
  slug: string
): PageInfo | undefined => {
  const movieListPageInfo = movieListPagesInfo.find(
    pageInfo => pageInfo.slug === slug
  )
  return movieListPageInfo
}
