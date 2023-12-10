export const adaptSearchQuery = (value: string) => {
  return encodeURIComponent(value).replace(/\%20/g, '+')
}
