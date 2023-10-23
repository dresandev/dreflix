'use client'

import clsx from 'clsx'
import { useSnapCarousel } from 'react-snap-carousel'
import { useHasMounted } from '@hooks/use-has-mounted'
import { FadeIn } from '@components/FadeIn'
import styles from './Carousel.module.css'

interface CarouselProps {
  children: React.ReactNode[]
  itemsGap?: string
  itemScrollSnapStopAlway?: boolean
  showPagination?: boolean
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  itemsGap = '2rem',
  itemScrollSnapStopAlway = false,
  showPagination = false
}) => {
  const isMounted = useHasMounted()
  const {
    scrollRef,
    pages,
    activePageIndex,
    prev,
    next,
    goTo,
    snapPointIndexes
  } = useSnapCarousel()

  const renderPagination = () => {
    if (!showPagination) return

    return (
      <div className={styles.paginationWrapper}>
        {
          isMounted && (
            <FadeIn className={styles.pagination}>
              {
                pages.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Mostrar slide ${i} de ${pages.length}`}
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

  return (
    <div>
      <ul
        style={{ gap: itemsGap }}
        className={styles.carousel}
        ref={scrollRef}
      >
        {
          children.map((child, i) => (
            <li
              key={i}
              className={clsx(
                styles.item,
                snapPointIndexes.has(i) && styles.itemSnapPoint,
                itemScrollSnapStopAlway && styles.itemScrollSnapStopAlway
              )}
            >
              {child}
            </li>
          ))
        }
      </ul>
      {renderPagination()}
    </div>
  )
}
