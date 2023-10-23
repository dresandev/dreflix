import { useRef, useEffect, DependencyList } from 'react'

export const useAutoFocus = (deps?: DependencyList) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [deps])

  return inputRef
}
