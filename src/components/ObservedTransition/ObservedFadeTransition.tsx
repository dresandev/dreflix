'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

interface ObeservedTransitionProps {
  children: React.ReactNode
  className: string
  isVisibleClassName: string
}

export const ObeservedTransition: React.FC<ObeservedTransitionProps> = ({
  children,
  className,
  isVisibleClassName,
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
          className,
          isVisible && isVisibleClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
