'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useIsInView } from '@hooks'

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
  // const animationRef = useRef<HTMLDivElement>(null)
  // const [isVisible, setIsVisible] = useState(false)

  // useEffect(() => {
  //   const currentAnimationRef = animationRef.current

  //   if (!currentAnimationRef) return

  //   const observer = new IntersectionObserver(
  //     ([entry]) => setIsVisible(entry.isIntersecting),
  //     {
  //       root: null,
  //       rootMargin: '0px',
  //       threshold: isVisible ? .1 : .9
  //     }
  //   )

  //   observer.observe(currentAnimationRef)

  //   return () => {
  //     observer.unobserve(currentAnimationRef)
  //   }
  // }, [animationRef, isVisible])

  const { ref, isInView } = useIsInView(
    {
      root: null,
      rootMargin: '0px',
      threshold: isInView ? .1 : .9
    }
  )

  return (
    <div ref={ref}>
      <div
        className={clsx(
          className,
          isInView && isVisibleClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
