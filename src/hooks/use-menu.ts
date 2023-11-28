import { useRef } from 'react'
import {
  useToggleBodyOverflow,
  useBoolean,
  useOnClickOutside,
  useOnPathnameChange
} from '~/hooks'

export const useMenu = () => {
  const menuRef = useRef<HTMLDivElement>(null)
  const {
    value: isMenuOpen,
    toggle: toggleMenu,
    setFalse: closeMenu
  } = useBoolean(false)
  useToggleBodyOverflow(isMenuOpen)
  useOnClickOutside(menuRef, closeMenu)

  useOnPathnameChange(() => {
    isMenuOpen && closeMenu()
  })

  return {
    menuRef,
    isMenuOpen,
    toggleMenu,
  }
}
