import type { MovieListType } from "~/types"
import { isFulfilled } from "~/utils/is-fulfilled"
import { getMovieList } from "~/actions/movies-actions"
import { getSessionId } from "~/helpers/server-session-id"
import { HeroCarousel } from "~/components/HeroCarousel"
import { CarouselSection } from "~/components/CarouselSection"
import { MovieCard } from "~/components/Cards/MovieCard"
import styles from "./page.module.css"

const movieListTitles = [
	"Popular",
	"Now Playing",
	"Upcoming",
	"Top Rated",
]

export default async function HomePage() {
	const sessionId = getSessionId()

	const movieListPromises = movieListTitles.map((title) => {
		const movieListType = title.replace(" ", "_").toLowerCase() as MovieListType
		return getMovieList({ sessionId, movieListType })
	})

	const moviesResult = await Promise.allSettled(movieListPromises)

	return (
		<>
			<h1 className={styles.title}>Movies</h1>
			<HeroCarousel />

			{moviesResult.map((movies, i) => {
				if (!isFulfilled(movies)) return /* Error fetching movies component? */

				const { value: { results } } = movies

				return (
					<CarouselSection key={i} title={movieListTitles[i]}>
						{results.map(({
							id,
							title,
							poster_path,
							release_date,
							overview,
							trailerKey,
							isFavorite
						}, i) => (
							<MovieCard
								key={id}
								id={id}
								inCarousel
								posterPath={poster_path}
								title={title}
								releaseDate={release_date}
								overview={overview}
								trailerKey={trailerKey}
								posterLoading={i < 6 ? "eager" : "lazy"}
								isFavorite={isFavorite}
							/>
						))}
					</CarouselSection>
				)
			})}
		</>
	)
}
