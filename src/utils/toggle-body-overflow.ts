export const toggleBodyOverflow = (force?: boolean) => {
  try {
    document.body.classList.toggle('hideOverflow', force)
  } catch (error) {
    return
  }
}
