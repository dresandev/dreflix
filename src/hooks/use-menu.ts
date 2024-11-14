import { useRef } from "react"
import { useToggleBodyOverflow } from "~/hooks/use-toggle-body-overflow"
import { useBoolean } from "~/hooks/use-boolean"
import { useOnClickOutside } from "~/hooks/use-on-click-outside"
import { useOnRouteChange } from "~/hooks/use-on-route-change"

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
	useOnRouteChange(closeMenu)

	const handleFocusVisibleOut = (e: React.FocusEvent) => {
		const hasFocusWithin = e.currentTarget.matches(":focus-within")

		if (!hasFocusWithin) closeMenu()
	}

	return {
		menuRef,
		isMenuOpen,
		openMenu,
		closeMenu,
		toggleMenu,
		handleFocusVisibleOut
	}
}
