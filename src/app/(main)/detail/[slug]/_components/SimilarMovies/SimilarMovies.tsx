import type { Movie } from "~/interfaces/Movie"
import { CarouselSection } from "~/components/CarouselSection"
import { MovieCard } from "~/components/Cards/MovieCard"
import { NoItemsFound } from "~/components/Placeholders/NoItemsFound"

interface Props {
	movies: Movie[]
}

export const SimilarMovies: React.FC<Props> = ({ movies }) => {
	const title = "Similar movies"
	const hasSimilarMovies = movies.length

	if (!hasSimilarMovies) return (
		<NoItemsFound
			title={title}
			message="No similar movies found"
		/>
	)

	return (
		<>
			<CarouselSection title={title}>
				{movies.map((similarMovie) => {
					const {
						id,
						poster_path,
						title,
						release_date,
						overview,
						trailerKey,
						isFavorite
					} = similarMovie

					return (
						<MovieCard
							key={id}
							inCarousel
							id={id}
							posterPath={poster_path}
							title={title}
							releaseDate={release_date}
							overview={overview}
							trailerKey={trailerKey}
							isFavorite={isFavorite}
						/>
					)
				})}
			</CarouselSection>
		</>
	)
}
