import { useEffect } from 'react'
import { toggleBodyOverflow } from '@utils/toggle-body-overflow'

export const useToggleBodyOverflow = (isMenuOpen: boolean) => {
  useEffect(() => {
    toggleBodyOverflow(isMenuOpen)
  }, [isMenuOpen])
}
