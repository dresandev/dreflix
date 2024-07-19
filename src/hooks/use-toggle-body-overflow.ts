import { useEffect } from 'react'

export const useToggleBodyOverflow = (isMenuOpen: boolean) => {
  useEffect(() => {
    const body = document.body

    body.classList.toggle('hideOverflow', isMenuOpen)

    return () => {
      body.classList.remove('hideOverflow')
    }
  }, [isMenuOpen])
}
