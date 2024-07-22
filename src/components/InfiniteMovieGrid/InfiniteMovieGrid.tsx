import type { MutableRefObject } from "react"
import type { Movie } from "~/interfaces"
import { MovieCard } from "~/components/MovieCard"
import { RingLoader } from "~/components/Loaders"
import styles from "./InfiniteMovieGrid.module.css"

interface InfiniteMovieGridProps {
	movies: Movie[]
	observerTargetRef: MutableRefObject<HTMLDivElement | null>
	isLoading: boolean
	hasError: boolean
}

export const InfiniteMovieGrid: React.FC<InfiniteMovieGridProps> = ({
	movies,
	observerTargetRef,
	isLoading,
	hasError,
}) => {
	return (
		<>
			<div className={styles.container}>
				{movies.map(({ id, poster_path, title, release_date, overview, trailerKey }, i) => (
					<MovieCard
						key={i}
						id={id}
						posterPath={poster_path}
						title={title}
						releaseDate={release_date}
						overview={overview}
						trailerKey={trailerKey}
						posterLoading={i < 12 ? "eager" : "lazy"}
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
