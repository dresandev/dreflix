export const getRandomIndex = (arrayLength: number) => {
  if (arrayLength === 0) return -1

  const randomIndex = Math.floor(Math.random() * arrayLength)

  return randomIndex
}
