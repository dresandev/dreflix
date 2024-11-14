export const getMonthName = (monthNumber: string) => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	]

	const monthName = months[parseInt(monthNumber, 10) - 1]

	return monthName
}


export const formatDate = (date: string) => {
	if (!date) return ""

	const dateParts = date.split("-")
	const [year, month, day] = dateParts

	const monthName = getMonthName(month)

	const formattedDate = `${day} ${monthName} ${year}`

	return formattedDate
}
