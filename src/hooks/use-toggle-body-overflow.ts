import { useEffect } from 'react'
import { toggleBodyOverflow } from '@helpers'

export const useToggleBodyOverflow = (isMenuOpen: boolean) => {
  useEffect(() => {
    toggleBodyOverflow(isMenuOpen)
  }, [isMenuOpen])
}
