import { notFound } from "next/navigation"
import { MovieListType } from "~/types"
import { getMovieListPageInfo } from "~/helpers/get-movie-list-page-info"
import { getMovieList } from "~/actions/movies-actions"
import { PageGradient } from "~/components/PageGradient"
import { InfiniteMovieList } from "~/components/InfiniteMovies"
import styles from "./page.module.css"

interface Props {
	params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
	const movieListPageInfo = getMovieListPageInfo(params.slug)

	if (!movieListPageInfo) notFound()

	return {
		title: movieListPageInfo.SEOTitle,
	}
}

export default async function MovieListPage({ params }: Props) {
	const movieListType = params.slug as MovieListType
	const movieListPageInfo = getMovieListPageInfo(movieListType)

	if (!movieListPageInfo) notFound()

	const movieListResult = await getMovieList({ movieListType })

	const { title } = movieListPageInfo
	const { results, total_pages } = movieListResult

	return (
		<div className={styles.container}>
			<PageGradient gradientColor="hsl(47 96% 40% / .1)" />

			<h1 className={styles.title}>{title}</h1>

			<InfiniteMovieList
				initMovies={results}
				totalPages={total_pages}
				movieListType={movieListType}
			/>
		</div>
	)
}
