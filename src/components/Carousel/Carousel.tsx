'use client'

import clsx from 'clsx'
import { useSnapCarousel } from 'react-snap-carousel'
import { useHasMounted } from '@hooks'
import { FadeIn } from '@components/FadeIn'
import { ChevronArrow } from '@components/SVG'
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
    <>
      <div className={styles.carouselWrapper}>
        <button
          aria-label='Anterior'
          className={clsx(
            styles.btn,
            activePageIndex === 0 && styles.hideBtn
          )}
          onClick={prev}
        >
          <ChevronArrow direction='LEFT' />
        </button>
        <button
          aria-label='Siguiente'
          className={clsx(
            styles.btn,
            activePageIndex === (pages.length - 1) && styles.hideBtn
          )}
          onClick={next}
        >
          <ChevronArrow direction='RIGHT' />
        </button>

        <ul
          style={{ gap: itemsGap }}
          className={styles.carousel}
          ref={scrollRef}
        >
          {
            children.map((child, i) => {
              return (
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
              )
            })
          }
        </ul>
      </div>
      {renderPagination()}
    </>
  )
}
