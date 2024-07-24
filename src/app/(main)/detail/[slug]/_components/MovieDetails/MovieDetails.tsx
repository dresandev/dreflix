import type { Genre } from "~/interfaces/Genre"
import { Badges } from "./components/Badges"
import { Actions } from "./components/Actions"
import { Links } from "./components/Links"
import styles from "./MovieDetails.module.css"

interface MovieDetailsProps {
	movieId: string
	title: string
	overview: string
	releaseDate: string
	genres: Genre[]
	runtime: number
	trailerKey?: string
	tagline: string
	imdbId: string
	homepage: string
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({
	movieId,
	title,
	overview,
	releaseDate,
	genres,
	runtime,
	trailerKey,
	tagline,
	imdbId,
	homepage,
}) => {
	return (
		<div className={styles.detailsWrapper}>
			<div className={styles.details}>
				<h1 className={styles.title}>{title}</h1>

				{tagline && <blockquote className={styles.tagline}>{tagline}</blockquote>}

				<p className={styles.overview}>{overview || "No overview found"}</p>

				<Badges releaseDate={releaseDate} genres={genres} runtime={runtime} />
				<Links movieId={movieId} imdbId={imdbId} homepageUrl={homepage} />
				<Actions trailerKey={trailerKey} />
			</div>
		</div>
	)
}
