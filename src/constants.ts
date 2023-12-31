export const API_BASE_URL = process.env.API_BASE_URL
export const Authorization = `Bearer ${process.env.ACCESS_TOKEN_AUTH}`
export const API_LANGUAGE = 'en-US'
export const IMAGES_BASE_URL = 'https://image.tmdb.org/t/p'

export const COMMON_GET_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization
  }
}
