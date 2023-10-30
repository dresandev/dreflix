import { useRef, useEffect, DependencyList } from 'react'

export const useAutoFocus = (deps?: DependencyList) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!isFirstRender.current && inputRef.current) {
      inputRef.current.focus()
    }

    if (isFirstRender.current) {
      isFirstRender.current = false
    }
  }, [deps])

  return inputRef
}
