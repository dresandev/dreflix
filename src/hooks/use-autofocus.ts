import { useRef, useEffect } from 'react'

export const useAutoFocus = ({ setFocus = true }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (setFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [setFocus])

  return inputRef
}
