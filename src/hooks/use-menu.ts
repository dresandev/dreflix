import { useRef } from "react"
import { useToggleBodyOverflow } from "~/hooks/use-toggle-body-overflow"
import { useBoolean } from "~/hooks/use-boolean"
import { useOnClickOutside } from "~/hooks/use-on-click-outside"
import { useOnRouteChange } from "~/hooks/use-on-route-change"

export const useMenu = (disableToggleBodyOverflow?: boolean) => {
	const menuRef = useRef<HTMLDivElement>(null)
	const {
		value: isMenuOpen,
		setTrue: openMenu,
		setFalse: closeMenu,
		toggle: toggleMenu,
	} = useBoolean(false)
	useToggleBodyOverflow(disableToggleBodyOverflow ? false : isMenuOpen)
	useOnClickOutside({
		ref: menuRef,
		handler: closeMenu,
		enabled: isMenuOpen,
	})
	useOnRouteChange(closeMenu)

	const handleFocusVisibleOut = (e: React.FocusEvent) => {
		const relatedTarget = e.relatedTarget as HTMLElement

		const isInteractive = relatedTarget?.tabIndex >= 0
		const hasFocusWithin = e.currentTarget.contains(relatedTarget)

		if (!isInteractive || hasFocusWithin) return

		closeMenu()
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
