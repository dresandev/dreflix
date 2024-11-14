import { useEffect } from "react"

export const useToggleBodyOverflow = (isMenuOpen: boolean) => {
	useEffect(() => {
		const body = document.body

		body.classList.toggle("hide-overflow", isMenuOpen)

		return () => {
			body.classList.remove("hide-overflow")
		}
	}, [isMenuOpen])
}
