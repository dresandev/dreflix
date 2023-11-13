import { useEffect } from 'react'
import { toggleBodyOverflow } from '@helpers/toggle-body-overflow'

export const useToggleBodyOverflow = (isMenuOpen: boolean) => {
  useEffect(() => {
    toggleBodyOverflow(isMenuOpen)
  }, [isMenuOpen])
}
