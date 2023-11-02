'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import logoImage from '@assets/images/logo-image.png'
import styles from './AnimatedCardInfo.module.css'

export const AnimatedCardInfo = () => {
  const animationRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentAnimationRef = animationRef.current

    if (!currentAnimationRef) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        root: null,
        rootMargin: '0px',
        threshold: isVisible ? .1 : .9
      }
    )

    observer.observe(currentAnimationRef)

    return () => {
      observer.unobserve(currentAnimationRef)
    }
  }, [animationRef, isVisible])

  return (
    <section
      ref={animationRef}
      className={styles.heroCardInfo}
    >
      <div className={clsx(
        styles.infoWrapper,
        isVisible && styles.infoWrapperTransition
      )}>
        <h2>
          <Link href='/'>
            <Image
              className={styles.logoImage}
              src={logoImage}
              alt='Logo image'
            />
          </Link>
        </h2>

        <Link
          className={styles.moreInfoLink}
          href='/'
        >
          Mas Información
        </Link>
      </div>
    </section>
  )
}
