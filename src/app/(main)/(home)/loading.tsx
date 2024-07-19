import { ScrollToTop } from "~/components/ScrollToTop"
import { Skeleton } from "~/components/Skeleton"
import styles from "./loading.module.css"

export default function Loading() {
	return (
		<>
			<ScrollToTop />
			<div className={styles.container}>
				<Skeleton className={styles.title} />
				<Skeleton className={styles.hero} />
				<Skeleton className={styles.title} />
				<div className={styles.carousel}>
					<Skeleton className={`carouselMovieCardWidth ${styles.movieCard}`} />
					<Skeleton className={`carouselMovieCardWidth ${styles.movieCard}`} />
					<Skeleton className={`carouselMovieCardWidth ${styles.movieCard}`} />
					<Skeleton className={`carouselMovieCardWidth ${styles.movieCard}`} />
					<Skeleton className={`carouselMovieCardWidth ${styles.movieCard}`} />
					<Skeleton className={`carouselMovieCardWidth ${styles.movieCard}`} />
					<Skeleton className={`carouselMovieCardWidth ${styles.movieCard}`} />
					<Skeleton className={`carouselMovieCardWidth ${styles.movieCard}`} />
				</div>
			</div>
		</>
	)
}
