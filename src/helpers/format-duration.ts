export const formatDuration = (minutesDuration: number) => {
  if (!minutesDuration) return 0

  const horas = Math.floor(minutesDuration / 60)
  const minutos = minutesDuration % 60

  return `${horas}h ${minutos}min`
}
