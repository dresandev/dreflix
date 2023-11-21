import { useEffect } from 'react'
import { toggleBodyOverflow } from '@utils'

export const useToggleBodyOverflow = (isMenuOpen: boolean) => {
  useEffect(() => {
    toggleBodyOverflow(isMenuOpen)
  }, [isMenuOpen])
}
