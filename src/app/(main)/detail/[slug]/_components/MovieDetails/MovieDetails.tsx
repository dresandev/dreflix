import { Fragment } from "react"
import Link from "next/link"
import type { Genre } from "~/interfaces/Genre"
import { simpleSlugify } from "~/utils/simple-slugify"
import { formatDuration } from "~/helpers/format-duration"
import { TrailerModal } from "~/components/TrailerModal"
import { PlayIcon } from "~/components/Svg"
import { SetFavoriteButton } from "~/components/SetFavoriteButton"
import styles from "./MovieDetails.module.css"

interface Props {
	movieId: number
	title: string
	overview: string
	releaseDate: string
	genres: Genre[]
	runtime: number
	tagline: string
	imdbId: string
	homepage: string
	trailerKey?: string
	isFavorite: boolean
}

export const MovieDetails: React.FC<Props> = ({
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
	isFavorite
}) => {
	const releaseYear = releaseDate.split("-")[0]
	const movieDuration = formatDuration(runtime)

	return (
		<div className={styles.detailsWrapper}>
			<div className={styles.details}>
				<h1 className={styles.title}>{title}</h1>
				{tagline && (
					<blockquote className={styles.tagline}>
						{tagline}
					</blockquote>
				)}

				<p className={styles.overview}>
					{overview || "No overview found"}
				</p>

				<div className={styles.badges}>
					{releaseYear && <span>{releaseYear}</span>}

					<div className={styles.genres}>
						{genres.map(({ id, name }, i) => (
							<Fragment key={id}>
								<Link
									className={styles.genre}
									href={`/genre/${simpleSlugify(name)}`}
								>
									{name}
								</Link>
								{++i !== genres.length && <span>·</span>}
							</Fragment>
						))}
					</div>

					{!!movieDuration && <span>{movieDuration}</span>}
				</div>

				<div className={styles.links}>
					<a
						className={styles.link}
						href={`https://www.themoviedb.org/movie/${movieId}/watch`}
						target="_blank"
					>
						TMDB watch
					</a>
					{imdbId && (
						<a className={styles.link} href={`https://www.imdb.com/title/${imdbId}`} target="_blank">
							IMDb
						</a>
					)}
					{homepage && (
						<a className={styles.link} href={homepage} target="_blank">
							Home page
						</a>
					)}
				</div>

				<div className={styles.actions}>
					{trailerKey && (
						<TrailerModal
							trigger={
								<button className={styles.trailerButton}>
									<div className={styles.playIcon}>
										<PlayIcon />
									</div>
									<span>
										Play Trailer
									</span>
								</button>
							}
							trailerKey={trailerKey}
						/>
					)}

					<SetFavoriteButton
						movieId={movieId}
						isFavorite={isFavorite}
					/>
				</div>
			</div>
		</div>
	)
}
