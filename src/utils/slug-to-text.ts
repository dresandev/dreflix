export const slugToText = (slug: string) => {
  const text = slug
    .replace(/\-/g, ' ')
    .replace(/\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    )

  return text
}
