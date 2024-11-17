import Link from "next/link"
import { HeroMovie } from "~/types"
import { simpleSlugify } from "~/utils/simple-slugify"
import { ObservedTransition } from "~/components/ObservedTransition"
import styles from "./HeroMovieCard.module.css"

export const HeroMovieCard: React.FC<HeroMovie> = ({
	movieId,
	title,
	image,
	logoImage,
	imageLoading: loading,
	imageFetchPriority: fetchPriority,
}) => {
	const movieDetailsPath = `/detail/${movieId}-${simpleSlugify(title)}`

	return (
		<article className={styles.heroCard}>
			<Link
				className={styles.wrapperLink}
				href={movieDetailsPath}
				aria-label={title}
				prefetch={false}
				tabIndex={-1}
			>
				{title}
			</Link>

			<img
				className={styles.heroImage}
				srcSet={`
          ${image.small} 800w,
          ${image.medium} 1440w,
          ${image.original} 2880w
        `}
				sizes="
          (max-width: 768px) 340px,
          (max-width: 1600px) 1400px,
          2880px
        "
				src={image.original}
				alt=""
				loading={loading}
				fetchPriority={fetchPriority}
				width={340}
			/>

			<section className={styles.heroCardInfo}>
				<ObservedTransition className={styles.fadeTransition} isVisibleClassName={styles.fadeIn}>
					<div className={styles.infoWrapper}>
						<h2>
							<Link
								className={styles.logoLinkWrapper}
								href={movieDetailsPath}
								aria-hidden
								prefetch={false}
								tabIndex={-1}
							>
								<img
									className={styles.logoImage}
									srcSet={`
                    ${logoImage.small} 350w,
                    ${logoImage.original} 700w
                  `}
									sizes="(max-width: 880px) 200px, 600px"
									src={logoImage.original}
									alt={title}
									width={150}
									height={100}
									loading={loading}
									fetchPriority={fetchPriority}
								/>
							</Link>
						</h2>

						<Link
							className={styles.moreInfoLink}
							href={movieDetailsPath}
							prefetch={false}
						>
							More details
						</Link>
					</div>
				</ObservedTransition>
			</section>
		</article>
	)
}
