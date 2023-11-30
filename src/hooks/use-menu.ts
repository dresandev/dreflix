import { useRef } from 'react'
import {
  useToggleBodyOverflow,
  useBoolean,
  useOnClickOutside,
  useOnPathnameChange
} from '~/hooks'

export const useMenu = (toggleBodyOverflow?: boolean) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const {
    value: isMenuOpen,
    setTrue: openMenu,
    setFalse: closeMenu,
    toggle: toggleMenu,
  } = useBoolean(false)
  useToggleBodyOverflow(toggleBodyOverflow ?? isMenuOpen)
  useOnClickOutside(menuRef, closeMenu)
  useOnPathnameChange(() => isMenuOpen && closeMenu())

  return {
    menuRef,
    isMenuOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  }
}
