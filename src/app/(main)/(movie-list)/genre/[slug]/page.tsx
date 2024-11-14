import { notFound } from "next/navigation"
import { removeHyphen } from "~/utils/remove-hyphen"
import { getRandomNumber } from "~/utils/get-random-number"
import { getSessionId } from "~/helpers/server-session-id"
import { genrePageColors } from "~/data/page-colors"
import { getMovieListGenreByName, getMoviesByGenre } from "~/actions/movies-actions"
import { PageGradient } from "~/components/PageGradient"
import { InfiniteMoviesByGenre } from "~/components/InfiniteMovies"
import styles from "./page.module.css"

interface Props {
	params: { slug: string }
}

const getGenreFromSlug = async (slug: string) => {
	const slugGenre = removeHyphen(slug)
	const genre = await getMovieListGenreByName(slugGenre)
	return genre
}

export async function generateMetadata({ params }: Props) {
	const genre = await getGenreFromSlug(params.slug)

	return {
		title: `Enjoy movies of the genre ${genre?.name} on Dreflix`,
		description: `Explore movies in the ${genre?.name} genre and much more on Dreflix.`,
	}
}

export default async function MoviesByGenrePage({ params }: Props) {
	const genre = await getGenreFromSlug(params.slug)

	if (!genre) notFound()

	const { id, name } = genre

	const sessionId = getSessionId()
	const genreId = id.toString()

	const movieListResult = await getMoviesByGenre({ sessionId, genreId })
	const randomIndex = getRandomNumber(0, genrePageColors.length - 1)
	const randomColor = genrePageColors[randomIndex]

	const { results, total_pages } = movieListResult

	return (
		<>
			<PageGradient gradientColor={randomColor} />
			<h1 className={styles.title}>{name}</h1>
			<InfiniteMoviesByGenre
				sessionId={sessionId}
				initMovies={results}
				totalPages={total_pages}
				genreId={genreId}
			/>
		</>
	)
}
