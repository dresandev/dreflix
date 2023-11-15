export const formatDate = (originalDate: string) => {
  if (!originalDate) return ''

  const splittedDate = originalDate.split('-')
  var year = splittedDate[0]
  var month = splittedDate[1]
  var day = splittedDate[2]

  const monthName = getMonthName(month)

  const formattedDate = `${day} ${monthName} ${year}`

  return formattedDate
}

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
