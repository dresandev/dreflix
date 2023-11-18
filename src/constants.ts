export const API_BASE_URL = 'https://api.themoviedb.org/3'
export const IMAGES_BASE_URL = 'https://image.tmdb.org/t/p'
export const API_LANGUAGE = 'es-CO'
export const Authorization = `Bearer ${process.env.ACCESS_TOKEN_AUTH}`

export const commonGetOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization
  }
}
