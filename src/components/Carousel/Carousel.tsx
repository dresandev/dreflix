'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { useSnapCarousel } from 'react-snap-carousel'
import { usePageVisibility } from '~/hooks/use-page-visibility'
import { ensureArray } from '~/utils'
import { ChevronArrow } from '~/components/SVG'
import { Pagination } from './Pagination'
import styles from './Carousel.module.css'

interface CarouselProps {
  children: React.ReactNode | React.ReactNode[]
  itemsGap?: string
  autoPlay?: boolean
  itemScrollSnapStopAlways?: boolean
  showPagination?: boolean
  btnHoverVariant?: 'shadowHover' | 'scaleHover'
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  itemsGap = '2rem',
  autoPlay = false,
  itemScrollSnapStopAlways = false,
  showPagination = false,
  btnHoverVariant = 'shadowHover'
}) => {
  const firstPageBtnRef = useRef<HTMLButtonElement>(null)
  const forwardBtnRef = useRef<HTMLButtonElement>(null)
  const allSlidesViewed = useRef(false)
  const isPageVisible = usePageVisibility()
  const {
    scrollRef,
    pages,
    activePageIndex,
    prev,
    next,
    goTo,
    snapPointIndexes
  } = useSnapCarousel()

  useEffect(() => {
    if (
      !autoPlay ||
      allSlidesViewed.current ||
      !isPageVisible
    ) return

    const passSlideIntervalId = setInterval(() => {
      if (activePageIndex === pages.length - 1) {
        allSlidesViewed.current = true
        firstPageBtnRef.current?.click()
      }

      if (activePageIndex >= 0) {
        forwardBtnRef.current?.click()
      }
    }, 6000)

    return () => {
      clearInterval(passSlideIntervalId)
    }
  }, [autoPlay, activePageIndex, pages.length, isPageVisible])

  const childrenArray = ensureArray(children)

  return (
    <>
      <div className={styles.carouselWrapper}>
        <button
          aria-label='Previous slide'
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
          ref={forwardBtnRef}
          aria-label='Next slide'
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
          ref={scrollRef}
          style={{ gap: itemsGap }}
          className={styles.carousel}
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

      {
        showPagination && (
          <Pagination
            pages={pages}
            activePageIndex={activePageIndex}
            firstPageBtnRef={firstPageBtnRef}
            goTo={goTo}
          />
        )
      }
    </>
  )
}
