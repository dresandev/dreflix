"use client"

import { Slot } from "@radix-ui/react-slot"
import { useMenu } from "~/hooks/use-menu"

interface Props {
  children: React.ReactNode
  classNames?: {
    wrapper?: string
    content?: string
  }
  trigger: React.ReactNode
  toggleBodyOverflow?: boolean
  label: string
}

export const MenuWrapper: React.FC<Props> = ({
  children,
  classNames,
  trigger,
  toggleBodyOverflow,
  label,
}) => {
  const {
    menuRef,
    isMenuOpen,
    toggleMenu,
    handleFocusVisibleOut
  } = useMenu(!toggleBodyOverflow ? false : undefined)

  const dataState = isMenuOpen ? "open" : "closed"

  return (
    <div
      ref={menuRef}
      aria-label={`${isMenuOpen ? "Open" : "Close"} ${label} menu`}
      className={classNames?.wrapper}
      onBlur={handleFocusVisibleOut}
    >
      <Slot
        data-state={dataState}
        onClick={toggleMenu}
      >
        {trigger}
      </Slot>
      <div
        data-state={dataState}
        className={classNames?.content}
      >
        {children}
      </div>
    </div>
  )
}
