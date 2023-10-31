'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

interface ObservedAnimationProps {
  children: React.ReactNode
  root?: Element | Document | null
  rootMargin?: string
  threshold?: number
  initStyles: string
  isVisibleStyles: string
}

export const ObservedAnimation: React.FC<ObservedAnimationProps> = ({
  children,
  root = null,
  rootMargin = '0px',
  threshold = 1,
  initStyles,
  isVisibleStyles,
}) => {
  const animationRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentAnimationRef = animationRef.current

    if (!currentAnimationRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { root, rootMargin, threshold }
    )

    observer.observe(currentAnimationRef)

    return () => {
      observer.unobserve(currentAnimationRef)
    }
  }, [animationRef, root, rootMargin, threshold])

  return (
    <div
      ref={animationRef}
      className={clsx(
        initStyles,
        isVisible && isVisibleStyles
      )}
    >
      {children}
    </div>
  )
}
