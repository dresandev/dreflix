import clsx from "clsx"
import { useHasMounted } from "~/hooks/use-has-mounted"
import { FadeIn } from "~/components/FadeIn"
import styles from "./Pagination.module.css"

interface Props {
	pages: number[][]
	activePageIndex: number
	firstPageBtnRef: React.RefObject<HTMLButtonElement | null>
	goTo: (pageIndex: number) => void
}

export const Pagination: React.FC<Props> = ({
	pages,
	activePageIndex,
	firstPageBtnRef,
	goTo,
}) => {
	const isMounted = useHasMounted()

	return (
		<div className={styles.paginationWrapper}>
			{isMounted && (
				<FadeIn className={styles.pagination}>
					{pages.map((_, i) => (
						<button
							key={i}
							ref={i === 0 ? firstPageBtnRef : null}
							aria-label={`Show slide ${i + 1} of ${pages.length}`}
							className={clsx(
								styles.paginationBtn,
								activePageIndex === i && styles.paginationBtnActive
							)}
							onClick={() => goTo(i)}
						></button>
					))}
				</FadeIn>
			)}
		</div>
	)
}
