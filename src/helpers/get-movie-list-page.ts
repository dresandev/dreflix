import type { PageInfo } from "~/types"
import { movieListPagesInfo } from "~/data/movie-list-pages-info"

export const getMovieListPageInfo = (slug: string): PageInfo | undefined => {
	const movieListPageInfo = movieListPagesInfo.find((pageInfo) => pageInfo.slug === slug)
	return movieListPageInfo
}
