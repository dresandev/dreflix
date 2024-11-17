import { notFound, redirect } from "next/navigation"
import { getMoviesByTitle } from "~/actions/movies-actions"
import { getSessionId } from "~/helpers/session-id"
import { InfiniteMovieResults } from "~/components/InfiniteMovies"
import { PageGradient } from "~/components/PageGradient"
import styles from "./page.module.css"

interface Props {
	searchParams: Promise<{
		[key: string]: string | undefined
	}>
}

export const metadata = {
	title: "Dreflix: Search",
}

export default async function SearchPage(props: Props) {
	const searchParams = await props.searchParams
	if (!searchParams.phrase) redirect("/")

	const { phrase } = searchParams

	const sessionId = await getSessionId()

	const movieListResult = await getMoviesByTitle({ sessionId, title: phrase })

	if (!movieListResult) notFound()

	const { results, total_pages } = movieListResult

	if (!results.length) {
		return (
			<p className={styles.noMatchesMessage}>
				{`We didn't find any matches for "${phrase}".`}
			</p>
		)
	}

	return (
		<>
			<PageGradient gradientColor="hsl(208 96% 52% / .1)" />
			<h2 className={styles.searchQuery}>Results for {`"${phrase}"`}.</h2>
			<InfiniteMovieResults
				sessionId={sessionId}
				initMovies={results}
				totalPages={total_pages}
				keyword={phrase}
			/>
		</>
	)
}
