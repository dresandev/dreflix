export const removeActiveElementFocus = () => {
	const activeElement = document.activeElement as HTMLElement
	activeElement.blur()
}
