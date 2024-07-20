import Link from "next/link"
import clsx from "clsx"
import { Loading } from "~/types"
import { IMAGES_BASE_URL } from "~/constants"
import { simpleSlugify } from "~/utils/simple-slugify"
import { formatDate } from "~/helpers/format-date"
import { IconButton } from "~/components/IconButton"
import { HeartIcon, PlayIcon, PlusIcon } from "~/components/Svg"
import { NoImage } from "~/components/NoImage"
import { TrailerModal } from "~/components/TrailerModal"
import styles from "./MovieCard.module.css"

interface MovieCardProps {
	className?: string
	id: number
	posterPath: string
	title: string
	releaseDate: string
	overview: string
	trailerKey?: string
	posterLoading?: Loading
}

export const MovieCard: React.FC<MovieCardProps> = ({
	className,
	id,
	posterPath,
	title,
	releaseDate,
	overview,
	trailerKey,
	posterLoading,
}) => {
	const movieDetailsPath = `/detail/${id}-${simpleSlugify(title)}`
	return (
		<article className={clsx(styles.card, className)}>
			<Link className={styles.wrapperLink} href={movieDetailsPath} prefetch={false}>
				{title}
			</Link>

			<figure className={styles.cardPresentation}>
				{posterPath ? (
					<img
						className={styles.posterImage}
						src={`${IMAGES_BASE_URL}/w342${posterPath}`}
						alt={title}
						width={150}
						loading={posterLoading}
					/>
				) : (
					<NoImage holder="movie" />
				)}

				<figcaption className={styles.figcaption}>{title}</figcaption>
				{releaseDate && <p className={styles.year}>{formatDate(releaseDate)}</p>}
			</figure>

			<section className={styles.cardInfo}>
				{posterPath && (
					<img
						className={styles.cardInfoBgImage}
						src={`${IMAGES_BASE_URL}/w342${posterPath}`}
						alt={title}
						loading="lazy"
					/>
				)}

				<h3 className={styles.title}>{title}</h3>
				<p className={styles.overview}>{overview || "No overview found"}</p>

				<div className={styles.cardActions}>
					{trailerKey && (
						<TrailerModal
							trigger={
								<IconButton ariaLabel="Play trailer" size="small">
									<PlayIcon />
								</IconButton>
							}
							trailerKey={trailerKey}
						/>
					)}
					<IconButton ariaLabel="Add to list" size="small">
						<PlusIcon />
					</IconButton>
					<IconButton ariaLabel="Mark as favorite" size="small">
						<HeartIcon />
					</IconButton>
				</div>
			</section>
		</article>
	)
}
