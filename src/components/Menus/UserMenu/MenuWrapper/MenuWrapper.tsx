"use client"

import { useEffect, useState } from "react"
import clsx from "clsx"
import { Slot } from "@radix-ui/react-slot"
import { isMobile } from "~/utils/is-mobile"
import { useMenu } from "~/hooks/use-menu"
import styles from "./MenuWrapper.module.css"

interface Props {
  children: React.ReactNode
  trigger: React.ReactNode
}

export const MenuWrapper: React.FC<Props> = ({ children, trigger }) => {
  const [isMobileState, setIsMobileState] = useState(false)
  const {
    menuRef,
    isMenuOpen,
    toggleMenu,
    handleFocusVisibleOut
  } = useMenu(isMobileState ? undefined : false)

  useEffect(() => {
    setIsMobileState(isMobile(navigator.userAgent))
  }, [])

  return (
    <div
      ref={menuRef}
      className={styles.wrapper}
      onBlur={handleFocusVisibleOut}
    >
      <Slot onClick={toggleMenu}>
        {trigger}
      </Slot>
      <div className={clsx(styles.menu, { [styles.open]: isMenuOpen })}>
        {children}
      </div>
    </div>
  )
}
