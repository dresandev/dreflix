import { useEffect, useRef, useState } from 'react'

interface UseIsInViewOptions extends IntersectionObserverInit {
  thresholdsByVisibility?: {
    isVisibleThreshold: number
    notVisibleThreshold: number
  }
}

export const useIsInView = <T extends HTMLElement>(options?: UseIsInViewOptions) => {
  const observerTargetRef = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observerTarget = observerTargetRef.current

    if (!observerTarget) return

    const { thresholdsByVisibility, ...observerOptions } = options || {}
    const {
      isVisibleThreshold,
      notVisibleThreshold
    } = thresholdsByVisibility || {}

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting !== isInView) {
          setIsInView(entry.isIntersecting)
        }
      },
      {
        threshold: isInView ? isVisibleThreshold : notVisibleThreshold,
        ...observerOptions,
      }
    )

    observer.observe(observerTarget)

    return () => {
      observer.unobserve(observerTarget)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return { observerTargetRef, isInView }
}
