'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { useSnapCarousel } from 'react-snap-carousel'
import { ensureArray } from '~/utils'
import { useIsInView, usePageVisibility } from '~/hooks'
import { Buttons } from './Buttons'
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

const AUTOPLAY_INTERVAL = 5000

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
  const { isInView, observerTargetRef } = useIsInView<HTMLDivElement>({
    threshold: .5
  })
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
      !isPageVisible ||
      !isInView
    ) return

    const passSlideIntervalId = setInterval(() => {
      if (activePageIndex === pages.length - 1) {
        allSlidesViewed.current = true
        firstPageBtnRef.current?.click()
      }

      if (activePageIndex >= 0) {
        forwardBtnRef.current?.click()
      }
    }, AUTOPLAY_INTERVAL)

    return () => {
      clearInterval(passSlideIntervalId)
    }
  }, [isPageVisible, isInView, autoPlay, activePageIndex, pages.length])

  const childrenArray = ensureArray(children)

  return (
    <>
      <div
        ref={observerTargetRef}
        className={styles.carouselWrapper}
      >
        <Buttons
          forwardBtnRef={forwardBtnRef}
          btnHoverVariant={btnHoverVariant}
          showPrevButton={activePageIndex === 0}
          showNextButton={activePageIndex === (pages.length - 1)}
          onClickPrev={prev}
          onClickNext={next}
        />

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
