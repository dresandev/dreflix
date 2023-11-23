import { useEffect, useRef, useState } from 'react'

export const useIsInView = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const obeserverTargetRefCurrent = ref.current

    if (!obeserverTargetRefCurrent) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      options
    )

    observer.observe(obeserverTargetRefCurrent)

    return () => {
      observer.unobserve(obeserverTargetRefCurrent)
    }
  }, [options])

  return { ref, isInView }
}
