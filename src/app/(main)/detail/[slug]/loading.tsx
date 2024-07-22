import { ScrollToTop } from "~/components/ScrollToTop"
import { Skeleton } from "~/components/Skeleton"
import styles from "./loading.module.css"

export default function Loading() {
	return (
		<>
			<ScrollToTop />
			<div className={styles.detailsWrapper}>
				<div className={styles.details}>
					<Skeleton className={styles.title} />
					<Skeleton className={styles.overview} />
					<Skeleton className={styles.badges} />
					<div className={styles.actions}>
						<Skeleton className={styles.action} />
						<Skeleton className={styles.action} />
						<Skeleton className={styles.action} />
					</div>
				</div>
			</div>
			<Skeleton className={styles.subtitle} />
			<div className={styles.actors}>
				<Skeleton className={styles.actor} />
				<Skeleton className={styles.actor} />
				<Skeleton className={styles.actor} />
				<Skeleton className={styles.actor} />
				<Skeleton className={styles.actor} />
				<Skeleton className={styles.actor} />
				<Skeleton className={styles.actor} />
				<Skeleton className={styles.actor} />
				<Skeleton className={styles.actor} />
				<Skeleton className={styles.actor} />
				<Skeleton className={styles.actor} />
			</div>
		</>
	)
}
