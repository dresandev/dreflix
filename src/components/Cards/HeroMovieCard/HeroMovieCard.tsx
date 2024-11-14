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
			<a
				className={styles.wrapperLink}
				href={movieDetailsPath}
				aria-label={title}
				tabIndex={-1}
			>
				{title}
			</a>

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
							<a
								className={styles.logoLinkWrapper}
								href={movieDetailsPath}
								tabIndex={-1}
								aria-hidden
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
							</a>
						</h2>

						<Link className={styles.moreInfoLink} href={movieDetailsPath} prefetch={false}>
							More details
						</Link>
					</div>
				</ObservedTransition>
			</section>
		</article>
	)
}
