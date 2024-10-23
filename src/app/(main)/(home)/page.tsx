import { MovieListType } from "~/types"
import { isFulfilled } from "~/utils/is-fulfilled"
import { getMovieList } from "~/actions/movies-actions"
import { HeroCarousel } from "~/components/HeroCarousel"
import { CarouselSection } from "~/components/CarouselSection"
import { MovieCard } from "~/components/MovieCard"
import styles from "./page.module.css"

const movieList: { [key in MovieListType]: string } = {
	popular: "Popular",
	now_playing: "Now Playing",
	upcoming: "Upcoming",
	top_rated: "Top Rated",
}

const moviePromises = Object.keys(movieList).map((movieListType) =>
	getMovieList({
		movieListType: movieListType as MovieListType,
	})
)

const movieListTitles = Object.values(movieList)

export default async function HomePage() {
	const moviesResult = await Promise.allSettled(moviePromises)

	return (
		<>
			<h1 className={styles.title}>Movies</h1>
			<HeroCarousel />

			{moviesResult.map((movies, i) => {
				if (isFulfilled(movies)) {
					const { value: { results } } = movies

					return (
						<CarouselSection key={i} title={movieListTitles[i]}>
							{results.map((movie, i) => {
								const { id, title, poster_path, release_date, overview, trailerKey } = movie

								return (
									<MovieCard
										key={id}
										id={id}
										className="carouselMovieCardWidth"
										posterPath={poster_path}
										title={title}
										releaseDate={release_date}
										overview={overview}
										trailerKey={trailerKey}
										posterLoading={i < 6 ? "eager" : "lazy"}
									/>
								)
							})}
						</CarouselSection>
					)
				}
			})}
		</>
	)
}
