import { useRef, useEffect } from 'react'

export const useAutoFocus = (force = true) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (force && inputRef.current) {
      inputRef.current.focus()
    }
  }, [force])

  return inputRef
}
