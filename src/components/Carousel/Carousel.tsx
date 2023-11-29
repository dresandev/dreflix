'use client'

import clsx from 'clsx'
import { useSnapCarousel } from 'react-snap-carousel'
import { ensureArray } from '~/utils'
import { useHasMounted } from '~/hooks'
import { FadeIn } from '~/components/FadeIn'
import { ChevronArrow } from '~/components/SVG'
import styles from './Carousel.module.css'

interface CarouselProps {
  children: React.ReactNode | React.ReactNode[]
  itemsGap?: string
  itemScrollSnapStopAlways?: boolean
  showPagination?: boolean
  btnHoverVariant?: 'shadowHover' | 'scaleHover'
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  itemsGap = '2rem',
  itemScrollSnapStopAlways = false,
  showPagination = false,
  btnHoverVariant = 'shadowHover'
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

  const childrenArray = ensureArray(children)

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
            styles[btnHoverVariant],
            activePageIndex === 0 && styles.hideBtn
          )}
          onClick={prev}
        >
          <ChevronArrow
            className={styles.btnArrowIcon}
            direction='LEFT'
          />
        </button>
        <button
          aria-label='Siguiente'
          className={clsx(
            styles.btn,
            styles[btnHoverVariant],
            activePageIndex === (pages.length - 1) && styles.hideBtn
          )}
          onClick={next}
        >
          <ChevronArrow
            className={styles.btnArrowIcon}
            direction='RIGHT'
          />
        </button>

        <ul
          style={{ gap: itemsGap }}
          className={styles.carousel}
          ref={scrollRef}
          tabIndex={-1}
        >
          {
            childrenArray.map((child, i) => {
              return (
                <li
                  key={i}
                  className={clsx(
                    styles.item,
                    snapPointIndexes.has(i) && styles.itemSnapPoint,
                    itemScrollSnapStopAlways && styles.itemScrollSnapStopAlways
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
