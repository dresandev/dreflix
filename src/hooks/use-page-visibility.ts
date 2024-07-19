import { useEffect, useState } from 'react'

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(true)

  const handleVisibilityChange = () => {
    setIsVisible(!document.hidden)
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return isVisible
}
