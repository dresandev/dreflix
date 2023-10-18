'use client'

import Image from 'next/image'
import desktopHeroImage from '@assets/images/mobile-hero.png'
import styles from './HeroCarousel.module.css'
import { useSnapCarousel } from 'react-snap-carousel'
import clsx from 'clsx'

export const HeroCarousel = () => {
  const {
    scrollRef,
    pages,
    activePageIndex,
    prev,
    next,
    goTo,
    snapPointIndexes
  } = useSnapCarousel()

  return (
    <ul className={styles.carousel} ref={scrollRef}>
      <li className={clsx(
        styles.item,
        snapPointIndexes.has(i) && styles.itemSnapPoint
      )}
      >
        <figure>
          <Image
            className={styles.itemImage}
            src={desktopHeroImage}
            alt='hero movie image'
          />
        </figure>
      </li>
      <li className={styles.item}>
        <figure>
          <Image
            className={styles.itemImage}
            src={desktopHeroImage}
            alt='hero movie image'
          />
        </figure>
      </li>
      <li className={styles.item}>
        <figure>
          <Image
            className={styles.itemImage}
            src={desktopHeroImage}
            alt='hero movie image'
          />
        </figure>
      </li>
      <li className={styles.item}>
        <figure>
          <Image
            className={styles.itemImage}
            src={desktopHeroImage}
            alt='hero movie image'
          />
        </figure>
      </li>
    </ul>
  )
}
