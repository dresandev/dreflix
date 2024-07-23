import type { Movie } from "~/interfaces"
import { CarouselSection } from "~/components/CarouselSection"
import { MovieCard } from "~/components/MovieCard"
import { NoItemsFound } from "~/components/NoItemsFound"

interface SimilarMoviesProps {
	similarMovies: Movie[]
}

export const SimilarMovies: React.FC<SimilarMoviesProps> = ({ similarMovies }) => {
	const title = "Similar movies"
	const hasSimilarMovies = similarMovies.length

	if (!hasSimilarMovies) return <NoItemsFound title={title} message="No similar movies found" />

	return (
		<>
			<CarouselSection title={title}>
				{similarMovies.map((similarMovie) => {
					const { id, poster_path, title, release_date, overview, trailerKey } = similarMovie

					return (
						<MovieCard
							key={id}
							className="carouselMovieCardWidth"
							id={id}
							posterPath={poster_path}
							title={title}
							releaseDate={release_date}
							overview={overview}
							trailerKey={trailerKey}
						/>
					)
				})}
			</CarouselSection>
		</>
	)
}
