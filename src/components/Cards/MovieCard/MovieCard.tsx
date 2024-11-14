import clsx from "clsx"
import type { Loading } from "~/types"
import { IMAGES_BASE_URL } from "~/constants"
import { simpleSlugify } from "~/utils/simple-slugify"
import { formatDate } from "~/helpers/format-date"
import { IconButton } from "~/components/IconButton"
import { PlayIcon } from "~/components/Svg"
import { NoImage } from "~/components/Placeholders/NoImage"
import { TrailerModal } from "~/components/TrailerModal"
import { SetFavoriteButton } from "~/components/SetFavoriteButton"
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent
} from "~/components/Ui/Tooltip"
import styles from "./MovieCard.module.css"

interface Props {
	id: number
	posterPath: string
	title: string
	releaseDate: string
	overview: string
	trailerKey?: string
	posterLoading?: Loading
	isFavorite: boolean
	inCarousel?: boolean
}

export const MovieCard: React.FC<Props> = ({
	id,
	posterPath,
	title,
	releaseDate,
	overview,
	trailerKey,
	posterLoading,
	isFavorite,
	inCarousel = false
}) => {
	const movieDetailsPath = `/detail/${id}-${simpleSlugify(title)}`

	return (
		<article className={clsx(
			styles.card,
			{ [styles.inCarousel]: inCarousel }
		)}>
			<a
				className={styles.linkWrapper}
				href={movieDetailsPath}
			>
				{title}
			</a>

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
				{releaseDate && (
					<p className={styles.year}>
						{formatDate(releaseDate)}
					</p>
				)}
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
						<TooltipProvider>
							<Tooltip delayDuration={100} disableHoverableContent>
								<TrailerModal
									trigger={
										<TooltipTrigger asChild>
											<IconButton ariaLabel="Play trailer" size="small">
												<PlayIcon />
											</IconButton>
										</TooltipTrigger>
									}
									trailerKey={trailerKey}
								/>

								<TooltipContent>
									<label>Play trailer</label>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					<SetFavoriteButton
						movieId={id}
						size="small"
						isFavorite={isFavorite}
					/>
				</div>
			</section>
		</article>
	)
}
