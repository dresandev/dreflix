import { notFound } from "next/navigation"
import { removeHyphen } from "~/utils/remove-hyphen"
import { getRandomNumber } from "~/utils/get-random-number"
import { genrePageColors } from "~/data/genre-page-colors"
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

	if (!genre) notFound()

	return genre
}

export async function generateMetadata({ params }: Props) {
	const { name } = await getGenreFromSlug(params.slug)

	return {
		title: `Enjoy movies of the genre ${name} on Dreflix`,
		description: `Explore movies in the ${name} genre and much more on Dreflix.`,
	}
}

export default async function MoviesByGenrePage({ params }: Props) {
	const { id, name } = await getGenreFromSlug(params.slug)

	const movieListResult = await getMoviesByGenre(id.toString())
	const randomIndex = getRandomNumber(0, genrePageColors.length - 1)
	const randomColor = genrePageColors[randomIndex]

	const { results, total_pages } = movieListResult

	return (
		<div className={styles.container}>
			<PageGradient gradientColor={randomColor} />

			<h1 className={styles.title}>{name}</h1>

			<InfiniteMoviesByGenre
				initMovies={results}
				totalPages={total_pages}
				genreId={id.toString()}
			/>
		</div>
	)
}
