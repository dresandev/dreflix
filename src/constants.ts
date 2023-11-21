export const API_BASE_URL = process.env.API_BASE_URL
export const IMAGES_BASE_URL = process.env.IMAGES_BASE_URL
export const API_LANGUAGE = 'es-CO'
export const Authorization = `Bearer ${process.env.ACCESS_TOKEN_AUTH}`

export const commonGetOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization
  }
}
