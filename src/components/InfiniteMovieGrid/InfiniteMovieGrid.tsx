import type { Movie } from "~/interfaces/Movie"
import { MovieCard } from "~/components/Cards/MovieCard"
import { RingLoader } from "~/components/Loaders/RingLoader"
import styles from "./InfiniteMovieGrid.module.css"

interface Props {
	movies: Movie[]
	observerTargetRef: React.RefObject<HTMLDivElement | null>
	isLoading: boolean
	hasError: boolean
	idAsKey?: boolean
}

export const InfiniteMovieGrid: React.FC<Props> = ({
	movies,
	observerTargetRef,
	isLoading,
	hasError,
	idAsKey = false
}) => {
	return (
		<>
			<div className={styles.container}>
				{movies.map(({
					id,
					poster_path,
					title,
					release_date,
					overview,
					trailerKey,
					isFavorite
				}, i) => (
					<MovieCard
						key={idAsKey ? id : i}
						id={id}
						posterPath={poster_path}
						title={title}
						releaseDate={release_date}
						overview={overview}
						trailerKey={trailerKey}
						posterLoading={i < 12 ? "eager" : "lazy"}
						isFavorite={isFavorite}
					/>
				))}
			</div>
			<div ref={observerTargetRef} className={styles.statusContainer}>
				{isLoading && <RingLoader />}
				{hasError && <p>Error loading movies, please try again later</p>}
			</div>
		</>
	)
}
