import { notFound } from "next/navigation"
import { MovieListType } from "~/types"
import { movieListPageColor } from "~/data/page-colors"
import { getMovieListPageInfo } from "~/helpers/get-movie-list-page-info"
import { getSessionId } from "~/helpers/session-id"
import { getMovieList } from "~/actions/movies-actions"
import { PageGradient } from "~/components/PageGradient"
import { InfiniteMovieList } from "~/components/InfiniteMovies"

interface Props {
	params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props) {
	const params = await props.params
	const movieListPageInfo = getMovieListPageInfo(params.slug)
	return {
		title: movieListPageInfo?.SEOTitle,
	}
}

export default async function MovieListPage(props: Props) {
	const params = await props.params
	const movieListType = params.slug as MovieListType
	const movieListPageInfo = getMovieListPageInfo(movieListType)

	if (!movieListPageInfo) notFound()

	const sessionId = await getSessionId()

	const movieListResult = await getMovieList({ sessionId, movieListType })

	const { title } = movieListPageInfo
	const { results, total_pages } = movieListResult

	return (
		<>
			<PageGradient gradientColor={movieListPageColor} />
			<h1>{title}</h1>
			<InfiniteMovieList
				sessionId={sessionId}
				initMovies={results}
				totalPages={total_pages}
				movieListType={movieListType}
			/>
		</>
	)
}
