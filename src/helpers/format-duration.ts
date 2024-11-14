export const formatDuration = (minutes: number) => {
	if (!minutes) return 0

	const hours = Math.floor(minutes / 60)
	const remainingMinutes = minutes % 60

	return `${hours}h ${remainingMinutes}min`
}
