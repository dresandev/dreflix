export const getMonthName = (monthNumber: string) => {
  const months = [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic'
  ]

  const monthName = months[parseInt(monthNumber, 10) - 1]

  return monthName
}
