export const HOST_URL = process.env.HOST_URL!
export const API_BASE_URL = process.env.API_BASE_URL!
export const API_LANGUAGE = "en-US"
export const IMAGES_BASE_URL = "https://image.tmdb.org/t/p"

export const API_HEADERS = {
	headers: {
		Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`,
	},
}
