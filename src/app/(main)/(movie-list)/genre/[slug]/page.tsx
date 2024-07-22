import { notFound } from "next/navigation"
import { removeHyphen } from "~/utils/remove-hyphen"
import { getRandomIndex } from "~/utils/get-random-index"
import { genrePageColors } from "~/data/genre-page-colors"
import { getMovieListGenreByName, getMoviesByGenre } from "~/actions/movies-actions"
import { PageGradient } from "~/components/PageGradient"
import { InfiniteMoviesByGenre } from "~/components/InfiniteMovies"
import styles from "./page.module.css"

interface MoviesByGenrePageProps {
	params: {
		slug: string
	}
}

const getGenreFromSlug = async (slug: string) => {
	const genreName = removeHyphen(slug)

	const genre = await getMovieListGenreByName(genreName)

	if (!genre) notFound()

	return genre
}

export async function generateMetadata({ params }: MoviesByGenrePageProps) {
	const { name } = await getGenreFromSlug(params.slug)

	return {
		title: `Enjoy movies of the genre ${name} on Dreflix`,
		description: `Explore movies in the ${name} genre and much more on Dreflix.`,
	}
}

export default async function MoviesByGenrePage({ params }: MoviesByGenrePageProps) {
	const { id, name } = await getGenreFromSlug(params.slug)

	const movieListResult = await getMoviesByGenre(id.toString())
	const randomIndex = getRandomIndex(genrePageColors.length)
	const randomColor = genrePageColors[randomIndex]

	return (
		<div className={styles.container}>
			<PageGradient gradientColor={randomColor} />

			<h1 className={styles.title}>{name}</h1>

			<InfiniteMoviesByGenre
				initMovies={movieListResult.results}
				totalPages={movieListResult.total_pages}
				genreId={id.toString()}
			/>
		</div>
	)
}
