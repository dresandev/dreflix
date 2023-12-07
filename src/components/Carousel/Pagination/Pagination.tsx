import clsx from 'clsx'
import { useHasMounted } from '~/hooks'
import { FadeIn } from '~/components/FadeIn'
import styles from './Pagination.module.css'

interface PaginationProps {
  pages: number[][]
  activePageIndex: number
  firstPageBtnRef: React.RefObject<HTMLButtonElement>
  goTo: (pageIndex: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  pages,
  activePageIndex,
  firstPageBtnRef,
  goTo,
}) => {
  const isMounted = useHasMounted()

  return (
    <div className={styles.paginationWrapper}>
      {
        isMounted && (
          <FadeIn className={styles.pagination}>
            {
              pages.map((_, i) => (
                <button
                  key={i}
                  ref={i === 0 ? firstPageBtnRef : null}
                  aria-label={`Show slide ${i} of ${pages.length}`}
                  className={clsx(
                    styles.paginationBtn,
                    activePageIndex === i && styles.paginationBtnActive
                  )}
                  onClick={() => goTo(i)}
                >
                  <div className={styles.paginationPill}></div>
                </button>
              ))
            }
          </FadeIn>
        )
      }
    </div>
  )
}
