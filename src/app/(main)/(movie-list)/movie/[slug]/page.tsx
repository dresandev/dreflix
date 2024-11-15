import { notFound } from "next/navigation"
import { MovieListType } from "~/types"
import { movieListPageColor } from "~/data/page-colors"
import { getMovieListPageInfo } from "~/helpers/get-movie-list-page-info"
import { getSessionId } from "~/helpers/server-session-id"
import { getMovieList } from "~/actions/movies-actions"
import { Title } from "~/components/Title"
import { PageGradient } from "~/components/PageGradient"
import { InfiniteMovieList } from "~/components/InfiniteMovies"

interface Props {
	params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
	const movieListPageInfo = getMovieListPageInfo(params.slug)
	return {
		title: movieListPageInfo?.SEOTitle,
	}
}

export default async function MovieListPage({ params }: Props) {
	const movieListType = params.slug as MovieListType
	const movieListPageInfo = getMovieListPageInfo(movieListType)

	if (!movieListPageInfo) notFound()

	const sessionId = getSessionId()

	const movieListResult = await getMovieList({ sessionId, movieListType })

	const { title } = movieListPageInfo
	const { results, total_pages } = movieListResult

	return (
		<>
			<PageGradient gradientColor={movieListPageColor} />
			<Title>{title}</Title>
			<InfiniteMovieList
				sessionId={sessionId}
				initMovies={results}
				totalPages={total_pages}
				movieListType={movieListType}
			/>
		</>
	)
}
