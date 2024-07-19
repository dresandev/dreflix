import { useEffect, useRef, useState } from 'react'

type IntersectionObserverCustomProps = IntersectionObserverInit & {
  threshold?: never,
  thresholdByVisibility?: {
    isVisible: number
    notVisible: number
  }
}

type IntersectionObserverProps = IntersectionObserverInit & {
  thresholdByVisibility?: never
}

type UseIsInViewOptions = IntersectionObserverCustomProps | IntersectionObserverProps

export const useIsInView = <T extends HTMLElement>(
  options?: UseIsInViewOptions
) => {
  const observerTargetRef = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observerTarget = observerTargetRef.current

    if (!observerTarget) return

    const { thresholdByVisibility, ...observerOptions } = options || {}

    const threshold = isInView
      ? thresholdByVisibility?.isVisible
      : thresholdByVisibility?.notVisible

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      {
        threshold,
        ...observerOptions,
      }
    )

    observer.observe(observerTarget)

    return () => {
      observer.unobserve(observerTarget)
    }
  }, [isInView, options])

  return { observerTargetRef, isInView }
}
