export const getRandomNumber = (min: number, max: number) => {
	return Math.random() * (max - min) + min
}
