'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import styles from './ObservedFadeTransition.module.css'

interface ObeservedFadeTransitionProps {
  children: React.ReactNode
}

export const ObeservedFadeTransition: React.FC<ObeservedFadeTransitionProps> = ({
  children
}) => {
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
    <div ref={animationRef}>
      <div
        className={clsx(
          styles.transition,
          isVisible
            ? styles.fadeIn
            : styles.fadeOut
        )}
      >
        {children}
      </div>
    </div>
  )
}
