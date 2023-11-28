import { getMonthName } from '~/utils'

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
