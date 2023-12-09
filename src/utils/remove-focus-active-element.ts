export const removeFocusActiveElement = () => {
  const activeElement = document.activeElement as HTMLElement
  activeElement.blur()
}
