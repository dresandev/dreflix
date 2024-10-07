import Link from "next/link"
import clsx from "clsx"
import type { Loading } from "~/types"
import { IMAGES_BASE_URL } from "~/constants"
import { simpleSlugify } from "~/utils/simple-slugify"
import { formatDate } from "~/helpers/format-date"
import { IconButton } from "~/components/IconButton"
import { HeartIcon, PlayIcon, PlusIcon } from "~/components/Svg"
import { NoImage } from "~/components/NoImage"
import { TrailerModal } from "~/components/TrailerModal"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "~/components/Ui/Tooltip"
import styles from "./MovieCard.module.css"

interface Props {
	className?: string
	id: number
	posterPath: string
	title: string
	releaseDate: string
	overview: string
	trailerKey?: string
	posterLoading?: Loading
}

export const MovieCard: React.FC<Props> = ({
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

								<TooltipContent side="bottom" sideOffset={10}>
									<label>{"Play trailer"}</label>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}

					<TooltipProvider>
						<Tooltip delayDuration={100} disableHoverableContent>
							<TooltipTrigger asChild>
								<IconButton ariaLabel="Add to list" size="small">
									<PlusIcon />
								</IconButton>
							</TooltipTrigger>

							<TooltipContent side="bottom" sideOffset={10}>
								<label>{"Add to list"}</label>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<TooltipProvider>
						<Tooltip delayDuration={100} disableHoverableContent>
							<TooltipTrigger asChild>
								<IconButton ariaLabel="Mark as favorite" size="small">
									<HeartIcon />
								</IconButton>
							</TooltipTrigger>

							<TooltipContent side="bottom" sideOffset={10}>
								<label>{"Mark as favorite"}</label>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</section>
		</article>
	)
}
